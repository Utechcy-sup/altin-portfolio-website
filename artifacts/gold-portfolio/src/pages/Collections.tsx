import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const filteredProducts = activeCategory === "Tümü" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Zarafetin Simgesi</span>
            <h1 className="text-5xl font-serif mb-6">Koleksiyonlar</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Usta ellerde şekillenen, altın ve değerli taşların eşsiz uyumunu yansıtan özel tasarım mücevher ve yatırım ürünlerimiz.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          <button
            onClick={() => setActiveCategory("Tümü")}
            className={`px-6 py-2 text-sm uppercase tracking-wider border transition-colors ${
              activeCategory === "Tümü" 
                ? "border-primary bg-primary/10 text-primary" 
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            Tümü
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm uppercase tracking-wider border transition-colors ${
                activeCategory === category 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            Bu kategoride ürün bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}
