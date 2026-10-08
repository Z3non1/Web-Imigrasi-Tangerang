import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LanguageContext } from '../App';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ChevronLeft, ChevronRight, Calendar, Clock, Tag, Share2, Link2, Printer, Download, Check, Loader2,
  FileText, Quote, ShieldCheck, Megaphone, UserCheck, FolderOpen, Baby, Zap, Search, Smartphone,
  MessageCircle, Send, TrendingUp, ArrowUp, Newspaper, Headphones, AlertCircle, Camera, Hash
} from 'lucide-react';

/* ============ DATA ============
   Hanya berita id 1 yang punya isi lengkap (siaran pers Paspor Simpatik).
   Berita lain memakai kerangka yang sama dengan ringkasan dari halaman Berita. */
type Art = { id: number; cat: string; title: string; date: string; read: number; unit: string; img: string; desc: string; no?: string; full?: boolean };
const IMG = (id: string, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}`;
const ARTS: Art[] = [
  { id: 1, full: true, cat: 'Siaran Pers Resmi', no: 'SP/042/HUMAS/KANIM.TNG/V/2025', date: '2025-05-18T09:30:00', read: 4, img: IMG('photo-1577962917302-cd874c4e31d2'), unit: 'Subseksi Informasi dan Komunikasi Keimigrasian (Humas)',
    title: 'Kantor Imigrasi Tangerang Tambah 200 Kuota Layanan Paspor Simpatik Akhir Pekan Sambut Libur Sekolah',
    desc: 'Merespons tingginya animo masyarakat Kota dan Kabupaten Tangerang dalam pengurusan dokumen perjalanan jelang libur semester dan kenaikan kelas sekolah tahun ajaran 2025.' },
  { id: 2, cat: 'Pengumuman Operasional', date: '2025-05-15T09:00:00', read: 2, img: IMG('photo-1544027993-37dbfe43562a'), unit: 'Divisi Dokumen Perjalanan', title: 'Pemberitahuan Ketersediaan Blangko Paspor Elektronik Lembar Polikarbonat', desc: 'Kanim Tangerang mengumumkan pasokan blangko paspor elektronik lembar polikarbonat dalam status aman dan siap mengakomodasi kuota harian.' },
  { id: 3, cat: 'Pengawasan & Intelijen', date: '2025-05-12T09:00:00', read: 4, img: IMG('photo-1521791136064-7986c2920216'), unit: 'Seksi Wasdakim', title: 'Operasi Gabungan Jagratara: Kanim Tangerang Periksa Kepatuhan Izin Tinggal', desc: 'Seksi Pengawasan dan Penindakan Keimigrasian melaksanakan operasi serentak guna memastikan kepatuhan pemanfaatan visa dan izin tinggal pekerja asing.' },
  { id: 4, cat: 'Layanan Publik', date: '2025-05-08T09:00:00', read: 3, img: IMG('photo-1573164713988-8665fc963095'), unit: 'Unit Layanan Paspor', title: 'Optimalisasi Layanan Ramah HAM di ULP Mall Tangcity: Jalur Khusus Lansia dan Disabilitas', desc: 'Penerapan standar pelayanan berbasis HAM dengan fasilitas jalur pemandu disabilitas, kursi roda gratis, serta ruang laktasi.' },
  { id: 5, cat: 'Zona Integritas', date: '2025-05-04T09:00:00', read: 3, img: IMG('photo-1556761175-5973dc0f32e7'), unit: 'Tim Reformasi Birokrasi', title: 'Komitmen Bersama Pembangunan Zona Integritas Menuju WBBM 2025 Melalui Penandatanganan Pakta Integritas', desc: 'Seluruh jajaran pegawai Kanim Tangerang menandatangani pakta integritas dan komitmen keterbukaan informasi publik.' },
  { id: 6, cat: 'Layanan Publik', date: '2025-04-29T09:00:00', read: 2, img: IMG('photo-1450101499163-c8848c66ca85'), unit: 'Layanan Kolektif', title: 'Layanan Eazy Passport Sambangi Universitas Multimedia Nusantara, Permudah Pembuatan Paspor Mahasiswa', desc: 'Program jemput bola paspor kolektif melayani permohonan paspor baru dan penggantian bagi mahasiswa, dosen, serta staf pengajar.' },
  { id: 7, cat: 'Siaran Pers', date: '2025-04-22T09:00:00', read: 4, img: IMG('photo-1521737711867-e3b97375f902'), unit: 'Sekretariat TIMPORA', title: 'Imigrasi Tangerang dan Pemda Perkuat Sinergi Pengawasan Orang Asing', desc: 'Penguatan integrasi data pengawasan orang asing antar-lembaga guna mengantisipasi penyalahgunaan izin tinggal.' },
];
const VIEWS = ['5.2k', '4.8k', '3.9k'];
const TAGS = ['#PasporSimpatik', '#LayananPaspor', '#KanimTangerang', '#ZonaIntegritas', '#GovTechBanten', '#LiburanSekolah'];

const ID = {
  loc: 'id-ID', back: 'Kembali', by: 'RILIS OLEH', pub: 'WAKTU PUBLIKASI', est: 'ESTIMASI', min: 'Menit Baca', size: 'Ukuran Teks:', normal: 'Normal', print: 'Cetak / PDF',
  share: 'Bagikan:', copied: 'Tersalin!', imgBadge: 'Dokumentasi Resmi Keimigrasian', cap: 'Petugas loket Kantor Imigrasi Tangerang melayani pemohon paspor keluarga dan anak dalam gelaran Paspor Simpatik akhir pekan. (Dok. Humas Kanim Tangerang)',
  topics: 'Topik & Kata Kunci Resmi:', verify: 'Verifikasi Informasi Resmi', prev: 'Siaran Pers Sebelumnya', next: 'Siaran Pers Selanjutnya',
  docT: 'Dokumen Resmi PDF', docD: 'Unduh berkas siaran pers resmi terotorisasi dengan stempel digital dan tanda tangan elektronik tersertifikasi BSrE.', docMeta: 'PDF • 1.4 MB • Stempel Digital BSrE', dl: 'Unduh Berkas Siaran Pers', dling: 'Menyiapkan berkas...', dled: 'Berkas siap diunduh', nofile: 'Tautan berkas belum tersedia.',
  quick: 'Layanan Cepat', q1: 'Cek Status Permohonan Paspor', q1d: 'Lacak status penerbitan paspor via nomor permohonan.', q2: 'Aplikasi M-Paspor RI', q2d: 'Reservasi jadwal loket dan verifikasi data mandiri.',
  related: 'Berita Terkait', all: 'Lihat Semua', help: 'Bantuan & Hotline Humas', helpD: 'Memerlukan informasi lebih lanjut atau menemukan kendala layanan? Hubungi saluran resmi kami:', wa: 'WhatsApp App Halo Imigrasi Tangerang', lapor: 'Portal Nasional SP4N LAPOR!', laporD: 'Pengaduan Publik Terintegrasi RI',
  hot: 'BANYAK DIBACA MINGGU INI', hotT: 'Informasi Terpopuler Keimigrasian Tangerang', archive: 'Arsip Seluruh Berita', read: 'Baca Selengkapnya', reads: 'Dibaca',
  generic: 'Informasi selengkapnya dapat diperoleh melalui kanal resmi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang, baik secara langsung di loket layanan maupun melalui saluran bantuan Humas.',
  verifyD: 'Pernyataan resmi ini diterbitkan oleh Subseksi Informasi dan Komunikasi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang. Rekan media dan institusi publik diizinkan mengutip sebagian atau seluruh isi siaran pers ini dengan mencantumkan sumber resmi kanal komunikasi Kanim Tangerang.',
};
const EN = { ...ID, loc: 'en-US', back: 'Back', by: 'RELEASED BY', pub: 'PUBLISHED', est: 'ESTIMATED', min: 'Min Read', size: 'Text Size:', normal: 'Normal', print: 'Print / PDF', share: 'Share:', copied: 'Copied!', imgBadge: 'Official Immigration Documentation', topics: 'Official Topics & Keywords:', verify: 'Official Information Verification', prev: 'Previous Press Release', next: 'Next Press Release', docT: 'Official PDF Document', dl: 'Download Press Release', dling: 'Preparing file...', dled: 'File ready to download', nofile: 'File link is not available yet.', quick: 'Quick Services', q1: 'Check Passport Application Status', q1d: 'Track passport issuance using your application number.', q2: 'M-Paspor RI App', q2d: 'Book counter schedules and verify your data yourself.', related: 'Related News', all: 'View All', help: 'Help & PR Hotline', helpD: 'Need more information or facing a service issue? Contact our official channels:', hot: 'MOST READ THIS WEEK', hotT: 'Most Popular Tangerang Immigration Information', archive: 'All News Archive', read: 'Read More', reads: 'Reads' };
const ZH = { ...EN, loc: 'zh-CN', back: '返回', by: '发布单位', pub: '发布时间', est: '预计', min: '分钟阅读', size: '字号：', normal: '默认', print: '打印 / PDF', share: '分享：', copied: '已复制！', related: '相关新闻', all: '查看全部', quick: '快速服务', help: '帮助与热线', archive: '全部新闻档案', read: '阅读更多', dl: '下载新闻稿' };
const TT = { ID, EN, ZH };

export default function DetailBerita() {
  const { id } = useParams();
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = TT[L];
  const a = ARTS.find(x => String(x.id) === id) || ARTS[0];
  const idx = ARTS.indexOf(a);
  const others = ARTS.filter(x => x.id !== a.id);
  const prev = ARTS[(idx - 1 + ARTS.length) % ARTS.length];
  const next = ARTS[(idx + 1) % ARTS.length];

  const [size, setSize] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);
  const [dl, setDl] = useState<'idle' | 'loading' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [noFile, setNoFile] = useState(false);
  const bodyRef = useRef<HTMLElement>(null);
  const DOC_URL = ''; // isi dengan tautan PDF siaran pers

  useEffect(() => { window.scrollTo(0, 0); setDl('idle'); setNoFile(false); }, [id]);
  useEffect(() => {
    const on = () => {
      const el = bodyRef.current; if (!el) return;
      const r = el.getBoundingClientRect(); const total = r.height - window.innerHeight * 0.5;
      setProgress(Math.min(100, Math.max(0, (-r.top + 120) / total * 100)));
      setShowTop(window.scrollY > 700);
    };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [id, size]);

  const fmtDate = (d: string, long = false) => new Date(d).toLocaleDateString(t.loc, long ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } : { day: '2-digit', month: 'short', year: 'numeric' });
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const flash = (k: string) => { setCopied(k); setTimeout(() => setCopied(null), 1600); };
  const copy = (txt: string, k: string) => { navigator.clipboard?.writeText(txt).then(() => flash(k)).catch(() => flash(k)); };
  const nativeShare = () => { if (navigator.share) navigator.share({ title: a.title, url }).catch(() => {}); else window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); };
  const download = () => {
    if (dl !== 'idle') return;
    setDl('loading');
    setTimeout(() => { setDl('done'); if (DOC_URL) window.open(DOC_URL, '_blank'); else setNoFile(true); setTimeout(() => setDl('idle'), 2200); }, 1000);
  };

  const shareBtn = 'w-8 h-8 rounded-full flex items-center justify-center text-white hover:-translate-y-0.5 hover:shadow-lg active:scale-90 transition-all';
  const card = 'bg-white border border-gray-200 rounded-md';
  const h2 = 'text-xl font-extrabold text-[#0f172a] flex items-center gap-3 mt-10 mb-4 before:content-[""] before:w-1.5 before:h-6 before:bg-[#1c1a6b] before:rounded-sm';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
      <style>{`
        @keyframes dbUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes dbPop{from{opacity:0;transform:scale(.9) translateY(6px)}to{opacity:1;transform:none}}
        @keyframes dbCheck{from{transform:scale(0) rotate(-30deg)}to{transform:scale(1) rotate(0)}}
        .db-up{animation:dbUp .5s ease-out both}.db-pop{animation:dbPop .25s ease-out both}.db-check{animation:dbCheck .4s cubic-bezier(.3,1.6,.5,1) both}
        @media print{nav,header,footer,aside,.no-print{display:none!important}}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60] no-print"><div className="h-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>

      <div className="no-print"><Navbar /></div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10">
        <Link to="/berita" className="no-print inline-flex items-center text-[#1c1a6b] font-semibold bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:bg-indigo-50 hover:-translate-x-1 active:scale-95 transition-all mb-6"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* ===== ARTIKEL ===== */}
          <div key={a.id} className={`${card} p-5 md:p-8 db-up`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1c1a6b] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full"><Megaphone className="w-3.5 h-3.5" />{a.cat}</span>
              {a.no && <button onClick={() => copy(a.no!, 'no')} title="Copy" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-full hover:bg-indigo-50 hover:text-[#1c1a6b] transition-colors">
                {copied === 'no' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Hash className="w-3.5 h-3.5" />}No: {a.no}</button>}
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#0f172a] leading-tight mb-6">{a.title}</h1>

            <div className="border border-gray-200 rounded-md p-4 grid sm:grid-cols-[1.3fr_1fr_.8fr] gap-4 mb-4">
              <div className="flex items-start gap-3"><UserCheck className="w-5 h-5 text-[#1c1a6b] mt-1" /><div><p className="text-[10px] font-bold text-gray-400 tracking-wide">{t.by}</p><p className="text-sm font-semibold text-gray-900">{a.unit}</p></div></div>
              <div className="flex items-start gap-3"><Calendar className="w-5 h-5 text-[#1c1a6b] mt-1" /><div><p className="text-[10px] font-bold text-gray-400 tracking-wide">{t.pub}</p><p className="text-sm font-semibold text-gray-900">{fmtDate(a.date, true)} | {new Date(a.date).toTimeString().slice(0, 5)} WIB</p></div></div>
              <div className="flex items-start gap-3"><Clock className="w-5 h-5 text-[#1c1a6b] mt-1" /><div><p className="text-[10px] font-bold text-gray-400 tracking-wide">{t.est}</p><p className="text-sm font-semibold text-gray-900">{a.read} {t.min}</p></div></div>
            </div>

            {/* toolbar */}
            <div className="no-print flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-gray-500 pb-4 mb-5 border-b border-gray-100">
              <div className="flex items-center gap-2">{t.size}
                {[['A-', 0], [t.normal, 1], ['A+', 2]].map(([lb, v]) => (
                  <button key={String(lb)} onClick={() => setSize(v as number)} className={`px-2.5 py-1 rounded border font-bold transition-all active:scale-90 ${size === v ? 'bg-[#1c1a6b] text-white border-[#1c1a6b]' : 'bg-white border-gray-300 hover:border-[#1c1a6b]'}`}>{lb}</button>))}
              </div>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-gray-300 font-bold hover:border-[#1c1a6b] hover:text-[#1c1a6b] active:scale-95 transition-all"><Printer className="w-3.5 h-3.5" />{t.print}</button>
              <div className="flex items-center gap-2 sm:ml-auto relative">{t.share}
                <a href={`https://wa.me/?text=${encodeURIComponent(a.title + ' ' + url)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={`${shareBtn} bg-emerald-500`}><MessageCircle className="w-4 h-4" /></a>
                <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(a.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className={`${shareBtn} bg-sky-500`}><Send className="w-4 h-4" /></a>
                <button onClick={nativeShare} aria-label="Share" className={`${shareBtn} bg-blue-600`}><Share2 className="w-4 h-4" /></button>
                <button onClick={() => copy(url, 'link')} aria-label="Copy link" className={`${shareBtn} ${copied === 'link' ? 'bg-emerald-500' : 'bg-gray-400'}`}>{copied === 'link' ? <Check className="w-4 h-4 db-check" /> : <Link2 className="w-4 h-4" />}</button>
                {copied === 'link' && <span className="db-pop absolute -top-8 right-0 bg-gray-900 text-white text-[11px] font-bold px-2.5 py-1 rounded">{t.copied}</span>}
              </div>
            </div>

            {/* gambar */}
            <figure className="mb-6">
              <div className="relative rounded-md overflow-hidden group">
                <img src={a.img} alt={a.title} className="w-full h-[260px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" />{t.imgBadge}</span>
              </div>
              <figcaption className="text-[11px] text-gray-500 mt-2 flex items-start gap-1.5"><Camera className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />{t.cap}</figcaption>
            </figure>

            {/* isi */}
            <article ref={bodyRef} className="text-gray-700 leading-relaxed transition-[font-size] duration-300" style={{ fontSize: `${[0.9, 1, 1.15][size]}rem` }}>
              {a.full ? (
                <>
                  <p className="font-bold text-gray-900 mb-5"><span className="text-[#1c1a6b]">TANGERANG</span> — {a.desc} Kantor Imigrasi Kelas I Khusus Non TPI Tangerang menyelenggarakan program pelayanan paspor akhir pekan bertajuk <span className="text-[#1c1a6b]">"Paspor Simpatik"</span>, dengan tambahan alokasi 200 kuota khusus pada Sabtu dan Minggu.</p>
                  <p className="mb-6">Inisiatif ini dirancang guna memfasilitasi para orang tua dan pelajar yang terkendala waktu jika harus mengurus dokumen paspor baru maupun penggantian paspor habis masa berlaku pada hari kerja reguler. Bertempat di Gedung Layanan Terpadu Kantor Imigrasi Tangerang, Jl. Taman Makam Pahlawan Taruna, kuota tambahan ini langsung dibuka dan dapat diakses publik dengan tertib serta transparan.</p>

                  <blockquote className="relative border-l-4 border-[#1c1a6b] bg-white pl-5 pr-4 py-5 my-8 hover:bg-indigo-50/40 transition-colors">
                    <Quote className="absolute top-3 right-3 w-8 h-8 text-gray-200" />
                    <p className="font-bold italic text-[#1e1b4b] mb-4">"Layanan Paspor Simpatik ini merupakan bentuk dedikasi kami dalam menghadirkan pelayanan publik yang inklusif dan solutif bagi warga yang kesulitan mengurus paspor pada hari kerja. Kami memastikan seluruh proses berjalan transparan, humanis, tanpa calo, dan bebas pungli."</p>
                    <footer className="text-xs"><p className="font-bold text-gray-900">— Kepala Kantor Imigrasi Kelas I Khusus Non TPI Tangerang</p><p className="text-gray-500">Kementerian Imigrasi dan Pemasyarakatan Republik Indonesia</p></footer>
                  </blockquote>

                  <h2 className={h2}>Mekanisme Pendaftaran dan Ketentuan Berkas</h2>
                  <p className="mb-4">Guna menjaga kelancaran antrean dan ketertiban administrasi, pihak Kantor Imigrasi memberlakukan alur pra-verifikasi dokumen secara cermat. Masyarakat diimbau memperhatikan poin-poin persyaratan operasional berikut:</p>
                  <div className="border border-gray-200 bg-gray-50/60 rounded-md p-4 space-y-2 mb-2">
                    {[
                      [<UserCheck className="w-4 h-4" />, 'Pendaftaran Terpadu:', 'Pemohon wajib melakukan pendaftaran nomor antrean resmi terlebih dahulu melalui aplikasi resmi M-Paspor atau antrean khusus walk-in bagi lansia di atas 60 tahun, balita, penyandang disabilitas, dan ibu hamil tanpa booking daring.'],
                      [<FolderOpen className="w-4 h-4" />, 'Kelengkapan Dokumen Asli dan Salinan:', 'Membawa e-KTP elektronik berdomisili Tangerang Raya, Kartu Keluarga (KK), Akta Kelahiran/Buku Nikah/Ijazah asli beserta fotokopi ukuran kertas A4 tanpa dipotong.'],
                      [<Baby className="w-4 h-4" />, 'Persyaratan Tambahan Pemohon Anak:', 'Wajib didampingi kedua orang tua dengan melampirkan e-KTP kedua orang tua, buku nikah orang tua, dan paspor lama bila melakukan perpanjangan.'],
                    ].map(([ic, ti, de], i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-md hover:bg-white hover:shadow-sm transition-all">
                        <span className="text-[#1c1a6b] mt-0.5">{ic}</span>
                        <div><p className="font-bold text-gray-900 text-sm">{ti as string}</p><p className="text-xs text-gray-500 leading-relaxed">{de as string}</p></div>
                      </div>))}
                  </div>

                  <h2 className={h2}>Transparansi Biaya PNBP Melalui MPN G2</h2>
                  <p className="mb-5">Kantor Imigrasi Kelas I Khusus Non TPI Tangerang kembali menegaskan bahwa seluruh transaksi Penerimaan Negara Bukan Pajak (PNBP) biaya paspor disetorkan 100% langsung ke Kas Negara secara non-tunai melalui kode <i>billing</i> Modul Penerimaan Negara Generasi Kedua (MPN G2).</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    {[['TARIF RESMI PASPOR BIASA 48 HAL', 'Rp 350.000', 'Masa berlaku 10 tahun (Sesuai PP No. 28 Tahun 2019)'], ['TARIF RESMI PASPOR ELEKTRONIK (E-PASPOR)', 'Rp 650.000', 'Masa berlaku 10 tahun dengan chip keamanan biometrik']].map(([k, v, d]) => (
                      <div key={k} className="border border-gray-200 rounded-md p-4 hover:border-[#1c1a6b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                        <p className="text-[10px] font-bold text-gray-500 tracking-wide">{k}</p><p className="text-2xl font-extrabold text-[#1c1a6b] my-1">{v}</p><p className="text-xs text-gray-500">{d}</p>
                      </div>))}
                  </div>
                  <p className="mb-6">Petugas keimigrasian di loket tidak menerima pembayaran tunai dalam bentuk apa pun. Pemohon dapat melakukan pelunasan kode bayar melalui teller bank pemerintah, mesin ATM, <i>mobile banking</i>, marketplace terdaftar, maupun gerai pos resmi.</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-gray-900 mb-5"><span className="text-[#1c1a6b]">TANGERANG</span> — {a.desc}</p>
                  <p className="mb-6">{t.generic}</p>
                </>
              )}
            </article>

            <div className="border-t border-gray-200 pt-5">
              <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3"><Tag className="w-3.5 h-3.5" />{t.topics}</p>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => <Link key={tag} to="/berita" className="text-[11px] font-bold text-[#1c1a6b] bg-indigo-50 border border-indigo-100 px-3 py-1 rounded hover:bg-[#1c1a6b] hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all">{tag}</Link>)}
              </div>
            </div>

            <div className="border-l-4 border-[#1c1a6b] bg-indigo-50/40 p-5 my-8 flex gap-4 rounded-r-md">
              <ShieldCheck className="w-6 h-6 text-[#1c1a6b] flex-shrink-0" />
              <div><p className="font-extrabold text-[#0f172a] mb-1">{t.verify}</p><p className="text-xs text-gray-600 leading-relaxed">{t.verifyD}</p></div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 no-print">
              <Link to={`/berita/${prev.id}`} className="group border border-gray-200 rounded-md p-4 hover:border-[#1c1a6b] hover:-translate-x-1 hover:shadow-md transition-all">
                <p className="text-[11px] text-gray-500 flex items-center gap-1 mb-1"><ChevronLeft className="w-3.5 h-3.5" />{t.prev}</p>
                <p className="font-extrabold text-sm text-[#0f172a] line-clamp-2 group-hover:text-[#1c1a6b]">{prev.title}</p>
              </Link>
              <Link to={`/berita/${next.id}`} className="group border border-gray-200 rounded-md p-4 text-right hover:border-[#1c1a6b] hover:translate-x-1 hover:shadow-md transition-all">
                <p className="text-[11px] text-gray-500 flex items-center justify-end gap-1 mb-1">{t.next}<ChevronRight className="w-3.5 h-3.5" /></p>
                <p className="font-extrabold text-sm text-[#0f172a] line-clamp-2 group-hover:text-[#1c1a6b]">{next.title}</p>
              </Link>
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <aside className="no-print space-y-5 lg:sticky lg:top-24 db-up" style={{ animationDelay: '120ms' }}>
            <div className={`${card} border-t-4 border-t-[#1c1a6b] p-5`}>
              <h3 className="font-extrabold text-[#0f172a] flex items-center gap-2 mb-2"><FileText className="w-4 h-4" />{t.docT}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.docD}</p>
              <div className="border border-gray-200 rounded-md p-3 flex items-center gap-3 mb-3 hover:bg-indigo-50/50 transition-colors">
                <FileText className="w-7 h-7 text-[#1c1a6b]" /><div><p className="text-sm font-bold text-gray-900">SP-042-Pasor-Simpatik.pdf</p><p className="text-[10px] text-gray-400">{t.docMeta}</p></div>
              </div>
              <button onClick={download} className={`w-full py-2.5 rounded-md text-sm font-bold text-white inline-flex items-center justify-center gap-2 active:scale-95 hover:shadow-lg transition-all ${dl === 'done' ? 'bg-emerald-600' : 'bg-[#1c1a6b] hover:bg-indigo-800'}`}>
                {dl === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : dl === 'done' ? <Check className="w-4 h-4 db-check" /> : <Download className="w-4 h-4" />}
                {dl === 'loading' ? t.dling : dl === 'done' ? t.dled : t.dl}
              </button>
              {noFile && <p className="db-pop text-[11px] text-amber-600 mt-2 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{t.nofile}</p>}
            </div>

            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between mb-3"><h3 className="font-extrabold text-[#0f172a] flex items-center gap-2"><Zap className="w-4 h-4" />{t.quick}</h3><span className="text-[11px] font-bold text-[#1c1a6b]">Online 24/7</span></div>
              {[[<Search className="w-4 h-4" />, t.q1, t.q1d, 'https://www.imigrasi.go.id'], [<Smartphone className="w-4 h-4" />, t.q2, t.q2d, 'https://mpaspor.imigrasi.go.id']].map(([ic, ti, de, href], i) => (
                <a key={i} href={href as string} target="_blank" rel="noopener noreferrer" className="group flex gap-3 p-3 mb-2 last:mb-0 bg-slate-50 border border-gray-200 rounded-md hover:border-[#1c1a6b] hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <span className="w-8 h-8 rounded bg-white border border-gray-200 text-[#1c1a6b] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c1a6b] group-hover:text-white transition-colors">{ic}</span>
                  <div><p className="text-sm font-bold text-gray-900">{ti as string}</p><p className="text-xs text-gray-500 leading-snug">{de as string}</p></div>
                </a>))}
            </div>

            <div className={`${card} p-5`}>
              <div className="flex items-center justify-between mb-3"><h3 className="font-extrabold text-[#0f172a] flex items-center gap-2"><Newspaper className="w-4 h-4" />{t.related}</h3><Link to="/berita" className="text-[11px] font-bold text-[#1c1a6b] hover:underline">{t.all}</Link></div>
              <div className="divide-y divide-gray-100">
                {others.slice(0, 3).map(r => (
                  <Link key={r.id} to={`/berita/${r.id}`} className="group flex gap-3 py-3 first:pt-0 last:pb-0">
                    <img src={IMG(r.img.split('.com/')[1].split('?')[0], 200)} alt="" className="w-14 h-14 rounded object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                    <div className="min-w-0"><p className="text-[10px] text-gray-400 mb-0.5">{fmtDate(r.date)}</p><p className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#1c1a6b] transition-colors">{r.title}</p></div>
                  </Link>))}
              </div>
            </div>

            <div className={`${card} p-5`}>
              <h3 className="font-extrabold text-[#0f172a] flex items-center gap-2 mb-2"><Headphones className="w-4 h-4" />{t.help}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{t.helpD}</p>
              <a href="https://wa.me/628111000888" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 mb-2 border border-gray-200 rounded-md hover:border-emerald-400 hover:bg-emerald-50/50 hover:-translate-y-0.5 transition-all">
                <span className="w-8 h-8 rounded bg-indigo-50 text-[#1c1a6b] flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors"><MessageCircle className="w-4 h-4" /></span>
                <div><p className="text-xs font-bold text-gray-900">{t.wa}</p><p className="text-[11px] text-gray-500">0811-1000-888 (Jam Kerja)</p></div>
              </a>
              <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:border-red-300 hover:bg-red-50/50 hover:-translate-y-0.5 transition-all">
                <span className="w-8 h-8 rounded bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors"><AlertCircle className="w-4 h-4" /></span>
                <div><p className="text-xs font-bold text-gray-900">{t.lapor}</p><p className="text-[11px] text-gray-500">{t.laporD}</p></div>
              </a>
            </div>
          </aside>
        </div>

        {/* ===== TERPOPULER ===== */}
        <section className="no-print mt-14">
          <p className="text-[11px] font-extrabold tracking-wider text-[#1c1a6b] flex items-center gap-1.5 mb-1"><TrendingUp className="w-3.5 h-3.5" />{t.hot}</p>
          <div className="flex items-end justify-between mb-5"><h2 className="text-xl md:text-2xl font-extrabold text-[#0f172a]">{t.hotT}</h2><Link to="/berita" className="text-xs font-bold text-[#1c1a6b] hover:underline inline-flex items-center">{t.archive}<ChevronRight className="w-4 h-4" /></Link></div>
          <div className="grid md:grid-cols-3 gap-6">
            {others.slice(3, 6).map((r, i) => (
              <Link key={r.id} to={`/berita/${r.id}`} className="group bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className="relative h-44 overflow-hidden"><img src={IMG(r.img.split('.com/')[1].split('?')[0], 700)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-2 left-2 bg-white/95 text-[#1c1a6b] text-[11px] font-bold px-2.5 py-1 rounded">{r.cat}</span></div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[11px] text-gray-500 mb-2">{fmtDate(r.date)} • {VIEWS[i]} {t.reads}</p>
                  <h3 className="font-extrabold text-[#0f172a] leading-snug mb-2 line-clamp-3 group-hover:text-[#1c1a6b] transition-colors">{r.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{r.desc}</p>
                  <span className="mt-auto flex items-center justify-between text-xs font-bold text-[#1c1a6b]">{t.read}<ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" /></span>
                </div>
              </Link>))}
          </div>
        </section>
      </main>

      <Footer />

      {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Top" className="no-print db-pop fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#1c1a6b] text-white shadow-xl flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}
    </div>
  );
}