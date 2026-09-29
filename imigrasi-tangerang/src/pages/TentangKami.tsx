import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, 
  Camera, Hash, Users, Play, ChevronLeft, ChevronDown, ChevronUp,
  Languages, X, Bot, MessageSquare, ExternalLink, Send, 
  CheckCircle2, Info, Calendar, Map, Target, Briefcase, FileText
} from 'lucide-react';

export default function TentangKami() {
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: 'Halo! Saya IVARA, Asisten AI Imigrasi Tangerang. Ada yang bisa saya bantu?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  // State untuk Akordion Struktur Organisasi
  const [expandedTugas, setExpandedTugas] = useState<number | null>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  const timelineData = [
    { year: "1981", title: "Berdiri Sebagai Pos Imigrasi Tangerang", desc: "Awal mula dibentuk sebagai pos pelayanan keimigrasian di bawah wilayah kerja Kantor Imigrasi Kelas I Jakarta Barat." },
    { year: "1985", title: "Peningkatan Status Menjadi Kantor Imigrasi", desc: "Resmi berdiri sendiri sebagai Kantor Imigrasi Kelas II Tangerang melayani masyarakat wilayah Tangerang Raya." },
    { year: "2002", title: "Peningkatan Kelas Menjadi Kelas I", desc: "Seiring dengan pesatnya pertumbuhan ekonomi dan lalu lintas orang asing, status kantor ditingkatkan menjadi Kelas I." },
    { year: "2015", title: "Pembangunan Gedung Kantor Baru", desc: "Relokasi dan pembangunan gedung baru di Jl. Taman Makam Pahlawan Taruna untuk meningkatkan kapasitas pelayanan." },
    { year: "2024", title: "Peningkatan Status Menjadi Kelas I Khusus Non TPI", desc: "Menjadi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang dengan beban kerja dan tingkat pelayanan yang lebih tinggi." }
  ];

  const wilayahData = [
    { name: "Kota Tangerang", area: "153,93 km²", desc: "Pusat pemerintahan dan kawasan industri strategis dengan tingkat permohonan paspor tertinggi." },
    { name: "Kabupaten Tangerang", area: "959,61 km²", desc: "Wilayah terluas dengan banyak kawasan industri multinasional dan permukiman warga negara asing (WNA)." },
    { name: "Kota Tangerang Selatan", area: "147,19 km²", desc: "Kawasan pemukiman elit, pendidikan, dan bisnis dengan mobilitas internasional masyarakat yang sangat tinggi." }
  ];

  const tugasOrganisasi = [
    { id: 1, title: "Sub Bagian Tata Usaha (Fasilitatif & Kepegawaian)", desc: "Melaksanakan urusan ketatausahaan, kepegawaian, keuangan, perlengkapan, dan kerumahtanggaan kantor." },
    { id: 2, title: "Seksi Lalu Lintas Keimigrasian (Lalintalkim)", desc: "Melayani permohonan dokumen perjalanan Republik Indonesia (Paspor) dan perlintasan masuk/keluar wilayah Indonesia." },
    { id: 3, title: "Seksi Izin Tinggal dan Status Keimigrasian (Intaltuskim)", desc: "Memberikan pelayanan Izin Tinggal Kunjungan, Izin Tinggal Terbatas (ITAS), Izin Tinggal Tetap (ITAP), dan Status Kewarganegaraan bagi WNA." },
    { id: 4, title: "Seksi Intelijen dan Penindakan Keimigrasian (Inteldakim)", desc: "Melakukan pengawasan terhadap kegiatan Orang Asing, penyelidikan, penindakan hukum, dan pendeportasian pelanggar keimigrasian." },
    { id: 5, title: "Seksi Teknologi Informasi dan Komunikasi Keimigrasian (Tikkim)", desc: "Mengelola sistem informasi keimigrasian, pemeliharaan jaringan, serta diseminasi/publikasi informasi dan hubungan masyarakat." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md animate-fade-in">
        <div className="flex items-center space-x-4 cursor-pointer group">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 shadow-sm p-1 transition-transform duration-500 group-hover:rotate-12"><div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div></div>
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center p-1 transition-transform duration-500 group-hover:-rotate-12"><div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div></div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[15px] tracking-wide text-white transition-colors duration-300 group-hover:text-yellow-400">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[12px] font-bold text-[#eab308] tracking-wider mt-0.5">KANTOR WILAYAH DITJENIM TANGERANG</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Beranda</Link>
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Informasi Publik</Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Berita</Link>
            <Link to="/tentang-kami" className="text-[#eab308] flex flex-col items-center">
              Tentang Kami <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all duration-300"></span>
            </Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">FAQ</Link>
          </div>
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 transition-colors duration-300 group-focus-within:text-yellow-500" />
            <input type="text" placeholder="search" className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[200px] transition-all duration-300 focus:w-[240px] text-sm" />
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 h-[280px] animate-fade-in group border-b-4 border-[#1e3a8a]">
        <div className="absolute top-6 left-6 z-20">
          <Link to="/" className="text-[#1e3a8a] hover:text-blue-900 flex items-center font-bold transition-colors bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            <ChevronLeft className="w-5 h-5 mr-1" /> Kembali
          </Link>
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-10 lg:px-24">
          <div className="animate-fade-in-up delay-100">
            <p className="text-sm font-bold text-yellow-800 uppercase tracking-widest mb-2">Profil Instansi</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1e3a8a] drop-shadow-sm">
              Sejarah Kantor
            </h1>
            <p className="text-[#1e3a8a] mt-3 font-medium opacity-80 max-w-md">Mengenal lebih dekat Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.</p>
          </div>
          {/* Logo Instansi di Kanan */}
          <div className="hidden lg:flex space-x-4 animate-fade-in-up delay-200">
            <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/50">
              <Shield className="w-12 h-12 text-[#1e3a8a]" />
            </div>
            <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/50">
              <Globe className="w-12 h-12 text-[#1e3a8a]" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full animate-fade-in-up delay-200 space-y-24">
        
        {/* 1. SEJARAH & SELAYANG PANDANG */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Kilas Balik Instansi</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b] mb-6">Sejarah Kantor & Selayang Pandang</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed text-justify">
              <p>
                <strong>TANGERANG</strong> - Berawal dari sebuah Pos Imigrasi kecil yang menginduk pada Kantor Imigrasi Kelas I Jakarta Barat, Kantor Imigrasi Tangerang terus berevolusi seiring dengan pesatnya laju pertumbuhan penduduk dan ekspansi kawasan industri di wilayah Tangerang Raya.
              </p>
              <p>
                Pada tahun 1985, pos ini secara resmi berdiri mandiri menjadi Kantor Imigrasi Kelas II Tangerang. Peningkatan volume permohonan dokumen perjalanan dan pengawasan orang asing yang eksponensial memaksa instansi ini untuk terus meningkatkan kapasitas pelayanannya, yang berujung pada peningkatan status menjadi Kelas I pada tahun 2002.
              </p>
              <p>
                Kini, dengan predikat Kelas I Khusus Non TPI (Tempat Pemeriksaan Imigrasi), Kantor Imigrasi Tangerang memegang peranan krusial sebagai garda terdepan penjaga pintu gerbang negara dan fasilitator pembangunan ekonomi nasional di Banten.
              </p>
            </div>
            <div className="mt-8 flex items-center space-x-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500 font-semibold">Lokasi Kantor Saat Ini</p>
                <p className="text-sm font-bold text-[#1e293b]">Jl. Taman Makam Pahlawan Taruna No.10, Tangerang</p>
              </div>
            </div>
          </div>
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
              alt="Gedung Imigrasi Tangerang" 
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-bold text-lg drop-shadow-md">Gedung Utama Kantor Imigrasi Tangerang</p>
              <p className="text-gray-300 text-xs">Pusat layanan keimigrasian berstandar internasional.</p>
            </div>
          </div>
        </section>

        {/* 2. LINI MASA PERJALANAN */}
        <section>
          <div className="mb-8">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Jejak Sejarah</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b]">Lini Masa Perjalanan Instansi (1981 - 2024)</h2>
          </div>
          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-10">
            {timelineData.map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Lingkaran Timeline */}
                <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                  <Calendar className="w-3 h-3 text-blue-600 group-hover:text-white" />
                </div>
                {/* Konten Timeline */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md group-hover:-translate-y-1 transition-all">
                  <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full mb-3 inline-block">{item.year}</span>
                  <h3 className="font-bold text-lg text-[#1e293b] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. WILAYAH KERJA */}
        <section className="bg-[#f8fafc] rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm">
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Cakupan Wilayah</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b]">Wilayah Kerja & Batas Administrasi</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm">Meliputi 3 kawasan administratif utama di Provinsi Banten yang berbatasan langsung dengan Ibukota DKI Jakarta.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {wilayahData.map((wil, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Map className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{wil.area}</span>
                </div>
                <h3 className="font-bold text-lg text-[#1e293b] mb-2">{wil.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{wil.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-start space-x-4 mb-4 md:mb-0">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1e293b]">Wilayah Khusus (Pengecualian)</h4>
                <p className="text-sm text-gray-600 mt-1">Kecamatan Benda, Batuceper (Kota Tangerang) dan Kosambi (Kab. Tangerang) merupakan wilayah kerja <strong>Kantor Imigrasi Kelas I Khusus TPI Soekarno Hatta</strong>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. KEDUDUKAN, TUGAS POKOK, FUNGSI */}
        <section>
          <div className="text-center mb-10">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Fungsi Instansi</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b]">Kedudukan, Tugas Pokok dan Fungsi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-t-4 border-t-blue-600 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md">1</div>
              <h3 className="font-bold text-xl text-[#1e293b] mb-4">Pelayanan Keimigrasian</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Memberikan pelayanan paspor bagi WNI serta izin tinggal (ITAS/ITAP) dan status keimigrasian bagi WNA secara profesional, cepat, dan transparan.</p>
            </div>
            <div className="bg-white border-t-4 border-t-red-500 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md">2</div>
              <h3 className="font-bold text-xl text-[#1e293b] mb-4">Penegakan Hukum</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Melakukan pengawasan, penyelidikan, dan penindakan hukum terhadap pelanggaran aturan keimigrasian demi menjaga kedaulatan negara.</p>
            </div>
            <div className="bg-white border-t-4 border-t-yellow-500 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 shadow-md">3</div>
              <h3 className="font-bold text-xl text-[#1e293b] mb-4">Fasilitator Pembangunan</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Mendukung iklim investasi dan pariwisata nasional melalui regulasi dan layanan keimigrasian yang ramah bagi penanam modal asing dan wisatawan.</p>
            </div>
          </div>
        </section>

        {/* 5. VISI, MISI, TATA NILAI */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="bg-[#1e1b4b] text-white p-10 md:p-16 relative overflow-hidden">
            <div className="absolute opacity-10 -right-10 -bottom-10"><Target className="w-64 h-64" /></div>
            <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-4 block">Visi Instansi</span>
            <blockquote className="text-2xl md:text-4xl font-extrabold leading-snug relative z-10">
              "Terwujudnya Pelayanan Keimigrasian dan Penegakan Hukum yang Modern, Transparan, Humanis, dan Berintegritas guna Menjaga Kedaulatan Negara serta Mendorong Pertumbuhan Ekonomi Nasional Menuju Indonesia Emas 2045."
            </blockquote>
          </div>
          <div className="p-10 md:p-16 bg-gray-50 border-t border-gray-200">
            <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-6 block">Misi Instansi</span>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, tepat, dan bebas dari pungli.",
                "Mengoptimalkan pengawasan dan penegakan hukum keimigrasian secara tegas, humanis, dan berkeadilan.",
                "Memperkuat sinergitas antar instansi terkait (TIMPORA) dalam pengamanan wilayah negara.",
                "Membangun Sumber Daya Manusia (SDM) yang profesional, akuntabel, dan berorientasi pada pelayanan."
              ].map((misi, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">{misi}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-10">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-6 block text-center">Tata Nilai (PASTI)</span>
              <div className="flex flex-wrap justify-center gap-4">
                {["Profesional", "Akuntabel", "Sinergi", "Transparan", "Inovatif"].map((nilai, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm font-bold text-[#1e293b] text-sm hover:border-blue-500 hover:text-blue-600 transition-colors cursor-default">
                    {nilai}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. STRUKTUR ORGANISASI */}
        <section>
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 block">Bagan Instansi</span>
            <h2 className="text-3xl font-extrabold text-[#1e293b]">Struktur Organisasi</h2>
            <p className="text-gray-500 mt-4 text-sm">Hierarki dan pembagian tugas pokok fungsi di lingkungan Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.</p>
          </div>

          {/* Pohon Organisasi (Visual Sederhana) */}
          <div className="flex flex-col items-center mb-16 overflow-x-auto pb-4">
            <div className="bg-[#1e1b4b] text-white px-8 py-4 rounded-xl shadow-lg font-bold text-center border-b-4 border-yellow-500 w-64">
              Kepala Kantor
            </div>
            <div className="w-px h-8 bg-blue-300"></div>
            <div className="bg-blue-50 border border-blue-200 text-blue-900 px-6 py-3 rounded-xl font-semibold text-center w-64 shadow-sm">
              Sub Bagian Tata Usaha
            </div>
            <div className="w-px h-8 bg-blue-300"></div>
            {/* Garis Horizontal */}
            <div className="w-full max-w-4xl border-t-2 border-blue-300 flex justify-between relative pt-6 mt-[-2px]">
              {/* 4 Cabang Seksi */}
              {["Seksi Lalintalkim", "Seksi Intaltuskim", "Seksi Inteldakim", "Seksi Tikkim"].map((seksi, idx) => (
                <div key={idx} className="flex flex-col items-center w-1/4 px-2">
                  <div className="w-px h-6 bg-blue-300 absolute top-0"></div>
                  <div className="bg-white border border-gray-200 text-gray-700 px-2 py-3 rounded-lg text-xs md:text-sm font-bold text-center w-full shadow-sm hover:border-blue-400 transition-colors">
                    {seksi}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Akordion Fungsi/Tugas Pokok */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <h3 className="font-bold text-lg text-[#1e293b] mb-6 border-b pb-4">Fungsi / Tugas Seksi & Subbagian Kerja</h3>
            <div className="space-y-3">
              {tugasOrganisasi.map((tugas) => (
                <div 
                  key={tugas.id}
                  className={`border rounded-xl overflow-hidden transition-all duration-300
                    ${expandedTugas === tugas.id ? 'border-blue-400 ring-1 ring-blue-100' : 'border-gray-200 hover:border-blue-300'}
                  `}
                >
                  <button 
                    onClick={() => setExpandedTugas(expandedTugas === tugas.id ? null : tugas.id)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between focus:outline-none bg-gray-50/50"
                  >
                    <span className="font-bold text-sm text-[#1e293b] pr-4">{tugas.title}</span>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors
                      ${expandedTugas === tugas.id ? 'bg-blue-100 text-blue-700' : 'text-gray-400'}
                    `}>
                      {expandedTugas === tugas.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedTugas === tugas.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="px-5 pb-4 pt-2 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
                      {tugas.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1e293b] text-white pt-16 pb-8 mt-auto animate-fade-in-up delay-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-700 pb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"><Shield className="w-7 h-7 text-[#1e293b]" /></div>
              <div className="font-bold leading-tight">KANTOR IMIGRASI KELAS I <br/> NON TPI TANGERANG</div>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start hover:text-yellow-400 transition-colors cursor-pointer"><MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-yellow-500" /><p>Jl. Taman Makam Pahlawan Taruna No.10, Tangerang 15118</p></div>
              <div className="flex items-center hover:text-yellow-400 transition-colors cursor-pointer"><Phone className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-500" /><p>(021) 5579 0871 (Call Center)</p></div>
              <div className="flex items-center hover:text-yellow-400 transition-colors cursor-pointer"><Mail className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-500" /><p>kanim_tangerang@imigrasi.go.id</p></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-gray-600 pb-2 inline-block">Situs Terkait</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-yellow-400 transition">Direktorat Jenderal Imigrasi</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Kementerian Hukum dan HAM RI</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6 border-b border-gray-600 pb-2 inline-block">Ikuti Kami</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:-translate-y-1 transition-all duration-300"><Camera className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:-translate-y-1 transition-all duration-300"><Hash className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:-translate-y-1 transition-all duration-300"><Users className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 px-6">
          <p>&copy; {new Date().getFullYear()} Direktorat Jenderal Imigrasi. Hak Cipta Dilindungi.</p>
        </div>
      </footer>

      {/* ================= FLOATING ACTION BUTTONS (CS & Chat) ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {isCsOpen && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-64 mb-2 animate-fade-in origin-bottom-right">
            <div className="flex justify-between items-center mb-3 border-b pb-2">
              <h4 className="font-bold text-sm text-[#1e293b]">Layanan Informasi</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <a href="tel:02155790871" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">Telepon</p><p className="text-xs text-gray-500">(021) 5579 0871</p></div>
              </a>
              <a href="https://wa.me/628114119000" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><MessageSquare className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500">0811 411 9000</p></div>
              </a>
              <a href="https://www.lapor.go.id" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><ExternalLink className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">Lapor.id</p><p className="text-xs text-gray-500">Layanan Pengaduan</p></div>
              </a>
            </div>
          </div>
        )}
        <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className="w-14 h-14 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300">
          {isCsOpen ? <X className="w-6 h-6 text-black transform rotate-90 transition-transform" /> : <Phone className="w-6 h-6 text-black transition-transform" />}
        </button>
        <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:-translate-y-1 hover:shadow-2xl active:scale-95 transition-all duration-300 relative">
          <MessageSquare className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
        </button>
      </div>

      {/* ================= JENDELA CHAT AI IVARA ================= */}
      {isIvaraOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px] animate-fade-in origin-bottom-right">
          <div className="bg-[#1e293b] text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-5 h-5 text-white" /></div>
              <div><h3 className="font-bold text-sm">IVARA AI Assistant</h3><p className="text-[10px] text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div>
            </div>
            <button onClick={() => setIsIvaraOpen(false)} className="text-gray-300 hover:text-red-400 transition-colors"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Tulis pesan..." className="flex-1 px-4 py-2.5 text-xs md:text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"/>
            <button type="submit" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-all flex-shrink-0 shadow-md"><Send className="w-4 h-4 ml-0.5" /></button>
          </form>
        </div>
      )}
    </div>
  );
}