import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Clock, ChevronRight } from "lucide-react";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

  const filteredPosts = activeCategory === "Tümü" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const featuredPost = BLOG_POSTS[0];
  const gridPosts = filteredPosts.filter(p => p.id !== featuredPost.id || activeCategory !== "Tümü");

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary tracking-widest text-xs uppercase mb-4 block">Yatırım Notları</span>
            <h1 className="text-5xl font-serif mb-6">Blog & Haberler</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Altın piyasaları, yatırım stratejileri ve mücevher dünyasına dair uzman analizleri.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-border pb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`pb-2 text-sm uppercase tracking-wider transition-colors relative ${
                activeCategory === category 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div 
                  layoutId="blog-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Featured Post (only show if viewing All) */}
        {activeCategory === "Tümü" && (
          <ScrollReveal>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-8 bg-card border border-border mb-16 overflow-hidden">
                <div className="h-[300px] lg:h-full overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-xs tracking-widest uppercase text-muted-foreground">
                    <span className="text-primary">{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-serif mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium">{featuredPost.author}</span>
                    <span className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider font-medium">
                      Devamını Oku <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridPosts.map((post, idx) => (
            <ScrollReveal key={post.id} delay={0.1 * (idx % 2)}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group cursor-pointer bg-card border border-border flex flex-col h-full overflow-hidden">
                  <div className="h-[240px] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4 text-xs tracking-widest uppercase text-muted-foreground">
                      <span className="text-primary">{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 font-light flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider font-medium mt-auto group-hover:translate-x-2 transition-transform">
                      Devamını Oku <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            Bu kategoride yazı bulunamadı.
          </div>
        )}

      </div>
    </div>
  );
}
