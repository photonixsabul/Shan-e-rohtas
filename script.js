document.addEventListener('DOMContentLoaded', () => {
  // 1. Royal Preloader Curtain
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hideLoader = () => setTimeout(() => preloader.classList.add('hide'), 400);
    if (document.readyState === 'complete') hideLoader();
    else window.addEventListener('load', hideLoader);
    setTimeout(() => preloader.classList.add('hide'), 1700);
  }

  // 2. Scroll Progress Gold Bar & Sticky Glass Navbar
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${Math.min(100, (scrollTop / docHeight) * 100)}%`;
    }
    if (navbar) navbar.classList.toggle('scrolled', scrollTop > 36);
  }, { passive: true });

  // 3. Mobile Glass Dropdown Menu (Auto-Close on Outside Touch + Scroll Enabled)
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu automatically when tapping anywhere outside on the page
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('touchstart', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    }, { passive: true });
  }

  // 4. Scroll Reveal & Curtain Unfold
  const revealEls = document.querySelectorAll('.reveal, .reveal-curtain');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

  revealEls.forEach((el) => observer.observe(el));

  // 5. Ambient Gold Dust Particles Canvas
  const canvas = document.getElementById('gold-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 24 : 48;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.45 - 0.15,
        alpha: Math.random() * 0.65 + 0.2
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 215, 116, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();
  }

  // 6. Desktop 3D Perspective Tilt
  const tiltCard = document.querySelector('.tilt-card');
  if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltCard.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale(1.01)`;
    });
    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // 7. Interactive FAQ Accordion
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // 8. Interactive Filter Tabs (Gallery & Menu)
  document.querySelectorAll('.filter-tabs').forEach((tabGroup) => {
    const targetSelector = tabGroup.dataset.target;
    const buttons = tabGroup.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll(targetSelector);
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  });

  // 9. Interactive Lightbox with Next / Prev
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
  let currentIdx = 0;

  const openLightbox = (idx) => {
    if (!lightbox || !lightboxImg || galleryImgs.length === 0) return;
    currentIdx = (idx + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[currentIdx].src;
    lightbox.classList.add('open');
  };

  galleryImgs.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIdx - 1); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIdx + 1); });
  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  // 10. WhatsApp Direct Booking Form + GA4 Lead Tracking
  const trackEvent = (eventName, params) => {
    if (typeof gtag === 'function') gtag('event', eventName, params);
  };

  const bookingForm = document.getElementById('whatsapp-booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guest-name').value.trim();
      const phone = document.getElementById('guest-phone').value.trim();
      const service = document.getElementById('guest-service').value;
      const date = document.getElementById('guest-date').value;
      const guests = document.getElementById('guest-count').value;
      const notes = document.getElementById('guest-notes').value.trim();

      trackEvent('generate_lead', {
        event_category: 'booking_form',
        event_label: service,
        page_path: window.location.pathname
      });

      const msg = `Hello Shan-E-Rohtas,%0A` +
                  `Name: ${encodeURIComponent(name)}%0A` +
                  `Phone: ${encodeURIComponent(phone)}%0A` +
                  `Booking For: ${encodeURIComponent(service)}%0A` +
                  `Date: ${encodeURIComponent(date)}%0A` +
                  `Guests: ${encodeURIComponent(guests)}%0A` +
                  `Details: ${encodeURIComponent(notes || 'Standard inquiry')}`;

      window.open(`https://wa.me/917042566700?text=${msg}`, '_blank');
    });
  }

  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent('whatsapp_click', {
        event_category: 'lead',
        event_label: link.textContent.trim() || 'WhatsApp Link',
        page_path: window.location.pathname
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', () => {
      trackEvent('phone_call_click', {
        event_category: 'lead',
        event_label: link.textContent.trim() || 'Phone Call',
        page_path: window.location.pathname
      });
    });
  });

  // 11. 3D Scroll Perspective Unfold & Continuous Parallax Depth (iOS/Android/Desktop 60fps)
  const cards3d = document.querySelectorAll(
    '.pillar-card, .glass-feature-card, .blog-card, .menu-card, .booking-box, .footer-cta-strip'
  );
  cards3d.forEach((card) => {
    if (card.parentElement) {
      card.parentElement.classList.add('perspective-stage');
    }
    card.classList.add('card-3d-ready');
  });

  const heroBg = document.querySelector('.hero-bg');
  const heroCard = document.querySelector('.hero-card');
  const splitMedias = document.querySelectorAll('.split-media img');
  const crestLogo = document.querySelector('.royal-crest-logo');

  let ticking3d = false;
  const update3DScroll = () => {
    const vh = window.innerHeight || 800;

    // Hero background & hero card subtle 3D depth on scroll
    if (heroBg) {
      const sy = window.scrollY;
      if (sy < vh * 1.4) {
        heroBg.style.transform = `scale(1.06) translate3d(0, ${sy * 0.22}px, 0)`;
      }
    }
    if (heroCard && window.innerWidth <= 960) {
      const rect = heroCard.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height * 0.5 - vh * 0.5) / vh));
      heroCard.style.transform = `perspective(1000px) rotateX(${(-progress * 7).toFixed(2)}deg) translateY(${(progress * -10).toFixed(1)}px)`;
    }

    // Split media 3D tilt & depth glide
    splitMedias.forEach((img) => {
      const box = img.parentElement;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const rotX = Math.max(-8, Math.min(8, -progress * 9));
        const transY = Math.max(-18, Math.min(18, progress * 24));
        box.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg)`;
        img.style.transform = `scale(1.08) translate3d(0, ${transY.toFixed(1)}px, 0)`;
      }
    });

    // Royal Crest 3D Y-axis rotation & lift on scroll
    if (crestLogo) {
      const rect = crestLogo.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
        const rotY = Math.max(-18, Math.min(18, progress * 26));
        const rotX = Math.max(-8, Math.min(8, -progress * 10));
        crestLogo.style.transform = `perspective(900px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) translateY(${(progress * -12).toFixed(1)}px)`;
      }
    }

    ticking3d = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking3d) {
      window.requestAnimationFrame(update3DScroll);
      ticking3d = true;
    }
  }, { passive: true });
  update3DScroll();
});
