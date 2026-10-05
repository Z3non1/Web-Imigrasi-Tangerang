import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import SearchBar from '../components/SearchBar';

import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronRight,
  Languages, X, Bot, MessageSquare, Send, Check, Info, FileText, CheckCircle2, Menu
} from 'lucide-react';

const subjekData = {
  ID: {
    hero: { title: "Daftar Subjek VoA, BVK & Calling Visa", sub: "Layanan Fasilitas Keimigrasian WNA" },
    ui: { 
      catTitle: "Ketentuan", 
      catDesc: "Pilih kategori daftar subjek di bawah ini untuk melihat detail negara atau titik masuk.",
      detailBadge: "Daftar Lengkap"
    },
    categories: [
      "Daftar Subjek Bebas Visa Kunjungan", 
      "Daftar Subjek Calling Visa", 
      "Titik Masuk Bagi Pemegang E-VoA", 
      "Daftar Subjek Visa on Arrival"
    ],
    content: {
      "Daftar Subjek Bebas Visa Kunjungan": {
        sections: { negara: "Daftar Negara, Pemerintah Dari Daerah Administrasi Khusus Suatu Negara, dan Entitas Tertentu" },
        data: {
          negara: [
            "Brunei Darussalam", "Malaysia", "Tailan", "Vietnam", "Philipina", "Kamboja", 
            "Singapura", "Myanmar", "Laos", "Timor Leste", "Suriname", "Kolombia", 
            "Hong Kong", "Turki", "Brazil", "Peru", "Kazakhstan", "Makau", "Belarus", 
            "Warga Negara Asing pemegang permanent resident Singapura yang melalui Tempat Pemeriksaan Imigrasi tertentu."
          ]
        }
      },
      "Daftar Subjek Calling Visa": {
        sections: { negara: "Daftar Negara, Pemerintah Dari Daerah Administrasi Khusus Suatu Negara, dan Entitas Tertentu" },
        data: {
          negara: ["Afganistan", "Israel", "Korea Utara", "Liberia", "Nigeria", "Somalia"]
        }
      },
      "Titik Masuk Bagi Pemegang E-VoA": {
        sections: { 
          bandara: "Tempat Pemeriksaan Imigrasi di Bandara",
          plbn: "Tempat Pemeriksaan Imigrasi di Pos Lintas Batas",
          pelabuhan: "Tempat Pemeriksaan Imigrasi di Pelabuhan"
        },
        data: {
          bandara: [
            "Halim Perdanakusuma, DKI Jakarta", "Hang Nadim, Kepulauan Riau", "Juanda, Jawa Timur", 
            "Kualanamu, Sumatera Utara", "Minangkabau, Sumatera Barat", "Ngurah Rai, Bali", 
            "Soekarno Hatta, DKI Jakarta", "Sultan Aji Muhammad Sulaiman, Kalimantan Timur", 
            "Sultan Hasanuddin, Sulawesi Selatan", "Sultan Iskandar Muda, Aceh", 
            "Yogyakarta, Daerah Istimewa Yogyakarta", "Zainuddin Abdul Madjid, Nusa Tenggara Barat"
          ],
          plbn: [
            "Aruk, Kalimantan Barat", "Entikong, Kalimantan Barat", "Mota'ain, Nusa Tenggara Timur", 
            "Motamasin, Nusa Tenggara Timur", "Skouw, Papua", "Nangabadau, Kalimantan Barat"
          ],
          pelabuhan: [
            "Achmad Yani, Maluku Utara", "Amamapare, Papua", "Batam Centre, Kepulauan Riau", 
            "Benoa, Bali", "Dumai, Riau", "Marina Ancol, DKI Jakarta", "Nongsa Terminal Bahari, Kepulauan Riau", 
            "Tanjung Balai Karimun, Kepulauan Riau", "Tanjung Priok, DKI Jakarta", 
            "Pelabuhan Bandar Bintan Telani Lagoi, Kepulauan Riau", "Citra Tri Tunas, Kepulauan Riau"
          ]
        }
      },
      "Daftar Subjek Visa on Arrival": {
        sections: { negara: "Daftar Negara, Pemerintah Dari Daerah Administrasi Khusus Suatu Negara, dan Entitas Tertentu" },
        data: {
          negara: [
            "Afrika Selatan", "Albania", "Amerika Serikat", "Andorra", "Arab Saudi", "Argentina", "Armenia", "Australia", 
            "Austria", "Azerbaijan", "Bahrain", "Belanda", "Belgia", "Belarus", "Bosnia Herzegovina", "Brazil", 
            "Brunei Darussalam", "Bulgaria", "Ceko", "Chile", "Denmark", "Ekuador", "Estonia", "Filipina", "Finlandia", 
            "Guatemala", "Hong Kong", "Hungaria", "India", "Inggris", "Irlandia", "Islandia", "Italia", "Jepang", 
            "Jerman", "Kamboja", "Kanada", "Kazakhstan", "Kenya", "Kolombia", "Korea Selatan", "Kroasia", "Kuwait", 
            "Laos", "Latvia", "Liechtenstein", "Lituania", "Luksemburg", "Makau", "Malaysia", "Maladewa", "Malta", 
            "Maroko", "Meksiko", "Mesir", "Monako", "Myanmar", "Norwegia", "Oman", "Palestina", "Papua Nugini", 
            "Prancis", "Peru", "Polandia", "Portugal", "Qatar", "Rumania", "Rusia", "Rwanda", "Selandia Baru", 
            "Serbia", "Seychelles", "Singapura", "Siprus", "Slowakia", "Slovenia", "Spanyol", "Suriname", "Swedia", 
            "Swiss", "Taiwan", "Thailand", "Timor Leste", "Tiongkok", "Tunisia", "Turki", "Uni Emirat Arab", 
            "Uzbekistan", "Ukraina", "Vatikan", "Venezuela", "Vietnam", "Yordania", "Yunani"
          ]
        }
      }
    }
  },
  EN: {
    hero: { title: "Subject List for VoA, BVK & Calling Visa", sub: "Immigration Facilities for Foreign Nationals" },
    ui: { 
      catTitle: "Provisions", 
      catDesc: "Select a subject category below to view detailed countries or entry points.",
      detailBadge: "Complete List"
    },
    categories: [
      "Subject List for Visa-Free Visit (BVK)", 
      "Subject List for Calling Visa", 
      "Entry Points for E-VoA Holders", 
      "Subject List for Visa on Arrival (VoA)"
    ],
    content: {
      "Subject List for Visa-Free Visit (BVK)": {
        sections: { negara: "List of Countries, Governments of Special Administrative Regions, and Certain Entities" },
        data: {
          negara: [
            "Brunei Darussalam", "Malaysia", "Thailand", "Vietnam", "Philippines", "Cambodia", 
            "Singapore", "Myanmar", "Laos", "Timor Leste", "Suriname", "Colombia", 
            "Hong Kong", "Turkey", "Brazil", "Peru", "Kazakhstan", "Macau", "Belarus", 
            "Foreign nationals holding Singapore permanent resident status passing through certain Immigration Checkpoints."
          ]
        }
      },
      "Subject List for Calling Visa": {
        sections: { negara: "List of Countries, Governments of Special Administrative Regions, and Certain Entities" },
        data: {
          negara: ["Afghanistan", "Israel", "North Korea", "Liberia", "Nigeria", "Somalia"]
        }
      },
      "Entry Points for E-VoA Holders": {
        sections: { 
          bandara: "Immigration Checkpoints at Airports",
          plbn: "Immigration Checkpoints at Cross-Border Posts",
          pelabuhan: "Immigration Checkpoints at Seaports"
        },
        data: {
          bandara: [
            "Halim Perdanakusuma, DKI Jakarta", "Hang Nadim, Riau Islands", "Juanda, East Java", 
            "Kualanamu, North Sumatra", "Minangkabau, West Sumatra", "Ngurah Rai, Bali", 
            "Soekarno Hatta, DKI Jakarta", "Sultan Aji Muhammad Sulaiman, East Kalimantan", 
            "Sultan Hasanuddin, South Sulawesi", "Sultan Iskandar Muda, Aceh", 
            "Yogyakarta, Special Region of Yogyakarta", "Zainuddin Abdul Madjid, West Nusa Tenggara"
          ],
          plbn: [
            "Aruk, West Kalimantan", "Entikong, West Kalimantan", "Mota'ain, East Nusa Tenggara", 
            "Motamasin, East Nusa Tenggara", "Skouw, Papua", "Nangabadau, West Kalimantan"
          ],
          pelabuhan: [
            "Achmad Yani, North Maluku", "Amamapare, Papua", "Batam Centre, Riau Islands", 
            "Benoa, Bali", "Dumai, Riau", "Marina Ancol, DKI Jakarta", "Nongsa Terminal Bahari, Riau Islands", 
            "Tanjung Balai Karimun, Riau Islands", "Tanjung Priok, DKI Jakarta", 
            "Bandar Bintan Telani Lagoi Port, Riau Islands", "Citra Tri Tunas, Riau Islands"
          ]
        }
      },
      "Subject List for Visa on Arrival (VoA)": {
        sections: { negara: "List of Countries, Governments of Special Administrative Regions, and Certain Entities" },
        data: {
          negara: [
            "South Africa", "Albania", "United States", "Andorra", "Saudi Arabia", "Argentina", "Armenia", "Australia", 
            "Austria", "Azerbaijan", "Bahrain", "Netherlands", "Belgium", "Belarus", "Bosnia and Herzegovina", "Brazil", 
            "Brunei Darussalam", "Bulgaria", "Czech Republic", "Chile", "Denmark", "Ecuador", "Estonia", "Philippines", "Finland", 
            "Guatemala", "Hong Kong", "Hungary", "India", "United Kingdom", "Ireland", "Iceland", "Italy", "Japan", 
            "Germany", "Cambodia", "Canada", "Kazakhstan", "Kenya", "Colombia", "South Korea", "Croatia", "Kuwait", 
            "Laos", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Malaysia", "Maldives", "Malta", 
            "Morocco", "Mexico", "Egypt", "Monaco", "Myanmar", "Norway", "Oman", "Palestine", "Papua New Guinea", 
            "France", "Peru", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "New Zealand", 
            "Serbia", "Seychelles", "Singapore", "Cyprus", "Slovakia", "Slovenia", "Spain", "Suriname", "Sweden", 
            "Switzerland", "Taiwan", "Thailand", "Timor Leste", "China", "Tunisia", "Turkey", "United Arab Emirates", 
            "Uzbekistan", "Ukraine", "Vatican City", "Venezuela", "Vietnam", "Jordan", "Greece"
          ]
        }
      }
    }
  }
};

