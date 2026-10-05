import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, History, Flame, FileText } from 'lucide-react';
import { LanguageContext } from '../App';

// 1. DATABASE MINI UNTUK PENCARIAN (FRONTEND ONLY)
const searchData = [
  { id: 'p1', type: 'layanan', titleID: 'Pembuatan Paspor Baru', titleEN: 'New Passport Application', path: '/layanan-wni/paspor', keywords: ['paspor', 'bikin paspor', 'passport', 'wni', 'syarat paspor'] },
  { id: 'p2', type: 'layanan', titleID: 'Penggantian Paspor Hilang/Rusak', titleEN: 'Lost/Damaged Passport Replacement', path: '/layanan-wni/paspor', keywords: ['hilang', 'rusak', 'denda paspor'] },
  { id: 'p3', type: 'layanan', titleID: 'Kartu Perjalanan Pebisnis APEC', titleEN: 'APEC Business Travel Card', path: '/layanan-wni/apec', keywords: ['apec', 'abtc', 'pebisnis', 'kartu apec'] },
  { id: 'p4', type: 'layanan', titleID: 'Daftar Visa Indonesia', titleEN: 'Indonesian Visa Index', path: '/layanan-wna/visa', keywords: ['visa', 'b211a', 'indeks visa', 'jenis visa'] },
  { id: 'p5', type: 'layanan', titleID: 'Daftar Negara Subjek VoA & BVK', titleEN: 'VoA & BVK Subject Countries', path: '/layanan-wna/voa-bvk', keywords: ['voa', 'bvk', 'negara bebas visa', 'visa on arrival', 'calling visa'] },
  { id: 'p6', type: 'layanan', titleID: 'Izin Tinggal Keimigrasian (ITAS/ITAP)', titleEN: 'Immigration Stay Permit (ITAS/ITAP)', path: '/layanan-wna/izin-tinggal', keywords: ['itas', 'itap', 'itk', 'izin tinggal', 'perpanjang visa', 'alih status'] },
  { id: 'p7', type: 'info', titleID: 'Cek Status Permohonan', titleEN: 'Check Application Status', path: '/', keywords: ['cek status', 'lacak', 'tracking', 'selesai'] },
  { id: 'p8', type: 'info', titleID: 'FAQ & Pertanyaan Umum', titleEN: 'FAQ & General Questions', path: '/faq', keywords: ['faq', 'tanya jawab', 'bantuan', 'help'] },
  { id: 'p9', type: 'info', titleID: 'Profil & Sejarah Kantor', titleEN: 'Office Profile & History', path: '/tentang-kami', keywords: ['profil', 'sejarah', 'tentang kami', 'struktur organisasi', 'visi misi'] },
];

// 2. DAFTAR PENCARIAN POPULER (Default saat input kosong)
const popularSearches = [
  { id: 'pop1', titleID: 'Syarat Paspor Baru', titleEN: 'New Passport Requirements', path: '/layanan-wni/paspor' },
  { id: 'pop2', titleID: 'Daftar Negara VoA', titleEN: 'VoA Country List', path: '/layanan-wna/voa-bvk' },
  { id: 'pop3', titleID: 'Biaya Perpanjang ITAS', titleEN: 'ITAS Extension Fee', path: '/layanan-wna/izin-tinggal' },
  { id: 'pop4', titleID: 'Cek Status Permohonan', titleEN: 'Check Application Status', path: '/' },
];

export default function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchData.filter(item => {
    const searchStr = query.toLowerCase();
    const matchID = item.titleID.toLowerCase().includes(searchStr);
    const matchEN = item.titleEN.toLowerCase().includes(searchStr);
    const matchKeyword = item.keywords.some(kw => kw.includes(searchStr));
    return matchID || matchEN || matchKeyword;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    // Penambahan flex-col dan relative penuh agar elemen di dalamnya terstruktur rapi
    <div className={`relative flex flex-col ${isMobile ? 'w-full' : 'z-50'}`} ref={searchRef}>
      
      {/* WRAPPER INPUT AGAR IKON SELALU PAS DI TENGAH */}
      <div className="relative flex items-center group w-full">
        {/* Ukuran w-4 h-4 dimasukkan ke dalam className, posisi absolut dikunci di kiri */}
        <Search className={`absolute left-4 w-4 h-4 z-10 pointer-events-none transition-colors ${isOpen ? 'text-yellow-500' : 'text-gray-400 group-focus-within:text-yellow-400'}`} />
        
        <input 
          type="text" 
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={lang === 'ID' ? 'Cari layanan...' : 'Search services...'} 
          className={`relative pl-10 pr-4 focus:outline-none transition-all duration-300 text-sm text-white ${
            isMobile 
              ? 'w-full py-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500' 
              : 'py-2 rounded-full bg-white/10 border border-white/20 focus:bg-[#0f172a] focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[260px]'
          }`} 
        />
      </div>

      {/* DROPDOWN HASIL PENCARIAN */}
      {/* Penambahan 'top-full mt-2' agar dropdown jatuh tepat di BAWAH kotak input, bukan menimpanya */}
      <div className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top border border-gray-100 z-50 ${
        isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
      } ${isMobile ? 'w-full left-0 right-0' : 'w-[320px] right-0'}`}>
        
        <div className="max-h-[350px] overflow-y-auto p-2">
          
          {query.trim() === '' ? (
            <div className="p-2">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-2 mb-3 flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1 text-orange-500" /> {lang === 'ID' ? 'Pencarian Populer' : 'Popular Searches'}
              </span>
              <div className="space-y-1">
                {popularSearches.map((pop) => (
                  <button key={pop.id} onClick={() => handleNavigate(pop.path)} className="w-full text-left flex items-center px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group">
                    <History className="w-4 h-4 text-gray-400 mr-3 group-hover:text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-orange-700 truncate">{lang === 'ID' ? pop.titleID : pop.titleEN}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-2">
              {filteredResults.length > 0 ? (
                <>
                  <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest ml-2 mb-2 block">
                    {lang === 'ID' ? 'Hasil Pencarian' : 'Search Results'}
                  </span>
                  <div className="space-y-1">
                    {filteredResults.map((item) => (
                      <button key={item.id} onClick={() => handleNavigate(item.path)} className="w-full text-left flex items-start px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group">
                        <FileText className="w-4 h-4 text-gray-400 mr-3 mt-0.5 group-hover:text-blue-500 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 truncate">{lang === 'ID' ? item.titleID : item.titleEN}</p>
                          <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{item.type === 'layanan' ? (lang === 'ID' ? 'Layanan' : 'Service') : 'Informasi'}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8 text-center px-4">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-700">{lang === 'ID' ? 'Tidak menemukan hasil untuk' : 'No results found for'} "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">{lang === 'ID' ? 'Coba gunakan kata kunci lain (contoh: "paspor", "visa")' : 'Try using other keywords (e.g., "passport", "visa")'}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}