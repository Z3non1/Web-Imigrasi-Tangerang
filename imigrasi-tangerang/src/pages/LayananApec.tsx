import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronRight,
  Languages, X, Bot, MessageSquare, Send, Check, Info, FileText, CheckCircle2, Menu
} from 'lucide-react';

const apecData = {
  ID: {
    hero: { title: "Kartu Perjalanan Pebisnis APEC", sub: "Layanan Fasilitas Bisnis Internasional" },
    ui: { 
      catTitle: "Jenis Permohonan", 
      catDesc: "Pilih jenis permohonan ABTC Anda untuk melihat detail persyaratan.",
      detailBadge: "Panduan Lengkap"
    },
    categories: ["Permohonan Baru", "Permohonan Penggantian", "Permohonan Pemutakhiran Data"],
    sections: { 
      eligibility: "Subjek Kelayakan Pemohon ABTC", 
      benefits: "Manfaat ABTC", 
      prohibitions: "Larangan ABTC", 
      cost: "Biaya",
      allowed: "Kegiatan yang Diperbolehkan",
      obligations: "Kewajiban",
      req: "Persyaratan Dokumen",
      validity: "Masa Berlaku",
      info: "Informasi Lainnya"
    },
    content: {
      "Permohonan Baru": {
        eligibility: ["Warga Negara Indonesia (WNI) pemegang paspor RI.", "Pebisnis (pengusaha, investor, atau eksekutif perusahaan) yang sering melakukan perjalanan bisnis di wilayah APEC.", "Pejabat Pemerintah yang ditugaskan dalam kegiatan APEC."],
        benefits: ["Bebas visa kunjungan bisnis ke 19 negara anggota APEC yang berpartisipasi penuh.", "Tidak perlu mengajukan visa berulang kali ke kedutaan/konsulat negara tujuan.", "Akses jalur khusus (APEC Lane) di bandara internasional negara anggota, mempercepat proses keimigrasian."],
        prohibitions: ["Dilarang menggunakan ABTC untuk bekerja mencari upah/gaji di negara tujuan.", "Dilarang menetap (tinggal permanen) menggunakan fasilitas ABTC.", "Dilarang melanggar batas waktu izin tinggal (stay condition) yang diberikan oleh tiap negara."],
        cost: ["Biaya PNBP Kartu Perjalanan Pebisnis APEC (ABTC): Rp 2.500.000"],
        allowed: ["Melakukan pertemuan bisnis dan investasi di negara anggota APEC.", "Menghadiri pameran perdagangan, seminar, atau konferensi bisnis.", "Penjajakan kerja sama bisnis antar negara."],
        obligations: ["Mematuhi peraturan hukum di negara tujuan APEC yang dikunjungi.", "Menjaga masa berlaku paspor tetap aktif dan dalam kondisi baik."],
        req: [
          "Surat Permohonan dari Perusahaan (ditandatangani direktur/pimpinan).",
          "Surat Rekomendasi dari Asosiasi Pengusaha (KADIN, HIPMI, APINDO, dll) atau instansi pemerintah terkait.",
          "Kartu Tanda Penduduk (KTP) yang masih berlaku.",
          "Paspor Biasa / Elektronik dengan masa berlaku minimal 2 (dua) tahun.",
          "Surat Keterangan Catatan Kepolisian (SKCK) asli yang masih berlaku.",
          "Bukti rekening koran perusahaan/pribadi 3 bulan terakhir (dengan saldo minimum sesuai ketentuan, misal Rp 500.000.000).",
          "Surat Tugas (bagi pejabat pemerintah)."
        ],
        validity: ["Masa berlaku ABTC maksimal 5 (lima) tahun.", "Atau mengikuti masa berlaku paspor (mana yang lebih cepat habis/berakhir)."],
        info: ["Proses persetujuan (clearance) tergantung pada masing-masing dari 19 negara anggota APEC, sehingga memakan waktu bervariasi (umumnya 2-6 bulan).", "Jika paspor diganti, ABTC juga harus diajukan penggantian karena nomor paspor harus sama dengan yang tertera di kartu."]
      },
      "Permohonan Penggantian": {
        eligibility: ["Pemegang ABTC yang masa berlaku kartunya akan habis.", "Pemegang ABTC yang mengganti paspor (karena habis masa berlaku, hilang, atau rusak).", "Pemegang ABTC yang kartunya hilang atau rusak."],
        benefits: ["Sama seperti permohonan baru, namun proses clearance (persetujuan negara anggota) biasanya bisa dilanjutkan dari profil yang sudah ada atau diperbarui."],
        prohibitions: ["Sama seperti permohonan baru."],
        cost: ["Biaya PNBP Penggantian ABTC (karena habis masa berlaku/ganti paspor): Rp 2.500.000"],
        allowed: ["Sama seperti permohonan baru."],
        obligations: ["Melaporkan segera jika kartu ABTC hilang kepada pihak kepolisian dan Imigrasi."],
        req: [
          "Surat Permohonan Penggantian dari Perusahaan.",
          "KTP yang masih berlaku.",
          "Paspor Baru (jika alasan penggantian karena ganti paspor).",
          "Kartu ABTC Lama (dikembalikan ke petugas).",
          "Surat Lapor Kehilangan dari Kepolisian (jika kartu ABTC hilang).",
          "Surat Rekomendasi Asosiasi (jika masa berlaku 5 tahun sudah habis dan ingin perpanjang total)."
        ],
        validity: ["Disesuaikan dengan masa berlaku paspor baru, atau melanjutkan sisa masa berlaku ABTC jika pergantian karena hilang/rusak tanpa ganti paspor."],
        info: ["Penggantian karena ganti paspor wajib dilakukan agar nomor paspor pada sistem ABTC sinkron dengan fisik paspor saat melewati Imigrasi negara tujuan."]
      },
      "Permohonan Pemutakhiran Data": {
        eligibility: ["Pemegang ABTC yang telah melakukan penggantian paspor RI dan perlu memperbarui nomor paspor pada sistem ABTC.", "Pemegang ABTC yang mendapatkan persetujuan (clearance) tambahan dari negara anggota APEC dan ingin mencetak ulang kartu."],
        benefits: ["Memastikan kelancaran perjalanan tanpa hambatan akibat perbedaan nomor paspor fisik dengan yang tertera pada sistem ABTC.", "Menambahkan negara tujuan baru di belakang kartu APEC Anda jika ada persetujuan clearance baru."],
        prohibitions: ["Sama seperti permohonan baru."],
        cost: ["Sesuai dengan ketentuan tarif PNBP pencetakan ulang/pemutakhiran data yang berlaku."],
        allowed: ["Sama seperti permohonan baru."],
        obligations: ["Selalu memastikan nomor paspor yang digunakan untuk bepergian sama persis dengan yang terdaftar di dalam sistem ABTC."],
        req: [
          "Surat Permohonan Pemutakhiran Data dari Perusahaan.",
          "Fotokopi KTP yang masih berlaku.",
          "Fotokopi Paspor Lama.",
          "Fotokopi Paspor Baru (jika ada penggantian paspor).",
          "Asli Kartu ABTC yang masih berlaku untuk ditarik dan diganti baru."
        ],
        validity: ["Pemutakhiran data tidak menambah masa berlaku. Masa berlaku akan melanjutkan sisa waktu dari kartu ABTC yang lama (maksimal hingga 5 tahun sejak awal terbit)."],
        info: ["Disarankan untuk segera melakukan pemutakhiran data seketika setelah Anda mendapatkan paspor baru untuk mencegah penolakan keberangkatan di bandara."]
      }
    }
  },
  EN: {
    hero: { title: "APEC Business Travel Card", sub: "International Business Facility Services" },
    ui: { 
      catTitle: "Application Type", 
      catDesc: "Select your ABTC application type to view detailed requirements.",
      detailBadge: "Complete Guide"
    },
    categories: ["New Application", "Replacement", "Data Update"],
    sections: { 
      eligibility: "Eligibility Criteria", 
      benefits: "ABTC Benefits", 
      prohibitions: "Prohibitions", 
      cost: "Fees",
      allowed: "Permitted Activities",
      obligations: "Obligations",
      req: "Document Requirements",
      validity: "Validity Period",
      info: "Other Information"
    },
    content: {
      "New Application": {
        eligibility: ["Indonesian citizens holding a valid passport.", "Business people (entrepreneurs, investors) who frequently travel within the APEC region.", "Government officials assigned to APEC activities."],
        benefits: ["Visa-free business travel to 19 fully participating APEC economies.", "No need to repeatedly apply for visas at embassies/consulates.", "Access to fast-track APEC lanes at participating international airports."],
        prohibitions: ["Prohibited from using ABTC for paid employment in the destination country.", "Prohibited from permanent residency.", "Prohibited from overstaying the granted stay period."],
        cost: ["ABTC Issuance Fee: Rp 2,500,000"],
        allowed: ["Business and investment meetings.", "Attending trade exhibitions, seminars, or conferences.", "Business explorations and negotiations."],
        obligations: ["Comply with the laws of the destination country.", "Keep the passport valid and in good condition."],
        req: [
          "Company Application Letter.",
          "Recommendation Letter from a Business Association (e.g., KADIN) or relevant government agency.",
          "Valid ID Card (KTP).",
          "Passport with a minimum validity of 2 (two) years.",
          "Valid Police Record Certificate (SKCK).",
          "Bank statement for the last 3 months (showing a minimum balance, e.g., Rp 500,000,000)."
        ],
        validity: ["Maximum validity is 5 (five) years.", "Or until the passport expires (whichever comes first)."],
        info: ["Clearance depends on each of the 19 member economies, which can take 2-6 months.", "If a passport is replaced, the ABTC must also be replaced to sync the passport number."]
      },
      "Replacement": {
        eligibility: ["ABTC holders whose card is expiring.", "ABTC holders who replaced their passports.", "ABTC holders whose card is lost or damaged."],
        benefits: ["Same as a new application."],
        prohibitions: ["Same as a new application."],
        cost: ["Replacement Fee: Rp 2,500,000"],
        allowed: ["Same as a new application."],
        obligations: ["Report a lost card immediately to the police and Immigration."],
        req: [
          "Company Replacement Request Letter.",
          "Valid ID Card.",
          "New Passport (if replaced).",
          "Old ABTC Card.",
          "Police Loss Report (if the card was lost)."
        ],
        validity: ["Matched to the new passport's validity, or continues the remaining ABTC validity."],
        info: ["Updating the ABTC when a passport is replaced is mandatory to ensure the passport number matches the card."]
      },
      "Data Update": {
        eligibility: ["ABTC holders who have recently replaced their passport and need to update the passport number in the ABTC system.", "ABTC holders who have received additional clearance from APEC economies and wish to reprint their card."],
        benefits: ["Ensures smooth travel by syncing the physical passport number with the ABTC system.", "Adds newly approved destinations to the back of your reprinted APEC card."],
        prohibitions: ["Same as a new application."],
        cost: ["According to the applicable non-tax state revenue (PNBP) fees for reprinting/updating."],
        allowed: ["Same as a new application."],
        obligations: ["Always ensure that the passport number used for travel matches the one registered in the ABTC system."],
        req: [
          "Company Data Update Request Letter.",
          "Valid ID Card (Copy).",
          "Old Passport (Copy).",
          "New Passport (Copy, if applicable).",
          "Original Valid ABTC Card (to be withdrawn and replaced)."
        ],
        validity: ["A data update does not extend the validity. The new card will continue the remaining validity of the old ABTC (up to 5 years from initial issuance)."],
        info: ["It is highly recommended to immediately update your ABTC data upon receiving a new passport to prevent boarding denial at the airport."]
      }
    }
  },
  ZH: {
    hero: { title: "APEC 商务旅行卡 (ABTC)", sub: "国际商务便利服务" },
    ui: { 
      catTitle: "申请类型", 
      catDesc: "选择您的 ABTC 申请类型以查看详细要求。",
      detailBadge: "完整指南"
    },
    categories: ["新申请", "换发申请", "数据更新申请"],
    sections: { 
      eligibility: "ABTC 申请资格条件", 
      benefits: "ABTC 的优势", 
      prohibitions: "禁止事项", 
      cost: "费用标准",
      allowed: "允许进行的活动",
      obligations: "义务",
      req: "申请材料要求",
      validity: "有效期",
      info: "其他信息"
    },
    content: {
      "新申请": {
        eligibility: ["持有印尼护照的印度尼西亚公民 (WNI)。", "经常在 APEC 地区进行商务旅行的商界人士（企业家、投资者或公司高管）。", "受指派参与 APEC 活动的政府官员。"],
        benefits: ["免签前往 19 个全面参与的 APEC 成员经济体进行商务旅行。", "无需重复向目的地国家的大使馆或领事馆申请签证。", "在成员国国际机场使用 APEC 专用通道 (APEC Lane)，加快出入境通关手续。"],
        prohibitions: ["严禁在目的地国家使用 ABTC 从事获取薪资的工作。", "严禁使用 ABTC 便利进行永久居留（常住）。", "严禁违反各国规定的停留期限 (Stay Condition)。"],
        cost: ["APEC 商务旅行卡 (ABTC) 国家非税收入 (PNBP) 费用：Rp 2,500,000"],
        allowed: ["在 APEC 成员国内举行商务和投资会议。", "参加贸易展览、研讨会或商务会议。", "开展跨国商业合作考察。"],
        obligations: ["遵守所访问的 APEC 目的地国家的法律法规。", "保持护照处于有效且良好的状态。"],
        req: [
          "公司申请信（由董事/负责人签字）。",
          "企业协会（如印尼商会 KADIN、HIPMI、APINDO 等）或相关政府机构的推荐信。",
          "有效的身份证 (KTP)。",
          "有效期至少两 (2) 年以上的普通/电子护照。",
          "有效且原件的警察局无犯罪记录证明 (SKCK)。",
          "最近 3 个月的公司/个人银行对账单（显示最低余额符合规定，例如 Rp 500,000,000）。",
          "派遣信（针对政府官员）。"
        ],
        validity: ["ABTC 的最长有效期为五 (5) 年。", "或者与护照有效期相同（以较早到期者为准）。"],
        info: ["清关批准 (Clearance) 流程取决于 19 个 APEC 成员经济体各自的审核，因此耗时会有所不同（通常需要 2-6 个月）。", "若更换护照，ABTC 也必须申请换发，因为卡上的护照号码必须与实体护照一致。"]
      },
      "换发申请": {
        eligibility: ["卡片即将到期的 ABTC 持有人。", "更换了护照的 ABTC 持有人（因护照到期、遗失或损毁）。", "ABTC 卡片遗失或损毁的持有人。"],
        benefits: ["与新申请相同，但成员国的清关 (Clearance) 审批通常可以从现有或更新的档案中直接继续。"],
        prohibitions: ["与新申请相同。"],
        cost: ["ABTC 换发 PNBP 费用（因到期或更换护照）：Rp 2,500,000"],
        allowed: ["与新申请相同。"],
        obligations: ["若 ABTC 卡片遗失，须立即向警方和移民局报案。"],
        req: [
          "公司换发申请信。",
          "有效的身份证。",
          "新护照（若更换原因为换护照）。",
          "旧 ABTC 卡（交还给工作人员）。",
          "警察局遗失证明（若 ABTC 卡遗失）。",
          "协会推荐信（若 5 年有效期已满且希望完全延长）。"
        ],
        validity: ["根据新护照的有效期进行调整，若因遗失/损毁换发且未换护照，则继承原 ABTC 的剩余有效期。"],
        info: ["因更换护照而办理换发是必须的，以便在通过目的地国家移民局时，ABTC 系统中的护照号码与实体护照保持同步。"]
      },
      "数据更新申请": {
        eligibility: ["已更换印尼护照且需要在 ABTC 系统中更新护照号码的 ABTC 持有人。", "已获得其他 APEC 成员国额外清关批准并希望重新制卡的 ABTC 持有人。"],
        benefits: ["通过同步实体护照号码与 ABTC 系统，确保旅程顺利无阻。", "如有新的清关批准，可在您的 APEC 卡背面添加新的目的地国家。"],
        prohibitions: ["与新申请相同。"],
        cost: ["根据适用的重印/数据更新 PNBP 关税标准执行。"],
        allowed: ["与新申请相同。"],
        obligations: ["始终确保用于旅行的护照号码与 ABTC 系统中登记的号码完全一致。"],
        req: [
          "公司数据更新申请信。",
          "有效身份证复印件。",
          "旧护照复印件。",
          "新护照复印件（如有换发护照）。",
          "原有效 ABTC 卡原件（需收回并更换新卡）。"
        ],
        validity: ["数据更新不会延长有效期。有效期将延续旧 ABTC 卡的剩余时间（自首次签发之日起最长 5 年）。"],
        info: ["建议您在拿到新护照后立即进行数据更新，以防止在机场被拒绝登机。"]
      }
    }
  }
};

