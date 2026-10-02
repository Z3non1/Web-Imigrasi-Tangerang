import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronRight,
  Languages, X, Bot, MessageSquare, Send, Check, Info, FileText, CheckCircle2, Menu
} from 'lucide-react';

const passportData = {
  ID: {
    hero: { title: "Paspor Republik Indonesia", sub: "Pilih Jenis Permohonan:" },
    tabs: { new: "PERMOHONAN BARU", replace: "PENGGANTIAN" },
    ui: { 
      catTitle: "Ketentuan Pemohon", 
      catDesc: "Pilih kriteria yang sesuai dengan Anda untuk melihat detail persyaratan.",
      detailBadge: "Panduan Lengkap"
    },
    // DATA UNTUK PERMOHONAN BARU
    new: {
      categories: ["Masyarakat Umum", "Anak Dibawah 17 Tahun", "Anak Dwikenegaraan", "Calon Pekerja Migran Indonesia", "Haji Umroh", "Anak Yang Lahir Diluar Negeri"],
      sections: { info: "Informasi Umum", req: "Persyaratan", proc: "Prosedur", auth: "Mekanisme Pengesahan", cost: "Biaya" },
      content: {
        "Masyarakat Umum": {
          info: ["Permohonan paspor biasa dapat diajukan oleh warga negara Indonesia, baik di dalam maupun luar wilayah Indonesia.", "Paspor biasa terdiri atas paspor biasa elektronik (e-paspor) dan paspor biasa nonelektronik.", "Paspor biasa diterbitkan dengan menggunakan Sistem Informasi Manajemen Keimigrasian."],
          req: ["Kartu tanda penduduk (KTP) yang masih berlaku atau surat keterangan pindah ke luar negeri.", "Kartu keluarga (KK).", "Dokumen berupa akta kelahiran, akta perkawinan, buku nikah, ijazah, atau surat baptis.", "Surat pewarganegaraan Indonesia bagi Orang Asing yang memperoleh kewarganegaraan Indonesia.", "Surat penetapan ganti nama (bagi yang telah mengganti nama)."],
          proc: ["Lakukan pendaftaran melalui aplikasi M-Paspor yang dapat diunduh melalui App Store atau Google Play.", "Isi data di aplikasi yang disediakan pada loket permohonan dan lampirkan dokumen persyaratan.", "Tunggu Pejabat Imigrasi memeriksa dokumen kelengkapan.", "Dapatkan tanda terima permohonan dan kode pembayaran.", "Jika dokumen dinyatakan belum lengkap, terima dokumen permohonan yang dikembalikan."],
          auth: ["Pemeriksaan kelengkapan dan keabsahan persyaratan", "Pembayaran biaya paspor", "Pengambilan foto dan sidik jari", "Wawancara", "Verifikasi", "Adjudikasi"],
          cost: ["Paspor biasa non-elektronik (Masa Berlaku 5 Tahun): Rp 350.000", "Paspor biasa non-elektronik (Masa Berlaku 10 Tahun): Rp 650.000", "Paspor biasa elektronik (Masa Berlaku 5 Tahun): Rp 650.000", "Paspor biasa elektronik (Masa Berlaku 10 Tahun): Rp 950.000", "Layanan percepatan paspor selesai pada hari yang sama: Rp 1.000.000"]
        },
        "Anak Dibawah 17 Tahun": {
          info: ["Permohonan paspor biasa bagi anak WNI yang belum berusia 17 tahun diajukan oleh orang tua atau wali sah."],
          req: ["Kartu tanda penduduk (KTP) ayah atau ibu yang masih berlaku.", "Kartu keluarga (KK).", "Akta kelahiran atau surat baptis.", "Akta perkawinan atau buku nikah orang tua.", "Paspor biasa lama bagi yang telah memiliki paspor biasa."],
          proc: ["Lakukan pendaftaran melalui aplikasi M-Paspor oleh orang tua/wali.", "Isi data dan lampirkan dokumen pada loket.", "Tunggu pemeriksaan oleh Pejabat Imigrasi.", "Dapatkan tanda terima dan kode pembayaran."],
          auth: ["Pemeriksaan kelengkapan persyaratan", "Pembayaran biaya paspor", "Pengambilan foto & biometrik", "Wawancara (didampingi orang tua)"],
          cost: ["Paspor biasa nonelektronik 48 halaman: Rp 350.000", "Paspor biasa elektronik 48 halaman: Rp 650.000", "Layanan percepatan paspor: Rp 1.000.000"]
        },
        "Default": {
          info: ["Informasi spesifik menyesuaikan dengan kategori yang dipilih sesuai dengan Peraturan Keimigrasian terbaru."],
          req: ["KTP yang masih berlaku.", "Kartu Keluarga (KK).", "Dokumen pendukung sesuai dengan kategori pemohon."],
          proc: ["Pendaftaran antrean via M-Paspor.", "Penyerahan berkas di kantor imigrasi.", "Pengambilan biometrik dan wawancara."],
          auth: ["Pemeriksaan berkas", "Pembayaran", "Foto & Sidik Jari", "Wawancara", "Verifikasi"],
          cost: ["Paspor biasa nonelektronik: Rp 350.000", "Paspor biasa elektronik: Rp 650.000", "Layanan percepatan: Rp 1.000.000"]
        }
      }
    },
    // DATA UNTUK PENGGANTIAN PASPOR
    replace: {
      categories: ["Pengubahan Data Paspor", "Penggantian Paspor di Luar Negeri", "Paspor Akan Habis Masa Berlaku", "Paspor Rusak", "Paspor Hilang"],
      sections: { info: "Informasi Umum", req: "Persyaratan", proc: "Prosedur", auth: "Mekanisme Penerbitan", cost: "Biaya" },
      content: {
        "Pengubahan Data Paspor": {
          info: ["Perubahan data identitas diri pemegang paspor dapat diajukan kepada Kepala Kantor Imigrasi atau Pejabat Imigrasi.", "Perubahan meliputi nama, tempat tanggal lahir, atau jenis kelamin."],
          req: ["Paspor lama.", "Kartu tanda penduduk (KTP) dan kartu keluarga (KK).", "Dokumen lain yang dikeluarkan oleh instansi pemerintah sebagai dasar perubahan data paspor, seperti surat penetapan pengadilan, akta kelahiran, surat nikah, atau dokumen sejenis."],
          proc: ["Anda melakukan pengajuan permohonan.", "Anda mendapatkan persetujuan Kepala Kantor Imigrasi atau Pejabat Imigrasi.", "Anda mendapatkan persetujuan Direktur Jenderal Imigrasi.", "Paspor baru Anda diterbitkan."],
          auth: ["Serahkan berkas persyaratan (asli dan fotokopi) serta Perdim 11 yang telah diisi lengkap kepada petugas loket.", "Petugas akan memproses perubahan data paspor.", "Pejabat Imigrasi akan menyetujui perubahan data paspor.", "Petugas akan mencetak paspor baru Anda setelah mendapatkan persetujuan.", "Paspor baru yang telah selesai akan diberikan kepada Anda."],
          cost: ["Pelayanan ini dikenakan biaya penggantian paspor (Sesuai dengan tarif PNBP paspor biasa atau elektronik yang dipilih)."]
        },
        "Paspor Hilang": {
          info: ["Penggantian paspor biasa dapat diajukan jika memenuhi salah satu dari persyaratan: masa berlakunya akan habis, rusak, atau hilang.", "Penggantian paspor hilang memerlukan proses Berita Acara Pemeriksaan (BAP) oleh petugas imigrasi."],
          req: ["Surat lapor kehilangan dari kepolisian setempat.", "Kartu tanda penduduk (KTP) yang masih berlaku.", "Kartu keluarga (KK).", "Akta lahir / Ijazah / Buku Nikah.", "Tambahan: Surat keterangan dari kelurahan (jika hilang karena musibah/keadaan kahar)."],
          proc: ["Datang Ke Kantor Imigrasi Terdekat.", "Isi data pada loket permohonan dan lampirkan dokumen kelengkapan.", "Tunggu Pejabat Imigrasi memeriksa dokumen permohonan dalam Berita Acara Pemeriksaan (BAP).", "BAP disampaikan kepada Kepala Kantor Imigrasi untuk pertimbangan.", "Jika disetujui, Pejabat Imigrasi akan mengganti paspor setelah Anda melakukan pembayaran."],
          auth: ["Jika hilang karena musibah (kebakaran, banjir, gempa), dapat diberikan penggantian langsung.", "Jika hilang karena unsur kurang hati-hati, diberikan penggantian paspor biasa.", "Jika hilang karena unsur kecerobohan atau kelalaian, pemberian paspor biasa dapat ditangguhkan minimal 6 bulan sampai maksimal 2 tahun."],
          cost: ["Biaya beban paspor hilang: Rp 1.000.000", "Paspor Biasa Non Elektronik (48 Halaman): Rp 350.000", "Paspor Biasa Elektronik (48 Halaman): Rp 650.000"]
        },
        "Paspor Rusak": {
          info: ["Paspor dinyatakan rusak jika pada saat proses penerbitan atau setelahnya (robek, basah, terbakar, tercoret) sehingga keterangan di dalamnya menjadi tidak jelas atau memberi kesan tidak pantas sebagai dokumen resmi."],
          req: ["Paspor lama yang rusak.", "Kartu tanda penduduk (KTP) yang masih berlaku.", "Kartu keluarga (KK).", "Akta lahir / Ijazah / Buku Nikah."],
          proc: ["Datang Ke Kantor Imigrasi.", "Penyerahan berkas dan paspor yang rusak di loket permohonan.", "Proses Berita Acara Pemeriksaan (BAP) oleh Pejabat Imigrasi untuk mengetahui penyebab kerusakan.", "Persetujuan Kepala Kantor Imigrasi.", "Pembayaran biaya dan denda (jika disebabkan kelalaian)."],
          auth: ["Sama seperti paspor hilang, Pejabat akan menilai apakah kerusakan terjadi karena musibah (keadaan kahar) atau karena kelalaian/kecerobohan pemegang paspor."],
          cost: ["Biaya beban paspor rusak: Rp 500.000", "Paspor Biasa Non Elektronik: Rp 350.000", "Paspor Biasa Elektronik: Rp 650.000", "Catatan: Biaya beban Rp 0 jika rusak karena keadaan kahar (banjir, gempa, kebakaran)."]
        },
        "Default": {
          info: ["Penggantian paspor dapat dilakukan melalui aplikasi M-Paspor (jika perpanjangan biasa) atau langsung ke kantor imigrasi (jika BAP/Hilang/Rusak)."],
          req: ["KTP Elektronik.", "Kartu Keluarga (KK).", "Paspor lama."],
          proc: ["Daftar antrean via M-Paspor atau datang langsung sesuai jenis layanan.", "Penyerahan berkas, biometrik, dan wawancara."],
          auth: ["Pemeriksaan berkas", "Pembayaran", "Foto & Sidik Jari", "Wawancara", "Verifikasi"],
          cost: ["Paspor Biasa Non-Elektronik: Rp 350.000", "Paspor Biasa Elektronik: Rp 650.000"]
        }
      }
    }
  },
  EN: {
    hero: { title: "Indonesian Republic Passport", sub: "Select Application Type:" },
    tabs: { new: "NEW APPLICATION", replace: "REPLACEMENT" },
    ui: { 
      catTitle: "Applicant Category", 
      catDesc: "Select the criteria that applies to you to view detailed requirements.",
      detailBadge: "Complete Guide"
    },
    new: {
      categories: ["General Public", "Children Under 17", "Dual Citizenship Children", "Indonesian Migrant Workers", "Hajj / Umrah", "Children Born Overseas"],
      sections: { info: "General Information", req: "Requirements", proc: "Procedures", auth: "Authentication Mechanism", cost: "Fees" },
      content: {
        "General Public": {
          info: ["Standard passport applications can be submitted by Indonesian citizens, both inside and outside Indonesian territory.", "Standard passports consist of electronic (e-passport) and non-electronic passports."],
          req: ["Valid ID Card (KTP).", "Family Card (KK).", "Birth certificate, marriage certificate, or diploma.", "Name change decree (if applicable)."],
          proc: ["Register via the M-Paspor app.", "Submit documents at the immigration counter.", "Wait for document verification.", "Make the payment using the provided code."],
          auth: ["Document Verification", "Payment", "Biometric Data Collection", "Interview", "Final Adjudication"],
          cost: ["Non-electronic passport (5 Years): Rp 350,000", "Electronic passport (5 Years): Rp 650,000", "Same-day expedited service: Rp 1,000,000"]
        },
        "Default": {
          info: ["Specific information tailored to the selected category according to the latest Immigration Regulations."],
          req: ["Valid ID Card.", "Family Card.", "Supporting documents as required."],
          proc: ["Queue registration via M-Paspor.", "Document submission at the office.", "Biometrics and interview."],
          auth: ["Document Verification", "Payment", "Biometrics", "Interview", "Verification"],
          cost: ["Non-electronic passport: Rp 350,000", "Electronic passport: Rp 650,000", "Expedited service: Rp 1,000,000"]
        }
      }
    },
    replace: {
      categories: ["Data Alteration", "Overseas Replacement", "Expiring Passport", "Damaged Passport", "Lost Passport"],
      sections: { info: "General Information", req: "Requirements", proc: "Procedures", auth: "Issuance Mechanism", cost: "Fees" },
      content: {
        "Data Alteration": {
          info: ["Changes to personal identity data can be submitted to the Head of the Immigration Office.", "Changes include name, place/date of birth, or gender."],
          req: ["Old passport.", "Valid ID Card and Family Card.", "Court decree or supporting documents for the change."],
          proc: ["Submit the application.", "Wait for approval from the Head of Immigration and Director General.", "New passport is issued."],
          auth: ["Submit documents to the counter.", "Officer processes the data change.", "New passport is printed after approval."],
          cost: ["Standard passport replacement fees apply."]
        },
        "Default": {
          info: ["Passport replacement procedures depend on the cause (expiring, lost, or damaged)."],
          req: ["Valid ID Card.", "Family Card.", "Old Passport (or Police Report if lost)."],
          proc: ["Register via M-Paspor or walk-in for BAP cases.", "Submit documents, biometrics, and interview."],
          auth: ["Document Verification", "Payment", "Biometrics", "Interview"],
          cost: ["Non-electronic passport: Rp 350,000", "Electronic passport: Rp 650,000", "Lost fine: Rp 1,000,000", "Damaged fine: Rp 500,000"]
        }
      }
    }
  }
};

