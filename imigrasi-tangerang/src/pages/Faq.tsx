import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronUp,
  Languages, X, Bot, MessageSquare, Send, FileText, CheckCircle2, Info, Menu
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { title: "FAQ", back: "Kembali" },
    content: { header: "Klasifikasi Informasi Resmi", sub: "Menampilkan pertanyaan resmi instansi", categories: ["Semua Pertanyaan", "Paspor RI", "Visa & Kedatangan", "Izin Tinggal", "Lain-lain"] },
    data: [
      { id: 1, tag: "PASPOR RI", q: "Apa saja syarat berkas pengajuan paspor baru?", a: "Wajib membawa KTP, KK, dan Akta Kelahiran/Ijazah asli beserta fotokopinya. Pendaftaran dilakukan via aplikasi M-Paspor." },
      { id: 2, tag: "DURASI PELAYANAN", q: "Berapa lama proses pembuatan paspor?", a: "Paspor biasa memakan waktu 3-4 hari kerja setelah pembayaran. Layanan percepatan bisa selesai di hari yang sama." },
      { id: 3, tag: "M-PASPOR", q: "Bagaimana cara membuat janji temu online?", a: "Unduh aplikasi M-Paspor di PlayStore/AppStore, daftar akun, dan pilih jadwal kedatangan." },
      { id: 4, tag: "VISA ON ARRIVAL", q: "Prosedur perpanjangan Visa on Arrival (VoA)?", a: "Perpanjangan VoA dapat dilakukan maksimal 7 hari sebelum masa berlaku habis di kantor imigrasi." },
      { id: 5, tag: "IZIN TINGGAL", q: "Perbedaan ITAS dan ITAP?", a: "ITAS diberikan untuk jangka waktu terbatas (1-2 tahun), ITAP diberikan untuk 5 tahun (Tetap)." }
    ]
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { title: "FAQ", back: "Back" },
    content: { header: "Official Information Classification", sub: "Showing official agency questions", categories: ["All Questions", "Passport", "Visa & Arrival", "Stay Permit", "Others"] },
    data: [
      { id: 1, tag: "INDONESIAN PASSPORT", q: "What are the requirements for a new passport?", a: "You must bring your original ID Card, Family Card, and Birth Certificate. Registration is done via the M-Paspor app." },
      { id: 2, tag: "SERVICE DURATION", q: "How long does passport processing take?", a: "Regular passports take 3-4 working days after payment. Expedited services can be finished on the same day." },
      { id: 3, tag: "M-PASPOR", q: "How to make an online appointment?", a: "Download the M-Paspor app on PlayStore/AppStore, register an account, and select your schedule." },
      { id: 4, tag: "VISA ON ARRIVAL", q: "How to extend Visa on Arrival (VoA)?", a: "VoA extension can be done maximum 7 days before the expiry date at the immigration office." },
      { id: 5, tag: "STAY PERMIT", q: "Difference between ITAS and ITAP?", a: "ITAS is a limited stay permit (1-2 years), ITAP is a permanent stay permit (5 years)." }
    ]
  }
};

export default function Faq() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN'];
  
  // STATE ANIMASI & INTERAKSI
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(t.content.categories[0]);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA.' : 'Hello! I am IVARA.' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setActiveCategory(t.content.categories[0]); }, [lang, t.content.categories]);
  
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
      
      {/* NAVBAR */}
      <Navbar />
      {/* HERO SECTION */}
      <div className="relative bg-[#1e3a8a] h-[300px] overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay transform group-hover:scale-110 transition-transform duration-[15s] ease-out"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent bottom-0"></div>
        <div className="absolute top-24 left-6 z-20">
          <Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-24 pt-10">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight animate-fade-in-up">{t.hero.title}</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full -mt-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in-up delay-100">
          <div className="flex items-center space-x-3 text-[#1e293b] font-bold text-xl mb-3 md:mb-0">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><FileText className="w-6 h-6" /></div>
            <h2>{t.content.header}</h2>
          </div>
          <p className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">{t.content.sub}</p>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-8 space-x-3 hide-scrollbar animate-fade-in-up delay-200">
          {t.content.categories.map((cat, idx) => (
            <button key={idx} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-extrabold transition-all duration-300 shadow-sm ${activeCategory === cat ? 'bg-[#1e293b] text-white shadow-lg shadow-[#1e293b]/20 scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-700'}`}>{cat}</button>
          ))}
        </div>

        <div className="space-y-4 mb-16 animate-fade-in-up delay-300">
          {t.data.map((faq) => (
            <div key={faq.id} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${expandedId === faq.id ? 'border-blue-400 ring-4 ring-blue-50 shadow-md' : 'border-gray-100 hover:border-blue-300 shadow-sm'}`}>
              <button onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)} className="w-full text-left px-6 py-5 flex items-start justify-between focus:outline-none group">
                <div className="flex space-x-4 pr-4">
                  <span className="text-blue-300 font-extrabold text-xl w-8 flex-shrink-0">{faq.id.toString().padStart(2, '0')}</span>
                  <div>
                    <span className="text-[11px] font-extrabold text-gray-400 tracking-widest uppercase mb-1.5 block">{faq.tag}</span>
                    <h3 className={`font-bold text-base transition-colors ${expandedId === faq.id ? 'text-blue-700' : 'text-[#1e293b] group-hover:text-blue-600'}`}>{faq.q}</h3>
                  </div>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${expandedId === faq.id ? 'bg-blue-100 text-blue-700 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <div className={`transition-all duration-400 ease-in-out origin-top ${expandedId === faq.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 ml-12 border-t border-gray-100">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FAB & JENDELA CHAT (Sama seperti halaman sebelumnya) */}
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