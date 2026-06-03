/* ============================================================
   SHARON HURVITZ v2 — main.js
   Handles: page routing, album grid rendering, album detail
   modal, scroll reveal, mobile nav, nav scroll shadow,
   and contact form progressive enhancement.
   ============================================================ */

// ── ALBUM DATA ──────────────────────────────────────────────
const ALBUMS = [
  {
    id: 'maro',
    title: 'So Much Has Changed',
    artist: 'Maro',
    role: 'Mastering engineer',
    year: '2026',
    img: 'images/maro.jpg',
    featured: true,
    desc: 'Maro\'s full-length debut English-language album. Recorded across Lisbon and London, it features production from collaborators including Jacob Collier. Maro represented Portugal at Eurovision 2022 and has performed on NPR Tiny Desk and COLORS Berlin.',
    meta: [
      ['Format',  'Album'],
      ['Genre',   'Indie pop / folk'],
      ['Label',   'Independent'],
      ['Year',    '2026'],
    ],
  },
  {
    id: 'distopia',
    title: 'Dis-topia',
    subtitle: 'Original Cast Recording',
    artist: 'Robby Good',
    role: 'Mastering engineer',
    year: '2025',
    img: 'images/distopia.jpg',
    featured: false,
    desc: 'A 25-song original cast recording for the full theatrical production. Music by Robby Good, Matthew Deegan, and Abigail Torrence; lyrics by Matthew Deegan and Robby Good; book by Matthew Deegan.',
    meta: [
      ['Format', 'Cast recording'],
      ['Tracks', '25'],
      ['Year',   '2025'],
    ],
  },
  {
    id: 'taiko',
    title: 'The Legend of Taiko',
    subtitle: '鼓震心弦',
    artist: 'Rhymoi Music',
    role: 'Mastering engineer',
    year: '2024',
    img: 'images/taiko.jpg',
    featured: false,
    desc: 'An audiophile SACD release from Chinese label Rhymoi Music (瑞鸣音乐). The album explores drum culture across Asia, featuring taiko and pipa alongside shakuhachi and guzheng — instruments spanning Japanese and Chinese classical traditions.',
    meta: [
      ['Format', 'SACD'],
      ['Label',  'Rhymoi Music (瑞鸣音乐)'],
      ['Genre',  'World / classical'],
      ['Year',   '2024'],
    ],
  },
  {
    id: 'phoenix',
    title: 'Transcendent Phoenix',
    artist: 'Lucina Yue',
    role: 'Mastering engineer',
    year: '2024',
    img: 'images/phoenix.jpg',
    featured: false,
    desc: 'A sweeping, emotionally expansive album from vocalist and performer Lucina Yue, blending pop and classical crossover aesthetics into a dramatic full-length statement.',
    meta: [
      ['Format', 'Album'],
      ['Genre',  'Pop / classical crossover'],
      ['Year',   '2024'],
    ],
  },
];


// ── PAGE ROUTING ─────────────────────────────────────────────
const pages   = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-links a[data-page]');

function showPage(name) {
  // Hide all pages
  pages.forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav active state
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });

  // Close mobile menu if open
  closeMobileMenu();

  // Kick off reveal on newly visible page
  requestAnimationFrame(checkReveal);

  // Clear any open album detail when leaving discography
  if (name !== 'discography') closeAlbumDetail();
}

// Make showPage globally accessible for onclick attributes in HTML
window.showPage = showPage;


// ── ALBUM GRID RENDERING ─────────────────────────────────────
function renderGrid(containerId, albums) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = albums.map(album => `
    <div class="album-card" onclick="openAlbum('${album.id}')" tabindex="0"
         role="button" aria-label="View details for ${album.title} by ${album.artist}"
         onkeydown="if(event.key==='Enter'||event.key===' ')openAlbum('${album.id}')">
      <img src="${album.img}" alt="${album.title} album art" loading="lazy" />
      <div class="album-card-body">
        <p class="album-card-title">${album.title}</p>
        ${album.subtitle ? `<p class="album-card-subtitle">${album.subtitle}</p>` : ''}
        <p class="album-card-artist">${album.artist}</p>
        <p class="album-card-role">${album.role}</p>
      </div>
    </div>
  `).join('');
}

window.openAlbum = function(id) {
  const album = ALBUMS.find(a => a.id === id);
  if (!album) return;

  // Navigate to discography page first if not already there
  showPage('discography');

  const area = document.getElementById('album-detail');
  if (!area) return;

  area.innerHTML = `
    <div class="album-detail">
      <div class="album-detail-inner">
        <img src="${album.img}" alt="${album.title}" class="album-detail-img" />
        <div class="album-detail-body">
          <button class="detail-back" onclick="closeAlbumDetail()">Back to all credits</button>
          ${album.featured ? '<p class="detail-featured">★ Featured credit</p>' : ''}
          <h2 class="detail-title">${album.title}</h2>
          ${album.subtitle ? `<p class="detail-subtitle">${album.subtitle}</p>` : ''}
          <p class="detail-artist">${album.artist}</p>
          <span class="detail-role-badge">${album.role}</span>
          <p class="detail-desc">${album.desc}</p>
          <div class="detail-meta">
            ${album.meta.map(([k, v]) => `
              <div class="detail-meta-row">
                <span>${k}</span>
                <span>${v}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Scroll detail into view smoothly
  requestAnimationFrame(() => {
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

window.closeAlbumDetail = function() {
  const area = document.getElementById('album-detail');
  if (area) area.innerHTML = '';
};


// ── SCROLL REVEAL ────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

function checkReveal() {
  // Re-observe any .reveal elements that aren't yet visible
  document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
  // Immediately trigger above-the-fold elements
  document.querySelectorAll('.page.active .reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}


// ── NAV SCROLL SHADOW ────────────────────────────────────────
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (navEl) {
    navEl.style.boxShadow = window.scrollY > 8
      ? '0 1px 16px rgba(0,0,0,0.07)'
      : 'none';
  }
}, { passive: true });


// ── MOBILE NAV ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

window.toggleMenu = function() {
  const isOpen = navLinksEl.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger → X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
};

function closeMobileMenu() {
  navLinksEl.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', false);
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.transform = '';
}


// ── CONTACT FORM ─────────────────────────────────────────────
// The form uses Formspree by default (set action= in index.html).
// This JS adds a friendly success/error message via fetch so the
// user doesn't get redirected away from the site.
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    const action = contactForm.getAttribute('action') || '';

    // Only intercept Formspree submissions — let other backends through
    if (!action.includes('formspree')) return;

    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        contactForm.innerHTML = `
          <div style="padding: 40px 0; text-align: left;">
            <p style="
              font-family: 'Cormorant Garamond', serif;
              font-size: 24px; font-weight: 300;
              color: #1A1816; margin-bottom: 12px;
            ">Message sent.</p>
            <p style="font-size: 13px; color: #5A5652; line-height: 1.7;">
              Thanks for reaching out — I'll be in touch within 24–48 hours.
            </p>
          </div>
        `;
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      submitBtn.textContent = 'Something went wrong — please try again';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 4000);
    }
  });
}


// ── INIT ─────────────────────────────────────────────────────
(function init() {
  // Render album grids
  renderGrid('home-grid', ALBUMS);
  renderGrid('disc-grid', ALBUMS);

  // Trigger reveal on initial page load
  requestAnimationFrame(checkReveal);

  // Re-check reveal on scroll
  window.addEventListener('scroll', checkReveal, { passive: true });
})();
