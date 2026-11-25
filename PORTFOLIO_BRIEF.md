# PORTFOLIO_BRIEF.md

> Dokumen acuan utama (single source of truth) untuk perancangan dan
> pengembangan website portofolio personal.

## 1. Project Overview

### Tujuan

Membangun website portofolio personal yang menampilkan identitas,
kemampuan, karya, riwayat pendidikan, dan informasi kontak secara
profesional.

Website harus terasa personal, mudah dipahami, responsif, cepat, dan
memiliki visual yang konsisten. Hindari tampilan generik atau berlebihan
yang sering diasosiasikan dengan "AI slop".

### Section utama

Urutan halaman: 1. About 2. Skills 3. Projects 4. Education 5. Contact

### Prinsip produk

-   Konten dan karya pemilik portofolio menjadi fokus utama.
-   Navigasi harus sederhana dan mudah diprediksi.
-   Setiap elemen visual harus memiliki tujuan.
-   Utamakan keterbacaan, hierarki, aksesibilitas, dan performa.
-   Jangan mengarang pengalaman, keahlian, pencapaian, atau informasi
    pribadi.

## 2. Design Direction

  Aspek         Keputusan
  ------------- -------------------
  Tema          Dark
  Warna aksen   Purple
  Gaya          Modern minimalist
  Hero          Split Hero
  Foto hero     Foto profil asli
  Navigasi      Top Navigation
  Skills        Bento Grid
  Projects      Project Cards
  Education     Vertical Timeline
  Contact       Minimal Contact

### Karakter visual

-   Modern, rapi, tenang, dan profesional.
-   Gunakan ruang kosong yang cukup.
-   Hindari dekorasi yang tidak membantu pemahaman.
-   Gunakan komposisi yang kuat, bukan banyak efek.
-   Hindari gradient berlebihan, glow berlebihan, glassmorphism di semua
    elemen, dan animasi yang tidak perlu.

## 3. Color Palette

Palet awal berikut adalah titik awal dan dapat disesuaikan saat
implementasi.

  Token          Warna       Penggunaan
  -------------- ----------- -----------------------------------
  Background     `#17171D`   Latar utama
  Surface        `#22222B`   Card dan panel
  Accent         `#A78BFA`   Aksi utama, link aktif, highlight
  Text Primary   `#EDEAF5`   Teks utama
  Text Muted     `#92909F`   Teks sekunder
  Border         `#393640`   Garis pemisah dan border

### Aturan warna

-   Purple digunakan sebagai aksen, bukan sebagai warna untuk semua
    elemen.
-   Pastikan teks memiliki kontras yang cukup dengan latar.
-   Gunakan warna surface dan border secara konsisten.
-   Status hover, focus, active, dan disabled harus dapat dibedakan.
-   Jangan menggunakan warna hanya untuk menyampaikan informasi penting;
    sertakan label atau indikator lain.

## 4. Typography

Arah tipografi: - Gunakan sans-serif yang bersih dan mudah dibaca untuk
mayoritas konten. - Heading memiliki hierarki ukuran dan ketebalan yang
jelas. - Batasi jumlah keluarga font; idealnya satu keluarga utama
dengan beberapa weight. - Hindari terlalu banyak variasi ukuran, weight,
dan gaya dekoratif. - Gunakan ukuran teks responsif dan line-height yang
nyaman.

Pilihan font final belum ditentukan. Tentukan sebelum tahap visual
polishing.

## 5. Technology Stack

  Area                      Pilihan
  ------------------------- --------------------
  Struktur                  HTML
  Styling                   CSS + Tailwind CSS
  Interaksi                 Vanilla JavaScript
  Animasi yang diinginkan   Framer Motion
  Icon library              Font Awesome

### Catatan kompatibilitas animasi

Framer Motion (Motion for React) ditujukan terutama untuk aplikasi React
dan bukan pilihan plug-and-play untuk website vanilla
HTML/CSS/JavaScript.

Sebelum implementasi, pilih salah satu jalur berikut: 1. **Tetap
vanilla:** gunakan CSS transitions/keyframes untuk animasi sederhana,
atau GSAP bila membutuhkan orkestrasi animasi yang lebih kompleks. 2.
**Tetap menggunakan Framer Motion:** ubah arsitektur menjadi React,
misalnya dengan Vite + React.

Jangan menambahkan Framer Motion ke proyek vanilla dengan asumsi API
React dapat langsung digunakan. Keputusan akhir animasi perlu
dikonfirmasi sebelum coding.

### Tailwind dan CSS

-   Gunakan Tailwind untuk utility styling dan konsistensi spacing.
-   Gunakan CSS tambahan hanya untuk kebutuhan yang tidak praktis
    ditangani utility class.
-   Hindari mencampur banyak pola styling tanpa alasan.
-   Jika menggunakan Tailwind melalui build setup, dokumentasikan cara
    instalasi dan menjalankan proyek.
