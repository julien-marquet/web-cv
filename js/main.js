(function () {
  'use strict';

  var STORAGE_KEY  = 'cv-lang';
  var DEFAULT_LANG = 'en';

  var currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  /* ── Apply all translations for a given language ─────── */
  function applyTranslations(lang) {
    var t = translations[lang];
    if (!t) return;

    /* Update every element that carries a data-i18n key */
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el  = nodes[i];
      var key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(t, key)) {
        el.textContent = t[key];
      }
    }

    /* Sync <html lang="…"> for screen readers and SEO */
    document.documentElement.setAttribute('lang', lang);

    /* Update the toggle button label */
    var label = document.getElementById('lang-label');
    if (label) label.textContent = t.lang_toggle || (lang === 'en' ? 'FR' : 'EN');

    /* Update the toggle button accessible label */
    var btn     = document.getElementById('lang-toggle');
    var nextName = lang === 'en' ? 'French' : 'English';
    if (btn) btn.setAttribute('aria-label', 'Switch to ' + nextName);
  }

  /* ── Toggle between EN ↔ FR with a brief fade ─────────── */
  function toggleLanguage() {
    var cv = document.getElementById('cv');
    if (cv) cv.classList.add('lang-fade');

    /* Swap after a short delay so the fade is visible */
    setTimeout(function () {
      currentLang = currentLang === 'en' ? 'fr' : 'en';
      try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) { /* private mode */ }
      applyTranslations(currentLang);
      if (cv) cv.classList.remove('lang-fade');
    }, 120);
  }

  /* ── Boot ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    applyTranslations(currentLang);

    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggleLanguage);
  });
}());
