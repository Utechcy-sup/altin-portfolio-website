import { useGoldPrice, formatTRY, formatUSD } from "@/hooks/useGoldPrice";
import { TrendingUp } from "lucide-react";

export function GoldTicker() {
  const { has, k22, k18, onsUSD, loading } = useGoldPrice();

  if (loading) {
    return (
      <div className="w-full bg-card border-y border-border py-3 overflow-hidden flex items-center justify-center">
        <span className="text-sm text-muted-foreground animate-pulse">Canlı piyasa verileri yükleniyor...</span>
      </div>
    );
  }

  const items = [
    { label: "HAS ALTIN", value: formatTRY(has) },
    { label: "22 AYAR", value: formatTRY(k22) },
    { label: "18 AYAR", value: formatTRY(k18) },
    { label: "ONS/USD", value: formatUSD(onsUSD) },
  ];

  return (
    <div className="w-full bg-card border-y border-border py-2.5 overflow-hidden flex relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10"></div>
      
      <div className="flex animate-marquee whitespace-nowrap min-w-full">
        {/* We map twice to create an infinite loop effect if needed, but for simplicity we'll just show them spaced out */}
        <div className="flex items-center gap-8 px-4 w-full justify-around max-w-7xl mx-auto">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
              <TrendingUp className="w-3 h-3 text-primary" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
