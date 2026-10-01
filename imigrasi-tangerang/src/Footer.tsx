import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, ExternalLink, ChevronRight, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b162c] text-white pt-16 pb-8 border-t-4 border-yellow-500 relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* KOLOM 1: INFORMASI KANTOR (Lebar 5 Grid) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-yellow-400 border border-white/20">RI</div>
            <div>
              <h2 className="font-extrabold text-[15px] tracking-wide text-white leading-tight">
                KANTOR IMIGRASI KELAS I KHUSUS NON TPI TANGERANG
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Kantor Wilayah Direktorat Jenderal Imigrasi Banten</p>
            </div>
          </div>

          <div className="space-y-3.5 text-sm text-gray-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">Jl. Taman Makam Pahlawan Taruna No.10, RT.006/RW.008, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="font-medium">021 39506669 (call center)</p>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="font-medium">0811 811 9000 (chat only)</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="font-medium">kanim_tangerang@imigrasi.go.id</p>
            </div>
          </div>
        </div>

        {/* KOLOM 2: SITUS TERKAIT & PROFIL UPT (Lebar 4 Grid) */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest mb-4">Situs Terkait</h3>
            <div className="space-y-3">
              <a href="https://www.imigrasi.go.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <span className="text-xs font-bold text-gray-200 group-hover:text-white">Direktorat Jenderal Imigrasi</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </a>
              <a href="#" className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <span className="text-xs font-bold text-gray-200 group-hover:text-white">Profil Kantor Imigrasi Tangerang</span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* KOLOM 3: GOOGLE MAPS EMBED SESUAI LINK YANG DIBERIKAN (Lebar 3 Grid) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest">Lokasi Kantor</h3>
            <a href="https://maps.app.goo.gl/TLYMzjWaA869VSyS7" target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-300 hover:text-yellow-400 underline font-medium">Buka Peta</a>
          </div>
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/20 shadow-lg relative group">
            <iframe 
              title="Lokasi Kantor Imigrasi Tangerang"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.643354366668!2d106.6345!3d-6.1785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f88c8b21f307%3A0x629c4bc11c7501b8!2sJl.%20Taman%20Makam%20Pahlawan%20Taruna%20No.10%2C%20Sukasari%2C%20Kec.%20Tangerang%2C%20Kota%20Tangerang%2C%20Banten%2015118!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      {/* SUB-FOOTER: IKUTI KAMI & CALL CENTER BAR */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-extrabold text-gray-300 tracking-wider uppercase">Ikuti Kami:</span>
            <div className="flex space-x-3">
              {['fb', 'ig', 'tw', 'yt', 'tk', 'li'].map((social, idx) => (
                <div key={idx} className="w-9 h-9 bg-white/10 hover:bg-yellow-500 hover:text-[#0b162c] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer text-xs font-bold uppercase">
                  {social}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 px-6 py-3 rounded-xl border border-white/10">
            <Headphones className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Butuh Bantuan?</p>
              <p className="text-xs font-extrabold text-white">Hubungi kami melalui Call Center</p>
            </div>
            <ChevronRight className="w-5 h-5 text-yellow-400 ml-2" />
          </div>
        </div>
      </div>

      {/* COPYRIGHT & LEGAL */}
      <div className="max-w-7xl mx-auto px-6 pt-4 text-center text-xs text-gray-400 font-medium space-y-1">
        <p>Laman Resmi Kantor Imigrasi Kelas I Non TPI Tangerang | Kantor Wilayah Direktorat Jenderal Imigrasi Provinsi Banten</p>
        <p className="text-gray-500">Copyright &copy; {new Date().getFullYear()} Direktorat Jenderal Imigrasi</p>
      </div>
    </footer>
  );
}