import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, 
  Camera, Hash, Users, ChevronLeft, ChevronDown, ChevronUp,
  Languages, X, Bot, MessageSquare, ExternalLink, Send, FileText
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { title: "FAQ", back: "Kembali" },
    content: { header: "Klasifikasi Informasi Resmi", sub: "Menampilkan 10 pertanyaan resmi", categories: ["Semua Pertanyaan", "Paspor RI", "Visa & Kedatangan", "Izin Tinggal", "Biaya PNBP", "Lain-lain"] },
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
    content: { header: "Official Information Classification", sub: "Showing 10 official questions", categories: ["All Questions", "Passport", "Visa & Arrival", "Stay Permit", "Fees", "Others"] },
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
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState(t.content.categories[0]);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA.' : 'Hello! I am IVARA.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Sinkronisasi kategori aktif jika bahasa berubah
  useEffect(() => { setActiveCategory(t.content.categories[0]); }, [lang, t.content.categories]);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 p-1"><div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div></div>
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
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.info}</Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.news}</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] mt-0.5">{t.nav.about}</Link>
            <Link to="/faq" className="text-[#eab308] flex flex-col items-center">{t.nav.faq} <span className="w-5 h-[2px] bg-[#eab308] mt-1.5"></span></Link>
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
      <div className="relative bg-[#1e3a8a] h-[260px] animate-fade-in group">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full animate-fade-in-up delay-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-[#1e293b] font-bold text-lg mb-3 md:mb-0"><FileText className="w-5 h-5" /><h2>{t.content.header}</h2></div>
          <p className="text-sm text-gray-500">{t.content.sub}</p>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-6 space-x-3 hide-scrollbar">
          {t.content.categories.map((cat, idx) => (
            <button 
              key={idx} onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex-shrink-0 border ${activeCategory === cat ? 'bg-[#121b4a] text-white border-[#121b4a]' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-16">
          {t.data.map((faq) => (
            <div key={faq.id} className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${expandedId === faq.id ? 'border-blue-300 ring-1 ring-blue-100' : 'border-gray-200'}`}>
              <button onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)} className="w-full text-left px-6 py-5 flex items-start justify-between focus:outline-none">
                <div className="flex space-x-4 pr-4">
                  <span className="text-blue-300 font-bold text-lg w-6 flex-shrink-0">{faq.id.toString().padStart(2, '0')}</span>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1 block">{faq.tag}</span>
                    <h3 className={`font-bold text-base transition-colors ${expandedId === faq.id ? 'text-blue-800' : 'text-[#1e293b] hover:text-blue-600'}`}>{faq.q}</h3>
                  </div>
                </div>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${expandedId === faq.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-400'}`}>
                  {expandedId === faq.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === faq.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 ml-10 border-t border-gray-100"><p className="text-sm text-gray-600">{faq.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* FAB & JENDELA CHAT (Sama seperti halaman Info Publik) */}
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