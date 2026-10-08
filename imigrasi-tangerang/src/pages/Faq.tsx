import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import {
  Search, Phone, Globe, ChevronLeft, ChevronDown, X, Bot, MessageSquare, Send, ArrowUp, Info,
  SlidersHorizontal, BookOpen, Plane, Building2, Banknote, Accessibility, Megaphone, CheckCircle2,
  ClipboardCheck, ShieldCheck, ThumbsUp, ThumbsDown, ChevronsUpDown, SearchX, ExternalLink
} from 'lucide-react';

type Cat = 'paspor' | 'visa' | 'izin' | 'biaya' | 'prioritas' | 'lain';
type Faq = { id: number; cat: Cat; tag: string; q: string; kw: string[] };

/* Isi jawaban memakai bahasa Indonesia. Pastikan ketentuan resmi (denda, biaya, dst.)
   dicek ulang dengan unit terkait sebelum dipublikasikan. */
const FAQS: Faq[] = [
  { id: 1, cat: 'paspor', tag: 'PASPOR RI • PERMOHONAN BARU', q: 'Apa saja syarat berkas pengajuan paspor baru Republik Indonesia?', kw: ['syarat', 'berkas', 'baru', 'dokumen'] },
  { id: 2, cat: 'paspor', tag: 'DURASI PELAYANAN • ESTIMASI SELESAI', q: 'Berapa lama proses pembuatan paspor sejak sesi foto dan wawancara?', kw: ['lama', 'durasi', 'proses', 'hari', 'cepat'] },
  { id: 3, cat: 'paspor', tag: 'ANTREAN DARING • M-PASPOR', q: 'Bagaimana cara membuat janji temu atau antrean paspor online?', kw: ['antrean', 'janji', 'm-paspor', 'online', 'daftar'] },
  { id: 4, cat: 'paspor', tag: 'PASPOR RI • PEMOHON ANAK (< 17 TAHUN)', q: 'Apakah anak di bawah umur wajib melampirkan dokumen orang tua saat pembuatan paspor?', kw: ['anak', 'orang tua', 'bawah umur'] },
  { id: 5, cat: 'visa', tag: 'WARGA NEGARA ASING • VISA ON ARRIVAL', q: 'Bagaimana prosedur perpanjangan Visa on Arrival (VoA / e-VoA) di Kantor Imigrasi Tangerang?', kw: ['voa', 'visa', 'perpanjang', 'arrival'] },
  { id: 6, cat: 'izin', tag: 'IZIN TINGGAL • ITAS VS ITAP', q: 'Apa perbedaan mendasar antara Izin Tinggal Terbatas (ITAS/KITAS) dan Izin Tinggal Tetap (ITAP/KITAP)?', kw: ['itas', 'itap', 'kitas', 'kitap', 'izin tinggal'] },
  { id: 7, cat: 'biaya', tag: 'PEMBAYARAN PNBP • KAS NEGARA', q: 'Bagaimana mekanisme pembayaran biaya PNBP keimigrasian (SIMPONI)?', kw: ['bayar', 'pnbp', 'simponi', 'biaya', 'billing'] },
  { id: 8, cat: 'lain', tag: 'BAP & DENDA • KASUS KHUSUS', q: 'Bagaimana jika paspor lama saya hilang atau rusak saat ingin melakukan penggantian?', kw: ['hilang', 'rusak', 'bap', 'denda', 'ganti'] },
  { id: 9, cat: 'prioritas', tag: 'INKLUSI • LAYANAN PRIORITAS RAMAH HAM', q: 'Apakah pemohon lansia, disabilitas, atau ibu hamil perlu mendaftar antrean M-Paspor?', kw: ['lansia', 'disabilitas', 'hamil', 'prioritas'] },
  { id: 10, cat: 'lain', tag: 'TRANSPARANSI & AKUNTABILITAS • SP4N LAPOR!', q: 'Bagaimana cara menyampaikan aspirasi atau melaporkan pengaduan pelayanan tidak memuaskan / dugaan pungli?', kw: ['pengaduan', 'lapor', 'pungli', 'aduan', 'aspirasi'] },
];

