import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Bize Ulaşın</span>
            <h1 className="text-5xl font-serif mb-6">İletişim</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sorularınız, randevu talepleriniz ve özel tasarım istekleriniz için yanınızdayız.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          
          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-card border border-border p-8 md:p-12">
              <h2 className="text-3xl font-serif mb-8">Mesaj Gönderin</h2>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px] flex flex-col items-center justify-center text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mb-6" />
                    <h3 className="text-2xl font-serif mb-2">Mesajınız Alındı</h3>
                    <p className="text-muted-foreground font-light">
                      Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Ad Soyad</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors rounded-none"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">E-posta</label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Telefon</label>
                        <input 
                          type="tel" 
                          className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Konu</label>
                      <select className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors appearance-none rounded-none">
                        <option>Genel Bilgi</option>
                        <option>Yatırım Danışmanlığı</option>
                        <option>Özel Tasarım Talebi</option>
                        <option>Randevu Talebi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Mesajınız</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-background border border-border text-foreground p-4 focus:outline-none focus:border-primary transition-colors rounded-none resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-4 font-medium uppercase tracking-wider hover:bg-primary/90 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="flex flex-col h-full justify-between">
              
              <div className="space-y-10 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Mağaza Adresi</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      Mollafenari Mahallesi,<br />
                      Nuruosmaniye Caddesi No:1<br />
                      Fatih / İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Telefon</h3>
                    <p className="text-muted-foreground font-light mb-1">+90 (212) 555 55 55</p>
                    <p className="text-muted-foreground font-light">+90 (212) 555 55 56</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">E-posta</h3>
                    <p className="text-muted-foreground font-light mb-1">info@sarraf.com.tr</p>
                    <p className="text-muted-foreground font-light">yatirim@sarraf.com.tr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2">Çalışma Saatleri</h3>
                    <p className="text-muted-foreground font-light mb-1">Pzt - Cmt: 09:00 - 18:30</p>
                    <p className="text-muted-foreground font-light">Pazar: Kapalı</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/905555555555" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] text-white flex items-center justify-center gap-3 px-8 py-5 font-medium uppercase tracking-wider hover:bg-[#20bd5a] transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
                WhatsApp Canlı Destek
              </a>

            </div>
          </ScrollReveal>

        </div>

        {/* Map Placeholder */}
        <ScrollReveal>
          <div className="w-full h-[400px] bg-card border border-border flex items-center justify-center overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Map View" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="relative z-10 flex flex-col items-center">
              <MapPin className="w-10 h-10 text-primary mb-4" />
              <span className="font-serif text-2xl mb-2">SARRAF Kapalıçarşı</span>
              <a href="#" className="text-sm text-primary uppercase tracking-widest hover:underline">Haritada Aç</a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
