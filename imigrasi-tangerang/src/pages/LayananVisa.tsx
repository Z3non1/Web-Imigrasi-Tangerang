import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer'; // Sesuaikan path ini jika lokasinya berbeda
import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, 
  Languages, X, Bot, MessageSquare, Send, CheckCircle2, CreditCard, FileText, HelpCircle, Map, Clock
} from 'lucide-react';

const visaData = {
  ID: {
    hero: { title: "Daftar Visa Indonesia", sub: "Layanan Keimigrasian untuk Warga Negara Asing" },
    sidebar: {
      about: "Tentang Visa",
      categories: "Kategori Visa Utama",
      requirements: "Syarat dan Dokumen",
      fees: "Biaya PNBP",
      apply: "Cara Mengajukan",
      extension: "Perpanjangan Visa"
    },
    content: {
      about: {
        title: "Tentang Visa Indonesia",
        desc: "Visa Republik Indonesia adalah keterangan tertulis yang diberikan oleh Pejabat yang Berwenang di Perwakilan Republik Indonesia atau di tempat lain yang ditetapkan oleh Pemerintah Republik Indonesia, yang memuat persetujuan bagi Orang Asing untuk melakukan perjalanan ke Wilayah Indonesia dan menjadi dasar untuk pemberian Izin Tinggal. Saat ini Indonesia menerapkan sistem e-Visa untuk memudahkan WNA mengajukan visa secara daring."
      },
      categories: {
        title: "Kategori Visa Utama",
        items: [
          { name: "Visa Kunjungan Saat Kedatangan (Visa on Arrival / VoA)", desc: "Diberikan kepada WNA dari negara subjek VoA untuk tujuan wisata, kunjungan pemerintahan, pembicaraan bisnis, pembelian barang, atau transit. Masa berlaku 30 hari." },
          { name: "Visa Kunjungan (Single Entry / Multiple Entry)", desc: "Untuk wisata, keluarga, bisnis, atau kegiatan sosial budaya. Single Entry berlaku untuk 1 kali kunjungan (maks 60 hari). Multiple Entry berlaku hingga 1 atau 5 tahun." },
          { name: "Visa Tinggal Terbatas (VITAS)", desc: "Diberikan untuk tujuan bekerja, penanaman modal (investor), penelitian, belajar, penyatuan keluarga, atau repatriasi. Memerlukan penjamin." },
          { name: "Visa Pelajar / Mahasiswa", desc: "Khusus untuk WNA yang akan menempuh pendidikan di lembaga pendidikan formal di Indonesia." }
        ]
      },
      requirements: {
        title: "Persyaratan Umum",
        items: [
          "Paspor kebangsaan yang masih berlaku minimal 6 (enam) bulan.",
          "Surat penjaminan dari Penjamin (kecuali untuk visa wisata tertentu).",
          "Bukti memiliki biaya hidup bagi dirinya dan/atau keluarganya selama berada di Wilayah Indonesia (rekening koran dengan saldo minimal US$ 2,000).",
          "Tiket kembali atau tiket terusan untuk melanjutkan perjalanan ke negara lain.",
          "Pasfoto berwarna terbaru.",
          "Dokumen pendukung lainnya sesuai dengan maksud dan tujuan kedatangan (seperti kontrak kerja untuk VITAS)."
        ]
      },
      fees: {
        title: "Biaya Pembuatan Visa",
        desc: "Biaya Penerimaan Negara Bukan Pajak (PNBP) menyesuaikan dengan jenis visa yang diajukan:",
        items: [
          { name: "Visa on Arrival (VoA)", price: "Rp 500.000" },
          { name: "Visa Kunjungan Satu Kali Perjalanan (Single Entry)", price: "US$ 50 (atau Rp 1.500.000 untuk eVisa tertentu)" },
          { name: "Visa Kunjungan Beberapa Kali Perjalanan (Multiple Entry - 1 Tahun)", price: "Rp 3.000.000" },
          { name: "Visa Tinggal Terbatas (VITAS)", price: "Mulai dari US$ 150" }
        ]
      },
      apply: {
        title: "Cara Mengajukan e-Visa",
        steps: [
          "Kunjungi portal resmi e-Visa Direktorat Jenderal Imigrasi di molina.imigrasi.go.id",
          "Buat akun pendaftar (Register) bagi penjamin atau WNA.",
          "Pilih jenis visa yang sesuai dengan tujuan kunjungan.",
          "Isi formulir aplikasi dan unggah dokumen persyaratan dalam format yang diminta (PDF/JPG).",
          "Lakukan pembayaran PNBP melalui kartu kredit (jaringan Visa/Mastercard) atau bank persepsi (Simponi).",
          "Jika disetujui, e-Visa akan dikirimkan langsung ke alamat email terdaftar."
        ]
      },
      extension: {
        title: "Perpanjangan Visa & Izin Tinggal",
        desc: "Sebagian besar visa seperti VoA dan Visa Kunjungan dapat diperpanjang (extend). Perpanjangan dapat dilakukan secara daring melalui website Molina atau datang langsung ke Kantor Imigrasi terdekat sebelum masa berlaku visa habis. Keterlambatan perpanjangan (overstay) akan dikenakan denda sebesar Rp 1.000.000 per hari."
      }
    }
  },
  EN: {
    hero: { title: "Indonesian Visa Registration", sub: "Immigration Services for Foreign Nationals" },
    sidebar: {
      about: "About Visa",
      categories: "Main Visa Categories",
      requirements: "Requirements & Documents",
      fees: "Visa Fees",
      apply: "How to Apply",
      extension: "Visa Extension"
    },
    content: {
      about: {
        title: "About Indonesian Visa",
        desc: "An Indonesian Visa is a written statement given by an Authorized Official at an Indonesian Representative or at other places determined by the Government, containing approval for Foreigners to travel into the Indonesian Territory and serves as the basis for granting Stay Permits. Indonesia currently implements an e-Visa system for easier online applications."
      },
      categories: {
        title: "Main Visa Categories",
        items: [
          { name: "Visa on Arrival (VoA / e-VoA)", desc: "Granted to foreigners from eligible countries for tourism, government visits, business meetings, purchasing goods, or transit. Valid for 30 days." },
          { name: "Visit Visa (Single Entry / Multiple Entry)", desc: "For tourism, family, business, or socio-cultural activities. Single Entry is valid for a maximum of 60 days. Multiple Entry is valid for up to 1 or 5 years." },
          { name: "Limited Stay Visa (VITAS)", desc: "Granted for the purpose of working, investment, research, study, family unification, or repatriation. Requires a guarantor/sponsor." },
          { name: "Student Visa", desc: "Specifically for foreigners who will pursue formal education at educational institutions in Indonesia." }
        ]
      },
      requirements: {
        title: "General Requirements",
        items: [
          "A valid national passport with a minimum validity of 6 (six) months.",
          "A guarantee letter from the Guarantor (except for certain tourist visas).",
          "Proof of living expenses for the applicant and/or family while in Indonesia (bank statement with a minimum balance of US$ 2,000).",
          "A return ticket or onward ticket to continue the journey to another country.",
          "Recent color passport photo.",
          "Other supporting documents according to the purpose of the visit (e.g., employment contract for VITAS)."
        ]
      },
      fees: {
        title: "Visa Fees",
        desc: "Non-Tax State Revenue (PNBP) fees depend on the type of visa applied for:",
        items: [
          { name: "Visa on Arrival (VoA)", price: "Rp 500,000" },
          { name: "Single Entry Visit Visa", price: "US$ 50 (or Rp 1,500,000 for certain e-Visas)" },
          { name: "Multiple Entry Visit Visa (1 Year)", price: "Rp 3,000,000" },
          { name: "Limited Stay Visa (VITAS)", price: "Starting from US$ 150" }
        ]
      },
      apply: {
        title: "How to Apply for e-Visa",
        steps: [
          "Visit the official e-Visa portal of the Directorate General of Immigration at molina.imigrasi.go.id",
          "Create a registered account for the guarantor or the foreign national.",
          "Select the visa type that matches your purpose of visit.",
          "Fill out the application form and upload the required documents in the requested format (PDF/JPG).",
          "Make the PNBP payment using a credit card (Visa/Mastercard network) or perception bank (Simponi).",
          "If approved, the e-Visa will be sent directly to your registered email address."
        ]
      },
      extension: {
        title: "Visa & Stay Permit Extension",
        desc: "Most visas, such as VoA and Visit Visas, can be extended. Extensions can be done online through the Molina website or by visiting the nearest Immigration Office before the visa expires. Overstaying will incur a penalty of Rp 1,000,000 per day."
      }
    }
  }
};

