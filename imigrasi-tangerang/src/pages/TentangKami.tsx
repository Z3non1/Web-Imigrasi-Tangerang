import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, 
  Languages, X, Bot, MessageSquare, Target, Send, CheckCircle2, FileText, Info, Menu
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { pre: "Profil Instansi", title: "Sejarah Kantor", back: "Kembali" },
    sec1: { sub: "Kilas Balik Instansi", title: "Sejarah & Selayang Pandang", p1: "TANGERANG - Berawal dari Pos Imigrasi kecil yang menginduk pada Kantor Imigrasi Jakarta Barat...", p2: "Kini, dengan predikat Kelas I Khusus Non TPI, Kantor Imigrasi Tangerang memegang peranan krusial sebagai garda terdepan penjaga pintu gerbang negara." },
    sec4: { title: "Visi Instansi", visi: '"Terwujudnya Pelayanan Keimigrasian dan Penegakan Hukum yang Modern, Transparan, Humanis."' },
    sec5: { title: "Struktur Organisasi", items: [{id: 1, title: "Sub Bagian Tata Usaha", desc: "Melaksanakan urusan ketatausahaan, kepegawaian, keuangan kantor."}, {id: 2, title: "Seksi Lalu Lintas Keimigrasian", desc: "Melayani permohonan paspor RI dan perlintasan wilayah."}] },
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { pre: "Agency Profile", title: "Office History", back: "Back" },
    sec1: { sub: "Agency Flashback", title: "History & Overview", p1: "TANGERANG - Starting from a small Immigration Post under the West Jakarta Immigration Office...", p2: "Now, holding the Special Class I Non-TPI status, the Tangerang Immigration Office plays a crucial role as the frontline guardian of the nation's gates." },
    sec4: { title: "Agency Vision", visi: '"Realizing Modern, Transparent, and Humane Immigration Services and Law Enforcement."' },
    sec5: { title: "Organizational Structure", items: [{id: 1, title: "Administration Sub-Section", desc: "Handles administrative, staffing, and financial affairs."}, {id: 2, title: "Immigration Traffic Section", desc: "Serves RI passport applications and border crossings."}] },
  },
  ZH: {
    nav: { home: "首页", info: "公共信息", news: "新闻", about: "关于我们", faq: "常见问题", search: "搜索..." },
    hero: { pre: "机构简介", title: "办公室历史", back: "返回" },
    sec1: { sub: "机构回顾", title: "历史与概况", p1: "坦格朗 - 始于隶属于雅加达西部移民局的一个小型移民哨所...", p2: "如今，凭借非TPI一类特别移民局的称号，坦格朗移民局作为国家大门的前线守卫者，发挥着至关重要的作用。" },
    sec4: { title: "机构愿景", visi: '"实现现代化、透明、人性化的移民服务与执法。"' },
    sec5: { title: "组织架构", items: [{id: 1, title: "行政股", desc: "负责办公室的行政、人事和财务事务。"}, {id: 2, title: "出入境交通科", desc: "负责办理印尼护照申请及边境通行事务。"}] },
  }
};

export default function TentangKami() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN' | 'ZH'] || translations['ID'];
  
  // STATE ANIMASI & INTERAKSI
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [expandedTugas, setExpandedTugas] = useState<number | null>(1);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Efek Scroll untuk Navbar Glassmorphism
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR LENGKAP DENGAN ANIMASI MULUS */}
      <Navbar />
      {/* HERO SECTION DENGAN ANIMASI */}
      <div className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 h-[350px] flex items-center px-10 pt-16">
        <div className="absolute top-24 left-6 z-20"><Link to="/" className="text-[#1e3a8a] bg-white/50 px-4 py-2 rounded-full flex items-center hover:bg-white/70 transition-colors font-bold shadow-sm"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link></div>
        <div className="animate-fade-in-up md:pl-16">
          <p className="text-sm font-bold text-yellow-800 uppercase tracking-widest mb-1">{t.hero.pre}</p>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-[#1e3a8a] drop-shadow-sm tracking-tight">{t.hero.title}</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24 animate-fade-in-up delay-100 mb-20">
        
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold text-blue-600 uppercase mb-2 block">{t.sec1.sub}</span>
            <h2 className="text-4xl font-extrabold text-[#1e293b] mb-6 leading-tight">{t.sec1.title}</h2>
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed text-justify"><p>{t.sec1.p1}</p><p>{t.sec1.p2}</p></div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl group">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700" alt="Gedung Imigrasi" />
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#1e1b4b] to-[#2e1065] text-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow group">
          <Target className="absolute opacity-5 -right-10 -bottom-10 w-72 h-72 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700" />
          <span className="text-yellow-400 font-extrabold tracking-widest uppercase mb-6 block">{t.sec4.title}</span>
          <blockquote className="text-3xl md:text-5xl font-extrabold leading-snug relative z-10 drop-shadow-md">{t.sec4.visi}</blockquote>
        </section>

        <section className="animate-fade-in-up delay-200">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1e293b] mb-12">{t.sec5.title}</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {t.sec5.items.map((tugas) => (
              <div key={tugas.id} className={`border rounded-2xl transition-all duration-300 overflow-hidden ${expandedTugas === tugas.id ? 'border-blue-400 ring-4 ring-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                <button onClick={() => setExpandedTugas(expandedTugas === tugas.id ? null : tugas.id)} className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white">
                  <span className={`font-extrabold text-base transition-colors ${expandedTugas === tugas.id ? 'text-blue-700' : 'text-[#1e293b]'}`}>{tugas.title}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${expandedTugas === tugas.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-400'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${expandedTugas === tugas.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div className={`transition-all duration-400 ease-in-out origin-top ${expandedTugas === tugas.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-2 bg-white border-t border-gray-100">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">{tugas.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FAB: Animasi Pop Mulus */}
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
      <Footer />
    </div>
  );
}