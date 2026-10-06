import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App';
import { 
  ChevronLeft, Calendar, User, Tag, Share2, Link2 
} from 'lucide-react';

const translations = {
  ID: { 
    nav: { news: "Berita" }, 
    ui: { back: "Kembali ke Indeks Berita", share: "Bagikan Artikel:", related: "Berita Terkait" },
    data: {
      1: { title: "Pemberitahuan Ketersediaan Blangko Paspor Elektronik", content: "Kantor Imigrasi Kelas I Khusus Non TPI Tangerang mengumumkan bahwa blangko paspor elektronik polikarbonat kini telah tersedia kembali...", cat: "Pengumuman" },
      2: { title: "Operasi Gabungan Jagratara: Kanim Tangerang Periksa Kepatuhan Izin", content: "Tim Pengawasan Orang Asing (TIMPORA) melaksanakan operasi gabungan Jagratara di kawasan industri...", cat: "Intelijen" },
      3: { title: "Optimalisasi Layanan Ramah HAM di ULP Mall Tangerang", content: "Dalam upaya meningkatkan pelayanan publik, Kantor Imigrasi meresmikan jalur khusus bagi lansia, ibu hamil, dan disabilitas...", cat: "Layanan" }
    }
  },
  EN: { 
    nav: { news: "News" }, 
    ui: { back: "Back to News Index", share: "Share Article:", related: "Related News" },
    data: {
      1: { title: "Notice of Electronic Passport Booklet Availability", content: "The Tangerang Non-TPI Special Class I Immigration Office announces that polycarbonate electronic passport booklets are now back in stock...", cat: "Announcement" },
      2: { title: "Jagratara Joint Operation: Tangerang Office Checks Permit Compliance", content: "The Foreigner Surveillance Team (TIMPORA) conducted the Jagratara joint operation in industrial areas...", cat: "Intelligence" },
      3: { title: "Optimization of Human Rights Friendly Services at Mall Passport Unit", content: "In an effort to improve public services, the Immigration Office inaugurated a special lane for the elderly, pregnant women, and people with disabilities...", cat: "Services" }
    }
  },
  ZH: { 
    nav: { news: "新闻" }, 
    ui: { back: "返回新闻索引", share: "分享文章：", related: "相关新闻" },
    data: {
      1: { title: "电子护照本可用性通知", content: "坦格朗非TPI一类特别移民局宣布，聚碳酸酯电子护照本现已重新有货...", cat: "公告" },
      2: { title: "Jagratara 联合行动：坦格朗移民局检查居留许可合规情况", content: "外国人监控小组 (TIMPORA) 在工业区开展了 Jagratara 联合行动...", cat: "情报" },
      3: { title: "优化购物中心护照办理单位的人权友好型服务", content: "为了改善公共服务，移民局为老年人、孕妇和残疾人开通了专用通道...", cat: "服务" }
    }
  }
};

export default function DetailBerita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const t = translations[lang as 'ID' | 'EN' | 'ZH'] || translations['ID'];
  
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const article = (t.data as any)[id || '1'] || t.data[1];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-[#1e293b] py-4 px-6 sticky top-0 z-40">
        <button onClick={() => navigate('/berita')} className="text-white flex items-center hover:text-yellow-400 font-semibold text-sm">
          <ChevronLeft className="w-5 h-5 mr-1" /> {t.ui.back}
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full animate-fade-in-up">
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"><Tag className="w-4 h-4 mr-1.5" /> {article.cat}</span>
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> 13 Agu 2026</span>
          <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> Humas Kanim</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-8 leading-tight">{article.title}</h1>
        <img src={`https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop`} alt="Ilustrasi Berita" className="w-full h-[400px] object-cover rounded-2xl shadow-md mb-10" />

        <article className="prose prose-lg max-w-none text-gray-700 text-justify mb-12">
          <p className="lead">{article.content}</p>
          <p>{lang === 'ID' ? 'Demikian informasi ini disampaikan agar masyarakat dapat mempersiapkan dokumen dengan baik.' : 'This information is conveyed so the public can prepare their documents properly.'}</p>
        </article>

        <div className="border-t border-gray-200 pt-8 flex items-center justify-between">
          <div className="font-bold text-[#1e293b] flex items-center">
            <Share2 className="w-5 h-5 mr-2 text-gray-500" /> {t.ui.share}
          </div>
          <div className="flex space-x-3">
            {/* Tombol Facebook menggunakan SVG asli */}
            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Tombol Twitter/X menggunakan SVG asli */}
            <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            {/* Tombol Salin Tautan (Link) */}
            <button className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
              <Link2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}