-   Hindari mengandalkan konfigurasi CDN untuk production tanpa
    mempertimbangkan kebutuhan build dan optimasi.

### Font Awesome

-   Gunakan ikon yang relevan dan konsisten.
-   Pilih satu gaya ikon yang seragam.
-   Jangan mengganti semua label teks dengan ikon.
-   Ikon dekoratif harus disembunyikan dari screen reader bila tidak
    menyampaikan informasi.

## 6. Website Structure

### 6.1 About --- Split Hero

**Layout** - Desktop: dua kolom. - Kiri: konten perkenalan. - Kanan:
foto profil asli. - Mobile: susun vertikal dengan urutan konten yang
tetap mudah dipahami.

**Konten** - Greeting singkat. - Nama pemilik portofolio. - Profesi atau
bidang yang benar-benar sesuai. - Deskripsi singkat. - CTA
`View Projects`. - CTA `Contact Me`. - Tautan sosial bila tersedia.

**Foto profil** - Gunakan foto asli yang disediakan pemilik. - Foto
harus jelas dan memiliki crop yang baik. - Treatment dapat berupa
natural atau grayscale dengan aksen purple yang halus. - Jangan mengubah
identitas atau membuat foto sintetis yang seolah-olah merupakan foto
asli.

**Navigasi** - Top navigation horizontal. - Logo atau wordmark di
kiri. - Tautan About, Skills, Projects, Education, Contact di kanan. -
Tautan aktif dapat diberi indikator purple. - Pada layar kecil, ubah
menjadi menu mobile yang ringkas dan dapat diakses keyboard.

### 6.2 Skills --- Bento Grid

**Layout** - Gunakan grid responsif dengan card berukuran bervariasi. -
Card besar dapat menonjolkan kategori atau keahlian utama. - Card sedang
dan kecil menampilkan kategori atau teknologi pendukung. - Jangan
menentukan skill atau tingkat kemahiran yang belum diberikan pemilik.

**Isi card** - Nama kategori atau teknologi. - Ikon/logo teknologi bila
tersedia. - Deskripsi singkat bila memang membantu.

**Kategori dapat mencakup** (isi hanya jika relevan dengan kemampuan
aktual): - Frontend - Backend - Database - Tools

**Aturan** - Jangan gunakan progress bar atau persentase kemampuan tanpa
dasar yang jelas. - Jangan memenuhi grid dengan logo hanya demi
dekorasi. - Pertahankan ukuran, alignment, padding, dan radius yang
konsisten.

### 6.3 Projects --- Project Cards

**Layout** - Desktop: grid dua kolom. - Tablet: sesuaikan jumlah kolom
dengan ruang. - Mobile: satu kolom. - Setiap project menggunakan card
dengan struktur yang konsisten.

**Isi setiap card** - Screenshot atau thumbnail project. - Nama
project. - Deskripsi singkat tentang tujuan atau fungsi. - Tech stack. -
Link GitHub bila tersedia. - Link Live Demo bila tersedia.

**Aturan** - Gunakan screenshot project yang benar-benar dimiliki atau
diizinkan untuk ditampilkan. - Jangan membuat klaim hasil, pengguna,
atau dampak yang tidak dapat dibuktikan. - Link harus berfungsi dan
memiliki label yang jelas. - Jika demo atau repository tidak tersedia,
jangan tampilkan tautan palsu. - Prioritaskan kualitas dan relevansi
project daripada jumlah card.

### 6.4 Education --- Vertical Timeline

**Layout** - Riwayat pendidikan disusun vertikal dan kronologis. -
Gunakan garis penghubung dan titik timeline. - Pada mobile, pastikan
garis dan konten tidak membuat teks terlalu sempit.

**Informasi setiap item** - Tahun mulai dan selesai. - Nama institusi. -
Jurusan atau program studi. - Deskripsi atau pencapaian, jika tersedia
dan relevan.

**Aturan** - Urutkan secara konsisten, misalnya terbaru ke terlama. -
Jangan mengarang tanggal, gelar, institusi, atau pencapaian. - Jika
masih berlangsung, gunakan status yang sesuai.

### 6.5 Contact --- Minimal Contact

**Layout** - Penutup halaman yang sederhana dan jelas. - Headline ajakan
berkolaborasi. - Deskripsi singkat. - Email yang dapat diklik. - Tombol
atau tautan untuk menghubungi. - Social links yang relevan.

**Footer** - Copyright. - Nama pemilik portofolio. - Tahun dapat
dihasilkan secara dinamis dengan JavaScript.

**Aturan** - Jangan menampilkan alamat email atau akun sosial yang belum
dikonfirmasi. - Pastikan tautan email menggunakan `mailto:` yang
benar. - Jangan membuat form kontak jika belum ada kebutuhan dan
mekanisme pengiriman pesan.

