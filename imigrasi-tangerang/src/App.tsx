import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman yang sudah kita buat
import Home from './pages/Home';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';
import InformasiPublik from './pages/InformasiPublik';
import Faq from './pages/Faq';
import TentangKami from './pages/TentangKami';

// Import halaman Layanan Paspor yang baru saja dibuat
import LayananPaspor from './pages/LayananPaspor'; 

// Buat Context Global untuk Bahasa
export const LanguageContext = createContext<any>(null);

function App() {
  // Ambil bahasa dari penyimpanan browser, default 'ID'
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ID');

  // Simpan ke browser setiap kali bahasanya diubah
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<DetailBerita />} />
          <Route path="/informasi-publik" element={<InformasiPublik />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          
          {/* ---> INI JALUR UNTUK MENYAMBUNGKAN HALAMAN PASPOR <--- */}
          <Route path="/layanan-wni/paspor" element={<LayananPaspor />} />
          
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;