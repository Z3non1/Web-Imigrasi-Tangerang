import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import semua halaman
import Home from './pages/Home';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';
import InformasiPublik from './pages/InformasiPublik';
import Faq from './pages/Faq';
import TentangKami from './pages/TentangKami'; // Tambahkan import ini

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:id" element={<DetailBerita />} />
        <Route path="/informasi-publik" element={<InformasiPublik />} />
        <Route path="/faq" element={<Faq />} />
        {/* Tambahkan Route Tentang Kami ini */}
        <Route path="/tentang-kami" element={<TentangKami />} />
      </Routes>
    </Router>
  );
}

export default App;