## 7. Responsive Design

Terapkan pendekatan mobile-first.

### Prinsip

-   Tidak ada horizontal overflow.
-   Ukuran teks, spacing, dan grid menyesuaikan lebar layar.
-   Area klik nyaman digunakan pada perangkat sentuh.
-   Navigasi tetap mudah digunakan di layar kecil.
-   Gambar menggunakan ukuran dan crop yang sesuai.
-   Bento Grid dan Project Cards harus berubah menjadi layout satu kolom
    bila ruang tidak cukup.
-   Timeline tetap terbaca di mobile.

### Pemeriksaan viewport

Uji setidaknya pada: - Mobile kecil: sekitar 320--375 px. - Mobile umum:
sekitar 390--430 px. - Tablet: sekitar 768 px. - Desktop: sekitar
1024--1440 px.

Angka tersebut adalah target pengujian, bukan batas kaku desain.

## 8. Animation & Interaction

Animasi harus mendukung pemahaman dan feedback, bukan menjadi pusat
perhatian.

### Animasi yang diperbolehkan

-   Transisi warna dan border saat hover.
-   Feedback tombol saat hover, focus, dan active.
-   Reveal ringan saat section masuk viewport.
-   Transisi menu mobile.
-   Scroll behavior yang halus bila tidak mengganggu aksesibilitas.

### Batasan

-   Hindari animasi berulang yang mengganggu.
-   Hindari parallax berlebihan.
-   Jangan menunda akses ke konten penting demi animasi.
-   Hormati preferensi `prefers-reduced-motion`.
-   Pastikan interaksi tetap berfungsi ketika animasi dimatikan.

### Implementasi

Ikuti keputusan kompatibilitas pada bagian Technology Stack. Untuk
vanilla JavaScript, gunakan CSS atau GSAP; untuk Framer Motion, gunakan
React.

## 9. Component Architecture

Walaupun menggunakan HTML, CSS, dan JavaScript, pisahkan struktur
berdasarkan tanggung jawab.

Struktur folder awal yang disarankan:

``` text
portfolio/
├── index.html
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   └── projects/
│   └── icons/
├── src/
│   ├── css/
│   │   ├── input.css
│   │   └── custom.css
│   └── js/
│       ├── main.js
│       ├── navigation.js
│       └── animations.js
├── README.md
└── package.json
```

Struktur ini merupakan rekomendasi awal dan dapat disesuaikan dengan
setup Tailwind yang dipilih.

### Prinsip implementasi

-   Gunakan elemen HTML semantik seperti `header`, `nav`, `main`,
    `section`, dan `footer`.
-   Setiap section memiliki ID yang stabil untuk navigasi anchor.
-   Hindari satu file JavaScript yang berisi seluruh logika bila sudah
    sulit dipelihara.
-   Hindari duplikasi markup dan style.
-   Gunakan nama class dan fungsi yang deskriptif.

## 10. Content & Asset Management

Konten yang masih perlu disediakan pemilik: - Nama yang ingin
ditampilkan. - Profesi atau headline. - Bio singkat. - Foto profil. -
Daftar skill dan kategori. - Data setiap project, screenshot, tech
stack, repository, dan demo. - Riwayat pendidikan. - Email dan tautan
sosial.

### Aturan aset

-   Gunakan gambar yang relevan dan berkualitas.
-   Optimalkan ukuran gambar sebelum digunakan.
-   Gunakan format modern seperti WebP atau AVIF bila sesuai.
-   Tambahkan `alt` yang menjelaskan gambar informatif.
-   Gambar dekoratif dapat menggunakan alt kosong.
-   Jangan memakai placeholder seolah-olah itu konten final.

## 11. Accessibility

-   Semua fungsi utama dapat digunakan dengan keyboard.
-   Gunakan indikator focus yang terlihat.
-   Gunakan kontras warna yang memadai.
-   Berikan label yang jelas untuk tautan dan tombol.
-   Gunakan heading secara berurutan dan semantik.
-   Jangan mengandalkan warna saja untuk menunjukkan status.
-   Sediakan alt text untuk gambar informatif.
-   Hormati `prefers-reduced-motion`.
-   Pastikan menu mobile memiliki state dan label aksesibilitas yang
    jelas.

## 12. Performance & Quality

-   Hindari library tambahan yang tidak diperlukan.
-   Optimalkan gambar.
-   Minimalkan JavaScript yang berjalan saat halaman dimuat.
-   Hindari layout shift yang tidak perlu.
-   Gunakan lazy loading untuk gambar di luar area awal bila sesuai.
-   Pastikan semua link, tombol, dan navigasi berfungsi.
-   Periksa console browser untuk error.
-   Uji halaman pada beberapa browser dan ukuran layar.

