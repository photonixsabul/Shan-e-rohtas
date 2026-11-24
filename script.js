document.addEventListener('DOMContentLoaded', () => {
  // 1. Royal Preloader Curtain (fast & smooth)
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hideLoader = () => {
      setTimeout(() => preloader.classList.add('hide'), 450);
    };
    if (document.readyState === 'complete') hideLoader();
    else window.addEventListener('load', hideLoader);
    setTimeout(() => preloader.classList.add('hide'), 1800);
  }

  // 2. Scroll Progress Gold Bar & Sticky Navbar
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.width = `${Math.min(100, (scrollTop / docHeight) * 100)}%`;
    }
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 36);
    }
  }, { passive: true });

  // 3. Full-Screen Mobile Glass Drawer Toggle
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 4. Advanced Scroll Reveal & Curtain Unfold
  const revealEls = document.querySelectorAll('.reveal, .reveal-curtain');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach((el) => observer.observe(el));

  // 5. Ambient Floating Gold Dust Particles on Dark Hero
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

    const count = window.innerWidth < 768 ? 22 : 44;
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
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
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

  // 6. Desktop 3D Perspective Tilt on Hero Card
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

  // 7. Interactive Filter Tabs (Gallery & Menu)
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

  // 8. Interactive Lightbox with Next / Prev Navigation
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

  galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIdx - 1); });
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIdx + 1); });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // 9. WhatsApp Direct Booking Form
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
});