export default function LayananPaspor() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = passportData[lang as 'ID' | 'EN'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  // STATE TABS & KATEGORI
  const [activeTab, setActiveTab] = useState<'new' | 'replace'>('new');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('info');

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai paspor?' : 'Hello! Need help with passports?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk mengubah Tab (Otomatis me-reset index kategori ke 0)
  const handleTabChange = (tab: 'new' | 'replace') => {
    setActiveTab(tab);
    setActiveCategoryIndex(0);
    setExpandedSection('info');
    setIsDropdownOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  // Logika pengambilan data dinamis berdasarkan Tab yang aktif
  const currentTabData = t[activeTab];
  const activeCategoryName = currentTabData.categories[activeCategoryIndex];
  const activeContent = currentTabData.content[activeCategoryName as keyof typeof currentTabData.content] || currentTabData.content["Default"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR GLASSMORPHISM */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#0b162c]/90 backdrop-blur-md shadow-lg py-3' : 'bg-[#0b162c] shadow-md'}`}>
              
              {/* KIRI: Logo & Judul */}
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 hover:rotate-12 transition-transform duration-300"><Shield className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" /></div>
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center hover:-rotate-12 transition-transform duration-300"><Globe className="w-4 h-4 md:w-5 md:h-5 text-teal-500" /></div>
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-[11px] md:text-[14px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS</div>
                  <div className="text-[9px] md:text-[11px] font-bold text-[#eab308] tracking-wider mt-0.5">NON TPI TANGERANG</div>
                </div>
              </div>
              
              {/* KANAN (DESKTOP): Menu, Search, Lang (Otomatis Hilang di HP) */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Informasi Publik' : 'Public Info'}</Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Berita' : 'News'}</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">{lang === 'ID' ? 'Tentang Kami' : 'About Us'}</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] hover:-translate-y-0.5 transition-transform duration-300">FAQ</Link>
          </div>
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center group">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 z-10 pointer-events-none group-focus-within:text-yellow-400 transition-colors" />
                    <input type="text" placeholder={lang === 'ID' ? 'Cari...' : 'Search...'} className="relative pl-10 pr-4 py-2 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-yellow-500 w-[160px] focus:w-[200px] transition-all duration-300 text-sm" />
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
      
              {/* KANAN (MOBILE): Tombol Hamburger (Hanya Muncul di HP) */}
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white hover:text-yellow-400 focus:outline-none p-2 bg-white/5 rounded-xl border border-white/10">
                <Menu className="w-6 h-6" />
              </button>
      
              {/* ================= MOBILE SIDEBAR MENU ================= */}
              {/* Latar Hitam Transparan */}
              <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
              
              {/* Kotak Sidebar dari Kanan */}
              <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0b162c] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <span className="text-yellow-400 font-extrabold tracking-widest text-sm uppercase">Navigasi</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-2 transition-colors"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Mobile Search */}
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-gray-400 absolute left-4 z-10 pointer-events-none" />
                    <input type="text" placeholder={lang === 'ID' ? 'Cari...' : 'Search...'} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500 text-sm" />
                  </div>
      
                  {/* Mobile Links */}
                  <div className="flex flex-col space-y-5">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">{lang === 'ID' ? 'Beranda' : 'Home'}</Link>
                    <Link to="/informasi-publik" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Informasi Publik</Link>
                    <Link to="/berita" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Berita</Link>
                    <Link to="/tentang-kami" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">Tentang Kami</Link>
                    <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-yellow-400 font-bold text-sm tracking-wide">FAQ</Link>
                  </div>
      
                  {/* Mobile Language Toggle */}
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 block">Ganti Bahasa / Language</span>
                    <div className="flex space-x-3">
                      <button onClick={() => { setLang('ID'); setIsMobileMenuOpen(false); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'ID' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>ID 🇮🇩</button>
                      <button onClick={() => { setLang('EN'); setIsMobileMenuOpen(false); }} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${lang === 'EN' ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}>EN 🇬🇧</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ================= END MOBILE SIDEBAR ================= */}
      
            </nav>

      {/* HERO SECTION DENGAN TAB */}
      <div className="relative bg-[#1e293b] pt-28 pb-6 px-6 lg:px-12 xl:px-24">
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1559589689-577aabd1ce4c?q=80&w=2070" className="w-full h-full object-cover opacity-20" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">{t.hero.title}</h1>
          
          <div>
            <p className="text-gray-300 text-sm font-bold mb-3 uppercase tracking-wider">{t.hero.sub}</p>
            <div className="flex space-x-4">
              <button onClick={() => handleTabChange('new')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${activeTab === 'new' ? 'bg-blue-600 text-white scale-105' : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'}`}>{t.tabs.new}</button>
              <button onClick={() => handleTabChange('replace')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${activeTab === 'replace' ? 'bg-blue-600 text-white scale-105' : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'}`}>{t.tabs.replace}</button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up delay-100">
          
          {/* PANEL KIRI: KATEGORI PEMOHON */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 lg:sticky lg:top-28 z-20">
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Info className="w-5 h-5" /></div>
              <h3 className="font-extrabold text-xl text-[#1e293b]">{t.ui.catTitle}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-6 ml-1 leading-relaxed">{t.ui.catDesc}</p>
            
            {/* Desktop Menu (List) */}
            <div className="hidden lg:flex flex-col space-y-2">
              {currentTabData.categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setActiveCategoryIndex(idx); setExpandedSection('info'); }} 
                  className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeCategoryIndex === idx ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <span className="font-bold text-sm">{cat}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeCategoryIndex === idx ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu (Dropdown Bouncy) */}
            <div className="lg:hidden relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm focus:outline-none transition-all duration-300">
                <span className="font-extrabold text-base">{activeCategoryName}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-40 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="py-2 bg-gray-50/50">
                  {currentTabData.categories.map((cat, idx) => (
                    <button key={idx} onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); setExpandedSection('info'); }} className={`w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-blue-100 transition-colors ${activeCategoryIndex === idx ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700'}`}>
                      <span className="font-bold text-sm">{cat}</span>
                      {activeCategoryIndex === idx && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL KANAN: DETAIL KONTEN (AKORDION DINAMIS) */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
            <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-extrabold text-2xl md:text-3xl text-[#1e293b] leading-tight">{activeCategoryName}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center self-start sm:self-auto flex-shrink-0"><FileText className="w-3.5 h-3.5 mr-1" /> {t.ui.detailBadge}</span>
            </div>

            <div className="space-y-4 animate-fade-in" key={activeTab + activeCategoryIndex}>
              {Object.entries(currentTabData.sections).map(([key, title]) => {
                const contentData = activeContent[key as keyof typeof activeContent];
                const isExpanded = expandedSection === key;
                
                return (
                  <div key={key} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-400 ring-4 ring-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                    <button onClick={() => setExpandedSection(isExpanded ? null : key)} className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white group">
                      <span className={`font-extrabold text-lg transition-colors ${isExpanded ? 'text-blue-700' : 'text-[#1e293b] group-hover:text-blue-600'}`}>{title}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-blue-100' : 'bg-gray-50'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-700' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    <div className={`transition-all duration-400 ease-in-out origin-top ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30">
                        <ul className="list-decimal list-outside ml-4 space-y-3 text-gray-700 font-medium leading-relaxed">
                          {contentData.map((item: string, i: number) => (
                            <li key={i} className="pl-1">{item}</li>
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
      <Footer />
    </div>
  );
}