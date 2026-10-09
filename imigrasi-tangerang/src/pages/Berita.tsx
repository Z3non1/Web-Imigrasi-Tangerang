import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NEWS, type CatKey, type News } from '../data/Berita';
import {
  Search, Phone, Globe, ChevronLeft, ChevronRight, Calendar, Clock, Bookmark, X, Bot,
  MessageSquare, Send, ArrowUp, ArrowRight, Star, Mail, FolderOpen, Check, Loader2, SearchX, ChevronDown
} from 'lucide-react';

const PAGE = 6;
const CAT_COLOR: Record<CatKey, string> = { press: 'border-t-[#1c1a6b]', ops: 'border-t-orange-400', service: 'border-t-emerald-500', intel: 'border-t-blue-500', zi: 'border-t-yellow-500' };

const TXT = {
  ID: { loc: 'id-ID', back: 'Kembali', h1: 'Warta Keimigrasian & Siaran Pers Resmi', sub: 'Pusat informasi berkala, rilis media, pengumuman operasional kuota antrean, dan transparansi kegiatan Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.', ph: 'Cari berita atau pengumuman, contoh: Paspor Simpatik, Kuota M-Paspor, Operasi Jagratara...', go: 'Cari Warta', feat: 'Unggulan', min: 'menit baca', mnt: 'mnt baca', readPress: 'Baca Siaran Pers Selengkapnya', more: 'Baca Selengkapnya', sort: 'Urutkan:', newest: 'Terbaru', oldest: 'Terlama', az: 'Judul A-Z', cats: { all: 'Semua Warta', press: 'Siaran Pers', ops: 'Pengumuman Operasional', service: 'Layanan Publik', intel: 'Pengawasan & Intelijen (Wasdakim)', zi: 'Zona Integritas (WBK/WBBM)' }, showing: 'Menampilkan', of: 'dari', pubs: 'publikasi resmi', archive: 'Lihat Arsip Berita Tahunan (2020-2025)', nlTag: 'LAYANAN BULETIN ELEKTRONIK', nlH: 'Dapatkan Warta & Update Regulasi Keimigrasian Langsung di Surel Anda', nlD: 'Terima rilis pers resmi, pembaruan kuota paspor akhir pekan, serta pengumuman kebijakan izin tinggal tanpa iklan dan sepenuhnya resmi dari Humas Kanim Tangerang.', nlPh: 'Masukkan alamat email resmi Anda...', nlBtn: 'Berlangganan', nlNote: 'Kami menghargai privasi data Anda sesuai dengan UU Pelindungan Data Pribadi No. 27 Tahun 2022.', nlErr: 'Alamat email tidak valid.', nlOk: 'Berhasil! Terima kasih telah berlangganan.', none: 'Berita tidak ditemukan', noneD: 'Coba kata kunci atau kategori lain.', reset: 'Reset filter', saved: 'Simpan', help: 'Layanan Bantuan', ask: 'Tanya sesuatu...', hello: 'Halo! Saya IVARA. Ada yang bisa dibantu?', report: 'Sampaikan pengaduan' },
  EN: { loc: 'en-US', back: 'Back', h1: 'Immigration News & Official Press Releases', sub: 'Periodic information, media releases, queue quota announcements, and activity transparency of the Tangerang Special Class I Non-TPI Immigration Office.', ph: 'Search news or announcements, e.g. Simpatik Passport, M-Paspor Quota...', go: 'Search', feat: 'Featured', min: 'min read', mnt: 'min read', readPress: 'Read Full Press Release', more: 'Read More', sort: 'Sort:', newest: 'Newest', oldest: 'Oldest', az: 'Title A-Z', cats: { all: 'All News', press: 'Press Release', ops: 'Operational Notices', service: 'Public Services', intel: 'Surveillance & Intelligence', zi: 'Integrity Zone (WBK/WBBM)' }, showing: 'Showing', of: 'of', pubs: 'official publications', archive: 'View Annual News Archive (2020-2025)', nlTag: 'ELECTRONIC BULLETIN', nlH: 'Get Immigration News & Regulation Updates Straight to Your Inbox', nlD: 'Receive official press releases, weekend passport quota updates, and residence permit policy announcements, ad-free and fully official.', nlPh: 'Enter your official email address...', nlBtn: 'Subscribe', nlNote: 'We respect your data privacy in accordance with Indonesian Personal Data Protection Law No. 27 of 2022.', nlErr: 'Invalid email address.', nlOk: 'Success! Thank you for subscribing.', none: 'No news found', noneD: 'Try another keyword or category.', reset: 'Reset filters', saved: 'Save', help: 'Help Center', ask: 'Ask something...', hello: 'Hello! I am IVARA. How can I help?', report: 'Submit a complaint' },
  ZH: { loc: 'zh-CN', back: '返回', h1: '移民新闻与官方新闻稿', sub: '坦格朗特别一级非TPI移民局的定期信息、媒体发布、排队名额公告及活动透明度。', ph: '搜索新闻或公告，例如：护照名额...', go: '搜索', feat: '精选', min: '分钟阅读', mnt: '分钟阅读', readPress: '阅读完整新闻稿', more: '阅读更多', sort: '排序：', newest: '最新', oldest: '最早', az: '标题 A-Z', cats: { all: '所有新闻', press: '新闻稿', ops: '运营公告', service: '公共服务', intel: '监督与情报', zi: '廉洁区 (WBK/WBBM)' }, showing: '显示', of: '共', pubs: '条官方发布', archive: '查看年度新闻档案 (2020-2025)', nlTag: '电子简报服务', nlH: '将移民新闻与法规更新直接发送到您的邮箱', nlD: '接收官方新闻稿、周末护照名额更新及居留许可政策公告，无广告，完全官方。', nlPh: '输入您的官方电子邮箱...', nlBtn: '订阅', nlNote: '我们依据2022年第27号个人数据保护法保护您的数据隐私。', nlErr: '邮箱地址无效。', nlOk: '成功！感谢您的订阅。', none: '未找到新闻', noneD: '请尝试其他关键词或类别。', reset: '重置筛选', saved: '收藏', help: '帮助中心', ask: '请输入问题...', hello: '您好！我是 IVARA，请问需要什么帮助？', report: '提交投诉' },
};

