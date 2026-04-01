import { Link } from "wouter";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { useGoldPrice, formatTRY } from "@/hooks/useGoldPrice";

export function Footer() {
  const { has, loading } = useGoldPrice();

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6L6 12L12 18L18 12L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-serif text-2xl tracking-widest text-foreground">SARRAF</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              30 yıllık tecrübe ile Kapalıçarşı'nın kalbinden, en değerli anlarınıza eşlik eden sertifikalı altın ve mücevherat.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border hover:border-primary">
                <FaInstagram />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border hover:border-primary">
                <FaFacebookF />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border hover:border-primary">
                <FaTwitter />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 border border-border hover:border-primary">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Kurumsal</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors text-sm">Hakkımızda</span></Link></li>
              <li><Link href="/collections"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors text-sm">Koleksiyonlar</span></Link></li>
              <li><Link href="/gold-prices"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors text-sm">Altın Fiyatları</span></Link></li>
              <li><Link href="/blog"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors text-sm">Blog & Haberler</span></Link></li>
              <li><Link href="/contact"><span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors text-sm">İletişim</span></Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Özel Tasarım Mücevher</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Kurumsal Hediye Çözümleri</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Altın Yatırım Danışmanlığı</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Ekspertiz ve Değerleme</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Güvenli Kargo</a></li>
            </ul>
          </div>

          {/* Contact & Live Price */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Canlı Piyasa</h4>
            <div className="bg-card border border-border p-4 mb-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Has Altın (Gram)</div>
              <div className="text-xl font-medium text-primary">
                {loading ? "Güncelleniyor..." : formatTRY(has)}
              </div>
            </div>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Mollafenari, Nuruosmaniye Cd. No:1</p>
              <p>Fatih / İstanbul</p>
              <p className="mt-4"><a href="tel:+902125555555" className="hover:text-primary transition-colors">+90 212 555 55 55</a></p>
              <p><a href="mailto:info@sarraf.com.tr" className="hover:text-primary transition-colors">info@sarraf.com.tr</a></p>
            </address>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SARRAF. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
