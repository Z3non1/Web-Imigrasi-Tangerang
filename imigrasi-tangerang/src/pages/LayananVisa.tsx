import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, 
  Languages, X, Bot, MessageSquare, Send, CheckCircle2, FileText, Info, Menu
} from 'lucide-react';

const visaData = {
  ID: {
    hero: { title: "Daftar Visa Indonesia", sub: "Layanan Fasilitas Keimigrasian WNA" },
    ui: { 
      catTitle: "Daftar Isi", 
      catDesc: "Klik menu di bawah untuk langsung menuju ke bagian informasi yang Anda butuhkan."
    },
    sections: [
      { id: "single-entry", label: "Visa Kunjungan (Single Entry)" },
      { id: "multiple-entry", label: "Visa Kunjungan Beberapa Kali" },
      { id: "voa", label: "Visa Kunjungan Saat Kedatangan (VoA)" },
      { id: "vitas", label: "Visa Tinggal Terbatas (VITAS)" },
      { id: "persyaratan", label: "Persyaratan Umum" },
      { id: "proses", label: "Proses Permohonan & Biaya" }
    ],
    content: {
      "single-entry": {
        title: "Visa Kunjungan 1 (Satu) Kali Perjalanan (Single Entry)",
        desc: "Diberikan kepada Orang Asing yang akan melakukan perjalanan ke Wilayah Indonesia dalam rangka kunjungan untuk waktu paling lama 60 (enam puluh) hari.",
        items: [
          { code: "B211A", name: "Wisata, Keluarga, Sosial, Seni Budaya, Pemerintahan, Olahraga", detail: "Masa berlaku 60 hari. Dapat diperpanjang." },
          { code: "B211B", name: "Bisnis, Calon Tenaga Kerja Asing dalam Uji Coba", detail: "Masa berlaku 60 hari. Dapat diperpanjang." },
          { code: "B211C", name: "Jurnalistik dan Pembuatan Film", detail: "Masa berlaku 60 hari. Memerlukan rekomendasi kementerian terkait." }
        ]
      },
      "multiple-entry": {
        title: "Visa Kunjungan Beberapa Kali Perjalanan (Multiple Entry)",
        desc: "Diberikan kepada Orang Asing yang akan melakukan perjalanan ke Wilayah Indonesia untuk beberapa kali kunjungan yang berlaku paling lama 1 (satu) hingga 5 (lima) tahun.",
        items: [
          { code: "D212", name: "Bisnis, Keluarga, Pemerintahan", detail: "Setiap kunjungan maksimal 60 hari. Tidak dapat diperpanjang statusnya." }
        ]
      },
      "voa": {
        title: "Visa Kunjungan Saat Kedatangan (Visa on Arrival / VoA)",
        desc: "Diberikan kepada warga negara asing dari negara subjek VoA saat tiba di Tempat Pemeriksaan Imigrasi (TPI) tertentu.",
        items: [
          { code: "B213", name: "Kunjungan Wisata, Bisnis, Pemerintahan", detail: "Masa berlaku 30 hari. Dapat diperpanjang 1 (satu) kali untuk 30 hari berikutnya." }
        ]
      },
      "vitas": {
        title: "Visa Tinggal Terbatas (VITAS)",
        desc: "Diberikan kepada Orang Asing yang bermaksud tinggal di Indonesia dalam jangka waktu yang terbatas untuk berbagai keperluan.",
        items: [
          { code: "C312", name: "Tenaga Kerja Asing (Bekerja)", detail: "Memerlukan Rekomendasi/RPTKA dari Kementerian Ketenagakerjaan." },
          { code: "C313", name: "Penanaman Modal Asing (PMA) / Investor (1 Tahun)", detail: "Memerlukan Rekomendasi dari BKPM." },
          { code: "C314", name: "Penanaman Modal Asing (PMA) / Investor (2 Tahun)", detail: "Memerlukan Rekomendasi dari BKPM." },
          { code: "C316", name: "Pendidikan / Mahasiswa", detail: "Memerlukan Rekomendasi dari Kemendikbudristek." },
          { code: "C317", name: "Penyatuan Keluarga", detail: "Ikut suami/istri WNI atau orang tua pemegang ITAS/ITAP." }
        ]
      },
      "persyaratan": {
        title: "Persyaratan Dokumen Umum",
        desc: "Dokumen dasar yang umumnya harus dipersiapkan sebelum mengajukan permohonan visa Indonesia:",
        itemsList: [
          "Paspor Kebangsaan yang sah dan masih berlaku minimal 6 (enam) bulan.",
          "Surat penjaminan dari Penjamin, kecuali untuk peruntukan wisata secara mandiri.",
          "Bukti memiliki biaya hidup bagi dirinya dan/atau keluarganya selama berada di Wilayah Indonesia (rekening koran minimal USD 2.000).",
          "Tiket kembali atau tiket terusan untuk melanjutkan perjalanan ke negara lain.",
          "Pasfoto berwarna terbaru berukuran 4x6 dengan latar belakang merah/putih."
        ]
      },
      "proses": {
        title: "Proses Permohonan & Komponen Biaya",
        desc: "Saat ini pengajuan visa Indonesia wajib dilakukan secara daring (online) melalui portal resmi Direktorat Jenderal Imigrasi RI.",
        infoBox: "Portal Resmi Pengajuan: molina.imigrasi.go.id",
        itemsList: [
          "Visa on Arrival (VoA): Rp 500.000 / USD 35",
          "Visa Kunjungan Single Entry (B211A/B/C): USD 50",
          "Visa Kunjungan Multiple Entry (1 Tahun): Rp 3.000.000",
          "Visa Tinggal Terbatas (VITAS): Mulai dari USD 150 (tergantung jenis & masa berlaku)"
        ]
      }
    }
  },
  EN: {
    hero: { title: "Indonesian Visa Index", sub: "Immigration Facilities for Foreign Nationals" },
    ui: { 
      catTitle: "Table of Contents", 
      catDesc: "Click a menu below to jump directly to the specific information section."
    },
    sections: [
      { id: "single-entry", label: "Visit Visa (Single Entry)" },
      { id: "multiple-entry", label: "Visit Visa (Multiple Entry)" },
      { id: "voa", label: "Visa on Arrival (VoA)" },
      { id: "vitas", label: "Limited Stay Visa (VITAS)" },
      { id: "persyaratan", label: "General Requirements" },
      { id: "proses", label: "Application & Fees" }
    ],
    content: {
      "single-entry": {
        title: "Single Entry Visit Visa",
        desc: "Granted to Foreigners intending to travel to the Indonesian Territory for a visit not exceeding 60 (sixty) days.",
        items: [
          { code: "B211A", name: "Tourism, Family, Social, Cultural, Government, Sports", detail: "Valid for 60 days. Extendable." },
          { code: "B211B", name: "Business, Prospective Foreign Worker on Trial", detail: "Valid for 60 days. Extendable." },
          { code: "B211C", name: "Journalism and Filmmaking", detail: "Valid for 60 days. Requires related ministry recommendation." }
        ]
      },
      "multiple-entry": {
        title: "Multiple Entry Visit Visa",
        desc: "Granted to Foreigners for several visits, valid for a maximum of 1 (one) to 5 (five) years.",
        items: [
          { code: "D212", name: "Business, Family, Government", detail: "Max 60 days per visit. Cannot be extended in status." }
        ]
      },
      "voa": {
        title: "Visa on Arrival (VoA)",
        desc: "Granted to eligible foreign nationals upon arrival at designated Immigration Checkpoints (TPI).",
        items: [
          { code: "B213", name: "Tourism, Business, Government Visits", detail: "Valid for 30 days. Can be extended 1 (once) for another 30 days." }
        ]
      },
      "vitas": {
        title: "Limited Stay Visa (VITAS)",
        desc: "Granted to Foreigners intending to stay in Indonesia for a limited period for various purposes.",
        items: [
          { code: "C312", name: "Foreign Worker (Working)", detail: "Requires Recommendation/RPTKA from Ministry of Manpower." },
          { code: "C313", name: "Foreign Investment (PMA) / Investor (1 Year)", detail: "Requires Recommendation from BKPM." },
          { code: "C314", name: "Foreign Investment (PMA) / Investor (2 Years)", detail: "Requires Recommendation from BKPM." },
          { code: "C316", name: "Education / Student", detail: "Requires Recommendation from Ministry of Education." },
          { code: "C317", name: "Family Unification", detail: "Joining Indonesian spouse or parents holding ITAS/ITAP." }
        ]
      },
      "persyaratan": {
        title: "General Document Requirements",
        desc: "Basic documents that generally must be prepared before applying for an Indonesian visa:",
        itemsList: [
          "Valid National Passport with a minimum validity of 6 (six) months.",
          "Guarantee letter from a Guarantor, except for independent tourism purposes.",
          "Proof of sufficient living expenses (bank statement with a minimum balance of USD 2,000).",
          "Return ticket or onward ticket to continue the journey.",
          "Recent color passport photo (4x6) with a red/white background."
        ]
      },
      "proses": {
        title: "Application Process & Visa Fees",
        desc: "Currently, Indonesian visa applications must be made online through the official portal of the Directorate General of Immigration.",
        infoBox: "Official Application Portal: molina.imigrasi.go.id",
        itemsList: [
          "Visa on Arrival (VoA): Rp 500,000 / USD 35",
          "Single Entry Visit Visa (B211A/B/C): USD 50",
          "Multiple Entry Visit Visa (1 Year): Rp 3,000,000",
          "Limited Stay Visa (VITAS): Starting from USD 150 (depending on type & validity)"
        ]
      }
    }
  }
};

