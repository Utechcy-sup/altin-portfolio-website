import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { GoldTicker } from "@/components/GoldTicker";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PRODUCTS } from "@/data/products";
import { Shield, TrendingUp, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Babadan Oğula Gelenek",
    title: "Zamanın Ötesinde",
    titleItalic: "Değer",
    subtitle: "Kapalıçarşı'nın kalbinden, en saf haliyle sunulan altın yatırımları ve el işçiliği mücevheratlar.",
    cta: { primary: { text: "Koleksiyonu Keşfet", href: "/collections" }, secondary: { text: "Canlı Fiyatlar", href: "/gold-prices" } },
  },
  {
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Yatırımın Altın Adresi",
    title: "Has Altın",
    titleItalic: "Yatırımı",
    subtitle: "Uluslararası piyasalara entegre, sertifikalı külçe ve yatırım altınlarıyla geleceğinizi güvence altına alın.",
    cta: { primary: { text: "Altın Fiyatları", href: "/gold-prices" }, secondary: { text: "Teklif Al", href: "/contact" } },
  },
  {
    image: "https://images.unsplash.com/photo-1515562529859-bd15b08e3e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    eyebrow: "Özel Tasarım Atölyesi",
    title: "Her Parça Bir",
    titleItalic: "Sanat Eseri",
    subtitle: "Ustalarımızın elleriyle şekillenen, yalnızca sizin için tasarlanan mücevherler Saygin Jewellery'de.",
    cta: { primary: { text: "Koleksiyonu Gör", href: "/collections" }, secondary: { text: "Hakkımızda", href: "/about" } },
  },
  {
    image: "https://images.unsplash.com/photo-1573408301185-9521ecff9ee7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    eyebrow: "30 Yıllık Güven",
    title: "Kalite ve",
    titleItalic: "Güvence",
    subtitle: "Türkiye'nin köklü altın geleneğini modern standartlarla birleştiren, sertifikalı ve garantili ürünler.",
    cta: { primary: { text: "Hakkımızda", href: "/about" }, secondary: { text: "İletişim", href: "/contact" } },
  },
];

const miniChartData = [
  { value: 2000 }, { value: 2050 }, { value: 2020 }, { value: 2100 }, 
  { value: 2080 }, { value: 2150 }, { value: 2200 }, { value: 2180 }, 
  { value: 2250 }, { value: 2340 }
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[activeSlide];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image with crossfade */}
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide + "-bg"}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={slide.image}
              alt="Saygin Gold"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20 w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-primary tracking-[0.3em] text-sm uppercase mb-6 block font-medium">
                {slide.eyebrow}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight">
                {slide.title} <br />
                <span className="gold-text-gradient italic">{slide.titleItalic}</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={slide.cta.primary.href}>
                  <div className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors uppercase tracking-wider min-w-[200px]">
                    {slide.cta.primary.text}
                  </div>
                </Link>
                <Link href={slide.cta.secondary.href}>
                  <div className="bg-transparent border border-primary text-primary px-8 py-4 text-sm font-medium cursor-pointer hover:bg-primary/10 transition-colors uppercase tracking-wider min-w-[200px]">
                    {slide.cta.secondary.text}
                  </div>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-primary/40 text-primary/70 hover:border-primary hover:text-primary flex items-center justify-center transition-colors bg-background/20 backdrop-blur-sm"
          aria-label="Önceki"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-primary/40 text-primary/70 hover:border-primary hover:text-primary flex items-center justify-center transition-colors bg-background/20 backdrop-blur-sm"
          aria-label="Sonraki"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Navigation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Slayt ${i + 1}`}
              className={`transition-all duration-500 ${
                i === activeSlide
                  ? "w-8 h-[2px] bg-primary"
                  : "w-3 h-[2px] bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-10 right-8 z-20 text-primary/50 text-xs tracking-widest font-light">
          {String(activeSlide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
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
