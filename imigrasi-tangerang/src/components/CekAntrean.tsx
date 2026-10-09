import React, { useState, useEffect } from 'react';
import { Ticket, Clock, CheckCircle2, AlertCircle, MapPin, ChevronRight, Search } from 'lucide-react';

export default function CekAntrean() {
  const [inputNomor, setInputNomor] = useState('');
  const [loading, setLoading] = useState(false);
  const [antreanData, setAntreanData] = useState<any>(null);

  // Efek untuk mengecek apakah ada tiket yang tersimpan di memori browser
  useEffect(() => {
    const tiketTersimpan = localStorage.getItem('tiketAntreanImigrasi');
    if (tiketTersimpan) {
      // Jika ada, langsung simulasikan pencarian
      cariAntrean(tiketTersimpan);
    }
  }, []);

  const handleCari = (e: React.FormEvent) => {
    e.preventDefault();
    cariAntrean(inputNomor);
  };

  const cariAntrean = (nomor: string) => {
    if (!nomor) return;
    setLoading(true);
    
    // SIMULASI API CALL KE BACKEND (Tunda 1.5 detik agar terlihat nyata)
    setTimeout(() => {
      // Simpan nomor ke memori lokal browser agar tidak hilang saat ditutup
      localStorage.setItem('tiketAntreanImigrasi', nomor.toUpperCase());
      
      // Simulasi balasan dari database
      setAntreanData({
        nomor: nomor.toUpperCase(),
        layanan: "Pembuatan Paspor Baru",
        loket: "Loket 3 (Lantai 1)",
        antreanSekarang: "A-042",
        sisaAntrean: 12,
        estimasiWaktu: "120 Menit",
        saranDatang: "13:45 WIB",
        status: "Menunggu"
      });
      setLoading(false);
    }, 1500);
  };

  const hapusTiket = () => {
    localStorage.removeItem('tiketAntreanImigrasi');
    setAntreanData(null);
    setInputNomor('');
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      
      {/* HEADER TIKET */}
      <div className="bg-[#0b162c] p-6 text-white text-center relative overflow-hidden">
        {/* Ornamen Latar */}
        <div className="absolute top-0 right-0 p-4 opacity-10"><Ticket className="w-32 h-32 transform rotate-12" /></div>
        
        <h2 className="text-2xl font-extrabold tracking-tight relative z-10">Cek Status Antrean</h2>
        <p className="text-sm text-gray-400 mt-1 relative z-10">Lacak estimasi waktu pelayanan Anda</p>
      </div>

      <div className="p-6 md:p-8">
        
        {/* KONDISI 1: JIKA DATA ANTREAN BELUM ADA, TAMPILKAN FORM PENCARIAN */}
        {!antreanData ? (
          <form onSubmit={handleCari} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#0b162c] mb-2">Masukkan Nomor Tiket / Kode Booking</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Ticket className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={inputNomor}
                  onChange={(e) => setInputNomor(e.target.value)}
                  placeholder="Contoh: A-054 atau BKG-1234" 
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-[#0b162c] font-bold uppercase"
                  required
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#0b162c] font-extrabold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center"><div className="w-5 h-5 border-2 border-[#0b162c] border-t-transparent rounded-full animate-spin mr-2"></div> Mencari Data...</span>
              ) : (
                <span className="flex items-center"><Search className="w-5 h-5 mr-2" /> Lacak Antrean</span>
              )}
            </button>
          </form>
        ) : (
          
          /* KONDISI 2: JIKA DATA ANTREAN DITEMUKAN, TAMPILKAN TIKET DIGITAL */
          <div className="animate-fade-in-up">
            
            {/* Nomor Tiket Pemohon */}
            <div className="text-center mb-6">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Nomor Antrean Anda</p>
              <h3 className="text-5xl font-black text-[#0b162c] tracking-tighter">{antreanData.nomor}</h3>
              <p className="text-sm font-bold text-yellow-600 mt-2 bg-yellow-50 inline-block px-3 py-1 rounded-full">{antreanData.layanan}</p>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 my-6"></div>

            {/* Grid Informasi Real-time */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
                <p className="text-[11px] font-bold text-blue-600 uppercase mb-1">Dilayani Saat Ini</p>
                <p className="text-2xl font-black text-[#0b162c]">{antreanData.antreanSekarang}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Sisa Antrean</p>
                <p className="text-2xl font-black text-[#0b162c]">{antreanData.sisaAntrean} <span className="text-sm font-medium text-gray-500">Orang</span></p>
              </div>
            </div>

            {/* Alert Estimasi Waktu Kedatangan */}
            <div className="bg-[#0b162c] p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Clock className="w-24 h-24" /></div>
              <div className="flex items-start space-x-3 relative z-10">
                <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-yellow-400 mb-1">Kapan Saya Harus Datang?</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Estimasi waktu tunggu Anda sekitar <strong className="text-white">{antreanData.estimasiWaktu}</strong>. Sistem menyarankan Anda untuk tiba di Kantor Imigrasi pada pukul:
                  </p>
                  <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                    <MapPin className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-[10px] text-gray-300 uppercase font-bold tracking-widest">Estimasi Tiba</p>
                      <p className="text-lg font-black text-white">{antreanData.saranDatang}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Bawah */}
            <div className="mt-8 flex justify-between items-center">
              <button 
                onClick={hapusTiket}
                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                Ganti Tiket Lain
              </button>
              <button 
                onClick={() => cariAntrean(antreanData.nomor)}
                className="text-xs font-bold text-[#0b162c] flex items-center bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                Refresh Status <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}