import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, History, Flame, FileText } from 'lucide-react';
import { LanguageContext } from '../App';

// 1. DATABASE PENCARIAN (DENGAN 3 BAHASA)
const searchData = [
  { id: 'p1', type: 'layanan', titleID: 'Pembuatan Paspor Baru', titleEN: 'New Passport Application', titleZH: '新护照申请', path: '/layanan-wni/paspor', keywords: ['paspor', 'bikin paspor', 'passport', '护照', 'wni'] },
  { id: 'p2', type: 'layanan', titleID: 'Penggantian Paspor Hilang/Rusak', titleEN: 'Lost/Damaged Passport Replacement', titleZH: '护照遗失/损坏补发', path: '/layanan-wni/paspor', keywords: ['hilang', 'rusak', 'denda paspor', '遗失'] },
  { id: 'p3', type: 'layanan', titleID: 'Kartu Perjalanan Pebisnis APEC', titleEN: 'APEC Business Travel Card', titleZH: 'APEC 商务旅行卡', path: '/layanan-wni/apec', keywords: ['apec', 'abtc', 'pebisnis'] },
  { id: 'p4', type: 'layanan', titleID: 'Daftar Visa Indonesia', titleEN: 'Indonesian Visa Index', titleZH: '印尼签证清单', path: '/layanan-wna/visa', keywords: ['visa', 'b211a', 'indeks visa', '签证'] },
  { id: 'p5', type: 'layanan', titleID: 'Daftar Negara Subjek VoA & BVK', titleEN: 'VoA & BVK Subject Countries', titleZH: '落地签及免签国家名单', path: '/layanan-wna/voa-bvk', keywords: ['voa', 'bvk', '落地签', 'visa on arrival'] },
  { id: 'p6', type: 'layanan', titleID: 'Izin Tinggal Keimigrasian (ITAS/ITAP)', titleEN: 'Immigration Stay Permit (ITAS/ITAP)', titleZH: '移民居留许可 (ITAS/ITAP)', path: '/layanan-wna/izin-tinggal', keywords: ['itas', 'itap', 'izin tinggal', '居留许可'] },
  { id: 'p7', type: 'info', titleID: 'Cek Status Permohonan', titleEN: 'Check Application Status', titleZH: '查询申请状态', path: '/', keywords: ['cek status', 'lacak', 'tracking', '查询'] },
  { id: 'p8', type: 'info', titleID: 'FAQ & Pertanyaan Umum', titleEN: 'FAQ & General Questions', titleZH: '常见问题解答 (FAQ)', path: '/faq', keywords: ['faq', 'tanya jawab', 'bantuan'] },
  { id: 'p9', type: 'info', titleID: 'Profil & Sejarah Kantor', titleEN: 'Office Profile & History', titleZH: '办公室简介与历史', path: '/tentang-kami', keywords: ['profil', 'sejarah', 'tentang kami', '简介'] },
];

// 2. PENCARIAN POPULER (DENGAN 3 BAHASA)
const popularSearches = [
  { id: 'pop1', titleID: 'Syarat Paspor Baru', titleEN: 'New Passport Requirements', titleZH: '新护照要求', path: '/layanan-wni/paspor' },
  { id: 'pop2', titleID: 'Daftar Negara VoA', titleEN: 'VoA Country List', titleZH: '落地签国家名单', path: '/layanan-wna/voa-bvk' },
  { id: 'pop3', titleID: 'Biaya Perpanjang ITAS', titleEN: 'ITAS Extension Fee', titleZH: 'ITAS 延期费用', path: '/layanan-wna/izin-tinggal' },
  { id: 'pop4', titleID: 'Cek Status Permohonan', titleEN: 'Check Application Status', titleZH: '查询申请状态', path: '/' },
];

export default function SearchBar({ isMobile = false }: { isMobile?: boolean }) {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredResults = searchData.filter(item => {
    const searchStr = query.toLowerCase();
    return (
      item.titleID.toLowerCase().includes(searchStr) ||
      item.titleEN.toLowerCase().includes(searchStr) ||
      item.titleZH.toLowerCase().includes(searchStr) ||
      item.keywords.some(kw => kw.includes(searchStr))
    );
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

  // Fungsi pembantu untuk menampilkan teks sesuai bahasa
  const getLabel = (idText: string, enText: string, zhText: string) => {
    if (lang === 'EN') return enText;
    if (lang === 'ZH') return zhText;
    return idText;
  };

  return (
    <div className={`relative flex flex-col ${isMobile ? 'w-full' : 'z-50'}`} ref={searchRef}>
      
      <div className="relative flex items-center group w-full">
        <Search className={`absolute left-4 w-4 h-4 z-10 pointer-events-none transition-colors ${isOpen ? 'text-yellow-500' : 'text-gray-400 group-focus-within:text-yellow-400'}`} />
        
        <input 
          type="text" 
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          placeholder={getLabel('Cari layanan...', 'Search services...', '搜索服务...')} 
          className={`relative pl-10 pr-4 focus:outline-none transition-all duration-300 text-sm text-white ${
            isMobile 
              ? 'w-full py-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500' 
              : 'py-2 rounded-full bg-white/10 border border-white/20 focus:bg-[#0f172a] focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[260px]'
          }`} 
        />
      </div>

      <div className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top border border-gray-100 z-50 ${
        isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
      } ${isMobile ? 'w-full left-0 right-0' : 'w-[320px] right-0'}`}>
        
        <div className="max-h-[350px] overflow-y-auto p-2">
          
          {query.trim() === '' ? (
            <div className="p-2">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-2 mb-3 flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1 text-orange-500" /> {getLabel('Pencarian Populer', 'Popular Searches', '热门搜索')}
              </span>
              <div className="space-y-1">
                {popularSearches.map((pop) => (
                  <button key={pop.id} onClick={() => handleNavigate(pop.path)} className="w-full text-left flex items-center px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group">
                    <History className="w-4 h-4 text-gray-400 mr-3 group-hover:text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-700 group-hover:text-orange-700 truncate">
                      {lang === 'EN' ? pop.titleEN : lang === 'ZH' ? pop.titleZH : pop.titleID}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-2">
              {filteredResults.length > 0 ? (
                <>
                  <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest ml-2 mb-2 block">
                    {getLabel('Hasil Pencarian', 'Search Results', '搜索结果')}
                  </span>
                  <div className="space-y-1">
                    {filteredResults.map((item) => (
                      <button key={item.id} onClick={() => handleNavigate(item.path)} className="w-full text-left flex items-start px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group">
                        <FileText className="w-4 h-4 text-gray-400 mr-3 mt-0.5 group-hover:text-blue-500 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 truncate">
                            {lang === 'EN' ? item.titleEN : lang === 'ZH' ? item.titleZH : item.titleID}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">
                            {item.type === 'layanan' ? getLabel('Layanan', 'Service', '服务') : getLabel('Informasi', 'Information', '信息')}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-8 text-center px-4">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-700">
                    {getLabel('Tidak menemukan hasil untuk', 'No results found for', '未找到相关结果')} "{query}"
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getLabel('Coba gunakan kata kunci lain (contoh: "paspor", "visa")', 'Try using other keywords (e.g., "passport", "visa")', '请尝试使用其他关键字（例如：“护照”、“签证”）')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}