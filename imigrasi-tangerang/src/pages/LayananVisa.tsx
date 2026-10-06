import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {
  Search, Phone, Globe, ChevronLeft, ChevronDown, X, Bot, MessageSquare,
  Send, ArrowUp, ExternalLink, Sparkles, Wifi, SearchX
} from 'lucide-react';

/* ============ DATA ============
   item: [kode, nama ID, nama EN, badge?]  (badge: 'online' | 'populer')
   Catatan: kode & nama item mengikuti struktur di desain; mohon dicek ulang
   dengan daftar resmi Ditjen Imigrasi sebelum dipublikasikan. */
type Item = [string, string, string, ('online' | 'populer')?];
const CATS: { id: string; n: string; e: string; dn: string; de: string; items: Item[] }[] = [
  { id: 'bvk', n: 'Bebas Visa Kunjungan (BVK)', e: 'Visa-Free Visit (BVK)',
    dn: 'Fasilitas masuk tanpa visa bagi warga negara tertentu untuk kunjungan singkat sesuai kebijakan keimigrasian.',
    de: 'Visa-free entry for nationals of eligible countries for short visits under immigration policy.',
    items: [['A1', 'Bebas Visa Wisata', 'Visa-Free Tourism', 'populer'], ['A2', 'Bebas Visa Pelayaran Kapal Pesiar', 'Visa-Free Yacht Cruising'], ['A3', 'Bebas Visa Kunjungan Khusus', 'Visa-Free Special Visit']] },
  { id: 'voa', n: 'Visa Kunjungan Saat Kedatangan (VoA / e-VoA)', e: 'Visa on Arrival (VoA / e-VoA)',
    dn: 'Diurus saat tiba di Tempat Pemeriksaan Imigrasi atau secara elektronik sebelum keberangkatan.',
    de: 'Obtained on arrival at an immigration checkpoint or electronically before departure.',
    items: [['B1', 'Visa Kunjungan Wisata', 'Tourism Visit Visa', 'online'], ['B2', 'Visa Kunjungan Pengawasan Pemerintahan', 'Government Visit Visa'], ['B3', 'Visa Kunjungan Pemasaran', 'Marketing Visit Visa'], ['B4', 'Visa Kunjungan Transit Internasional', 'International Transit Visa']] },
  { id: 'single', n: 'Visa Kunjungan Satu Kali Perjalanan (Single Entry)', e: 'Single Entry Visit Visa',
    dn: 'Untuk satu kali kunjungan ke Indonesia dengan masa tinggal paling lama 60 hari.',
    de: 'For a single visit to Indonesia with a stay of up to 60 days.',
    items: [['B211A', 'Visa Kunjungan Wisata', 'Tourism Visit', 'populer'], ['B211B', 'Visa Kunjungan Pertemuan Bisnis', 'Business Meeting Visit', 'online'], ['B211C', 'Visa Kunjungan Jurnalistik & Film', 'Journalism & Film Visit'], ['B1A', 'Visa Kunjungan Keluarga & Sosial', 'Family & Social Visit'], ['B1B', 'Visa Kunjungan Seni & Budaya', 'Arts & Culture Visit'], ['B1C', 'Visa Kunjungan Olahraga', 'Sports Visit'], ['B1D', 'Visa Kunjungan Pemerintahan', 'Government Visit'], ['B1E', 'Visa Kunjungan Pembelian Barang', 'Goods Purchase Visit']] },
  { id: 'multi', n: 'Visa Kunjungan Beberapa Kali Perjalanan (Multiple Entry)', e: 'Multiple Entry Visit Visa',
    dn: 'Untuk kunjungan berulang dengan masa berlaku 1 hingga 5 tahun; tiap kunjungan maksimal 60 hari.',
    de: 'For repeated visits valid 1 to 5 years; each visit up to 60 days.',
    items: [['D1', 'Visa Kunjungan Wisata', 'Tourism Visit'], ['D2', 'Visa Kunjungan Bisnis', 'Business Visit', 'populer'], ['D212', 'Visa Kunjungan Keluarga', 'Family Visit'], ['D3', 'Visa Kunjungan Pemerintahan', 'Government Visit'], ['D4', 'Visa Kunjungan Pembelian Barang', 'Goods Purchase Visit']] },
  { id: 'kerja', n: 'Visa Kerja (Tenaga Asing & Ahli)', e: 'Work Visa (Foreign & Skilled Workers)',
    dn: 'Perlu rekomendasi/RPTKA dari Kementerian Ketenagakerjaan dan penjamin di Indonesia.',
    de: 'Requires a recommendation/RPTKA from the Ministry of Manpower and a local sponsor.',
    items: [['C312', 'Visa Tenaga Kerja Asing', 'Foreign Worker Visa', 'populer'], ['C312A', 'Visa Tenaga Ahli', 'Skilled Worker Visa'], ['C312B', 'Visa Pelatihan Kerja', 'Job Training Visa'], ['C312C', 'Visa Kegiatan Profesional', 'Professional Activity Visa'], ['C312D', 'Visa Tenaga Kerja Digital Nomad', 'Digital Nomad Visa', 'online']] },
  { id: 'investor', n: 'Visa Investor (Penanaman Modal Asing)', e: 'Investor Visa (Foreign Investment)',
    dn: 'Bagi penanam modal asing; memerlukan rekomendasi BKPM / Kementerian Investasi.',
    de: 'For foreign investors; requires a recommendation from BKPM / Ministry of Investment.',
    items: [['C313', 'Visa Investor (1 Tahun)', 'Investor Visa (1 Year)', 'populer'], ['C314', 'Visa Investor (2 Tahun)', 'Investor Visa (2 Years)'], ['C314A', 'Visa Investor Pemegang Saham', 'Shareholder Investor Visa'], ['C314B', 'Visa Investor Surat Berharga Negara', 'Government Securities Investor Visa']] },
  { id: 'edu', n: 'Visa Pendidikan (Studi & Akademik)', e: 'Education Visa (Study & Academic)',
    dn: 'Untuk pelajar, mahasiswa, dan peneliti; memerlukan surat penerimaan dari lembaga pendidikan.',
    de: 'For students and researchers; requires an acceptance letter from an educational institution.',
    items: [['C316', 'Visa Pelajar / Mahasiswa', 'Student Visa', 'populer'], ['C316A', 'Visa Penelitian', 'Research Visa'], ['C316B', 'Visa Pertukaran Pelajar', 'Student Exchange Visa'], ['C316C', 'Visa Pendidikan Tinggi', 'Higher Education Visa']] },
  { id: 'keluarga', n: 'Visa Keluarga (Penyatuan Keluarga)', e: 'Family Visa (Family Reunification)',
    dn: 'Untuk orang asing yang bergabung dengan keluarga WNI atau pemegang ITAS/ITAP.',
    de: 'For foreigners joining Indonesian family members or ITAS/ITAP holders.',
    items: [['C317', 'Visa Keluarga', 'Family Visa', 'populer'], ['C317A', 'Visa Suami / Istri WNI', 'Indonesian Spouse Visa'], ['C317B', 'Visa Anak WNI', 'Indonesian Child Visa'], ['C317C', 'Visa Orang Tua Pemegang ITAS/ITAP', 'Parent of ITAS/ITAP Holder Visa'], ['C317D', 'Visa Lansia Pensiun', 'Retirement Visa']] },
  { id: 'repat', n: 'Visa Repatriasi dan Keturunan Ex-WNI', e: 'Repatriation & Ex-WNI Descendant Visa',
    dn: 'Untuk mantan WNI dan keturunannya yang ingin kembali tinggal di Indonesia.',
    de: 'For former Indonesian citizens and their descendants returning to live in Indonesia.',
    items: [['C318', 'Visa Repatriasi 1 Tahun', 'Repatriation Visa (1 Year)', 'populer'], ['C318A', 'Visa Repatriasi Tinggal Terbatas', 'Limited Stay Repatriation Visa'], ['C318B', 'Visa Ex-WNI Tinggal Terbatas', 'Ex-WNI Limited Stay Visa', 'online'], ['C318C', 'Visa Keturunan Ex-WNI', 'Ex-WNI Descendant Visa']] },
  { id: 'second', n: 'Visa Rumah Kedua (Second Home & Talenta)', e: 'Second Home & Talent Visa',
    dn: 'Masa tinggal panjang bagi pemilik dana/aset tertentu dan talenta global.',
    de: 'Long-stay visa for holders of qualifying funds/assets and global talents.',
    items: [['C319', 'Visa Rumah Kedua', 'Second Home Visa', 'populer'], ['C319A', 'Visa Rumah Kedua Kolaborasi Perusahaan', 'Corporate Second Home Visa'], ['C319B', 'Visa Rumah Kedua Lansia (Limited Stay)', 'Retiree Second Home Visa'], ['C319C', 'Visa Talenta Global', 'Global Talent Visa']] },
  { id: 'whv', n: 'Visa Kemudahan Bekerja Saat Berlibur (WHV)', e: 'Working Holiday Visa (WHV)',
    dn: 'Bagi anak muda dari negara mitra untuk berlibur sambil bekerja sementara di Indonesia.',
    de: 'For young people from partner countries to holiday while working temporarily in Indonesia.',
    items: [['WHV1', 'Visa Kemudahan Bekerja Saat Berlibur', 'Working Holiday Visa'], ['WHV2', 'Visa Kemudahan Bekerja Saat Berlibur (Perpanjangan)', 'Working Holiday Visa (Extension)']] },
];

