import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, FileText, MessageSquare, Download, Phone, Globe, Shield, Search, X, Bot, Send, ExternalLink
} from 'lucide-react';

export default function DetailBerita() {
  const { id } = useParams();
  const [isCsOpen, setIsCsOpen] = useState(false);
  const [isIvaraOpen, setIsIvaraOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
            <div className="font-bold text-[15px] tracking-wide text-white">KANTOR IMIGRASI KELAS I KHUSUS NON TPI</div>
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
            <Link to="/faq" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">FAQ</Link>
            <Link to="/tentang-kami" className="text-white hover:text-[#eab308] transition-all duration-300 transform hover:-translate-y-0.5 mt-0.5">Tentang Kami</Link>
          </div>
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 text-gray-400 absolute left-4" />
            <input type="text" placeholder="search" className="pl-10 pr-4 py-2.5 rounded-full bg-[#1e3a5f] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[200px] text-sm" />
          </div>
        </div>
      </nav>

      {/* KONTEN DETAIL BERITA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8 border-b pb-4">
          <Link to="/berita" className="mr-4 text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" /> Kembali
          </Link>
          <span className="hidden sm:inline">Beranda / Warta Keimigrasian / Detail Siaran Pers</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* KIRI - KONTEN BERITA UTAMA */}
          <article className="lg:w-2/3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full shadow-sm">Siaran Pers</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
              Kantor Imigrasi Tangerang Tambah 200 Kuota Layanan Paspor Simpatik Akhir Pekan Sambut Libur Sekolah (ID: {id || '1'})
            </h1>

            <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
              <span className="mr-4 font-medium text-gray-700">Oleh: Humas Kanim Tangerang</span>
              <span>Kamis, 15 Juli 2026 | 14:00 WIB</span>
            </div>

            <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden mb-8 shadow-inner relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop" 
                alt="Suasana Pelayanan Paspor" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>

            <div className="prose max-w-none text-gray-700 space-y-6 leading-relaxed text-[15px]">
              <p>
                <strong className="text-[#1e293b]">TANGERANG</strong> - Merespons tingginya animo masyarakat Kota dan Kabupaten Tangerang dalam pengurusan dokumen perjalanan jelang libur semester dan kenaikan kelas tahun ajaran 2026, Kantor Imigrasi menyelenggarakan program pelayanan paspor akhir pekan bertajuk "Paspor Simpatik" dengan tambahan alokasi 200 kuota khusus.
              </p>
              
              <blockquote className="border-l-4 border-blue-600 pl-5 bg-blue-50 py-4 pr-4 rounded-r-lg text-blue-900 font-medium my-8 shadow-sm">
                <span className="text-2xl text-blue-300 leading-none absolute -ml-2 -mt-2">"</span>
                Layanan Paspor Simpatik ini merupakan bentuk dedikasi kami untuk menghadirkan pelayanan yang inklusif dan responsif. Kami memahami banyak warga yang kesulitan mengurus paspor pada hari kerja.
                <span className="block mt-3 text-sm font-semibold text-blue-700">- Kepala Kantor Imigrasi Kelas I Khusus Non TPI Tangerang</span>
              </blockquote>

              <h3 className="text-xl font-extrabold text-[#1e293b] mt-8 mb-4">Transparansi Biaya PNBP Melalui MPN G2</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="border border-blue-100 bg-blue-50/50 p-6 rounded-xl hover:shadow-md hover:bg-white transition-all transform hover:-translate-y-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Paspor Biasa 48 Halaman</p>
                  <p className="text-3xl font-extrabold text-[#1e3a8a]">Rp 350.000</p>
                </div>
                <div className="border border-blue-100 bg-blue-50/50 p-6 rounded-xl hover:shadow-md hover:bg-white transition-all transform hover:-translate-y-1">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Paspor Elektronik 48 Halaman</p>
                  <p className="text-3xl font-extrabold text-[#1e3a8a]">Rp 650.000</p>
                </div>
              </div>
            </div>
          </article>

          {/* KANAN - SIDEBAR */}
          <aside className="lg:w-1/3 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-[#1e293b]">Dokumen Resmi PDF</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">Unduh dokumen siaran pers resmi berformat PDF lengkap dengan tanda tangan digital instansi.</p>
              <button className="w-full bg-[#1e293b] text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-900 active:scale-95 transition-all">
                <Download className="w-4 h-4 mr-2" /> Download File
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-[#1e293b]">Layanan Cepat</h3>
              <ul className="space-y-3">
                <li className="group flex items-center gap-4 p-3 hover:bg-blue-50 rounded-xl cursor-pointer border border-transparent hover:border-blue-100 transition-all">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><FileText className="w-5 h-5" /></div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Informasi Persyaratan Paspor</span>
                </li>
                <li className="group flex items-center gap-4 p-3 hover:bg-green-50 rounded-xl cursor-pointer border border-transparent hover:border-green-100 transition-all">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"><MessageSquare className="w-5 h-5" /></div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700">Live Chat Pengaduan</span>
                </li>
              </ul>
            </div>
            
          </aside>
        </div>
      </main>

      {/* FLOATING ACTION BUTTONS (CS & Chat) */}
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