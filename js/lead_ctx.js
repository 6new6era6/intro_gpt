/*
  Lead Context Module (lead_ctx.js)

  Responsibilities:
  - Collect traffic params (UTM, fbclid, gclid, ttclid, affc, external_id, ad_id, campaign_id, etc.)
  - Collect technical signals (UA, device, lang, timezone, referrer, screen, viewport)
  - Persist to localStorage under key "leadCtx"
  - Update with chat answers, scoring, and chat log
  - On offer pages: auto-inject hidden inputs into forms (lead_* prefix) and Keitaro-compatible names

  Public API (exposed on window.LeadCtx):
  - init({ role: 'landing' | 'offer', autoAttachForms = (role==='offer') })
  - get(): object
  - update(partial): merges and persists
  - addAnswer(name, value)
  - addChatMessage(role, text)
  - setScore({ readiness_score, lead_tier })
  - setInvestmentPotential(value:number|string)
  - markReady(optionalScore?)
  - isReady(): boolean
  - attachForms(options?)
  - getOfferUrl(defaultUrl?): string
  - maybeAppendOfferCTA(containerEl?): creates CTA "Почати заробляти" only when lead is ready

  Notes:
  - Safe to include on any page. No external deps. All errors are swallowed to avoid breaking the page.
  - Readiness heuristic (isReady): returns true if ANY condition:
      * scoring.ready === true (explicit)
      * scoring.readiness_score >= 70
      * (investment_potential > 0 AND chat_log length >= 2)
    Only when ready the CTA is injected (maybeAppendOfferCTA). You can call this function multiple times; CTA appears once.
*/