const TONES = [
  { chip: 'bg-blue-600', soft: 'bg-blue-50 text-blue-700', bar: 'bg-blue-500' },
  { chip: 'bg-emerald-600', soft: 'bg-emerald-50 text-emerald-700', bar: 'bg-emerald-500' },
  { chip: 'bg-indigo-600', soft: 'bg-indigo-50 text-indigo-700', bar: 'bg-indigo-500' },
  { chip: 'bg-amber-600', soft: 'bg-amber-50 text-amber-700', bar: 'bg-amber-500' },
];

const TXT = {
  ID: { title: 'Daftar Visa Indonesia', sub: 'Layanan Fasilitas Keimigrasian WNA', back: 'Kembali', side: 'Isi dari Visa & Izin Tinggal', ph: 'Cari kode atau nama visa...', idx: 'Klasifikasi Indeks', kinds: 'jenis', cats: 'kategori', empty: 'Visa tidak ditemukan', emptyD: 'Coba kata kunci lain, misalnya "wisata" atau "B211A".', reset: 'Hapus pencarian', apply: 'Ajukan di Molina', online: 'Online', pop: 'Populer', cat: 'Kategori', hint: 'Klik kartu untuk detail', help: 'Layanan Bantuan', chatPh: 'Tanya sesuatu...', hello: 'Halo! Ada yang bisa dibantu mengenai Visa?', found: 'ditemukan' },
  EN: { title: 'Indonesian Visa Index', sub: 'Immigration Facilities for Foreign Nationals', back: 'Back', side: 'Visas & Stay Permits', ph: 'Search visa code or name...', idx: 'Index Classification', kinds: 'types', cats: 'categories', empty: 'No visa found', emptyD: 'Try another keyword, e.g. "tourism" or "B211A".', reset: 'Clear search', apply: 'Apply on Molina', online: 'Online', pop: 'Popular', cat: 'Category', hint: 'Click a card for details', help: 'Help Center', chatPh: 'Ask something...', hello: 'Hello! Need help with Visas?', found: 'found' },
  ZH: { title: '印尼签证清单', sub: '外国国民的出入境便利服务', back: '返回', side: '签证与居留许可', ph: '搜索签证代码或名称...', idx: '索引分类', kinds: '种', cats: '类别', empty: '未找到签证', emptyD: '请尝试其他关键词，例如 "B211A"。', reset: '清除搜索', apply: '在 Molina 申请', online: '线上', pop: '热门', cat: '类别', hint: '点击卡片查看详情', help: '帮助中心', chatPh: '请输入问题...', hello: '您好！请问有关于签证的问题需要帮助吗？', found: '个结果' },
};

