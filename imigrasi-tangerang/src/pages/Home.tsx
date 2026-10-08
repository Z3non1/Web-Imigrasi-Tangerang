import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

import { 
  Search, Phone, ChevronRight, MapPin, ArrowUpRight, Shield, 
  MessageSquare, Camera, Hash, Users, Globe, Plane, User, 
  Headphones, Bus, ClipboardCheck, ShieldAlert, FileText, X, Bot, 
  ExternalLink, Send, Book, Flag, RefreshCw, CheckCircle2, AlertCircle, CreditCard,
  Languages, ChevronDown, ChevronLeft, Info, Menu,
  Play
} from 'lucide-react';

// KAMUS TRANSLASI (Sama seperti sebelumnya)
const translations = {
  ID: {
    nav: { home: "Beranda", info: "Informasi Publik", news: "Berita", about: "Tentang Kami", faq: "FAQ", search: "Cari..." },
    hero: { welcome: "Selamat Datang di", title: "IMIGRASI TANGERANG", subtitle: "SIGAP • TANGGAP • RAMAH" },
    widget: { 
      title: "Layanan Publik", desc: "Temukan layanan yang anda butuhkan disini",
      wni: "Layanan Warga Negara Indonesia", wniSub: "Paspor RI, Perjalanan Bisnis APEC", wni1: "Paspor Republik Indonesia", wni1Desc: "Permohonan baru dan penggantian", wni2: "Kartu Perjalanan Bisnis APEC",
      wna: "Layanan Warga Negara Asing", wnaSub: "Daftar Visa, VoA, BVK, Izin Tinggal", wna1: "Daftar Visa Indonesia", wna1Desc: "Layanan permohonan visa online", wna2: "Daftar Subjek VoA & BVK", wna3: "Izin Tinggal Keimigrasian"
    },
    cek: {
      title: "Cek Status Permohonan", subtitle: "Layanan Keimigrasian", labelNum: "Masukkan Nomor Permohonan", placeholderNum: "Contoh: 123456",
      labelCap: "Verifikasi Kode Captcha", placeholderCap: "Ketik kode...", btn: "Cek Status Permohonan",
      success: "Paspor Anda Sudah Jadi. Silahkan Ambil di Loket Pengambilan. Jangan Lupa Bawa KTP Asli.",
      errNum: "Permohonan tidak ditemukan. Mohon cek kembali Nomor permohonan Anda.",
      errCap: "Kode Captcha tidak sesuai. Silakan coba lagi.", note: "*Hanya untuk layanan di Kantor Imigrasi Tangerang."
    },
    services: {
      title: "Layanan Keimigrasian", btn1: "PELAYANAN PASPOR REPUBLIK INDONESIA", btn2: "PELAYANAN IMIGRASI BAGI ORANG ASING",
      items: [
        { title: "Layanan Visa Keliling", desc: "Informasi mengenai prosedur permohonan visa online lengkap." },
        { title: "Layanan A P O A", desc: "Pelaporan dari setiap Penjamin dan Pemilik penginapan." },
        { title: "Aplikasi L A P O R", desc: "Layanan penyampaian aspirasi dan pengaduan masyarakat." },
        { title: "Layanan Ezy Pasport", desc: "Informasi prosedur permohonan Ezy Passport jemput bola." },
        { title: "Layanan Izin Tinggal", desc: "Layanan aplikasi Izin Tinggal Keimigrasian secara online." },
        { title: "Whistle Blowing System", desc: "Layanan pelaporan pelanggaran di Lingkungan Kemenkumham." },
        { title: "Layanan e-SRPI", desc: "Layanan Surat Rekomendasi Pemerintah untuk Visa Australia." }
      ]
    },
    news: { title: "Berita & Publikasi Kegiatan", more: "Baca Selengkapnya" },
    footer: { follow: "Ikuti Kami", rights: "Direktorat Jenderal Imigrasi. Hak Cipta Dilindungi." },
    social: { title: "Media Sosial", open: "Buka", tabs: ["Instagram", "Twitter", "Facebook", "Tiktok"] }
  },
  EN: {
    nav: { home: "Home", info: "Public Info", news: "News", about: "About Us", faq: "FAQ", search: "Search..." },
    hero: { welcome: "Welcome to", title: "TANGERANG IMMIGRATION", subtitle: "FAST • RESPONSIVE • FRIENDLY" },
    widget: { 
      title: "Public Services", desc: "Find the services you need here",
      wni: "Indonesian Citizen Services", wniSub: "Indonesian Passport, APEC Business Travel", wni1: "Indonesian Passport", wni1Desc: "New application and replacement", wni2: "APEC Business Travel Card",
      wna: "Foreign National Services", wnaSub: "Visa Registration, VoA, Stay Permits", wna1: "Indonesia Visa Registration", wna1Desc: "Online visa application service", wna2: "VoA & BVK Subjects List", wna3: "Immigration Stay Permits"
    },
    cek: {
      title: "Check Application Status", subtitle: "Immigration Services", labelNum: "Enter Application Number", placeholderNum: "Example: 123456",
      labelCap: "Verify Captcha Code", placeholderCap: "Type code...", btn: "Check Status",
      success: "Your passport is ready. Please collect it at the Counter. Bring your original ID.",
      errNum: "Application not found. Please check your application number.",
      errCap: "Captcha code is incorrect. Please try again.", note: "*Only for services submitted at Tangerang Immigration Office."
    },
    services: {
      title: "Immigration Services", btn1: "INDONESIAN PASSPORT SERVICE INFO", btn2: "FOREIGNER IMMIGRATION SERVICE INFO",
      items: [
        { title: "Mobile Visa Service", desc: "Complete information on online visa application procedures." },
        { title: "A P O A Service", desc: "Reporting service for Sponsors and Accommodation Owners." },
        { title: "L A P O R App", desc: "Online channel for submitting public aspirations and complaints." },
        { title: "Ezy Passport Service", desc: "Information on the mobile Ezy Passport application." },
        { title: "Stay Permit Service", desc: "Web application providing online Immigration Stay Permit." },
        { title: "Whistle Blowing System", desc: "Violation reporting service within the Ministry of Law & Human Rights." },
        { title: "e-SRPI Service", desc: "Gov Recommendation Letters for Australian Visas." }
      ]
    },
    news: { title: "News & Publications", more: "Read More" },
    footer: { follow: "Follow Us", rights: "Directorate General of Immigration. All Rights Reserved." },
    social: { title: "Social Media", open: "Open", tabs: ["Instagram", "Twitter", "Facebook", "Tiktok"] }
  },
  ZH: {
    nav: { home: "首页", info: "公共信息", news: "新闻", about: "关于我们", faq: "常见问题", search: "搜索..." },
    hero: { welcome: "欢迎来到", title: "坦格朗移民局", subtitle: "敏捷 • 响应 • 友好" },
    widget: { 
      title: "公共服务", desc: "在这里找到您需要的服务",
      wni: "印尼公民服务", wniSub: "印尼护照，APEC 商务旅行", wni1: "印尼护照", wni1Desc: "新申请及换发", wni2: "APEC 商务旅行卡",
      wna: "外国国民服务", wnaSub: "签证申请，落地签，居留许可", wna1: "印尼签证清单", wna1Desc: "在线签证申请服务", wna2: "落地签及免签国家名单", wna3: "移民居留许可"
    },
    cek: {
      title: "查询申请状态", subtitle: "移民服务", labelNum: "输入申请编号", placeholderNum: "示例: 123456",
      labelCap: "验证验证码", placeholderCap: "输入验证码...", btn: "查询状态",
      success: "您的护照已准备就绪。请到取件柜台领取。请携带您的身份证原件。",
      errNum: "未找到申请。请检查您的申请编号。",
      errCap: "验证码不正确。请重试。", note: "*仅适用于在坦格朗移民局提交的服务。"
    },
    services: {
      title: "移民服务", btn1: "印尼护照服务信息", btn2: "外国人移民服务信息",
      items: [
        { title: "移动签证服务", desc: "有关在线签证申请程序的完整信息。" },
        { title: "APOA 报告服务", desc: "担保人和住宿所有者的报告服务。" },
        { title: "LAPOR 应用程序", desc: "提交公众诉求和投诉的在线渠道。" },
        { title: "Ezy Passport 服务", desc: "有关 Ezy Passport 移动办理服务的信息。" },
        { title: "居留许可服务", desc: "提供在线移民居留许可的在线应用程序。" },
        { title: "举报系统 (WBS)", desc: "法律和人权部内的违规举报服务。" },
        { title: "e-SRPI 服务", desc: "澳大利亚签证的政府推荐信。" }
      ]
    },
    news: { title: "新闻与活动发布", more: "阅读更多" },
    footer: { follow: "关注我们", rights: "移民总局。保留所有权利。" },
    social: { title: "社交媒体", open: "打开", tabs: ["Instagram", "Twitter", "Facebook", "Tiktok"] } 
  }
};

