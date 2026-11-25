/**
 * navigation.js
 * — Smooth scroll with custom cubic-bezier easing
 * — Active nav link detection (IntersectionObserver)
 * — Mobile menu toggle with backdrop
 * — Keyboard accessibility
 * — Navbar scroll state (blur / glow enhancement)
 */

(function Navigation() {
  'use strict';

  /* ---- Respect prefers-reduced-motion ---- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Elements ---- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const navbarPill = document.querySelector('.navbar-pill');

  /* ================================================================
     SMOOTH SCROLL — Custom easing (easeInOutCubic)
     Memberikan efek meluncur natural, bukan linear.
     ================================================================ */

  /* easeInOutCubic: Mulai lambat → percepat → melambat di ujung */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* Hitung navbar offset secara dinamis */
  function getNavOffset() {
    if (navbarPill) {
      const rect = navbarPill.getBoundingClientRect();
      return Math.round(rect.bottom) + 20;
    }
    return window.innerWidth <= 768 ? 82 : 100;
  }

  /* Durasi scroll berbanding lurus dengan jarak, dibatasi 650–1300ms */
  function calcDuration(distancePx) {
    const abs = Math.abs(distancePx);
    const dur = 650 + abs * 0.22;
    return Math.min(Math.max(dur, 650), 1300);
  }

  /* Scroll custom dengan rAF */
  function smoothScrollTo(targetY, duration) {
    if (prefersReduced) {
      window.scrollTo({ top: targetY });
      return;
    }
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    if (Math.abs(distance) < 1) return;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Pasang ke semua anchor link di halaman */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const targetId = href.replace('#', '');
      if (document.getElementById(targetId)) {
        setActive(targetId);
      }

      const offset = getNavOffset();
      const rawTop = target.getBoundingClientRect().top;
      // Untuk section home di paling atas, scroll tepat ke 0
      const targetY = targetId === 'home' ? 0 : Math.max(0, window.scrollY + rawTop - offset);
      const duration = calcDuration(rawTop);

      smoothScrollTo(targetY, duration);

      if (history.pushState) history.pushState(null, '', href);
    });
  });

  /* ================================================================
     MOBILE MENU & DRAWER
     ================================================================ */
  if (menuBtn && mobileNav) {
    function openMenu() {
      mobileNav.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Tutup menu');
    }

    function closeMenu() {
      mobileNav.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Buka menu');
    }

    menuBtn.addEventListener('click', () => {
      mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        menuBtn.focus();
      }
    });

    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    }, { passive: true });
  }

  /* ================================================================
     ACTIVE LINK — IntersectionObserver
     ================================================================ */
  const sections = [...document.querySelectorAll('section[id]')];
  if (!sections.length || !navLinks.length) return;

  /* scroll-margin-top agar section tidak tersembunyi di balik navbar */
  function applyScrollMargin() {
    const offset = getNavOffset();
    sections.forEach((sec) => {
      sec.style.scrollMarginTop = offset + 'px';
    });
  }
  applyScrollMargin();
  window.addEventListener('resize', applyScrollMargin, { passive: true });

  let activeId = '';

  function setActive(id) {
    if (activeId === id) return;
    activeId = id;
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveSection() {
    const scrollY = window.scrollY;
    const navOffset = getNavOffset();

    // 1. Jika di paling atas halaman -> selalu Home
    if (scrollY <= 140) {
      setActive('home');
      return;
    }

    // 2. Jika di paling bawah halaman -> selalu Contact
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
      setActive('contact');
      return;
    }

    // 3. Tentukan section aktif berdasarkan posisi scroll
    let currentId = 'home';
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.getBoundingClientRect().top;
      if (top <= navOffset + 80) {
        currentId = sec.id;
      } else {
        break;
      }
    }

    if (currentId) {
      setActive(currentId);
    }
  }

  // Set default aktif awal
  setActive(sections[0].id);

  /* ================================================================
     NAVBAR SCROLL STATE & ACTIVE LINK TRACKER
     ================================================================ */
  let ticking = false;

  function handleScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (navbarPill) {
        navbarPill.classList.toggle('is-scrolled', window.scrollY > 24);
      }
      updateActiveSection();
      ticking = false;
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

})();
