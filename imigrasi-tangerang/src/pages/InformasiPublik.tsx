import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Search, Phone, Globe, ChevronLeft, ChevronDown, FileText, X, Bot, MessageSquare,
  Send, ArrowUp, Loader2, ExternalLink, FileX, ChevronsUpDown
} from 'lucide-react';

/* ============ DATA ============
   Judul dokumen dibiarkan sesuai nama resmi (Indonesia). Tambahkan `url` di
   tiap file jika sudah ada tautan PDF-nya, contoh: { n: '...', url: '/files/x.pdf' } */
type F = { n: string; url?: string };
const SECTIONS: { id: string; t: [string, string, string]; files: F[] }[] = [
  { id: 'dipa', t: ['Daftar Isian Pelaksanaan Anggaran', 'Budget Implementation List', '预算执行清单'], files: [
    { n: 'LKJIP KANIMSUS TANGERANG 2025' }, { n: 'Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP) Tahun 2024 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang' }] },
  { id: 'lkjip', t: ['Laporan Akuntabilitas Kinerja Instansi Pemerintah', 'Government Agency Performance Accountability Report', '政府机构绩效问责报告'], files: [
    { n: 'LKJIP KANIMSUS TANGERANG 2025' }, { n: 'Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP) Tahun 2024 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang' }] },
  { id: 'perjanjian', t: ['Perjanjian Kerja', 'Work Agreement', '工作协议'], files: [
    { n: 'PERJANJIAN KERJA STRUKTURAL TANGERANG TAHUN 2026' }, { n: 'Perjanjian Kinerja Tahun 2025 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang' }] },
  { id: 'rka', t: ['Rencana Kerja Anggaran Satuan Kerja', 'Work Unit Budget Plan', '工作单位预算计划'], files: [
    { n: 'RENSTRA KANIM TANGERANG 2025-2029' }, { n: 'PK KAKANIM' }, { n: 'RENSTRA KANIMSUS TANGERANG 2025' },
    { n: 'RENCANA KERJA DAN PROGRAM KERJA TAHUN 2024' }, { n: 'RENSTRA KANIM TANGERANG 2020 - 2025' }] },
  { id: 'lra', t: ['Laporan Realisasi Anggaran', 'Budget Realization Report', '预算实现报告'], files: [] },
  { id: 'lkt', t: ['Laporan Keuangan Tahunan', 'Annual Financial Report', '年度财务报告'], files: [] },
  { id: 'sop', t: ['Standar Operasional Prosedur', 'Standard Operating Procedures', '标准操作程序'], files: [
    { n: 'STANDAR OPERASIONAL PROSEDUR APLIKASI STAR CHANNEL' }, { n: 'SK TIM PENGELOLA PENGADUAN 2025' }, { n: 'SK KOMPENSASI LAYANAN KANIMSUS TANGERANG' }] },
  { id: 'ipk', t: ['Survey IPK - IPM', 'IPK - IPM Survey', 'IPK - IPM 调查'], files: [
    { n: 'HASIL SURVEY KEPUASAN MASYARAKAT PERIODE APRIL 2026' }] },
];

const TXT = {
  ID: { title: 'Informasi Publik', back: 'Kembali', search: 'CARI FILE', attach: 'Attach File', empty: 'No Attached File', view: 'View Attachment', files: 'file', found: 'file ditemukan', none: 'File tidak ditemukan', noneD: 'Coba kata kunci lain.', reset: 'Hapus pencarian', expand: 'Buka semua', collapse: 'Tutup semua', open: 'Buka File', soon: 'Tautan file belum tersedia.', sec: 'Kategori', help: 'Layanan Bantuan', ask: 'Tanya sesuatu...', hello: 'Halo! Saya IVARA. Ada yang bisa dibantu?', report: 'Sampaikan pengaduan' },
  EN: { title: 'Public Information', back: 'Back', search: 'SEARCH FILE', attach: 'Attach File', empty: 'No Attached File', view: 'View Attachment', files: 'files', found: 'files found', none: 'No file found', noneD: 'Try another keyword.', reset: 'Clear search', expand: 'Expand all', collapse: 'Collapse all', open: 'Open File', soon: 'File link is not available yet.', sec: 'Category', help: 'Help Center', ask: 'Ask something...', hello: 'Hello! I am IVARA. How can I help you?', report: 'Submit a complaint' },
  ZH: { title: '公共信息', back: '返回', search: '搜索文件', attach: '附件文件', empty: '无附件', view: '查看附件', files: '个文件', found: '个文件', none: '未找到文件', noneD: '请尝试其他关键词。', reset: '清除搜索', expand: '全部展开', collapse: '全部收起', open: '打开文件', soon: '文件链接暂未提供。', sec: '类别', help: '帮助中心', ask: '请输入问题...', hello: '您好！我是 IVARA，请问需要什么帮助？', report: '提交投诉' },
};

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`ip-reveal ${seen ? 'ip-in' : ''}`}>{children}</div>;
}

