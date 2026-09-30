import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, Camera, Hash, Users, ChevronLeft, ChevronRight,
  Languages, ChevronDown, X, Bot, MessageSquare, ExternalLink, Send 
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { title: "Berita & Publikasi", sub: "Kumpulan informasi dan kegiatan terbaru dari instansi.", back: "Kembali" },
    filter: { all: "Semua Berita", press: "Siaran Pers", service: "Layanan", intel: "Intelijen" },
    card: { read: "Baca Selengkapnya" },
    data: [
      { id: 1, title: "Pemberitahuan Ketersediaan Blangko Paspor Elektronik Lembar Polikarbonat", date: "13 Agu 2026", cat: "Siaran Pers", desc: "Kantor Imigrasi mengumumkan ketersediaan kembali blangko paspor polikarbonat." },
      { id: 2, title: "Operasi Gabungan Jagratara: Kanim Tangerang Periksa Kepatuhan Izin", date: "12 Agu 2026", cat: "Intelijen", desc: "Tim Pengawasan Orang Asing (TIMPORA) melakukan inspeksi di kawasan industri." },
      { id: 3, title: "Optimalisasi Layanan Ramah HAM di ULP Mall Tangerang", date: "10 Agu 2026", cat: "Layanan", desc: "Peresmian jalur khusus lansia dan disabilitas di unit layanan paspor." }
    ]
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { title: "News & Publications", sub: "Latest information and activities from the office.", back: "Back" },
    filter: { all: "All News", press: "Press Release", service: "Services", intel: "Intelligence" },
    card: { read: "Read More" },
    data: [
      { id: 1, title: "Notice of Polycarbonate Electronic Passport Booklet Availability", date: "Aug 13, 2026", cat: "Press Release", desc: "The Immigration Office announces the restock of polycarbonate passport booklets." },
      { id: 2, title: "Jagratara Joint Operation: Tangerang Office Checks Permit Compliance", date: "Aug 12, 2026", cat: "Intelligence", desc: "Foreigner Surveillance Team (TIMPORA) conducts inspections in industrial areas." },
      { id: 3, title: "Optimization of Human Rights Friendly Services at Mall Passport Unit", date: "Aug 10, 2026", cat: "Services", desc: "Inauguration of a special lane for the elderly and disabled." }
    ]
  }
};

export default function Berita() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN'];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(t.filter.all);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help?' }]);
  const [inputMessage, setInputMessage] = useState('');

  // Sinkronisasi kategori aktif jika bahasa berubah
  useEffect(() => { setActiveCategory(t.filter.all); }, [lang, t.filter.all]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  const categories = [t.filter.all, t.filter.press, t.filter.service, t.filter.intel];
  const filteredNews = activeCategory === t.filter.all ? t.data : t.data.filter(news => news.cat === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      {/* NAVBAR */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10"><div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div></div>
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center"><div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div></div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[15px] tracking-wide">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[12px] font-bold text-[#eab308] tracking-wider mt-0.5">TANGERANG</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.home}</Link>
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.info}</Link>
            <Link to="/berita" className="text-[#eab308] flex flex-col items-center">{t.nav.news}<span className="w-5 h-[2px] bg-[#eab308] mt-1.5"></span></Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.about}</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.faq}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-4" />
              <input type="text" placeholder={t.nav.search} className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 w-[180px] text-sm" />
            </div>
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-[#1e3a5f] hover:bg-[#2a4a7f] px-3 py-2 rounded-full focus:outline-none">
                <Languages className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">{lang}</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                  <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-2 ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span>🇮🇩</span> <span>Indonesia</span></button>
                  <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-2 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span>🇬🇧</span> <span>English</span></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative bg-[#1e3a8a] h-[260px] animate-fade-in group">
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-[10s] group-hover:scale-110"/></div>
        <div className="absolute top-6 left-6 z-20"><Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold bg-black/30 px-3 py-1.5 rounded-full"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link></div>
        <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-24">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white">{t.hero.title}</h1>
          <p className="text-gray-200 mt-2 font-medium">{t.hero.sub}</p>
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex overflow-x-auto pb-4 mb-8 space-x-3 hide-scrollbar">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border ${activeCategory === cat ? 'bg-[#121b4a] text-white border-[#121b4a]' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Link to={`/berita/${news.id}`} key={news.id}>
              <div className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="overflow-hidden"><img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop&sig=${news.id + 10}`} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"/></div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3"><span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">{news.cat}</span><span>• {news.date}</span></div>
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{news.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{news.desc}</p>
                  </div>
                </div>
                <div className="px-6 pb-6"><span className="text-blue-600 font-semibold text-sm flex items-center group/btn">{t.card.read} <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" /></span></div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FAB & JENDELA CHAT (Bilingual) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all relative">
          <MessageSquare className="w-6 h-6" /><span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
        </button>
      </div>

      {isIvaraOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px]">
          <div className="bg-[#1e293b] text-white px-4 py-3 flex justify-between items-center"><div className="flex items-center space-x-3"><Bot className="w-5 h-5" /><h3 className="font-bold text-sm">IVARA AI</h3></div><button onClick={() => setIsIvaraOpen(false)}><X className="w-5 h-5" /></button></div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border rounded-bl-none'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-white flex items-center space-x-2 border-t">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tulis pesan..." : "Type message..."} className="flex-1 px-4 py-2 border rounded-full text-sm"/>
            <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center"><Send className="w-4 h-4 ml-0.5" /></button>
          </form>
        </div>
      )}
    </div>
  );
}