(function () {
  const STORAGE_KEY = 'leadCtx';
  const CLICK_PARAMS = [
    'fbclid', 'gclid', 'ttclid', 'msclkid', 'affc', 'clickid',
    'external_id', 'ad_id', 'adid', 'adset_id', 'adset', 'campaign_id', 'campaign', 'creative_id', 'pixel'
  ];
  const UTM_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'utm_creative'
  ];

  function nowIso() {
    try { return new Date().toISOString(); } catch (_) { return ''; }
  }

  function uuid() {
    // Basic RFC4122-ish v4 (not cryptographically strong)
    try {
      const t = Date.now();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (t + Math.random()*16) % 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    } catch (_) { return String(Math.random()); }
  }

  function parseQuery(search) {
    const out = {};
    try {
      const usp = new URLSearchParams(search || window.location.search);
      usp.forEach((v, k) => { out[k] = v; });
    } catch(_) {}
    return out;
  }

  function pick(obj, keys) {
    const res = {};
    if (!obj) return res;
    for (const k of keys) {
      if (obj[k] != null && obj[k] !== '') res[k] = obj[k];
    }
    return res;
  }

  function getDeviceInfo() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isMobile = /mobile|iphone|ipod|android.*mobile|windows phone|opera mini/.test(ua);
    const isTablet = /ipad|android(?!.*mobile)|tablet/.test(ua);
    const isDesktop = !isMobile && !isTablet;
    let os = 'other';
    if (/windows/.test(ua)) os = 'windows';
    else if (/mac os|macintosh/.test(ua)) os = 'mac';
    else if (/android/.test(ua)) os = 'android';
    else if (/iphone|ipad|ipod|ios/.test(ua)) os = 'ios';
    else if (/linux/.test(ua)) os = 'linux';

    let browser = 'other';
    if (/edg\//.test(ua)) browser = 'edge';
    else if (/chrome\//.test(ua) && !/edg\//.test(ua)) browser = 'chrome';
    else if (/safari\//.test(ua) && !/chrome\//.test(ua)) browser = 'safari';
    else if (/firefox\//.test(ua)) browser = 'firefox';

    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      os,
      browser
    };
  }

  function getTechSignals() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return {
        userAgent: navigator.userAgent || '',
        device: getDeviceInfo(),
        lang: navigator.language || navigator.userLanguage || '',
        languages: navigator.languages || [],
        timezone: tz || '',
        tzOffset: new Date().getTimezoneOffset(),
        referrer: document.referrer || '',
        landing_url: window.location.href,
        page_title: document.title || '',
        platform: navigator.platform || '',
        screen: { w: screen && screen.width || 0, h: screen && screen.height || 0, dpr: window.devicePixelRatio || 1 },
        viewport: { w: window.innerWidth || 0, h: window.innerHeight || 0 },
        touch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
        cookiesEnabled: navigator.cookieEnabled === true,
        local_time: new Date().toString()
      };
    } catch (_) { return {}; }
  }

  function safeReadLS() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch(_) {}
    return null;
  }

  function safeWriteLS(obj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch(_) {}
  }

  function migrateFromSessionStorage() {
    try {
      const s = sessionStorage.getItem(STORAGE_KEY);
      if (!s) return;
      const cur = safeReadLS() || {};
      const merged = deepMerge(cur, JSON.parse(s));
      safeWriteLS(merged);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch(_) {}
  }

  function deepMerge(target, source) {
    if (!source) return target || {};
    const out = Array.isArray(target) ? [...target] : { ...(target || {}) };
    for (const [k, v] of Object.entries(source)) {
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        out[k] = deepMerge(out[k], v);
      } else {
        out[k] = v;
      }
    }
    return out;
  }

  function flatten(obj, prefix = '', out = {}) {
    if (!obj || typeof obj !== 'object') return out;
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}_${k}` : k;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        flatten(v, key, out);
      } else {
        out[key] = Array.isArray(v) ? v.join(',') : v;
      }
    }
    return out;
  }

  function ensure(val, fallback) {
    return (val === undefined || val === null) ? fallback : val;
  }

  function buildInitialContext(role) {
    const query = parseQuery();
    const utm = pick(query, UTM_PARAMS);
    const click = pick(query, CLICK_PARAMS);
    const tech = getTechSignals();

    const existing = safeReadLS();

    const base = existing || {
      version: 1,
      session_id: uuid(),
      created_at: nowIso(),
      first_referrer: tech.referrer,
      first_landing_url: tech.landing_url,
      first_params: query,
      chat_log: [],
      answers: {},
      scoring: {}
    };

    const updated = deepMerge(base, {
      updated_at: nowIso(),
      role_last: role || base.role_last || 'landing',
      query,
      utm,
      click,
      tech,
      last_referrer: tech.referrer,
      last_landing_url: tech.landing_url,
      last_params: query,
    });

    // external_id fallback to session_id if absent
    if (!updated.click.external_id) {
      updated.click.external_id = updated.session_id;
    }

    return updated;
  }

  function persistUpdate(partial) {
    const current = safeReadLS() || buildInitialContext();
    const merged = deepMerge(current, partial || {});
    merged.updated_at = nowIso();
    safeWriteLS(merged);
    return merged;
  }

  function addHiddenInput(form, name, value) {
    try {
      let input = form.querySelector(`[name="${name}"]`);
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.appendChild(input);
      }
      input.value = value == null ? '' : String(value);
    } catch(_) {}
  }

  function attachForms(options) {
    try {
      const cfg = options || {};
      const lead = safeReadLS();
      if (!lead) return;

      const forms = Array.from(document.forms || []);
      const flat = flatten({
        utm: lead.utm,
        click: lead.click,
        tech: {
          lang: lead.tech?.lang,
          timezone: lead.tech?.timezone,
          referrer: lead.tech?.referrer,
          device_type: lead.tech?.device?.type,
          device_os: lead.tech?.device?.os,
          device_browser: lead.tech?.device?.browser
        },
        answers: lead.answers,
        scoring: lead.scoring,
      });

      const topLevel = {
        utm_source: lead.utm?.utm_source,
        utm_medium: lead.utm?.utm_medium,
        utm_campaign: lead.utm?.utm_campaign,
        utm_term: lead.utm?.utm_term,
        utm_content: lead.utm?.utm_content,
        campaign_id: lead.click?.campaign_id || lead.query?.campaign_id || lead.query?.campaign,
        external_id: lead.click?.external_id || lead.session_id,
        affc: lead.click?.affc,
        clickid: lead.click?.clickid,
        fbclid: lead.click?.fbclid,
        gclid: lead.click?.gclid,
        yclid: lead.query?.yclid,
        ttclid: lead.click?.ttclid,
        msclkid: lead.click?.msclkid,
        ad_id: lead.click?.ad_id || lead.click?.adid,
        adset_id: lead.click?.adset_id,
        creative_id: lead.click?.creative_id,
        // Affiliate subs (common patterns)
        aff_sub1: lead.query?.aff_sub1,
        aff_sub2: lead.query?.aff_sub2,
        aff_sub3: lead.query?.aff_sub3,
        aff_sub4: lead.query?.aff_sub4,
        aff_sub5: lead.query?.aff_sub5,
        // Geo if provided via click params
        country: lead.query?.country,
        region: lead.query?.region,
        city: lead.query?.city,
        ip: lead.query?.ip,
      };

      const jsonStr = JSON.stringify(lead);

      forms.forEach((form) => {
        // Full JSON for debugging/backups
        addHiddenInput(form, 'lead_ctx_json', jsonStr);
        // Prefixed fields (lead_*)
        Object.entries(flat).forEach(([k, v]) => addHiddenInput(form, `lead_${k}`, v));
        // Common Keitaro-compatible fields
        Object.entries(topLevel).forEach(([k, v]) => {
          if (v != null && v !== '') addHiddenInput(form, k, v);
        });

        // Convenience extra fields
        addHiddenInput(form, 'lang', lead.tech?.lang || '');
        addHiddenInput(form, 'timezone', lead.tech?.timezone || '');
      });
    } catch(_) {}
  }

  function getOfferUrl(defaultUrl) {
    try {
      const q = parseQuery();
      return q.offer || defaultUrl || 'demo/index.html';
    } catch(_) { return defaultUrl || 'demo/index.html'; }
  }

  function maybeAppendOfferCTA(containerEl) {
    try {
      if (window.__offerCtaAppended) return;
      const lead = safeReadLS();
      if (!isLeadReady(lead)) return; // not ready yet
      const container = containerEl || document.body;
      const url = getOfferUrl();
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'margin: 16px 0; text-align: center;';
      const a = document.createElement('a');
      a.href = url;
      a.textContent = 'Почати заробляти';
      a.style.cssText = 'display:inline-block;background:#007AFF;color:#fff;padding:12px 20px;border-radius:10px;font-weight:600;text-decoration:none;box-shadow:0 4px 10px rgba(0,0,0,.12)';
      a.setAttribute('rel', 'nofollow noopener');
      wrapper.appendChild(a);
      container.appendChild(wrapper);
      window.__offerCtaAppended = true;
    } catch(_) {}
  }

  function isLeadReady(lead) {
    try {
      lead = lead || safeReadLS() || {};
      const scoring = lead.scoring || {};
      const readinessScore = Number(scoring.readiness_score || scoring.readinessScore || 0);
      const explicitReady = scoring.ready === true || scoring.is_ready === true;
      const investPotential = Number(scoring.investment_potential || lead.answers?.investment_potential || 0);
      const chatLogLen = Array.isArray(lead.chat_log) ? lead.chat_log.length : 0;
      // Heuristics: explicit flag OR high readiness score OR (some investment potential & engaged in chat)
      if (explicitReady) return true;
      if (readinessScore >= 70) return true;
      if (investPotential > 0 && chatLogLen >= 2) return true;
      return false;
    } catch(_) { return false; }
  }

  function setInvestmentPotential(value) {
    try {
      const vNum = (value == null || value === '') ? null : Number(value);
      if (vNum != null && !isNaN(vNum)) {
        persistUpdate({
          answers: { investment_potential: vNum },
          scoring: { investment_potential: vNum }
        });
      } else {
        persistUpdate({ answers: { investment_potential: value } });
      }
    } catch(_) {}
  }

  function markReady(optionalScore) {
    const patch = { scoring: { ready: true } };
    if (optionalScore != null && !isNaN(Number(optionalScore))) {
      patch.scoring.readiness_score = Number(optionalScore);
    }
    persistUpdate(patch);
  }

  const API = {
    init(opts) {
      try {
        migrateFromSessionStorage();
        const role = (opts && opts.role) || 'landing';
        const initial = buildInitialContext(role);
        safeWriteLS(initial);

        if (opts && (opts.autoAttachForms || role === 'offer')) {
          attachForms();
        }
      } catch(_) {}
    },
    get() { return safeReadLS() || {}; },
    update(partial) { return persistUpdate(partial); },
    addAnswer(name, value) {
      if (!name) return;
      persistUpdate({ answers: { [name]: value } });
    },
    addChatMessage(role, text) {
      try {
        const lead = safeReadLS() || buildInitialContext();
        const entry = { role, text: String(text || ''), ts: nowIso() };
        const chat_log = Array.isArray(lead.chat_log) ? lead.chat_log.concat(entry) : [entry];
        lead.chat_log = chat_log.slice(-200); // cap log size
        lead.updated_at = nowIso();
        safeWriteLS(lead);
      } catch(_) {}
    },
    setScore(s) {
      if (!s || typeof s !== 'object') return;
      persistUpdate({ scoring: s });
    },
    setInvestmentPotential,
    markReady,
    isReady: () => isLeadReady(),
    attachForms,
    getOfferUrl,
    maybeAppendOfferCTA,
  };

  try { window.LeadCtx = API; } catch(_) {}
})();