export default function LayananVisa() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = visaData[lang as 'ID' | 'EN'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai Visa?' : 'Hello! Need help with Visas?' }]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  const menuItems = [
    { id: 'about', icon: <HelpCircle className="w-5 h-5" />, label: t.sidebar.about },
    { id: 'categories', icon: <Map className="w-5 h-5" />, label: t.sidebar.categories },
    { id: 'requirements', icon: <FileText className="w-5 h-5" />, label: t.sidebar.requirements },
    { id: 'fees', icon: <CreditCard className="w-5 h-5" />, label: t.sidebar.fees },
    { id: 'apply', icon: <CheckCircle2 className="w-5 h-5" />, label: t.sidebar.apply },
    { id: 'extension', icon: <Clock className="w-5 h-5" />, label: t.sidebar.extension }
  ];

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
      <div className="relative bg-[#0f172a] pt-28 pb-10 px-6 lg:px-12 xl:px-24">
        {/* Gambar Latar Nuansa Bandara / Traveling WNA */}
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2074" className="w-full h-full object-cover opacity-20" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">{t.hero.sub}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start animate-fade-in-up delay-100">
          
          {/* PANEL KIRI: SIDEBAR MENU (Sticky) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-28 z-20">
            <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex flex-col space-y-1">
                {menuItems.map((menu) => (
                  <button 
                    key={menu.id} 
                    onClick={() => setActiveSection(menu.id)} 
                    className={`w-full text-left px-5 py-4 rounded-2xl flex items-center space-x-4 transition-all duration-300 ${activeSection === menu.id ? 'bg-blue-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    <span className={`${activeSection === menu.id ? 'text-white' : 'text-blue-500'}`}>{menu.icon}</span>
                    <span className="font-bold text-sm">{menu.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PANEL KANAN: KONTEN VISA BERDASARKAN MENU */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
            
            {/* TENTANG VISA */}
            {activeSection === 'about' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.about.title}</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium text-justify">{t.content.about.desc}</p>
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-blue-800 font-bold text-center">e-Visa Website: <a href="https://molina.imigrasi.go.id" target="_blank" rel="noreferrer" className="text-blue-600 underline">molina.imigrasi.go.id</a></p>
                </div>
              </div>
            )}

            {/* KATEGORI VISA */}
            {activeSection === 'categories' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.categories.title}</h2>
                <div className="space-y-4">
                  {t.content.categories.items.map((item, idx) => (
                    <div key={idx} className="p-5 border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all">
                      <h3 className="font-extrabold text-lg text-blue-700 mb-2">{item.name}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SYARAT & DOKUMEN */}
            {activeSection === 'requirements' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.requirements.title}</h2>
                <ul className="space-y-4">
                  {t.content.requirements.items.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* BIAYA */}
            {activeSection === 'fees' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.fees.title}</h2>
                <p className="text-gray-600 font-medium">{t.content.fees.desc}</p>
                <div className="grid gap-4 mt-4">
                  {t.content.fees.items.map((fee, idx) => (
                    <div key={idx} className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-50 to-transparent border border-blue-100 rounded-2xl">
                      <span className="font-bold text-gray-700">{fee.name}</span>
                      <span className="font-extrabold text-lg text-blue-700 bg-white px-4 py-1.5 rounded-full shadow-sm">{fee.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CARA MENGAJUKAN */}
            {activeSection === 'apply' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.apply.title}</h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:to-transparent mt-8">
                  {t.content.apply.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
                        {idx + 1}
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-gray-700 font-medium text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PERPANJANGAN VISA */}
            {activeSection === 'extension' && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e293b] border-b pb-4">{t.content.extension.title}</h2>
                <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl text-red-900 font-medium leading-relaxed">
                  <p>{t.content.extension.desc}</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FAB: Bantuan & Chat */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        {/* Call Center */}
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

        {/* IVARA Bot */}
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

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>{isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}</button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>{isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}{!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}</button>
        </div>
      </div>
    </div>
  );
}