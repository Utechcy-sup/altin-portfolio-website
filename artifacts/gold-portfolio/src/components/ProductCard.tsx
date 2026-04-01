import { Product } from "@/data/products";
import { formatTRY } from "@/hooks/useGoldPrice";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/collections/${product.id}`}>
      <motion.div
        className="group cursor-pointer bg-white border border-border flex flex-col overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" } as any}
      >
        {/* Image Area */}
        <div className="relative overflow-hidden aspect-[3/4] bg-[#F5F0E8]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold text-[#9A7520] border border-[#C9A84C]/30">
              {product.badge}
            </div>
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-400 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <div className="bg-white text-foreground text-xs uppercase tracking-widest px-6 py-3 font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              İncele <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#C9A84C] font-semibold">{product.category}</span>
            <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5">{product.weight}</span>
          </div>
          <h3 className="font-serif text-[1.05rem] text-foreground leading-snug line-clamp-2">{product.title}</h3>
          <div className="pt-1 flex items-center justify-between">
            <span className="text-base font-semibold text-foreground tracking-tight">{formatTRY(product.price)}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">+ KDV</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
