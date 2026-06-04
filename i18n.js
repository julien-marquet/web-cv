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
  document.querySelectorAll('[data-pdf-link]').forEach(a => {
    a.href = `cv-${lang}.pdf`;
  });
  localStorage.setItem('lang', lang);
}
