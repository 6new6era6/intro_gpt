// English (en) translations
(function(){
  const en = {
    common: {
      back: 'Back',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Welcome to the demo of<br> <span class="text-gradient">the Trading Bot</span>',
      description: 'This is a demonstration showing how an automated trading bot works. No real money is used and no real trades are executed.',
      learn_title: 'You will learn:',
      learn_points: {
        setup: 'How to set up a trading bot',
        markets: 'How to choose markets and strategies',
        monitor: 'How to monitor the bot’s performance',
        auto: 'How the bot executes trades automatically'
      },
      tutorial_hint: 'Let’s start with a short tutorial that shows how everything works.',
      start_btn: 'Start demo'
    },
    header: {
      full_access: 'Get full access',
      balance_label: 'Current DEMO balance'
    },
    settings: {
      title: 'Trading settings',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      markets_intro: 'Choose markets you want to trade. You can select multiple.',
      markets_label: 'Select markets',
      forex_pairs: 'Pairs',
      stocks: 'Stocks',
      crypto: 'Crypto',
      crypto_desc: 'Digital currencies',
      commodities: 'Commodities',
      commodities_desc: 'Gold, Oil, Metals',
      strategy_intro: 'Choose your trading strategy. This affects how the bot manages your funds.',
      strategy_label: 'Trading strategy',
      strategy_conservative: 'Conservative',
      strategy_balanced: 'Balanced',
      strategy_aggressive: 'Aggressive',
      start_bot: 'Start trading bot',
      bot_running: 'Bot running',
      pause: 'Pause',
      resume: 'Resume',
      bot_running_button: 'Bot running...'
    },
    chart: {
      title: 'Balance chart',
      no_balance_title: 'You need to deposit funds to start',
      no_balance_desc: 'Click the “Deposit” button to add funds',
      no_balance_btn: 'Deposit now',
      start_hint_title: 'Start the trading bot to see the live chart',
      start_hint_desc: 'Set your preferences and click “Start trading bot”',
      total_balance: 'Total balance',
      profit: 'Profit:',
      tooltip_balance: 'Balance: $ {value}',
      annotation_initial: 'Initial deposit'
    },
    stats: {
      intro: 'Statistics show your trading performance, including total trades, win rate and profits.',
      total_trades: 'Total trades',
      winrate: 'Win rate',
      profit_today: 'Profit today',
      total_profit: 'Total profit'
    },
    history: {
      intro: 'The table shows your recent trades with details for each transaction.',
      title: 'Latest trades',
      time: 'Time',
      asset: 'Asset',
      type: 'Type',
      entry: 'Entry',
      exit: 'Exit',
      amount: 'Amount',
      pnl: 'PnL',
      empty: 'No trades yet. Start the trading bot to see activity.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Trading Bot Demo.',
      simulation: 'This is a simulation for demonstration purposes only.',
      no_real: 'No real money is used and no real trades are executed.',
      terms: 'Terms of use',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      risk: 'Risk Warning',
      terms_full: 'Terms and Conditions'
    },
    modals: {
      deposit_title: 'Deposit funds [Demo]',
      deposit_hint: 'Choose the amount you want to deposit to your trading account.',
      deposit_amount: 'Deposit amount (250 - $ 50,000)',
      deposit_confirm: 'Confirm deposit',
      withdraw_title: 'Withdraw funds',
      withdraw_hint: 'Choose the amount and method to withdraw from your trading account.',
      withdraw_amount: 'Withdrawal amount',
      withdraw_available: 'Available:',
      withdraw_method: 'Withdrawal method',
      paypal_email: 'PayPal email',
      iban_number: 'IBAN number',
      bank_name: 'Bank name',
      bank_placeholder: 'Bank name...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Confirm withdrawal'
    },
    notifications: {
      timeframe_changed: 'Timeframe changed to {tf}',
      deposit_success: 'Deposit of $ {amount} completed successfully',
      withdraw_success: 'Withdrawal of $ {amount} completed successfully'
    },
    tutorial: {
      step1: 'Welcome to the trading bot demo! This is your dashboard where you can monitor your trading activity and performance.',
      step2: 'Here you can configure your trading bot settings, including deposit, markets and strategy.',
      step3: 'First, you need to deposit funds to start trading. Let’s deposit 250 to begin.',
      step4: 'Choose the markets you want to trade. You can select multiple markets.',
      step5: 'Choose your trading strategy. This affects how the bot manages your capital.',
      step6: 'Click this button to start the trading bot. It will start executing trades according to your settings.',
      step7: 'This is the live trading chart, where you can track your balance growth and bot activity.',
      step8: 'Here you see live notifications about current trades as they happen.',
      step9: 'These statistics show your trading performance, including number of trades, win rate and profits.',
      step10:'This table shows your most recent trades with details for each transaction.'
    },
    chat: {
      full_access: 'Get full access',
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email address',
      phone: 'Phone',
      start_now: 'Start now'
    },
    forms: {
      ready_title: 'Ready to <span class="text-gradient">start?</span>',
      ready_desc: 'Fill out the form below and start changing your financial life today.',
      first_name: 'First name',
      last_name: 'Last name',
      email: 'Email address',
      phone: 'Phone',
      start: 'Start now',
      accept_html: 'By registering, you accept our <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Terms of Use</a> and <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Privacy Policy</a>.'
    },
    liveTrades: {
      none: 'There are no active trades at the moment.',
      sell_badge: 'SELL',
      gain: 'Profit',
      price: 'Price: $ {value}'
    },
    countdown: {
      remaining: 'Time remaining:'
    },
    trade: {
      buy: 'BUY',
      sell: 'SELL'
    }
  };

  if (window.i18n) {
    window.i18n.register('en', en);
  } else {
    window.__enDict = en;
  }
})();