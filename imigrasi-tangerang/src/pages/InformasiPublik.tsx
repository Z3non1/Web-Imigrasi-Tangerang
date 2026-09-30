import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, 
  Camera, Hash, Users, ChevronLeft, FileText, 
  Languages, ChevronDown, X, Bot, MessageSquare, ExternalLink, Send 
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { title: "Informasi Publik", back: "Kembali" },
    content: { searchPlace: "CARI FILE", empty: "Tidak ada file terlampir", viewBtn: "Lihat Lampiran", attach: "Attach File" },
    footer: { related: "Situs Terkait", follow: "Ikuti Kami", rights: "Direktorat Jenderal Imigrasi. Hak Cipta Dilindungi." },
    data: [
      { title: "Daftar Isian Pelaksanaan Anggaran", files: ["LKJIP KANIMSUS TANGERANG 2025", "Laporan Akuntabilitas Kinerja (LKjIP) Tahun 2024"] },
      { title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah", files: ["LKJIP KANIMSUS TANGERANG 2025", "Laporan Akuntabilitas Kinerja (LKjIP) Tahun 2024"] },
      { title: "Perjanjian Kerja", files: ["PERJANJIAN KINERJA STRUKTURAL TAHUN 2025", "Perjanjian Kinerja Tahun 2025 Kantor Imigrasi"] },
      { title: "Rencana Kerja Anggaran Satuan Kerja", files: ["RENSTRA KANIM TANGERANG 2025-2029", "PK KAKANIM", "RENSTRA KANIMSUS TANGERANG 2025", "RENCANA KERJA TAHUN 2024"] },
      { title: "Laporan Realisasi Anggaran", files: [] },
      { title: "Laporan Keuangan Tahunan", files: [] },
      { title: "Standar Operasional Prosedur", files: ["SOP APLIKASI STAR CHANNEL", "SK TIM PENGELOLA PENGADUAN 2025", "SK KOMPENSASI LAYANAN"] },
      { title: "Survey IPK - IPM", files: ["HASIL SURVEY KEPUASAN MASYARAKAT PERIODE APRIL 2025"] }
    ]
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { title: "Public Information", back: "Back" },
    content: { searchPlace: "SEARCH FILE", empty: "No Attached File", viewBtn: "View Attachment", attach: "Attach File" },
    footer: { related: "Related Sites", follow: "Follow Us", rights: "Directorate General of Immigration. All Rights Reserved." },
    data: [
      { title: "Budget Implementation List", files: ["LKJIP SPECIAL IMMIGRATION 2025", "Gov Agency Performance Accountability Report 2024"] },
      { title: "Government Agency Performance Accountability Report", files: ["LKJIP SPECIAL IMMIGRATION 2025", "Gov Agency Performance Accountability Report 2024"] },
      { title: "Work Agreement", files: ["STRUCTURAL PERFORMANCE AGREEMENT 2025", "Immigration Office Performance Agreement 2025"] },
      { title: "Work Unit Budget Plan", files: ["STRATEGIC PLAN 2025-2029", "HEAD OF OFFICE PERFORMANCE", "STRATEGIC PLAN 2025", "WORK PLAN 2024"] },
      { title: "Budget Realization Report", files: [] },
      { title: "Annual Financial Report", files: [] },
      { title: "Standard Operating Procedures", files: ["STAR CHANNEL APP SOP", "COMPLAINT MANAGEMENT TEAM DECREE 2025", "SERVICE COMPENSATION DECREE"] },
      { title: "Community Satisfaction Survey", files: ["COMMUNITY SATISFACTION SURVEY RESULTS APRIL 2025"] }
    ]
  }
};

