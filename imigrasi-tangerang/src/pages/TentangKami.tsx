import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import {
  ChevronLeft, ArrowUp, Shield, Landmark, Award, Star, Building2, Scale, MapPin, Scan, ExternalLink,
  FileCheck2, Gavel, TrendingUp, CheckCircle2, Users2, Network, ScrollText, Target, Quote, ShieldCheck,
  Briefcase, Cpu, Search as SearchIcon, FolderOpen, History, GitBranch, MousePointerClick
} from 'lucide-react';

/* ============ DATA ============
   Judul bagian tersedia ID/EN/ZH. Isi uraian memakai bahasa Indonesia.
   Mohon dicek ulang dengan dokumen resmi kantor (tahun, angka, uraian tugas). */
const H = {
  ID: { back: 'Kembali', title: 'Sejarah Kantor', sub: 'Pusat informasi berkala, rilis media, pengumuman operasional kuota antrean, dan transparansi kegiatan Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.', s1: 'Sejarah Kantor & Selayang Pandang', s3: 'Kedudukan, Tugas Pokok dan Fungsi', s4: 'Visi, Misi dan Tata Nilai', s5: 'Struktur Organisasi', nav: ['Sejarah', 'Wilayah', 'Tupoksi', 'Visi & Misi', 'Struktur'], hint: 'Klik unit untuk melihat uraian tugas', top: 'Ke atas' },
  EN: { back: 'Back', title: 'Office History', sub: 'Periodic information, media releases, queue quota announcements, and activity transparency of the Tangerang Special Class I Non-TPI Immigration Office.', s1: 'Office History & Overview', s3: 'Position, Main Duties and Functions', s4: 'Vision, Mission and Core Values', s5: 'Organizational Structure', nav: ['History', 'Region', 'Duties', 'Vision', 'Structure'], hint: 'Click a unit to see its duties', top: 'Back to top' },
  ZH: { back: '返回', title: '办公室历史', sub: '坦格朗特别一级非TPI移民局的定期信息、媒体发布、排队名额公告及活动透明度。', s1: '历史与概况', s3: '地位、主要职责与功能', s4: '愿景、使命与核心价值观', s5: '组织架构', nav: ['历史', '辖区', '职能', '愿景', '架构'], hint: '点击单位查看职责', top: '回到顶部' },
};
const SECS = ['sejarah', 'wilayah', 'tupoksi', 'visi', 'struktur'];

