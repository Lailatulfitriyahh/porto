/* =============================================================
   lang.js — Bilingual Support (Bahasa Indonesia / English)
   Portfolio: Lailatul Fitriyah — Futuristic Dark Purple Neon
   ============================================================= */

const translations = {
  id: {
    /* Navbar */
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Proyek',
    'nav.education': 'Pendidikan',
    'nav.contact': 'Kontak',

    /* Hero */
    'hero.greeting': 'HALO, SAYA',
    'hero.name': 'Lailatul Fitriyah',
    'hero.role': 'Mahasiswa Ilmu Komputer & Pengembang Web',
    'hero.bio': 'Saya tertarik dengan dunia teknologi, khususnya pengembangan website, aplikasi, dan desain UI/UX. Saya senang belajar hal baru dan mengembangkan kemampuan di bidang teknologi.',
    'hero.download_cv': 'Unduh CV',

    /* About Section */
    'about.title': 'Tentang Saya',
    'about.desc': 'Mengenal lebih dekat perjalanan saya di bidang web development, perancangan antarmuka, dan teknologi.',
    'about.bio_p1': 'Halo, saya Lailatul Fitriyah, mahasiswa Program Studi Ilmu Komputer di Universitas PGRI Wiranegara dengan ketertarikan mendalam pada pengembangan web, pemrograman, dan pembuatan aplikasi.',
    'about.bio_p2': 'Saya senang mempelajari teknologi baru dan mengeksplorasi berbagai tools untuk mengembangkan ide menjadi proyek yang bermanfaat. Melalui perkuliahan dan pengalaman mengerjakan proyek, saya terus mengasah kemampuan teknis, kreativitas, serta pemecahan masalah.',
    'about.location_label': 'Lokasi',
    'about.location_address': 'Dusun Karang Panas II, Desa Gerongan, Kecamatan Kraton, Kabupaten Pasuruan, Jawa Timur 67151, Indonesia.',
    'about.info_status_label': 'Ketersediaan',
    'about.info_status_val': 'Terbuka untuk Pekerjaan & Proyek',

    /* Skills Section */
    'skills.title': '<span class="skills-title-word">Keahlian</span> <span class="skills-title-gradient">Saya</span>',
    'skills.desc': 'Kumpulan teknologi dan alat kerja yang saya pelajari dan gunakan dalam pengembangan web.',
    'skills.cat_programming': 'Programming Languages',
    'skills.cat_frontend': 'Frontend Development',
    'skills.cat_backend': 'Backend Development',
    'skills.cat_database': 'Database',
    'skills.cat_tools': 'Tools & Technologies',

    /* Projects Section */
    'projects.title': 'Karya Unggulan',
    'projects.desc': 'Koleksi proyek pengembangan web, desain UI/UX, aplikasi mobile, dan teknologi yang telah saya rancang dan kembangkan.',
    'project.live_btn': 'Live Demo',
    'project.github_btn': 'GitHub',
    'project.figma_btn': 'Figma Design',
    'project.prototype_btn': 'Figma Prototype',
    'project.website_btn': 'Kunjungi Website',
    'project.unavailable_btn': 'Link Tidak Tersedia',
    'project1.title': 'Pesan Santap – UI/UX Design',
    'project1.desc': 'Perancangan desain UI/UX aplikasi pemesanan makanan menggunakan Figma.',
    'project2.title': 'Nongki Kita – UI/UX Design',
    'project2.desc': 'Perancangan desain UI/UX aplikasi Nongki Kita untuk membantu pengguna menemukan tempat nongkrong. Proyek dikerjakan secara berkelompok.',
    'project3.title': 'Matchalyy – Website',
    'project3.desc': 'Pembuatan website Matchalyy.',
    'project4.title': 'Aplikasi Absensi – Android',
    'project4.desc': 'Pengembangan aplikasi absensi berbasis Android menggunakan Android Studio.',
    'project5.title': 'GIMTRIF – Website Wisata',
    'project5.desc': 'Pengembangan website Loka GIMTRIF untuk mencari dan menemukan informasi tempat wisata.',
    'project6.title': 'Prelove – Website',
    'project6.desc': 'Pembuatan website pemesanan pakaian preloved.',
    'project7.title': 'Website Desa Karangrejo',
    'project7.desc': 'Pengembangan website informasi Desa Karangrejo.',
    'project8.title': 'AR Pengenalan Jajanan Tradisional',
    'project8.desc': 'Pengembangan aplikasi Augmented Reality (AR) untuk mengenalkan berbagai jajanan tradisional Nusantara melalui fitur pemindaian (scan).',

    /* Education Section */
    'education.title': 'Riwayat Pendidikan',
    'education.desc': 'Perjalanan akademis',
    'edu1.year': '2020 — 2023',
    'edu1.major': 'Teknik Komputer dan Jaringan',
    'edu2.year': '2023 — Sekarang',
    'edu2.major': 'Ilmu Komputer',
    'edu2.status': 'Sedang Berlangsung',
    'edu.location_btn': 'Lihat Lokasi',
    'edu.cert_btn': 'Sertifikat',
    'edu.cert_title': 'Daftar Sertifikat',
    'edu.cert_add_btn': 'Tambah Sertifikat',
    'edu.cert_view_btn': 'Lihat',
    'edu.cert_empty': 'Belum ada sertifikat ditambahkan.',
    'edu.cert_empty_sub': 'Klik tombol di atas atau di bawah untuk menambahkan sertifikat.',
    'edu.cert_max_notice': 'Kapasitas maksimal 10 sertifikat untuk institusi ini telah tercapai.',

    /* Certificate Gallery */
    'cert.gallery_title': 'Galeri Sertifikat',
    'cert.filter_all': 'Semua',
    'cert.filter_smk': 'SMK',
    'cert.filter_univ': 'Universitas',
    'cert.loading': 'Memuat sertifikat...',
    'cert.view': 'Lihat Sertifikat',
    'cert.open_pdf': 'Buka PDF',
    'cert.download': 'Unduh',

    /* Contact Section */
    'contact.title': 'Mari Berkolaborasi',
    'contact.desc': 'Punya ide proyek menarik, tawaran kerjasama, atau ingin berdiskusi seputar web development? Silakan hubungi saya melalui kontak berikut.',
    'contact.wa_label': 'WhatsApp / Telepon',
    'contact.email_label': 'Email',
    'contact.github_label': 'GitHub',
  },

  en: {
    /* Navbar */
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.contact': 'Contact',

    /* Hero */
    'hero.greeting': "HELLO, I'M",
    'hero.name': 'Lailatul Fitriyah',
    'hero.role': 'Informatics Student & Web Developer',
    'hero.bio': 'I am passionate about technology, especially website development, applications, and UI/UX design. I love learning new things and developing my skills in tech.',
    'hero.download_cv': 'Download CV',

    /* About Section */
    'about.title': 'About Me',
    'about.desc': 'A closer look into my journey through web development, interface design, and digital innovation.',
    'about.bio_p1': "Hello, I'm Lailatul Fitriyah, a Computer Science student at Universitas PGRI Wiranegara with a strong passion for web development, programming, and building software applications.",
    'about.bio_p2': 'I enjoy learning new technologies and exploring modern tools to turn creative ideas into impactful projects. Through coursework and hands-on experience, I continuously hone my technical skills, creativity, and problem-solving abilities.',
    'about.location_label': 'Location',
    'about.location_address': 'Karang Panas II Hamlet, Gerongan Village, Kraton District, Pasuruan Regency, East Java 67151, Indonesia.',
    'about.info_status_label': 'Availability',
    'about.info_status_val': 'Open for Work & Collaborations',

    /* Skills Section */
    'skills.title': '<span class="skills-title-word">My</span> <span class="skills-title-gradient">Skills</span>',
    'skills.desc': 'A collection of technologies and tools I have learned and use in web development.',
    'skills.cat_programming': 'Programming Languages',
    'skills.cat_frontend': 'Frontend Development',
    'skills.cat_backend': 'Backend Development',
    'skills.cat_database': 'Database',
    'skills.cat_tools': 'Tools & Technologies',

    /* Projects Section */
    'projects.title': 'Featured Projects',
    'projects.desc': 'A showcase of web development, UI/UX design, mobile applications, and innovative technology projects I have crafted.',
    'project.live_btn': 'Live Demo',
    'project.github_btn': 'GitHub',
    'project.figma_btn': 'Figma Design',
    'project.prototype_btn': 'Figma Prototype',
    'project.website_btn': 'Visit Website',
    'project.unavailable_btn': 'Link Unavailable',
    'project1.title': 'Pesan Santap – UI/UX Design',
    'project1.desc': 'UI/UX design of a modern food ordering mobile application crafted with Figma.',
    'project2.title': 'Nongki Kita – UI/UX Design',
    'project2.desc': 'UI/UX design of Nongki Kita application to help users discover cozy cafes and hangout spots. Developed as a collaborative group project.',
    'project3.title': 'Matchalyy – Website',
    'project3.desc': 'Development of the Matchalyy website.',
    'project4.title': 'Aplikasi Absensi – Android',
    'project4.desc': 'Development of an Android-based attendance management application built using Android Studio.',
    'project5.title': 'GIMTRIF – Website Wisata',
    'project5.desc': 'Development of the Loka GIMTRIF tourism website to explore and find detailed travel destinations.',
    'project6.title': 'Prelove – Website',
    'project6.desc': 'Web development for a preloved fashion clothing ordering and catalog platform.',
    'project7.title': 'Website Desa Karangrejo',
    'project7.desc': 'Development of the official public information and community services website for Karangrejo Village.',
    'project8.title': 'AR Pengenalan Jajanan Tradisional',
    'project8.desc': 'Development of an Augmented Reality (AR) application introducing traditional Indonesian snacks through smart 3D camera scanning features.',

    /* Education Section */
    'education.title': 'Educational Background',
    'education.desc': 'Academic Journey',
    'edu1.year': '2020 — 2023',
    'edu1.major': 'Computer and Network Engineering',
    'edu2.year': '2023 — Present',
    'edu2.major': 'Computer Science',
    'edu2.status': 'Ongoing',
    'edu.location_btn': 'View Location',
    'edu.cert_btn': 'Certificates',
    'edu.cert_title': 'Certificates List',
    'edu.cert_add_btn': 'Add Certificate',
    'edu.cert_view_btn': 'View',
    'edu.cert_empty': 'No certificates added yet.',
    'edu.cert_empty_sub': 'Click the button above or below to add your first certificate.',
    'edu.cert_max_notice': 'Maximum capacity of 10 certificates for this institution reached.',

    /* Certificate Gallery */
    'cert.gallery_title': 'Certificate Gallery',
    'cert.filter_all': 'All',
    'cert.filter_smk': 'Vocational School',
    'cert.filter_univ': 'University',
    'cert.loading': 'Loading certificates...',
    'cert.view': 'View Certificate',
    'cert.open_pdf': 'Open PDF',
    'cert.download': 'Download',

    /* Contact Section */
    'contact.title': "Let's Collaborate",
    'contact.desc': 'Got an exciting project, a job opportunity, or just want to discuss web technology? Feel free to reach out via any channel below!',
    'contact.wa_label': 'WhatsApp / Phone',
    'contact.email_label': 'Email',
    'contact.github_label': 'GitHub',
  },
};

(function LangModule() {
  'use strict';

  const LANG_KEY = 'portfolio-lang';
  const htmlEl = document.documentElement;
  const langBoxes = document.querySelectorAll('.lang-box');

  function getStoredLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === 'en' ? 'en' : 'id';
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.id;
    htmlEl.setAttribute('lang', lang);
    localStorage.setItem(LANG_KEY, lang);

    // Update text / innerHTML for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.getAttribute('data-i18n-html') === 'true') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update language switcher buttons UI state
    langBoxes.forEach((box) => {
      const choice = box.getAttribute('data-lang-choice');
      const isActive = choice === lang;
      box.classList.toggle('active', isActive);
      box.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Dispatch custom event for typing animation or other listeners
    window.dispatchEvent(new CustomEvent('portfolio:langchange', { detail: { lang } }));
  }

  // Initialize
  const currentLang = getStoredLang();
  applyLanguage(currentLang);

  // Click listeners for language switcher buttons
  langBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const selected = box.getAttribute('data-lang-choice');
      if (selected) {
        applyLanguage(selected);
      }
    });
  });

  window.setPortfolioLanguage = applyLanguage;
})();
