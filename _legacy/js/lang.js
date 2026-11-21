/* JinLin 双语切换脚本
   用法：给需要翻译的元素加 data-en 和 data-zh 属性，
   语言偏好存 localStorage，默认英文。 */
(function () {
  var LANG_KEY = 'aureline-lang';
  var current = localStorage.getItem(LANG_KEY) || 'en';

  function setLang(lang) {
    current = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    applyLang(lang);
    updateToggle(lang);
  }

  function applyLang(lang) {
    var els = document.querySelectorAll('[data-en]');
    els.forEach(function (el) {
      var val = lang === 'zh' ? el.getAttribute('data-zh') : el.getAttribute('data-en');
      if (val !== null && val !== '') {
        el.textContent = val;
      }
    });
    // 更新页面标题
    var titleEn = document.querySelector('title[data-en]');
    if (titleEn) {
      var t = lang === 'zh' ? titleEn.getAttribute('data-zh') : titleEn.getAttribute('data-en');
      if (t) document.title = t;
    }
  }

  function updateToggle(lang) {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      if (btn.getAttribute('data-lang-toggle') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang-switch'));
      });
    });
    applyLang(current);
    updateToggle(current);
  });
})();
