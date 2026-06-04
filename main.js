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
    artist: 'MARO',
    role: 'Co-mastered with Alan Silverman',
    year: '2026',
    img: 'images/maro.jpg',
    featured: true,
    desc: 'Maro\'s full-length debut English-language album. Recorded across Lisbon and London, it features production from collaborators including Jacob Collier. Maro represented Portugal at Eurovision 2022 and has performed on NPR Tiny Desk and COLORS Berlin.',
    meta: [
      ['Format',  'Album'],
      ['Genre',   'Indie Pop/Singer-Songwriter'],
      ['Label',   'SECCA Records'],
      ['Year',    '2026'],
    ],
  },
  {
    id: 'distopia',
    title: 'Dis-topia (Original Cast Recording)',
    artist: 'Robby Good',
    role: 'Mastering',
    year: '2025',
    img: 'images/distopia.jpg',
    featured: true,
    desc: 'A 25-song original cast recording for the full theatrical production. Music by Robby Good, Matthew Deegan, and Abigail Torrence; lyrics by Matthew Deegan and Robby Good; book by Matthew Deegan.',
    meta: [
      ['Format', 'Album'],
      ['Label',  'Robby Good Music'],
      ['Genre',  'Musical Theatre'],
      ['Year',   '2025'],
    ],
  },
  {
    id: 'taiko',
    title: 'The Legend of Taiko',
    subtitle: '鼓震心弦',
    artist: 'Rhymoi Music',
    role: 'Co-mastered with Alan Silverman',
    year: '2024',
    img: 'images/taiko.jpg',
    featured: true,
    desc: 'An audiophile SACD release from Chinese label Rhymoi Music (瑞鸣音乐). The album explores drum culture across Asia, featuring taiko and pipa alongside shakuhachi and guzheng — instruments spanning Japanese and Chinese classical traditions.',
    meta: [
      ['Format', 'Album'],
      ['Label',  'Rhymoi Music (瑞鸣音乐)'],
      ['Genre',  'World / Classical'],
      ['Year',   '2024'],
    ],
  },
  {
    id: 'phoenix',
    title: 'Transcendent Phoenix',
    artist: 'Lucina Yue',
    role: 'Co-mastered with Alan Silverman',
    year: '2025',
    img: 'images/phoenix.jpg',
    featured: true,
    desc: 'A sweeping, emotionally expansive album from vocalist and performer Lucina Yue, blending pop and classical crossover aesthetics into a dramatic full-length statement.',
    meta: [
      ['Format', 'Album'],
      ['Label',  'Neuma Records'],
      ['Genre',  'Global Music, Contemporary Classical, Chamber Music'],
      ['Year',   '2025'],
    ],
  },
  {
    id: 'hourglass',
    title: 'Hourglass',
    artist: 'Hayden Miller',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/hourglass.jpg',
    featured: false,
    desc: 'A modern jazz album led by Hayden Miller.',
    meta: [
      ['Format', 'Album'],
      ['Genre',  'Jazz']
    ],
  },
  {
    id: 'ruby',
    title: 'Boy Man/I Walked',
    artist: 'Ruby Pucillo',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/ruby.jpg',
    featured: false,
    desc: 'A jazz EP release from Ruby Pucillo.',
    meta: [
      ['Format', 'EP'],
      ['Genre',  'Jazz']
    ],
  },
  {
    id: 'distopia-ep',
    title: 'Dis-Topia Original Cast Recording E.P. (Experimental Prototype)',
    artist: 'Robby Good',
    role: 'Mastering Engineer',
    year: '2024',
    img: 'images/distopia-ep.jpg',
    featured: false,
    desc: 'The experimental prototype EP that laid the groundwork for the full Dis-topia cast recording.',
    meta: [
      ['Format', 'EP'],
      ['Genre',  'Musical Theatre']
    ],
  },
  {
    id: 'absoluteranks',
    title: 'FYTIW prod. ranks ddertbAg',
    artist: 'absoluteranks',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/absoluteranks.jpg',
    featured: false,
    desc: 'A high-energy digicore single.',
    meta: [
      ['Format', 'Single'],
      ['Genre',  'Digicore']
    ],
  },
  {
    id: 'journey1',
    title: 'Journey to the West pt 1',
    artist: 'ZenHow',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/journey1.jpg',
    featured: false,
    desc: 'Part one of ZenHow\'s hip-hop and Mandarin pop crossover project.',
    meta: [
      ['Format', 'Single'],
      ['Genre',  'Hip-hop / Mandarin Pop']
    ],
  },
  {
    id: 'journey2',
    title: 'Journey to the West pt 2',
    artist: 'ZenHow',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/journey2.jpg',
    featured: false,
    desc: 'Part two of ZenHow\'s hip-hop and Mandarin pop crossover project.',
    meta: [
      ['Format', 'Single'],
      ['Genre',  'Hip-hop / Mandarin Pop']
    ],
  },
  {
    id: 'built-to-love',
    title: 'Built to Love',
    artist: 'ZenHow',
    role: 'Mastering Engineer',
    year: '2026',
    img: 'images/built-to-love.jpg',
    featured: false,
    desc: 'A collaborative Mandarin pop and hip-hop single.',
    meta: [
      ['Format', 'Single'],
      ['Genre',  'Hip-hop / Mandarin Pop']
    ],
  }
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

  // Extract the 'Label' to put under credits, keep the rest for the tags row
  let labelVal = '';
  const tags = [];
  album.meta.forEach(([k, v]) => {
    if (k.toLowerCase() === 'label') {
      labelVal = v;
    } else {
      tags.push(`${k}: ${v}`); // Format like "Genre: Indie pop"
    }
  });

  area.innerHTML = `
    <div class="album-detail-minimal">
      <button class="detail-back" onclick="closeAlbumDetail()">Back to all credits</button>
      
      <div class="album-hero-split">
        <img src="${album.img}" alt="${album.title} album art" class="album-hero-img" />
        
        <div class="album-hero-text">
          <h2 class="album-hero-artist">${album.artist}</h2>
          <h3 class="album-hero-title">"${album.title}"</h3>
          
          <div class="album-hero-credits">
            <p>Credits: ${album.role}</p>
            ${labelVal ? `<p>Label: ${labelVal}</p>` : ''}
          </div>
        </div>
      </div>

      <div class="album-hero-tags">
        ${tags.join(' &nbsp;&nbsp;|&nbsp;&nbsp; ')}
      </div>
    </div>
  `;

  // Scroll detail into view smoothly
  requestAnimationFrame(() => {
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

// Make sure this is intact right beneath openAlbum!
window.closeAlbumDetail = function() {
  const area = document.getElementById('album-detail');
  if (area) {
    area.innerHTML = ''; // Clears the album details
    // Scrolls the user smoothly back to the top of the page/grid
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }
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
  // Render album grids (Home grid only gets the 4 featured ones)
  const featuredAlbums = ALBUMS.filter(album => album.featured).slice(0, 4);
  renderGrid('home-grid', featuredAlbums);
  
  // Discography grid gets everything
  renderGrid('disc-grid', ALBUMS);
  // Trigger reveal on initial page load
  requestAnimationFrame(checkReveal);

  // Re-check reveal on scroll
  window.addEventListener('scroll', checkReveal, { passive: true });
})();
// ── TRACKLIST AUDIO PLAYER ──────────────────────────────────
(function initTrackPlayer() {
  let currentAudio = null;
  let currentTrackEl = null;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function stopCurrent() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (currentTrackEl) {
      currentTrackEl.classList.remove('playing');
      const btn = currentTrackEl.querySelector('.track-play');
      if (btn) btn.innerHTML = '&#9654;';
      const bar = currentTrackEl.querySelector('.track-progress-bar');
      if (bar) bar.classList.remove('visible');
    }
    currentAudio = null;
    currentTrackEl = null;
  }

  function bindTracks() {
    document.querySelectorAll('.track[data-src]').forEach(trackEl => {
      const src = trackEl.dataset.src;
      const btn = trackEl.querySelector('.track-play');
      const durationEl = trackEl.querySelector('.track-duration');

      // Create a hidden audio element and preload metadata for duration
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.src = src;
      audio.addEventListener('loadedmetadata', () => {
        if (durationEl) durationEl.textContent = formatTime(audio.duration);
      });

      // Build progress bar inside the track row
      const progressBar = document.createElement('div');
      progressBar.className = 'track-progress-bar';
      progressBar.innerHTML = '<div class="track-progress-fill"></div>';
      trackEl.appendChild(progressBar);

      const progressFill = progressBar.querySelector('.track-progress-fill');

      // Click anywhere on the track row (or the button) to toggle play
      trackEl.addEventListener('click', (e) => {
        // If clicking the progress bar, seek instead
        if (e.target === progressBar || progressBar.contains(e.target)) {
          const rect = progressBar.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          if (currentAudio && currentTrackEl === trackEl) {
            currentAudio.currentTime = ratio * currentAudio.duration;
          }
          return;
        }

        if (currentTrackEl === trackEl) {
          // Toggle pause/play on same track
          if (currentAudio.paused) {
            currentAudio.play();
            btn.innerHTML = '&#9646;&#9646;';
          } else {
            currentAudio.pause();
            btn.innerHTML = '&#9654;';
          }
          return;
        }

        // Stop whatever was playing
        stopCurrent();

        // Play new track
        currentAudio = audio;
        currentTrackEl = trackEl;
        trackEl.classList.add('playing');
        btn.innerHTML = '&#9646;&#9646;';
        progressBar.classList.add('visible');
        audio.play();
      });

      // Update progress bar as audio plays
      audio.addEventListener('timeupdate', () => {
        if (currentTrackEl !== trackEl) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
      });

      // Auto-advance to next track
      audio.addEventListener('ended', () => {
        stopCurrent();
        const allTracks = [...document.querySelectorAll('.track[data-src]')];
        const idx = allTracks.indexOf(trackEl);
        if (idx !== -1 && idx < allTracks.length - 1) {
          allTracks[idx + 1].click();
        }
      });
    });
  }

  // Bind on load, and re-bind if composition page is navigated to
  bindTracks();

  // Also re-bind when composition page becomes active (in case of dynamic rendering)
  const origShowPage = window.showPage;
  window.showPage = function(name) {
    origShowPage(name);
    if (name === 'composition') {
      // Give the page a frame to render before binding
      requestAnimationFrame(bindTracks);
    }
    // Stop audio when leaving composition page
    if (name !== 'composition') stopCurrent();
  };
})();
