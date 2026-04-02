import { useHaremAltin, formatTRY, formatUSD, formatChange } from "@/hooks/useHaremAltin";
import { TrendingUp, TrendingDown, Zap, Wifi } from "lucide-react";

interface TickerItem {
  label: string;
  value: string;
  change?: number;
}

export function GoldTicker() {
  const { prices, status } = useHaremAltin();
  const loading = status === "connecting" && Object.keys(prices).length === 0;

  if (loading) {
    return (
      <div className="w-full bg-card border-y border-border py-3 overflow-hidden flex items-center justify-center gap-3">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs text-muted-foreground">HaremAltin piyasası yükleniyor…</span>
      </div>
    );
  }

  const items: TickerItem[] = [
    { label: "HAS ALTIN",    value: prices.ALTIN      ? formatTRY(prices.ALTIN.satis)         : "—", change: prices.ALTIN?.degisim },
    { label: "22 AYAR",      value: prices.AYAR22     ? formatTRY(prices.AYAR22.satis)        : "—", change: prices.AYAR22?.degisim },
    { label: "18 AYAR",      value: prices.AYAR18     ? formatTRY(prices.AYAR18.satis)        : "—", change: prices.AYAR18?.degisim },
    { label: "ONS / USD",    value: prices.ONS        ? formatUSD(prices.ONS.satis)            : "—", change: prices.ONS?.degisim },
    { label: "USD / TL",     value: prices.USDTRY     ? formatTRY(prices.USDTRY.satis, 4)     : "—", change: prices.USDTRY?.degisim },
    { label: "EUR / TL",     value: prices.EURTRY     ? formatTRY(prices.EURTRY.satis, 4)     : "—", change: prices.EURTRY?.degisim },
    { label: "YENİ ÇEYREK", value: prices.CEYREK_YENI ? formatTRY(prices.CEYREK_YENI.satis)  : "—", change: prices.CEYREK_YENI?.degisim },
    { label: "YENİ TAM",    value: prices.TAM_YENI    ? formatTRY(prices.TAM_YENI.satis)      : "—", change: prices.TAM_YENI?.degisim },
  ].filter(i => i.value !== "—");

  const displayItems = items.length > 0 ? items : [
    { label: "HAS ALTIN", value: "—" },
    { label: "ONS / USD", value: "—" },
    { label: "USD / TL",  value: "—" },
  ];

  // Sonsuz döngü için iki kez tekrarla
  const repeated = [...displayItems, ...displayItems];

  const statusIcon = status === "connected"
    ? <Zap className="w-3 h-3 text-emerald-400" />
    : <Wifi className="w-3 h-3 text-amber-400" />;

  return (
    <div className="w-full bg-card border-y border-border py-2.5 overflow-hidden flex relative select-none">
      {/* Gradient maskeler */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

      {/* Kayar bant */}
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {repeated.map((item, idx) => {
          const up = (item.change ?? 0) >= 0;
          return (
            <span key={idx} className="flex items-center gap-2 px-5">
              <span className="text-xs font-medium text-muted-foreground tracking-wider">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
              {item.change !== undefined && (
                <span className={`text-xs flex items-center gap-0.5 ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatChange(item.change)}
                </span>
              )}
              <span className="text-border/50 ml-2">·</span>
            </span>
          );
        })}
      </div>

      {/* Kaynak rozeti */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-1 bg-card px-2 py-1 border-l border-border">
        {statusIcon}
        <span className="text-[10px] text-muted-foreground">
          {status === "connected" ? "HaremAltin" : status === "fallback" ? "Bigpara" : "…"}
        </span>
      </div>
    </div>
  );
}
