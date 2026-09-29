import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, ChevronRight, MapPin, Mail, ArrowUpRight, Shield, CheckSquare, 
  MessageSquare, Camera, Hash, Users, Play, Book, Flag, Globe, Plane, User, 
  Headphones, Bus, ClipboardCheck, ShieldAlert, FileText, Languages, X, Bot, 
  ExternalLink, Send
} from 'lucide-react';

export default function Home() {
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ivara', text: 'Halo! Saya IVARA, Asisten AI Imigrasi Tangerang. Ada yang bisa saya bantu?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ivara', text: "Terima kasih atas pertanyaannya. Silakan hubungi call center kami untuk info lebih lanjut." }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
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
            <Link to="/" className="text-[#eab308] flex flex-col items-center">
              Beranda <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all duration-300"></span>
            </Link>
            <Link to="/informasi-publik" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Informasi Publik</Link>
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

      {/* HERO SECTION - Perbaikan overflow agar kotak BERANDA tidak terpotong */}
      <div className="relative bg-[#1e3a8a] h-[400px] animate-fade-in group">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop" alt="Staff Imigrasi" className="w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-[10s] ease-out group-hover:scale-110"/>
        </div>
        <div className="absolute top-1/3 left-10 lg:left-24 text-white animate-fade-in-up delay-100">
          <p className="text-xl font-semibold mb-1">Selamat Datang di</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-md">IMIGRASI TANGERANG</h1>
          <p className="text-lg font-medium text-yellow-400 drop-shadow-sm">SIGAP • TANGGAP • RAMAH</p>
        </div>
        <div className="absolute -bottom-5 left-0 bg-[#0f172a] text-yellow-400 font-bold px-12 py-3 uppercase tracking-wider skew-x-12 -ml-6 animate-fade-in-up delay-200 z-20">
          <div className="-skew-x-12 ml-6">BERANDA</div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 w-full mt-12">
        {/* WIDGET LAYANAN CEPAT & CEK STATUS */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-24 animate-fade-in-up delay-200">
          <div>
            <h2 className="text-3xl font-bold text-[#1e293b] mb-6 leading-tight">Cek Status Permohonan <br/> Layanan Keimigrasian</h2>
            <div className="w-20 h-1.5 bg-yellow-500 mb-8 rounded-full"></div>
            <div className="rounded-lg shadow-md overflow-hidden group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1559589689-577aabd1ce4c?q=80&w=2070&auto=format&fit=crop" className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"/>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Masukkan Nomor Permohonan</label>
              <input type="text" placeholder="Contoh: 1234567890123456" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"/>
            </div>
            <button className="w-full bg-[#1e293b] text-white font-bold py-3.5 rounded-lg hover:bg-blue-900 active:scale-[0.98] transition-all duration-200">Cek Status Permohonan</button>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">*Fitur ini hanya dapat digunakan untuk pengecekan status permohonan layanan keimigrasian yang diajukan di Kantor Imigrasi Kelas I Non TPI Tangerang.</p>
          </div>
        </div>

        {/* LAYANAN KEIMIGRASIAN */}
        <div className="mb-24 relative animate-fade-in-up delay-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"><Shield className="w-[500px] h-[500px]" /></div>
          <div className="relative z-10">
            <div className="flex justify-center md:justify-start mb-10">
              <div className="bg-white border border-gray-100 px-6 py-3 rounded-xl shadow-sm flex items-center space-x-3 border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
                <Flag className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-wide">Layanan Keimigrasian</h2>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mb-16">
              <button className="group bg-[#1e293b] text-white px-8 py-4 rounded-xl text-xs md:text-sm font-semibold hover:bg-blue-900 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border-b-[3px] border-yellow-500 hover:-translate-y-1">
                <Book className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
                <span>INFORMASI PELAYANAN PASPOR REPUBLIK INDONESIA</span>
              </button>
              <button className="group bg-[#1e293b] text-white px-8 py-4 rounded-xl text-xs md:text-sm font-semibold hover:bg-blue-900 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border-b-[3px] border-yellow-500 hover:-translate-y-1">
                <Globe className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
                <span>INFORMASI PELAYANAN IMIGRASI BAGI ORANG ASING</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Perbaikan: e-SRPI dikembalikan (Total 7 Layanan) */}
              {[
                { icon: Plane, title: "Layanan Visa Keliling", desc: "Berisi seluruh informasi mengenai prosedur permohonan visa online lengkap dengan persyaratannya." },
                { icon: User, title: "Layanan A P O A", desc: "Layanan untuk Pelaporan dari setiap Penjamin dan Pemilik tempat penginapan bagi Orang Asing." },
                { icon: Headphones, title: "Aplikasi L A P O R", desc: "Layanan penyampaian semua aspirasi dan pengaduan masyarakat Indonesia melalui kanal online." },
                { icon: Bus, title: "Layanan Ezy Pasport", desc: "Berisi seluruh informasi mengenai prosedur permohonan Ezy Passport jemput bola." },
                { icon: ClipboardCheck, title: "Layanan Izin Tinggal", desc: "Aplikasi berbasis web yang bertujuan untuk memberikan layanan Izin Tinggal Keimigrasian secara online." },
                { icon: ShieldAlert, title: "Whistle Blowing System", desc: "Layanan pelaporan pelanggaran di Lingkungan Kementerian Hukum dan HAM RI demi tata kelola bersih." },
                { icon: FileText, title: "Layanan e-SRPI", desc: "Layanan untuk membantu masyarakat Indonesia mendapatkan Surat Rekomendasi Pemerintah untuk Visa Australia." }
              ].map((layanan, i) => (
                <div key={i} className={`group bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-50 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${i === 6 ? 'lg:col-start-2' : ''}`}>
                  <div className="w-14 h-14 rounded-full border-2 border-yellow-500 flex items-center justify-center mx-auto mb-5 text-[#1e293b] group-hover:bg-yellow-500 group-hover:text-white transition-colors duration-300">
                    <layanan.icon className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-[#1e293b]">{layanan.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{layanan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PREVIEW BERITA */}
        <div className="mb-12 animate-fade-in-up delay-300">
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <h2 className="text-2xl font-extrabold text-[#111827]">Berita & Publikasi Kegiatan</h2>
            <Link to="/berita" className="text-gray-900 font-semibold text-sm flex items-center hover:text-blue-600 transition-colors group">
              Baca Selengkapnya <ArrowUpRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "Pemberitahuan Ketersediaan Blangko Paspor Elektronik Lembar Polikarbonat", date: "13 Agu 2026", cat: "Pengumuman" },
              { id: 2, title: "Operasi Gabungan Jagratara: Kanim Tangerang Periksa Kepatuhan Izin...", date: "12 Agu 2026", cat: "Intelijen" },
              { id: 3, title: "Optimalisasi Layanan Ramah HAM di ULP Mall Tangerang: Jalur Khusus Lansia...", date: "10 Agu 2026", cat: "Layanan" }
            ].map((news) => (
              <Link to={`/berita/${news.id}`} key={news.id}>
                <div className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full">
                  <div>
                    <div className="overflow-hidden">
                      <img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop&sig=${news.id + 10}`} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">{news.cat}</span>
                        <span>• {news.date}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-300">{news.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">Informasi lengkap mengenai berita dan publikasi kegiatan terbaru dari Kantor Imigrasi Kelas I Khusus Non TPI Tangerang...</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <span className="text-blue-600 font-semibold text-sm flex items-center group/btn">
                      Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1e293b] text-white pt-16 pb-8 mt-auto animate-fade-in-up delay-300">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-700 pb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center"><Shield className="w-7 h-7 text-[#1e293b]" /></div>
              <div className="font-bold leading-tight">KANTOR IMIGRASI KELAS I <br/> NON TPI TANGERANG</div>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start hover:text-yellow-400 transition-colors"><MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-yellow-500" /><p>Jl. Taman Makam Pahlawan Taruna No.10, Tangerang</p></div>
              <div className="flex items-center hover:text-yellow-400 transition-colors"><Phone className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-500" /><p>(021) 5579 0871</p></div>
            </div>
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

      {/* FLOATING ACTION BUTTONS */}
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
              {/* Perbaikan: Link Lapor.id dikembalikan */}
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

      {/* JENDELA CHAT AI IVARA */}
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