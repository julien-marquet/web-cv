(function () {
  const savedLang = localStorage.getItem('lang') || 'fr';
  document.documentElement.classList.add('preload');
  applyTranslation(savedLang);
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('preload');
    document.documentElement.style.visibility = '';
  });

  document.querySelectorAll('[data-lang-switch], [data-lang-switch-mobile]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.lang === 'fr' ? 'en' : 'fr';
      applyTranslation(next);
    });
  });
})();
