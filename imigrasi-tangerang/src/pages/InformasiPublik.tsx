import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  Search, Phone, Shield, Globe, ChevronLeft, FileText, 
  Languages, ChevronDown, X, Bot, MessageSquare, Send 
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { title: "Informasi Publik", back: "Kembali" },
    content: { searchPlace: "CARI FILE", empty: "Tidak ada file terlampir", viewBtn: "Lihat Lampiran", attach: "Attach File" },
    footer: { rights: "Direktorat Jenderal Imigrasi. Hak Cipta Dilindungi." },
    data: [
      { title: "Daftar Isian Pelaksanaan Anggaran", files: ["LKJIP KANIMSUS TANGERANG 2025", "Laporan Akuntabilitas Kinerja Tahun 2024"] },
      { title: "Rencana Kerja Anggaran Satuan Kerja", files: ["RENSTRA KANIM TANGERANG 2025", "PK KAKANIM", "RENCANA KERJA 2024"] },
      { title: "Standar Operasional Prosedur", files: ["SOP APLIKASI STAR CHANNEL", "SK TIM PENGELOLA PENGADUAN 2025"] }
    ]
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { title: "Public Information", back: "Back" },
    content: { searchPlace: "SEARCH FILE", empty: "No Attached File", viewBtn: "View Attachment", attach: "Attach File" },
    footer: { rights: "Directorate General of Immigration. All Rights Reserved." },
    data: [
      { title: "Budget Implementation List", files: ["LKJIP SPECIAL IMMIGRATION 2025", "Performance Accountability Report 2024"] },
      { title: "Work Unit Budget Plan", files: ["STRATEGIC PLAN 2025", "HEAD OF OFFICE PERFORMANCE", "WORK PLAN 2024"] },
      { title: "Standard Operating Procedures", files: ["STAR CHANNEL APP SOP", "COMPLAINT MANAGEMENT TEAM DECREE 2025"] }
    ]
  }
};

export default function InformasiPublik() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN'];
  
  // STATE ANIMASI & INTERAKSI
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help you?' }]);
  const [inputMessage, setInputMessage] = useState('');

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
      
      {/* NAVBAR: Mulus dengan Glassmorphism saat di-scroll */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#0b162c]/90 backdrop-blur-md shadow-lg py-3' : 'bg-[#0b162c] shadow-md'}`}>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-11 h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 hover:rotate-12 transition-transform duration-300"><div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div></div>
            <div className="w-11 h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center hover:-rotate-12 transition-transform duration-300"><div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div></div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[14px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[11px] font-bold text-[#eab308] tracking-wider mt-0.5">TANGERANG</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform">{t.nav.home}</Link>
            <Link to="/informasi-publik" className="text-[#eab308] flex flex-col items-center">{t.nav.info}<span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span></Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform">{t.nav.news}</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform">{t.nav.about}</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform">{t.nav.faq}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center group">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-yellow-400 transition-colors" />
              <input type="text" placeholder={t.nav.search} className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[200px] transition-all duration-300 text-sm backdrop-blur-sm" />
            </div>
            {/* DROPDOWN BAHASA: Animasi Pop-out Mulus */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-300">
                <Languages className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">{lang}</span>
                <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute right-0 mt-3 w-36 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-300 ease-out ${isLangOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'}`}>
                <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇮🇩</span> <span>Indonesia</span></button>
                <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors border-t border-gray-50 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇬🇧</span> <span>English</span></button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION: Efek Zoom pelan */}
      <div className="relative bg-[#1e3a8a] h-[350px] overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay transform group-hover:scale-110 transition-transform duration-[15s] ease-out"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent bottom-0"></div>
        <div className="absolute top-24 left-6 z-20">
          <Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-24 pt-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight animate-fade-in-up">{t.hero.title}</h1>
        </div>
      </div>

      {/* KONTEN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full -mt-12 relative z-10 animate-fade-in-up delay-100">
        <div className="bg-white rounded-2xl p-3 flex items-center space-x-3 shadow-xl border border-gray-100 mb-10 transform hover:shadow-2xl transition-all duration-300">
          <div className="bg-blue-50 p-2 rounded-xl"><Search className="w-6 h-6 text-blue-600" /></div>
          <input type="text" placeholder={t.content.searchPlace} className="bg-transparent border-none text-gray-700 placeholder-gray-400 focus:outline-none w-full text-sm font-bold tracking-wider" />
        </div>

        <div className="space-y-6 mb-16">
          {t.data.map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-8 py-5 font-bold text-sm lg:text-base">{section.title}</div>
              <div className="p-8">
                <p className="text-xs text-gray-400 font-bold mb-4 border-b border-gray-100 pb-3 uppercase tracking-wider">{t.content.attach}</p>
                {section.files.length === 0 ? (
                  <p className="text-sm text-gray-500 font-medium italic px-2">{t.content.empty}</p>
                ) : (
                  <ul className="space-y-3">
                    {section.files.map((file, fileIdx) => (
                      <li key={fileIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-blue-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600"><FileText className="w-5 h-5" /></div>
                          <span className="text-sm text-gray-800 font-bold">{file}</span>
                        </div>
                        <button className="bg-white border border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-[#1e293b] text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-sm transition-colors">
                          {t.content.viewBtn}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FAB & JENDELA CHAT (Animasi Halus) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isCsOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-[#1e293b]">{lang === 'ID' ? 'Layanan Bantuan' : 'Help Center'}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-1 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <a href="tel:02155790871" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-blue-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Phone className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">Call Center</p><p className="text-xs text-gray-500 font-medium">(021) 5579 0871</p></div>
              </a>
              <a href="https://wa.me/628114119000" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-green-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500 font-medium">0811 411 9000</p></div>
              </a>
            </div>
          </div>
        </div>

        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-6 h-6 text-white" /></div>
                <div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div>
              </div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-1.5 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tanya sesuatu..." : "Ask something..."} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"/>
              <button type="submit" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform shadow-md flex-shrink-0"><Send className="w-5 h-5 ml-1" /></button>
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>
            {isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
          </button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>
            {isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
            {!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}
          </button>
        </div>
      </div>
    </div>
  );
}