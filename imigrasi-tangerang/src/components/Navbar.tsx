import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Globe, Languages, ChevronDown, Menu, X } from 'lucide-react';
import { LanguageContext } from '../App';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { lang, setLang } = useContext(LanguageContext);
  const location = useLocation();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek transparan/solid saat di-scroll
  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
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
      
      {/* KANAN (DESKTOP): Menu Utama */}
      <div className="hidden lg:flex items-center space-x-8">
        <div className="flex space-x-7 font-medium text-[14px]">
          <Link to="/" className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/' ? 'text-[#eab308] font-bold' : 'text-white hover:text-[#eab308] hover:-translate-y-0.5'}`}>
            {lang === 'ID' ? 'Beranda' : 'Home'}
            {location.pathname === '/' && <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span>}
          </Link>
          <Link to="/informasi-publik" className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/informasi-publik' ? 'text-[#eab308] font-bold' : 'text-white hover:text-[#eab308] hover:-translate-y-0.5'}`}>
            {lang === 'ID' ? 'Informasi Publik' : 'Public Info'}
            {location.pathname === '/informasi-publik' && <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span>}
          </Link>
          <Link to="/berita" className={`flex flex-col items-center transition-all duration-300 ${location.pathname.startsWith('/berita') ? 'text-[#eab308] font-bold' : 'text-white hover:text-[#eab308] hover:-translate-y-0.5'}`}>
            {lang === 'ID' ? 'Berita' : 'News'}
            {location.pathname.startsWith('/berita') && <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span>}
          </Link>
          <Link to="/tentang-kami" className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/tentang-kami' ? 'text-[#eab308] font-bold' : 'text-white hover:text-[#eab308] hover:-translate-y-0.5'}`}>
            {lang === 'ID' ? 'Tentang Kami' : 'About Us'}
            {location.pathname === '/tentang-kami' && <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span>}
          </Link>
          <Link to="/faq" className={`flex flex-col items-center transition-all duration-300 ${location.pathname === '/faq' ? 'text-[#eab308] font-bold' : 'text-white hover:text-[#eab308] hover:-translate-y-0.5'}`}>
            FAQ
            {location.pathname === '/faq' && <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all"></span>}
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <SearchBar isMobile={false} />
          
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-300">
              <Languages className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold text-white">{lang}</span><ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-3 w-44 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-300 ease-out ${isLangOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'}`}>
              <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇮🇩</span> <span>Indonesia</span></button>
              <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors border-t border-gray-50 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇬🇧</span> <span>English</span></button>
              <button onClick={() => { setLang('ZH'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors border-t border-gray-50 ${lang === 'ZH' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇨🇳</span> <span>中文 (Mandarin)</span></button>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN (MOBILE): Tombol Hamburger */}
      <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white hover:text-yellow-400 focus:outline-none p-2 bg-white/5 rounded-xl border border-white/10">
        <Menu className="w-6 h-6" />
      </button>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0b162c] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="text-yellow-400 font-extrabold tracking-widest text-sm uppercase">Navigasi</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-2 transition-colors"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <SearchBar isMobile={true} />

          <div className="flex flex-col space-y-5">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold text-sm tracking-wide ${location.pathname === '/' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
            <Link to="/informasi-publik" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold text-sm tracking-wide ${location.pathname === '/informasi-publik' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>{lang === 'ID' ? 'Informasi Publik' : 'Public Info'}</Link>
            <Link to="/berita" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold text-sm tracking-wide ${location.pathname.startsWith('/berita') ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>{lang === 'ID' ? 'Berita' : 'News'}</Link>
            <Link to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold text-sm tracking-wide ${location.pathname === '/tentang-kami' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>{lang === 'ID' ? 'Tentang Kami' : 'About Us'}</Link>
            <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold text-sm tracking-wide ${location.pathname === '/faq' ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}>FAQ</Link>
          </div>

          <div className="pt-6 border-t border-white/10">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Language</span>
            <div className="flex flex-col space-y-2">
              <button onClick={() => { setLang('ID'); setIsMobileMenuOpen(false); }} className={`py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'ID' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}>ID 🇮🇩</button>
              <button onClick={() => { setLang('EN'); setIsMobileMenuOpen(false); }} className={`py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'EN' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}>EN 🇬🇧</button>
              <button onClick={() => { setLang('ZH'); setIsMobileMenuOpen(false); }} className={`py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'ZH' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-300'}`}>ZH 🇨🇳</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}