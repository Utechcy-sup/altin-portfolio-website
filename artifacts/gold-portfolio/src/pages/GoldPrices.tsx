import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHaremAltin, formatTRY, formatUSD, formatChange } from "@/hooks/useHaremAltin";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Calculator, Clock, ArrowRightLeft, TrendingUp, TrendingDown,
  Wifi, WifiOff, AlertCircle, RefreshCw, Zap,
} from "lucide-react";

// ─── Mock chart verisi ────────────────────────────────────────────────────
const generateChartData = (days: number, base = 6600) => {
  const data = [];
  let price = base;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    price = price + (Math.random() * 120 - 50);
    data.push({
      date: date.toLocaleDateString("tr-TR", { month: "short", day: "numeric" }),
      price: Math.round(price),
    });
  }
  return data;
};

const CHART_TABS = [
  { label: "7G", days: 7 },
  { label: "1A", days: 30 },
  { label: "3A", days: 90 },
];

// ─── Bağlantı Durum Rozeti ──────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  // Canlı bağlantı varken (HaremAltin) rozeti gizle, kullanıcıya kalabalık yapmasın
  if (status === "connected") return null;

  const STATUS_CONFIG = {
    fallback:  { icon: <Wifi className="w-3 h-3" />, label: "Gecikmeli Veri (Piyasa)", cls: "bg-amber-500/20 text-amber-400 border-amber-500/40" },
    connecting:{ icon: <RefreshCw className="w-3 h-3 animate-spin" />, label: "Bağlanıyor…", cls: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
    error:     { icon: <WifiOff className="w-3 h-3" />, label: "Bağlantı Yok", cls: "bg-red-500/20 text-red-400 border-red-500/40" },
  };

  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? { icon: null, label: status, cls: "" };


  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.cls}`}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// Değişim Rozeti kaldırıldı (Temiz tasarım için)

// ─── Fiyat Satırı ──────────────────────────────────────────────────────
function PriceRow({
  label, alis, satis, isUSD = false, delay = 0,
}: {
  label: string;
  alis?: number;
  satis?: number;
  isUSD?: boolean;
  delay?: number;
}) {
  const fmt = isUSD ? formatUSD : formatTRY;
  const prevSatis = satis;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="border-b border-border/50 hover:bg-primary/5 transition-colors"
    >
      <td className="py-3 px-4 text-sm font-medium text-foreground">{label}</td>
      <td className="py-3 px-4 text-sm text-muted-foreground tabular-nums">
        {alis ? fmt(alis) : <span className="opacity-30">—</span>}
      </td>
      <td className="py-3 px-4 text-sm font-semibold text-foreground tabular-nums text-right">
        <AnimatePresence mode="wait">
          <motion.span
            key={prevSatis}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {satis ? fmt(satis) : <span className="opacity-30">—</span>}
          </motion.span>
        </AnimatePresence>
      </td>
    </motion.tr>
  );
}

// ─── Ana Bileşen ────────────────────────────────────────────────────────

export default function GoldPrices() {
  const { prices, status, lastUpdated, error } = useHaremAltin();
  const [activeTab, setActiveTab] = useState(CHART_TABS[0]);
  const [calcGrams, setCalcGrams] = useState("10");
  const [calcKarat, setCalcKarat] = useState("ALTIN");

  const loading = status === "connecting" && Object.keys(prices).length === 0;
  const chartData = generateChartData(activeTab.days, prices.ALTIN?.satis ?? 6600);

  const karatOptions = [
    { key: "ALTIN",   label: "Has Altın (24K)",  price: prices.ALTIN?.satis },
    { key: "AYAR22",  label: "22 Ayar Altın",    price: prices.AYAR22?.satis },
    { key: "AYAR18",  label: "18 Ayar Altın",    price: prices.AYAR18?.satis },
    { key: "AYAR14",  label: "14 Ayar Altın",    price: prices.AYAR14?.satis },
  ];

  const selectedPrice = karatOptions.find(o => o.key === calcKarat)?.price ?? 0;
  const calcResult = selectedPrice > 0
    ? formatTRY((parseFloat(calcGrams) || 0) * selectedPrice)
    : "—";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-card border border-border p-3 shadow-xl rounded-sm text-sm">
          <p className="text-muted-foreground text-xs mb-1">{label}</p>
          <p className="text-primary font-semibold">{formatTRY(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Başlık ── */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <span className="text-primary tracking-widest text-xs uppercase mb-4 block">
              Canlı Piyasalar
            </span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Altın Fiyatları</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Canlı borsalardan ve serbest piyasalardan alınan anlık verilerle en güncel 
              fiyatları sunuyoruz. Şeffaf ve dürüst fiyatlandırma politikamızla hizmetinizdeyiz.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <StatusBadge status={status} />
              {lastUpdated && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lastUpdated.toLocaleTimeString("tr-TR")}
                </span>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Fallback/Hata Uyarıları ── */}
        <AnimatePresence>
          {status === "fallback" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-amber-500/10 border border-amber-500/30 p-5 flex items-start gap-4 ring-1 ring-amber-500/10">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-bold mb-1 text-sm uppercase tracking-wider">Dikkat: Gecikmeli Piyasa Verisi</h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    Şu anda ana veri hattımızda bakım çalışması yapılmaktadır. Gösterilen fiyatlar 
                    <strong> genel piyasa (borsa) verileridir</strong> ve mağaza (fiziki) fiyatlarımızla 
                    küçük farklılıklar gösterebilir. Kesin fiyat onayı ve işlem için lütfen şubelerimizle iletişime geçiniz.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 flex items-start gap-3 bg-red-500/10 border border-red-500/30 p-4 rounded-sm text-sm text-red-400"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Özet Kartlar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Has Altın",   entry: prices.ALTIN,   fmt: formatTRY, sub: "gram" },
            { label: "Ons Altın",   entry: prices.ONS,     fmt: formatUSD, sub: "USD" },
            { label: "USD / TL",    entry: prices.USDTRY,  fmt: (v: number) => formatTRY(v, 4), sub: "kur" },
            { label: "EUR / TL",    entry: prices.EURTRY,  fmt: (v: number) => formatTRY(v, 4), sub: "kur" },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={0.08 * idx}>
              <div className="bg-card border border-border p-5 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-3">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">{item.label}</span>
                </div>
                <div className="text-2xl font-light text-foreground mb-0.5">
                  {loading ? (
                    <span className="inline-block w-24 h-6 bg-border/60 animate-pulse rounded" />
                  ) : (
                    item.entry ? item.fmt(item.entry.satis) : "—"
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Fiyat Tabloları  ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Altın Çeşitleri */}
          <ScrollReveal>
            <div className="bg-card border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-primary/5 flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Altın Fiyatları</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2 px-4 font-normal">Çeşit</th>
                    <th className="text-left py-2 px-4 font-normal">Alış</th>
                    <th className="text-right py-2 px-4 font-normal">Satış</th>
                  </tr>
                </thead>
                <tbody>
                  <PriceRow label="Has Altın (gram)"    alis={prices.ALTIN?.alis}       satis={prices.ALTIN?.satis}       delay={0.05} />
                  <PriceRow label="22 Ayar (gram)"      alis={prices.AYAR22?.alis}      satis={prices.AYAR22?.satis}      delay={0.10} />
                  <PriceRow label="18 Ayar (gram)"      alis={prices.AYAR18?.alis}      satis={prices.AYAR18?.satis}      delay={0.15} />
                  <PriceRow label="14 Ayar (gram)"      alis={prices.AYAR14?.alis}      satis={prices.AYAR14?.satis}      delay={0.18} />
                  <PriceRow label="Ons Altın (USD)"     alis={prices.ONS?.alis}         satis={prices.ONS?.satis}         delay={0.20} isUSD />
                  <PriceRow label="Gümüş (gram)"        alis={prices.GUMUSTRY?.alis}    satis={prices.GUMUSTRY?.satis}    delay={0.25} />
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Sarrafiye + Döviz */}
          <ScrollReveal delay={0.05}>
            <div className="bg-card border border-border overflow-hidden mb-4">
              <div className="px-4 py-3 border-b border-border bg-primary/5">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Sarrafiye</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2 px-4 font-normal">Çeşit</th>
                    <th className="text-left py-2 px-4 font-normal">Alış</th>
                    <th className="text-right py-2 px-4 font-normal">Satış</th>
                  </tr>
                </thead>
                <tbody>
                  <PriceRow label="Yeni Çeyrek"   alis={prices.CEYREK_YENI?.alis}  satis={prices.CEYREK_YENI?.satis}  delay={0.05} />
                  <PriceRow label="Eski Çeyrek"   alis={prices.CEYREK_ESKI?.alis}  satis={prices.CEYREK_ESKI?.satis}  delay={0.10} />
                  <PriceRow label="Yeni Yarım"    alis={prices.YARIM_YENI?.alis}   satis={prices.YARIM_YENI?.satis}   delay={0.15} />
                  <PriceRow label="Yeni Tam"      alis={prices.TAM_YENI?.alis}     satis={prices.TAM_YENI?.satis}     delay={0.20} />
                  <PriceRow label="Yeni Ata"      alis={prices.ATA_YENI?.alis}     satis={prices.ATA_YENI?.satis}     delay={0.25} />
                </tbody>
              </table>
            </div>

            <div className="bg-card border border-border overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-primary/5">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Döviz Kurları</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted-foreground border-b border-border/50">
                    <th className="text-left py-2 px-4 font-normal">Parite</th>
                    <th className="text-left py-2 px-4 font-normal">Alış</th>
                    <th className="text-right py-2 px-4 font-normal">Satış</th>
                  </tr>
                </thead>
                <tbody>
                  <PriceRow label="USD / TL"  alis={prices.USDTRY?.alis}  satis={prices.USDTRY?.satis}  delay={0.05} />
                  <PriceRow label="EUR / TL"  alis={prices.EURTRY?.alis}  satis={prices.EURTRY?.satis}  delay={0.10} />
                  <PriceRow label="GBP / TL"  alis={prices.GBPTRY?.alis}  satis={prices.GBPTRY?.satis}  delay={0.15} />
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Grafik + Hesaplayıcı ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Grafik */}
          <div className="lg:col-span-2 bg-card border border-border p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="font-serif text-2xl">Has Altın Grafiği (TL/gram)</h3>
              <div className="flex border border-border bg-background">
                {CHART_TABS.map(tab => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                      activeTab.label === tab.label
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#404040" fontSize={11} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={["auto", "auto"]}
                    stroke="#404040"
                    fontSize={11}
                    tickFormatter={(v) => `₺${(v / 1000).toFixed(1)}K`}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#C9A84C"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorGold)"
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hesaplayıcı */}
          <div className="bg-card border border-border p-6 flex flex-col">
            <h3 className="font-serif text-2xl mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" /> Altın Hesapla
            </h3>
            <div className="space-y-5 flex-1">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Ayar Seçimi
                </label>
                <select
                  className="w-full bg-background border border-border text-foreground p-3 focus:outline-none focus:border-primary transition-colors appearance-none rounded-none text-sm"
                  value={calcKarat}
                  onChange={e => setCalcKarat(e.target.value)}
                >
                  {karatOptions.map(o => (
                    <option key={o.key} value={o.key}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Miktar (Gram)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full bg-background border border-border text-foreground p-3 focus:outline-none focus:border-primary transition-colors rounded-none text-sm"
                  value={calcGrams}
                  onChange={e => setCalcGrams(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-center py-2">
                <ArrowRightLeft className="w-5 h-5 text-muted-foreground rotate-90" />
              </div>
              <div className="bg-background border border-border p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Tahmini Tutar (Satış)
                </div>
                <motion.div
                  key={calcResult}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-medium text-primary"
                >
                  {loading ? "…" : calcResult}
                </motion.div>
                {selectedPrice > 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    1 gram = {formatTRY(selectedPrice)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bilgi Kutusu ── */}
        <div className="bg-primary/5 border border-primary/20 p-5 flex items-start gap-4">
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-foreground font-medium mb-1 text-sm">Veri Kaynağı &amp; Güncelliği</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fiyatlar <strong className="text-foreground">canlı piyasa sunucularımız</strong> üzerinden 
              anlık olarak güncellenmektedir. Bağlantı kesilmesi durumunda yedek veri kanallarımız 15-30 saniye 
              aralıklarla güncel bilgiyi sağlamaya devam eder. Piyasa kapalı olduğunda son kapanış fiyatları 
              yansıtılır. Kesin fiyat bilgisi ve fiziki işlem onayları için lütfen şubelerimizle iletişime geçiniz.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
