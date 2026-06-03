/* ============================================================
   SHARON HURVITZ — main.js
   - Scroll reveal
   - Mobile nav toggle
   - Nav scroll shadow
   - Contact form (GitHub Pages: redirects to Formspree)
   ============================================================ */

// ------ SCROLL REVEAL ------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Make hero visible immediately (above the fold)
document.querySelectorAll('.hero .reveal').forEach((el) => {
  el.classList.add('visible');
});

// ------ NAV SCROLL SHADOW ------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 1px 12px rgba(0,0,0,0.07)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ------ MOBILE NAV ------
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    document.body.style.overflow = 'hidden';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
    document.body.style.overflow = '';
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => s.style.transform = '');
    document.body.style.overflow = '';
  });
});

// ------ CONTACT FORM ------
// GitHub Pages doesn't handle form submissions natively.
// Two options:
//   A) Formspree (free, easy): sign up at formspree.io, get your endpoint,
//      and replace the action in index.html:
//      <form action="https://formspree.io/f/YOUR_ID" method="POST">
//
//   B) Netlify (if you deploy there instead): the data-netlify="true"
//      attribute on the form handles it automatically — no JS needed.
//
// The code below adds a lightweight success message for Option A.

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    // Only intercept if it's a Formspree endpoint (fetch approach)
    const action = form.getAttribute('action') || '';
    if (!action.includes('formspree')) return; // let native POST through

    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res  = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.innerHTML = `
          <div style="padding:32px 0; text-align:center;">
            <p style="font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:400; color:#1A1816; margin-bottom:10px;">Message sent.</p>
            <p style="font-size:13px; color:#5A5652;">Thanks for reaching out — I'll be in touch within 24–48 hours.</p>
          </div>`;
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.textContent = 'Something went wrong — please try again';
      btn.disabled = false;
    }
  });
}