/* ============ KOMPONEN KECIL ============ */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`v-reveal ${seen ? 'v-in' : ''} ${className}`}>{children}</div>;
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min((t - t0) / 700, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v}</>;
}

function Mark({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

/* ============ HALAMAN ============ */
export default function LayananVisa() {
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = TXT[L];
  const nm = (it: Item) => (L === 'ID' ? it[1] : it[2]);

  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState(CATS[0].id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [modal, setModal] = useState<{ item: Item; cat: typeof CATS[number]; tone: number } | null>(null);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([{ sender: 'ivara', text: t.hello }]);
  const [inputMessage, setInputMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  const q = query.trim();
  const filtered = useMemo(() => CATS.map((c, ci) => ({
    ...c, ci,
    items: c.items.filter(it => !q || [it[0], it[1], it[2]].some(s => s.toLowerCase().includes(q.toLowerCase()))),
  })).filter(c => c.items.length), [q]);
  const total = filtered.reduce((a, c) => a + c.items.length, 0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      setShowTop(window.scrollY > 600);
      let cur = filtered[0]?.id;
      for (const c of filtered) { const el = document.getElementById(c.id); if (el && el.getBoundingClientRect().top <= 160) cur = c.id; }
      if (cur) setActive(cur);
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [filtered]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc);
  }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const go = (id: string) => {
    setActive(id); setCollapsed(p => ({ ...p, [id]: false }));
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  const reply = (m: string) => {
    const s = m.toLowerCase();
    if (/biaya|harga|fee|cost|费/.test(s)) return L === 'ID' ? 'Biaya bergantung jenis visa, mis. VoA Rp 500.000. Cek rincian terbaru di molina.imigrasi.go.id.' : 'Fees depend on the visa type, e.g. VoA is Rp 500,000. See molina.imigrasi.go.id for current rates.';
    if (/b211|wisata|tour|旅游/.test(s)) return L === 'ID' ? 'Untuk wisata satu kali kunjungan, pilih B211A (maks. 60 hari). Lihat kategori Single Entry di halaman ini.' : 'For a single tourist visit, choose B211A (up to 60 days). See the Single Entry category on this page.';
    if (/kerja|work|工作/.test(s)) return L === 'ID' ? 'Visa kerja (C312) memerlukan RPTKA dan penjamin di Indonesia.' : 'Work visas (C312) require an RPTKA and a local sponsor.';
    return L === 'ID' ? 'Terima kasih! Coba cari kode atau nama visa di kolom pencarian, atau hubungi Call Center kami.' : 'Thanks! Try searching a visa code or name in the search box, or contact our Call Center.';
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault(); const m = inputMessage.trim(); if (!m) return;
    setMessages(p => [...p, { sender: 'user', text: m }]); setInputMessage(''); setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { sender: 'ivara', text: reply(m) }]); }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-x-hidden">
      <style>{`
        .v-reveal{opacity:0;transform:translateY(22px) scale(.98);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
        .v-in{opacity:1;transform:none}
        @keyframes vUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes vPop{from{opacity:0;transform:scale(.92) translateY(10px)}to{opacity:1;transform:none}}
        @keyframes vFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(24px,-18px)}}
        @keyframes vDot{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        @keyframes vShine{from{background-position:-200% 0}to{background-position:200% 0}}
        .v-up{animation:vUp .7s cubic-bezier(.2,.7,.2,1) both}.v-pop{animation:vPop .35s cubic-bezier(.2,.7,.2,1) both}
        .v-shine{background:linear-gradient(110deg,#fff 30%,#fde68a 50%,#fff 70%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:vShine 4s linear infinite}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.v-reveal{opacity:1;transform:none}}
      `}</style>

      {/* progress baca */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent"><div className="h-full bg-gradient-to-r from-yellow-400 to-blue-500 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <Navbar />

      {/* HERO */}
      <div className="relative bg-[#0f172a] pt-28 pb-14 px-6 lg:px-12 xl:px-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2074" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-blue-500/30 blur-3xl" style={{ animation: 'vFloat 9s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/20 blur-3xl" style={{ animation: 'vFloat 12s ease-in-out infinite reverse' }} />
        <div className="relative z-10">
          <Link to="/" className="v-up inline-flex items-center text-gray-300 hover:text-white hover:-translate-x-1 mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-all"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
          <h1 className="v-up text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg" style={{ animationDelay: '80ms' }}>{t.title}</h1>
          <p className="v-up text-yellow-400 font-bold tracking-wide text-sm mb-8" style={{ animationDelay: '160ms' }}>{t.sub}</p>
          <div className="v-up flex gap-4" style={{ animationDelay: '240ms' }}>
            {[[CATS.length, t.cats], [CATS.reduce((a, c) => a + c.items.length, 0), t.kinds]].map(([n, l], i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl px-5 py-3 border border-white/10">
                <p className="text-3xl font-extrabold v-shine"><CountUp to={n as number} /></p><p className="text-xs text-gray-300">{l}</p>
              </div>))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR */}
          <aside className="w-full lg:w-[320px] bg-white p-5 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-24 z-20 flex-shrink-0 v-up" style={{ animationDelay: '120ms' }}>
            <h3 className="font-extrabold text-[#1e293b] mb-3">{t.side}</h3>
            <div className="relative mb-4 group">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-600 transition-colors" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.ph} className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" />
              {query && <button onClick={() => setQuery('')} aria-label={t.reset} className="v-pop absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
            </div>
            {q && <p className="v-pop text-xs text-blue-600 font-bold mb-3">{total} {t.found}</p>}
            <p className="text-xs font-bold text-gray-400 mb-2">{t.idx}</p>
            <div className="flex flex-col gap-0.5 max-h-[52vh] overflow-y-auto pr-1">
              {filtered.map(c => {
                const on = active === c.id;
                return (
                  <button key={c.id} onClick={() => go(c.id)} className={`group flex items-center gap-3 text-left px-3 py-2.5 rounded-xl transition-all duration-300 ${on ? 'bg-blue-50 text-blue-700 font-bold translate-x-1' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}>
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300 ${on ? TONES[c.ci % 4].bar + ' scale-125' : 'bg-gray-300 group-hover:bg-blue-300'}`} />
                    <span className="text-[13px] leading-snug flex-1">{(L === 'ID' ? c.n : c.e).replace(/\s*\(.*\)$/, '')}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full transition-colors ${on ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{c.items.length}</span>
                  </button>);
              })}
            </div>
          </aside>

          {/* KONTEN */}
          <div className="w-full space-y-6 min-w-0">
            <p className="text-xs text-gray-400 px-1">{t.hint}</p>
            {filtered.length === 0 && (
              <div className="v-pop bg-white rounded-3xl border border-gray-100 shadow-xl p-12 text-center">
                <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-extrabold text-xl text-[#1e293b] mb-1">{t.empty}</h3>
                <p className="text-gray-500 text-sm mb-5">{t.emptyD}</p>
                <button onClick={() => setQuery('')} className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all">{t.reset}</button>
              </div>)}

            {filtered.map(c => {
              const tone = TONES[c.ci % 4];
              const isOpen = !collapsed[c.id];
              return (
                <Reveal key={c.id}>
                  <section id={c.id} className="scroll-mt-28 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <button onClick={() => setCollapsed(p => ({ ...p, [c.id]: isOpen }))} className="w-full text-left p-6 md:p-8 flex items-start gap-4 hover:bg-gray-50/70 transition-colors" aria-expanded={isOpen}>
                      <span className={`${tone.chip} text-white text-sm font-extrabold w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>{c.ci + 1}</span>
                      <span className="flex-1">
                        <span className="block text-xl md:text-2xl font-extrabold text-[#1e293b]">{L === 'ID' ? c.n : c.e}</span>
                        <span className="block text-sm text-gray-500 mt-1 leading-relaxed">{L === 'ID' ? c.dn : c.de}</span>
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tone.soft} flex-shrink-0`}>{c.items.length}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="px-6 md:px-8 pb-8 grid sm:grid-cols-2 gap-3">
                          {c.items.map((it, idx) => (
                            <button key={it[0] + idx} onClick={() => setModal({ item: it, cat: c, tone: c.ci % 4 })}
                              className="v-pop group text-left p-4 border border-gray-200 rounded-2xl bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 active:scale-[.98] transition-all duration-300 flex gap-3 items-start"
                              style={{ animationDelay: `${Math.min(idx, 8) * 45}ms` }}>
                              <span className={`${tone.chip} text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}>{it[0]}</span>
                              <span className="flex-1 min-w-0">
                                <span className="block font-bold text-sm text-gray-900 leading-snug"><Mark text={nm(it)} q={q} /></span>
                                {it[3] && <span className={`inline-flex items-center gap-1 mt-2 text-[11px] font-bold px-2 py-0.5 rounded-full ${it[3] === 'online' ? 'bg-emerald-50 text-emerald-700' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {it[3] === 'online' ? <Wifi className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}{it[3] === 'online' ? t.online : t.pop}</span>}
                              </span>
                            </button>))}
                        </div>
                      </div>
                    </div>
                  </section>
                </Reveal>);
            })}
          </div>
        </div>
      </main>

      <Footer />

      {/* MODAL DETAIL */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm v-pop" onClick={() => setModal(null)}>
          <div className="v-pop bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={`${TONES[modal.tone].chip} p-6 text-white relative`}>
              <button onClick={() => setModal(null)} aria-label="Close" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors"><X className="w-4 h-4" /></button>
              <span className="inline-block bg-white/20 rounded-lg px-3 py-1 text-sm font-extrabold mb-3">{modal.item[0]}</span>
              <h3 className="text-xl font-extrabold leading-snug">{nm(modal.item)}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div><p className="text-xs font-bold text-gray-400 mb-1">{t.cat}</p><p className="font-bold text-[#1e293b] text-sm">{L === 'ID' ? modal.cat.n : modal.cat.e}</p></div>
              <p className="text-sm text-gray-600 leading-relaxed">{L === 'ID' ? modal.cat.dn : modal.cat.de}</p>
              <a href="https://molina.imigrasi.go.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-[#1e293b] font-extrabold rounded-xl transition-all">{t.apply}<ExternalLink className="w-4 h-4" /></a>
            </div>
          </div>
        </div>)}

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Top" className="v-pop w-11 h-11 rounded-full bg-white text-blue-600 shadow-xl border border-gray-100 flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}

        <div className={`transform origin-bottom-right transition-all duration-300 ease-out ${isCsOpen ? 'scale-100 opacity-100 visible' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-[#1e293b]">{t.help}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-1"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { href: 'tel:02155790871', i: <Phone className="w-4 h-4" />, a: 'Call Center', b: '(021) 5579 0871', c: 'hover:bg-blue-50', d: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600' },
                { href: 'https://wa.me/628114119000', i: <MessageSquare className="w-4 h-4" />, a: 'WhatsApp', b: '0811 411 9000', c: 'hover:bg-green-50', d: 'bg-green-100 text-green-600 group-hover:bg-green-500' },
                { href: 'https://www.lapor.go.id/', i: <Globe className="w-4 h-4" />, a: 'LAPOR', b: L === 'ID' ? 'Sampaikan pengaduan' : 'Submit a complaint', c: 'hover:bg-orange-50', d: 'bg-orange-100 text-orange-600 group-hover:bg-orange-500' },
              ].map(x => (
                <a key={x.a} href={x.href} target={x.href.startsWith('http') && !x.href.includes('wa.me') ? '_blank' : undefined} rel="noopener noreferrer" className={`flex items-center space-x-4 p-3 rounded-2xl ${x.c} text-gray-700 transition-all hover:translate-x-1 group`}>
                  <div className={`w-10 h-10 ${x.d} rounded-full flex items-center justify-center group-hover:text-white transition-colors`}>{x.i}</div>
                  <div><p className="font-extrabold text-xs text-gray-900">{x.a}</p><p className="text-xs text-gray-500 font-medium">{x.b}</p></div>
                </a>))}
            </div>
          </div>
        </div>

        <div className={`transform origin-bottom-right transition-all duration-300 ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"><Bot className="w-6 h-6" /></div>
                <div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse" />Online</p></div></div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-300 hover:text-white bg-white/10 rounded-full p-1.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-gray-50 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`v-pop flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm font-medium leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{m.text}</div>
                </div>))}
              {typing && <div className="v-pop flex"><div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">{[0, 1, 2].map(d => <span key={d} className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: `vDot 1s ${d * 0.15}s infinite` }} />)}</div></div>}
              <div ref={chatEnd} />
            </div>
            <form onSubmit={send} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder={t.chatPh} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
              <button type="submit" aria-label="Send" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform shadow-md flex-shrink-0"><Send className="w-5 h-5 ml-1" /></button>
            </form>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={() => { setIsCsOpen(!isCsOpen); setIsIvaraOpen(false); }} aria-label={t.help} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all duration-300 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>{isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}</button>
          <button onClick={() => { setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false); }} aria-label="IVARA" className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all duration-300 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>
            {isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
            {!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" />}
          </button>
        </div>
      </div>
    </div>
  );
}