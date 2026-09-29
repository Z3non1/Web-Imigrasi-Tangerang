import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, MapPin, Mail, Shield, Globe, 
  Camera, Hash, Users, Play, ChevronLeft, FileText, 
  Languages, X, Bot, MessageSquare, ExternalLink, Send 
} from 'lucide-react';

export default function InformasiPublik() {
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: 'Halo! Saya IVARA, Asisten AI Imigrasi Tangerang. Ada yang bisa saya bantu?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Scroll otomatis ke atas saat halaman dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
  };

  // Data dokumen berdasarkan referensi gambar
  const publicData = [
    {
      title: "Daftar Isian Pelaksanaan Anggaran",
      files: [
        "LKJIP KANIMSUS TANGERANG 2025",
        "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP) Tahun 2024 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang"
      ]
    },
    {
      title: "Laporan Akuntabilitas Kinerja Instansi Pemerintah",
      files: [
        "LKJIP KANIMSUS TANGERANG 2025",
        "Laporan Akuntabilitas Kinerja Instansi Pemerintah (LKjIP) Tahun 2024 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang"
      ]
    },
    {
      title: "Perjanjian Kerja",
      files: [
        "PERJANJIAN KINERJA STRUKTURAL TANGERANG TAHUN 2025",
        "Perjanjian Kinerja Tahun 2025 Kantor Imigrasi Kelas I Khusus Non TPI Tangerang"
      ]
    },
    {
      title: "Rencana Kerja Anggaran Satuan Kerja",
      files: [
        "RENSTRA KANIM TANGERANG 2025-2029",
        "PK KAKANIM",
        "RENSTRA KANIMSUS TANGERANG 2025",
        "RENCANA KERJA DAN PROGRAM KERJA TAHUN 2024",
        "RENSTRA KANIM TANGERANG 2020 - 2025"
      ]
    },
    {
      title: "Laporan Realisasi Anggaran",
      files: []
    },
    {
      title: "Laporan Keuangan Tahunan",
      files: []
    },
    {
      title: "Standar Operasional Prosedur",
      files: [
        "STANDAR OPERASIONAL PROSEDUR APLIKASI STAR CHANNEL",
        "SK TIM PENGELOLA PENGADUAN 2025",
        "SK KOMPENSASI LAYANAN KANIMSUS TANGERANG"
      ]
    },
    {
      title: "Survey IPK - IPM",
      files: [
        "HASIL SURVEY KEPUASAN MASYARAKAT PERIODE APRIL 2025"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-md animate-fade-in">
        <div className="flex items-center space-x-4 cursor-pointer group">
          <div className="flex -space-x-2">
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10 shadow-sm p-1 transition-transform duration-500 group-hover:rotate-12">
              <div className="w-full h-full bg-yellow-600 rounded-full flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
            </div>
            <div className="w-12 h-12 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center p-1 transition-transform duration-500 group-hover:-rotate-12">
              <div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div>
            </div>
          </div>
          <div className="hidden lg:block leading-tight">
            <div className="font-bold text-[15px] tracking-wide text-white transition-colors duration-300 group-hover:text-yellow-400">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
            <div className="text-[12px] font-bold text-[#eab308] tracking-wider mt-0.5">KANTOR WILAYAH DITJENIM TANGERANG</div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-7 font-medium text-[14px]">
            <Link to="/" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Beranda</Link>
            <Link to="/informasi-publik" className="text-[#eab308] flex flex-col items-center">
              Informasi Publik <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all duration-300"></span>
            </Link>
            <Link to="/berita" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Berita</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Tentang Kami</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">FAQ</Link>
          </div>
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 transition-colors duration-300 group-focus-within:text-yellow-500" />
            <input type="text" placeholder="search" className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[200px] transition-all duration-300 focus:w-[240px] text-sm" />
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-[#1e3a8a] h-[300px] animate-fade-in group">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" 
            alt="Latar Informasi Publik" 
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
            Informasi Publik
          </h1>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full animate-fade-in-up delay-200">
        
        {/* Kolom Pencarian File */}
        <div className="bg-[#121b4a] rounded-lg p-3 flex items-center space-x-3 shadow-md mb-8">
          <Search className="w-5 h-5 text-gray-300 ml-2" />
          <input 
            type="text" 
            placeholder="SEARCH FILE" 
            className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none w-full text-sm font-medium"
          />
        </div>

        {/* Daftar Informasi Publik (Akordion/Tumpuk) */}
        <div className="space-y-6 mb-16">
          {publicData.map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              
              {/* Header Seksi */}
              <div className="bg-[#121b4a] text-white px-6 py-3 font-semibold text-sm lg:text-base">
                {section.title}
              </div>
              
              {/* Konten File */}
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-4 border-b pb-2">Attach File</p>
                
                {section.files.length === 0 ? (
                  <p className="text-sm text-gray-600 font-medium italic px-2">No Attached File</p>
                ) : (
                  <ul className="space-y-3">
                    {section.files.map((file, fileIdx) => (
                      <li key={fileIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 group">
                        <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                          <FileText className="w-5 h-5 text-blue-800 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-800 font-medium group-hover:text-blue-700 transition-colors">{file}</span>
                        </div>
                        <button className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 text-xs font-bold px-4 py-2 rounded shadow-sm whitespace-nowrap active:scale-95 transition-all">
                          View Attachment
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

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