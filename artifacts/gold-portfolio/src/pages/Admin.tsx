import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Package, History, LayoutDashboard, LogOut, 
  Plus, Search, Edit2, Trash2, Check, X, AlertCircle,
  Eye, EyeOff, Save, Image as ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Bu panelde Navbar/Footer istemiyoruz, tertemiz bir yönetim alanı
// Vercel/Railway Separation: API base is now dynamic from env vars
const API_BASE = (import.meta.env.VITE_API_URL || "") + "/api/admin";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
     const savedUser = localStorage.getItem("saygin_admin");
     if (savedUser) {
       setUser(JSON.parse(savedUser));
       setIsLoggedIn(true);
     }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("saygin_admin");
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return <LoginView onSuccess={(user: any) => {
      localStorage.setItem("saygin_admin", JSON.stringify(user));
      setUser(user);
      setIsLoggedIn(true);
    }} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col pt-24">
        <div className="px-6 mb-8 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
           Yönetim Paneli
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { id: "products", label: "Koleksiyonlar", icon: <Package className="w-4 h-4" /> },
            { id: "customers", label: "Müşteriler", icon: <Users className="w-4 h-4" /> },
            { id: "history", label: "Fiyat Arşivi", icon: <History className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 text-sm ${
                activeTab === tab.id 
                ? "bg-primary text-primary-foreground font-medium shadow-lg" 
                : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Güvenli Çıkış
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background/50 pt-32 pb-24 px-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
             <h1 className="text-3xl font-serif text-foreground mb-2">
                {activeTab === "products" && "Koleksiyon Yönetimi"}
                {activeTab === "customers" && "Müşteri Kayıtları"}
                {activeTab === "history" && "Altın Fiyat Arşivi"}
             </h1>
             <p className="text-muted-foreground text-sm">
                Saygın Gold butik yönetim merkezine hoş geldiniz.
             </p>
          </div>
          <div className="text-xs text-muted-foreground">
             Aktif Kullanıcı: <span className="text-primary font-bold">@{user?.username}</span>
          </div>
        </header>

        <div className="max-w-6xl">
           <AnimatePresence mode="wait">
              {activeTab === "products" && <ProductsManager key="prod" />}
              {activeTab === "customers" && <CustomersManager key="cust" />}
              {activeTab === "history" && <HistoryViewer key="hist" />}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ── Views ────────────────────────────────────────────────────────────────

function LoginView({ onSuccess }: { onSuccess: (u: any) => void }) {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: un, password: pw })
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.user);
      } else {
        toast({ title: "Hata", description: data.message, variant: "destructive" });
      }
    } catch {
      toast({ title: "Hata", description: "Sunucu hatası.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/20" />
        <h2 className="text-2xl font-serif text-center mb-8">Admin Access</h2>
        
        <form onSubmit={handleLogin} className="space-y-5">
           <div>
             <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Username</label>
             <input 
               autoFocus
               type="text" value={un} onChange={e => setUn(e.target.value)}
               className="w-full bg-background border border-border p-3 focus:outline-none focus:border-primary transition-colors text-sm"
             />
           </div>
           <div>
             <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Password</label>
             <input 
               type="password" value={pw} onChange={e => setPw(e.target.value)}
               className="w-full bg-background border border-border p-3 focus:outline-none focus:border-primary transition-colors text-sm"
             />
           </div>
           
           <div className="pt-2 space-y-3">
             <button 
               type="submit" disabled={loading}
               className="w-full bg-primary text-primary-foreground py-3 font-medium hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50"
             >
               {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
             </button>
           </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Ürünler (Koleksiyon) Tablosu ─────────────────────────────────────
function ProductsManager() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<any>({ name: "", category: "yatirim", image_url: "", display_location: "collection" });
  const { toast } = useToast();

  const load = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      setData(await res.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const isNew = !current.id;
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? `${API_BASE}/products` : `${API_BASE}/products/${current.id}`;
    
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(current)
    });

    if (res.ok) {
      toast({ title: isNew ? "Eklendi" : "Güncellendi", description: "Ürün başarıyla kaydedildi." });
      setIsEditing(false);
      load();
    }
  };

  const del = async (id: number) => {
     if(!confirm("Emin misiniz?")) return;
     const res = await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
     if(res.ok) {
       toast({ title: "Silindi", description: "Ürün kaldırıldı." });
       load();
     }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium">Toplam <span className="text-primary">{data.length}</span> Ürün</div>
          <button 
            onClick={() => { setCurrent({ name: "", category: "yatirim", image_url: "", display_location: "collection" }); setIsEditing(true); }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-all rounded-sm"
          >
            <Plus className="w-4 h-4" /> Yeni Ürün Ekle
          </button>
       </div>

       {isEditing && (
         <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-card border border-primary/30 p-6 mb-8 shadow-xl">
            <h3 className="text-lg font-serif mb-4 flex items-center gap-2 text-primary">
               {current.id ? "Ürünü Düzenle" : "Yeni Ürün Tanımla"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground block mb-1">Ürün İsmi</label>
                    <input type="text" value={current.name} onChange={e => setCurrent({...current, name: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none"/>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground block mb-1">Kategori</label>
                    <select value={current.category} onChange={e => setCurrent({...current, category: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none">
                       <option value="kolye">Kolye</option>
                       <option value="bileklik">Bileklik</option>
                       <option value="yuzuk">Yüzük</option>
                       <option value="kategori">Yatırım</option>
                    </select>
                  </div>
               </div>
               <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground block mb-1">Resim URL (Temsili)</label>
                    <input type="text" placeholder="https://..." value={current.imageUrl} onChange={e => setCurrent({...current, imageUrl: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none"/>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-muted-foreground block mb-1">Görünüm Konumu</label>
                    <select value={current.displayLocation} onChange={e => setCurrent({...current, displayLocation: e.target.value})} className="w-full bg-background border border-border p-2 text-sm focus:border-primary focus:outline-none">
                       <option value="collection">Sadece Koleksiyon</option>
                       <option value="featured">Ana Sayfa Vitrin (Öne Çıkan)</option>
                       <option value="hero">Ana Sayfa Banner (En Üst)</option>
                    </select>
                  </div>
               </div>
               <div className="flex flex-col justify-end gap-3">
                  <button onClick={save} className="w-full bg-emerald-600 text-white py-2 text-sm font-bold flex items-center justify-center gap-2 hover:bg-emerald-700">
                     <Check className="w-4 h-4" /> Kaydet ve Yayınla
                  </button>
                  <button onClick={() => setIsEditing(false)} className="w-full bg-muted text-muted-foreground py-2 text-sm font-medium hover:bg-muted/70">
                     Vazgeç
                  </button>
               </div>
            </div>
         </motion.div>
       )}

       <div className="bg-card border border-border overflow-hidden">
          <table className="w-full">
             <thead className="bg-primary/5 text-xs text-muted-foreground border-b border-border">
                <tr>
                   <th className="py-4 px-6 text-left font-normal uppercase tracking-widest">Görsel</th>
                   <th className="py-4 px-6 text-left font-normal uppercase tracking-widest">Ürün Bilgisi</th>
                   <th className="py-4 px-6 text-left font-normal uppercase tracking-widest">Konum</th>
                   <th className="py-4 px-6 text-right font-normal uppercase tracking-widest">İşlemler</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-border/50">
                {data.map(p => (
                   <tr key={p.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="py-4 px-6">
                         <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center overflow-hidden">
                            {p.imageUrl ? <img src={p.imageUrl} alt="" className="w-full h-full object-cover"/> : <ImageIcon className="w-4 h-4 text-muted-foreground opacity-30" />}
                         </div>
                      </td>
                      <td className="py-4 px-6">
                         <div className="font-medium text-foreground text-sm">{p.name || "İsimsiz Ürün"}</div>
                         <div className="text-[10px] text-muted-foreground uppercase">{p.category}</div>
                      </td>
                      <td className="py-4 px-6">
                         <span className={`text-[10px] uppercase font-bold px-2 py-1 border ${
                            p.displayLocation === "hero" ? "border-amber-500/50 text-amber-500" :
                            p.displayLocation === "featured" ? "border-primary/50 text-primary" :
                            "border-muted text-muted-foreground"
                         }`}>
                            {p.displayLocation}
                         </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                         <div className="flex justify-end gap-2">
                            <button onClick={() => { setCurrent(p); setIsEditing(true); window.scrollTo(0,0); }} className="hover:text-primary transition-colors p-2"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => del(p.id)} className="hover:text-red-400 transition-colors p-2"><Trash2 className="w-4 h-4" /></button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </motion.div>
  );
}

// ── Fiyat Arşivi İzleyici ──────────────────────────────────────────
function HistoryViewer() {
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     fetch(`${API_BASE}/price-history`)
       .then(r => r.json())
       .then(d => setData(d))
       .finally(() => setLoading(false));
   }, []);

   return (
     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-xs text-muted-foreground mb-6 mb-6 leading-relaxed">
           Sistem her 30 dakikada bir aşağıdaki snapshot'ları otomatik kaydeder. Bu veriler grafik çiziminde kullanılır.
        </p>
        <div className="bg-card border border-border rounded-sm overflow-hidden">
           <table className="w-full text-sm">
              <thead className="bg-primary/5 border-b border-border text-xs text-muted-foreground">
                 <tr>
                    <th className="p-4 text-left font-normal">Zaman Damgası</th>
                    <th className="p-4 text-left font-normal">Sembol</th>
                    <th className="p-4 text-left font-normal">Alış</th>
                    <th className="p-4 text-left font-normal text-right">Satış</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border/50 tabular-nums">
                 {data.map(h => (
                   <tr key={h.id} className="hover:bg-primary/5">
                      <td className="p-4 text-muted-foreground">{new Date(h.timestamp).toLocaleString("tr-TR")}</td>
                      <td className="p-4 font-bold text-primary">{h.symbol}</td>
                      <td className="p-4">₺{h.buyPrice}</td>
                      <td className="p-4 text-right">₺{h.sellPrice}</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
     </motion.div>
   );
}

// ── Müşteriler (Kısa Görünüm) ──────────────────────────────────────
function CustomersManager() {
   const [data, setData] = useState<any[]>([]);
   useEffect(() => {
     fetch(`${API_BASE}/customers`)
       .then(r => r.json())
       .then(d => setData(d));
   }, []);

   return (
     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center py-12 bg-card border border-border border-dashed">
           <Users className="w-8 h-8 text-muted-foreground mx-auto mb-4 opacity-20" />
           <p className="text-muted-foreground text-sm">Gelecekteki müşteri verileri burada listelenecek.</p>
           {data.length > 0 && <p className="mt-4 text-primary font-bold">{data.length} Kayıtlı Müşteri</p>}
        </div>
     </motion.div>
   );
}
