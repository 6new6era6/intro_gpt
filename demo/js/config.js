;(function(){
  function getQueryParam(name){
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  var allowedLangs = { en:true, ru:true, de:true, es:true, fr:true, pt:true };
  var currenciesMap = {
    USD: { symbol: "$",  position: "prefix", locale: "en-US", code: "USD" },
    EUR: { symbol: "€",  position: "suffix", locale: "de-DE", code: "EUR" },
    GBP: { symbol: "£",  position: "prefix", locale: "en-GB", code: "GBP" },
    CHF: { symbol: "Fr.",position: "prefix", locale: "de-CH", code: "CHF" },
    PLN: { symbol: "zł", position: "suffix", locale: "pl-PL", code: "PLN" }
  };

  var numberLocales = { en: "en-US", ru: "ru-RU", de: "de-DE", es: "es-ES", fr: "fr-FR", pt: "pt-PT" };

  var urlLang = getQueryParam('lang');
  var urlCurrency = getQueryParam('currency');

  var storedLang = localStorage.getItem('app.lang');
  var storedCurrency = localStorage.getItem('app.currency');

  var lang = (urlLang && allowedLangs[urlLang]) ? urlLang : (storedLang && allowedLangs[storedLang] ? storedLang : 'en');
  var currency = (urlCurrency && currenciesMap[urlCurrency]) ? urlCurrency : (storedCurrency && currenciesMap[storedCurrency] ? storedCurrency : 'USD');

  window.APP_CONFIG = {
    lang: lang,
    currency: currency,
    currenciesMap: currenciesMap,
    numberLocales: numberLocales
  };

  try {
    localStorage.setItem('app.lang', lang);
    localStorage.setItem('app.currency', currency);
  } catch(e) {}

  window.dispatchEvent(new CustomEvent('app:config-ready'));
})();


