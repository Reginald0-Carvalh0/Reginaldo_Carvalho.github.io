// script.js
// language persistence and dark mode persistence across pages

(function(){
  const LS_LANG = 'site_lang_v1';
  const LS_DARK = 'site_dark_v1';

  // read persisted preferences
  const savedLang = localStorage.getItem(LS_LANG) || 'en';
  const savedDark = localStorage.getItem(LS_DARK) === '1';

  // apply initial state on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(savedLang);
    applyDark(savedDark);

    // wire flag buttons
    document.querySelectorAll('.flag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        if(lang) { setLang(lang); }
      });
    });

    // wire the toggle (single element)
    const toggle = document.querySelector('.toggle');
    if(toggle){
      toggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem(LS_DARK, isDark ? '1':'0');
      });
    }

    // also wire on-page inline language links (if any)
    document.querySelectorAll('[data-switch-lang]').forEach(el=>{
      el.addEventListener('click', e=>{
        setLang(el.dataset.switchLang);
      });
    });
  });

  // functions
  window.setLang = setLang;

  function setLang(lang){
    localStorage.setItem(LS_LANG, lang);
    applyLang(lang);
  }

  function applyLang(lang){
    document.querySelectorAll('.lang').forEach(node=>{
      node.classList.remove('active');
    });
    const target = document.querySelectorAll('.lang.'+lang);
    target.forEach(n => n.classList.add('active'));
  }

  function applyDark(isDark){
    if(isDark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }
})();
