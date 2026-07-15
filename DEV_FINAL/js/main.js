/* ==========================================================================
   Portfólio — João Pedro Gagliardi
   Interações compartilhadas por todas as páginas
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Header: sombra ao rolar ---------- */
  var header = document.querySelector('.header');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Animações de entrada ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealTargets = document.querySelectorAll(
    '.hero__title, .hero__subtitle, .hero__actions,' +
    '.sobre__content, .sobre__media,' +
    '.stat, .skill, .case__content, .case__media,' +
    '.cta__title, .cta__subtitle, .cta__actions,' +
    '.chero__info, .chero__media,' +
    '.csection__content, .csection__left, .csection__right,' +
    '.quote-card, .learning'
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Scroll por âncora compensando a altura do header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href');
      if (id.length <= 1) return;

      var target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16;

      window.scrollTo({
        top: top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  });
})();
