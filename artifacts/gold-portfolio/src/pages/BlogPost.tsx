import { useParams, Link } from "wouter";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ChevronLeft, Clock, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-3xl font-serif mb-4">Yazı Bulunamadı</h1>
          <Link href="/blog">
            <div className="inline-block border border-primary text-primary px-8 py-3 text-sm uppercase tracking-wider cursor-pointer">
              Blog'a Dön
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const recentPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/blog">
          <div className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 cursor-pointer uppercase text-xs tracking-widest font-medium">
            <ChevronLeft className="w-4 h-4" /> Blog'a Dön
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="mb-8">
              <span className="text-primary tracking-widest text-sm uppercase mb-4 block">{post.category}</span>
              <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground uppercase tracking-widest pb-8 border-b border-border">
                <div className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime} Okuma</div>
              </div>
            </div>

            <div className="aspect-video w-full mb-12 border border-border">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground font-light leading-relaxed">
              <p className="text-xl text-foreground mb-8 italic border-l-4 border-primary pl-6">
                {post.excerpt}
              </p>
              
              {/* Dummy content expansion since we only have a short snippet in data */}
              <p>{post.content}</p>
              <p>Altın yatırımı yüzyıllardır süregelen, güvenilirliğini kanıtlamış bir birikim aracıdır. Makroekonomik dalgalanmalar, enflasyon endişeleri ve jeopolitik belirsizlikler her dönem altını ön plana çıkarmıştır.</p>
              <p>SARRAF uzmanları olarak her zaman uzun vadeli düşünmeyi ve sepetinizi çeşitlendirmeyi tavsiye ediyoruz. Yatırım yaparken sadece bugünün fiyatlarına değil, küresel trendlere de odaklanmak büyük önem taşımaktadır.</p>
            </div>
            
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Paylaş:</div>
              <div className="flex gap-4">
                <button className="text-muted-foreground hover:text-primary transition-colors">Twitter</button>
                <button className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</button>
                <button className="text-muted-foreground hover:text-primary transition-colors">WhatsApp</button>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              
              {/* About Box */}
              <div className="bg-card border border-border p-8 mb-8 text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl mb-3">SARRAF Bülten</h3>
                <p className="text-muted-foreground text-sm font-light mb-6">
                  Uzman analizleri ve piyasa özetleri ile yatırımlarınıza yön verin.
                </p>
                <Link href="/contact">
                  <div className="bg-primary text-primary-foreground py-3 text-sm uppercase tracking-wider font-medium cursor-pointer hover:bg-primary/90 transition-colors">
                    İletişime Geç
                  </div>
                </Link>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="font-serif text-2xl mb-6 pb-2 border-b border-border">Son Yazılar</h3>
                <div className="space-y-6">
                  {recentPosts.map(rp => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`}>
                      <div className="group cursor-pointer">
                        <div className="text-xs text-primary tracking-widest uppercase mb-1">{rp.category}</div>
                        <h4 className="font-serif text-lg group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
