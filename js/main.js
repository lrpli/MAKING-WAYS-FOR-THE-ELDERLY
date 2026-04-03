/* ============================================
   Making Ways for the Elderly — JavaScript
   Scroll reveals, mobile menu, navbar effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a nav link
    menu.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Navbar Scroll Effect =====
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    let lastScroll = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 20) {
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    };

    // Use passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();
  }

  // ===== Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ===== Active Nav Link Highlight =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== Smooth hover effects for cards =====
  const cards = document.querySelectorAll('.link-card, .info-card, .contact-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
  });

  // ===== Add loaded class for initial animations =====
  document.body.classList.add('loaded');

});