export default function Home() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN' | 'ZH'] || translations ['ID'];
  const [activeSocialTab, setActiveSocialTab] = useState('Instagram');
  
  // STATE ANIMASI & INTERAKSI
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'wni' | 'wna' | null>(null);
  const location = useLocation();

  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Saya IVARA. Ada yang bisa dibantu?' : 'Hello! I am IVARA. How can I help you?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [noPermohonan, setNoPermohonan] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [activeCaptcha, setActiveCaptcha] = useState('8 A p v R');
  const [checkStatus, setCheckStatus] = useState<'idle' | 'success' | 'error_not_found' | 'error_captcha'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Data dengan tambahan properti 'embedUrl'
  const socialMediaData: Record<string, { id: string, img: string, title: string, date: string, embedUrl: string }[]> = {
    Instagram: [
      { id: 'ig1', img: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&q=80", title: "13 WN TIONGKOK DITANGKAP", date: "6 Oktober 2026", embedUrl: "https://www.instagram.com/p/DeJcsCfztxn/embed/" },
      { id: 'ig2', img: "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?w=400&q=80", title: "LAYANAN PASPORIA CFD BSD", date: "4 Oktober 2026", embedUrl: "https://www.instagram.com/p/DeD6tKovOqt/embed/" },
      { id: 'ig3', img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80", title: "IMIGRASI TANGERANG BRAVO", date: "3 Oktober 2026", embedUrl: "https://www.instagram.com/p/Dd_mqv-Pljx/embed" },
      { id: 'ig4', img: "https://images.unsplash.com/photo-1541872528775-69ab9c50fc7b?w=400&q=80", title: "BANGGA BERBATIK", date: "3 Oktober 2026", embedUrl: "https://www.instagram.com/p/Dd_ZYqxyYHi/embed" }
    ],
    Twitter: [
      { id: 'tw1', img: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=400&q=80", title: "Layanan Paspor Simpatik", date: "02 Oktober 2026", embedUrl: "https://twitframe.com/show?url=https://twitter.com/kanim_tangerang/status/123456789" },
      { id: 'tw2', img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80", title: "Rapat Koordinasi TIMPORA", date: "01 Oktober 2026", embedUrl: "https://twitframe.com/show?url=https://twitter.com/kanim_tangerang/status/123456789" },
      { id: 'tw3', img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80", title: "Tips Menghindari Penipuan Visa", date: "30 September 2026", embedUrl: "https://twitframe.com/show?url=https://twitter.com/kanim_tangerang/status/123456789" },
      { id: 'tw4', img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=400&q=80", title: "Kunjungan Kerja Kakanwil", date: "27 September 2026", embedUrl: "https://twitframe.com/show?url=https://twitter.com/kanim_tangerang/status/123456789" }
    ],
    Facebook: [
      { id: 'fb1', img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80", title: "Sosialisasi Keimigrasian", date: "03 Oktober 2026", embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/imigrasitangerang/posts/123456789" },
      { id: 'fb2', img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", title: "Layanan Eazy Passport", date: "01 Oktober 2026", embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/imigrasitangerang/posts/123456789" },
      { id: 'fb3', img: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=400&q=80", title: "Penghargaan Pelayanan Publik", date: "29 September 2026", embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/imigrasitangerang/posts/123456789" },
      { id: 'fb4', img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80", title: "Sinergi dengan Pemda", date: "26 September 2026", embedUrl: "https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/imigrasitangerang/posts/123456789" }
    ],
    Tiktok: [
      { id: 'tk1', img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80", title: "Cara Daftar M-Paspor Anti Ribet", date: "04 Oktober 2026", embedUrl: "https://www.tiktok.com/embed/v2/7693136854949842197" },
      { id: 'tk2', img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80", title: "A Day in Life: Petugas Imigrasi", date: "02 Oktober 2026", embedUrl: "https://www.tiktok.com/embed/v2/7692685670774590740" },
      { id: 'tk3', img: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80", title: "Mitos vs Fakta Visa on Arrival", date: "30 September 2026", embedUrl: "https://www.tiktok.com/embed/v2/7692063936639749397" },
      { id: 'tk4', img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&q=80", title: "Tanya Jawab Paspor Rusak", date: "25 September 2026", embedUrl: "https://www.tiktok.com/embed/v2/7691958151851068692" }
    ]
  };
  const [selectedPost, setSelectedPost] = useState<any>(null);


  // Efek Scroll untuk Navbar Glassmorphism
  useEffect(() => { 
    window.scrollTo(0, 0); 
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ivara', text: lang === 'ID' ? "Mohon tunggu sebentar, sedang mencari info..." : "Please wait a moment, finding info..." }]);
    }, 600);
  };

  const generateNewCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i=0; i<5; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)) + ' '; }
    setActiveCaptcha(result.trim()); setCheckStatus('idle');
  };

  const handleCekStatus = () => {
    if (!captchaInput.trim() || captchaInput.replace(/\s/g, '').toLowerCase() !== activeCaptcha.replace(/\s/g, '').toLowerCase()) {
      setCheckStatus('error_captcha'); return;
    }
    setCheckStatus(noPermohonan === '123456' ? 'success' : 'error_not_found');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      <Navbar/>

      {/* HERO SECTION: Efek Zoom pelan */}
      <div className="relative bg-[#1e3a8a] h-[450px] overflow-hidden group">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transform group-hover:scale-110 transition-transform duration-[15s] ease-out"/>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent bottom-0"></div>
        <div className="absolute top-1/3 left-10 lg:left-24 text-white animate-fade-in-up">
          <p className="text-xl font-semibold mb-2 flex items-center"><span className="w-8 h-1 bg-yellow-400 mr-3 rounded-full"></span> {t.hero.welcome}</p>
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg tracking-tight">{t.hero.title}</h1>
          <p className="text-lg lg:text-xl font-bold text-yellow-400 drop-shadow-md tracking-wider bg-black/20 inline-block px-4 py-1.5 rounded-lg backdrop-blur-sm">{t.hero.subtitle}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 w-full -mt-12 relative z-10">
        
        {/* WIDGET LAYANAN: Sliding Interaktif Halus */}
        <div className="mb-24 flex flex-col md:flex-row gap-6 items-start animate-fade-in-up delay-100">
          <div className="w-full md:w-1/2 lg:w-5/12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 md:p-8">
              <h3 className="font-extrabold text-2xl">{t.widget.title}</h3>
              <p className="text-sm text-red-100 mt-1">{t.widget.desc}</p>
            </div>
            <div className="flex flex-col">
              <button onClick={() => setActiveServiceTab(activeServiceTab === 'wni' ? null : 'wni')} className={`group flex items-center justify-between p-6 md:p-7 border-b border-gray-100 transition-all duration-300 text-left hover:bg-blue-50 ${activeServiceTab === 'wni' ? 'bg-blue-50 pl-8 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}>
                <div><h4 className="text-[#1e293b] font-bold text-base group-hover:text-blue-700 transition-colors">{t.widget.wni}</h4><p className="text-gray-500 text-xs mt-1.5">{t.widget.wniSub}</p></div>
                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ${activeServiceTab === 'wni' ? 'rotate-90 text-blue-600' : 'text-gray-400 group-hover:translate-x-1'}`} />
              </button>
              <button onClick={() => setActiveServiceTab(activeServiceTab === 'wna' ? null : 'wna')} className={`group flex items-center justify-between p-6 md:p-7 transition-all duration-300 text-left hover:bg-blue-50 ${activeServiceTab === 'wna' ? 'bg-blue-50 pl-8 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}>
                <div><h4 className="text-[#1e293b] font-bold text-base group-hover:text-blue-700 transition-colors">{t.widget.wna}</h4><p className="text-gray-500 text-xs mt-1.5">{t.widget.wnaSub}</p></div>
                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ${activeServiceTab === 'wna' ? 'rotate-90 text-blue-600' : 'text-gray-400 group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-in-out transform origin-left overflow-hidden ${activeServiceTab ? 'w-full md:w-1/2 lg:w-5/12 opacity-100 scale-100' : 'w-0 opacity-0 scale-95 h-0 md:h-auto'}`}>
            <div className="bg-[#1e293b] rounded-3xl shadow-xl overflow-hidden p-3 border border-gray-800">
              <div className="p-4 text-white font-bold border-b border-gray-700 mb-2">{activeServiceTab === 'wni' ? t.widget.wni : t.widget.wna}</div>
              
              {activeServiceTab === 'wni' && (
                <div className="space-y-2 animate-fade-in">
                  <Link to="/layanan-wni/paspor" className="flex items-start p-4 hover:bg-[#334155] rounded-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all flex-shrink-0 shadow-inner"><Book className="w-6 h-6 text-white" /></div>
                    <div><h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{t.widget.wni1}</h4><p className="text-gray-400 text-xs mt-1">{t.widget.wni1Desc}</p></div>
                  </Link>
                  <Link to="/layanan-wni/apec" className="flex items-start p-4 hover:bg-[#334155] rounded-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all flex-shrink-0 shadow-inner"><CreditCard className="w-6 h-6 text-white" /></div>
                    <div><h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{t.widget.wni2}</h4><p className="text-gray-400 text-xs mt-1">{t.widget.wni1Desc}</p></div>
                  </Link>
                </div>
              )}

              {activeServiceTab === 'wna' && (
                <div className="space-y-2 animate-fade-in">
                  <Link to="/layanan-wna/visa" className="flex items-start p-4 hover:bg-[#334155] rounded-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all flex-shrink-0"><Globe className="w-6 h-6 text-white" /></div>
                    <div><h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{t.widget.wna1}</h4><p className="text-gray-400 text-xs mt-1">{t.widget.wna1Desc}</p></div>
                  </Link>
                  <Link to="/layanan-wna/voa" className="flex items-start p-4 hover:bg-[#334155] rounded-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all flex-shrink-0"><FileText className="w-6 h-6 text-white" /></div>
                    <div><h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{t.widget.wna2}</h4></div>
                  </Link>
                  <Link to="/layanan-wna/izin" className="flex items-start p-4 hover:bg-[#334155] rounded-2xl transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500 group-hover:scale-110 transition-all flex-shrink-0"><ClipboardCheck className="w-6 h-6 text-white" /></div>
                    <div><h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{t.widget.wna3}</h4></div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CEK STATUS: Form Responsif & Elegan */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center mb-24 md:mb-28 animate-fade-in-up delay-200">
  
        {/* Kolom Kiri: Teks & Gambar */}
          <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-4 leading-tight">
            {t.cek.title} <br className="hidden sm:block"/> <span className="text-blue-600">{t.cek.subtitle}</span>
          </h2>
          <div className="w-20 md:w-24 h-1.5 bg-yellow-500 mb-6 md:mb-8 rounded-full"></div>
          <div className="rounded-3xl shadow-xl overflow-hidden group">
          {/* Gambar disesuaikan tingginya: h-56 untuk HP, h-72 untuk Desktop */}
          <img src="src/assets/generate_pasport.jpg" className="w-full h-56 md:h-72 object-cover transform transition-transform duration-700 group-hover:scale-105" alt="Cek Status" />
        </div>
      </div>

      {/* Kolom Kanan: Form Pengecekan */}
      <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 transform transition-all hover:shadow-blue-900/5">
    
      <div className="mb-5 md:mb-6">
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3">{t.cek.labelNum}</label>
        <input type="text" value={noPermohonan} onChange={(e) => {setNoPermohonan(e.target.value); setCheckStatus('idle');}} placeholder={t.cek.placeholderNum} className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm md:text-base" />
      </div>
    
      <div className="mb-6 md:mb-8">
       <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3">{t.cek.labelCap}</label>
      {/* PERBAIKAN CAPTCHA: flex-col di HP (tumpuk bawah), flex-row di PC (jejer samping) */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex space-x-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none bg-gray-50 px-4 md:px-5 py-3 md:py-4 rounded-xl font-mono font-bold tracking-[0.3em] text-base md:text-lg border border-gray-200 text-blue-800 flex items-center justify-center select-none shadow-inner">{activeCaptcha}</div>
             <button onClick={generateNewCaptcha} className="p-3 md:p-4 text-gray-500 hover:text-white bg-gray-50 hover:bg-blue-600 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md flex-shrink-0"><RefreshCw className="w-5 h-5" /></button>
            </div>
              <input type="text" value={captchaInput} onChange={(e) => {setCaptchaInput(e.target.value); if(checkStatus === 'error_captcha') setCheckStatus('idle');}} placeholder={t.cek.placeholderCap} className="w-full sm:flex-1 px-4 md:px-5 py-3 md:py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm md:text-base" />
            </div>
          </div>

          <button onClick={handleCekStatus} className="w-full bg-[#1e293b] text-white font-bold py-3.5 md:py-4 rounded-xl hover:bg-blue-700 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 transition-all duration-300 text-sm md:text-lg">
            {t.cek.btn}
          </button>

          <div className="mt-5 md:mt-6 h-auto md:h-20">
            {checkStatus === 'success' && <div className="p-3 md:p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs md:text-sm font-bold flex items-start space-x-2 md:space-x-3 animate-fade-in"><CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-green-500" /><span>{t.cek.success}</span></div>}
            {checkStatus === 'error_not_found' && <div className="p-3 md:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs md:text-sm font-bold flex items-start space-x-2 md:space-x-3 animate-fade-in"><AlertCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-red-500" /><span>{t.cek.errNum}</span></div>}
            {checkStatus === 'error_captcha' && <div className="p-3 md:p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl text-xs md:text-sm font-bold flex items-start space-x-2 md:space-x-3 animate-fade-in"><AlertCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-orange-500" /><span>{t.cek.errCap}</span></div>}
            {checkStatus === 'idle' && <p className="text-[11px] md:text-xs text-gray-400 mt-2 md:mt-3 text-center">{t.cek.note}</p>}
          </div>
        </div>
      </div>

        {/* LAYANAN GRID: Efek Hover Lembut */}
        <div className="mb-28 animate-fade-in-up delay-300">
          <div className="flex justify-center md:justify-start mb-12">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm flex items-center space-x-3 border-l-4 border-l-yellow-500">
              <Flag className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-extrabold text-[#1e293b] uppercase">{t.services.title}</h2>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <button className="bg-[#1e293b] text-white px-8 py-5 rounded-2xl text-sm font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"><Book className="w-5 h-5 text-yellow-500 inline mr-3" />{t.services.btn1}</button>
            <button className="bg-[#1e293b] text-white px-8 py-5 rounded-2xl text-sm font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"><Globe className="w-5 h-5 text-yellow-500 inline mr-3" />{t.services.btn2}</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[Plane, User, Headphones, Bus, ClipboardCheck, ShieldAlert, FileText].map((Icon, i) => (
              <div key={i} className={`group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ${i === 6 ? 'lg:col-start-2' : ''}`}>
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-6 text-[#1e293b] group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6"><Icon className="w-8 h-8" /></div>
                <h3 className="font-extrabold text-lg mb-3 text-[#1e293b]">{t.services.items[i].title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t.services.items[i].desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BERITA */}
        <div className="mb-12 animate-fade-in-up delay-300">
          <div className="flex justify-between items-end mb-10 border-b-2 border-gray-100 pb-4">
            <h2 className="text-3xl font-extrabold text-[#111827]">{t.news.title}</h2>
            <Link to="/berita" className="text-blue-600 font-bold text-sm flex items-center hover:text-blue-800 transition-colors group">{t.news.more} <ArrowUpRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((id) => (
              <Link to={`/berita/${id}`} key={id}>
                <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className="overflow-hidden"><img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&sig=${id + 10}`} className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700"/></div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <h3 className="font-extrabold text-gray-900 mb-4 text-lg leading-snug group-hover:text-blue-600 transition-colors">{lang==='ID' ? "Pemberitahuan Ketersediaan Blangko Paspor Terbaru" : "Latest Notice of Passport Booklet Availability"}</h3>
                    <span className="text-blue-600 font-bold text-sm flex items-center">{t.news.more} <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
{/* --- SECTION MEDIA SOSIAL (KLIK POPUP) --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-[#0b162c] tracking-tight">{t.social.title}</h2>
              <div className="w-20 h-1.5 bg-yellow-500 mt-3 rounded-full"></div>
            </div>
            
            <a 
              href={
                activeSocialTab === 'Instagram' ? 'https://www.instagram.com/imigrasitangerang' :
                activeSocialTab === 'Twitter' ? 'https://x.com/kanim_tangerang' :
                activeSocialTab === 'Facebook' ? 'https://www.facebook.com/imigrasitangerang' :
                activeSocialTab === 'Tiktok' ? 'https://www.tiktok.com/@imigrasitangerang' : '#'
              }
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 bg-[#0b162c] text-white rounded-xl text-sm font-bold hover:bg-yellow-500 hover:text-[#0b162c] transition-colors group shadow-md"
            >
              {t.social.open} Profil {activeSocialTab} 
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex space-x-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {t.social.tabs.map((tab: string) => (
              <button
                key={tab}
                onClick={() => setActiveSocialTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
                  activeSocialTab === tab
                    ? 'bg-[#0b162c] text-yellow-400 border-[#0b162c] shadow-md'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-yellow-500 hover:text-[#0b162c]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialMediaData[activeSocialTab]?.map(post => (
              <button 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-100 bg-gray-900 block w-full text-left"
              >
                <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-110" />
                
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c]/95 via-[#0b162c]/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300 group-hover:-translate-y-2">
                  <p className="text-white font-extrabold text-base leading-tight drop-shadow-md mb-2">{post.title}</p>
                  <div className="flex items-center text-yellow-400">
                    <span className="text-[11px] font-bold tracking-wider uppercase">{post.date}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --- POPUP (MODAL) VIDEO EMBED --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          
          {/* Latar Belakang bisa diklik untuk menutup popup */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPost(null)}></div>
          
          {/* Kontainer Video */}
          <div className="relative bg-white rounded-3xl w-full max-w-sm md:max-w-md aspect-[9/16] overflow-hidden shadow-2xl z-10 flex flex-col">
            
            {/* Tombol Tutup (X) */}
            <button 
              onClick={() => setSelectedPost(null)} 
              className="absolute top-4 right-4 z-20 bg-gray-900/50 hover:bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md transition-colors"
            >
              ✕
            </button>
            
            {/* Iframe Pemutar Resmi Platform */}
            <iframe 
              src={selectedPost.embedUrl} 
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              allow="encrypted-media;"
            ></iframe>

          </div>
        </div>
      )

      /* FAB: Animasi Pop Mulus */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
        
        {/* Konten CS (Lapor) */}
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
                <div><p className="font-extrabold text-xs text-gray-900">LAPOR</p><p className="text-xs text-gray-500 font-medium">Sampaikan pengaduan</p></div>
              </a>
            </div>
          </div>
        </div>

        {/* Konten Chat AI IVARA */}
        <div className={`transform origin-bottom-right transition-all duration-400 ease-out ${isIvaraOpen ? 'scale-100 opacity-100 visible mb-2' : 'scale-75 opacity-0 invisible h-0'}`}>
          <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white px-5 py-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-inner"><Bot className="w-6 h-6 text-white" /></div>
                <div><h3 className="font-extrabold text-sm">IVARA Assistant</h3><p className="text-[10px] text-green-400 flex items-center font-bold"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1.5 animate-pulse"></span> Online</p></div>
              </div>
              <button onClick={() => setIsIvaraOpen(false)} className="text-gray-400 hover:text-white bg-white/10 rounded-full p-1.5 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm font-medium leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm text-gray-700'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center space-x-3 border-t border-gray-100">
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder={lang === 'ID' ? "Tanya sesuatu..." : "Ask something..."} className="flex-1 px-5 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"/>
              <button type="submit" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform shadow-md flex-shrink-0"><Send className="w-5 h-5 ml-1" /></button>
            </form>
          </div>
        </div>

        {/* Tombol Utama Bawah */}
        <div className="flex items-center space-x-4">
          <button onClick={() => {setIsCsOpen(!isCsOpen); setIsIvaraOpen(false);}} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 ${isCsOpen ? 'bg-red-500 text-white rotate-90' : 'bg-yellow-400 text-[#1e293b] hover:-translate-y-1'}`}>
            {isCsOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
          </button>
          <button onClick={() => {setIsIvaraOpen(!isIvaraOpen); setIsCsOpen(false);}} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all duration-300 z-50 relative ${isIvaraOpen ? 'bg-red-500 text-white rotate-90' : 'bg-green-500 text-white hover:-translate-y-1'}`}>
            {isIvaraOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
            {!isIvaraOpen && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>}
          </button>
        </div>

      </div>
      <Footer />
    </div>
  );
}