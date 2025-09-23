// German (de) translations
(function(){
  const de = {
    common: {
      back: 'Zurück',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Willkommen zur Demo des<br> <span class="text-gradient">Trading-Bots</span>',
      description: 'Dies ist eine Demonstration, die zeigt, wie ein automatisierter Trading-Bot funktioniert. Es wird kein echtes Geld verwendet und keine echten Trades ausgeführt.',
      learn_title: 'Das wirst du lernen:',
      learn_points: {
        setup: 'Wie man einen Trading-Bot einrichtet',
        markets: 'Wie man Märkte und Strategien auswählt',
        monitor: 'Wie man die Leistung des Bots überwacht',
        auto: 'Wie der Bot automatisch Trades ausführt'
      },
      tutorial_hint: 'Los geht’s mit einem kurzen Tutorial, das dir zeigt, wie alles funktioniert.',
      start_btn: 'Demo starten'
    },
    header: {
      full_access: 'Vollzugriff erhalten',
      balance_label: 'Aktueller DEMO-Saldo'
    },
    settings: {
      title: 'Trading-Einstellungen',
      deposit: 'Einzahlen',
      withdraw: 'Auszahlen',
      markets_intro: 'Wähle die Märkte aus, auf denen du handeln möchtest. Du kannst mehrere auswählen.',
      markets_label: 'Märkte auswählen',
      forex_pairs: 'Paare',
      stocks: 'Aktien',
      crypto: 'Krypto',
      crypto_desc: 'Digitale Währungen',
      commodities: 'Rohstoffe',
      commodities_desc: 'Gold, Öl, Metalle',
      strategy_intro: 'Wähle deine Trading-Strategie. Diese beeinflusst, wie der Bot deine Gelder verwaltet.',
      strategy_label: 'Trading-Strategie',
      strategy_conservative: 'Konservativ',
      strategy_balanced: 'Ausgewogen',
      strategy_aggressive: 'Aggressiv',
      start_bot: 'Trading-Bot starten',
      bot_running: 'Bot läuft',
      pause: 'Pause',
      resume: 'Fortsetzen',
      bot_running_button: 'Bot läuft...'
    },
    chart: {
      title: 'Kontostandsdiagramm',
      no_balance_title: 'Du muesch erscht Fondse iialah zum starte',
      no_balance_desc: 'Drück uf dr “Iialah”-Knopf zum Fondse iizahle',
      no_balance_btn: 'Jetzt iialah',
      start_hint_title: 'Starte dr Trading-Bot zum Live-Chart z’luege',
      start_hint_desc: 'Stell dini Präferenze i und drück uf “Trading-Bot starte”',
      total_balance: 'Total Saldo',
      profit: 'Profit:',
      tooltip_balance: 'Kontostand: $ {value}',
      annotation_initial: 'Anfängliche Einzahlung'
    },
    stats: {
      intro: 'Die Statistik zeigt dini Trading-Performance, inklusive total Trade, Erfolgsquote und Gewinne.',
      total_trades: 'Total Trade',
      winrate: 'Erfolgsquote',
      profit_today: 'Profit hüt',
      total_profit: 'Total Profit'
    },
    history: {
      intro: 'Die Tabelle zeigt dini neuste Trades mit Detail zu jeder Transaktion.',
      title: 'Letzti Trades',
      time: 'Ziit',
      asset: 'Asset',
      type: 'Typ',
      entry: 'Eingang',
      exit: 'Ausgang',
      amount: 'Wert',
      pnl: 'Gewinn/Verlust',
      empty: 'Es sind no kei Trades vorhanden. Starte dä Trading-Bot für Aktivität z’zeige.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Trading-Bot Demo.',
      simulation: 'Das ist e Simulation nur zu Demonstrationszwecken.',
      no_real: 'Es wird keis echtes Geld verwendet und kei echte Trades ausgeführt.',
      terms: 'Nutzungsbedingige',
      privacy: 'Datenschutzrichtlinie',
      cookies: 'Cookie-Richtlinie',
      risk: 'Risikohinweis',
      terms_full: 'Nutzungsbedingungen'
    },
    modals: {
      deposit_title: 'Guthabe einzahle [Demo]',
      deposit_hint: 'Wähl dä Betrag us, wo du uf din Trading-Account einzahle wotsch.',
      deposit_amount: 'Einzahlbetrag (250 - $ 50’000)',
      deposit_confirm: 'Einzahlung bestätige',
      withdraw_title: 'Guthabe abhebe',
      withdraw_hint: "Wähl dä Betrag und d'Methode zum Abhebe vo dim Trading-Konto us.",
      withdraw_amount: 'Abhebebetrag',
      withdraw_available: 'Verfügbar:',
      withdraw_method: 'Abhebemethode',
      paypal_email: 'PayPal E-Mail',
      iban_number: 'IBAN Nummer',
      bank_name: 'Bankname',
      bank_placeholder: 'Name vo dr Bank...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Abhebe bestätige'
    },
    notifications: {
      timeframe_changed: 'Zeitraum auf {tf} geändert',
      deposit_success: 'Einzahlung von $ {amount} erfolgreich durchgeführt',
      withdraw_success: 'Auszahlung von $ {amount} erfolgreich durchgeführt'
    },
    trade: {
      buy: 'KAUF',
      sell: 'VERKAUF'
    },
    tutorial: {
      step1: 'Willkommen zur Demo des Trading-Bots! Dies ist dein Dashboard, auf dem du deine Trading-Aktivitäten und Performance überwachen kannst.',
      step2: 'Hier kannst du die Einstellungen deines Trading-Bots konfigurieren, einschließlich Einzahlung, Märkte und Strategie.',
      step3: 'Zuerst musst du Guthaben einzahlen, um mit dem Trading zu starten. Lass uns 250 einzahlen, um zu beginnen.',
      step4: 'Wähle die Märkte aus, auf denen du handeln möchtest. Du kannst mehrere Märkte auswählen.',
      step5: 'Wähle deine Trading-Strategie. Das beeinflusst, wie der Bot dein Kapital verwaltet.',
      step6: 'Klicke auf diesen Button, um den Trading-Bot zu starten. Er beginnt mit der Ausführung von Trades entsprechend deiner Einstellungen.',
      step7: 'Dies ist das Live-Trading-Diagramm, in dem du das Wachstum deines Kontostands und die Bot-Aktivität verfolgen kannst.',
      step8: 'Hier siehst du Live-Benachrichtigungen zu aktuellen Trades, während sie stattfinden.',
      step9: 'Diese Statistiken zeigen deine Trading-Leistung, inklusive der Anzahl der Trades, Erfolgsrate und Gewinne.',
      step10:'Diese Tabelle zeigt deine jüngsten Trades mit Details zu jeder Transaktion.'
    },
    chat: {
      full_access: 'Vollständigen Zugang erhalten',
      first_name: 'Vorname',
      last_name: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon',
      start_now: 'Jetzt starten'
    },
    forms: {
      ready_title: 'Bereit zum <span class="text-gradient">Starten?</span>',
      ready_desc: 'Füllen Sie das folgende Formular aus und beginnen Sie noch heute, Ihr finanzielles Leben zu verändern.',
      first_name: 'Vorname',
      last_name: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon',
      start: 'Jetzt Starten',
      accept_html: 'Mit der Registrierung akzeptieren Sie unsere <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Nutzungsbedingungen</a> und die <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Datenschutzerklärung</a>.'
    },
    liveTrades: {
      none: 'Derzeit sind keine aktiven Trades vorhanden.',
      sell_badge: 'VENTA',
      gain: 'Ganancia',
      price: 'Preis: $ {value}'
    },
    countdown: {
      remaining: 'Verbleibende Zeit:'
    }
  };

  if (window.i18n) {
    window.i18n.register('de', de);
    window.i18n.setLocale('de');
  } else {
    window.__deDict = de;
  }
})();
