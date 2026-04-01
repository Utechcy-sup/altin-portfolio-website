export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "2024-altin-piyasalari-beklentileri",
    title: "2024 Yılında Altın Piyasaları Bizi Neler Bekliyor?",
    excerpt: "Küresel ekonomik gelişmeler ve merkez bankalarının faiz kararları gölgesinde altın yatırımcısını nasıl bir yıl bekliyor? Uzman analizlerimizle değerlendiriyoruz.",
    content: "Altın yatırımcıları için 2024 yılı büyük önem taşıyor. Amerikan Merkez Bankası'nın (FED) olası faiz indirimleri ve jeopolitik riskler, güvenli liman altına olan talebi artırmaya devam edebilir. Uzmanlar ons altının yeni rekor seviyeleri test edebileceğini öngörüyor...",
    author: "Ahmet Yılmaz",
    date: "15 Ekim 2023",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Piyasa Analizi",
    readTime: "5 dk"
  },
  {
    id: "b2",
    slug: "fiziki-altin-mi-dijital-altin-mi",
    title: "Yatırım İçin Fiziki Altın mı, Dijital Altın mı Tercih Edilmeli?",
    excerpt: "Her iki yatırım aracının da avantajları ve dezavantajları nelerdir? Kendi risk profilinize en uygun yatırım yöntemini keşfedin.",
    content: "Altın yatırımı dendiğinde akla ilk gelen soru fiziki mi yoksa banka hesabı üzerinden dijital altın mı alınması gerektiğidir. Fiziki altın güven ve dokunulabilirlik hissi verirken, dijital altın saklama maliyeti olmaması ve kolay alım-satım imkanı ile öne çıkar...",
    author: "Zeynep Kaya",
    date: "02 Kasım 2023",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Yatırım Rehberi",
    readTime: "4 dk"
  },
  {
    id: "b3",
    slug: "altin-taki-alirken-dikkat-edilmesi-gerekenler",
    title: "Altın Takı Alırken Dikkat Edilmesi Gereken 5 Önemli Kural",
    excerpt: "Mücevher alışverişinizde yanılmamak ve doğru değeri ödemek için bilmeniz gereken kritik detaylar.",
    content: "Altın takı alırken sadece görünüme değil, ayarına, gramajına ve işçilik maliyetine de dikkat etmelisiniz. Özellikle yatırım amaçlı alınan takılarda (örneğin burma bilezikler) işçilik maliyetinin düşük olmasına özen gösterilmelidir...",
    author: "Mehmet Demir",
    date: "20 Kasım 2023",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Mücevher",
    readTime: "6 dk"
  },
  {
    id: "b4",
    slug: "kapalicarsi-altin-kulturu",
    title: "Yüzyıllık Gelenek: Kapalıçarşı ve Altın Kültürü",
    excerpt: "Dünyanın en eski alışveriş merkezlerinden Kapalıçarşı'nın altınla olan tarihi bağını ve bugünkü rolünü inceliyoruz.",
    content: "İstanbul'un kalbinde yer alan Kapalıçarşı, sadece bir pazar yeri değil, aynı zamanda Türkiye'de altının kalbinin attığı yerdir. Yüzyıllardır süregelen ustalık geleneği ve piyasa belirleyici rolü ile Kapalıçarşı...",
    author: "Elif Aydın",
    date: "05 Aralık 2023",
    image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Tarih ve Kültür",
    readTime: "7 dk"
  },
  {
    id: "b5",
    slug: "altin-ayarlari-nedir",
    title: "14, 18, 22 ve 24 Ayar Altın Arasındaki Farklar Nelerdir?",
    excerpt: "Altın ayarları ne anlama gelir ve hangi kullanım amaçları için hangi ayar tercih edilmelidir?",
    content: "Altının 'ayarı', içindeki saf altın oranını belirtir. 24 ayar saf altını temsil ederken, 22 ayar %91.6, 18 ayar %75, 14 ayar ise %58.5 oranında saf altın içerir. Takı üretiminde altının sertliğini artırmak için...",
    author: "Ahmet Yılmaz",
    date: "12 Aralık 2023",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Rehber",
    readTime: "5 dk"
  },
  {
    id: "b6",
    slug: "merkez-bankasi-altin-rezervleri",
    title: "Merkez Bankalarının Altın Rezervleri Neden Önemli?",
    excerpt: "Ülkelerin merkez bankalarının altın toplamaya devam etmesinin arkasındaki stratejik nedenler.",
    content: "Son yıllarda küresel merkez bankalarının altın rezervlerini artırma eğilimi dikkat çekiyor. Özellikle belirsizlik dönemlerinde ülkelerin rezervlerini çeşitlendirme ve dolara olan bağımlılığı azaltma isteği...",
    author: "Zeynep Kaya",
    date: "18 Aralık 2023",
    image: "https://images.unsplash.com/photo-1587324438673-56c808f975bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Piyasa Analizi",
    readTime: "6 dk"
  }
];