function Mark({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-yellow-200 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export default function Berita() {
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = TXT[L];
  const fmt = (d: string) => new Date(d).toLocaleDateString(t.loc, { day: '2-digit', month: 'long', year: 'numeric' });

  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<'all' | CatKey>('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'az'>('newest');
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [nl, setNl] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const results = useRef<HTMLDivElement>(null);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: t.hello }]);
  const [inputMessage, setInputMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const on = () => {
      setScrollY(window.scrollY);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  // skeleton singkat saat filter / sort / halaman berubah
  const change = (fn: () => void) => { fn(); setBusy(true); setTimeout(() => setBusy(false), 380); };
  const goResults = () => results.current && window.scrollTo({ top: results.current.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });

  const q = query.trim().toLowerCase();
  const match = (n: News) => (cat === 'all' || n.cat === cat) &&
    (!q || [n.title, n.desc, n.unit, ...(n.tags || [])].some(s => s.toLowerCase().includes(q)));
  const featured = NEWS.find(n => n.featured && match(n));
  const list = useMemo(() => {
    const l = NEWS.filter(n => !n.featured && match(n));
    return l.sort((a, b) => sort === 'az' ? a.title.localeCompare(b.title) : sort === 'oldest' ? +new Date(a.date) - +new Date(b.date) : +new Date(b.date) - +new Date(a.date));
  }, [q, cat, sort]); // eslint-disable-line
  const pages = Math.max(1, Math.ceil(list.length / PAGE));
  const cur = Math.min(page, pages);
  const slice = list.slice((cur - 1) * PAGE, cur * PAGE);
  const pageNums = (): (number | '…')[] => {
    if (pages <= 6) return Array.from({ length: pages }, (_, i) => i + 1);
    const s = new Set([1, 2, 3, 4, pages]); const out: (number | '…')[] = [];
    [...s].sort((a, b) => a - b).forEach((n, i, a) => { if (i && n - a[i - 1] > 1) out.push('…'); out.push(n); });
    return out;
  };

  const toggleSave = (e: React.MouseEvent, id: number) => { e.preventDefault(); e.stopPropagation(); setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setNl('err'); return; }
    setNl('loading'); setTimeout(() => { setNl('ok'); setEmail(''); }, 1100);
  };

  const reply = (m: string) => {
    const s = m.toLowerCase();
    if (/paspor|passport|护照/.test(s)) return L === 'ID' ? 'Info paspor (blangko, kuota Simpatik) ada di kategori Siaran Pers dan Pengumuman Operasional. Coba cari "paspor" di kolom pencarian.' : 'Passport info (booklets, Simpatik quota) is under Press Releases and Operational Notices. Try searching "passport".';
    if (/jagratara|operasi|wasdakim/.test(s)) return L === 'ID' ? 'Berita Operasi Jagratara ada di kategori Pengawasan & Intelijen (Wasdakim).' : 'Jagratara operation news is under Surveillance & Intelligence.';
    return L === 'ID' ? 'Ketik kata kunci di kolom "Cari Warta", atau hubungi Call Center kami.' : 'Type a keyword in the search box, or contact our Call Center.';
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault(); const m = inputMessage.trim(); if (!m) return;
    setMessages(p => [...p, { sender: 'user', text: m }]); setInputMessage(''); setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { sender: 'ivara', text: reply(m) }]); }, 900);
  };

  const Card = ({ n, i }: { n: News; i: number }) => (
    <Link key={n.id} to={`/berita/${n.id}`} className={`bt-pop group bg-white border border-gray-200 border-t-4 ${CAT_COLOR[n.cat]} rounded-md overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`} style={{ animationDelay: `${i * 70}ms` }}>
      <div className="relative overflow-hidden h-44">
        <img src={n.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <span className="absolute top-2 left-2 bg-white/95 text-[#1c1a6b] text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">{t.cats[n.cat]}</span>
        <button onClick={e => toggleSave(e, n.id)} aria-label={t.saved} className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all active:scale-75 ${saved.includes(n.id) ? 'bg-yellow-400 text-[#1c1a6b] scale-110' : 'bg-white/90 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-[#1c1a6b]'}`}>
          <Bookmark className={`w-4 h-4 ${saved.includes(n.id) ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2"><Calendar className="w-3.5 h-3.5" />{fmt(n.date)}<span>•</span>{n.read} {t.mnt}</div>
        <h3 className="font-extrabold text-[#0f172a] leading-snug mb-2 line-clamp-2 group-hover:text-[#1c1a6b] transition-colors"><Mark text={n.title} q={q} /></h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4"><Mark text={n.desc} q={q} /></p>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500">{n.unit}</span>
          <span className="font-bold text-[#1c1a6b] inline-flex items-center">{t.more}<ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
      <style>{`
        @keyframes btUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes btPop{from{opacity:0;transform:scale(.95) translateY(12px)}to{opacity:1;transform:none}}
        @keyframes btShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
        @keyframes btDot{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        @keyframes btCheck{from{transform:scale(0) rotate(-30deg)}to{transform:scale(1) rotate(0)}}
        .bt-up{animation:btUp .45s ease-out both}.bt-pop{animation:btPop .45s cubic-bezier(.2,.7,.2,1) both}
        .bt-shake{animation:btShake .35s}.bt-check{animation:btCheck .45s cubic-bezier(.3,1.6,.5,1) both}
        .animate-fade-in{animation:btPop .3s ease-out both}
        .hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{scrollbar-width:none}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60]"><div className="h-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <Navbar />

      {/* HERO */}
      <div className="relative h-[420px] overflow-hidden bg-[#1c1a6b]">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1974" alt="" className="absolute inset-0 w-full h-[130%] object-cover opacity-70" style={{ transform: `translateY(${Math.min(scrollY, 500) * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a6b]/55 to-[#1c1a6b]/80" />
        <Link to="/" className="absolute top-24 left-6 z-20 inline-flex items-center text-white font-semibold bg-white/10 border border-white/25 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/25 hover:text-yellow-300 hover:-translate-x-1 active:scale-95 transition-all"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
        <div className="absolute inset-x-0 bottom-10 px-6 lg:px-16">
          <div className="bt-up max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg tracking-tight mb-3">{t.h1}</h1>
            <p className="text-gray-100 drop-shadow text-sm md:text-base max-w-4xl mb-6 leading-relaxed">{t.sub}</p>
            <form onSubmit={e => { e.preventDefault(); setPage(1); goResults(); }} className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 border border-gray-200 focus-within:ring-4 focus-within:ring-indigo-200 focus-within:shadow-xl transition-all max-w-3xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder={t.ph} className="w-full pl-10 pr-8 py-2.5 text-sm bg-transparent focus:outline-none" />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear" className="bt-pop absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
              </div>
              <button type="submit" className="bg-[#fbbf24] hover:bg-yellow-300 text-[#1c1a6b] font-extrabold text-sm px-6 py-2.5 rounded-lg active:scale-95 hover:shadow-lg transition-all">{t.go}</button>
            </form>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 pb-16">

        {/* UNGGULAN */}
        {featured && (
          <>
            <article className="bt-up mt-10 relative bg-white rounded-md border border-gray-200 border-t-4 border-t-[#1c1a6b] shadow-2xl overflow-hidden grid lg:grid-cols-[1.15fr_1fr] group">
              <Link to={`/berita/${featured.id}`} className="relative overflow-hidden min-h-[260px]">
                <img src={featured.img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-[#1c1a6b] text-white text-xs font-bold px-3 py-1 rounded inline-flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />{t.feat}</span>
                  <span className="bg-white text-[#1c1a6b] text-xs font-bold px-3 py-1 rounded">{t.cats[featured.cat]}</span>
                </div>
              </Link>
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3"><span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{fmt(featured.date)}</span><span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.read} {t.min}</span></div>
                <h2 className="text-xl md:text-2xl font-extrabold text-[#0f172a] leading-snug mb-4"><Mark text={featured.title} q={q} /></h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5"><Mark text={featured.desc} q={q} /></p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {featured.tags?.map(tag => <button key={tag} onClick={() => { setQuery(tag); setPage(1); goResults(); }} className="text-[11px] font-semibold text-[#1c1a6b] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded hover:bg-[#1c1a6b] hover:text-white active:scale-95 transition-all">{tag}</button>)}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-indigo-100 text-[#1c1a6b] text-xs font-extrabold flex items-center justify-center">HT</span>
                  <div className="text-xs"><p className="font-bold text-gray-900">{featured.unit}</p><p className="text-gray-500">Subseksi Informasi & Komunikasi</p></div>
                </div>
                <Link to={`/berita/${featured.id}`} className="mt-4 inline-flex items-center text-sm font-extrabold text-[#1c1a6b] hover:gap-1">{t.readPress}<ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" /></Link>
              </div>
            </article>
          </>
        )}

        {/* FILTER + SORT */}
        <div ref={results} className={`flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-gray-200 mb-8 mt-10`}>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(t.cats) as ('all' | CatKey)[]).map(k => (
              <button key={k} onClick={() => change(() => { setCat(k); setPage(1); })}
                className={`px-4 py-1.5 rounded-md text-xs font-bold border transition-all duration-300 active:scale-95 ${cat === k ? 'bg-[#1c1a6b] text-white border-[#1c1a6b] shadow-lg scale-105' : 'bg-white text-gray-700 border-gray-300 hover:border-[#1c1a6b] hover:text-[#1c1a6b] hover:-translate-y-0.5'}`}>{t.cats[k]}</button>))}
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600 flex-shrink-0">{t.sort}
            <span className="relative">
              <select value={sort} onChange={e => change(() => setSort(e.target.value as typeof sort))} className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer hover:border-[#1c1a6b] transition-colors">
                <option value="newest">{t.newest}</option><option value="oldest">{t.oldest}</option><option value="az">{t.az}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </span>
          </label>
        </div>

        {/* GRID */}
        {busy ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-md overflow-hidden animate-pulse"><div className="h-44 bg-gray-200" /><div className="p-5 space-y-3"><div className="h-3 w-1/3 bg-gray-200 rounded" /><div className="h-4 bg-gray-200 rounded" /><div className="h-4 w-3/4 bg-gray-200 rounded" /><div className="h-3 bg-gray-100 rounded" /></div></div>))}</div>
        ) : slice.length === 0 && !featured ? (
          <div className="bt-pop text-center py-20">
            <SearchX className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="font-extrabold text-xl text-[#1c1a6b]">{t.none}</h3><p className="text-gray-500 text-sm mb-5">{t.noneD}</p>
            <button onClick={() => change(() => { setQuery(''); setCat('all'); setPage(1); })} className="px-5 py-2.5 bg-[#1c1a6b] text-white rounded-full text-sm font-bold hover:bg-indigo-800 active:scale-95 transition-all">{t.reset}</button>
          </div>
        ) : (
          <div key={`${cat}-${sort}-${cur}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{slice.map((n, i) => Card({ n, i }))}</div>
        )}

        {/* PAGINASI */}
        {list.length > 0 && (
          <>
            <div className="mt-10 border border-gray-200 rounded-md px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>{t.showing} <b className="text-gray-900">{(cur - 1) * PAGE + 1} - {(cur - 1) * PAGE + slice.length}</b> {t.of} <b className="text-gray-900">{list.length}</b> {t.pubs}</p>
              <div className="flex items-center gap-1.5">
                <button disabled={cur === 1} onClick={() => change(() => setPage(cur - 1))} aria-label="Prev" className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#1c1a6b] active:scale-90 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                {pageNums().map((p, i) => p === '…' ? <span key={i} className="px-1">…</span> :
                  <button key={p} onClick={() => change(() => setPage(p))} className={`w-8 h-8 rounded text-xs font-bold border transition-all active:scale-90 ${p === cur ? 'bg-[#1c1a6b] text-white border-[#1c1a6b] scale-110' : 'border-gray-200 hover:border-[#1c1a6b] hover:text-[#1c1a6b]'}`}>{p}</button>)}
                <button disabled={cur === pages} onClick={() => change(() => setPage(cur + 1))} aria-label="Next" className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#1c1a6b] active:scale-90 transition-all"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <a href="#" className="font-bold text-[#1c1a6b] inline-flex items-center gap-1.5 hover:underline"><FolderOpen className="w-4 h-4" />{t.archive}</a>
            </div>
          </>
        )}

        {/* BULETIN */}
        <>
          <section className="mt-10 border border-gray-200 rounded-md px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <p className="text-[11px] font-extrabold tracking-wider text-[#1c1a6b] inline-flex items-center gap-2 mb-3"><Mail className="w-4 h-4" />{t.nlTag}</p>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0f172a] leading-snug mb-3">{t.nlH}</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{t.nlD}</p>
              {nl === 'ok' ? (
                <div className="bt-pop flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 font-semibold text-sm">
                  <span className="bt-check w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0"><Check className="w-5 h-5" /></span>{t.nlOk}
                </div>
              ) : (
                <form onSubmit={subscribe} noValidate>
                  <div key={nl === 'err' ? 'e' : 'n'} className={`flex flex-col sm:flex-row gap-2 ${nl === 'err' ? 'bt-shake' : ''}`}>
                    <input type="email" value={email} onChange={e => { setEmail(e.target.value); if (nl === 'err') setNl('idle'); }} placeholder={t.nlPh} className={`flex-1 px-4 py-3 text-sm border rounded-md focus:outline-none focus:ring-4 transition-all ${nl === 'err' ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-indigo-100 focus:border-[#1c1a6b]'}`} />
                    <button type="submit" disabled={nl === 'loading'} className="inline-flex items-center justify-center gap-2 bg-[#1c1a6b] hover:bg-indigo-800 text-white font-bold text-sm px-6 py-3 rounded-md active:scale-95 hover:shadow-lg disabled:opacity-80 transition-all">
                      {nl === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}{t.nlBtn}</button>
                  </div>
                  {nl === 'err' && <p className="bt-up text-xs text-red-500 mt-2">{t.nlErr}</p>}
                  <p className="text-[11px] text-gray-400 mt-2">{t.nlNote}</p>
                </form>
              )}
            </div>
          </section>
        </>
      </main>

      <Footer />

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {scrollY > 600 && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Top" className="bt-pop w-11 h-11 rounded-full bg-white text-[#1c1a6b] shadow-xl border border-gray-100 flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}

        <div className={`transform origin-bottom-right transition-all duration-[400ms] ease-out ${isCsOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-[#1e293b]">{t.help}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-1"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { href: 'tel:02155790871', i: <Phone className="w-4 h-4" />, a: 'Call Center', b: '(021) 5579 0871', c: 'hover:bg-blue-50', d: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600' },
                { href: 'https://wa.me/628114119000', i: <MessageSquare className="w-4 h-4" />, a: 'WhatsApp', b: '0811 411 9000', c: 'hover:bg-green-50', d: 'bg-green-100 text-green-600 group-hover:bg-green-500' },
                { href: 'https://www.lapor.go.id/', i: <Globe className="w-4 h-4" />, a: 'LAPOR', b: t.report, c: 'hover:bg-orange-50', d: 'bg-orange-100 text-orange-600 group-hover:bg-orange-500' },
              ].map(x => (
                <a key={x.a} href={x.href} target={x.href.includes('lapor') ? '_blank' : undefined} rel="noopener noreferrer" className={`flex items-center space-x-4 p-3 rounded-2xl ${x.c} text-gray-700 transition-all hover:translate-x-1 group`}>
                  <div className={`w-10 h-10 ${x.d} rounded-full flex items-center justify-center group-hover:text-white transition-colors`}>{x.i}</div>
                  <div><p className="font-extrabold text-xs text-gray-900">{x.a}</p><p className="text-xs text-gray-500 font-medium">{x.b}</p></div>
                </a>))}
            </div>
          </div>
        </div>

        <div className={`transform origin-bottom-right transition-all duration-[400ms] ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"><Bot className="w-6 h-6" /></div>
                <div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse" />Online</p></div></div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-300 hover:text-white bg-white/10 rounded-full p-1.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-3 bg-gray-50 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`bt-pop flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm font-medium leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{m.text}</div>
                </div>))}
              {typing && <div className="bt-pop flex"><div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">{[0, 1, 2].map(d => <span key={d} className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: `btDot 1s ${d * 0.15}s infinite` }} />)}</div></div>}
              <div ref={chatEnd} />
            </div>
            <form onSubmit={send} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder={t.ask} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium" />
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