;(function(){
  var ready = false;
  var currentLang = 'en';
  var currentCurrency = 'USD';

  function interpolate(template, params){
    if (!template) return '';
    return String(template).replace(/\{\{(.*?)\}\}/g, function(_, key){
      key = key.trim();
      return Object.prototype.hasOwnProperty.call(params, key) ? params[key] : '';
    });
  }

  function getNumberLocale(){
    var cfg = window.APP_CONFIG;
    if (!cfg) return 'en-US';
    var map = cfg.numberLocales || { en:'en-US', ru:'ru-RU', de:'de-DE' };
    return map[currentLang] || 'en-US';
  }

  function getCurrencyMeta(){
    var cfg = window.APP_CONFIG || { currenciesMap:{} };
    return cfg.currenciesMap[currentCurrency] || { symbol:'', position:'prefix', locale:getNumberLocale(), code:currentCurrency };
  }

  function t(key, params){
    params = params || {};
    var dict = window.TRANSLATIONS || {};
    var val = (dict[currentLang] && dict[currentLang][key])
           || (dict.en && dict.en[key])
           || (dict.de && dict.de[key])
           || key;
    params.currency = params.currency || getCurrencyMeta().symbol;
    return interpolate(val, params);
  }

  function setLanguage(lang){
    if (!window.APP_CONFIG) return;
    if (!window.APP_CONFIG.numberLocales[lang]) return;
    currentLang = lang;
    try{ localStorage.setItem('app.lang', lang); }catch(e){}
  }
  function getLanguage(){ return currentLang; }

  function setCurrency(code){
    if (!window.APP_CONFIG) return;
    if (!window.APP_CONFIG.currenciesMap[code]) return;
    currentCurrency = code;
    try{ localStorage.setItem('app.currency', code); }catch(e){}
  }
  function getCurrency(){ return currentCurrency; }

  function formatNumber(value, opts){
    var locale = getNumberLocale();
    return new Intl.NumberFormat(locale, opts || { maximumFractionDigits: 2 }).format(Number(value||0));
  }

  function formatCurrency(value, opts){
    var meta = getCurrencyMeta();
    var locale = meta.locale || getNumberLocale();
    var amount = new Intl.NumberFormat(locale, Object.assign({ minimumFractionDigits: 2, maximumFractionDigits: 2 }, opts)).format(Number(value||0));
    if (meta.position === 'prefix') return meta.symbol + (amount.startsWith(' ') ? amount : ' ' + amount).trimStart();
    return (amount + ' ' + meta.symbol).trim();
  }

  function apply(root){
    root = root || document;
    // text nodes via data-i18n
    var nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(key);
    });

    // attributes via data-i18n-attr="attr:key; attr2:key2"
    var attrNodes = root.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach(function(el){
      var spec = el.getAttribute('data-i18n-attr') || '';
      spec.split(';').forEach(function(pair){
        var p = pair.trim();
        if (!p) return;
        var parts = p.split(':');
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        el.setAttribute(attr, t(key));
      });
    });

    updateCurrencyDisplay(root);
  }

  function updateCurrencyDisplay(root){
    root = root || document;
    var meta = getCurrencyMeta();
    // Symbols
    root.querySelectorAll('[data-currency-symbol]').forEach(function(el){
      el.textContent = meta.symbol;
    });
    // Amounts
    root.querySelectorAll('[data-currency-amount]').forEach(function(el){
      var raw = el.getAttribute('data-currency-amount');
      var num = Number(raw || 0);
      el.textContent = formatCurrency(num);
    });
  }

  var api = {
    t: t,
    setLanguage: setLanguage,
    getLanguage: getLanguage,
    setCurrency: setCurrency,
    getCurrency: getCurrency,
    apply: apply,
    formatNumber: formatNumber,
    formatCurrency: formatCurrency,
    updateCurrencyDisplay: updateCurrencyDisplay
  };

  function expose(){
    window.micronyxI18n = Object.freeze(api);
    Object.defineProperty(window, 'i18n', {
      get: function(){ return window.micronyxI18n; },
      set: function(){ /* prevent overwrite */ },
      configurable: false
    });
    window._t = function(k,p){ return (window.i18n && window.i18n.t) ? window.i18n.t(k,p) : k; };
    // watchdog to restore alias if overwritten
    setInterval(function(){
      if (window.i18n !== window.micronyxI18n) {
        try {
          Object.defineProperty(window, 'i18n', {
            get: function(){ return window.micronyxI18n; },
            set: function(){},
            configurable: false
          });
        } catch(e){}
      }
    }, 2000);
  }

  function init(){
    if (!window.APP_CONFIG || !window.TRANSLATIONS) return;
    currentLang = window.APP_CONFIG.lang || 'en';
    currentCurrency = window.APP_CONFIG.currency || 'USD';
    ready = true;
    expose();
  }

  window.addEventListener('app:config-ready', function(){
    // ensure translations loaded
    if (window.TRANSLATIONS) init();
  });
  // also try DOMContentLoaded in case order already satisfied
  document.addEventListener('DOMContentLoaded', function(){
    if (window.APP_CONFIG && window.TRANSLATIONS) init();
  });

  // Immediate init if dependencies already loaded before this script
  if (window.APP_CONFIG && window.TRANSLATIONS) {
    try { init(); } catch(e) {}
  }
})();


