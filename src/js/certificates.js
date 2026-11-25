/**
 * certificates.js  v4
 * — Collapsible per-card panels (dropdown Sertifikat pada tiap edu-card)
 * — Full Certificate Gallery with filter tabs (All / SMK / Universitas)
 *   displayed BELOW the timeline
 * — PDF.js first-page visual preview thumbnail generation (cached)
 * — Lightbox Viewer Modal with Full PDF iframe / Image preview + Download & Open buttons
 * — Bilingual (ID / EN) support
 */

(function CertificateModule() {
  'use strict';

  const MAX_PER_INST = 10;

  // ─── Data cache ──────────────────────────────────────────────────────────────
  const cache = {
    smk: { loaded: false, data: [] },
    univ: { loaded: false, data: [] },
  };

  const pdfThumbCache = new Map();

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function getLang() {
    return document.documentElement.getAttribute('lang') || 'id';
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ─── PDF Thumbnail Renderer (via PDF.js) ─────────────────────────────────────
  function loadPdfThumbnail(cert, imgEl, placeholderEl) {
    if (!cert || !cert.url) return;

    // 1. Cek memory cache
    if (pdfThumbCache.has(cert.url)) {
      const dataUrl = pdfThumbCache.get(cert.url);
      cert.previewDataUrl = dataUrl;
      if (imgEl) {
        imgEl.src = dataUrl;
        imgEl.style.display = 'block';
      }
      if (placeholderEl) placeholderEl.style.display = 'none';
      return;
    }

    // 2. Cek apakah library PDF.js sudah siap
    if (!window.pdfjsLib) {
      setTimeout(() => {
        if (window.pdfjsLib) loadPdfThumbnail(cert, imgEl, placeholderEl);
      }, 500);
      return;
    }

    try {
      if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      window.pdfjsLib.getDocument(cert.url).promise.then((pdf) => {
        return pdf.getPage(1);
      }).then((page) => {
        const unscaledViewport = page.getViewport({ scale: 1 });
        const targetWidth = 480;
        const scale = targetWidth / unscaledViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        return page.render({ canvasContext: ctx, viewport }).promise.then(() => {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
          pdfThumbCache.set(cert.url, dataUrl);
          cert.previewDataUrl = dataUrl;
          if (imgEl) {
            imgEl.src = dataUrl;
            imgEl.style.display = 'block';
          }
          if (placeholderEl) {
            placeholderEl.style.display = 'none';
          }
        });
      }).catch((err) => {
        console.warn('[PDF.js] Gagal merender halaman 1 untuk thumbnail:', cert.url, err);
      });
    } catch (err) {
      console.warn('[PDF.js] Inisialisasi worker gagal:', err);
    }
  }

  // ─── Fetch from PHP API ───────────────────────────────────────────────────────
  async function fetchCerts(inst) {
    if (cache[inst].loaded) return cache[inst];
    try {
      const r = await fetch(`api/get_certificates.php?institution=${inst}`, { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const json = await r.json();
      if (json.status === 'success' && Array.isArray(json.certificates)) {
        cache[inst] = {
          loaded: true,
          data: json.certificates.slice(0, MAX_PER_INST),
        };
      }
    } catch (e) {
      console.warn(`[Certificates] fetch ${inst}:`, e);
    }
    return cache[inst];
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PART 1: Collapsible dropdown panels inside each edu-card
  // ════════════════════════════════════════════════════════════════════════════

  function renderDropdownPanel(inst) {
    const panelId = inst === 'smk' ? 'cert-smk-wonorejo' : 'cert-univ-wiranegara';
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const list = cache[inst]?.data || [];
    const count = list.length;
    const folder = `assets/certificates/${inst}/`;
    const isId = getLang() === 'id';

    let html = `<div class="edu-cert-panel__inner">
      <div class="cert-panel-header">
        <span class="cert-panel-title">
          <i class="fa-solid fa-folder-open" aria-hidden="true"></i>
          ${isId ? 'Daftar Sertifikat' : 'Certificates List'}
        </span>
      </div>`;

    if (count === 0) {
      html += `
      <div class="cert-empty-state">
        <i class="fa-regular fa-folder-open" aria-hidden="true"></i>
        <h4>${isId ? 'Belum Ada Sertifikat' : 'No Certificates Yet'}</h4>
        <p>${isId
          ? `Belum ada file di folder <code>${folder}</code>. Tambahkan file PDF atau gambar, lalu muat ulang halaman.`
          : `No files found in <code>${folder}</code>. Place PDF or image files there, then refresh.`}
        </p>
      </div>`;
    } else {
      html += `<div class="cert-list" role="list">`;
      list.forEach((cert, idx) => {
        const isPdf = cert.isPdf || cert.ext === 'pdf';
        const hasPreview = Boolean(cert.previewDataUrl);
        const imgSrc = hasPreview ? cert.previewDataUrl : (isPdf ? '' : esc(cert.url));

        html += `
          <div class="cert-row" role="listitem">
            <div class="cert-thumb" data-view="${inst}:${idx}"
                 title="${isId ? 'Klik pratinjau' : 'Click to preview'}">
              <img class="cert-thumb__img" src="${imgSrc}" alt="${esc(cert.title)}"
                   style="${hasPreview || !isPdf ? 'display:block;' : 'display:none;'}"
                   loading="lazy"
                   onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
              <div class="cert-thumb__placeholder" style="${hasPreview || !isPdf ? 'display:none;' : 'display:flex;'}">
                <i class="fa-solid ${isPdf ? 'fa-file-pdf text-rose-400' : 'fa-file-image text-purple-400'}" aria-hidden="true"></i>
              </div>
            </div>
            <div class="cert-info">
              <span class="cert-name">${esc(cert.title)}</span>
              <div class="cert-submeta">
                <span class="cert-year">${esc(cert.year)}</span>
                <span>•</span>
                <span class="cert-type-tag">${(cert.ext || (isPdf ? 'PDF' : 'IMG')).toUpperCase()}</span>
                ${cert.size ? `<span>•</span><span>${esc(cert.size)}</span>` : ''}
              </div>
            </div>
            <div class="cert-actions">
              <button type="button" class="cert-action-btn btn-view" data-view="${inst}:${idx}">
                <i class="fa-regular fa-eye" aria-hidden="true"></i>
                <span>${isId ? 'Lihat' : 'View'}</span>
              </button>
            </div>
          </div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    panel.innerHTML = html;

    // Pasang PDF preview renderer pada dropdown items
    list.forEach((cert, idx) => {
      const isPdf = cert.isPdf || cert.ext === 'pdf';
      if (isPdf && !cert.previewDataUrl) {
        const row = panel.querySelectorAll('.cert-row')[idx];
        if (row) {
          const imgEl = row.querySelector('.cert-thumb__img');
          const placeholderEl = row.querySelector('.cert-thumb__placeholder');
          loadPdfThumbnail(cert, imgEl, placeholderEl);
        }
      }
    });

    panel.querySelectorAll('[data-view]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const [i, idxStr] = btn.getAttribute('data-view').split(':');
        const item = cache[i]?.data[parseInt(idxStr, 10)];
        if (item) openModal(item, i);
      });
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PART 2: Full Certificate Gallery (below timeline)
  // ════════════════════════════════════════════════════════════════════════════

  let activeFilter = 'all';

  function buildGalleryItems() {
    const all = [];
    ['smk', 'univ'].forEach((inst) => {
      (cache[inst]?.data || []).forEach((cert, idx) => {
        all.push({ ...cert, inst, idx });
      });
    });
    return all;
  }

  function renderGallery() {
    const grid = document.getElementById('certGalleryGrid');
    const loadEl = document.getElementById('certGalleryLoading');
    if (!grid) return;
    if (loadEl) loadEl.style.display = 'none';

    const isId = getLang() === 'id';
    const all = buildGalleryItems();
    const filtered = activeFilter === 'all' ? all : all.filter((c) => c.inst === activeFilter);

    // Hapus card sebelumnya
    grid.querySelectorAll('.cert-gallery-card').forEach((el) => el.remove());

    let emptyEl = grid.querySelector('.cert-gallery-empty');
    if (emptyEl) emptyEl.remove();

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'cert-gallery-empty';
      empty.innerHTML = `
        <i class="fa-regular fa-folder-open" aria-hidden="true"></i>
        <p>${isId ? 'Belum ada sertifikat.' : 'No certificates yet.'}</p>
        <span>${isId
          ? 'Tambahkan file PDF atau gambar ke folder <code>assets/certificates/smk/</code> atau <code>assets/certificates/univ/</code>.'
          : 'Add PDF or image files to <code>assets/certificates/smk/</code> or <code>assets/certificates/univ/</code>.'
        }</span>`;
      grid.appendChild(empty);
      return;
    }

    filtered.forEach((cert, pos) => {
      const isPdf = cert.isPdf || cert.ext === 'pdf';
      const instLabel = cert.inst === 'smk'
        ? (isId ? 'SMK' : 'Vocational')
        : (isId ? 'Universitas' : 'University');

      const hasPreview = Boolean(cert.previewDataUrl);
      const imgSrc = hasPreview ? cert.previewDataUrl : (isPdf ? '' : esc(cert.url));

      const card = document.createElement('article');
      card.className = 'cert-gallery-card';
      card.setAttribute('data-inst', cert.inst);
      card.setAttribute('role', 'listitem');
      card.style.animationDelay = `${pos * 50}ms`;

      card.innerHTML = `
        <button type="button" class="cert-gcard__thumb-btn" aria-label="${isId ? 'Lihat Sertifikat' : 'View Certificate'}: ${esc(cert.title)}">
          <div class="cert-gcard__thumb">
            <img class="cert-gcard__img" src="${imgSrc}" alt="${esc(cert.title)}"
                 style="${hasPreview || !isPdf ? 'display:block;' : 'display:none;'}"
                 loading="lazy"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
            <div class="cert-gcard__placeholder" style="${hasPreview || !isPdf ? 'display:none;' : 'display:flex;'}">
              <i class="fa-solid ${isPdf ? 'fa-file-pdf text-rose-400' : 'fa-file-image text-purple-400'}" aria-hidden="true"></i>
              <span class="cert-gcard__pdf-label">${(cert.ext || (isPdf ? 'PDF' : 'IMG')).toUpperCase()}</span>
            </div>
          </div>
        </button>`;

      // Jika file adalah PDF dan thumbnail belum di-generate, buatkan preview dari halaman 1
      if (isPdf && !cert.previewDataUrl) {
        const imgEl = card.querySelector('.cert-gcard__img');
        const placeholderEl = card.querySelector('.cert-gcard__placeholder');
        loadPdfThumbnail(cert, imgEl, placeholderEl);
      }

      card.querySelector('.cert-gcard__thumb-btn').addEventListener('click', () => {
        openModal(cert, cert.inst);
      });

      grid.appendChild(card);
    });
  }

  function setupFilterTabs() {
    document.querySelectorAll('.cert-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cert-filter-btn').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        renderGallery();
      });
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PART 3: Modal / Lightbox
  // ════════════════════════════════════════════════════════════════════════════

  function openModal(cert, inst) {
    const modal = document.getElementById('certViewerModal');
    if (!modal) {
      window.open(cert.url, '_blank', 'noopener,noreferrer');
      return;
    }

    const dialog = modal.querySelector('.cert-viewer-modal') || modal;
    const isPdf = Boolean(cert.isPdf || cert.ext === 'pdf');
    const isId = getLang() === 'id';
    const instName = inst === 'smk' ? 'SMK Negeri 1 Wonorejo' : 'Universitas PGRI Wiranegara';

    dialog.classList.toggle('is-pdf-mode', isPdf);
    dialog.classList.toggle('is-image-mode', !isPdf);

    const titleEl = document.getElementById('certViewerTitleText');
    const contentEl = document.getElementById('certViewerContent');
    const openBtn = document.getElementById('certViewerOpenBtn');
    const dlBtn = document.getElementById('certViewerDownloadBtn');
    const metaEl = document.getElementById('certViewerYear');

    if (titleEl) titleEl.textContent = cert.title;
    if (metaEl) metaEl.textContent = `${instName} • ${cert.year}${cert.size ? ' • ' + cert.size : ''}`;

    if (openBtn) {
      openBtn.href = cert.url;
      openBtn.classList.remove('hidden');
      const span = openBtn.querySelector('span');
      if (span) span.textContent = isId ? 'Buka PDF' : 'Open PDF';
    }

    if (dlBtn) {
      dlBtn.href = cert.url;
      dlBtn.download = cert.filename || cert.title;
      dlBtn.classList.remove('hidden');
      const span = dlBtn.querySelector('span');
      if (span) span.textContent = isId ? 'Unduh' : 'Download';
    }

    if (contentEl) {
      if (isPdf) {
        contentEl.innerHTML = `
          <iframe src="${esc(cert.url)}#toolbar=1&view=FitH"
                  class="cert-viewer-iframe" title="${esc(cert.title)}"></iframe>`;
      } else {
        contentEl.innerHTML = `
          <div class="cert-image-preview-wrap">
            <img src="${esc(cert.url)}" alt="${esc(cert.title)}" class="cert-preview-img" loading="eager" />
          </div>`;
      }
    }

    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('certViewerModal');
    if (!modal) return;
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const dialog = modal.querySelector('.cert-viewer-modal');
    if (dialog) dialog.classList.remove('is-pdf-mode', 'is-image-mode');
    const contentEl = document.getElementById('certViewerContent');
    if (contentEl) contentEl.innerHTML = '';
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PART 4: Init
  // ════════════════════════════════════════════════════════════════════════════

  function init() {
    // Jalankan fetch secara asinkron tanpa memblokir halaman
    Promise.all([fetchCerts('smk'), fetchCerts('univ')]).then(() => {
      renderGallery();
    });

    setupFilterTabs();

    // 3. Pasang toggle panel sertifikat di timeline edu-card
    document.querySelectorAll('.edu-cert-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-target');
        const inst = btn.getAttribute('data-inst') || (targetId.includes('smk') ? 'smk' : 'univ');
        const panel = document.getElementById(targetId);
        if (!panel) return;

        const isOpen = panel.classList.contains('is-open');
        if (isOpen) {
          panel.classList.remove('is-open');
          panel.setAttribute('aria-hidden', 'true');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          await fetchCerts(inst);
          renderDropdownPanel(inst);
          panel.classList.add('is-open');
          panel.setAttribute('aria-hidden', 'false');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 4. Modal listeners
    document.querySelectorAll('[data-close-modal="certViewerModal"]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    const modal = document.getElementById('certViewerModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // 5. Bilingual re-render listener
    window.addEventListener('portfolio:langchange', () => {
      renderGallery();
      ['smk', 'univ'].forEach((inst) => {
        const panelId = inst === 'smk' ? 'cert-smk-wonorejo' : 'cert-univ-wiranegara';
        const panel = document.getElementById(panelId);
        if (panel && panel.classList.contains('is-open')) {
          renderDropdownPanel(inst);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