export default function LayananApec() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = apecData[lang as 'ID' | 'EN' | 'ZH'] || apecData['ID'];
  const ui = lang === 'ID' ? { home: "Beranda", search: "Cari..." } : { home: "Home", search: "Search..." };
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>('eligibility');

  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ivara', text: lang === 'ID' ? 'Halo! Ada yang bisa dibantu mengenai kartu APEC?' : 'Hello! Need help with ABTC?' }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const activeCategoryName = t.categories[activeCategoryIndex];
  
  // Penentuan Key Data Berdasarkan Indeks dan Bahasa
  const dataKey = lang === 'ID' 
    ? activeCategoryName 
    : (activeCategoryIndex === 0 ? "New Application" : activeCategoryIndex === 1 ? "Replacement" : "Data Update");
    
  const activeContent = t.content[dataKey as keyof typeof t.content];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
      <Navbar />
      {/* HERO SECTION */}
      <div className="relative bg-[#1e293b] pt-28 pb-10 px-6 lg:px-12 xl:px-24">
        <div className="absolute inset-0 overflow-hidden"><img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074" className="w-full h-full object-cover opacity-20" /></div>
        <div className="relative z-10 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-5 h-5 mr-1" /> {lang === 'ID' ? 'Kembali' : 'Back'}</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">{t.hero.sub}</p>
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
            
            <div className="hidden lg:flex flex-col space-y-2">
              {t.categories.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setActiveCategoryIndex(idx); setExpandedSection('eligibility'); }} 
                  className={`w-full text-left px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-300 ${activeCategoryIndex === idx ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <span className="font-bold text-sm">{cat}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeCategoryIndex === idx ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            <div className="lg:hidden relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-blue-50 border border-blue-100 text-blue-700 rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm focus:outline-none transition-all duration-300">
                <span className="font-extrabold text-base">{activeCategoryName}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-40 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="py-2 bg-gray-50/50">
                  {t.categories.map((cat, idx) => (
                    <button key={idx} onClick={() => { setActiveCategoryIndex(idx); setIsDropdownOpen(false); setExpandedSection('eligibility'); }} className={`w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-blue-100 transition-colors ${activeCategoryIndex === idx ? 'bg-blue-100/50 text-blue-700' : 'text-gray-700'}`}>
                      <span className="font-bold text-sm">{cat}</span>
                      {activeCategoryIndex === idx && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL KANAN: DETAIL KONTEN */}
          <div className="w-full lg:w-2/3 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
            <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-extrabold text-2xl md:text-3xl text-[#1e293b] leading-tight">{activeCategoryName}</h3>
              <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center self-start sm:self-auto flex-shrink-0"><FileText className="w-3.5 h-3.5 mr-1" /> {t.ui.detailBadge}</span>
            </div>

            <div className="space-y-4 animate-fade-in" key={activeCategoryIndex}>
              {Object.entries(t.sections).map(([key, title]) => {
                const contentData = (activeContent[key as keyof typeof activeContent] as string[]) || [];
                const isExpanded = expandedSection === key;
                
                return (
                  <div key={key} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-400 ring-4 ring-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300 shadow-sm'}`}>
                    <button onClick={() => setExpandedSection(isExpanded ? null : key)} className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white group">
                      <span className={`font-extrabold text-lg transition-colors ${isExpanded ? 'text-blue-700' : 'text-[#1e293b] group-hover:text-blue-600'}`}>{title}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isExpanded ? 'bg-blue-100' : 'bg-gray-50'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-700' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    <div className={`transition-all duration-400 ease-in-out origin-top ${isExpanded ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/30">
                        <ul className="list-disc list-outside ml-5 space-y-3 text-gray-700 font-medium leading-relaxed">
                          {contentData.map((item, i) => (
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

      {/* FOOTER */}
      <footer className="bg-[#1e293b] text-white pt-16 pb-8 mt-auto border-t-4 border-yellow-500 relative z-20">
        <div className="text-center text-sm text-gray-400 px-6 font-medium"><p>&copy; {new Date().getFullYear()} Direktorat Jenderal Imigrasi. Hak Cipta Dilindungi.</p></div>
      </footer>

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