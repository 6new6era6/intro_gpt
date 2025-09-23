# i18n guide

This project uses a lightweight client-side i18n helper. Static texts are bound with data attributes, and dynamic strings use i18n.t() in JS.

## How it works
- Scripts loaded in this order: `js/i18n/i18n.js`, then locale files like `js/i18n/de.js`, `js/i18n/en.js`.
- On DOMContentLoaded i18n:
  - Detects locale from URL (?lang=xx) → localStorage → default.
  - Sets `<html lang>` and updates hidden inputs `name="page_lang"`.
  - Applies translations to the DOM.

## Markup bindings
- `data-i18n="path.to.key"` → replace textContent
- `data-i18n-html="path.to.key"` → replace innerHTML (when value contains markup)
- `data-i18n-attr="placeholder,title"` + `data-i18n-placeholder="key"` → translate attributes

## Add a new language
1. Create a new file `js/i18n/<lang>.js` and register it:

```
(function(){
  const xx = {
    // ... mirror keys from de.js
  };
  if (window.i18n) window.i18n.register('xx', xx);
})();
```

2. Include it in `index.php` after `de.js`/`en.js`.
3. Open with `?lang=xx` to switch (will be persisted in localStorage).

## Translate dynamic strings
Use `i18n.t('path.to.key', { var: value })` inside JS. For example:
- Chart tooltip: `i18n.t('chart.tooltip_balance', { value })`
- Notifications: `i18n.t('notifications.deposit_success', { amount })`

## Notes
- If a key is missing, the helper returns the key name so issues are visible during testing.
- Number/currency formatting can use `toLocaleString(i18n.locale)` where relevant.