## 13. Anti-AI-Slop Guidelines

Website tidak boleh terasa seperti template generik yang hanya mengganti
nama dan warna.

### Hindari

-   Gradient ungu di hampir semua permukaan.
-   Glow/neon berlebihan.
-   Glassmorphism pada setiap card.
-   Terlalu banyak pill, badge, dan dekorasi.
-   Animasi masuk untuk setiap elemen.
-   Headline generik tanpa informasi nyata.
-   Statistik palsu seperti jumlah project, pengalaman, atau klien.
-   Skill rating yang tidak memiliki dasar.
-   Project fiktif atau thumbnail yang tidak sesuai.
-   Ikon dekoratif yang tidak menambah makna.
-   Layout yang terlalu padat atau terlalu banyak card tanpa prioritas.

### Terapkan

-   Konten personal dan spesifik.
-   Hierarki tipografi yang jelas.
-   Spacing yang konsisten.
-   Visual project yang autentik.
-   Aksen purple secara terukur.
-   Komposisi yang seimbang.
-   Animasi singkat dan fungsional.
-   Detail kecil yang konsisten, bukan efek visual yang berlebihan.

## 14. Development Workflow

1.  Konfirmasi konten dan aset yang tersedia.
2.  Putuskan jalur animasi: vanilla + CSS/GSAP atau React + Framer
    Motion.
3.  Siapkan project dan konfigurasi Tailwind.
4.  Bangun struktur HTML semantik untuk lima section.
5.  Implementasikan design tokens dan layout dasar.
6.  Bangun navigasi dan hero.
7.  Bangun Skills Bento Grid.
8.  Bangun Projects Cards.
9.  Bangun Education Timeline.
10. Bangun Contact dan footer.
11. Tambahkan interaksi dan animasi yang diperlukan.
12. Optimalkan responsivitas, aksesibilitas, dan performa.
13. Uji seluruh tautan, navigasi, dan tampilan.
14. Final review berdasarkan quality checklist.

## 15. Quality Checklist

### Design

-   [ ] Dark theme dan purple accent konsisten.
-   [ ] Tipografi memiliki hierarki yang jelas.
-   [ ] Spacing dan radius konsisten.
-   [ ] Tidak ada dekorasi yang tidak memiliki tujuan.
-   [ ] Foto dan screenshot menggunakan aset yang benar.

### Sections

-   [ ] About menggunakan Split Hero.
-   [ ] Skills menggunakan Bento Grid.
-   [ ] Projects menggunakan Project Cards dua kolom pada desktop.
-   [ ] Education menggunakan Vertical Timeline.
-   [ ] Contact menggunakan Minimal Contact.

### Functionality

-   [ ] Semua navigasi mengarah ke section yang benar.
-   [ ] Menu mobile berfungsi.
-   [ ] CTA berfungsi.
-   [ ] Link GitHub, demo, email, dan sosial valid.
-   [ ] Tidak ada tombol atau tautan palsu.

### Responsive & Accessibility

-   [ ] Tidak ada horizontal overflow.
-   [ ] Layout mobile terbaca dan nyaman.
-   [ ] Semua interaksi dapat digunakan dengan keyboard.
-   [ ] Focus state terlihat.
-   [ ] Kontras teks memadai.
-   [ ] Reduced motion dihormati.

### Technical

-   [ ] Tidak ada error di console.
-   [ ] Tailwind build berjalan.
-   [ ] Tidak ada dependency yang tidak diperlukan.
-   [ ] Animasi sesuai dengan framework yang dipilih.
-   [ ] Gambar dioptimalkan.

------------------------------------------------------------------------

## 16. Open Decisions

Hal-hal berikut belum ditentukan dan tidak boleh diasumsikan:

1.  Nama dan headline yang akan ditampilkan.
2.  Bio dan deskripsi personal.
3.  Foto profil final.
4.  Daftar skill aktual.
5.  Daftar project dan aset visualnya.
6.  Riwayat pendidikan.
7.  Email dan social links.
8.  Font final.
9.  Keputusan akhir antara vanilla + CSS/GSAP atau React + Framer
    Motion.
10. Setup build dan deployment.

## 17. Final Design Summary

Website portofolio personal dengan lima section (About, Skills,
Projects, Education, Contact), menggunakan dark theme dengan purple
accent dan gaya modern minimalist.

Hero memakai Split Hero dengan teks di kiri dan foto profil asli di
kanan. Navigasi berada di bagian atas. Skills disajikan dalam Bento
Grid, Projects dalam grid Project Cards, Education dalam Vertical
Timeline, dan Contact dalam layout minimalis.

Prioritas utama adalah keaslian konten, keterbacaan, responsivitas,
aksesibilitas, performa, dan konsistensi visual. Hindari dekorasi serta
animasi berlebihan dan jangan mengarang informasi personal atau
pencapaian.