export default function InformasiPublik() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN'];
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help you?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ivara', text: lang === 'ID' ? "Terima kasih, silakan hubungi call center kami." : "Thank you, please contact our call center." }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR BILINGUAL */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 shadow-sm p-1"><div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div></div>
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center p-1"><div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div></div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[15px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[12px] font-bold text-[#eab308] tracking-wider mt-0.5">TANGERANG</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.home}</Link>
            <Link to="/informasi-publik" className="text-[#eab308] flex flex-col items-center">{t.nav.info} <span className="w-5 h-[2px] bg-[#eab308] mt-1.5"></span></Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.news}</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.about}</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.faq}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-4" />
              <input type="text" placeholder={t.nav.search} className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white focus:outline-none focus:ring-1 focus:ring-yellow-500 w-[180px] text-sm" />
            </div>
            {/* DROPDOWN BAHASA */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-[#1e3a5f] hover:bg-[#2a4a7f] px-3 py-2 rounded-full focus:outline-none">
                <Languages className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">{lang}</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl overflow-hidden z-50 border border-gray-100 animate-fade-in">
                  <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-2 ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span>🇮🇩</span> <span>Indonesia</span></button>
                  <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-2 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span>🇬🇧</span> <span>English</span></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative bg-[#1e3a8a] h-[300px] animate-fade-in group">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-[10s] group-hover:scale-110"/>
        </div>
        <div className="absolute top-6 left-6 z-20">
          <Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}
          </Link>
        </div>
        <div className="absolute inset-0 flex items-center px-10 lg:px-24">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">{t.hero.title}</h1>
        </div>
      </div>

      {/* KONTEN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full animate-fade-in-up delay-200">
        <div className="bg-[#121b4a] rounded-lg p-3 flex items-center space-x-3 shadow-md mb-8">
          <Search className="w-5 h-5 text-gray-300 ml-2" />
          <input type="text" placeholder={t.content.searchPlace} className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none w-full text-sm font-medium" />
        </div>

        <div className="space-y-6 mb-16">
          {t.data.map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[#121b4a] text-white px-6 py-3 font-semibold text-sm lg:text-base">{section.title}</div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-4 border-b pb-2">{t.content.attach}</p>
                {section.files.length === 0 ? (
                  <p className="text-sm text-gray-600 font-medium italic px-2">{t.content.empty}</p>
                ) : (
                  <ul className="space-y-3">
                    {section.files.map((file, fileIdx) => (
                      <li key={fileIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 group">
                        <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                          <FileText className="w-5 h-5 text-blue-800 mt-0.5" />
                          <span className="text-sm text-gray-800 font-medium group-hover:text-blue-700">{file}</span>
                        </div>
                        <button className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 text-xs font-bold px-4 py-2 rounded shadow-sm">
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

      {/* FAB & FOOTER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {isCsOpen && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-64 mb-2 animate-fade-in origin-bottom-right">
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <h4 className="font-bold text-sm text-[#1e293b]">{lang === 'ID' ? 'Layanan Informasi' : 'Information Service'}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <a href="tel:02155790871" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">{lang === 'ID' ? 'Telepon' : 'Phone'}</p><p className="text-xs text-gray-500">(021) 5579 0871</p></div>
              </a>
              <a href="https://wa.me/628114119000" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><MessageSquare className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500">0811 411 9000</p></div>
              </a>
            </div>
          </div>
        )}
        <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className="w-14 h-14 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300">
          {isCsOpen ? <X className="w-6 h-6 text-black transform rotate-90 transition-transform" /> : <Phone className="w-6 h-6 text-black transition-transform" />}
        </button>
        <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300 relative">
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
        </button>
      </div>

      {/* JENDELA CHAT AI IVARA */}
      {isIvaraOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px] animate-fade-in origin-bottom-right">
          <div className="bg-[#1e293b] text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-5 h-5 text-white" /></div>
              <div><h3 className="font-bold text-sm">IVARA AI Assistant</h3><p className="text-[10px] text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div>
            </div>
            <button onClick={() => setIsIvaraOpen(false)} className="text-gray-300 hover:text-red-400 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tulis pesan..." : "Type a message..."} className="flex-1 px-4 py-2.5 text-xs md:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-all shadow-md"><Send className="w-4 h-4 ml-0.5" /></button>
          </form>
        </div>
      )}
    </div>
  );
}