export default function LayananVoaBvk() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = subjekData[lang as 'ID' | 'EN'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // STATE TABS & KATEGORI
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai daftar visa?' : 'Hello! Need help with visa lists?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambil Data Kategori Aktif (Ditegaskan sebagai 'any' agar TypeScript tidak komplain)
  const activeCategoryName = t.categories[activeCategoryIndex];
  const activeContent = (t.content as any)[activeCategoryName];

  // Buka semua section secara default tiap kali kategori berubah
  useEffect(() => {
    if (activeContent && activeContent.sections) {
      setExpandedSections(Object.keys(activeContent.sections));
    }
  }, [activeCategoryIndex, lang]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => 
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    );
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
            <Link to="/" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Informasi Publik' : 'Public Info'}</Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Berita' : 'News'}</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Tentang Kami' : 'About Us'}</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">FAQ</Link>
          </div>
                <div className="flex items-center space-x-4">
                  <SearchBar isMobile={false} />
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
                  <SearchBar isMobile={true} />
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
      <div className="relative bg-[#1e293b] pt-28 pb-10 px-6 lg:px-12 xl:px-24">
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074" className="w-full h-full object-cover opacity-20" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">{t.hero.sub}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up delay-100">
          
          {/* PANEL KIRI: MENU KATEGORI */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-28 z-20">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Info className="w-5 h-5" /></div>
              <h3 className="font-extrabold text-xl text-[#1e293b]">{t.ui.catTitle}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-1 leading-relaxed">{t.ui.catDesc}</p>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex flex-col space-y-2">
              {t.categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); }} 
                  className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeCategoryIndex === idx ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <span className="font-bold text-sm leading-tight pr-2">{cat}</span>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${activeCategoryIndex === idx ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm focus:outline-none transition-all duration-300">
                <span className="font-extrabold text-base leading-tight pr-2">{activeCategoryName}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-40 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="py-2 bg-gray-50/50">
                  {t.categories.map((cat, idx) => (
                    <button key={idx} onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); }} className={`w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-blue-100 transition-colors ${activeCategoryIndex === idx ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700'}`}>
                      <span className="font-bold text-sm leading-tight pr-2">{cat}</span>
                      {activeCategoryIndex === idx && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL KANAN: DETAIL KONTEN (ACCORDION NEGARA/LOKASI) */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
            <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-extrabold text-2xl md:text-3xl text-[#1e293b] leading-tight">{activeCategoryName}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center self-start sm:self-auto flex-shrink-0"><FileText className="w-3.5 h-3.5 mr-1" /> {t.ui.detailBadge}</span>
            </div>

            <div className="space-y-4 animate-fade-in" key={activeCategoryIndex}>
              {Object.entries(activeContent.sections || {}).map(([key, title]) => {
                const isExpanded = expandedSections.includes(key);
                const sectionTitle = String(title); // Diperbaiki: ditegaskan sebagai string agar TS tidak komplain
                const listData = ((activeContent.data as any)[key] as string[]) || []; // Diperbaiki tipe any
                
                return (
                  <div key={key} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-400 ring-4 ring-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                    <button onClick={() => toggleSection(key)} className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white group">
                      <span className={`font-extrabold text-lg leading-snug pr-4 transition-colors ${isExpanded ? 'text-blue-700' : 'text-[#1e293b] group-hover:text-blue-600'}`}>
                        {sectionTitle}
                      </span>
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-blue-100' : 'bg-gray-50'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-700' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out origin-top ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30">
                        {/* Menampilkan daftar dengan sistem kolom ganda jika datanya banyak */}
                        <ol className={`list-decimal list-outside ml-5 space-y-2 text-gray-700 font-medium ${listData.length > 20 ? 'md:columns-2 gap-8' : ''}`}>
                          {listData.map((item, i) => (
                            <li key={i} className="pl-1 mb-2 leading-relaxed break-inside-avoid">{item}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

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
                <div><p className="font-extrabold text-xs text-gray-900">Web Lapor</p><p className="text-xs text-gray-500 font-medium">Sampaikan pengaduan</p></div>
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