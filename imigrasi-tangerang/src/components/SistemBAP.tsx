import React, { useState, useEffect } from 'react';
import { FileWarning, CalendarX, CalendarCheck, Clock, Users, Ticket, Search, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

export default function SistemBAP() {
  const [activeTab, setActiveTab] = useState<'info' | 'daftar' | 'cek'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tiketBAP, setTiketBAP] = useState<any>(null);
  
  // Simulasi Data Kuota BAP dari Database Backend
  // Limit per hari = 8 Orang
  const [infoSistem] = useState({
    limitPerHari: 8,
    totalWaitingList: 24, // Total orang yang sudah daftar dan menunggu hari
    kuotaPenuhSampai: "14 Oktober 2026",
    tanggalTersediaBrikutnya: "15 Oktober 2026",
    sisaSlotTanggalTersedia: 4, // Tanggal 15 tersisa 4 slot lagi
  });

  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alasan: ''
  });

  // Mengecek apakah ada tiket BAP di local storage
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
      
      // Sistem otomatis menempatkan pendaftar di tanggal yang masih kosong
      const jadwalDiberikan = {
        kode: kodeBooking,
        nama: formData.nama.toUpperCase(),
        alasan: formData.alasan,
        tanggal: infoSistem.tanggalTersediaBrikutnya,
        noAntrean: "BAP-05", // Karena sisa slot 4 dari 8, berarti dia nomor ke 5
        estimasiJam: "11:30 WIB", // Sistem menghitung (08:00 + (4 orang x 45 menit))
        status: "Menunggu Jadwal"
      };

      setTiketBAP(jadwalDiberikan);
      localStorage.setItem('tiketBAPImigrasi', JSON.stringify(jadwalDiberikan));
      
      setIsSubmitting(false);
      setActiveTab('cek'); // Lempar ke tab cek tiket
    }, 2500);
  };

  const handleCariManual = (e: React.FormEvent) => {
    e.preventDefault();
    // Di dunia nyata ini memanggil API backend berdasarkan input nomor tiket
    setActiveTab('cek');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden font-sans">
      
      {/* HEADER BAP */}
      <div className="bg-[#0b162c] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 p-4 opacity-10"><FileWarning className="w-40 h-40 transform rotate-12" /></div>
        <div className="relative z-10 mb-6 md:mb-0">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-red-500/30 mb-3">
            Layanan Khusus
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Sistem Pendaftaran BAP</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-md">Berita Acara Pemeriksaan untuk Paspor Hilang, Rusak, atau Perubahan Data.</p>
        </div>
        
        {/* Navigasi Tab Internal */}
        <div className="relative z-10 flex space-x-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          <button onClick={() => setActiveTab('info')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'info' ? 'bg-white text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white'}`}>Info Kuota</button>
          <button onClick={() => setActiveTab('daftar')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'daftar' ? 'bg-yellow-500 text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white'}`}>Daftar BAP</button>
          <button onClick={() => setActiveTab('cek')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'cek' ? 'bg-white text-[#0b162c] shadow-sm' : 'text-gray-300 hover:text-white'}`}>Tiket Saya</button>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-gray-50/50">
        
        {/* --- TAB 1: INFORMASI KUOTA & STATUS SISTEM --- */}
        {activeTab === 'info' && (
          <div className="animate-fade-in-up space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3"><CalendarX className="w-6 h-6"/></div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Kuota Penuh Hingga</p>
                <p className="text-lg font-black text-[#0b162c]">{infoSistem.kuotaPenuhSampai}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-green-400 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full -mr-4 -mt-4"></div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 relative z-10"><CalendarCheck className="w-6 h-6"/></div>
                <p className="text-xs text-green-700 font-bold uppercase mb-1 relative z-10">Jadwal Kosong Terdekat</p>
                <p className="text-lg font-black text-[#0b162c] relative z-10">{infoSistem.tanggalTersediaBrikutnya}</p>
                <p className="text-xs font-bold text-green-600 mt-1 relative z-10">Sisa {infoSistem.sisaSlotTanggalTersedia} Slot</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3"><Users className="w-6 h-6"/></div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Daftar Tunggu</p>
                <p className="text-lg font-black text-[#0b162c]">{infoSistem.totalWaitingList} Orang</p>
              </div>

            </div>

            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-blue-900 mb-1">Bagaimana Sistem Ini Bekerja?</h4>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                  Pemeriksaan BAP memakan waktu yang cukup lama. Oleh karena itu, kami membatasi maksimal <strong>{infoSistem.limitPerHari} pemohon per hari</strong>. Jika kuota hari ini penuh, sistem akan otomatis menggeser jadwal Anda ke hari kerja berikutnya yang masih memiliki kuota kosong.
                </p>
                <button onClick={() => setActiveTab('daftar')} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors shadow-sm">
                  Daftar Antrean BAP Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: FORM DAFTAR --- */}
        {activeTab === 'daftar' && (
          <form onSubmit={handleDaftar} className="animate-fade-in-up bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
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
                <select required value={formData.alasan} onChange={e => setFormData({...formData, alasan: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 transition-all font-medium text-sm">
                  <option value="" disabled>-- Pilih Kasus --</option>
                  <option value="Paspor Hilang">Paspor Hilang</option>
                  <option value="Paspor Rusak (Koyak/Basah/dll)">Paspor Rusak (Koyak/Basah/dll)</option>
                  <option value="Perbedaan Data Kependudukan">Perbedaan Data Kependudukan</option>
                </select>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#0b162c] hover:bg-yellow-500 text-white hover:text-[#0b162c] font-extrabold py-4 rounded-xl shadow-md transition-colors flex justify-center items-center group">
                  {isSubmitting ? (
                    <span className="flex items-center"><div className="w-5 h-5 border-2 border-white/30 border-t-current rounded-full animate-spin mr-2"></div> Mencari Jadwal Kosong...</span>
                  ) : (
                    <span className="flex items-center">Dapatkan Jadwal BAP <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></span>
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">*Sistem akan secara otomatis menempatkan Anda di tanggal terdekat yang belum melampaui limit {infoSistem.limitPerHari} orang/hari.</p>
              </div>
            </div>
          </form>
        )}

        {/* --- TAB 3: TIKET / CEK STATUS --- */}
        {activeTab === 'cek' && (
          <div className="animate-fade-in-up">
            {!tiketBAP ? (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md mx-auto mt-4">
                <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0b162c] mb-2">Cek Jadwal BAP Anda</h3>
                <p className="text-sm text-gray-500 mb-6">Masukkan kode registrasi untuk melihat jadwal dan estimasi waktu kedatangan Anda.</p>
                <form onSubmit={handleCariManual}>
                  <input type="text" placeholder="Contoh: BAP-9XYZ" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 text-center uppercase font-bold tracking-widest mb-4" required />
                  <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#0b162c] font-extrabold py-3 rounded-xl transition-all">Lacak Jadwal</button>
                </form>
              </div>
            ) : (
              /* KARTU TIKET BAP DIGITAL */
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-2xl mx-auto">
                <div className="bg-green-500 p-4 text-center">
                  <CheckCircle2 className="w-10 h-10 text-white mx-auto mb-2" />
                  <h3 className="text-white font-extrabold text-xl">Jadwal BAP Ditetapkan!</h3>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-b border-gray-100 pb-8">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Kode Pendaftaran</p>
                      <p className="text-3xl font-black text-[#0b162c]">{tiketBAP.kode}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Pemohon</p>
                      <p className="text-xl font-bold text-gray-800">{tiketBAP.nama}</p>
                      <span className="inline-block mt-1 bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{tiketBAP.alasan}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-[#0b162c] mb-4 uppercase tracking-wider">Detail Jadwal Kehadiran</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <CalendarCheck className="w-5 h-5 text-blue-500 mb-2" />
                      <p className="text-xs text-blue-900 font-medium mb-1">Tanggal</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.tanggal}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-2xl">
                      <Users className="w-5 h-5 text-yellow-600 mb-2" />
                      <p className="text-xs text-yellow-900 font-medium mb-1">Nomor Antrean</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.noAntrean}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl">
                      <Clock className="w-5 h-5 text-red-500 mb-2" />
                      <p className="text-xs text-red-900 font-medium mb-1">Estimasi Datang</p>
                      <p className="text-sm font-black text-[#0b162c]">{tiketBAP.estimasiJam}</p>
                    </div>
                  </div>

                  <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed font-medium text-center">
                      Harap hadir <strong>15 menit</strong> sebelum estimasi kedatangan dengan membawa dokumen persyaratan (KTP, Surat Kehilangan Kepolisian asli, dan fotokopi Paspor Lama jika ada).
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button onClick={() => setTiketBAP(null)} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">
                      Cek Pendaftar Lain
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