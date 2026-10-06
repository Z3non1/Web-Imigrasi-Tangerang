import React, { useContext } from 'react';
import { MapPin, Phone, MessageSquare, Mail, Shield, Globe, ChevronRight } from 'lucide-react';
import { LanguageContext } from '../App';

const footerData = {
  ID: {
    agency: "KANTOR IMIGRASI KELAS I KHUSUS NON TPI TANGERANG",
    kanwil: "Kantor Wilayah Direktorat Jenderal Imigrasi Banten",
    address: "Jl. Taman Makam Pahlawan Taruna No.10, RT.006/RW.008, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
    relatedSites: "SITUS TERKAIT",
    dirjen: "Ditjen Imigrasi",
    profile: "PROFIL UPT",
    profileLink: "Profil Instansi",
    locationMap: "PETA LOKASI",
    follow: "IKUTI KAMI",
    copyright1: "Laman Resmi Kantor Imigrasi Kelas I Khusus Non TPI Tangerang",
    copyright2: "Kantor Wilayah Direktorat Jenderal Imigrasi Provinsi Banten",
    copyright3: "Copyright © 2026 Direktorat Jenderal Imigrasi"
  },
  EN: {
    agency: "CLASS I SPECIAL IMMIGRATION OFFICE NON TPI TANGERANG",
    kanwil: "Regional Office of Directorate General of Immigration Banten",
    address: "Jl. Taman Makam Pahlawan Taruna No.10, RT.006/RW.008, Sukasari, Tangerang District, Tangerang City, Banten 15118",
    relatedSites: "RELATED SITES",
    dirjen: "DirGen of Immigration",
    profile: "OFFICE PROFILE",
    profileLink: "Agency Profile",
    locationMap: "LOCATION MAP",
    follow: "FOLLOW US",
    copyright1: "Official Website of Class I Special Immigration Office Non TPI Tangerang",
    copyright2: "Regional Office of Directorate General of Immigration Banten Province",
    copyright3: "Copyright © 2026 Directorate General of Immigration"
  },
  ZH: {
    agency: "坦格朗非TPI一类特别移民局",
    kanwil: "万丹省移民总局区域办事处",
    address: "Jl. Taman Makam Pahlawan Taruna No.10, RT.006/RW.008, Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
    relatedSites: "相关网站",
    dirjen: "移民总局",
    profile: "机构简介",
    profileLink: "机构档案",
    locationMap: "位置地图",
    follow: "关注我们",
    copyright1: "坦格朗非TPI一类特别移民局官方网站",
    copyright2: "万丹省移民总局区域办事处",
    copyright3: "版权所有 © 2026 移民总局"
  }
};

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const t = footerData[lang as 'ID' | 'EN' | 'ZH'] || footerData['ID'];

  return (
    <footer className="bg-[#0b162c] text-white pt-16 border-t-[6px] border-yellow-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* GRID UTAMA FOOTER (Diubah jadi 4 Kolom agar muat Maps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-12">
          
          {/* KOLOM 1: Informasi Kontak (Lebar 4/12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-start space-x-3">
              <div className="flex -space-x-2 flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center z-10"><Shield className="w-5 h-5 text-yellow-500" /></div>
                <div className="w-10 h-10 bg-[#0b162c] rounded-full border-2 border-white flex items-center justify-center"><Globe className="w-5 h-5 text-teal-500" /></div>
              </div>
              <div>
                <h3 className="font-extrabold text-sm md:text-[13px] tracking-wide text-white leading-tight uppercase">{t.agency}</h3>
                <p className="text-[10px] text-yellow-400 font-bold mt-1 uppercase">{t.kanwil}</p>
              </div>
            </div>

            <div className="space-y-4 mt-6 text-gray-300 text-sm">
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-yellow-400 transition-colors mt-0.5" />
                <p className="leading-relaxed text-xs pr-4">{t.address}</p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <p className="text-xs">021 39506669 <span className="text-[10px] text-gray-400 ml-1">(call center)</span></p>
              </div>
              <div className="flex items-center space-x-3 group">
                <MessageSquare className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-green-400 transition-colors" />
                <p className="text-xs">0811 811 9000 <span className="text-[10px] text-gray-400 ml-1">(chat only)</span></p>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                <p className="text-xs">kanim_tangerang@imigrasi.go.id</p>
              </div>
            </div>
          </div>

          {/* KOLOM 2: Situs Terkait (Lebar 2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-[11px] tracking-widest text-white uppercase mb-4">{t.relatedSites}</h4>
            <a href="https://www.imigrasi.go.id" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-3.5 rounded-xl border border-white/10 hover:border-yellow-400 hover:bg-white/5 transition-all group">
              <span className="text-xs font-medium text-gray-300 group-hover:text-yellow-400">{t.dirjen}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-yellow-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* KOLOM 3: Profil UPT (Lebar 2/12) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-[11px] tracking-widest text-white uppercase mb-4">{t.profile}</h4>
            <a href="/tentang-kami" className="flex items-center justify-between w-full p-3.5 rounded-xl border border-white/10 hover:border-yellow-400 hover:bg-white/5 transition-all group">
              <span className="text-xs font-medium text-gray-300 group-hover:text-yellow-400">{t.profileLink}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-yellow-400 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* KOLOM 4: Google Maps Embed (Lebar 4/12) - BARU */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-extrabold text-[11px] tracking-widest text-white uppercase mb-4">{t.locationMap}</h4>
            
            {/* Wrapper iframe untuk Maps */}
            <div className="w-full h-[180px] rounded-xl overflow-hidden border-2 border-white/10 hover:border-yellow-400 transition-colors relative group">
              {/* Overlay agar map tidak langsung ter-scroll saat pengguna men-scroll halaman di HP */}
              <div className="absolute inset-0 bg-transparent group-hover:pointer-events-none z-10"></div>
              
              <iframe 
                title="Google Maps Kantor Imigrasi Tangerang"
                src="https://maps.google.com/maps?q=Kantor%20Imigrasi%20Kelas%20I%20Khusus%20Non%20TPI%20Tangerang&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p className="text-[10px] text-gray-500 text-right mt-1">Titik Lokasi: Jl. Taman Makam Pahlawan Taruna No.10</p>
          </div>
          
        </div>

        {/* BARIS BAWAH: Sosial Media & Copyright */}
        <div className="border-t border-white/10 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{t.follow}</span>
            <div className="flex space-x-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 5 15 5 15s-1.4-.5-2-1.4c.5 0 1.2-.1 1.7-.3C2 12 2 10 2 10s.9.5 1.6.5c-1.2-.8-1.5-2.6-1-4 1.7 2 4.4 3.3 7.4 3.5-1.5-6.5 7.6-9.8 11-4.2 1.4-.3 2.8-1 4-1.5-1.2 1.4-2.5 2.2-3 2.2z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          <div className="text-center lg:text-right space-y-1.5">
            <p className="text-[10px] text-gray-400 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-1 sm:gap-2">
              <span>{t.copyright1}</span>
              <span className="hidden sm:inline text-gray-600">|</span>
              <span>{t.copyright2}</span>
            </p>
            <p className="text-[10px] text-gray-500 font-medium">{t.copyright3}</p>
          </div>

        </div>
      </div>
    </footer>
  );
}