const TIMELINE = [
  ['98', '1998', 'Pembentukan Kantor Imigrasi Tangerang', 'Resmi dibentuk sebagai Satuan Kerja Tingkat II di bawah Departemen Kehakiman RI guna memfasilitasi kebutuhan administrasi penduduk dan pengurusan dokumen perjalanan warga Tangerang.'],
  ['06', '2006', 'Peningkatan Status Menjadi Kanim Kelas I', 'Dinaikkan status kelembagaannya menjadi Kantor Imigrasi Kelas I Tangerang, merespons pertumbuhan pesat sentra industri manufaktur, zona ekonomi, dan ekspansi pemukiman.'],
  ['17', '2017', 'Penetapan Satker Non TPI & Desentralisasi ULP', 'Penetapan klasifikasi sebagai Satker Non Tempat Pemeriksaan Imigrasi (Non TPI) dengan fokus pada pelayanan domestik dan pengawasan teritorial, disertai pembukaan Unit Layanan Paspor (ULP) modern.'],
  ['21', '2021', 'Predikat Wilayah Bebas dari Korupsi (WBK)', 'Menerima predikat Wilayah Bebas dari Korupsi (WBK) dari KemenPAN-RB atas terobosan birokrasi bersih, implementasi antrean M-Paspor terpadu, dan transparansi alur pelayanan publik.'],
  ['24', '2024', 'Peningkatan Status Kelembagaan: Kelas I Khusus Non TPI', 'Secara resmi ditingkatkan menjadi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang di bawah Kementerian Imigrasi dan Pemasyarakatan, menegaskan peran strategis kantor dalam tata kelola keimigrasian di Banten.'],
];
const WILAYAH = [
  { tag: 'KOTA', name: 'Kota Tangerang', kec: 13, luas: 184.24, desc: 'Melayani pusat administrasi pemerintahan kota, pemukiman padat penduduk, dan koridor industri manufaktur Tangerang.' },
  { tag: 'KOTA', name: 'Kota Tangerang Selatan', kec: 7, luas: 147.19, desc: 'Melayani sentra pendidikan (BSD, Bintaro, Alam Sutera), komunitas ekspatriat internasional, dan kawasan niaga modern.' },
  { tag: 'KABUPATEN', name: 'Kabupaten Tangerang', kec: 29, luas: 959.61, desc: 'Mencakup kawasan industri manufaktur berskala besar (Cikupa, Balaraja), pemukiman baru, serta jaringan logistik dan perdagangan.' },
];
const ULP = [
  { name: 'ULP MPP Kota Tangerang', place: 'Gedung Transit Soekarno-Hatta', desc: 'Memfasilitasi layanan paspor reguler dan percepatan satu hari bagi pemohon urban dan pekerja area bandara.', q: 'Mal Pelayanan Publik Kota Tangerang' },
  { name: 'Gerai MPP Kota Tangsel', place: 'Mall Pelayanan Publik Cilenggang', desc: 'Layanan satu atap kolaboratif dengan Pemerintah Kota Tangerang Selatan guna permohonan paspor baru dan penggantian paspor WNI.', q: 'Mall Pelayanan Publik Cilenggang Tangerang Selatan' },
  { name: 'Gerai Tangcity Mall', place: 'Lantai 2, Cikokol, Kota Tangerang', desc: 'Unit Layanan Paspor ramah keluarga yang beroperasi di pusat perbelanjaan guna memberikan kemudahan akses di akhir pekan dan hari libur.', q: 'Tangcity Mall Cikokol' },
];
const PILARS = [
  { n: '01', icon: <FileCheck2 className="w-5 h-5" />, t: 'Pelayanan Keimigrasian', d: 'Pemberian fasilitas dokumen perjalanan bagi warga negara Indonesia (Paspor Biasa & Elektronik) serta perizinan tinggal (ITK, ITAS, Visa Kunjungan) bagi warga negara asing secara tepat waktu, akurat, dan berorientasi pada kepuasan pemohon.', b: ['Penerbitan E-Passport & Polikarbonat', 'Pelayanan Izin Tinggal Terbatas', 'Layanan Ramah HAM & Prioritas'] },
  { n: '02', icon: <Gavel className="w-5 h-5" />, t: 'Penegakan Hukum & Keamanan', d: 'Pengawasan ketat terhadap perlintasan, keberadaan, dan aktivitas orang asing di wilayah yurisdiksi, disertai tindakan administratif keimigrasian (TAK) hingga proses pro-justitia.', b: ['Operasi Intelijen Keimigrasian Jagratara', 'Sekretariat Bersama Timpora Kota/Kab', 'Penegakan Deportasi & Pencegahan WNA'] },
  { n: '03', icon: <TrendingUp className="w-5 h-5" />, t: 'Fasilitator Pembangunan Ekonomi', d: 'Mendukung penuh iklim investasi nasional (PMA) dan kunjungan wisatawan mancanegara melalui skema perizinan tinggal, serta mobilitas talenta global yang mudah dan terukur.', b: ['Pendampingan Investor Asing (PMA)', 'Akselerasi Layanan Visa Tinggal Terbatas', 'Integrasi Kemudahan Izin Kerja TKA'] },
];
const MISI = [
  ['01', 'Pelayanan Berorientasi Kepuasan Masyarakat', 'Memberikan kepastian durasi waktu penerbitan dokumen, kepatuhan tarif resmi PNBP tanpa pungutan liar, serta fasilitas fisik ramah HAM.'],
  ['02', 'Sistem Pengawasan & Intelijen Terintegrasi', 'Memperkuat jaringan intelijen keimigrasian, optimalisasi koordinasi Timpora, serta pemanfaatan platform pelaporan digital untuk deteksi dini tindak kriminal transnasional.'],
  ['03', 'Pengembangan Kapasitas & Integritas SDM', 'Membina aparatur sipil keimigrasian yang adaptif, profesional, beretika tinggi, dan menguasai kompetensi teknologi untuk mewujudkan citra birokrasi berbudaya bersih.'],
  ['04', 'Tata Kelola Birokrasi Akuntabel', 'Memperkokoh penerapan Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP), manajemen mutu, dan konsistensi sikap zero tolerance terhadap segala bentuk gratifikasi.'],
];
const SASARAN = [['Akses Layanan Cepat & Mudah', <Scan className="w-4 h-4" />], ['Sistem Produktif & Berkelanjutan', <Network className="w-4 h-4" />], ['SDM Profesional & Berdaya Saing', <Users2 className="w-4 h-4" />], ['Pengelolaan Kinerja Adaptif', <Target className="w-4 h-4" />]] as [string, React.ReactNode][];
type Row = { id: string; t: string; tag: string; d: string };
const ROWS: Row[] = [
  { id: 'kepala', t: 'Kepala Kantor Imigrasi Kelas I Khusus Non TPI Tangerang', tag: 'Eselon II.b', d: 'Memimpin pelaksanaan tugas pokok dan fungsi keimigrasian di seluruh yurisdiksi Tangerang Raya serta menetapkan kebijakan manajerial kantor.' },
  { id: 'tu', t: 'Bagian / Subbagian Tata Usaha', tag: 'Fasilitatif', d: 'Melaksanakan urusan kepegawaian, keuangan, surat-menyurat dinas, protokol pimpinan, serta pengelolaan aset kantor.' },
  { id: 'lantaskim', t: 'Bidang / Seksi Dokumen Perjalanan (Lantaskim)', tag: 'Substantif WNI', d: 'Melakukan penerimaan berkas, identifikasi biometrik, verifikasi berkas, pencetakan, dan penyerahan Paspor RI bagi Warga Negara Indonesia.' },
  { id: 'intaltuskim', t: 'Bidang / Seksi Izin Tinggal & Status Keimigrasian (Intaltuskim)', tag: 'Substantif WNA', d: 'Memberikan pertimbangan, penerimaan dokumen, serta penerbitan Izin Tinggal Kunjungan, Terbatas (ITAS), dan Tetap (ITAP) bagi warga negara asing.' },
  { id: 'inteldakim', t: 'Bidang / Seksi Intelijen & Penindakan Keimigrasian (Inteldakim)', tag: 'Penegakan Hukum', d: 'Menjalankan pengawasan orang asing, penindakan pelanggaran keimigrasian, penyidikan, administrasi deportasi, serta pengelolaan ruang detensi sementara.' },
  { id: 'tikim', t: 'Bidang / Seksi Teknologi Informasi & Komunikasi Keimigrasian (TIKIM)', tag: 'TI & Humas', d: 'Menyelenggarakan layanan infrastruktur IT, keterbukaan informasi publik (PPID), rilis media massa, serta pengelolaan pengaduan masyarakat.' },
];