const P = 'text-sm text-gray-700 leading-relaxed';
const BODY: Record<number, React.ReactNode> = {
  1: (<>
    <p className={`${P} mb-4`}>Berdasarkan Peraturan Menteri Hukum dan HAM RI No. 18 Tahun 2022, pemohon paspor baru untuk Warga Negara Indonesia (WNI) domisili Tangerang dan sekitarnya wajib menyiapkan dokumen asli dan fotokopi ukuran A4 (tidak boleh dipotong):</p>
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="border border-gray-200 rounded-md p-4">
        <p className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3"><ClipboardCheck className="w-4 h-4 text-[#1c1a6b]" />Dokumen Wajib Pokok:</p>
        {['KTP Elektronik (e-KTP) yang masih berlaku atau Surat Keterangan Pengganti e-KTP Disdukcapil.', 'Kartu Keluarga (KK) terbaru dengan barcode resmi Kemendagri.', 'Akta Kelahiran, ATAU Buku Nikah, ATAU Ijazah (pilih salah satu yang memuat nama, tempat/tanggal lahir, serta nama orang tua).'].map(x => (
          <p key={x} className="flex gap-2 text-sm font-semibold text-gray-800 mb-2 last:mb-0"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />{x}</p>))}
      </div>
      <div className="border border-gray-200 rounded-md p-4">
        <p className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-orange-600" />Dokumen Pendukung / Khusus:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 marker:text-gray-400">
          <li>Surat Penetapan Pengadilan Negeri bagi pemohon yang pernah melakukan perubahan nama.</li>
          <li>Surat Rekomendasi Instansi / Kementerian Agama (khusus tujuan ibadah Umroh/Haji mandiri) jika disyaratkan.</li>
          <li>Surat rekomendasi Disnaker bagi Calon Pekerja Migran Indonesia (CPMI).</li>
        </ul>
      </div>
    </div>
    <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-md p-3 text-xs font-bold text-blue-800 leading-relaxed"><Info className="w-4 h-4 flex-shrink-0 mt-0.5" />Ketentuan Alur: Seluruh pendaftaran wajib diawali dengan pengambilan antrean melalui aplikasi M-Paspor di Google Play Store atau Apple App Store sebelum datang ke Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.</div>
  </>),
  2: (<>
    <p className={`${P} mb-4`}>Jangka waktu penyelesaian paspor dihitung setelah pemohon melakukan pembayaran kode billing SIMPONI dan dinyatakan berstatus lunas oleh kas negara:</p>
    <div className="grid md:grid-cols-3 gap-4">
      {[['Paspor Elektronik / Biasa', 'Reguler', 'text-blue-600 bg-blue-50 border-blue-200', '3 – 4 Hari Kerja', 'Dihitung sejak verifikasi biometrik dan pelunasan PNBP. Tidak termasuk hari Sabtu, Minggu, dan Hari Libur Nasional.', false],
        ['Layanan Percepatan', 'Same Day', 'text-amber-700 bg-amber-50 border-amber-300', 'Selesai Hari Itu Juga', 'Biaya resmi PNBP percepatan Rp 1.000.000 (di luar biaya buku paspor). Batas kedatangan foto sebelum pukul 10.30 WIB.', true],
        ['Pengambilan Paspor', 'Loket / Drive-Thru', 'text-emerald-700 bg-emerald-50 border-emerald-200', 'H+4 Setelah Bayar', 'Dapat diambil langsung oleh pemohon, keluarga dalam 1 KK, atau dikuasakan dengan surat kuasa bermeterai Rp 10.000.', false]].map(([ti, bd, bc, big, de, hl]) => (
        <div key={ti as string} className={`border rounded-md p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${hl ? 'border-[#1c1a6b] bg-indigo-50/40' : 'border-gray-200 bg-white'}`}>
          <div className="flex items-center justify-between mb-2"><p className="text-xs font-bold text-gray-900">{ti as string}</p><span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${bc}`}>{bd as string}</span></div>
          <p className={`text-xl font-extrabold mb-2 ${hl ? 'text-[#1c1a6b]' : 'text-[#0f172a]'}`}>{big as string}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{de as string}</p>
        </div>))}
    </div>
  </>),
  3: (<>
    <p className={`${P} mb-4`}>Pendaftaran antrean dilakukan melalui aplikasi resmi M-Paspor. Langkah singkatnya:</p>
    <ol className="space-y-3">
      {['Unduh aplikasi M-Paspor di Google Play Store atau Apple App Store.', 'Daftar akun dengan data diri yang sesuai e-KTP, lalu verifikasi.', 'Pilih jenis layanan, Kantor Imigrasi Tangerang, dan jadwal kedatangan yang tersedia.', 'Simpan bukti antrean dan datang tepat waktu dengan dokumen asli.'].map((x, i) => (
        <li key={i} className="flex gap-3 items-start"><span className="w-6 h-6 rounded-full bg-[#1c1a6b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span><span className={P}>{x}</span></li>))}
    </ol>
    <a href="https://mpaspor.imigrasi.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-[#1c1a6b] hover:underline">Buka M-Paspor <ExternalLink className="w-3.5 h-3.5" /></a>
  </>),
  4: (<p className={P}>Ya. Pemohon anak wajib didampingi kedua orang tua dengan melampirkan e-KTP kedua orang tua, buku nikah orang tua, dan paspor lama bila melakukan perpanjangan, di samping dokumen pokok anak.</p>),
  5: (<p className={P}>Perpanjangan VoA dapat dilakukan maksimal 7 hari sebelum masa berlaku habis di kantor imigrasi. Pastikan paspor masih berlaku dan membawa dokumen pendukung yang diminta petugas.</p>),
  6: (<div className="grid sm:grid-cols-2 gap-4">
    {[['ITAS / KITAS', 'Izin Tinggal Terbatas', 'Diberikan untuk jangka waktu terbatas (1-2 tahun).'], ['ITAP / KITAP', 'Izin Tinggal Tetap', 'Diberikan untuk jangka waktu lebih panjang (5 tahun) dan bersifat tetap.']].map(([k, s, d]) => (
      <div key={k} className="border border-gray-200 rounded-md p-4 hover:border-[#1c1a6b] hover:-translate-y-1 hover:shadow-md transition-all"><p className="font-extrabold text-[#1c1a6b]">{k}</p><p className="text-xs font-bold text-gray-500 mb-2">{s}</p><p className={P}>{d}</p></div>))}
  </div>),
  7: (<><p className={`${P} mb-3`}>Seluruh PNBP biaya paspor disetorkan 100% langsung ke Kas Negara secara non-tunai melalui kode billing SIMPONI. Petugas loket tidak menerima pembayaran tunai dalam bentuk apa pun.</p>
    <p className={P}>Pelunasan kode bayar dapat dilakukan melalui teller bank pemerintah, mesin ATM, mobile banking, marketplace terdaftar, maupun gerai pos resmi.</p></>),
  8: (<p className={P}>Pemohon perlu melaporkan kehilangan atau kerusakan dan menjalani pemeriksaan untuk pembuatan Berita Acara Pemeriksaan (BAP) di kantor imigrasi sebelum permohonan penggantian diproses. Persyaratan lengkap dan ketentuan denda mengikuti peraturan yang berlaku, silakan konfirmasi ke petugas atau Call Center sebelum datang.</p>),
  9: (<p className={P}>Tidak wajib. Tersedia antrean khusus walk-in bagi lansia di atas 60 tahun, balita, penyandang disabilitas, dan ibu hamil tanpa booking daring. Petugas akan mengarahkan Anda ke jalur prioritas ramah HAM di unit layanan paspor.</p>),
  10: (<><p className={`${P} mb-3`}>Anda dapat menyampaikan aspirasi atau pengaduan melalui kanal resmi, termasuk dugaan pungli, tanpa dipungut biaya:</p>
    <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 marker:text-gray-400 mb-3">
      <li>Portal nasional SP4N LAPOR! di lapor.go.id.</li><li>Surel resmi kanim_tangerang@imigrasi.go.id.</li><li>Call Center dan WhatsApp Humas pada bagian Bantuan.</li></ul>
    <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c1a6b] hover:underline">Buka LAPOR! <ExternalLink className="w-3.5 h-3.5" /></a></>),
};

const CATS: { k: 'all' | Cat; icon: React.ReactNode }[] = [
  { k: 'all', icon: null }, { k: 'paspor', icon: <BookOpen className="w-3.5 h-3.5" /> }, { k: 'visa', icon: <Plane className="w-3.5 h-3.5" /> },
  { k: 'izin', icon: <Building2 className="w-3.5 h-3.5" /> }, { k: 'biaya', icon: <Banknote className="w-3.5 h-3.5" /> },
  { k: 'prioritas', icon: <Accessibility className="w-3.5 h-3.5" /> }, { k: 'lain', icon: <Megaphone className="w-3.5 h-3.5" /> },
];
const TXT = {
  ID: { title: 'FAQ', back: 'Kembali', header: 'Klasifikasi Informasi Resmi', ph: 'Cari pertanyaan...', showing: 'Menampilkan', of: 'dari', qs: 'pertanyaan resmi', expand: 'Buka semua', collapse: 'Tutup semua', none: 'Pertanyaan tidak ditemukan', noneD: 'Coba kata kunci atau kategori lain.', reset: 'Reset filter', helpful: 'Apakah jawaban ini membantu?', thanks: 'Terima kasih atas masukan Anda!', cats: { all: 'Semua Pertanyaan', paspor: 'Paspor RI & M-Paspor', visa: 'Visa & Kedatangan', izin: 'Izin Tinggal WNA (ITAS/ITAP)', biaya: 'Biaya & Pembayaran SIMPONI', prioritas: 'Jalur Prioritas & Inklusi', lain: 'Pengaduan & Lain-lain' }, help: 'Layanan Bantuan', ask: 'Tanya sesuatu...', hello: 'Halo! Saya IVARA. Tanyakan seputar FAQ, saya akan membukakan jawabannya.', found: 'Mungkin ini yang Anda cari, sudah saya buka:', nf: 'Belum ada FAQ yang cocok. Coba kata kunci lain atau hubungi Call Center.', report: 'Sampaikan pengaduan' },
  EN: { title: 'FAQ', back: 'Back', header: 'Official Information Classification', ph: 'Search questions...', showing: 'Showing', of: 'of', qs: 'official questions', expand: 'Expand all', collapse: 'Collapse all', none: 'No question found', noneD: 'Try another keyword or category.', reset: 'Reset filters', helpful: 'Was this answer helpful?', thanks: 'Thank you for your feedback!', cats: { all: 'All Questions', paspor: 'Passport & M-Paspor', visa: 'Visa & Arrival', izin: 'Stay Permits (ITAS/ITAP)', biaya: 'Fees & SIMPONI Payment', prioritas: 'Priority & Inclusive Lane', lain: 'Complaints & Others' }, help: 'Help Center', ask: 'Ask something...', hello: 'Hello! I am IVARA. Ask about the FAQ and I will open the answer.', found: 'This may be what you need, I opened it:', nf: 'No matching FAQ yet. Try another keyword or call our Call Center.', report: 'Submit a complaint' },
  ZH: { title: '常见问题 (FAQ)', back: '返回', header: '官方信息分类', ph: '搜索问题...', showing: '显示', of: '共', qs: '个官方问题', expand: '全部展开', collapse: '全部收起', none: '未找到问题', noneD: '请尝试其他关键词或类别。', reset: '重置筛选', helpful: '此回答有帮助吗？', thanks: '感谢您的反馈！', cats: { all: '所有问题', paspor: '印尼护照 & M-Paspor', visa: '签证与入境', izin: '居留许可 (ITAS/ITAP)', biaya: '费用与 SIMPONI 支付', prioritas: '优先与无障碍通道', lain: '投诉及其他' }, help: '帮助中心', ask: '请输入问题...', hello: '您好！我是 IVARA，请询问常见问题，我会为您打开答案。', found: '您可能需要这个，已为您打开：', nf: '暂无匹配的常见问题，请换个关键词或联系呼叫中心。', report: '提交投诉' },
};

function Mark({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<mark className="bg-yellow-200 rounded px-0.5">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export default function FaqPage() {
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = TXT[L];

  const [cat, setCat] = useState<'all' | Cat>('all');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number[]>([1, 2]);
  const [fb, setFb] = useState<Record<number, 'up' | 'down'>>({});
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: t.hello }]);
  const [inputMessage, setInputMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  const goTo = (id: number) => setTimeout(() => {
    const el = document.getElementById(`faq-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  }, 120);

  useEffect(() => {
    window.scrollTo(0, 0);
    const m = window.location.hash.match(/^#faq-(\d+)/);
    if (m) { const id = Number(m[1]); setOpen([id]); goTo(id); }
    const on = () => {
      setScrollY(window.scrollY);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const q = query.trim().toLowerCase();
  const list = FAQS.filter(f => (cat === 'all' || f.cat === cat) && (!q || f.q.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q)));
  const count = (k: 'all' | Cat) => k === 'all' ? FAQS.length : FAQS.filter(f => f.cat === k).length;
  const allOpen = list.length > 0 && list.every(f => open.includes(f.id));
  const toggle = (id: number) => setOpen(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const reply = (m: string) => {
    const s = m.toLowerCase();
    const hit = FAQS.find(f => f.kw.some(k => s.includes(k)));
    if (!hit) return t.nf;
    setCat('all'); setQuery(''); setOpen(p => p.includes(hit.id) ? p : [...p, hit.id]); goTo(hit.id);
    return `${t.found} "${hit.q}"`;
  };
  const send = (e: React.FormEvent) => {
    e.preventDefault(); const m = inputMessage.trim(); if (!m) return;
    setMessages(p => [...p, { sender: 'user', text: m }]); setInputMessage(''); setTyping(true);
    setTimeout(() => { setTyping(false); setMessages(p => [...p, { sender: 'ivara', text: reply(m) }]); }, 900);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-x-hidden">
      <style>{`
        @keyframes fqTitle{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes fqUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        @keyframes fqPop{from{opacity:0;transform:scale(.94) translateY(8px)}to{opacity:1;transform:none}}
        @keyframes fqDot{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        .fq-title{animation:fqTitle .4s ease-out both}.fq-up{animation:fqUp .4s ease-out both}.fq-pop{animation:fqPop .3s ease-out both}
        .animate-fade-in{animation:fqPop .3s ease-out both}
        .hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{scrollbar-width:none}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60]"><div className="h-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <Navbar />

      {/* HERO */}
      <div className="relative h-[300px] overflow-hidden bg-[#1c1a6b]">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" alt="" className="absolute inset-0 w-full h-[130%] object-cover" style={{ transform: `translateY(${Math.min(scrollY, 400) * 0.3}px) scale(1.05)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a6b]/65 to-[#1c1a6b]/85" />
        <Link to="/" className="absolute top-24 left-6 z-20 inline-flex items-center text-white font-semibold bg-white/10 border border-white/25 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/25 hover:text-yellow-300 hover:-translate-x-1 active:scale-95 transition-all"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
        <div className="absolute inset-0 flex items-end pb-10 px-6 lg:px-12"><h1 className="fq-title text-4xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">{t.title}</h1></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 pt-8 pb-16">
        {/* header + pencarian */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-gray-200 mb-5">
          <h2 className="flex items-center gap-2.5 font-bold text-lg text-[#0f172a]"><SlidersHorizontal className="w-5 h-5" />{t.header}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative group">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#1c1a6b] transition-colors" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.ph} className="w-full sm:w-64 pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-[#1c1a6b] transition-all" />
              {query && <button onClick={() => setQuery('')} aria-label="Clear" className="fq-pop absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
            </div>
            <p className="text-sm text-gray-500">{t.showing} <b key={list.length} className="fq-pop inline-block text-gray-900">{list.length}</b> {t.of} {FAQS.length} {t.qs}</p>
          </div>
        </div>

        {/* kategori */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-3 mb-5">
          {CATS.map(c => {
            const on = cat === c.k;
            return (
              <button key={c.k} onClick={() => setCat(c.k)} className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-md border text-xs font-bold transition-all duration-300 active:scale-95 ${on ? 'bg-[#1c1a6b] text-white border-[#1c1a6b] shadow-lg scale-105' : 'bg-white text-gray-700 border-gray-300 hover:border-[#1c1a6b] hover:text-[#1c1a6b] hover:-translate-y-0.5'}`}>
                {c.icon}{t.cats[c.k]}
                <span className={`min-w-[22px] text-center text-[11px] px-1.5 py-0.5 rounded-full ${on ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>{count(c.k)}</span>
              </button>);
          })}
        </div>

        <div className="flex justify-end mb-3">
          <button disabled={!list.length} onClick={() => setOpen(allOpen ? open.filter(id => !list.some(f => f.id === id)) : Array.from(new Set([...open, ...list.map(f => f.id)])))} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c1a6b] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#1c1a6b] disabled:opacity-40 active:scale-95 transition-all"><ChevronsUpDown className="w-3.5 h-3.5" />{allOpen ? t.collapse : t.expand}</button>
        </div>

        {/* DAFTAR FAQ */}
        {list.length === 0 ? (
          <div className="fq-pop text-center py-16">
            <SearchX className="w-14 h-14 text-gray-300 mx-auto mb-4" />
            <h3 className="font-extrabold text-xl text-[#1c1a6b]">{t.none}</h3><p className="text-gray-500 text-sm mb-5">{t.noneD}</p>
            <button onClick={() => { setQuery(''); setCat('all'); }} className="px-5 py-2.5 bg-[#1c1a6b] text-white rounded-full text-sm font-bold hover:bg-indigo-800 active:scale-95 transition-all">{t.reset}</button>
          </div>
        ) : (
          <div key={`${cat}`} className="space-y-4">
            {list.map((f, i) => {
              const isOpen = open.includes(f.id);
              return (
                <div key={f.id} id={`faq-${f.id}`} className={`fq-up bg-white border rounded-md overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#1c1a6b]/40 shadow-lg' : 'border-gray-200 hover:border-[#1c1a6b]/50 hover:shadow-md'}`} style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
                  <button onClick={() => toggle(f.id)} aria-expanded={isOpen} className="w-full text-left px-5 md:px-6 py-4 flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                    <span className={`w-8 h-8 rounded border text-xs font-extrabold flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-[#1c1a6b] text-white border-[#1c1a6b]' : 'bg-indigo-50 text-[#1c1a6b] border-indigo-100 group-hover:bg-indigo-100'}`}>{String(f.id).padStart(2, '0')}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[11px] font-bold text-gray-500 tracking-wide mb-0.5"><Mark text={f.tag} q={q} /></span>
                      <span className="block font-extrabold text-base md:text-lg text-[#0f172a] leading-snug group-hover:text-[#1c1a6b] transition-colors"><Mark text={f.q} q={q} /></span>
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#1c1a6b] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-100'}`}><ChevronDown className="w-4 h-4" /></span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pt-5 pb-6 border-t border-gray-100">
                        {BODY[f.id]}
                        <div className="mt-5 pt-4 border-t border-dashed border-gray-200 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          {fb[f.id] ? <span key={fb[f.id]} className="fq-pop font-semibold text-emerald-600">{t.thanks}</span> : (<>
                            {t.helpful}
                            <button onClick={() => setFb(p => ({ ...p, [f.id]: 'up' }))} aria-label="Yes" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 active:scale-75 transition-all"><ThumbsUp className="w-4 h-4" /></button>
                            <button onClick={() => setFb(p => ({ ...p, [f.id]: 'down' }))} aria-label="No" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 hover:text-red-500 active:scale-75 transition-all"><ThumbsDown className="w-4 h-4" /></button>
                          </>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>);
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {scrollY > 600 && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Top" className="fq-pop w-11 h-11 rounded-full bg-white text-[#1c1a6b] shadow-xl border border-gray-100 flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}

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
                <div key={i} className={`fq-pop flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm font-medium leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{m.text}</div>
                </div>))}
              {typing && <div className="fq-pop flex"><div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">{[0, 1, 2].map(d => <span key={d} className="w-2 h-2 bg-gray-400 rounded-full" style={{ animation: `fqDot 1s ${d * 0.15}s infinite` }} />)}</div></div>}
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