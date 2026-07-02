(function () {
  var STORAGE_KEY = 'airpay_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function applyLang(lang) {
    var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('.lang-selector .lang-label').forEach(function (el) {
      el.textContent = lang.toUpperCase();
    });
    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    document.documentElement.setAttribute('lang', lang);
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function initLangSelectors() {
    document.querySelectorAll('.lang-selector').forEach(function (selector) {
      selector.addEventListener('click', function (e) {
        e.stopPropagation();
        selector.classList.toggle('open');
      });
      selector.querySelectorAll('.lang-option').forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          setLang(opt.getAttribute('data-lang'));
          selector.classList.remove('open');
        });
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.lang-selector.open').forEach(function (s) {
        s.classList.remove('open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLangSelectors();
    applyLang(getLang());
  });
})();
