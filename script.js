// ============================================
// ASHAR IJAZ - PORTFOLIO WEBSITE
// script.js - All JavaScript Interactivity
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. NAVBAR - Scroll effect & active link
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile a');
  const backToTop = document.getElementById('back-to-top');

  // Scroll handler for navbar shadow and back-to-top button
  window.addEventListener('scroll', () => {
    // Sticky navbar style
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Highlight active nav link
    updateActiveNavLink();
  });

  // Highlight the nav link for the current section
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // 2. MOBILE MENU TOGGLE
  // ============================================
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
    // Prevent body scrolling when menu is open
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // 3. SMOOTH SCROLL for all anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 4. BACK TO TOP BUTTON
  // ============================================
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 5. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ============================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Add stagger delay for grid children
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = `${delay}ms`;
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
    revealObserver.observe(el);
  });

  // Stagger animation for skill cards and project cards
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    card.dataset.delay = i * 80;
    card.classList.add('reveal');
    revealObserver.observe(card);
  });

  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.dataset.delay = i * 120;
    card.classList.add('reveal');
    revealObserver.observe(card);
  });

  // ============================================
  // 6. SKILL BAR ANIMATION
  // Triggered when skills section enters viewport
  // ============================================
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-bar');
        bars.forEach(bar => {
          const targetWidth = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
        });
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillBarObserver.observe(skillsSection);

  // ============================================
  // 7. CONTACT FORM HANDLER
  // Simulates form submission with success message
  // ============================================
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');

  // FormSubmit handles the submission natively, so we don't intercept it with JS.
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => { ... e.preventDefault(); ... });
  // }

  // ============================================
  // 8. TYPING ANIMATION in Hero
  // ============================================
  const typingEl = document.getElementById('typing-text');
  const words = [
    'Solutions Creator',
    'Website Developer',
    'E-commerce Builder',
    'POS Systems Creator',
    'Problem Solver'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at end of word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400;
    }

    typingTimeout = setTimeout(type, typeSpeed);
  }

  if (typingEl) {
    setTimeout(type, 800);
  }

  // ============================================
  // 9. ANIMATED COUNTER in Hero stats
  // ============================================
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 10. CV DOWNLOAD logic removed so HTML download attribute works naturally

  // ============================================
  // 11. TOAST NOTIFICATION
  // ============================================
  function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 32px;
      background: rgba(13, 21, 38, 0.95);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #f1f5f9;
      padding: 14px 22px;
      border-radius: 12px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      backdrop-filter: blur(16px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      z-index: 9999;
      animation: slideInRight 0.3s ease;
      max-width: 280px;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Add toast animations to document
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeOut {
      to { opacity: 0; transform: translateX(20px); }
    }
  `;
  document.head.appendChild(toastStyle);

  // ============================================
  // 12. DYNAMIC COPYRIGHT YEAR
  // ============================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
