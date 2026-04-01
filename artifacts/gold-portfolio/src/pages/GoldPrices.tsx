import { useState } from "react";
import { motion } from "framer-motion";
import { useGoldPrice, formatTRY, formatUSD } from "@/hooks/useGoldPrice";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, Clock, ArrowRightLeft, TrendingUp } from "lucide-react";

// Mock data for chart
const generateChartData = (days: number) => {
  const data = [];
  const basePrice = 2400;
  let currentPrice = basePrice;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    currentPrice = currentPrice + (Math.random() * 40 - 15); // Random walk with upward bias
    data.push({
      date: date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
      price: currentPrice
    });
  }
  return data;
};

const CHART_TABS = [
  { label: "7G", days: 7 },
  { label: "1A", days: 30 },
  { label: "3A", days: 90 },
];

export default function GoldPrices() {
  const { has, k22, k18, onsUSD, loading } = useGoldPrice();
  
  const [activeTab, setActiveTab] = useState(CHART_TABS[0]);
  const [calcGrams, setCalcGrams] = useState<string>("10");
  const [calcKarat, setCalcKarat] = useState<string>("has");

  const chartData = generateChartData(activeTab.days);

  const getCalcPrice = () => {
    const weight = parseFloat(calcGrams) || 0;
    let unitPrice = 0;
    if (calcKarat === "has") unitPrice = has;
    if (calcKarat === "k22") unitPrice = k22;
    if (calcKarat === "k18") unitPrice = k18;
    return formatTRY(weight * unitPrice);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-4 shadow-xl">
          <p className="text-muted-foreground text-xs mb-1">{label}</p>
          <p className="text-primary font-medium text-lg">
            {formatUSD(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Canlı Piyasalar</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Altın Fiyatları</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uluslararası piyasalarla senkronize, anlık altın fiyatları ve detaylı analiz araçları.
            </p>
          </ScrollReveal>
        </div>

        {/* Live Prices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Has Altın (24K)", price: has, format: formatTRY, desc: "Gram Fiyatı" },
            { label: "22 Ayar", price: k22, format: formatTRY, desc: "Gram Fiyatı" },
            { label: "18 Ayar", price: k18, format: formatTRY, desc: "Gram Fiyatı" },
            { label: "Ons Altın", price: onsUSD, format: formatUSD, desc: "USD" },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx}>
              <div className="bg-card border border-border p-6 hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">{item.label}</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-light text-foreground mb-1">
                  {loading ? "..." : item.format(item.price)}
                </div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-card border border-border p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h3 className="font-serif text-2xl">Ons Altın Grafiği (USD)</h3>
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
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#404040" 
                    fontSize={12} 
                    tickMargin={10} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    stroke="#404040" 
                    fontSize={12}
                    tickFormatter={(val) => `$${val}`}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#C9A84C" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorGold)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="bg-card border border-border p-6 flex flex-col">
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" /> Altın Hesapla
            </h3>
            
            <div className="space-y-6 flex-1">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Ayar Seçimi</label>
                <select 
                  className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors appearance-none rounded-none"
                  value={calcKarat}
                  onChange={(e) => setCalcKarat(e.target.value)}
                >
                  <option value="has">Has Altın (24K)</option>
                  <option value="k22">22 Ayar Altın</option>
                  <option value="k18">18 Ayar Altın</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Miktar (Gram)</label>
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors rounded-none"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="flex justify-center py-4">
                <ArrowRightLeft className="w-6 h-6 text-muted-foreground rotate-90" />
              </div>

              <div className="bg-background border border-border p-6 text-center mt-auto">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Tahmini Tutar</div>
                <div className="text-3xl font-medium text-primary">
                  {loading ? "..." : getCalcPrice()}
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 p-6 flex items-start gap-4">
          <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <h4 className="text-foreground font-medium mb-1">Veri Güncelliği</h4>
            <p className="text-sm text-muted-foreground">
              Sayfadaki fiyatlar uluslararası piyasalardan anlık olarak alınmaktadır. Fiziksel alım-satım işlemlerinde Kapalıçarşı güncel kurları ve işçilik maliyetleri nedeniyle fiyat farklılıkları görülebilir. Kesin fiyat bilgisi için iletişime geçiniz.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
