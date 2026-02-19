/* ============================================
   Elevated Engagement AI — V3 Premium Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll Reveal ----
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ---- Nav Scroll Effect ----
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile Menu ----
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all open items
      document.querySelectorAll('.faq-item.active').forEach(open => {
        open.classList.remove('active');
        open.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target  = el.getAttribute('data-count');
    const suffix  = el.getAttribute('data-suffix') || '';
    const isFloat = target.includes('.');
    const end     = parseFloat(target);
    const duration = 2000;
    const start   = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current  = ease * end;
      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Fallback: force show all reveals ----
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 2500);


  // ============================================
  //  PREMIUM INTERACTIONS (desktop only)
  // ============================================

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth < 768;

  if (!prefersReduced) {

    // ---- 3D Card Tilt ----
    const tiltCards = document.querySelectorAll('.pain-card, .service-card, .result-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (isMobile()) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
        card.style.transition = 'transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s';
      });
    });

    // ---- Magnetic Button Effect ----
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        if (isMobile()) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translateY(-3px) translate(${x * 0.18}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // ---- Hero Orb Parallax on Mouse Move ----
    const orbs = document.querySelectorAll('.hero-orb');
    const hero = document.querySelector('.hero');
    if (hero && orbs.length) {
      let heroRect = hero.getBoundingClientRect();
      window.addEventListener('resize', () => { heroRect = hero.getBoundingClientRect(); }, { passive: true });

      document.addEventListener('mousemove', (e) => {
        if (isMobile()) return;
        if (window.scrollY > heroRect.bottom) return;
        const cx = e.clientX / window.innerWidth  - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        orbs.forEach((orb, i) => {
          const depth = (i + 1) * 14;
          orb.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
          orb.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        });
      }, { passive: true });
    }

    // ---- Cursor Glow ----
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed; width: 400px; height: 400px; border-radius: 50%;
      background: radial-gradient(circle, rgba(41,151,255,0.055) 0%, transparent 70%);
      pointer-events: none; z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.18s ease-out, top 0.18s ease-out, opacity 0.4s;
      opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
      if (isMobile()) return;
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top  = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
    });

  } // end !prefersReduced

});
