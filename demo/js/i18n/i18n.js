// Lightweight i18n utility for DOM translations and JS strings
(function (window) {
  const I18N = {
    locale: 'de',
    locales: {},
    setLocale(locale) {
      this.locale = locale;
      try { localStorage.setItem('locale', locale); } catch (e) {}
      return this;
    },
    register(locale, dict) {
      this.locales[locale] = this.locales[locale] || {};
      Object.assign(this.locales[locale], dict || {});
      return this;
    },
    t(key, vars = {}) {
      const dict = this.locales[this.locale] || {};
      let str = key.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : undefined), dict);
      if (str == null) return key; // fallback to key
      if (typeof str !== 'string') return key;
      return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
    },
    apply(root = document) {
      // textContent translation
      root.querySelectorAll('[data-i18n]')?.forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const txt = this.t(key);
        if (txt !== key) el.textContent = txt;
      });

      // innerHTML translation
      root.querySelectorAll('[data-i18n-html]')?.forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        const html = this.t(key);
        if (html !== key) el.innerHTML = html;
      });

      // attributes translation, e.g. data-i18n-attr="placeholder,title" and data-i18n-placeholder="key"
      root.querySelectorAll('[data-i18n-attr]')?.forEach((el) => {
        const attrs = (el.getAttribute('data-i18n-attr') || '').split(',').map((s) => s.trim()).filter(Boolean);
        attrs.forEach((attr) => {
          const attrKey = el.getAttribute(`data-i18n-${attr}`);
          if (!attrKey) return;
          const val = this.t(attrKey);
          if (val !== attrKey) el.setAttribute(attr, val);
        });
      });

      // side effects: update <html lang> and hidden inputs page_lang
      try {
        document.documentElement.setAttribute('lang', this.locale);
        document.querySelectorAll('input[name="page_lang"]').forEach((inp) => {
          inp.value = this.locale;
        });
      } catch (e) {}
    }
  };

  // auto-apply on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    try {
      // Decide locale: URL ?lang=xx overrides, else localStorage, else default 'de'
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const stored = (() => { try { return localStorage.getItem('locale'); } catch (e) { return null; } })();
      const desired = (urlLang || stored || 'de').toLowerCase();

      // Pick from registered locales if available; otherwise fallback to 'de'
      const available = Object.keys(I18N.locales || {});
      const fallback = available.includes('de') ? 'de' : (available[0] || 'de');
      const chosen = available.includes(desired) ? desired : fallback;
      I18N.setLocale(chosen);
      I18N.apply(document);
    } catch (e) { /* no-op */ }
  });

  window.i18n = I18N;
})(window);
