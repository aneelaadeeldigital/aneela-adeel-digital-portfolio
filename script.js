// ============================================================
// Aneela Adeel Digital — interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.classList.toggle('is-active', isOpen);
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (glow && !reduceMotion && !isTouch) {
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    }, { passive: true });
  } else if (glow) {
    glow.style.display = 'none';
  }

  /* ---------- Hero scene: gentle 3D tilt on mouse move ---------- */
  const scene = document.getElementById('heroScene');
  if (scene && !reduceMotion && !isTouch) {
    const cards = scene.querySelectorAll('[data-depth]');
    let raf = null;

    scene.addEventListener('mousemove', (e) => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cards.forEach(card => {
          const depth = parseFloat(card.dataset.depth) || 10;
          const moveX = x * depth;
          const moveY = y * depth;
          card.style.setProperty('--tiltX', `${moveX}px`);
          card.style.setProperty('--tiltY', `${moveY}px`);
          card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });
    });

    scene.addEventListener('mouseleave', () => {
      cards.forEach(card => { card.style.transform = ''; });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .work-card, .about-media, .about-copy, .contact-card, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('reveal-in'));
  }

  /* ---------- Contact form -> WhatsApp handoff ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const WHATSAPP_NUMBER = '923200380626';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const contact = (data.get('contact') || '').toString().trim();
      const service = (data.get('service') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !contact || !message) {
        if (note) {
          note.textContent = 'Please fill in your name, contact and message first.';
          note.style.color = '#B84E22';
        }
        return;
      }

      const text =
        `Hi Aneela, I'm ${name}.\n` +
        `Interested in: ${service}\n` +
        `Reach me at: ${contact}\n\n` +
        `${message}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');

      if (note) {
        note.textContent = 'Opening WhatsApp with your message ready to send...';
        note.style.color = '#2A1B10';
      }
      form.reset();
    });
  }
});
