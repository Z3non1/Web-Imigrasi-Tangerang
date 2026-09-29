import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Phone, ChevronRight, MapPin, Mail, Shield, MessageSquare, 
  Camera, Hash, Users, Play, Globe, Languages, X, Bot, ExternalLink, Send 
} from 'lucide-react';

export default function Berita() {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      
      {/* NAVBAR */}
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
            <Link to="/berita" className="text-[#eab308] flex flex-col items-center">
              Berita <span className="w-5 h-[2px] bg-[#eab308] mt-1.5 transition-all duration-300"></span>
            </Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Tentang Kami</Link>
            <Link to="/faq" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">FAQ</Link>
          </div>
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 transition-colors duration-300 group-focus-within:text-yellow-500" />
            <input type="text" placeholder="search" className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[200px] transition-all duration-300 focus:w-[240px] text-sm" />
          </div>
        </div>
      </nav>

      {/* KONTEN BERITA */}
      <main className="max-w-7xl mx-auto px-6 py-12 w-full animate-fade-in-up">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 mt-4 hover:shadow-md transition-shadow">
          <h2 className="text-3xl font-extrabold text-[#1e293b] mb-2">Warta Keimigrasian & Siaran Pers Resmi</h2>
          <p className="text-sm text-gray-500 mb-6">Pusat informasi berkala, rilis media, pengumuman operasional, dan transparansi kegiatan.</p>
          <div className="relative max-w-xl group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-blue-500 transition-colors" />
            <input type="text" placeholder="Cari warta atau info..." className="w-full pl-11 pr-24 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"/>
            <button className="absolute right-1.5 top-1.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-md transition active:scale-95">Cari</button>
          </div>
        </div>

        {/* FEATURED NEWS */}
        <Link to="/berita/featured-1" className="block">
          <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10 grid grid-cols-1 lg:grid-cols-12 gap-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"/>
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-[#1e3a8a] text-white text-xs px-3 py-1 rounded font-medium shadow-md">Unggulan</span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs text-gray-400 mb-2">• 14 Agustus 2026 • Admin</div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-4 leading-snug group-hover:text-blue-600 transition-colors">Kantor Imigrasi Tangerang Tambah 200 Kuota Layanan Paspor Simpatik</h3>
                <p className="text-sm text-gray-500 mb-6">Memfasilitasi tingginya antusiasme masyarakat jelang musim liburan, Kantor Imigrasi membuka kuota pelayanan darurat khusus...</p>
              </div>
              <div className="text-blue-600 font-semibold text-sm flex items-center group/btn">
                Baca Siaran Pers Selengkapnya <ChevronRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* DAFTAR BERITA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 animate-fade-in-up delay-200">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Link to={`/berita/${item}`} key={item}>
              <div className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer h-full">
                <div>
                  <div className="overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop&sig=${item + 20}`} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Pengumuman</span>
                      <span>• 12 Agu 2026</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">Pemberitahuan Ketersediaan Blangko Paspor Elektronik...</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">Informasi lengkap mengenai berita operasional terbaru dari Kantor Imigrasi Tangerang...</p>
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
      </main>
      
      {/* (FOOTER, FAB CS, DAN CHAT AI GUNAKAN KODE YANG SAMA DENGAN HOME.TSX) */}
      {/* Agar kode di sini tidak terlalu panjang, bayangkan ini menyalin bagian FAB persis seperti di atas */}
      
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
              <a href="https://www.lapor.go.id" target="_blank" rel="noreferrer" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors">
                <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"><ExternalLink className="w-4 h-4" /></div>
                <div><p className="font-semibold text-xs text-gray-900">Lapor.id</p><p className="text-xs text-gray-500">Layanan Pengaduan</p></div>
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
    </div>
  );
}