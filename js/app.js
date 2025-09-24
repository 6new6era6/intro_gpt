// Simple bootstrap example for LeadCtx usage (optional)
// This file is empty previously; ensure not to break existing pages.
(function(){
  if (!window.LeadCtx) return;
  try {
    // Initialize if not yet
    if(!window.__leadCtxInited){
      window.LeadCtx.init({ role: 'landing' });
      window.__leadCtxInited = true;
    }
    // Expose helper in console
    window.__demoSetInvestPotential = function(v){
      window.LeadCtx.setInvestmentPotential(v);
      console.log('Set investment_potential', v, window.LeadCtx.get());
      // Try append CTA (will only show when ready)
      window.LeadCtx.maybeAppendOfferCTA();
    };
    window.__demoMarkReady = function(score){
      window.LeadCtx.markReady(score);
      window.LeadCtx.maybeAppendOfferCTA();
      console.log('Marked ready', window.LeadCtx.get());
    };
  } catch(e){/* swallow */}
})();