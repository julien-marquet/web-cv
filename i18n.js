function applyTranslation(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = TRANSLATIONS[lang]?.[el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });
  const isEn = lang === 'en';
  document.querySelectorAll('[data-lang-switch], [data-lang-switch-mobile]').forEach(btn => {
    btn.setAttribute('aria-checked', isEn ? 'true' : 'false');
  });
  localStorage.setItem('lang', lang);
}
