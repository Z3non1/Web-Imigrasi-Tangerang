import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, 
  Camera, Hash, Users, Play, ChevronLeft, ChevronDown, ChevronUp,
  Languages, X, Bot, MessageSquare, ExternalLink, Send, CheckCircle2, Info, FileText
} from 'lucide-react';

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('Semua Pertanyaan');
  const [expandedId, setExpandedId] = useState<number | null>(1); // FAQ pertama terbuka otomatis
  
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: 'Halo! Saya IVARA, Asisten AI Imigrasi Tangerang. Ada yang bisa saya bantu?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  const categories = [
    "Semua Pertanyaan", "Paspor RI & M-Paspor", "Visa & Kedatangan", 
    "Izin Tinggal WNA (ITAS/ITAP)", "Biaya & Pembayaran (SIMPONI)", "Lain-lain"
  ];

  const faqData = [
    {
      id: 1,
      tag: "PASPOR RI - PERMOHONAN BARU",
      question: "Apa saja syarat berkas pengajuan paspor baru Republik Indonesia?",
      content: (
        <div className="animate-fade-in">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Berdasarkan Peraturan Menteri Hukum dan HAM RI No. 18 Tahun 2022, pemohon paspor baru untuk Warga Negara Indonesia (WNI) domisili Tangerang dan sekitarnya wajib menyiapkan dokumen asli dan fotokopi ukuran A4 (tidak boleh dipotong):
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="font-bold text-[#1e293b] text-sm flex items-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" /> Dokumen Wajib Pokok:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start"><span className="mr-2 text-blue-500">•</span> KTP Elektronik (e-KTP) yang masih berlaku atau Surat Keterangan Perekaman e-KTP dari Disdukcapil.</li>
                <li className="flex items-start"><span className="mr-2 text-blue-500">•</span> Kartu Keluarga (KK) terbaru dengan barcode resmi Kemendagri.</li>
                <li className="flex items-start"><span className="mr-2 text-blue-500">•</span> Akta Kelahiran, ATAU Buku Nikah, ATAU Ijazah (pilih salah satu yang memuat nama, tempat/tanggal lahir, serta nama orang tua).</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="font-bold text-[#1e293b] text-sm flex items-center mb-3">
                <Info className="w-4 h-4 text-blue-600 mr-2" /> Dokumen Pendukung / Khusus:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start"><span className="mr-2 text-orange-500">*</span> Surat Penetapan Pengadilan Negeri bagi pemohon yang pernah melakukan perubahan nama.</li>
                <li className="flex items-start"><span className="mr-2 text-orange-500">*</span> Surat Rekomendasi Instansi / Kementerian Agama (Khusus tujuan Ibadah Umrah/Haji mandiri) jika disyaratkan.</li>
                <li className="flex items-start"><span className="mr-2 text-orange-500">*</span> Surat rekomendasi Disnaker bagi Calon Pekerja Migran Indonesia (CPMI).</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Ketentuan Alur:</strong> Seluruh pendaftaran wajib diawali dengan pengambilan antrean melalui aplikasi <strong>M-Paspor</strong> di Google Play Store atau Apple App Store sebelum datang ke Kantor Imigrasi Kelas I Khusus Non TPI Tangerang.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      tag: "DURASI PELAYANAN - ESTIMASI SELESAI",
      question: "Berapa lama proses pembuatan paspor sejak sesi foto dan wawancara?",
      content: (
        <div className="animate-fade-in">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Jangka waktu penyelesaian paspor dihitung setelah pemohon melakukan pembayaran kode billing SIMPONI dan dinyatakan berstatus lunas oleh kas negara:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Paspor Elektronik / Biasa</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold">Reguler</span>
              </div>
              <p className="text-2xl font-extrabold text-[#1e293b] mb-1">3 - 4 Hari Kerja</p>
              <p className="text-[10px] text-gray-400 leading-tight">Dihitung sejak verifikasi bayar & cetak pada sistem PNBP. Tidak termasuk hari Sabtu, Minggu, dan Hari Libur Nasional.</p>
            </div>
            <div className="border border-green-200 rounded-xl p-4 bg-green-50/50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-green-700 uppercase">Layanan Percepatan</span>
                <span className="bg-green-200 text-green-800 text-[10px] px-2 py-0.5 rounded font-bold">Same Day</span>
              </div>
              <p className="text-2xl font-extrabold text-green-700 mb-1">Selesai Hari Itu Juga</p>
              <p className="text-[10px] text-gray-500 leading-tight">Biaya ekstra PNBP percepatan Rp 1.000.000 (diluar biaya buku paspor). Batas waktu bayar maksimal pukul 11:30 WIB.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Pengambilan Paspor</span>
                <span className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded font-bold">Lokal / Drive-Thru</span>
              </div>
              <p className="text-2xl font-extrabold text-[#1e293b] mb-1">H+4 Setelah Bayar</p>
              <p className="text-[10px] text-gray-400 leading-tight">Dapat diambil langsung oleh pemohon, keluarga (bawa KK), atau dikuasakan dengan surat kuasa bermeterai Rp 10.000.</p>
            </div>
          </div>
        </div>
      )
    },
    { id: 3, tag: "ANTREAN DARING - M-PASPOR", question: "Bagaimana cara membuat janji temu atau antrean paspor online?", content: <p className="text-sm text-gray-600">Anda dapat mengunduh aplikasi M-Paspor di PlayStore/AppStore, mendaftar akun, mengisi data diri, dan memilih jadwal kedatangan sesuai kuota yang tersedia.</p> },
    { id: 4, tag: "PASPOR RI - PEMOHON ANAK (< 17 TAHUN)", question: "Apakah anak di bawah umur wajib melampirkan dokumen orang tua saat pembuatan paspor?", content: <p className="text-sm text-gray-600">Ya, wajib melampirkan KTP kedua orang tua, Kartu Keluarga, Akta Kelahiran anak, Buku Nikah orang tua, dan paspor lama orang tua (jika ada).</p> },
    { id: 5, tag: "WARGA NEGARA ASING - VISA ON ARRIVAL", question: "Bagaimana prosedur perpanjangan Visa on Arrival (VoA / e-VoA) di Kantor Imigrasi Tangerang?", content: <p className="text-sm text-gray-600">Perpanjangan VoA dapat dilakukan maksimal 7 hari sebelum masa berlaku habis dengan membawa paspor asli, tiket kembali, dan mengisi formulir di kantor imigrasi.</p> },
    { id: 6, tag: "IZIN TINGGAL - ITAS VS ITAP", question: "Apa perbedaan mendasar antara Izin Tinggal Terbatas (ITAS/KITAS) dan Izin Tinggal Tetap (ITAP/KITAP)?", content: <p className="text-sm text-gray-600">ITAS diberikan untuk jangka waktu terbatas (1-2 tahun), sedangkan ITAP diberikan untuk jangka waktu 5 tahun dan dapat diperpanjang tanpa batas.</p> },
    { id: 7, tag: "PEMBAYARAN PNBP - KAS NEGARA", question: "Bagaimana mekanisme pembayaran biaya PNBP keimigrasian (SIMPONI)?", content: <p className="text-sm text-gray-600">Pembayaran dapat dilakukan melalui teller bank, ATM, Mobile Banking, atau e-commerce (Tokopedia/Bukalapak) dengan memasukkan 15 digit kode billing MPN G2.</p> },
    { id: 8, tag: "BAP & DENDA - KASUS KHUSUS", question: "Bagaimana jika paspor lama saya hilang atau rusak saat ingin melakukan penggantian?", content: <p className="text-sm text-gray-600">Anda harus melalui proses Berita Acara Pemeriksaan (BAP) terlebih dahulu dan akan dikenakan denda sesuai ketentuan PNBP yang berlaku.</p> },
    { id: 9, tag: "INKLUSIF - LAYANAN PRIORITAS RAMAH HAM", question: "Apakah pemohon lansia, disabilitas, atau ibu hamil perlu mendaftar antrean M-Paspor?", content: <p className="text-sm text-gray-600">Pemohon berkebutuhan khusus (Lansia &gt; 60 tahun, Balita, Ibu Hamil, Disabilitas) dapat langsung datang (walk-in) tanpa perlu mendaftar M-Paspor.</p> },
    { id: 10, tag: "TRANSPARANSI & AKUNTABILITAS - UP4K LAPOR!", question: "Bagaimana cara menyampaikan aspirasi atau melaporkan pengaduan pelayanan tidak memuaskan / dugaan pungli?", content: <p className="text-sm text-gray-600">Pengaduan dapat disampaikan melalui portal lapor.go.id, nomor WhatsApp layanan pengaduan kami, atau datang langsung ke ruang pengaduan di kantor imigrasi.</p> },
  ];

  const toggleFaq = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            <Link to="#" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Tentang Kami</Link>
            <Link to="/faq" className="text-[#eab308] flex flex-col items-center">
              FAQ <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all duration-300"></span>
            </Link>
          </div>
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 transition-colors duration-300 group-focus-within:text-yellow-500" />
            <input type="text" placeholder="search" className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[200px] transition-all duration-300 focus:w-[240px] text-sm" />
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-[#1e3a8a] h-[260px] animate-fade-in group">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
            alt="FAQ Imigrasi" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay transition-transform duration-[10s] ease-out group-hover:scale-110"
          />
        </div>
        <div className="absolute top-6 left-6 z-20">
          <Link to="/" className="text-white hover:text-yellow-400 flex items-center font-semibold transition-colors bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <ChevronLeft className="w-5 h-5 mr-1" /> Kembali
          </Link>
        </div>
        <div className="absolute inset-0 flex items-center px-10 lg:px-24">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in-up delay-100">
            FAQ
          </h1>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full animate-fade-in-up delay-200">
        
        {/* Header Informasi */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-[#1e293b] font-bold text-lg mb-3 md:mb-0">
            <FileText className="w-5 h-5" />
            <h2>Klasifikasi Informasi Resmi</h2>
          </div>
          <p className="text-sm text-gray-500">Menampilkan 10 dari 18 pertanyaan resmi</p>
        </div>

        {/* Filter Kategori */}
        <div className="flex overflow-x-auto pb-4 mb-6 space-x-3 hide-scrollbar">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm flex-shrink-0 border
                ${activeCategory === cat 
                  ? 'bg-[#121b4a] text-white border-[#121b4a]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-700'
                }`}
            >
              {cat} {cat === 'Semua Pertanyaan' && <span className="ml-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">18</span>}
            </button>
          ))}
        </div>

        {/* Daftar FAQ (Akordion) */}
        <div className="space-y-4 mb-16">
          {faqData.map((faq) => (
            <div 
              key={faq.id} 
              className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md
                ${expandedId === faq.id ? 'border-blue-300 ring-1 ring-blue-100' : 'border-gray-200'}
              `}
            >
              {/* FAQ Header (Pertanyaan) */}
              <button 
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left px-6 py-5 flex items-start justify-between focus:outline-none"
              >
                <div className="flex space-x-4 pr-4">
                  <span className="text-blue-300 font-bold text-lg w-6 flex-shrink-0">
                    {faq.id.toString().padStart(2, '0')}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-1 block">
                      {faq.tag}
                    </span>
                    <h3 className={`font-bold text-base transition-colors
                      ${expandedId === faq.id ? 'text-blue-800' : 'text-[#1e293b] hover:text-blue-600'}
                    `}>
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors
                  ${expandedId === faq.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-400'}
                `}>
                  {expandedId === faq.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>
              
              {/* FAQ Body (Jawaban) */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedId === faq.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="px-6 pb-6 pt-2 ml-10 border-t border-gray-100">
                  {faq.content}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      {/* Footer dan Floating Action Buttons sengaja menggunakan kode seragam */}
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
              <li><a href="#" className="hover:text-yellow-400 transition">Profil Kantor Imigrasi Tangerang</a></li>
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

      {/* ================= FLOATING ACTION BUTTONS ================= */}
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
                <div><p className="font-semibold text-xs text-gray-900">Lapor.id</p><p className="text-xs text-gray-500">Layanan Aspirasi & Pengaduan</p></div>
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