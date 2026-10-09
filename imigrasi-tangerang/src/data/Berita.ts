export type CatKey = 'press' | 'ops' | 'service' | 'intel' | 'zi';
export type News = { id: number; cat: CatKey; date: string; read: number; title: string; desc: string; unit: string; img: string; featured?: boolean; tags?: string[] };
const IMG = (id: string) => `https://images.unsplash.com/${id}?q=80&w=900`;
export const NEWS: News[] = [
  { id: 1, featured: true, cat: 'press', date: '2025-05-18', read: 3, img: IMG('photo-1577962917302-cd874c4e31d2'), unit: 'Humas Kanim Tangerang',
    title: 'Kantor Imigrasi Tangerang Tambah 200 Kuota Layanan Paspor Simpatik Akhir Pekan Sambut Libur Sekolah',
    desc: 'Memfasilitasi tingginya antusiasme masyarakat jelang musim liburan, Kanim Tangerang membuka loket pelayanan paspor khusus di hari Sabtu tanpa antrean M-Paspor reguler, difokuskan untuk keluarga, lansia, dan pemohon paspor elektronik pertama.',
    tags: ['#LayananPaspor', '#PasporSimpatik', '#KanimTangerang'] },
  { id: 2, cat: 'ops', date: '2025-05-15', read: 2, img: IMG('photo-1544027993-37dbfe43562a'), unit: 'Divisi Dokumen Perjalanan',
    title: 'Pemberitahuan Ketersediaan Blangko Paspor Elektronik Lembar Polikarbonat',
    desc: 'Kanim Tangerang mengumumkan pasokan blangko paspor elektronik lembar polikarbonat dalam status aman dan siap mengakomodasi kuota harian...' },
  { id: 3, cat: 'intel', date: '2025-05-12', read: 4, img: IMG('photo-1521791136064-7986c2920216'), unit: 'Seksi Wasdakim',
    title: 'Operasi Gabungan Jagratara: Kanim Tangerang Periksa Kepatuhan Izin Tinggal',
    desc: 'Seksi Pengawasan dan Penindakan Keimigrasian melaksanakan operasi serentak guna memastikan kepatuhan pemanfaatan visa dan izin tinggal pekerja asing' },
  { id: 4, cat: 'service', date: '2025-05-08', read: 3, img: IMG('photo-1573164713988-8665fc963095'), unit: 'Unit Layanan Paspor',
    title: 'Optimalisasi Layanan Ramah HAM di ULP Mall Tangcity: Jalur Khusus Lansia dan Disabilitas',
    desc: 'Penerapan standar pelayanan berbasis HAM dengan fasilitas jalur pemandu disabilitas, kursi roda gratis, serta ruang laktasi mencatatkan indeks...' },
  { id: 5, cat: 'zi', date: '2025-05-04', read: 3, img: IMG('photo-1556761175-5973dc0f32e7'), unit: 'Tim Reformasi Birokrasi',
    title: 'Komitmen Bersama Pembangunan Zona Integritas Menuju WBBM 2025 Melalui Penandatanganan Pakta Integritas',
    desc: 'Seluruh jajaran pegawai Kanim Tangerang menandatangani pakta integritas dan komitmen keterbukaan informasi publik untuk mewujudkan...' },
  { id: 6, cat: 'service', date: '2025-04-29', read: 2, img: IMG('photo-1450101499163-c8848c66ca85'), unit: 'Layanan Kolektif',
    title: 'Layanan Eazy Passport Sambangi Universitas Multimedia Nusantara, Permudah Pembuatan Paspor Mahasiswa',
    desc: 'Program jemput bola paspor kolektif melayani permohonan paspor baru dan penggantian bagi mahasiswa, dosen, serta staf pengajar tanpa perlu...' },
  { id: 7, cat: 'press', date: '2025-04-22', read: 4, img: IMG('photo-1521737711867-e3b97375f902'), unit: 'Sekretariat TIMPORA',
    title: 'Imigrasi Tangerang dan Pemda Perkuat Sinergi Pengawasan Orang Asing',
    desc: 'Penguatan integrasi data pengawasan orang asing antar-lembaga guna mengantisipasi penyalahgunaan izin tinggal dan menjaga...' },
];