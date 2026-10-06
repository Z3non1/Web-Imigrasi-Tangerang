import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar'

import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronRight,
  Languages, ChevronDown, X, Bot, MessageSquare, Send,  CheckCircle2, FileText, Info, Menu
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
  },
  ZH: {
    nav: { home: "首页", info: "公共信息", news: "新闻", about: "关于我们", faq: "常见问题", search: "搜索..." },
    hero: { title: "新闻与动态", sub: "本机构的最新信息与活动合集。", back: "返回" },
    filter: { all: "所有新闻", press: "新闻稿", service: "服务", intel: "情报" },
    card: { read: "阅读更多" },
    data: [
      { id: 1, title: "聚碳酸酯电子护照本恢复供应通知", date: "2026年8月13日", cat: "新闻稿", desc: "移民局宣布聚碳酸酯护照本重新到货。" },
      { id: 2, title: "Jagratara 联合行动：坦格朗移民局检查居留许可合规情况", date: "2026年8月12日", cat: "情报", desc: "外国人监控小组 (TIMPORA) 在工业区进行突击检查。" },
      { id: 3, title: "优化购物中心护照办理单位的人权友好型服务", date: "2026年8月10日", cat: "服务", desc: "为老年人和残疾人开设了专用护照办理通道。" }
    ]
  }
};

export default function Berita() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN' | 'ZH'] || translations['ID'];
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(t.filter.all);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setActiveCategory(t.filter.all); }, [lang, t.filter.all]);
  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <Navbar />
      
      {/* HERO SECTION */}
      <div className="relative bg-[#1e3a8a] h-[350px] overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay transform group-hover:scale-110 transition-transform duration-[15s] ease-out"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent bottom-0"></div>
        <div className="absolute top-24 left-6 z-20">
          <Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center lg:items-start lg:pl-24 pt-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight animate-fade-in-up">{t.hero.title}</h1>
          <p className="text-gray-200 mt-3 font-medium text-lg lg:text-xl drop-shadow-md animate-fade-in-up delay-100">{t.hero.sub}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full -mt-12 relative z-10">
        {/* Kategori Berita */}
        <div className="flex overflow-x-auto pb-6 mb-8 space-x-4 hide-scrollbar animate-fade-in-up delay-200">
          {categories.map((cat, idx) => (
            <button key={idx} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-extrabold transition-all duration-300 shadow-sm ${activeCategory === cat ? 'bg-[#1e293b] text-white shadow-lg shadow-[#1e293b]/20 scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-700'}`}>{cat}</button>
          ))}
        </div>
        
        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {filteredNews.map((news) => (
            <Link to={`/berita/${news.id}`} key={news.id}>
              <div className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-full">
                <div>
                  <div className="overflow-hidden relative">
                    <img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&sig=${news.id + 10}`} className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1e293b] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">{news.cat}</div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 font-medium mb-3"><span>{news.date}</span></div>
                    <h3 className="font-extrabold text-gray-900 mb-3 text-lg leading-snug group-hover:text-blue-600 transition-colors">{news.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">{news.desc}</p>
                  </div>
                </div>
                <div className="px-8 pb-8"><span className="text-blue-600 font-extrabold text-sm flex items-center group/btn">{t.card.read} <ChevronRight className="w-5 h-5 ml-1 transform group-hover/btn:translate-x-1.5 transition-transform" /></span></div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* FAB & JENDELA CHAT (Sama seperti Info Publik) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isCsOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-[#1e293b]">{lang === 'ID' ? 'Layanan Bantuan' : 'Help Center'}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-1 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              {/* Call Center */}
              <a href="tel:02155790871" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-blue-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Phone className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">Call Center</p><p className="text-xs text-gray-500 font-medium">(021) 5579 0871</p></div>
              </a>
              
              {/* WhatsApp */}
              <a href="https://wa.me/628114119000" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-green-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500 font-medium">0811 411 9000</p></div>
              </a>
              
              {/* Web Lapor */}
              <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors"><Globe className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">LAPOR</p><p className="text-xs text-gray-500 font-medium">Sampaikan pengaduan</p></div>
              </a>
            </div>
          </div>
        </div>
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-6 h-6 text-white" /></div><div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div></div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-1.5 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}><div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{msg.text}</div></div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tanya sesuatu..." : "Ask something..."} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"/>
              <button type="submit" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform shadow-md flex-shrink-0"><Send className="w-5 h-5 ml-1" /></button>
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>{isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}</button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>{isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}{!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}</button>
        </div>
      </div>
    </div>
  );
}