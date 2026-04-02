import { motion } from "framer-motion";
import { Link } from "wouter";
import { GoldTicker } from "@/components/GoldTicker";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/data/products";
import { Shield, TrendingUp, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const miniChartData = [
  { value: 2000 }, { value: 2050 }, { value: 2020 }, { value: 2100 },
  { value: 2080 }, { value: 2150 }, { value: 2200 }, { value: 2180 },
  { value: 2250 }, { value: 2340 }
];

const CATEGORIES_VISUAL = [
  {
    label: "Kadınlar İçin",
    sub: "Yüzük & Kolye",
    image: "/assets/cat_women.png",
    href: "/collections",
  },
  {
    label: "Erkekler İçin",
    sub: "Bileklik & Zincir",
    image: "/assets/cat_men.png",
    href: "/collections",
  },
  {
    label: "Yatırım Altını",
    sub: "Külçe & Cumhuriyet",
    image: "/assets/cat_investment.png",
    href: "/gold-prices",
  },
  {
    label: "Özel Tasarım",
    sub: "Sipariş & Atölye",
    image: "/assets/cat_custom_v2.png",
    href: "/contact",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background w-full overflow-x-hidden">

      {/* ── HERO: Responsive Split/Stacked Banner ────────────────────────── */}
      <section className="h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel — Kadınlar İçin */}
        <motion.div
          className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden cursor-pointer group"
          initial={{ opacity: 0, y: -40, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <Link href="/collections">
            <div className="w-full h-full">
              <img
                src="/assets/hero_women.png"
                alt="Kadınlar İçin"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:from-black/55" />

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-8 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <p className="text-[10px] md:text-sm italic tracking-[0.3em] mb-2 md:mb-3 font-light text-white/90">Kadınlar İçin</p>
                  <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6">
                    Zarafetin<br />Simgesi
                  </h2>
                  <div className="inline-flex items-center gap-2 border border-white/60 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] px-5 py-2.5 md:px-6 md:py-3 hover:bg-white hover:text-foreground transition-all duration-300">
                    Koleksiyonu Keşfet
                  </div>
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Right Panel — Erkekler İçin */}
        <motion.div
          className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden cursor-pointer group"
          initial={{ opacity: 0, y: 40, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Link href="/collections">
            <div className="w-full h-full border-t md:border-t-0 md:border-l border-white/10">
              <img
                src="/assets/hero_men.png"
                alt="Erkekler İçin"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent md:from-black/55" />

              <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 px-8 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                >
                  <p className="text-[10px] md:text-sm italic tracking-[0.3em] mb-2 md:mb-3 font-light text-white/90">Erkekler İçin</p>
                  <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-6">
                    Gücün<br />Altını
                  </h2>
                  <div className="inline-flex items-center gap-2 border border-white/60 text-white text-[10px] md:text-xs uppercase tracking-[0.2em] px-5 py-2.5 md:px-6 md:py-3 hover:bg-white hover:text-foreground transition-all duration-300">
                    Koleksiyonu Keşfet
                  </div>
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Gold Ticker */}
      <GoldTicker />

      {/* ── BRAND INTRO ─────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto px-6">
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-medium block mb-4">1994'ten Bu Yana</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">Saygin Gold'a Hoş Geldiniz</h2>
            <div className="w-10 h-px bg-[#C9A84C] mx-auto mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              Kapalıçarşı'nın kalbinden doğan 30 yıllık ustalaşmış el işçiliği ve güvenin bir yansıması. Her parça, değerini taşıyan bir miras.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── CATEGORY VISUAL GRID ────────────────────────────────────── */}
      <section className="pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES_VISUAL.map((cat, idx) => (
            <ScrollReveal key={cat.label} delay={0.08 * idx}>
              <Link href={cat.href}>
                <div className="group relative overflow-hidden cursor-pointer aspect-[3/4]">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-all duration-400" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4 text-center text-white">
                    <p className="text-[10px] uppercase tracking-widest text-white/75 mb-1">{cat.sub}</p>
                    <h3 className="font-serif text-lg md:text-xl leading-tight mb-3">{cat.label}</h3>
                    <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                      Gör <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── TRUST PILLARS ───────────────────────────────────────────── */}
      <section className="py-20 bg-[#FAF8F3] border-y border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center mb-5 border border-[#C9A84C]/40 text-[#C9A84C]">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl mb-3 text-foreground">Sertifikalı Kalite</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Tüm ürünlerimiz uluslararası geçerliliğe sahip sertifikalarla ve garanti belgesiyle sunulmaktadır.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center mb-5 border border-[#C9A84C]/40 text-[#C9A84C]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl mb-3 text-foreground">Şeffaf Fiyatlandırma</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Canlı borsa verileriyle senkronize, komisyonsuz ve tamamen şeffaf fiyatlandırma politikası.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center mb-5 border border-[#C9A84C]/40 text-[#C9A84C]">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl mb-3 text-foreground">30 Yıllık Deneyim</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Yarım asra yaklaşan Kapalıçarşı tecrübemizle, güvenilir yatırımın değişmez adresi.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL FULL-WIDTH IMAGE ──────────────────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="/assets/editorial_bg.png"
          alt="Mücevher"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <ScrollReveal>
            <div className="text-white">
              <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/80">Özel Tasarım Atölyesi</p>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Her Parça Bir<br /><em>Sanat Eseri</em></h2>
              <Link href="/collections">
                <div className="inline-flex items-center gap-3 border border-white text-white text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-foreground transition-all duration-300 cursor-pointer">
                  Koleksiyonu Keşfet <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <ScrollReveal direction="left">
              <div>
                <span className="text-[#C9A84C] tracking-widest text-xs uppercase mb-3 block">Özel Seçki</span>
                <h2 className="text-4xl md:text-5xl font-serif text-foreground">Öne Çıkan <span className="italic text-muted-foreground">Eserler</span></h2>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <Link href="/collections">
                <div className="flex items-center gap-2 text-[#C9A84C] hover:text-[#9A7520] transition-colors uppercase text-xs tracking-widest cursor-pointer group font-medium">
                  Tümünü Gör
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} delay={0.08 * (idx + 1)}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL IMAGE EDITORIAL ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left — large */}
          <ScrollReveal direction="left">
            <Link href="/collections">
              <div className="group relative overflow-hidden h-[420px] cursor-pointer border border-border/50">
                <img
                  src="/assets/gold_bracelets.png"
                  alt="Altın Bileklikler"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute bottom-8 left-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold mb-2">Yeni Sezon</p>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight">Altın Bileklikler</h3>
                    <div className="mt-4 h-[1px] w-0 group-hover:w-16 bg-[#C9A84C] transition-all duration-500" />
                  </motion.div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Right — stacked two */}
          <div className="flex flex-col gap-4">
            <ScrollReveal direction="right" delay={0.1}>
              <Link href="/gold-prices">
                <div className="group relative overflow-hidden h-[202px] cursor-pointer border border-border/50">
                  <img
                    src="/assets/gold_bullion.png"
                    alt="Yatırım Altını"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold mb-1">Yatırım</p>
                    <h3 className="font-serif text-2xl lg:text-3xl">Külçe Altın</h3>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <Link href="/contact">
                <div className="group relative overflow-hidden h-[202px] cursor-pointer border border-border/50">
                  <img
                    src="/assets/custom_order.png"
                    alt="Özel Sipariş"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold mb-1">Atölye</p>
                    <h3 className="font-serif text-2xl lg:text-3xl">Özel Sipariş</h3>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MARKET OVERVIEW ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAF8F3] border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <ScrollReveal direction="left">
              <span className="text-[#C9A84C] tracking-widest text-xs uppercase mb-4 block">Piyasa Analizi</span>
              <h2 className="text-4xl font-serif mb-6 text-foreground">Yatırımınızı <br /> Güvenceye Alın</h2>
              <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
                Altın, yüzyıllardır değerini koruyan en güvenli limandır. Uzman analistlerimizin hazırladığı raporlar ve anlık fiyat takibi ile yatırımlarınıza yön verin.
              </p>
              <Link href="/gold-prices">
                <div className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-4 text-sm font-medium cursor-pointer hover:bg-foreground hover:text-background transition-colors uppercase tracking-wider group">
                  Detaylı Piyasa Verileri
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          </div>

          <div className="lg:w-1/2 w-full">
            <ScrollReveal direction="right">
              <div className="bg-white border border-border p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <TrendingUp className="w-24 h-24 text-foreground" />
                </div>
                <h4 className="font-serif text-xl mb-2 text-foreground">Ons Altın Trendi</h4>
                <div className="text-3xl text-[#C9A84C] font-light mb-8">$2,340.50 <span className="text-sm text-green-600 ml-2">↑ +1.2%</span></div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={miniChartData}>
                      <defs>
                        <linearGradient id="colorGoldMini" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#C9A84C" strokeWidth={2} fillOpacity={1} fill="url(#colorGoldMini)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase block mb-3">Müşteri Sesleri</span>
              <h2 className="text-4xl font-serif text-foreground">Müşteri Yorumları</h2>
              <div className="w-10 h-px bg-[#C9A84C] mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                text: "Yıllardır tüm altın yatırımlarımı Saygin Gold aracılığıyla yapıyorum. Şeffaf fiyat politikaları ve güvenilirlikleri eşsiz.",
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
                <div className="bg-white border border-border p-8 shadow-sm">
                  <div className="text-[#C9A84C] text-3xl font-serif leading-none mb-4">"</div>
                  <p className="text-muted-foreground mb-8 font-light italic leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="border-t border-border pt-4">
                    <div className="text-foreground font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-[#C9A84C] uppercase tracking-wider mt-0.5">{testimonial.title}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#1A1714] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase block mb-4">Bülten</span>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Piyasa Raporları Cebinize Gelsin</h2>
            <p className="mb-10 text-white/60 text-base font-light">
              Haftalık altın bülteni, özel indirimler ve yeni koleksiyonlardan ilk siz haberdar olun.
            </p>
            <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-white/40 px-6 py-4 focus:outline-none focus:border-[#C9A84C] transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-[#C9A84C] text-[#1A1714] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#E2C26A] transition-colors text-sm"
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
