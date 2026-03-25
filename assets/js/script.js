/**
 * Institution Office Task Reminder — Main Script
 * Handles: Navigation, Hamburger Menu, FAQ Accordion,
 *          Lightbox Gallery, Smooth Scroll, Active Links
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Active Nav Link Highlighting ─────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── 2. Hamburger / Mobile Nav ────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
      hamburger.setAttribute('aria-expanded',
        hamburger.classList.contains('open').toString()
      );
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navMobile.contains(e.target)) {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      }
    });

    // Close on mobile link click
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      });
    });
  }

  // ── 3. FAQ Accordion ─────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('open');
        const ans = q.nextElementSibling;
        if (ans) ans.classList.remove('open');
      });

      // If it wasn't open, open it
      if (!isOpen) {
        btn.classList.add('open');
        const answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });

  // ── 4. Screenshot Lightbox ───────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbCaption= document.getElementById('lightbox-caption');
  const lbClose  = document.getElementById('lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lbImg.src = item.dataset.src;
        lbImg.alt = item.dataset.caption || '';
        if (lbCaption) lbCaption.textContent = item.dataset.caption || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.src = '';
    };

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // ── 5. Smooth Scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.navbar')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── 6. Scroll Reveal (simple IntersectionObserver) ───────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ── 7. Contact Form (Formspree) ──────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const resp = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (resp.ok) {
          showFormMsg('success', '✓ Message sent! We will respond to your institution shortly.');
          contactForm.reset();
        } else {
          showFormMsg('error', '✗ Could not send message. Please email us directly.');
        }
      } catch {
        showFormMsg('error', '✗ Network error. Please try again or email us directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  function showFormMsg(type, text) {
    let msg = document.getElementById('form-message');
    if (!msg) {
      msg = document.createElement('p');
      msg.id = 'form-message';
      document.getElementById('contact-form')?.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.cssText = `
      margin-top:14px; padding:12px 16px; border-radius:8px; font-size:0.9rem;
      background:${type === 'success' ? '#d4f3e5' : '#fde8e8'};
      color:${type === 'success' ? '#1e7a54' : '#c0392b'};
    `;
  }

  // ── 8. Sticky nav shadow on scroll ───────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(26,79,138,0.14)'
        : '0 2px 8px rgba(26,79,138,0.08)';
    }, { passive: true });
  }

});