/* ============ KOMPONEN KECIL (di luar halaman agar tidak dibuat ulang saat scroll) ============ */
function CountUp({ to, dec = 0 }: { to: number; dec?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const p = Math.min((t - t0) / 1200, 1); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{v.toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec })}</span>;
}
function Tag({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1c1a6b] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded mb-3">{icon}{children}</span>;
}
function OrgNode({ row, label, sub, icon, sel, onSel, dark = false }: { row: string; label: string; sub?: string; icon: React.ReactNode; sel: string | null; onSel: (id: string) => void; dark?: boolean }) {
  const on = sel === row;
  return (
    <button onClick={() => onSel(row)} aria-pressed={on} className={`group relative w-full text-center rounded-md border px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95 ${dark ? `bg-[#1c1a6b] text-white border-[#1c1a6b] ${on ? 'ring-4 ring-indigo-300 shadow-xl' : ''}` : `bg-white border-gray-300 ${on ? 'border-[#1c1a6b] ring-4 ring-indigo-100 shadow-xl' : 'hover:border-[#1c1a6b]'}`}`}>
      <span className={`mx-auto mb-1 flex w-7 h-7 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${dark ? 'bg-white/15' : 'bg-indigo-50 text-[#1c1a6b]'}`}>{icon}</span>
      <span className="block text-sm font-extrabold leading-tight">{label}</span>
      {sub && <span className={`block text-[11px] mt-0.5 leading-snug ${dark ? 'text-indigo-200' : 'text-gray-500'}`}>{sub}</span>}
    </button>
  );
}

export default function TentangKami() {
  const { lang } = useContext(LanguageContext);
  const L = (['ID', 'EN', 'ZH'].includes(lang) ? lang : 'ID') as 'ID' | 'EN' | 'ZH';
  const t = H[L];

  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(SECS[0]);
  const [tl, setTl] = useState(TIMELINE.length - 1);
  const [sel, setSel] = useState<string | null>('kepala');

  useEffect(() => {
    window.scrollTo(0, 0);
    const on = () => {
      setScrollY(window.scrollY);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
      let cur = SECS[0];
      for (const id of SECS) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 200) cur = id; }
      setActive(cur);
    };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id: string) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' }); };
  const selRow = ROWS.find(r => r.id === sel);
  const card = 'bg-white border border-gray-200 rounded-md';
  const secHead = (tag: React.ReactNode, title: string, side: string) => (
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 lg:items-end mb-8">
      <div>{tag}<h2 className="text-2xl md:text-4xl font-extrabold text-[#0f172a] leading-tight">{title}</h2></div>
      <p className="text-sm text-gray-600 leading-relaxed">{side}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes tkTitle{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes tkPop{from{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:none}}
        @keyframes tkFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes tkRing{0%{box-shadow:0 0 0 0 rgba(28,26,107,.35)}100%{box-shadow:0 0 0 14px rgba(28,26,107,0)}}
        .tk-title{animation:tkTitle .4s ease-out both}.tk-pop{animation:tkPop .3s ease-out both}
        .tk-float{animation:tkFloat 4s ease-in-out infinite}.tk-ring{animation:tkRing 1.6s ease-out infinite}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      <div className="fixed top-0 left-0 right-0 h-1 z-[60]"><div className="h-full bg-gradient-to-r from-yellow-400 to-indigo-500 transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      {/* navigator samping */}
      <div className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {SECS.map((id, i) => (
          <button key={id} onClick={() => go(id)} aria-label={t.nav[i]} className="group relative flex items-center justify-end">
            <span className="absolute right-6 whitespace-nowrap text-[11px] font-bold bg-[#1c1a6b] text-white px-2.5 py-1 rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">{t.nav[i]}</span>
            <span className={`block rounded-full border-2 transition-all duration-300 ${active === id ? 'w-3.5 h-3.5 bg-[#1c1a6b] border-[#1c1a6b]' : 'w-2.5 h-2.5 bg-white border-gray-400 group-hover:border-[#1c1a6b]'}`} />
          </button>))}
      </div>

      <Navbar />

      {/* HERO */}
      <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-400">
        <div className="absolute -top-16 left-1/3 w-80 h-80 rounded-full bg-white/20 blur-3xl" style={{ transform: `translateY(${Math.min(scrollY, 400) * 0.2}px)` }} />
        <Link to="/" className="absolute top-24 left-6 z-20 inline-flex items-center text-white font-semibold bg-white/15 border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 hover:-translate-x-1 active:scale-95 transition-all"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 lg:px-12 max-w-7xl mx-auto">
          <h1 className="tk-title text-4xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_8px_rgba(120,53,15,.45)]">{t.title}</h1>
          <p className="tk-title text-white/95 mt-2 max-w-2xl text-sm md:text-base drop-shadow" style={{ animationDelay: '80ms' }}>{t.sub}</p>
        </div>
        <div className="hidden md:flex absolute right-12 lg:right-24 top-24 items-center gap-4">
          <span className="tk-float w-28 h-28 rounded-full bg-[#0b162c] border-4 border-white shadow-2xl flex items-center justify-center text-yellow-400"><Shield className="w-12 h-12" /></span>
          <span className="tk-float w-28 h-28 rounded-full bg-[#1c1a6b] border-4 border-white shadow-2xl flex items-center justify-center text-yellow-300" style={{ animationDelay: '.6s' }}><Landmark className="w-12 h-12" /></span>
          <span className="absolute -bottom-12 right-6 flex gap-2">{[<Award key="a" />, <Star key="s" />].map((ic, i) => <span key={i} className="tk-float w-9 h-9 rounded-full bg-[#0b162c] border-2 border-white flex items-center justify-center text-yellow-300 [&>svg]:w-4 [&>svg]:h-4" style={{ animationDelay: `${i * 0.4}s` }}>{ic}</span>)}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-24">

        {/* ===== 1. SEJARAH ===== */}
        <section id="sejarah" className="scroll-mt-24">
          {secHead(<Tag icon={<Building2 className="w-3.5 h-3.5" />}>Unit Pelaksana Teknis</Tag>, t.s1, 'Sebagai Unit Pelaksana Teknis di bawah naungan Kementerian Imigrasi dan Pemasyarakatan, Kantor Imigrasi Kelas I Khusus Non TPI Tangerang menyelenggarakan administrasi dan kedaulatan hukum keimigrasian di seluruh kawasan strategis Tangerang Raya.')}
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6">
            <div className={`${card} p-6 md:p-8 flex flex-col hover:shadow-xl transition-shadow duration-500`}>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1c1a6b] mb-3"><History className="w-3.5 h-3.5" />Evolusi Kelembagaan Publik</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#0f172a] leading-snug mb-4">Menjaga Pintu Gerbang Kedaulatan di Jantung Penyangga Barat Ibukota</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">Sejak didirikan pada masa reformasi, Kantor Imigrasi Tangerang telah melalui berbagai transformasi struktural penting. Wilayah Tangerang Raya yang berkembang dari kawasan agraris menjadi pusat manufaktur internasional, pemukiman terencana, dan koridor transit global menuntut daya adaptasi keimigrasian berstandar tinggi.</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">Kenaikan status kelembagaan menjadi Kantor Imigrasi Kelas I Khusus Non TPI pada tahun 2024 menandai babak baru dalam pengakuan kapasitas operasional, pengawasan orang asing yang lebih presisi, dan komitmen pelayanan publik tanpa diskriminasi.</p>
              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3"><Scale className="w-5 h-5 text-[#1c1a6b]" /><div><p className="text-[10px] font-bold text-gray-400 tracking-wide">LANDASAN HUKUM OPERASIONAL</p><p className="text-sm font-extrabold text-gray-900">UU No. 6 Tahun 2011 tentang Keimigrasian</p></div></div>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded">Satker ID: 409124</span>
              </div>
            </div>
            <figure className="relative rounded-md overflow-hidden min-h-[320px] group shadow-lg">
              <img src="src/assets/kantor_imigrasi_gedung.jpg" alt="Gedung Utama Kanim Tangerang" onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900'; }} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c]/90 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-5 text-white"><p className="text-[10px] font-bold text-yellow-300 tracking-wide mb-1">GEDUNG PELAYANAN TERPADU</p><p className="font-extrabold">Gedung Utama Kanim Tangerang</p><p className="text-xs text-gray-200 mt-1">Jl. Taman Makam Pahlawan Taruna No. 10, Babakan, Kota Tangerang</p></figcaption>
            </figure>
          </div>

          {/* linimasa */}
          <div className={`${card} mt-8 p-6 md:p-8`}>
            <h3 className="text-xl font-extrabold text-[#0f172a]">Linimasa Rekam Jejak Institusi (1998 — 2024)</h3>
            <p className="text-xs text-gray-500 mb-6">Transformasi kelembagaan menuju kantor keimigrasian berstandar internasional. <span className="inline-flex items-center gap-1 text-[#1c1a6b] font-semibold"><MousePointerClick className="w-3 h-3" />Klik untuk menyorot</span></p>
            <div className="relative">
              <span className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gray-200" />
              <span className="absolute left-[19px] top-5 w-0.5 bg-[#1c1a6b] transition-[height] duration-700 ease-out" style={{ height: `calc((100% - 40px) * ${tl / (TIMELINE.length - 1)})` }} />
              <div className="space-y-2">
                {TIMELINE.map(([short, year, title, desc], i) => {
                  const on = i === tl, passed = i <= tl;
                  return (
                    <button key={year} onClick={() => setTl(i)} aria-pressed={on} className={`relative w-full text-left flex gap-4 items-start p-2 rounded-md transition-all duration-300 hover:bg-indigo-50/60 ${on ? 'bg-indigo-50/70' : ''}`}>
                      <span className={`relative z-10 w-10 h-10 rounded-full border-2 text-xs font-extrabold flex items-center justify-center flex-shrink-0 transition-all duration-300 ${passed ? 'bg-[#1c1a6b] text-white border-[#1c1a6b]' : 'bg-indigo-50 text-[#1c1a6b] border-indigo-200'} ${on ? 'scale-110 tk-ring' : ''}`}>{short}</span>
                      <span className="pt-1"><span className="block text-sm font-extrabold text-[#0f172a]"><span className="inline-block bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded mr-2">{year}</span>{title}</span><span className={`block text-xs leading-relaxed mt-1 transition-colors ${on ? 'text-gray-700' : 'text-gray-500'}`}>{desc}</span></span>
                    </button>);
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. WILAYAH ===== */}
        <section id="wilayah" className="scroll-mt-24">
          <h2 className="flex items-center gap-2.5 text-xl font-extrabold text-[#0f172a]"><MapPin className="w-5 h-5 text-[#1c1a6b]" />Wilayah Kerja Keimigrasian</h2>
          <p className="text-xs text-gray-500 mb-5">Kewenangan yurisdiksi mencakup 3 entitas pemerintahan daerah di kawasan Tangerang Raya.</p>
          <div className="grid md:grid-cols-3 gap-5">
            {WILAYAH.map(w => (
              <div key={w.name} className={`${card} border-t-4 border-t-[#1c1a6b] p-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500`}>
                <span className="text-[10px] font-extrabold text-[#1c1a6b] bg-indigo-50 px-2 py-0.5 rounded">{w.tag}</span>
                <h3 className="text-lg font-extrabold text-[#0f172a] mt-2 mb-3">{w.name}</h3>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <p className="flex justify-between">Cakupan Wilayah: <b className="text-gray-900"><CountUp to={w.kec} /> Kecamatan</b></p>
                  <p className="flex justify-between">Luas Administratif: <b className="text-gray-900"><CountUp to={w.luas} dec={2} /> km²</b></p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>))}
          </div>
          <div className="mt-6 bg-slate-50 border border-gray-200 rounded-md p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div><h3 className="font-extrabold text-[#0f172a]">Titik Layanan Publik Eksternal (Unit Layanan Paspor)</h3><p className="text-xs text-gray-500">Desentralisasi gerai layanan untuk mempermudah akses warga Tangerang Raya.</p></div>
              <span className="text-[11px] font-bold text-[#1c1a6b] bg-white border border-indigo-100 px-2.5 py-1 rounded">3 Lokasi Resmi Terintegrasi</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {ULP.map(u => (
                <a key={u.name} href={`https://www.google.com/maps/search/${encodeURIComponent(u.q)}`} target="_blank" rel="noopener noreferrer" className="group bg-white border border-gray-200 rounded-md p-4 hover:border-[#1c1a6b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-3 items-start mb-2"><span className="w-9 h-9 rounded bg-indigo-50 text-[#1c1a6b] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c1a6b] group-hover:text-white transition-colors"><Building2 className="w-4 h-4" /></span><div><p className="text-sm font-extrabold text-gray-900">{u.name}</p><p className="text-[11px] text-gray-500">{u.place}</p></div></div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{u.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1c1a6b] group-hover:gap-2 transition-all">Buka di Peta<ExternalLink className="w-3 h-3" /></span>
                </a>))}
            </div>
          </div>
        </section>

        {/* ===== 3. TUPOKSI ===== */}
        <section id="tupoksi" className="scroll-mt-24">
          {secHead(<Tag icon={<Briefcase className="w-3.5 h-3.5" />}>Tri Fungsi Imigrasi</Tag>, t.s3, 'Melaksanakan kebijakan keimigrasian secara terpadu meliputi pelayanan dokumen, perlindungan kedaulatan, penegakan hukum, dan akselerasi pertumbuhan ekonomi daerah.')}
          <div className="grid md:grid-cols-3 gap-5">
            {PILARS.map(p => (
              <div key={p.n} className={`${card} p-6 flex flex-col group hover:-translate-y-2 hover:shadow-2xl hover:border-[#1c1a6b]/40 transition-all duration-500`}>
                <span className="w-11 h-11 rounded-md bg-[#1c1a6b] text-white flex items-center justify-center mb-4 group-hover:rotate-6 group-hover:scale-110 transition-transform">{p.icon}</span>
                <p className="text-[11px] font-bold text-gray-400 tracking-wide">PILAR {p.n}</p>
                <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">{p.t}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{p.d}</p>
                <ul className="mt-auto space-y-2 pt-3 border-t border-gray-100">{p.b.map(b => <li key={b} className="flex gap-2 text-xs font-semibold text-gray-800"><CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />{b}</li>)}</ul>
              </div>))}
          </div>
          <div className={`${card} mt-6 p-5 md:p-6 flex gap-4 hover:shadow-lg transition-shadow`}>
            <Network className="w-6 h-6 text-[#1c1a6b] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-extrabold text-[#0f172a] mb-2">Sinergitas Antar-Lembaga dan Ketahanan Wilayah Penyangga</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">Sebagai kantor keimigrasian yang berbatasan langsung dengan episentrum transportasi udara terbesar di Indonesia, Kanim Tangerang aktif menjalin koordinasi strategis lintas sektoral dengan Direktorat Jenderal Bea dan Cukai (DJBC), Badan Karantina Indonesia, <b className="text-gray-900">Kepolisian Daerah Metro Jaya & Banten</b>, serta Komando Distrik Militer (Kodim).</p>
              <div className="flex flex-wrap gap-2">{['Rapat Koordinasi TIMPORA Berkala', 'Pertukaran Data Intelijen', 'Patroli Pengawasan Bersama Nasional'].map(c => <span key={c} className="text-[11px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded hover:bg-[#1c1a6b] hover:text-white hover:border-[#1c1a6b] transition-colors cursor-default">{c}</span>)}</div>
            </div>
          </div>
        </section>

        {/* ===== 4. VISI MISI ===== */}
        <section id="visi" className="scroll-mt-24">
          {secHead(<Tag icon={<ScrollText className="w-3.5 h-3.5" />}>Arah Strategis Menuju Indonesia Emas 2045</Tag>, t.s4, 'Kompas fundamental yang memandu aparatur keimigrasian dalam berkinerja secara profesional, akuntabel, sinergis, transparan, dan inovatif.')}
          <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-[#1c1a6b] to-[#2a2790] text-white p-8 md:p-12 group">
            <Quote className="absolute right-6 bottom-4 w-28 h-28 text-white/5 group-hover:text-white/10 group-hover:rotate-6 transition-all duration-700" />
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/10 border border-white/20 px-3 py-1 rounded mb-5"><Landmark className="w-3.5 h-3.5" />VISI KEMENTERIAN IMIGRASI DAN PEMASYARAKATAN RI</span>
            <p className="text-2xl md:text-4xl font-extrabold leading-snug mb-6 max-w-5xl">“Terwujudnya Pelayanan Keimigrasian dan Pemasyarakatan yang Modern, Transparan, Humanis, dan Berintegritas guna Menjaga Kedaulatan Negara serta Mendorong Pertumbuhan Ekonomi Nasional Menuju Indonesia Emas 2045.”</p>
            <p className="text-xs text-indigo-200 flex flex-wrap items-center gap-3"><span>Diletakkan dalam Rencana Pembangunan Jangka Menengah Nasional</span><span className="text-yellow-300 font-bold">• Tangerang Berintegritas</span></p>
          </div>

          <h3 className="flex items-center gap-2 font-extrabold text-[#0f172a] mt-10 mb-4"><FolderOpen className="w-4 h-4 text-[#1c1a6b]" />Misi Kelembagaan Resmi</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {MISI.map(([n, ti, de]) => (
              <div key={n} className={`${card} p-5 flex gap-4 hover:border-[#1c1a6b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group`}>
                <span className="w-9 h-9 rounded border border-indigo-100 bg-indigo-50 text-[#1c1a6b] text-sm font-extrabold flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c1a6b] group-hover:text-white transition-colors">{n}</span>
                <div><p className="font-extrabold text-sm text-[#0f172a] mb-1">{ti}</p><p className="text-xs text-gray-600 leading-relaxed">{de}</p></div>
              </div>))}
          </div>

          <h3 className="flex items-center gap-2 font-extrabold text-[#0f172a] mt-10 mb-4"><Target className="w-4 h-4 text-[#1c1a6b]" />Tujuan Strategis Kinerja</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SASARAN.map(([lb, ic], i) => (
              <div key={lb} className={`${card} p-4 flex items-center gap-3 hover:border-[#1c1a6b] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group`}>
                <span className="w-9 h-9 rounded bg-indigo-50 text-[#1c1a6b] flex items-center justify-center group-hover:bg-[#1c1a6b] group-hover:text-white group-hover:scale-110 transition-all">{ic}</span>
                <div><p className="text-[10px] text-gray-400 font-semibold">Sasaran {String(i + 1).padStart(2, '0')}</p><p className="text-xs font-extrabold text-gray-900 leading-snug">{lb}</p></div>
              </div>))}
          </div>
        </section>

        {/* ===== 5. STRUKTUR ===== */}
        <section id="struktur" className="scroll-mt-24">
          {secHead(<Tag icon={<GitBranch className="w-3.5 h-3.5" />}>Bagan Kelembagaan Resmi</Tag>, t.s5, 'Susunan tata kelola organisasi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang sesuai Keputusan Menteri Imigrasi dan Pemasyarakatan Republik Indonesia.')}
          <div className={`${card} p-5 md:p-8`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
              <div><h3 className="font-extrabold text-[#0f172a]">Bagan Alur Komando & Koordinasi Teknis</h3><p className="text-xs text-gray-500">Struktur vertikal satuan kerja eselon II.b.</p></div>
              <span className="text-[11px] font-bold text-[#1c1a6b] bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded inline-flex items-center gap-1.5"><MousePointerClick className="w-3 h-3" />Tampilan Organogram Interaktif</span>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="max-w-xs mx-auto"><OrgNode row="kepala" dark label="Kepala Kantor Imigrasi" sub="Kelas I Khusus Non TPI Tangerang" icon={<Landmark className="w-4 h-4" />} sel={sel} onSel={setSel} /></div>
              <div className="w-px h-6 bg-gray-300 mx-auto" />
              <div className="max-w-sm mx-auto"><OrgNode row="tu" label="Bagian / Subbagian Tata Usaha" sub="Kepegawaian • Keuangan • Umum & Rumah Tangga" icon={<Briefcase className="w-4 h-4" />} sel={sel} onSel={setSel} /></div>
              <div className="w-px h-6 bg-gray-300 mx-auto" />
              <div className="relative pt-6">
                <span className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-gray-300" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[['lantaskim', 'Lantaskim', 'Lalu Lintas Keimigrasian & Paspor WNI', <Scan key="1" className="w-4 h-4" />], ['intaltuskim', 'Intaltuskim', 'Izin Tinggal & Status Keimigrasian WNA', <FileCheck2 key="2" className="w-4 h-4" />], ['inteldakim', 'Inteldakim', 'Intelijen & Penindakan Hukum Keimigrasian', <ShieldCheck key="3" className="w-4 h-4" />], ['tikim', 'TIKIM', 'Teknologi Informasi & Komunikasi Keimigrasian', <Cpu key="4" className="w-4 h-4" />]].map(([id, lb, sb, ic]) => (
                    <div key={id as string} className="relative"><span className="hidden md:block absolute -top-6 left-1/2 w-px h-6 bg-gray-300" />
                      <OrgNode row={id as string} label={lb as string} sub={sb as string} icon={ic as React.ReactNode} sel={sel} onSel={setSel} /></div>))}
                </div>
              </div>
              <div className="mt-6 text-center bg-slate-50 border border-dashed border-gray-300 rounded-md py-3 px-4"><p className="text-[10px] font-bold text-gray-400 tracking-wide">JABATAN FUNGSIONAL TERTENTU (JFT)</p><p className="text-sm font-extrabold text-gray-800">Kelompok Analis Keimigrasian & Pemeriksa Keimigrasian Ahli</p></div>

              <div className="mt-6 min-h-[88px]">
                {selRow ? (
                  <div key={selRow.id} className="tk-pop border-l-4 border-[#1c1a6b] bg-indigo-50/60 rounded-r-md p-4">
                    <div className="flex items-center gap-2 mb-1"><p className="font-extrabold text-sm text-[#0f172a]">{selRow.t}</p><span className="text-[10px] font-bold text-[#1c1a6b] bg-white border border-indigo-100 px-2 py-0.5 rounded">{selRow.tag}</span></div>
                    <p className="text-xs text-gray-600 leading-relaxed">{selRow.d}</p>
                  </div>
                ) : <p className="text-xs text-gray-400 text-center pt-6">{t.hint}</p>}
              </div>
            </div>
          </div>

          {/* rincian */}
          <div className={`${card} mt-6 p-5 md:p-8`}>
            <h3 className="flex items-center gap-2 font-extrabold text-[#0f172a]"><SearchIcon className="w-4 h-4 text-[#1c1a6b]" />Rincian Uraian Divisi & Pembagian Tugas</h3>
            <p className="text-xs text-gray-500 mb-4">Daftar divisi operasional dan fungsi manajerial yang dapat diakses oleh masyarakat umum.</p>
            <div className="space-y-2">
              {ROWS.map((r, i) => {
                const on = sel === r.id;
                return (
                  <button key={r.id} onClick={() => setSel(r.id)} aria-pressed={on} className={`w-full text-left flex gap-4 items-start border rounded-md p-4 transition-all duration-300 hover:border-[#1c1a6b]/60 hover:translate-x-1 ${on ? 'border-[#1c1a6b] bg-indigo-50/60 shadow-md' : 'border-gray-200 bg-white'}`}>
                    <span className={`w-7 h-7 rounded text-xs font-extrabold flex items-center justify-center flex-shrink-0 transition-colors ${on ? 'bg-[#1c1a6b] text-white' : 'bg-indigo-50 text-[#1c1a6b]'}`}>{i + 1}</span>
                    <span className="flex-1 min-w-0"><span className="block text-sm font-extrabold text-[#0f172a]">{r.t}</span><span className="block text-xs text-gray-600 leading-relaxed mt-0.5">{r.d}</span></span>
                    <span className="hidden sm:block text-[11px] font-bold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded flex-shrink-0">{r.tag}</span>
                  </button>);
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {scrollY > 600 && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={t.top} className="tk-pop fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#1c1a6b] text-white shadow-xl flex items-center justify-center hover:-translate-y-1 active:scale-90 transition-all"><ArrowUp className="w-5 h-5" /></button>}
    </div>
  );
}