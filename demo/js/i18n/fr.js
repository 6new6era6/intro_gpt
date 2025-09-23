// French (fr) translations
(function(){
  const fr = {
    common: {
      back: 'Retour',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Bienvenue dans la démo du<br> <span class="text-gradient">Bot de trading</span>',
      description: 'Ceci est une démonstration du fonctionnement d’un bot de trading automatisé. Aucun argent réel n’est utilisé et aucune opération réelle n’est effectuée.',
      learn_title: 'Vous apprendrez :',
      learn_points: {
        setup: 'Comment configurer un bot de trading',
        markets: 'Comment choisir les marchés et stratégies',
        monitor: 'Comment suivre les performances du bot',
        auto: 'Comment le bot exécute automatiquement des opérations'
      },
      tutorial_hint: 'Commençons par un court tutoriel expliquant le fonctionnement.',
      start_btn: 'Démarrer la démo'
    },
    header: {
      full_access: 'Obtenir un accès complet',
      balance_label: 'Solde DEMO actuel'
    },
    settings: {
      title: 'Paramètres de trading',
      deposit: 'Déposer',
      withdraw: 'Retirer',
      markets_intro: 'Choisissez les marchés sur lesquels vous souhaitez trader. Vous pouvez en sélectionner plusieurs.',
      markets_label: 'Sélectionner les marchés',
      forex_pairs: 'Paires',
      stocks: 'Actions',
      crypto: 'Crypto',
      crypto_desc: 'Monnaies numériques',
      commodities: 'Matières premières',
      commodities_desc: 'Or, pétrole, métaux',
      strategy_intro: 'Choisissez votre stratégie. Cela influe sur la gestion des fonds.',
      strategy_label: 'Stratégie de trading',
      strategy_conservative: 'Conservatrice',
      strategy_balanced: 'Équilibrée',
      strategy_aggressive: 'Agressive',
      start_bot: 'Lancer le bot',
      bot_running: 'Bot en cours',
      pause: 'Pause',
      resume: 'Reprendre',
      bot_running_button: 'Bot en fonctionnement...'
    },
    chart: {
      title: 'Graphique du solde',
      no_balance_title: 'Vous devez déposer des fonds pour commencer',
      no_balance_desc: 'Cliquez sur « Déposer » pour ajouter des fonds',
      no_balance_btn: 'Déposer maintenant',
      start_hint_title: 'Lancez le bot pour voir le graphique en direct',
      start_hint_desc: 'Définissez vos préférences et cliquez sur « Lancer le bot »',
      total_balance: 'Solde total',
      profit: 'Profit :',
      tooltip_balance: 'Solde : $ {value}',
      annotation_initial: 'Dépôt initial'
    },
    stats: {
      intro: 'Les statistiques montrent vos performances : nombre d’opérations, taux de réussite et profits.',
      total_trades: 'Opérations totales',
      winrate: 'Taux de réussite',
      profit_today: 'Profit aujourd’hui',
      total_profit: 'Profit total'
    },
    history: {
      intro: 'Le tableau affiche vos opérations récentes avec leurs détails.',
      title: 'Opérations récentes',
      time: 'Heure',
      asset: 'Actif',
      type: 'Type',
      entry: 'Entrée',
      exit: 'Sortie',
      amount: 'Montant',
      pnl: 'PnL',
      empty: 'Aucune opération pour le moment. Lancez le bot pour voir de l’activité.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Démo du bot de trading.',
      simulation: 'Ceci est une simulation à des fins de démonstration uniquement.',
      no_real: 'Aucun argent réel n’est utilisé et aucune opération réelle n’est effectuée.',
      terms: 'Conditions d’utilisation',
      privacy: 'Politique de confidentialité',
      cookies: 'Politique de cookies',
      risk: 'Avertissement sur les risques',
      terms_full: 'Termes et conditions'
    },
    modals: {
      deposit_title: 'Déposer des fonds [Démo]',
      deposit_hint: 'Choisissez le montant à déposer sur votre compte.',
      deposit_amount: 'Montant du dépôt (250 - $ 50 000)',
      deposit_confirm: 'Confirmer le dépôt',
      withdraw_title: 'Retirer des fonds',
      withdraw_hint: 'Choisissez le montant et la méthode de retrait.',
      withdraw_amount: 'Montant à retirer',
      withdraw_available: 'Disponible :',
      withdraw_method: 'Méthode de retrait',
      paypal_email: 'Email PayPal',
      iban_number: 'Numéro IBAN',
      bank_name: 'Nom de la banque',
      bank_placeholder: 'Nom de la banque...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Confirmer le retrait'
    },
    notifications: {
      timeframe_changed: 'Unité de temps changée en {tf}',
      deposit_success: 'Dépôt de $ {amount} effectué avec succès',
      withdraw_success: 'Retrait de $ {amount} effectué avec succès'
    },
    tutorial: {
      step1: 'Bienvenue dans la démo du bot de trading ! Voici votre tableau de bord pour suivre l’activité et les performances.',
      step2: 'Ici, vous configurez le bot : dépôt, marchés et stratégie.',
      step3: 'Commencez par déposer des fonds. Déposons 250.',
      step4: 'Choisissez les marchés sur lesquels vous voulez trader. Plusieurs choix possibles.',
      step5: 'Choisissez la stratégie. Cela influe sur la gestion du capital.',
      step6: 'Cliquez sur ce bouton pour lancer le bot. Il exécutera des opérations selon vos réglages.',
      step7: 'Voici le graphique en direct : croissance du solde et activité du bot.',
      step8: 'Ici, vous verrez les notifications en direct sur les opérations.',
      step9: 'Ces statistiques montrent vos performances : opérations, taux de réussite et profits.',
      step10:'Ce tableau montre vos opérations les plus récentes avec leurs détails.'
    },
    chat: {
      full_access: 'Obtenir un accès complet',
      first_name: 'Prénom',
      last_name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      start_now: 'Commencer maintenant'
    },
    forms: {
      ready_title: 'Prêt à <span class="text-gradient">commencer ?</span>',
      ready_desc: 'Remplissez le formulaire ci-dessous et commencez à changer votre vie financière dès aujourd’hui.',
      first_name: 'Prénom',
      last_name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      start: 'Commencer',
      accept_html: 'En vous inscrivant, vous acceptez nos <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Conditions d’utilisation</a> et notre <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Politique de confidentialité</a>.'
    },
    liveTrades: {
      none: 'Il n’y a aucune opération active pour le moment.',
      sell_badge: 'VENTE',
      gain: 'Gain',
      price: 'Prix : $ {value}'
    },
    countdown: {
      remaining: 'Temps restant :'
    },
    trade: {
      buy: 'ACHAT',
      sell: 'VENTE'
    }
  };

  if (window.i18n) {
    window.i18n.register('fr', fr);
  } else {
    window.__frDict = fr;
  }
})();
