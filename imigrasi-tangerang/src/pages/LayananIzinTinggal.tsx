import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronRight,
  Languages, X, Bot, MessageSquare, Send, Check, Info, FileText
} from 'lucide-react';

const izinTinggalData = {
  ID: {
    hero: { title: "Izin Tinggal Keimigrasian", sub: "Layanan Fasilitas Keimigrasian WNA" },
    ui: { 
      catTitle: "Ketentuan", 
      catDesc: "Pilih jenis layanan izin tinggal di bawah ini untuk melihat informasi, persyaratan, dan prosedur lengkap.",
      detailBadge: "Detail Layanan"
    },
    categories: [
      "Perpanjangan ITK", 
      "Perpanjangan ITAS", 
      "Perpanjangan ITAP", 
      "Alih Status ITK-ITAS", 
      "Alih Status ITAS-ITAP", 
      "Pemberian ITAP Tanpa Alih Status", 
      "Pelaporan ITAP"
    ],
    content: {
      "Perpanjangan ITK": {
        "Informasi Umum": [
          "Izin Tinggal Kunjungan (ITK) diberikan kepada Orang Asing yang masuk wilayah Indonesia dengan Visa Kunjungan.",
          "Perpanjangan ITK dapat diberikan paling banyak 4 (empat) kali berturut-turut, di mana setiap kali perpanjangan diberikan paling lama 30 (tiga puluh) hari.",
          "Permohonan perpanjangan Izin Tinggal diajukan oleh Orang Asing atau Penjamin kepada Kepala Kantor Imigrasi yang wilayah kerjanya meliputi tempat tinggal Orang Asing."
        ],
        "Persyaratan Dokumen": [
          "Mengisi formulir aplikasi data (dapat diunduh atau disediakan di Kantor Imigrasi).",
          "Paspor Kebangsaan yang sah dan masih berlaku (Asli dan Fotokopi).",
          "Surat penjaminan dari Penjamin (bermaterai), kecuali bagi WNA yang berkunjung untuk tujuan wisata.",
          "KTP Penjamin (Fotokopi).",
          "Tiket kembali atau tiket terusan untuk melanjutkan perjalanan ke negara lain."
        ],
        "Proses Permohonan": [
          "1. Penerimaan dan pemeriksaan berkas permohonan.",
          "2. Pembayaran biaya imigrasi sesuai tarif PNBP.",
          "3. Pengambilan foto dan sidik jari (jika diperlukan).",
          "4. Wawancara (jika diperlukan).",
          "5. Persetujuan Kepala Kantor Imigrasi.",
          "6. Penerbitan Perpanjangan ITK."
        ],
        "Waktu Proses dan Penyelesaian": [
          "Penyelesaian permohonan perpanjangan ITK adalah 3 (tiga) hari kerja sejak pembayaran PNBP dilakukan."
        ],
        "Biaya": [
          "Perpanjangan ITK masa berlaku 30 hari: Rp 500.000",
          "Perpanjangan ITK masa berlaku 60 hari: Rp 750.000"
        ]
      },
      "Perpanjangan ITAS": {
        "Informasi Umum": [
          "Izin Tinggal Terbatas (ITAS) diberikan kepada WNA yang masuk wilayah Indonesia dengan Visa Tinggal Terbatas (VITAS) atau alih status dari ITK.",
          "Perpanjangan ITAS diberikan oleh Kepala Kantor Imigrasi dengan jangka waktu paling lama 1 (satu) atau 2 (dua) tahun setiap kali perpanjangan."
        ],
        "Persyaratan Dokumen": [
          "Surat permohonan dari Penjamin / Sponsor.",
          "Surat jaminan dari Penjamin dan Fotokopi KTP Penjamin.",
          "Paspor Kebangsaan yang sah dan masih berlaku.",
          "Dokumen pendukung sesuai maksud dan tujuan (contoh: IMTA dari Kemenaker untuk TKA, Surat Keterangan Mahasiswa untuk pelajar, atau Buku Nikah untuk penyatuan keluarga)."
        ],
        "Proses Permohonan": [
          "1. Pemohon mengajukan permohonan melalui loket layanan Izin Tinggal Kantor Imigrasi.",
          "2. Pemeriksaan kelengkapan dokumen.",
          "3. Pembayaran biaya PNBP.",
          "4. Pengambilan data biometrik (foto dan sidik jari).",
          "5. Proses penyelesaian dan penerbitan ITAS elektronik (e-ITAS)."
        ],
        "Waktu Proses dan Penyelesaian": [
          "Waktu penyelesaian perpanjangan ITAS adalah maksimal 3 (tiga) hari kerja setelah pengambilan foto dan sidik jari."
        ],
        "Biaya": [
          "ITAS masa berlaku paling lama 6 (enam) bulan: Rp 1.000.000",
          "ITAS masa berlaku paling lama 1 (satu) tahun: Rp 1.500.000",
          "ITAS masa berlaku paling lama 2 (dua) tahun: Rp 2.000.000"
        ]
      },
      "Perpanjangan ITAP": {
        "Informasi Umum": [
          "Izin Tinggal Tetap (ITAP) diberikan untuk jangka waktu 5 (lima) tahun dan dapat diperpanjang untuk jangka waktu tidak terbatas.",
          "Permohonan perpanjangan ITAP diajukan dalam jangka waktu paling cepat 3 (tiga) bulan dan paling lama pada hari kerja sebelum ITAP berakhir."
        ],
        "Persyaratan Dokumen": [
          "Mengisi formulir aplikasi.",
          "Paspor kebangsaan yang sah dan masih berlaku.",
          "ITAP lama yang akan diperpanjang.",
          "Surat keterangan domisili dari instansi berwenang.",
          "Fotokopi KTP Penjamin dan Kartu Keluarga (jika ada penjamin).",
          "Dokumen pendukung lain yang relevan sesuai tujuan tinggal."
        ],
        "Proses Permohonan": [
          "1. Penyerahan berkas persyaratan.",
          "2. Pengambilan data biometrik.",
          "3. Pembayaran biaya perpanjangan ITAP.",
          "4. Verifikasi dokumen dan persetujuan dari Direktur Jenderal Imigrasi melalui Kanwil Kemenkumham.",
          "5. Penerbitan perpanjangan ITAP."
        ],
        "Biaya": [
          "Perpanjangan ITAP jangka waktu tidak terbatas: Rp 10.000.000"
        ]
      },
      "Alih Status ITK-ITAS": {
        "Informasi Umum": [
          "Orang Asing pemegang Izin Tinggal Kunjungan (ITK) dapat mengalihstatuskan izin tinggalnya menjadi Izin Tinggal Terbatas (ITAS).",
          "Permohonan alih status ITK menjadi ITAS diajukan dalam waktu paling lama 30 (tiga puluh) hari sebelum masa berlaku ITK berakhir."
        ],
        "Persyaratan Dokumen": [
          "Paspor Kebangsaan yang sah dan masih berlaku.",
          "Bukti pendaftaran dan surat penjaminan dari Penjamin.",
          "Dokumen persyaratan khusus sesuai dengan tujuan tinggal (contoh: Rekomendasi Kementerian terkait, akta nikah, dsb)."
        ],
        "Proses Permohonan": [
          "1. Pemohon mendaftarkan permohonan secara online atau langsung di Kantor Imigrasi.",
          "2. Verifikasi dokumen dan penerbitan pengantar pembayaran PNBP.",
          "3. Pengambilan biometrik.",
          "4. Persetujuan Kepala Kantor Imigrasi dan penerbitan e-ITAS."
        ]
      },
      "Alih Status ITAS-ITAP": {
        "Informasi Umum": [
          "Pemegang ITAS dapat mengajukan alih status menjadi ITAP setelah tinggal sekurang-kurangnya 3 (tiga) tahun berturut-turut di Indonesia.",
          "Bagi ITAS penyatuan keluarga (suami/istri WNI), dapat dialihstatuskan setelah usia pernikahan mencapai 2 (dua) tahun."
        ],
        "Persyaratan Dokumen": [
          "Surat permohonan dari Penjamin.",
          "Paspor Kebangsaan dan ITAS yang sah dan masih berlaku.",
          "Surat Keterangan Tempat Tinggal (SKTT) dari Dinas Kependudukan.",
          "Surat Keterangan Catatan Kepolisian (SKCK).",
          "Buku nikah (bagi penyatuan keluarga dengan WNI) atau dokumen tenaga kerja/investasi."
        ],
        "Biaya": [
          "Biaya Alih Status ITAS ke ITAP (5 Tahun): Rp 5.000.000",
          "Izin Masuk Kembali (IMK) 2 Tahun: Rp 1.750.000"
        ]
      },
      "Pemberian ITAP Tanpa Alih Status": {
        "Informasi Umum": [
          "Dalam kondisi tertentu sesuai peraturan perundang-undangan (misalnya subjek anak berkewarganegaraan ganda atau eks-WNI), WNA dapat diberikan ITAP secara langsung tanpa melalui tahapan alih status dari ITAS terlebih dahulu."
        ],
        "Persyaratan Dokumen": [
          "Paspor Kebangsaan.",
          "Bukti pengembalian dokumen keimigrasian RI (bagi eks-WNI) atau akta kelahiran (bagi anak berkewarganegaraan ganda)."
        ]
      },
      "Pelaporan ITAP": {
        "Informasi Umum": [
          "Orang Asing pemegang Izin Tinggal Tetap dengan jangka waktu tidak terbatas wajib melapor setiap 5 tahun sekali kepada Kepala Kantor Imigrasi yang wilayah kerjanya meliputi tempat tinggal Orang Asing."
        ],
        "Persyaratan Dokumen": [
          "Persyaratan Umum: Paspor Kebangsaan yang sah dan masih berlaku, serta Izin Tinggal Tetap (ITAP).",
          "Persyaratan Khusus: Bukti keabsahan perusahaan/pekerjaan, bukti rekening terbaru, atau dokumen relevan lain yang menguatkan maksud menetap di Indonesia."
        ],
        "Proses Permohonan": [
          "1. Penerimaan pelaporan Izin Tinggal Tetap.",
          "2. Pengambilan foto.",
          "3. Persetujuan Kepala Kantor Imigrasi.",
          "4. Penerbitan Izin Tinggal Tetap dengan tanggal pelaporan baru."
        ],
        "Waktu Proses dan Penyelesaian": [
          "Permohonan diteruskan oleh Kepala Kantor Imigrasi ke Direktur Jenderal Imigrasi dalam jangka waktu paling lama 3 hari kerja.",
          "Izin Tinggal Tetap virtual dikirimkan secara elektronik kepada Orang Asing/Penjamin."
        ],
        "Biaya": [
          "Tidak dikenakan biaya (Rp 0)."
        ],
        "Dasar Hukum": [
          "1. Peraturan Menteri Hukum dan HAM RI Nomor 22 Tahun 2023 tentang Visa dan Izin Tinggal.",
          "2. Peraturan Menteri Keuangan RI Nomor 9/PMK.02/2022 tentang Jenis dan Tarif PNBP Pelayanan Keimigrasi."
        ]
      }
    }
  },
  EN: {
    hero: { title: "Immigration Stay Permit", sub: "Immigration Facilities for Foreign Nationals" },
    ui: { 
      catTitle: "Provisions", 
      catDesc: "Select a stay permit service below to view complete information, requirements, and procedures.",
      detailBadge: "Service Details"
    },
    categories: [
      "Perpanjangan ITK", 
      "Perpanjangan ITAS", 
      "Perpanjangan ITAP", 
      "Alih Status ITK-ITAS", 
      "Alih Status ITAS-ITAP", 
      "Pemberian ITAP Tanpa Alih Status", 
      "Pelaporan ITAP"
    ],
    content: {
      "Perpanjangan ITK": {
        "Informasi Umum": [
          "Visit Stay Permit (ITK) is granted to Foreigners entering Indonesian territory with a Visit Visa.",
          "ITK extensions can be granted up to 4 (four) consecutive times, with each extension valid for a maximum of 30 days."
        ],
        "Persyaratan Dokumen": [
          "Application form.",
          "Valid National Passport.",
          "Guarantee letter from Guarantor.",
          "Guarantor's ID Card (KTP)."
        ],
        "Proses Permohonan": [
          "1. Document submission.",
          "2. Payment of immigration fees.",
          "3. Biometric data collection (if required).",
          "4. Approval and issuance."
        ],
        "Waktu Proses dan Penyelesaian": ["3 (three) working days after payment is confirmed."],
        "Biaya": ["30-day extension: Rp 500,000", "60-day extension: Rp 750,000"]
      },
      "Perpanjangan ITAS": {
        "Informasi Umum": ["Limited Stay Permit (ITAS) is granted to foreigners holding a VITAS or those changing status from ITK."],
        "Persyaratan Dokumen": ["Guarantor letter", "Valid Passport", "Supporting documents based on purpose of stay."],
        "Proses Permohonan": ["1. Submit application.", "2. Verification.", "3. Payment.", "4. Biometrics.", "5. e-ITAS issuance."],
        "Waktu Proses dan Penyelesaian": ["Max 3 working days after biometrics."],
        "Biaya": ["6 months: Rp 1,000,000", "1 year: Rp 1,500,000", "2 years: Rp 2,000,000"]
      },
      "Perpanjangan ITAP": {
        "Informasi Umum": ["Permanent Stay Permit (ITAP) is valid for 5 years and can be extended for an unlimited period."],
        "Persyaratan Dokumen": ["Application form", "Valid passport", "Current ITAP", "Domicile letter"],
        "Proses Permohonan": ["1. Submission", "2. Biometrics", "3. Payment", "4. Verification by Regional Office/Dirjen", "5. Issuance"],
        "Biaya": ["Unlimited duration ITAP extension: Rp 10,000,000"]
      },
      "Alih Status ITK-ITAS": {
        "Informasi Umum": ["Foreigners holding ITK can apply to change their status to ITAS. Must be applied at least 30 days before ITK expires."],
        "Persyaratan Dokumen": ["Valid Passport", "Guarantor letter", "Specific requirement documents (e.g., Marriage certificate, Ministry recommendation)."],
        "Proses Permohonan": ["1. Online/Offline Registration", "2. Payment", "3. Biometrics", "4. e-ITAS issuance"]
      },
      "Alih Status ITAS-ITAP": {
        "Informasi Umum": ["ITAS holders can apply for ITAP after living consecutively for 3 years in Indonesia."],
        "Persyaratan Dokumen": ["Guarantor letter", "Valid Passport and ITAS", "Police Certificate (SKCK)", "Supporting documents"],
        "Biaya": ["Change to ITAP (5 Years): Rp 5,000,000", "Re-entry Permit (IMK) 2 Years: Rp 1,750,000"]
      },
      "Pemberian ITAP Tanpa Alih Status": {
        "Informasi Umum": ["Under specific conditions (e.g., ex-Indonesian citizens or dual citizenship children), ITAP can be granted directly without prior ITAS."],
        "Persyaratan Dokumen": ["Valid Passport", "Proof of return of RI documents or birth certificate."]
      },
      "Pelaporan ITAP": {
        "Informasi Umum": ["Foreigners holding an unlimited Permanent Stay Permit must report every 5 years to the Immigration Office."],
        "Persyaratan Dokumen": ["Valid Passport and ITAP", "Proof of corporate legitimacy, recent bank statements, or other relevant documents."],
        "Proses Permohonan": ["1. Submit report", "2. Photo taking", "3. Approval", "4. Issuance of new report date"],
        "Waktu Proses dan Penyelesaian": ["Forwarded to Directorate General within 3 days. Virtual ITAP delivered electronically."],
        "Biaya": ["No charge (Rp 0)."],
        "Dasar Hukum": ["Permenkumham No. 22 Year 2023 on Visas and Stay Permits.", "Ministry of Finance Regulation No. 9/PMK.02/2022."]
      }
    }
  }
};

