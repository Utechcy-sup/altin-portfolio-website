import { ScrollReveal } from "@/components/ScrollReveal";
import { Award, Target, Users, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
        
        setCount(Math.floor(from + (to - from) * easeProgress));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Kapalıçarşı" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary tracking-[0.2em] text-sm uppercase mb-4 block">Hikayemiz</span>
            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6">Miras ve <span className="italic text-primary">Ustalık</span></h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              1994'ten bu yana, Kapalıçarşı'nın derin köklerinden gelen bir tutkuyla, altının en saf halini sanatla buluşturuyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <ScrollReveal direction="right" className="order-2 lg:order-1">
              <div className="aspect-square bg-card relative overflow-hidden border border-border p-4">
                <div className="w-full h-full bg-[#1A1A1A] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Ustalık" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" className="order-1 lg:order-2">
              <h2 className="text-4xl font-serif mb-6">Ustalığın İzi</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
                Saygin Jewellery & Gold, temelleri Kapalıçarşı'nın tarihi dokusunda atılmış bir mücevher ve yatırım evidir. Birinci nesilden devralınan dürüstlük ve zanaatkarlık mirasını, modern dünyanın standartlarıyla birleştirerek yola devam ediyoruz.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                Bize göre her mücevher bir hikaye anlatır; her yatırım bir geleceği inşa eder. Bu yüzden tezgahımızdan çıkan her parça ve yaptığımız her işlem, adımızın taşıdığı ağırlığa layık olmak zorundadır.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <h2 className="text-4xl font-serif mb-6">Güven İnşa Ediyoruz</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
                Müşterilerimizle kurduğumuz ilişki bir alışverişten çok daha fazlasıdır. İster düğün hazırlığındaki bir çift, ister büyük ölçekli bir yatırımcı olsun; Saygin Gold kapısından içeri giren herkes aynı şeffaflık, dürüstlük ve özenle karşılanır.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                Uluslararası sertifikasyonlarımız, kusursuz işçilik garantimiz ve canlı piyasaya entegre fiyatlandırmamızla altın sektöründe standartları belirliyoruz.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left">
              <div className="aspect-square bg-card relative overflow-hidden border border-border p-4">
                <div className="w-full h-full bg-[#1A1A1A] relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Yatırım" 
                    className="w-full h-full object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary-foreground/20 border-y border-primary-foreground/20 py-12">
            <div>
              <div className="text-4xl md:text-5xl font-serif mb-2"><Counter from={0} to={30} />+</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Yıllık Tecrübe</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif mb-2"><Counter from={0} to={5} />k+</div>
              <div className="text-sm uppercase tracking-widest opacity-80">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif mb-2">%<Counter from={0} to={100} /></div>
              <div className="text-sm uppercase tracking-widest opacity-80">Sertifikalı Ürün</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif mb-2"><Counter from={0} to={3} /></div>
              <div className="text-sm uppercase tracking-widest opacity-80">Kuşak</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl font-serif mb-4">Değerlerimiz</h2>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 border border-border hover:border-primary transition-colors h-full bg-background">
                <Award className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-4">Mükemmeliyet</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Kaliteden asla ödün vermez, her detayı titizlikle inceleriz.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 border border-border hover:border-primary transition-colors h-full bg-background">
                <ShieldCheck className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-4">Şeffaflık</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Fiyatlandırma ve ürün içeriklerinde tam şeffaflık sağlarız.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="p-8 border border-border hover:border-primary transition-colors h-full bg-background">
                <Target className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-4">Vizyon</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Geleneksel değerleri modern yatırım araçlarıyla harmanlarız.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="p-8 border border-border hover:border-primary transition-colors h-full bg-background">
                <Users className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-serif mb-4">Sadakat</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Müşterilerimizle ömür boyu sürecek güven bağları kurarız.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </div>
  );
}
