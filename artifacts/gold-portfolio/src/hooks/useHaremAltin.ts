/**
 * useHaremAltin — HaremAltin Canlı Piyasalar entegrasyonu
 *
 * Birincil kaynak  : wss://socket.haremaltin.com  (Socket.io v4, gerçek zamanlı)
 * Yedek kaynak     : https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa
 *
 * HaremAltin'in socket sunucusu bağlandıktan sonra:
 *   socket.emit('init', 'Vue')          → veri akışını başlatır
 *   socket.on('price_changed', data)    → anlık fiyat güncellemesi
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

// ─── Tip tanımları ───────────────────────────────────────────────────────────

export interface PriceEntry {
  /** Alış fiyatı */
  alis: number;
  /** Satış fiyatı */
  satis: number;
  /** Yüzde değişim (pozitif = artış) */
  degisim: number;
  /** Son güncelleme zamanı */
  tarih: string;
}

export interface HaremAltinPrices {
  /** Has Altın (gram/TL) */
  ALTIN: PriceEntry;
  /** Altın ONS (USD) */
  ONS: PriceEntry;
  /** 22 Ayar Altın (gram/TL) */
  AYAR22: PriceEntry;
  /** 18 Ayar Altın (gram/TL) */
  AYAR18: PriceEntry;
  /** USD / TL */
  USDTRY: PriceEntry;
  /** EUR / TL */
  EURTRY: PriceEntry;
  /** GBP / TL */
  GBPTRY: PriceEntry;
  /** Yeni Çeyrek Altın */
  CEYREK_YENI: PriceEntry;
  /** Eski Çeyrek Altın */
  CEYREK_ESKI: PriceEntry;
  /** Yeni Yarım Altın */
  YARIM_YENI: PriceEntry;
  /** Yeni Tam Altın */
  TAM_YENI: PriceEntry;
  /** Yeni Ata Altın */
  ATA_YENI: PriceEntry;
  /** Gümüş (gram/TL) */
  GUMUSTRY: PriceEntry;
  [key: string]: PriceEntry;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'fallback' | 'error';

export interface UseHaremAltinReturn {
  prices: Partial<HaremAltinPrices>;
  status: ConnectionStatus;
  lastUpdated: Date | null;
  error: string | null;
}

// ─── Sabitler ──────────────────────────────────────────────────────────────

const SOCKET_URL = 'wss://socket.haremaltin.com';
const BIGPARA_URL = 'https://api.bigpara.hurriyet.com.tr/doviz/headerlist/anasayfa';
const FALLBACK_INTERVAL_MS = 10_000; // 10 saniyede bir BigPara'dan çek (daha taze veri)

// BigPara sembol → HaremAltin anahtar eşlemesi
const BIGPARA_MAP: Record<string, keyof HaremAltinPrices> = {
  GLDGR: 'ALTIN',
  USDTRY: 'USDTRY',
  EURTRY: 'EURTRY',
  GBPTRY: 'GBPTRY',
};

// ─── Yardımcı fonksiyonlar ─────────────────────────────────────────────────

function makeEntry(alis: number, satis: number, degisim = 0, tarih = ''): PriceEntry {
  return { alis, satis, degisim, tarih };
}

/** BigPara JSON'unu HaremAltinPrices formatına dönüştürür */
function parseBigPara(json: any): Partial<HaremAltinPrices> {
  const result: Partial<HaremAltinPrices> = {};
  if (!Array.isArray(json?.data)) return result;

  for (const item of json.data) {
    const key = BIGPARA_MAP[item.SEMBOL as string];
    if (key) {
      result[key] = makeEntry(
        item.ALIS ?? item.KAPANIS ?? 0,
        item.SATIS ?? item.KAPANIS ?? 0,
        item.YUZDEDEGISIM ?? 0,
        item.TARIH ?? '',
      );
    }
  }
  return result;
}

/** HaremAltin socket price_changed verisini normalise eder.
 *  Gelen format: { meta: {...}, data: { "ALTIN": { "alis": "...", "satis": "..." }, ... } }
 *  veya doğrudan: { "ALTIN": { "alis": "...", "satis": "..." }, ... }
 */
function parseSocketData(payload: Record<string, any>): Partial<HaremAltinPrices> {
  // Sunucu bazen { meta, data } wrapper'ı ile gönderir
  const data: Record<string, any> = payload?.data && typeof payload.data === 'object'
    ? payload.data
    : payload;

  const result: Partial<HaremAltinPrices> = {};
  for (const [key, val] of Object.entries(data)) {
    if (key === 'meta' || !val || typeof val !== 'object') continue;

    // HaremAltin Mapping: TEK_YENI is actually the "Yeni Tam" price
    const mappedKey = key === 'TEK_YENI' ? 'TAM_YENI' : key;

    const alis = parseFloat(String(val.alis ?? val.Alis ?? val.a ?? 0).replace(',', '.'));
    const satis = parseFloat(String(val.satis ?? val.Satis ?? val.s ?? 0).replace(',', '.'));
    const degisim = parseFloat(String(val.degisim ?? val.Degisim ?? val.d ?? 0).replace(',', '.'));
    const tarih = val.tarih ?? val.Tarih ?? val.t ?? new Date().toISOString();
    if (alis > 0 || satis > 0) {
      result[mappedKey as keyof HaremAltinPrices] = makeEntry(alis, satis, degisim, tarih);
    }
  }

  // ─── 18 AYAR HESAPLAMA (Eğer kaynaktan gelmiyorsa) ───
  // 18 ayar = 24 ayar (Has) * 0.75
  if (!result.AYAR18 && result.ALTIN) {
    result.AYAR18 = makeEntry(
      result.ALTIN.alis * 0.75,
      result.ALTIN.satis * 0.75,
      result.ALTIN.degisim,
      result.ALTIN.tarih
    );
  }

  return result;
}

// ─── Ana Hook ──────────────────────────────────────────────────────────────

export function useHaremAltin(): UseHaremAltinReturn {
  const [prices, setPrices] = useState<Partial<HaremAltinPrices>>({});
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const usingSocketRef = useRef(false);

  // ── BigPara Fallback ──────────────────────────────────────────────────
  const fetchBigPara = useCallback(async () => {
    try {
      const res = await fetch(BIGPARA_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`BigPara HTTP ${res.status}`);
      const json = await res.json();
      const parsed = parseBigPara(json);
      if (Object.keys(parsed).length > 0) {
        setPrices(prev => ({ ...prev, ...parsed }));
        setLastUpdated(new Date());
        setStatus('fallback');
        setError(null);
      }
    } catch (e) {
      setError('Veriler alınamadı. Lütfen internet bağlantınızı kontrol edin.');
      setStatus('error');
    }
  }, []);

  const startFallback = useCallback(() => {
    if (usingSocketRef.current) return;
    fetchBigPara();
    if (!fallbackTimerRef.current) {
      fallbackTimerRef.current = setInterval(fetchBigPara, FALLBACK_INTERVAL_MS);
    }
  }, [fetchBigPara]);

  const stopFallback = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // ── Socket.io Bağlantısı ──────────────────────────────────────────────
  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // Polling desteği ekleyerek bazı ağlarda daha hızlı bağlanmasını sağlar.
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      timeout: 15000,
      forceNew: true,
    });

    socketRef.current = socket;

    const connectionTimer = setTimeout(() => {
      if (!usingSocketRef.current) {
        console.warn('[HaremAltin] Socket.io bağlanamadı, BigPara yedek kaynağına geçiliyor.');
        startFallback();
      }
    }, 8000);

    socket.on('connect', () => {
      clearTimeout(connectionTimer);
      usingSocketRef.current = true;
      stopFallback();
      setStatus('connected');
      setError(null);
      // Veri akışını başlat
      socket.emit('init', 'Vue');
    });

    socket.on('price_changed', (data: Record<string, any>) => {
      const parsed = parseSocketData(data);
      if (Object.keys(parsed).length > 0) {
        setPrices(prev => ({ ...prev, ...parsed }));
        setLastUpdated(new Date());
      }
    });

    // Bazı sunucularda event ismi farklı olabilir
    socket.on('prices', (data: Record<string, any>) => {
      const parsed = parseSocketData(data);
      if (Object.keys(parsed).length > 0) {
        setPrices(prev => ({ ...prev, ...parsed }));
        setLastUpdated(new Date());
      }
    });

    socket.on('connect_error', (err) => {
      console.warn('[HaremAltin] Bağlantı hatası:', err.message);
      if (!usingSocketRef.current) {
        startFallback();
      }
    });

    socket.on('disconnect', (reason) => {
      usingSocketRef.current = false;
      if (reason !== 'io client disconnect') {
        setStatus('fallback');
        startFallback();
      }
    });

    return () => {
      clearTimeout(connectionTimer);
      socket.disconnect();
      stopFallback();
      usingSocketRef.current = false;
    };
  }, [startFallback, stopFallback]);

  return { prices, status, lastUpdated, error };
}

// ─── Format Yardımcıları ───────────────────────────────────────────────────

export function formatTRY(value: number, decimals = 2): string {
  if (!value || value === 0) return '—';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatUSD(value: number, decimals = 2): string {
  if (!value || value === 0) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatNumber(value: number, decimals = 4): string {
  if (!value || value === 0) return '—';
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatChange(pct: number): string {
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}