export default function LayananIzinTinggal() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = izinTinggalData[lang as 'ID' | 'EN'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // STATE TABS & KATEGORI
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai Izin Tinggal Keimigrasian?' : 'Hello! Need help with Immigration Stay Permits?' }]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambil Data Kategori Aktif
  const activeCategoryName = t.categories[activeCategoryIndex];
  const activeContent = (t.content as any)[activeCategoryName];

  // Buka semua section secara default tiap kali kategori berubah
  useEffect(() => {
    if (activeContent) {
      setExpandedSections(Object.keys(activeContent));
    }
  }, [activeCategoryIndex, lang]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => 
      prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#0b162c]/90 backdrop-blur-md shadow-lg py-3' : 'bg-[#0b162c] shadow-md'}`}>
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            <div className="w-11 h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 hover:rotate-12 transition-transform duration-300"><Shield className="w-5 h-5 text-yellow-500" /></div>
            <div className="w-11 h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center hover:-rotate-12 transition-transform duration-300"><Globe className="w-5 h-5 text-teal-500" /></div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[14px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[11px] font-bold text-[#eab308] tracking-wider mt-0.5">TANGERANG</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] transition-transform">{ui.home}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center group">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 z-10 pointer-events-none group-focus-within:text-yellow-400 transition-colors" />
                <input type="text" placeholder={ui.search} className="relative pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[200px] transition-all duration-300 text-sm" />
            </div>
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2 rounded-full transition-all duration-300">
                <Languages className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold text-white">{lang}</span><ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute right-0 mt-3 w-36 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100 transform origin-top-right transition-all duration-300 ease-out ${isLangOpen ? 'scale-100 opacity-100 visible translate-y-0' : 'scale-95 opacity-0 invisible -translate-y-2'}`}>
                <button onClick={() => { setLang('ID'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors ${lang === 'ID' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇮🇩</span> <span>Indonesia</span></button>
                <button onClick={() => { setLang('EN'); setIsLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-3 transition-colors border-t border-gray-50 ${lang === 'EN' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}><span className="text-lg">🇬🇧</span> <span>English</span></button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative bg-[#1e293b] pt-28 pb-10 px-6 lg:px-12 xl:px-24">
        {/* Latar Belakang Hero */}
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=2070" className="w-full h-full object-cover opacity-25" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">{t.hero.sub}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up delay-100">
          
          {/* PANEL KIRI: MENU KATEGORI */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-28 z-20">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Info className="w-5 h-5" /></div>
              <h3 className="font-extrabold text-xl text-[#1e293b]">{t.ui.catTitle}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-1 leading-relaxed">{t.ui.catDesc}</p>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex flex-col space-y-2">
              {t.categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); }} 
                  className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeCategoryIndex === idx ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <span className="font-bold text-sm leading-tight pr-2">{cat}</span>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${activeCategoryIndex === idx ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm focus:outline-none transition-all duration-300">
                <span className="font-extrabold text-base leading-tight pr-2">{activeCategoryName}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-40 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="py-2 bg-gray-50/50">
                  {t.categories.map((cat, idx) => (
                    <button key={idx} onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); }} className={`w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-blue-100 transition-colors ${activeCategoryIndex === idx ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700'}`}>
                      <span className="font-bold text-sm leading-tight pr-2">{cat}</span>
                      {activeCategoryIndex === idx && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL KANAN: DETAIL KONTEN (ACCORDION) */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
            <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-extrabold text-2xl md:text-3xl text-[#1e293b] leading-tight">{activeCategoryName}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center self-start sm:self-auto flex-shrink-0"><FileText className="w-3.5 h-3.5 mr-1" /> {t.ui.detailBadge}</span>
            </div>

            <div className="space-y-4 animate-fade-in" key={activeCategoryIndex}>
              {Object.entries(activeContent || {}).map(([key, listData]) => {
                const isExpanded = expandedSections.includes(key);
                const items = listData as string[]; // Assertion array string
                
                return (
                  <div key={key} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-400 ring-4 ring-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                    <button onClick={() => toggleSection(key)} className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white group">
                      <span className={`font-extrabold text-lg leading-snug pr-4 transition-colors ${isExpanded ? 'text-blue-700' : 'text-[#1e293b] group-hover:text-blue-600'}`}>
                        {key}
                      </span>
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-blue-100' : 'bg-gray-50'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-700' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out origin-top ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30">
                        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 font-medium">
                          {items.map((item, i) => (
                            <li key={i} className="pl-1 mb-2 leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FAB: Animasi Pop Mulus */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isCsOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h4 className="font-extrabold text-sm text-[#1e293b]">{lang === 'ID' ? 'Layanan Bantuan' : 'Help Center'}</h4>
              <button onClick={() => setIsCsOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 rounded-full p-1 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              {/* Call Center */}
              <a href="tel:02155790871" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-blue-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Phone className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">Call Center</p><p className="text-xs text-gray-500 font-medium">(021) 5579 0871</p></div>
              </a>
              
              {/* WhatsApp */}
              <a href="https://wa.me/628114119000" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-green-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500 font-medium">0811 411 9000</p></div>
              </a>
              
              {/* Web Lapor */}
              <a href="https://www.lapor.go.id/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-orange-50 text-gray-700 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors"><Globe className="w-4 h-4" /></div>
                <div><p className="font-extrabold text-xs text-gray-900">Web Lapor</p><p className="text-xs text-gray-500 font-medium">Sampaikan pengaduan</p></div>
              </a>
            </div>
          </div>
        </div>
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-6 h-6 text-white" /></div><div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div></div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-1.5 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}><div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{msg.text}</div></div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tanya sesuatu..." : "Ask something..."} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"/>
              <button type="submit" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform shadow-md flex-shrink-0"><Send className="w-5 h-5 ml-1" /></button>
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>{isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}</button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>{isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}{!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}</button>
        </div>
      </div>
    </div>
  );
}