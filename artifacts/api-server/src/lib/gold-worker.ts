import { io, Socket } from "socket.io-client";
import { firestore } from "./firebase";
import { logger } from "./logger";
import admin from "firebase-admin";

const SOCKET_URL = "wss://socket.haremaltin.com";
const SAVE_INTERVAL_MS = 30 * 60 * 1000; // 30 Dakika
const SYMBOLS_TO_SAVE = ["ALTIN", "AYAR22", "USDTRY", "EURTRY", "ONS", "CEYREK_YENI"];

let latestPrices: Record<string, { alis: number; satis: number }> = {};
let socket: Socket | null = null;
let isConnected = false;

/**
 * Frontend hook ile aynı mantıkta veri ayrıştırma
 * Gelen format: { meta: {...}, data: { "ALTIN": { "alis": "...", "satis": "..." }, ... } }
 * veya doğrudan: { "ALTIN": { "alis": "...", "satis": "..." }, ... }
 */
function parsePriceData(payload: any) {
  if (!payload) return;

  // Wrapper kontrolü: { meta, data } formatı mı?
  const data: Record<string, any> =
    payload?.data && typeof payload.data === "object" ? payload.data : payload;

  let count = 0;
  for (const [key, val] of Object.entries(data)) {
    if (key === "meta" || !val || typeof val !== "object") continue;

    const alis = parseFloat(
      String(val.alis ?? val.Alis ?? val.a ?? 0).replace(",", ".")
    );
    const satis = parseFloat(
      String(val.satis ?? val.Satis ?? val.s ?? 0).replace(",", ".")
    );

    if (alis > 0 || satis > 0) {
      latestPrices[key] = { alis, satis };
      count++;
    }
  }
  if (count > 0) {
    logger.debug({ count }, "Fiyat verisi güncellendi.");
  }
}

/**
 * HaremAltin Socket.io Canlı Fiyat Dinleyicisi
 */
export function startGoldWorker() {
  logger.info("Initializing Gold Price Worker (30min snapshot mode)...");

  socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"], // Frontend ile aynı: polling de destekle
    reconnectionAttempts: Infinity,
    reconnectionDelay: 5000,
    reconnectionDelayMax: 30000,
    timeout: 15000,
  });

  socket.on("connect", () => {
    isConnected = true;
    logger.info("Gold Worker connected to HaremAltin Socket.");
    socket?.emit("init", "Vue");

    // Bağlantıdan 30 sn sonra ilk snapshot'ı kaydet
    setTimeout(async () => {
      await saveSnapshots("İlk bağlantı");
    }, 30 * 1000);
  });

  // Tüm olası event isimlerini dinle
  socket.on("price_changed", parsePriceData);
  socket.on("prices", parsePriceData);
  socket.on("allData", parsePriceData);
  socket.on("all_data", parsePriceData);

  socket.on("disconnect", (reason) => {
    isConnected = false;
    logger.warn({ reason }, "Gold Worker disconnected.");
  });

  socket.on("connect_error", (err) => {
    logger.error({ msg: err.message }, "Gold Worker connection error.");
  });

  // ── 30 Dakikalık Periyodik Arşivleme ────────────────────────────────
  setInterval(async () => {
    await saveSnapshots("30 dakikalık periyodik");
  }, SAVE_INTERVAL_MS);
}

/**
 * O anki fiyatların snapshot'ını Firestore'a kaydeder
 */
async function saveSnapshots(reason: string = "manuel") {
  const symbols = Object.keys(latestPrices).filter((s) =>
    SYMBOLS_TO_SAVE.includes(s)
  );

  if (symbols.length === 0) {
    logger.warn(
      `Gold Worker [${reason}]: Fiyat verisi yok, snapshot atlandı.`
    );
    return;
  }

  logger.info(
    { count: symbols.length, reason },
    "Firestore'a fiyat snapshot'ı kaydediliyor..."
  );

  try {
    const batch = firestore.batch();
    const collectionRef = firestore.collection("gold_price_history");
    const now = admin.firestore.Timestamp.now();

    let savedCount = 0;
    for (const symbol of symbols) {
      const price = latestPrices[symbol];
      if (price.alis > 0 && price.satis > 0) {
        const docRef = collectionRef.doc();
        batch.set(docRef, {
          symbol,
          buyPrice: price.alis.toString(),
          sellPrice: price.satis.toString(),
          timestamp: now,
        });
        savedCount++;
      }
    }

    if (savedCount > 0) {
      await batch.commit();
      logger.info(
        { savedCount, reason },
        "✅ Fiyat snapshot'ları Firestore'a kaydedildi."
      );
    }
  } catch (err) {
    logger.error({ err, reason }, "❌ Firestore kayıt hatası.");
  }
}
