import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../App';
import Footer from '../Footer';
import { 
  Search, Phone, Shield, Globe, ChevronLeft, ChevronDown, ChevronRight,
  Languages, X, Bot, MessageSquare, Send, Check, Info, FileText
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
  }
};

export default function LayananApec() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = apecData[lang as 'ID' | 'EN'];
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
              <a href="tel:02155790871" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-blue-50 text-gray-700 transition-colors group"><div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors"><Phone className="w-4 h-4" /></div><div><p className="font-extrabold text-xs text-gray-900">Call Center</p><p className="text-xs text-gray-500 font-medium">(021) 5579 0871</p></div></a>
              <a href="https://wa.me/628114119000" className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-green-50 text-gray-700 transition-colors group"><div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></div><div><p className="font-extrabold text-xs text-gray-900">WhatsApp</p><p className="text-xs text-gray-500 font-medium">0811 411 9000</p></div></a>
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