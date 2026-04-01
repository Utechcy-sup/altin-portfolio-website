import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = false;

  const navLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Koleksiyonlar", path: "/collections" },
    { name: "Altın Fiyatları", path: "/gold-prices" },
    { name: "Hakkımızda", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "İletişim", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${transparent
            ? "bg-transparent py-6"
            : "bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary group-hover:scale-105 transition-transform">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6L6 12L12 18L18 12L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={`font-serif text-2xl tracking-widest transition-colors group-hover:text-primary ${transparent ? "text-white" : "text-foreground"
                  }`}>SAYGIN GOLD</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location === link.path;
                return (
                  <Link key={link.name} href={link.path}>
                    <div className="relative cursor-pointer py-1 group">
                      <span className={`text-sm font-medium transition-colors ${isActive
                          ? "text-primary"
                          : transparent
                            ? "text-white/80 group-hover:text-white"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                          initial={false}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className={`transition-colors p-2 ${transparent ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-primary"}`}>
                <Search className="w-5 h-5" />
              </button>
              <a href="https://wa.me/905555555555" target="_blank" rel="noreferrer" className={`transition-colors p-2 ${transparent ? "text-white/70 hover:text-green-400" : "text-muted-foreground hover:text-green-600"}`}>
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <Link href="/contact">
                <div className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium cursor-pointer hover:bg-primary/90 transition-colors uppercase tracking-wider">
                  Teklif Al
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors ${transparent ? "text-white" : "text-foreground"}`}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#FAF8F3] z-[9999] flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 shrink-0">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-serif text-xl tracking-widest text-foreground">SAYGIN GOLD</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <nav className="flex flex-col gap-8 text-center my-auto px-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-serif cursor-pointer transition-all duration-300 ${location === link.path
                        ? "text-primary scale-105"
                        : "text-foreground hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </nav>

            <div className="mt-12 flex flex-col gap-4 shrink-0 px-4">
              <a
                href="https://wa.me/905428511685"
                className="flex items-center justify-center gap-2 border border-border p-5 text-foreground hover:bg-secondary transition-colors"
              >
                <FaWhatsapp className="w-6 h-6 text-green-500" /> WhatsApp Destek
              </a>
              <Link href="/contact">
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-primary text-primary-foreground p-5 text-center font-medium uppercase tracking-widest cursor-pointer hover:bg-primary/95 shadow-lg active:scale-[0.98] transition-all"
                >
                  Bize Ulaşın
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
