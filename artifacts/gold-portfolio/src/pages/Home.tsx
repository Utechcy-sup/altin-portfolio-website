import { motion } from "framer-motion";
import { Link } from "wouter";
import { GoldTicker } from "@/components/GoldTicker";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/data/products";
import { Shield, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const miniChartData = [
  { value: 2000 }, { value: 2050 }, { value: 2020 }, { value: 2100 }, 
  { value: 2080 }, { value: 2150 }, { value: 2200 }, { value: 2180 }, 
  { value: 2250 }, { value: 2340 }
];

export default function Home() {
  const [email, setEmail] = useState("");
  
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Gold Texture" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-primary tracking-[0.3em] text-sm uppercase mb-6 block font-medium">Babadan Oğula Gelenek</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight">
              Zamanın Ötesinde <br/> <span className="gold-text-gradient italic">Değer</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
              Kapalıçarşı'nın kalbinden, en saf haliyle sunulan altın yatırımları ve el işçiliği mücevheratlar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/collections">
                <div className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors uppercase tracking-wider min-w-[200px]">
                  Koleksiyonu Keşfet
                </div>
              </Link>
              <Link href="/gold-prices">
                <div className="bg-transparent border border-primary text-primary px-8 py-4 text-sm font-medium cursor-pointer hover:bg-primary/10 transition-colors uppercase tracking-wider min-w-[200px]">
                  Canlı Fiyatlar
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gold Ticker */}
      <GoldTicker />

      {/* Trust Pillars */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Sertifikalı Kalite</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tüm ürünlerimiz uluslararası geçerliliğe sahip sertifikalarla ve garanti belgesiyle sunulmaktadır.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-4">Şeffaf Fiyatlandırma</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Canlı borsa verileriyle senkronize, komisyonsuz ve tamamen şeffaf fiyatlandırma politikası.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl mb-4">30 Yıllık Deneyim</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Yarım asra yaklaşan Kapalıçarşı tecrübemizle, güvenilir yatırımın değişmez adresi.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <ScrollReveal direction="left">
              <div>
                <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Özel Seçki</span>
                <h2 className="text-4xl md:text-5xl font-serif">Öne Çıkan <span className="italic text-muted-foreground">Eserler</span></h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Link href="/collections">
                <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors uppercase text-sm tracking-wider cursor-pointer group font-medium">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={0.1 * (idx + 1)}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <ScrollReveal direction="left">
              <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Piyasa Analizi</span>
              <h2 className="text-4xl font-serif mb-6">Yatırımınızı <br/> Güvenceye Alın</h2>
              <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
                Altın, yüzyıllardır değerini koruyan en güvenli limandır. Uzman analistlerimizin hazırladığı raporlar ve anlık fiyat takibi ile yatırımlarınıza yön verin.
              </p>
              <Link href="/gold-prices">
                <div className="inline-flex bg-background border border-border text-foreground px-8 py-4 text-sm font-medium cursor-pointer hover:border-primary transition-colors uppercase tracking-wider">
                  Detaylı Piyasa Verileri
                </div>
              </Link>
            </ScrollReveal>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <ScrollReveal direction="right">
              <div className="bg-background border border-border p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp className="w-24 h-24 text-primary" />
                </div>
                <h4 className="font-serif text-xl mb-2">Ons Altın Trendi</h4>
                <div className="text-3xl text-primary font-light mb-8">$2,340.50 <span className="text-sm text-green-500 ml-2">↑ +1.2%</span></div>
                
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={miniChartData}>
                      <defs>
                        <linearGradient id="colorGoldMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#C9A84C" fillOpacity={1} fill="url(#colorGoldMini)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif">Müşteri Yorumları</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Yıllardır tüm altın yatırımlarımı SARRAF aracılığıyla yapıyorum. Şeffaf fiyat politikaları ve güvenilirlikleri eşsiz.",
                author: "Mehmet K.",
                title: "Yatırımcı"
              },
              {
                text: "Düğün setimizi buradan aldık. İşçilik kalitesi ve özel tasarım detayları gerçekten göz kamaştırıcı.",
                author: "Ayşe & Burak D.",
                title: "Müşteri"
              },
              {
                text: "Kapalıçarşı'da böyle vizyoner ve kaliteli hizmet veren nadir kurumlardan biri. Müşteri memnuniyeti üst düzeyde.",
                author: "Hakan Y.",
                title: "Koleksiyoner"
              }
            ].map((testimonial, idx) => (
              <ScrollReveal key={idx} delay={0.1 * (idx + 1)}>
                <div className="border-l-2 border-primary pl-6 py-2">
                  <p className="text-muted-foreground mb-6 font-light italic leading-relaxed text-lg">"{testimonial.text}"</p>
                  <div>
                    <div className="text-foreground font-medium">{testimonial.author}</div>
                    <div className="text-xs text-primary uppercase tracking-wider">{testimonial.title}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Piyasa Raporları Cebinize Gelsin</h2>
            <p className="mb-10 text-primary-foreground/80 text-lg">
              Haftalık altın bülteni, özel indirimler ve yeni koleksiyonlardan ilk siz haberdar olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 px-6 py-4 focus:outline-none focus:border-primary-foreground transition-colors rounded-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-primary-foreground text-primary px-8 py-4 font-medium uppercase tracking-wider hover:bg-white transition-colors"
              >
                Abone Ol
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
