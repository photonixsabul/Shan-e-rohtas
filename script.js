document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach((el) => observer.observe(el));

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

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
