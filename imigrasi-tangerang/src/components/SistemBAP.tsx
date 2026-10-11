import React, { useState, useEffect } from 'react';
import { 
  FileWarning, 
  CalendarX, 
  CalendarCheck, 
  Clock, 
  Users, 
  Ticket, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight 
} from 'lucide-react';

export default function SistemBAP() {
  const [activeTab, setActiveTab] = useState<'info' | 'daftar' | 'cek'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tiketBAP, setTiketBAP] = useState<any>(null);
  
  // Simulasi Data Kuota BAP
  const [infoSistem] = useState({
    tanggalHariIni: "11 Oktober 2026",
    sisaKuotaHariIni: 0, // 0 = Habis (Merah), > 0 = Tersedia (Hijau)
    limitPerHari: 8,
    totalWaitingList: 24, 
    kuotaPenuhSampai: "14 Oktober 2026",
    tanggalTersediaBrikutnya: "15 Oktober 2026",
    sisaSlotTanggalTersedia: 4, 
  });

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alasan: ''
  });

  // Load tiket dari local storage saat web dibuka
  useEffect(() => {
    const savedTicket = localStorage.getItem('tiketBAPImigrasi');
    if (savedTicket) {
      setTiketBAP(JSON.parse(savedTicket));
    }
  }, []);

  const handleDaftar = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi Sistem Menggeser & Mencari Slot Kosong (Auto-Shift)
    setTimeout(() => {
      const kodeBooking = 'BAP-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      
      const jadwalDiberikan = {
        kode: kodeBooking,
        nama: formData.nama.toUpperCase(),
        alasan: formData.alasan,
        tanggal: infoSistem.tanggalTersediaBrikutnya,
        noAntrean: "BAP-05", 
        estimasiJam: "11:30 WIB", 
        status: "Menunggu Jadwal"
      };

      setTiketBAP(jadwalDiberikan);
      localStorage.setItem('tiketBAPImigrasi', JSON.stringify(jadwalDiberikan));
      
      setIsSubmitting(false);
      setActiveTab('cek'); 
    }, 2000);
  };

  const handleCariManual = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi cari manual
    setActiveTab('cek');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden font-sans">
      
      {/* --- HEADER BAP --- */}
      <div className="bg-[#0b162c] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 p-4 opacity-10"><FileWarning className="w-40 h-40 transform rotate-12" /></div>
        
        <div className="relative z-10 mb-6 md:mb-0 w-full md:w-auto text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-red-500/30 mb-3">
            Layanan Khusus
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Sistem Pendaftaran BAP</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto md:mx-0">Berita Acara Pemeriksaan untuk Paspor Hilang, Rusak, atau Perubahan Data.</p>
        </div>
        
        {/* Navigasi Tab Internal */}
        <div className="relative z-10 flex space-x-1.5 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md w-full md:w-auto justify-center">
          <button onClick={() => setActiveTab('info')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'info' ? 'bg-white text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>Info Kuota</button>
          <button onClick={() => setActiveTab('daftar')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'daftar' ? 'bg-yellow-500 text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>Daftar BAP</button>
          <button onClick={() => setActiveTab('cek')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'cek' ? 'bg-white text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}>Tiket Saya</button>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-gray-50/50 min-h-[400px]">
        
        {/* --- TAB 1: INFORMASI KUOTA & STATUS SISTEM --- */}
        {activeTab === 'info' && (
          <div className="animate-fade-in-up space-y-6">
            
            {/* Kartu Status Hari Ini */}
            <div className={`p-6 rounded-3xl shadow-sm border ${infoSistem.sisaKuotaHariIni === 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4`}>
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-5">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 mb-3 md:mb-0 ${infoSistem.sisaKuotaHariIni === 0 ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                   {infoSistem.sisaKuotaHariIni === 0 ? <CalendarX className="w-8 h-8" /> : <CalendarCheck className="w-8 h-8" />}
                </div>
                <div>
                  <p className={`text-xs font-extrabold uppercase tracking-widest mb-1 ${infoSistem.sisaKuotaHariIni === 0 ? 'text-red-500' : 'text-green-600'}`}>
                    Status Hari Ini ({infoSistem.tanggalHariIni})
                  </p>
                  <h3 className="text-2xl font-black text-[#0b162c]">
                    {infoSistem.sisaKuotaHariIni === 0 ? 'Kuota BAP Telah Habis' : 'Kuota Masih Tersedia'}
                  </h3>
                </div>
              </div>
              <div className="bg-white py-3 px-8 rounded-2xl shadow-sm border border-gray-100 min-w-[140px] flex flex-col items-center justify-center shrink-0">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Sisa Slot</p>
                <p className={`text-4xl font-black flex items-baseline gap-1 ${infoSistem.sisaKuotaHariIni === 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {infoSistem.sisaKuotaHariIni} <span className="text-sm text-gray-500">/ {infoSistem.limitPerHari}</span>
                </p>
              </div>
            </div>

            {/* Grid 3 Kolom Info Kuota Depan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Penuh Hingga</p>
                <p className="text-lg font-black text-[#0b162c]">{infoSistem.kuotaPenuhSampai}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-blue-100 flex flex-col items-center text-center relative">
                <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-2">Jadwal Kosong Berikutnya</p>
                <p className="text-lg font-black text-[#0b162c]">{infoSistem.tanggalTersediaBrikutnya}</p>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    Sisa {infoSistem.sisaSlotTanggalTersedia} Slot
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Daftar Tunggu</p>
                <p className="text-lg font-black text-[#0b162c]">{infoSistem.totalWaitingList} Orang</p>
              </div>
            </div>

            {/* Pemberitahuan Sistem */}
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1 text-sm">Pemberitahuan Sistem BAP</h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Jika kuota hari ini telah habis, Anda tetap bisa mendaftar. Sistem kami akan secara otomatis mengatur dan menempatkan jadwal Anda pada tanggal kosong terdekat berikutnya sesuai urutan pendaftaran.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: FORM DAFTAR --- */}
        {activeTab === 'daftar' && (
          <form onSubmit={handleDaftar} className="animate-fade-in-up bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[#0b162c] mb-6 border-b border-gray-100 pb-4">Formulir Pengajuan BAP</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Nama Lengkap Pemohon</label>
                <input required type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} placeholder="Sesuai KTP" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all font-medium text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">NIK KTP</label>
                <input required type="number" value={formData.nik} onChange={e => setFormData({...formData, nik: e.target.value})} placeholder="16 Digit NIK" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all font-medium text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Alasan BAP</label>
                <select required value={formData.alasan} onChange={e => setFormData({...formData, alasan: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all font-medium text-sm appearance-none">
                  <option value="" disabled>-- Pilih Kasus --</option>
                  <option value="Paspor Hilang">Paspor Hilang</option>
                  <option value="Paspor Rusak (Koyak/Basah/dll)">Paspor Rusak (Koyak/Basah/dll)</option>
                  <option value="Perbedaan Data Kependudukan">Perbedaan Data Kependudukan</option>
                </select>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0b162c] hover:bg-yellow-500 text-white hover:text-[#0b162c] font-extrabold py-4 rounded-xl shadow-md transition-all flex justify-center items-center group">
                  {isSubmitting ? (
                    <span className="flex items-center"><div className="w-5 h-5 border-2 border-white/30 border-t-current rounded-full animate-spin mr-2"></div> Memproses Jadwal...</span>
                  ) : (
                    <span className="flex items-center">Dapatkan Jadwal BAP <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></span>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">*Sistem akan secara otomatis menempatkan Anda di tanggal terdekat yang belum melampaui limit {infoSistem.limitPerHari} orang/hari.</p>
              </div>
            </div>
          </form>
        )}

        {/* --- TAB 3: TIKET / CEK STATUS --- */}
        {activeTab === 'cek' && (
          <div className="animate-fade-in-up">
            {!tiketBAP ? (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md mx-auto mt-4">
                <Ticket className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-extrabold text-[#0b162c] mb-2">Cek Jadwal BAP Anda</h3>
                <p className="text-sm text-gray-500 mb-6">Masukkan kode registrasi untuk melihat jadwal dan estimasi waktu kedatangan Anda.</p>
                <form onSubmit={handleCariManual} className="space-y-4">
                  <input type="text" placeholder="Contoh: BAP-9XYZ" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 text-center uppercase font-bold tracking-widest" required />
                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#0b162c] font-extrabold py-3.5 rounded-xl transition-all shadow-sm">Lacak Jadwal</button>
                </form>
              </div>
            ) : (
              /* KARTU TIKET DIGITAL */
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl mx-auto">
                <div className="bg-green-500 p-5 text-center flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 text-white mb-2" />
                  <h3 className="text-white font-extrabold text-xl">Jadwal BAP Berhasil Ditetapkan!</h3>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-b border-gray-100 pb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center md:text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Kode Pendaftaran</p>
                      <p className="text-3xl font-black text-[#0b162c] tracking-wider">{tiketBAP.kode}</p>
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Pemohon</p>
                      <p className="text-xl font-bold text-gray-800">{tiketBAP.nama}</p>
                      <div>
                        <span className="inline-block mt-1.5 bg-red-50 border border-red-100 text-red-600 text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase">{tiketBAP.alasan}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-extrabold text-gray-400 mb-4 uppercase tracking-widest text-center md:text-left">Detail Kehadiran</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl text-center md:text-left border border-blue-100/50">
                      <CalendarCheck className="w-5 h-5 text-blue-500 mb-2 mx-auto md:mx-0" />
                      <p className="text-[10px] text-blue-900/60 font-bold uppercase tracking-wider mb-1">Tanggal</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.tanggal}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-2xl text-center md:text-left border border-yellow-100/50">
                      <Users className="w-5 h-5 text-yellow-600 mb-2 mx-auto md:mx-0" />
                      <p className="text-[10px] text-yellow-900/60 font-bold uppercase tracking-wider mb-1">No. Antrean</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.noAntrean}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl text-center md:text-left border border-red-100/50">
                      <Clock className="w-5 h-5 text-red-500 mb-2 mx-auto md:mx-0" />
                      <p className="text-[10px] text-red-900/60 font-bold uppercase tracking-wider mb-1">Waktu Datang</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.estimasiJam}</p>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 leading-relaxed font-medium text-center">
                      Harap hadir <strong className="text-[#0b162c]">15 menit sebelum estimasi waktu</strong> dengan membawa: KTP Asli, Surat Kehilangan Kepolisian asli (jika hilang), dan fotokopi Paspor Lama (jika ada).
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button onClick={() => {setTiketBAP(null); localStorage.removeItem('tiketBAPImigrasi');}} className="text-[11px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors">
                      Hapus & Daftar Baru
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}