function Mark({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-yellow-200 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export default function InformasiPublik() {
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = TXT[L];
  const ti = L === 'ID' ? 0 : L === 'EN' ? 1 : 2;

  const [query, setQuery] = useState('');
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const [modal, setModal] = useState<{ file: F; sec: typeof SECTIONS[number] } | null>(null);

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
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc);
  }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const q = query.trim();
  const shown = useMemo(() => SECTIONS.map(s => ({ ...s, files: q ? s.files.filter(f => f.n.toLowerCase().includes(q.toLowerCase())) : s.files }))
    .filter(s => !q || s.files.length), [q]);
  const total = shown.reduce((a, s) => a + s.files.length, 0);
  const allClosed = shown.every(s => closed[s.id]);

  const openFile = (file: F, sec: typeof SECTIONS[number], key: string) => {
    setLoading(key);
    setTimeout(() => { setLoading(null); setModal({ file, sec }); }, 700);
  };

  const reply = (m: string) => {
    const s = m.toLowerCase();
    if (/lkjip|akuntabilitas|kinerja/.test(s)) return L === 'ID' ? 'Dokumen LKjIP ada di bagian "Laporan Akuntabilitas Kinerja Instansi Pemerintah". Klik View Attachment untuk membukanya.' : 'LKjIP documents are under "Government Agency Performance Accountability Report". Click View Attachment to open.';
    if (/renstra|rencana/.test(s)) return L === 'ID' ? 'RENSTRA tersedia di bagian "Rencana Kerja Anggaran Satuan Kerja".' : 'RENSTRA is available under "Work Unit Budget Plan".';
    if (/sop|prosedur/.test(s)) return L === 'ID' ? 'SOP, termasuk aplikasi Star Channel, ada di bagian "Standar Operasional Prosedur".' : 'SOPs, including the Star Channel app, are under "Standard Operating Procedures".';
    return L === 'ID' ? 'Coba ketik nama dokumen di kolom CARI FILE, atau hubungi Call Center kami.' : 'Try typing the document name in the SEARCH FILE box, or contact our Call Center.';
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault(); const m = inputMessage.trim(); if (!m) return;
    setMessages(p => [...p, { sender: 'user', text: m }]); setInputMessage(''); setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { sender: 'ivara', text: reply(m) }]); }, 900);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
      <style>{`
        .ip-reveal{opacity:0;transform:translateY(26px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
        .ip-in{opacity:1;transform:none}
        @keyframes ipTitle{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes ipPop{from{opacity:0;transform:scale(.94) translateY(8px)}to{opacity:1;transform:none}}
        @keyframes ipSlide{from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:none}}
        @keyframes ipDot{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        @keyframes ipBand{from{background-position:0 0}to{background-position:200% 0}}
        .ip-title{animation:ipTitle .4s ease-out both}
        .ip-pop{animation:ipPop .3s cubic-bezier(.2,.7,.2,1) both}
        .ip-slide{animation:ipSlide .5s cubic-bezier(.2,.7,.2,1) both}
        .ip-band{background-image:linear-gradient(110deg,#1c1a6b 0%,#1c1a6b 40%,#2a2790 50%,#1c1a6b 60%,#1c1a6b 100%);background-size:200% 100%}
        .ip-band:hover{animation:ipBand 1.6s linear infinite}
        .animate-fade-in{animation:ipPop .3s ease-out both}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.ip-reveal{opacity:1;transform:none}}
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60]"><div className="h-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <Navbar />

      {/* HERO (parallax) */}
      <div className="relative h-[300px] overflow-hidden bg-[#1c1a6b]">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" alt="" className="absolute inset-0 w-full h-[130%] object-cover" style={{ transform: `translateY(${Math.min(scrollY, 400) * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a6b]/70 via-[#1c1a6b]/60 to-[#1c1a6b]/85" />
        <Link to="/" className="absolute top-24 left-6 z-20 inline-flex items-center text-white font-semibold bg-white/10 border border-white/25 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/25 hover:text-yellow-300 hover:-translate-x-1 active:scale-95 transition-all"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
        <div className="absolute inset-0 flex items-end pb-10 px-6 lg:px-12">
          <h1 className="ip-title text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">{t.title}</h1>
        </div>
      </div>

      <main className="w-full flex-1 pb-16">
        {/* SEARCH + KONTROL */}
        <div className="px-6 lg:px-12 py-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative group w-full sm:max-w-md">
            <Search className="w-4 h-4 text-white absolute left-4 top-1/2 -translate-y-1/2" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-[#1c1a6b] text-white placeholder-white/80 text-sm font-semibold tracking-wide focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:shadow-xl transition-all" />
            {query && <button onClick={() => setQuery('')} aria-label={t.reset} className="ip-pop absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex items-center gap-3 sm:ml-auto text-sm">
            {q && <span className="ip-pop text-indigo-700 font-bold">{total} {t.found}</span>}
            <button onClick={() => setClosed(Object.fromEntries(shown.map(s => [s.id, !allClosed])))} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-semibold hover:border-indigo-400 hover:text-indigo-700 active:scale-95 transition-all">
              <ChevronsUpDown className="w-4 h-4" />{allClosed ? t.expand : t.collapse}
            </button>
          </div>
        </div>

        {shown.length === 0 && (
          <div className="ip-pop text-center py-20 px-6">
            <FileX className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="font-extrabold text-xl text-[#1c1a6b]">{t.none}</h3>
            <p className="text-gray-500 text-sm mb-5">{t.noneD}</p>
            <button onClick={() => setQuery('')} className="px-5 py-2.5 bg-[#1c1a6b] text-white rounded-full text-sm font-bold hover:bg-indigo-800 active:scale-95 transition-all">{t.reset}</button>
          </div>)}

        {/* SECTIONS */}
        {shown.map(sec => {
          const open = !closed[sec.id];
          return (
            <Reveal key={sec.id}>
              <section className="mb-6">
                <button onClick={() => setClosed(p => ({ ...p, [sec.id]: open }))} aria-expanded={open}
                  className="ip-band w-full flex items-center justify-between px-6 lg:px-12 py-3.5 text-left text-white group">
                  <span className="text-2xl lg:text-3xl font-extrabold group-hover:translate-x-1 transition-transform"><Mark text={sec.t[ti]} q="" /></span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-white/15 rounded-full px-3 py-1">{sec.files.length} {t.files}</span>
                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="px-6 lg:px-12 pt-3 pb-4">
                      <p className="text-gray-500 mb-2">{t.attach}</p>
                      {sec.files.length === 0 ? (
                        <p className="py-3 font-semibold text-gray-900">{t.empty}</p>
                      ) : sec.files.map((f, i) => {
                        const key = `${sec.id}-${i}`; const busy = loading === key;
                        return (
                          <div key={key} className="ip-slide group/row flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 -mx-3 px-3 rounded-xl hover:bg-indigo-50/70 transition-colors" style={{ animationDelay: `${i * 70}ms` }}>
                            <span className="flex items-start gap-3 text-gray-900 text-sm sm:text-[15px] min-w-0">
                              <FileText className="w-4 h-4 mt-1 text-indigo-400 flex-shrink-0 group-hover/row:text-indigo-700 group-hover/row:scale-125 transition-all" />
                              <span className="group-hover/row:translate-x-1 transition-transform"><Mark text={f.n} q={q} /></span>
                            </span>
                            <button onClick={() => openFile(f, sec, key)} disabled={busy}
                              className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-2 bg-[#f9c846] hover:bg-[#fbbf24] text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-md shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-80 transition-all">
                              {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}{t.view}
                            </button>
                          </div>);
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>);
        })}
      </main>

      <Footer />

      {/* MODAL LAMPIRAN */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setModal(null)}>
          <div className="ip-pop bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="bg-[#1c1a6b] text-white p-5 flex items-start justify-between gap-4">
              <div><p className="text-xs text-indigo-200 mb-1">{t.sec}: {modal.sec.t[ti]}</p><h3 className="font-extrabold leading-snug">{modal.file.n}</h3></div>
              <button onClick={() => setModal(null)} aria-label="Close" className="bg-white/15 hover:bg-white/30 rounded-full p-1.5 flex-shrink-0 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><FileText className="w-8 h-8" /></div>
              {modal.file.url
                ? <a href={modal.file.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#f9c846] hover:bg-[#fbbf24] font-extrabold rounded-xl active:scale-95 transition-all">{t.open}<ExternalLink className="w-4 h-4" /></a>
                : <p className="text-sm text-gray-500">{t.soon}</p>}
            </div>
          </div>
        </div>)}

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {scrollY > 600 && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Top" className="ip-pop w-11 h-11 rounded-full bg-white text-[#1c1a6b] shadow-xl border border-gray-100 flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}

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
                <div key={i} className={`ip-pop flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm font-medium leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{m.text}</div>
                </div>))}
              {typing && <div className="ip-pop flex"><div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">{[0, 1, 2].map(d => <span key={d} className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: `ipDot 1s ${d * 0.15}s infinite` }} />)}</div></div>}
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