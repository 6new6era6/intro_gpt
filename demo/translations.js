;(function(){
  // Define a single global TRANSLATIONS
  window.TRANSLATIONS = {
    en: {
      'header.title': 'Micronyx AI | Trading Bot Demo',
      'button.getFullAccess': 'Get Full Access',
      'form.depositLabel': 'Deposit amount (250 -  50,000$)',
      'ui.currentDemoBalance': 'Current DEMO Balance',
      'ui.demo': 'DEMO',
      'ui.markets.select': 'Select markets',
      'ui.market.forex': 'Forex',
      'ui.market.pairs': 'Pairs',
      'ui.market.stocks': 'Stocks',
      'ui.market.crypto': 'Crypto',
      'ui.market.cryptoDesc': 'Digital currencies',
      'ui.market.commodities': 'Commodities',
      'ui.market.commoditiesDesc': 'Gold, Oil, Metals',
      'ui.strategy': 'Trading Strategy',
      'ui.startBot': 'Start Trading Bot',
      'ui.botRunning': 'Bot running',
      'ui.pause': 'Pause',
      'ui.totalTrades': 'Total Trades',
      'ui.winRate': 'Win Rate',
      'ui.profitToday': 'Profit today',
      'ui.totalProfit': 'Total Profit',
      'ui.noTrades': 'No trades yet. Start the trading bot to see activity.',
      'ui.depositConfirm': 'Confirm deposit',
      'ui.withdrawConfirm': 'Confirm withdrawal',
      'ui.withdrawMethod': 'Withdrawal method',
      'ui.withdrawAmount': 'Withdrawal amount',
      'chart.balance': 'Balance',
      'chart.tooltip.balance': 'Balance: {{amount}}',
      'legal.terms': 'Terms of Use',
      'legal.privacy': 'Privacy Policy',
      'legal.cookies': 'Cookie Policy',
      'legal.risk': 'Risk Warning'
      , 'toast.depositSuccess': 'Deposit of {{amount}} completed successfully'
      , 'toast.withdrawSuccess': 'Withdrawal of {{amount}} completed successfully'
      , 'ui.recentTrades': 'Recent Trades'
      , 'table.time': 'Time'
      , 'table.asset': 'Asset'
      , 'table.type': 'Type'
      , 'table.entry': 'Entry'
      , 'table.exit': 'Exit'
      , 'table.amount': 'Amount'
      , 'table.pnl': 'P/L'
    },
    ru: {
      'header.title': 'Micronyx AI | Демо торгового бота',
      'button.getFullAccess': 'Получить полный доступ',
      'form.depositLabel': 'Сумма депозита (250 -  50 000$)',
      'ui.currentDemoBalance': 'Текущий ДЕМО баланс',
      'ui.demo': 'ДЕМО',
      'ui.markets.select': 'Выбор рынков',
      'ui.market.forex': 'Форекс',
      'ui.market.pairs': 'Пары',
      'ui.market.stocks': 'Акции',
      'ui.market.crypto': 'Крипто',
      'ui.market.cryptoDesc': 'Цифровые валюты',
      'ui.market.commodities': 'Сырьё',
      'ui.market.commoditiesDesc': 'Золото, нефть, металлы',
      'ui.strategy': 'Торговая стратегия',
      'ui.startBot': 'Запустить торгового бота',
      'ui.botRunning': 'Бот работает',
      'ui.pause': 'Пауза',
      'ui.totalTrades': 'Всего сделок',
      'ui.winRate': 'Процент успеха',
      'ui.profitToday': 'Прибыль сегодня',
      'ui.totalProfit': 'Итоговая прибыль',
      'ui.noTrades': 'Пока нет сделок. Запустите бота, чтобы увидеть активность.',
      'ui.depositConfirm': 'Подтвердить депозит',
      'ui.withdrawConfirm': 'Подтвердить вывод',
      'ui.withdrawMethod': 'Метод вывода',
      'ui.withdrawAmount': 'Сумма вывода',
      'chart.balance': 'Баланс',
      'chart.tooltip.balance': 'Баланс: {{amount}}',
      'legal.terms': 'Условия использования',
      'legal.privacy': 'Политика конфиденциальности',
      'legal.cookies': 'Политика использования файлов cookie',
      'legal.risk': 'Предупреждение о рисках'
      , 'toast.depositSuccess': 'Депозит на сумму {{amount}} успешно выполнен'
      , 'toast.withdrawSuccess': 'Вывод на сумму {{amount}} успешно выполнен'
      , 'ui.recentTrades': 'Последние сделки'
      , 'table.time': 'Время'
      , 'table.asset': 'Актив'
      , 'table.type': 'Тип'
      , 'table.entry': 'Вход'
      , 'table.exit': 'Выход'
      , 'table.amount': 'Сумма'
      , 'table.pnl': 'Прибыль/Убыток'
    },
    de: {
      'header.title': 'Micronyx AI | Trading-Bot Demo',
      'button.getFullAccess': 'Vollen Zugang erhalten',
      'form.depositLabel': 'Einzahlbetrag (250 - 50.000$)',
      'ui.currentDemoBalance': 'Aktueller DEMO-Saldo',
      'ui.demo': 'DEMO',
      'ui.markets.select': 'Märkte auswählen',
      'ui.market.forex': 'Forex',
      'ui.market.pairs': 'Paare',
      'ui.market.stocks': 'Aktien',
      'ui.market.crypto': 'Krypto',
      'ui.market.cryptoDesc': 'Digitale Währungen',
      'ui.market.commodities': 'Rohstoffe',
      'ui.market.commoditiesDesc': 'Gold, Öl, Metalle',
      'ui.strategy': 'Trading-Strategie',
      'ui.startBot': 'Trading-Bot starten',
      'ui.botRunning': 'Bot läuft',
      'ui.pause': 'Pause',
      'ui.totalTrades': 'Total Trade',
      'ui.winRate': 'Erfolgsquote',
      'ui.profitToday': 'Profit hüt',
      'ui.totalProfit': 'Total Profit',
      'ui.noTrades': 'Es sind no kei Trades vorhanden. Starte dä Trading-Bot für Aktivität z’zeige.',
      'ui.depositConfirm': 'Einzahlung bestätige',
      'ui.withdrawConfirm': 'Abhebe bestätige',
      'ui.withdrawMethod': 'Abhebemethode',
      'ui.withdrawAmount': 'Abhebebetrag',
      'chart.balance': 'Kontostand',
      'chart.tooltip.balance': 'Kontostand: {{amount}}',
      'legal.terms': 'Nutzungsbedingungen',
      'legal.privacy': 'Datenschutzrichtlinie',
      'legal.cookies': 'Cookie-Richtlinie',
      'legal.risk': 'Risikohinweis'
      , 'toast.depositSuccess': 'Einzahlung von {{amount}} erfolgreich durchgeführt'
      , 'toast.withdrawSuccess': 'Auszahlung von {{amount}} erfolgreich durchgeführt'
      , 'ui.recentTrades': 'Letzte Trades'
      , 'table.time': 'Zeit'
      , 'table.asset': 'Asset'
      , 'table.type': 'Typ'
      , 'table.entry': 'Eingang'
      , 'table.exit': 'Ausgang'
      , 'table.amount': 'Betrag'
      , 'table.pnl': 'Gewinn/Verlust'
    }
  };
})();


