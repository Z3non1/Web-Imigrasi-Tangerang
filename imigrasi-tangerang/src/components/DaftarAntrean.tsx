import React, { useState } from 'react';
import { User, FileText, Calendar, Clock, CheckCircle2, Ticket, ChevronRight, AlertCircle } from 'lucide-react';

export default function DaftarAntrean() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  
  const [formData, setFormData] = useState({
    nama: '',
    identitas: '',
    layanan: '',
    tanggal: '',
    waktu: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi proses pengiriman data ke server (delay 2 detik)
    setTimeout(() => {
      // Membuat kode booking acak (Contoh: BKG-8A9F)
      const randomCode = 'BKG-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      setTicketCode(randomCode);
      
      // Simpan otomatis ke localStorage agar langsung terbaca oleh komponen CekAntrean
      localStorage.setItem('tiketAntreanImigrasi', randomCode);
      
      setIsSubmitting(false);
      setStep(2); // Pindah ke layar sukses
    }, 2000);
  };

  const resetForm = () => {
    setFormData({ nama: '', identitas: '', layanan: '', tanggal: '', waktu: '' });
    setTicketCode('');
    setStep(1);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      
      {/* HEADER FORM */}
      <div className="bg-[#0b162c] p-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 p-4 opacity-10"><Calendar className="w-32 h-32 transform -rotate-12" /></div>
        <h2 className="text-2xl font-extrabold tracking-tight relative z-10">Ambil Antrean Online</h2>
        <p className="text-sm text-gray-400 mt-1 relative z-10">Reservasi jadwal layanan tanpa ribet</p>
      </div>

      <div className="p-6 md:p-8">
        
        {step === 1 ? (
          /* --- TAHAP 1: FORMULIR PENDAFTARAN --- */
          <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
            
            {/* Input Nama */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-4 w-4 text-gray-400" /></div>
                <input required type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Sesuai KTP / Paspor" className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm font-medium" />
              </div>
            </div>

            {/* Input NIK / Paspor */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">NIK / Nomor Paspor</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FileText className="h-4 w-4 text-gray-400" /></div>
                <input required type="text" name="identitas" value={formData.identitas} onChange={handleChange} placeholder="Masukkan 16 digit NIK / No. Paspor" className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm font-medium" />
              </div>
            </div>

            {/* Dropdown Layanan */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Pilih Layanan</label>
              <select required name="layanan" value={formData.layanan} onChange={handleChange} className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm font-medium appearance-none">
                <option value="" disabled>-- Kategori Layanan --</option>
                <option value="Paspor Prioritas (Lansia/Difabel)">Paspor Prioritas (Lansia/Difabel)</option>
                <option value="Pengambilan Paspor">Pengambilan Paspor</option>
                <option value="Izin Tinggal WNA (ITAS/ITAP)">Izin Tinggal WNA (ITAS/ITAP)</option>
                <option value="Layanan Informasi & Pengaduan">Layanan Informasi & Pengaduan</option>
              </select>
            </div>

            {/* Grid Tanggal & Waktu */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Tanggal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-4 w-4 text-gray-400" /></div>
                  <input required type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Sesi Waktu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Clock className="h-4 w-4 text-gray-400" /></div>
                  <select required name="waktu" value={formData.waktu} onChange={handleChange} className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-sm font-medium appearance-none">
                    <option value="" disabled>Pilih Sesi</option>
                    <option value="Pagi (08:00 - 10:00)">Pagi (08:00 - 10:00)</option>
                    <option value="Siang (13:00 - 15:00)">Siang (13:00 - 15:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Note Info */}
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
                Untuk permohonan paspor reguler WNI, silakan gunakan aplikasi <strong>M-Paspor</strong>. Form ini khusus untuk layanan prioritas, WNA, dan pengambilan paspor.
              </p>
            </div>

            {/* Tombol Submit */}
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0b162c] hover:bg-yellow-500 text-white hover:text-[#0b162c] font-extrabold py-3.5 rounded-xl shadow-md transition-colors flex justify-center items-center mt-2 group">
              {isSubmitting ? (
                <span className="flex items-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white group-hover:border-t-[#0b162c] rounded-full animate-spin mr-2"></div> Memproses...</span>
              ) : (
                <span className="flex items-center">Buat Jadwal Sekarang <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></span>
              )}
            </button>
          </form>

        ) : (

          /* --- TAHAP 2: SUKSES & TIKET DIGITAL --- */
          <div className="animate-fade-in-up text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-50">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            
            <h3 className="text-2xl font-extrabold text-[#0b162c]">Pendaftaran Berhasil!</h3>
            <p className="text-gray-500 text-sm mt-2 mb-6">Tunjukkan kode ini kepada petugas saat kedatangan Anda.</p>

            {/* Kartu Tiket */}
            <div className="bg-gradient-to-br from-[#0b162c] to-[#1a3673] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden mb-8 text-left">
              <div className="absolute -right-4 -bottom-4 opacity-10"><Ticket className="w-32 h-32" /></div>
              
              <div className="relative z-10">
                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">Kode Booking (Tiket)</p>
                <p className="text-4xl font-black tracking-widest mb-4">{ticketCode}</p>
                
                <div className="space-y-2 border-t border-white/20 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Nama</span>
                    <span className="font-bold">{formData.nama}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Layanan</span>
                    <span className="font-bold">{formData.layanan}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Jadwal</span>
                    <span className="font-bold text-yellow-400">{formData.tanggal} | {formData.waktu.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Tombol yang secara psikologis mengarahkan ke pelacak antrean */}
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#0b162c] font-extrabold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center">
                Lacak Estimasi Waktu (Cek Antrean)
              </button>
              <button onClick={resetForm} className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl transition-all">
                Daftar Tiket Baru
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}