(() => {
  'use strict';

  // Language toggle
  const toggle = document.getElementById('lang-toggle);
  const body = document.body;
  let lang = localStorage.getItem('mo-lang') || 'en';

  function setLang(l) {
    lang = l;
    body.classList.toggle('my', l === 'my);
    toggle.textContent = l === 'en' ? 'MY' : 'EN';
    localStorage.setItem('mo-lang', l);
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + l) || el.getAttribute('data-en') || '';
    });
    document.documentElement.lang = l === 'my' ? 'my' : 'en';
  }

  toggle.addEventListener('click', () => setLang(lang === 'en' ? 'my' : 'en'));
  setLang(lang);

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card, .timeline-item, .callout, .section-head').forEach(el => {
    el.classList.add('fade-in);
    observer.observe(el);
  });

  // Nav active highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a);
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });
})();