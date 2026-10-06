import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LanguageContext } from '../App';
import { ChevronRight, ArrowLeft, CheckCircle, Map, Building2, Users, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';

const translations = {
  ID: {
    hero: { pre: "Profil Instansi", title: "Sejarah Kantor", back: "Kembali" },
    history: {
      sub: "Kilas Balik Instansi", title: "Sejarah Kantor & Selayang Pandang",
      p1: "Berawal dari Pos Imigrasi kecil yang menginduk pada Kantor Imigrasi Jakarta Barat, kini Kantor Imigrasi Kelas I Khusus Non TPI Tangerang memegang peranan krusial sebagai garda terdepan penjaga pintu gerbang negara di wilayah Banten.",
      timeline: [
        { year: "1982", desc: "Berdiri sebagai Pos Imigrasi Tangerang." },
        { year: "1990", desc: "Ditingkatkan statusnya menjadi Kantor Imigrasi Kelas II." },
        { year: "2015", desc: "Peningkatan status menjadi Kelas I Khusus Non TPI Tangerang." },
        { year: "2026", desc: "Terus berinovasi memberikan pelayanan ramah HAM dan digital." }
      ]
    },
    wilayah: {
      title: "Wilayah Tempat Kedudukan",
      desc: "Meliputi 3 (tiga) wilayah administratif di Provinsi Banten.",
      areas: ["Kota Tangerang", "Kabupaten Tangerang", "Kota Tangerang Selatan"]
    },
    tupoksi: {
      title: "Kedudukan, Tugas Pokok dan Fungsi",
      items: [
        { title: "Kedudukan", desc: "Merupakan Unit Pelaksana Teknis (UPT) di bawah Direktorat Jenderal Imigrasi, Kementerian Hukum dan HAM." },
        { title: "Tugas Pokok", desc: "Melaksanakan sebagian tugas pokok dan fungsi Kementerian Hukum dan HAM di bidang Keimigrasian di wilayah kerjanya." },
        { title: "Fungsi", desc: "Pelaksanaan tugas keimigrasian di bidang pelayanan, penegakan hukum, keamanan negara, dan fasilitator pembangunan." }
      ]
    },
    visimisi: {
      title: "Visi, Misi dan Tata Nilai",
      visi: '"Terwujudnya Pelayanan Keimigrasian dan Penegakan Hukum yang Modern, Transparan, Humanis, dan Berintegritas guna Menjaga Kedaulatan Negara serta Mendorong Pertumbuhan Ekonomi Nasional Menuju Indonesia Emas 2045."',
      misiTitle: "Misi Instansi",
      misi: [
        "Memberikan pelayanan keimigrasian yang prima dan ramah HAM.",
        "Meningkatkan pengawasan dan penegakan hukum keimigrasian secara tegas.",
        "Mengembangkan inovasi digital dalam setiap lini pelayanan.",
        "Mewujudkan SDM yang profesional, akuntabel, dan berintegritas tinggi."
      ]
    },
    struktur: {
      title: "Struktur Organisasi",
      kepala: "Kepala Kantor Imigrasi",
      items: [
        { title: "Bagian Tata Usaha", desc: "Melaksanakan urusan ketatausahaan, kepegawaian, keuangan, dan rumah tangga kantor." },
        { title: "Bidang Lalu Lintas Keimigrasian", desc: "Melayani permohonan paspor RI dan perlintasan wilayah." },
        { title: "Bidang Izin Tinggal Keimigrasian", desc: "Melayani permohonan ITK, ITAS, dan ITAP bagi WNA." },
        { title: "Bidang Intelijen dan Penindakan", desc: "Melakukan pengawasan, intelijen, dan penindakan pelanggaran keimigrasian." },
        { title: "Bidang Teknologi Informasi", desc: "Mengelola sistem informasi, komunikasi, dan hubungan masyarakat." }
      ]
    }
  },
  EN: {
    hero: { pre: "Agency Profile", title: "Office History", back: "Back" },
    history: {
      sub: "Agency Flashback", title: "Office History & Overview",
      p1: "Starting from a small Immigration Post under the West Jakarta Immigration Office, the Tangerang Special Class I Non-TPI Immigration Office now plays a crucial role as the frontline guardian of the nation's gates in the Banten region.",
      timeline: [
        { year: "1982", desc: "Established as Tangerang Immigration Post." },
        { year: "1990", desc: "Upgraded to Class II Immigration Office." },
        { year: "2015", desc: "Upgraded to Special Class I Non-TPI Tangerang." },
        { year: "2026", desc: "Continuing to innovate in human rights-friendly and digital services." }
      ]
    },
    wilayah: {
      title: "Jurisdictional Area",
      desc: "Covering 3 (three) administrative regions in Banten Province.",
      areas: ["Tangerang City", "Tangerang Regency", "South Tangerang City"]
    },
    tupoksi: {
      title: "Position, Main Duties and Functions",
      items: [
        { title: "Position", desc: "A Technical Implementing Unit under the Directorate General of Immigration, Ministry of Law and Human Rights." },
        { title: "Main Duties", desc: "Carrying out some of the main duties and functions in the field of Immigration within its working area." },
        { title: "Functions", desc: "Implementation of immigration duties in services, law enforcement, state security, and development facilitation." }
      ]
    },
    visimisi: {
      title: "Vision, Mission and Core Values",
      visi: '"Realizing Modern, Transparent, Humane, and Integral Immigration Services and Law Enforcement to Safeguard State Sovereignty and Boost National Economic Growth towards Golden Indonesia 2045."',
      misiTitle: "Agency Mission",
      misi: [
        "Providing excellent and human rights-friendly immigration services.",
        "Firmly improving immigration supervision and law enforcement.",
        "Developing digital innovation in every service line.",
        "Creating professional, accountable, and highly integral human resources."
      ]
    },
    struktur: {
      title: "Organizational Structure",
      kepala: "Head of Immigration Office",
      items: [
        { title: "Administration Division", desc: "Handles administrative, personnel, financial, and household affairs." },
        { title: "Immigration Traffic Division", desc: "Serves RI passport applications and border crossings." },
        { title: "Stay Permit Division", desc: "Serves ITK, ITAS, and ITAP applications for foreigners." },
        { title: "Intelligence and Enforcement Division", desc: "Conducts surveillance, intelligence, and enforcement of immigration violations." },
        { title: "Information Technology Division", desc: "Manages information systems, communications, and public relations." }
      ]
    }
  },
  ZH: {
    hero: { pre: "机构简介", title: "办公室历史", back: "返回" },
    history: {
      sub: "机构回顾", title: "历史与概况",
      p1: "坦格朗非TPI一类特别移民局始于隶属于雅加达西部移民局的一个小型移民哨所，如今作为万丹地区国家大门的前线守卫者，发挥着至关重要的作用。",
      timeline: [
        { year: "1982", desc: "成立坦格朗移民哨所。" },
        { year: "1990", desc: "升级为二类移民局。" },
        { year: "2015", desc: "升级为坦格朗非TPI一类特别移民局。" },
        { year: "2026", desc: "在人权友好型和数字化服务方面不断创新。" }
      ]
    },
    wilayah: {
      title: "管辖区域",
      desc: "涵盖万丹省的 3（三）个行政区域。",
      areas: ["坦格朗市", "坦格朗县", "南坦格朗市"]
    },
    tupoksi: {
      title: "地位、主要职责与功能",
      items: [
        { title: "地位", desc: "法律和人权部移民总局下属的技术执行单位。" },
        { title: "主要职责", desc: "在其工作区域内履行法律和人权部在移民领域的部分主要职责和功能。" },
        { title: "功能", desc: "在服务、执法、国家安全和促进发展方面执行移民任务。" }
      ]
    },
    visimisi: {
      title: "愿景、使命与核心价值观",
      visi: '"实现现代化、透明、人性化和廉洁的移民服务与执法，以维护国家主权并促进国家经济增长，迈向2045年黄金印尼。"',
      misiTitle: "机构使命",
      misi: [
        "提供卓越且尊重人权的移民服务。",
        "坚决加强移民监督与执法。",
        "在每条服务线上发展数字化创新。",
        "打造专业、尽责、高度廉洁的人力资源。"
      ]
    },
    struktur: {
      title: "组织架构",
      kepala: "移民局局长",
      items: [
        { title: "行政处", desc: "负责行政、人事、财务和后勤事务。" },
        { title: "出入境交通处", desc: "办理印尼护照申请及边境通行事务。" },
        { title: "居留许可处", desc: "为外国人办理 ITK、ITAS 和 ITAP 申请。" },
        { title: "情报与执法处", desc: "开展对移民违规行为的监督、情报收集和执法。" },
        { title: "信息技术处", desc: "管理信息系统、通信和公共关系。" }
      ]
    }
  }
};

export default function TentangKami() {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN' | 'ZH'] || translations['ID'];
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar/>

      {/* --- CSS ANIMASI KUSTOM --- */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slow-pan {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-slow-pan { animation: slow-pan 25s ease-in-out infinite; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}</style>

      {/* --- HERO SECTION (Desain Gradasi Biru Animatif) --- */}
      <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden flex flex-col justify-center bg-[#0b162c]">
        
        {/* Background Image dengan Animasi Slow Zoom/Pan */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1600&q=80" 
            alt="Background Imigrasi" 
            className="w-full h-full object-cover animate-slow-pan opacity-50"
          />
          {/* Overlay Gradasi Biru yang memudar ke warna abu-abu (gray-50) di bawah */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b162c]/95 via-[#1a3673]/80 to-gray-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full pt-12 md:pt-16">
          
          {/* Tombol Kembali (Animasi Muncul Pertama) */}
          <div className="opacity-0 animate-fade-in-up">
            <a 
              href="/" 
              className="inline-flex items-center px-5 py-2.5 mb-8 rounded-full border border-white/40 bg-white/10 hover:bg-white/30 backdrop-blur-md transition-all text-white font-medium text-sm group shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 mr-1.5 stroke-[3] group-hover:-translate-x-1 transition-transform" />
              {t.hero.back}
            </a>
          </div>

          {/* Judul Halaman (Animasi Muncul Kedua) */}
          <div className="opacity-0 animate-fade-in-up delay-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6">
              {t.hero.title}
            </h1>
            {/* Garis Aksen Estetik */}
            <div className="w-24 h-1.5 bg-yellow-400 rounded-full shadow-md"></div>
          </div>
          
        </div>
      </div>
      {/* --- END HERO SECTION --- */}
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
        
        {/* SECTION 1: SEJARAH & TIMELINE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="text-sm font-bold text-yellow-600 uppercase tracking-widest">{t.history.sub}</span>
            <h2 className="text-3xl font-extrabold text-[#0b162c] mt-2 mb-6">{t.history.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{t.history.p1}</p>
            
            {/* Timeline */}
            <div className="space-y-6 border-l-2 border-yellow-400 ml-3 pl-6">
              {t.history.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[33px] top-1 w-4 h-4 bg-yellow-400 rounded-full border-4 border-gray-50"></div>
                  <h4 className="font-bold text-[#0b162c] text-lg">{item.year}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[400px] relative">
            {/* Menggunakan placeholder gambar gedung */}
            <img src="https://images.unsplash.com/photo-1541872528775-69ab9c50fc7b?w=800&q=80" alt="Gedung Imigrasi" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c]/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-bold text-xl">Kantor Imigrasi Kelas I Khusus Non TPI Tangerang</h3>
            </div>
          </div>
        </section>

        {/* SECTION 2: WILAYAH KERJA */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#0b162c] mb-3">{t.wilayah.title}</h2>
            <p className="text-gray-500">{t.wilayah.desc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.wilayah.areas.map((area, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Map className="w-6 h-6"/>
                </div>
                <h4 className="font-bold text-gray-800">{area}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: TUPOKSI */}
        <section>
          <div className="mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-[#0b162c]">{t.tupoksi.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.tupoksi.items.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-yellow-500 relative">
                <div className="absolute -top-5 left-6 w-10 h-10 bg-[#0b162c] text-white font-bold rounded-full flex items-center justify-center border-4 border-white">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#0b162c] mt-4 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: VISI MISI */}
        <section>
          <h2 className="text-2xl font-extrabold text-[#0b162c] mb-8">{t.visimisi.title}</h2>
          {/* Kotak Biru Gelap Visi */}
          <div className="bg-[#0b162c] text-white p-10 rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Building2 className="w-32 h-32"/></div>
            <h3 className="text-sm font-bold text-yellow-400 tracking-widest uppercase mb-4">Visi Instansi</h3>
            <p className="text-2xl md:text-3xl font-extrabold leading-tight italic relative z-10">{t.visimisi.visi}</p>
          </div>
          {/* Grid Misi */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 text-yellow-500 mr-2"/> {t.visimisi.misiTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.visimisi.misi.map((m, idx) => (
                <div key={idx} className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="min-w-[24px] mt-0.5 text-blue-600 font-bold">{idx + 1}.</div>
                  <p className="text-gray-700 text-sm">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: STRUKTUR ORGANISASI */}
        <section className="pb-16">
          <div className="mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-extrabold text-[#0b162c]">{t.struktur.title}</h2>
          </div>
          
          {/* Bagan Organisasi Sederhana */}
          <div className="flex flex-col items-center mb-12">
            <div className="bg-[#0b162c] text-white px-8 py-4 rounded-xl shadow-lg font-bold text-center z-10">
              {t.struktur.kepala}
            </div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="w-full max-w-4xl border-t-2 border-gray-300 relative">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex justify-between w-full max-w-4xl px-4 mt-8 hidden md:flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col items-center relative -mt-8">
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                  <div className="bg-white border-2 border-yellow-500 px-4 py-3 rounded-lg text-xs font-bold text-center w-32 shadow-sm text-gray-700">
                    {t.struktur.items[i-1].title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accordion Detail Struktur */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {t.struktur.items.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Users className="w-5 h-5 text-blue-600"/>
                    <span className="font-bold text-[#0b162c]">{item.title}</span>
                  </div>
                  {openAccordion === idx ? <ChevronUp className="w-5 h-5 text-gray-400"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
                </button>
                {openAccordion === idx && (
                  <div className="p-5 pt-0 bg-gray-50 border-t border-gray-100 text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
}