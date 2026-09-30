import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, Camera, Hash, Users, ChevronLeft, ChevronDown, ChevronUp,
  Languages, X, Bot, MessageSquare, Target, Calendar, Map
} from 'lucide-react';

const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { pre: "Profil Instansi", title: "Sejarah Kantor", back: "Kembali" },
    sec1: { sub: "Kilas Balik Instansi", title: "Sejarah & Selayang Pandang", p1: "TANGERANG - Berawal dari Pos Imigrasi kecil yang menginduk pada Kantor Imigrasi Jakarta Barat...", p2: "Kini, dengan predikat Kelas I Khusus Non TPI, Kantor Imigrasi Tangerang memegang peranan krusial sebagai garda terdepan penjaga pintu gerbang negara." },
    sec2: { sub: "Jejak Sejarah", title: "Lini Masa Perjalanan (1981 - 2024)", items: [{y: "1981", t: "Berdiri Sebagai Pos Imigrasi"}, {y: "2024", t: "Peningkatan Status Kelas I Khusus"}] },
    sec3: { sub: "Cakupan Wilayah", title: "Wilayah Kerja & Administrasi", w1: "Kota Tangerang", w2: "Kabupaten Tangerang", w3: "Kota Tangerang Selatan" },
    sec4: { title: "Visi Instansi", visi: '"Terwujudnya Pelayanan Keimigrasian dan Penegakan Hukum yang Modern, Transparan, Humanis."' },
    sec5: { title: "Struktur Organisasi", items: [{id: 1, title: "Sub Bagian Tata Usaha", desc: "Melaksanakan urusan ketatausahaan, kepegawaian, keuangan kantor."}, {id: 2, title: "Seksi Lalu Lintas Keimigrasian", desc: "Melayani permohonan paspor RI dan perlintasan wilayah."}] }
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { pre: "Agency Profile", title: "Office History", back: "Back" },
    sec1: { sub: "Agency Flashback", title: "History & Overview", p1: "TANGERANG - Starting from a small Immigration Post under the West Jakarta Immigration Office...", p2: "Now, holding the Special Class I Non-TPI status, the Tangerang Immigration Office plays a crucial role as the frontline guardian of the nation's gates." },
    sec2: { sub: "Historical Footprints", title: "Journey Timeline (1981 - 2024)", items: [{y: "1981", t: "Established as Immigration Post"}, {y: "2024", t: "Upgraded to Special Class I Status"}] },
    sec3: { sub: "Coverage Area", title: "Working & Admin Areas", w1: "Tangerang City", w2: "Tangerang Regency", w3: "South Tangerang City" },
    sec4: { title: "Agency Vision", visi: '"Realizing Modern, Transparent, and Humane Immigration Services and Law Enforcement."' },
    sec5: { title: "Organizational Structure", items: [{id: 1, title: "Administration Sub-Section", desc: "Handles administrative, staffing, and financial affairs."}, {id: 2, title: "Immigration Traffic Section", desc: "Serves RI passport applications and border crossings."}] }
  }
};

export default function TentangKami() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN'];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [expandedTugas, setExpandedTugas] = useState<number | null>(1);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      {/* NAVBAR */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10"><Shield className="w-5 h-5 text-white" /></div>
          </div>
          <div className="hidden lg:block leading-tight font-bold text-[15px]">KANTOR IMIGRASI TANGERANG</div>
        </div>
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white">{t.nav.home}</Link>
            <Link to="/tentang-kami" className="text-[#eab308] flex flex-col items-center">{t.nav.about}<span className="w-5 h-[2px] bg-[#eab308] mt-1.5"></span></Link>
          </div>
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-[#1e3a5f] px-3 py-2 rounded-full focus:outline-none">
              <Languages className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold">{lang}</span><ChevronDown className="w-4 h-4" />
            </button>
            {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl z-50">
                  <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm flex items-center space-x-2 text-gray-700"><span>🇮🇩</span> <span>Indonesia</span></button>
                  <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm flex items-center space-x-2 text-gray-700"><span>🇬🇧</span> <span>English</span></button>
                </div>
              )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 h-[280px] flex items-center px-10">
        <div className="absolute top-6 left-6 z-20"><Link to="/" className="text-[#1e3a8a] bg-white/50 px-3 py-1.5 rounded-full flex items-center"><ChevronLeft className="w-5 h-5 mr-1" /> {t.hero.back}</Link></div>
        <div>
          <p className="text-sm font-bold text-yellow-800 uppercase">{t.hero.pre}</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1e3a8a]">{t.hero.title}</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* SEJARAH */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold text-blue-600 uppercase mb-2 block">{t.sec1.sub}</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b] mb-6">{t.sec1.title}</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed text-justify"><p>{t.sec1.p1}</p><p>{t.sec1.p2}</p></div>
          </div>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" className="w-full h-[400px] object-cover rounded-2xl shadow-xl" />
        </section>

        {/* VISI & MISI */}
        <section className="bg-[#1e1b4b] text-white p-10 md:p-16 rounded-3xl relative overflow-hidden shadow-xl">
          <Target className="absolute opacity-10 -right-10 -bottom-10 w-64 h-64" />
          <span className="text-yellow-400 font-bold uppercase mb-4 block">{t.sec4.title}</span>
          <blockquote className="text-2xl md:text-4xl font-extrabold leading-snug relative z-10">{t.sec4.visi}</blockquote>
        </section>

        {/* STRUKTUR ORGANISASI (Akordion Interaktif) */}
        <section>
          <h2 className="text-3xl font-extrabold text-center text-[#1e293b] mb-12">{t.sec5.title}</h2>
          <div className="max-w-4xl mx-auto space-y-3">
            {t.sec5.items.map((tugas) => (
              <div key={tugas.id} className={`border rounded-xl transition-all ${expandedTugas === tugas.id ? 'border-blue-400 ring-1 ring-blue-100' : 'border-gray-200'}`}>
                <button onClick={() => setExpandedTugas(expandedTugas === tugas.id ? null : tugas.id)} className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none bg-gray-50/50">
                  <span className="font-bold text-sm text-[#1e293b]">{tugas.title}</span>
                  {expandedTugas === tugas.id ? <ChevronUp className="w-4 h-4 text-blue-700" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                <div className={`overflow-hidden transition-all ${expandedTugas === tugas.id ? 'max-h-40 p-5 bg-white border-t' : 'max-h-0'}`}>
                  <p className="text-sm text-gray-600">{tugas.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}