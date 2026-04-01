import { Product } from "@/data/products";
import { formatTRY } from "@/hooks/useGoldPrice";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/collections/${product.id}`}>
      <div className="group cursor-pointer bg-card border border-border h-[450px] flex flex-col relative overflow-hidden">
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm border border-border text-primary text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
            {product.badge}
          </div>
        )}

        {/* Image Area */}
        <div className="h-[65%] w-full overflow-hidden bg-[#1A1A1A] relative">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        </div>

        {/* Content Area */}
        <div className="h-[35%] p-5 flex flex-col justify-between relative z-20 bg-card transition-colors duration-300 group-hover:border-t-primary/50 group-hover:border-t">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-primary">{product.category}</span>
              <span className="text-[10px] border border-border px-2 py-0.5 text-muted-foreground">{product.weight}</span>
            </div>
            <h3 className="font-serif text-lg text-foreground line-clamp-1">{product.title}</h3>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="font-medium text-foreground">{formatTRY(product.price)}</div>
          </div>

          {/* Hover Slide-up CTA */}
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 bottom-0 bg-primary text-primary-foreground text-center py-3 text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-300"
          >
            İncele
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