export default function LayananVisa() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = visaData[lang as 'ID' | 'EN'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(t.sections[0].id);

  // FAB States
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai Visa?' : 'Hello! Need help with Visas?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navbar scroll & Intersection Observer untuk mendeteksi bagian mana yang sedang dibaca
  useEffect(() => { 
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Deteksi section yang sedang aktif (Scroll Spy)
      const sections = t.sections.map(s => document.getElementById(s.id));
      let currentSection = t.sections[0].id;
      
      for (const section of sections) {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop <= 150) { // Offset navbar
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.sections]);

  // Fungsi klik navigasi ke bagian section
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // Offset navbar 100px
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
     <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#0b162c]/90 backdrop-blur-md shadow-lg py-3' : 'bg-[#0b162c] shadow-md'}`}>
             
             {/* KIRI: Logo & Judul */}
             <div className="flex items-center space-x-3 md:space-x-4">
               <div className="flex -space-x-2">
                 <div className="w-10 h-10 md:w-11 md:h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 hover:rotate-12 transition-transform duration-300"><Shield className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /></div>
                 <div className="w-10 h-10 md:w-11 md:h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center hover:-rotate-12 transition-transform duration-300"><Globe className="w-4 h-4 md:w-5 md:h-5 text-teal-500" /></div>
               </div>
               <div className="leading-tight">
                 <div className="font-bold text-[11px] md:text-[14px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS</div>
                 <div className="text-[9px] md:text-[11px] font-bold text-[#eab308] tracking-wider mt-0.5">NON TPI TANGERANG</div>
               </div>
             </div>
             
             {/* KANAN (DESKTOP): Menu, Search, Lang (Otomatis Hilang di HP) */}
             <div className="hidden lg:flex items-center space-x-8">
               <div className="flex space-x-7 font-medium text-[14px]">
                 <Link to="/" className="text-white hover:text-[#eab308] transition-transform">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
                 <Link to="/informasi-publik" className="text-white hover:text-[#eab308] transition-transform">{lang === 'ID' ? 'Informasi Publik' : 'Public Information'}</Link>
                 <Link to="/berita" className="text-white hover:text-[#eab308] transition-transform">{lang === 'ID' ? 'Berita' : 'News'}</Link>
                 <Link to="/tentang-kami" className="text-white hover:text-[#eab308] transition-transform">{lang === 'ID' ? 'Tentang Kami' : 'About Us'}</Link>
               </div>
               <div className="flex items-center space-x-4">
                 <div className="relative flex items-center group">
                   <Search className="w-4 h-4 text-gray-400 absolute left-4 z-10 pointer-events-none group-focus-within:text-yellow-400 transition-colors" />
                   <input type="text" placeholder={lang === 'ID' ? 'Cari...' : 'Search...'} className="relative pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[200px] transition-all duration-300 text-sm" />
                 </div>
                 <div className="relative">
                   <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-300">
                     <Languages className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold text-white">{lang}</span><ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                   </button>
                   <div className={`absolute right-0 mt-3 w-36 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-300 ease-out ${isLangOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'}`}>
                     <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇮🇩</span> <span>Indonesia</span></button>
                     <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors border-t border-gray-50 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇬🇧</span> <span>English</span></button>
                   </div>
                 </div>
               </div>
             </div>
     
             {/* KANAN (MOBILE): Tombol Hamburger (Hanya Muncul di HP) */}
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white hover:text-yellow-400 focus:outline-none p-2 bg-white/5 rounded-xl border border-white/10">
               <Menu className="w-6 h-6" />
             </button>
     
             {/* ================= MOBILE SIDEBAR MENU ================= */}
             {/* Latar Hitam Transparan */}
             <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
             
             {/* Kotak Sidebar dari Kanan */}
             <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0b162c] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
               <div className="flex items-center justify-between p-5 border-b border-white/10">
                 <span className="text-yellow-400 font-extrabold tracking-widest text-sm uppercase">Navigasi</span>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-2 transition-colors"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 {/* Mobile Search */}
                 <div className="relative flex items-center">
                   <Search className="w-4 h-4 text-gray-400 absolute left-4 z-10 pointer-events-none" />
                   <input type="text" placeholder={lang === 'ID' ? 'Cari...' : 'Search...'} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500 text-sm" />
                 </div>
     
                 {/* Mobile Links */}
                 <div className="flex flex-col space-y-5">
                   <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
                   <Link to="/informasi-publik" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Informasi Publik</Link>
                   <Link to="/berita" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Berita</Link>
                   <Link to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Tentang Kami</Link>
                   <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">FAQ</Link>
                 </div>
     
                 {/* Mobile Language Toggle */}
                 <div className="pt-6 border-t border-white/10">
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Ganti Bahasa / Language</span>
                   <div className="flex space-x-3">
                     <button onClick={() => { setLang('ID'); setIsMobileMenuOpen(false); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'ID' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>ID 🇮🇩</button>
                     <button onClick={() => { setLang('EN'); setIsMobileMenuOpen(false); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'EN' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>EN 🇬🇧</button>
                   </div>
                 </div>
               </div>
             </div>
             {/* ================= END MOBILE SIDEBAR ================= */}
     
           </nav>
           
      {/* HERO SECTION */}
      <div className="relative bg-[#0f172a] pt-28 pb-10 px-6 lg:px-12 xl:px-24">
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2074" className="w-full h-full object-cover opacity-20" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">{t.hero.sub}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-10 items-start animate-fade-in-up delay-100 relative">
          
          {/* PANEL KIRI: DAFTAR ISI (Sticky Scroll Navigation) */}
          <div className="w-full lg:w-[320px] bg-white p-6 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-28 z-20 flex-shrink-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Info className="w-5 h-5" /></div>
              <h3 className="font-extrabold text-lg text-[#1e293b]">{t.ui.catTitle}</h3>
            </div>
            <p className="text-gray-500 text-xs mb-6 ml-1 leading-relaxed">{t.ui.catDesc}</p>
            
            <div className="flex flex-col space-y-1 relative before:absolute before:inset-y-2 before:left-2.5 before:w-0.5 before:bg-gray-100">
              {t.sections.map((section) => (
                <button 
                  key={section.id} 
                  onClick={() => scrollToSection(section.id)} 
                  className={`relative text-left px-4 py-3 ml-6 rounded-xl flex items-center transition-all duration-300 ${activeSection === section.id ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-blue-600'}`}
                >
                  {/* Indikator Titik */}
                  <span className={`absolute -left-4 w-3 h-3 rounded-full border-2 bg-white transition-all duration-300 ${activeSection === section.id ? 'border-blue-600 scale-125' : 'border-gray-300'}`}></span>
                  <span className="text-sm leading-snug">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PANEL KANAN: KONTEN MEMANJANG (LONG SCROLL) */}
          <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-16">
            
            {t.sections.map((section) => {
              const secData = (t.content as any)[section.id];
              if (!secData) return null;

              return (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#1e293b] border-b-2 border-gray-100 pb-4 mb-6 relative">
                    {secData.title}
                    <span className="absolute bottom-0 left-0 w-16 h-0.5 bg-yellow-500 translate-y-0.5"></span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed font-medium mb-8 text-justify">{secData.desc}</p>

                  {/* Jika memiliki sub-items kotak (seperti Index B211A, B211B, dll) */}
                  {secData.items && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {secData.items.map((item: any, idx: number) => (
                        <div key={idx} className="p-5 border border-gray-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group bg-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="bg-blue-600 text-white font-extrabold text-sm px-3 py-1 rounded-lg shadow-sm">{item.code}</span>
                          </div>
                          <h4 className="font-extrabold text-gray-900 mb-2">{item.name}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Jika memiliki daftar (seperti Persyaratan / Proses) */}
                  {secData.itemsList && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <ul className="space-y-4">
                        {secData.itemsList.map((li: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-medium leading-relaxed">{li}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Info Box Khusus (seperti portal Molina) */}
                  {secData.infoBox && (
                    <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0"><Globe className="w-6 h-6" /></div>
                      <p className="text-blue-800 font-extrabold">{secData.infoBox}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FAB: Bantuan & Chat (DENGAN WEB LAPOR TAMBAHAN) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        
        {/* Help Center Panel */}
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
              <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors"><Globe className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">LAPOR</p><p className="text-xs text-gray-500 font-medium">Sampaikan pengaduan</p></div>
              </a>
            </div>
          </div>
        </div>

        {/* IVARA Bot */}
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

        {/* FAB Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>{isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}</button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>{isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}{!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}</button>
        </div>
      </div>
    </div>
  );
}