/**
 * main.js
 * — Theme switcher (Dark / Light mode dengan localStorage)
 * — Typing animation dengan multi-role: Web Developer, Frontend Developer, UI/UX Enthusiast
 * — Smart Contact Form handler (validasi & opsi kirim via WhatsApp / Email)
 * — Smart Email Handler
 * — Footer dynamic year & Smooth scroll
 */

(function Main() {
  'use strict';

  /* ================================================================
     THEME SWITCHER (Dark / Light Mode)
     ================================================================ */
  const THEME_KEY = 'portfolio-theme';
  const htmlEl = document.documentElement;
  const themeToggles = document.querySelectorAll('[data-theme-toggle]');

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);

    // Update label aksesibilitas tombol toggle
    themeToggles.forEach((btn) => {
      if (theme === 'light') {
        btn.setAttribute('aria-label', 'Beralih ke mode gelap');
        btn.setAttribute('title', 'Mode Gelap');
      } else {
        btn.setAttribute('aria-label', 'Beralih ke mode terang');
        btn.setAttribute('title', 'Mode Terang');
      }
    });
  }

  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  themeToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const active = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(active);
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ================================================================
     HERO PROFILE PHOTO LOADER & CUTOUT (Multi-format: PNG, JPG, SVG)
     Dioptimalkan: requestIdleCallback / defer agar tidak memblokir reload
     ================================================================ */
  const heroImg = document.getElementById('heroProfileImg');
  if (heroImg) {
    function processPhoto() {
      const src = (heroImg.currentSrc || heroImg.src || '').toLowerCase();

      // If SVG / PNG with natural alpha, langsung jadikan transparent
      if (src.endsWith('.svg') || src.includes('.svg?')) {
        heroImg.classList.add('is-transparent');
        return;
      }

      const runProcessing = () => {
        try {
          const canvas = document.createElement('canvas');
          const nw = heroImg.naturalWidth || heroImg.width;
          const nh = heroImg.naturalHeight || heroImg.height;
          if (!nw || !nh) return;

          canvas.width = nw;
          canvas.height = nh;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(heroImg, 0, 0);

          const imgData = ctx.getImageData(0, 0, nw, nh);
          const d = imgData.data;

          // Check if image already has transparent pixels (e.g. cutout PNG)
          let hasExistingAlpha = false;
          for (let i = 3; i < d.length; i += 40) {
            if (d[i] < 200) {
              hasExistingAlpha = true;
              break;
            }
          }

          if (hasExistingAlpha) {
            heroImg.classList.add('is-transparent');
            return;
          }

          // Sample top corners to detect pass photo solid blue backdrop
          const sampleCoords = [
            0,
            (nw - 1) * 4,
            (Math.floor(nw * 0.1)) * 4,
            (Math.floor(nw * 0.9)) * 4,
          ];
          let refR = 0, refG = 0, refB = 0;
          for (const idx of sampleCoords) {
            refR += d[idx];
            refG += d[idx + 1];
            refB += d[idx + 2];
          }
          refR /= sampleCoords.length;
          refG /= sampleCoords.length;
          refB /= sampleCoords.length;

          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];

            const dist = Math.hypot(r - refR, g - refG, b - refB);
            const isBlueTone = (b > 85 && b > r * 1.22 && b > g * 1.05);

            if (dist < 55 || isBlueTone) {
              if (dist < 40 || (b > r * 1.35 && b > g * 1.15)) {
                d[i + 3] = 0; // Transparent
              } else {
                const alphaFactor = Math.max(0, Math.min(1, (dist - 35) / 20));
                d[i + 3] = Math.round(d[i + 3] * alphaFactor);
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
          heroImg.src = canvas.toDataURL('image/png');
          heroImg.classList.add('is-transparent');
        } catch (err) {
          console.warn('Profile photo processing:', err);
        }
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(runProcessing, { timeout: 1200 });
      } else {
        setTimeout(runProcessing, 50);
      }
    }

    if (heroImg.complete && heroImg.naturalWidth > 0) {
      processPhoto();
    } else {
      heroImg.addEventListener('load', processPhoto, { once: true });
    }
  }

  /* ================================================================
     HERO TYPING TEXT ANIMATION
     Fokus peran tunggal: Mahasiswa Ilmu Komputer & Pengembang Web (ID)
                         Informatics Student & Web Developer (EN)
     ================================================================ */
  const typingEl = document.getElementById('heroTypingText');
  if (typingEl) {
    function getRoleByLang() {
      const savedLang = localStorage.getItem('portfolio-lang') || 'id';
      return savedLang === 'en'
        ? 'Informatics Student & Web Developer'
        : 'Mahasiswa Ilmu Komputer & Pengembang Web';
    }

    let currentRole = getRoleByLang();
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer = null;

    function typeLoop() {
      if (isDeleting) {
        charIndex--;
        typingEl.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typingEl.textContent = currentRole.substring(0, charIndex);
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2400;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentRole = getRoleByLang();
        speed = 350;
      }

      typingTimer = setTimeout(typeLoop, speed);
    }

    typeLoop();

    window.addEventListener('portfolio:langchange', (e) => {
      clearTimeout(typingTimer);
      const newLang = e.detail && e.detail.lang ? e.detail.lang : (localStorage.getItem('portfolio-lang') || 'id');
      currentRole = newLang === 'en'
        ? 'Informatics Student & Web Developer'
        : 'Mahasiswa Ilmu Komputer & Pengembang Web';
      charIndex = 0;
      isDeleting = false;
      typeLoop();
    });
  }

  /* ================================================================
     SMART EMAIL OPENER
     ================================================================ */
  const targetEmail = 'lailatulfitriyahh026@gmail.com';
  const emailSubject = encodeURIComponent('Halo Lailatul - Diskusi Proyek / Kolaborasi');
  const emailBody = encodeURIComponent('Halo Lailatul Fitriyah,\n\nSaya tertarik dengan portofolio Anda dan ingin berdiskusi mengenai...');

  const directEmailLinks = document.querySelectorAll('a[href^="mailto:"]');
  directEmailLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
      if (!isMobile) {
        e.preventDefault();
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${emailSubject}&body=${emailBody}`;
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });

  /* ================================================================
     DYNAMIC YEAR IN FOOTER
     ================================================================ */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ================================================================
     AUTO IMAGE CACHE BUSTER (Foto langsung berubah saat diperbarui)
     ================================================================ */
  (function initImageCacheBuster() {
    const timestamp = Date.now();

    // Foto Profil (Profile image & picture sources)
    const profileImg = document.getElementById('heroProfileImg');
    if (profileImg) {
      const currentSrc = profileImg.getAttribute('src');
      if (currentSrc && !currentSrc.includes('?t=')) {
        profileImg.src = `${currentSrc.split('?')[0]}?t=${timestamp}`;
      }
      document.querySelectorAll('.hero-photo-cutout picture source').forEach((source) => {
        const srcset = source.getAttribute('srcset');
        if (srcset && !srcset.includes('?t=')) {
          source.srcset = `${srcset.split('?')[0]}?t=${timestamp}`;
        }
      });
    }

    // Seluruh Foto Proyek (Project Photos)
    document.querySelectorAll('.project-photo').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.includes('?t=')) {
        img.src = `${src.split('?')[0]}?t=${timestamp}`;
      }
    });
  })();
})();
