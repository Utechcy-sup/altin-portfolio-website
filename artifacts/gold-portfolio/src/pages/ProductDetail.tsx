import { useParams, Link } from "wouter";
import { PRODUCTS } from "@/data/products";
import { formatTRY } from "@/hooks/useGoldPrice";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { ChevronLeft, Info, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-serif mb-4">Ürün Bulunamadı</h1>
          <p className="text-muted-foreground mb-8">Aradığınız ürün yayından kaldırılmış veya mevcut olmayabilir.</p>
          <Link href="/collections">
            <div className="inline-block border border-primary text-primary px-8 py-3 text-sm uppercase tracking-wider cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
              Koleksiyonlara Dön
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/collections">
          <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 cursor-pointer uppercase text-xs tracking-widest font-medium">
            <ChevronLeft className="w-4 h-4" /> Koleksiyonlara Dön
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-card border border-border overflow-hidden relative"
          >
            {product.badge && (
              <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur-sm border border-border text-primary text-xs uppercase tracking-widest px-4 py-2 font-medium">
                {product.badge}
              </div>
            )}
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary tracking-widest text-sm uppercase mb-4 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">{product.title}</h1>
            <div className="text-3xl font-light mb-8 text-foreground">{formatTRY(product.price)}</div>
            
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-light">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-border">
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Ayar</span>
                <span className="text-lg font-medium">{product.karat}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Ağırlık</span>
                <span className="text-lg font-medium">{product.weight}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Stok Kodu</span>
                <span className="text-lg font-medium">SRF-{product.id.toUpperCase()}</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Teslimat</span>
                <span className="text-lg font-medium">Aynı Gün Kargo</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/905555555555?text=Merhaba, ${product.title} (Kod: SRF-${product.id.toUpperCase()}) hakkında bilgi almak istiyorum.`}
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-green-600 text-white flex items-center justify-center gap-3 px-8 py-4 font-medium uppercase tracking-wider hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp'tan Bilgi Al
              </a>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Sertifikalı ve Sigortalı Gönderim
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Info className="w-5 h-5 text-primary" />
                Fiyatlar anlık kura göre değişiklik gösterebilir.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif mb-10 text-center border-t border-border pt-16">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
