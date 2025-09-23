// Ukrainian (uk) translations
(function(){
  const uk = {
    common: {
      back: 'Назад',
      demo: 'ДЕМО',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Ласкаво просимо до демо<br> <span class="text-gradient">Трейдинг-бота</span>',
      description: 'Це демонстрація роботи автоматизованого трейдинг-бота. Реальні гроші не використовуються і реальні угоди не виконуються.',
      learn_title: 'Ви дізнаєтесь:',
      learn_points: {
        setup: 'Як налаштувати трейдинг-бота',
        markets: 'Як обирати ринки та стратегії',
        monitor: 'Як відстежувати ефективність бота',
        auto: 'Як бот автоматично виконує угоди'
      },
      tutorial_hint: 'Почнемо з короткого туторіалу, який покаже, як усе працює.',
      start_btn: 'Почати демо'
    },
    header: {
      full_access: 'Отримати повний доступ',
      balance_label: 'Поточний ДЕМО баланс'
    },
    settings: {
      title: 'Налаштування трейдингу',
      deposit: 'Поповнити',
      withdraw: 'Вивести',
      markets_intro: 'Оберіть ринки для торгівлі. Можна обрати кілька.',
      markets_label: 'Вибір ринків',
      forex_pairs: 'Пари',
      stocks: 'Акції',
      crypto: 'Крипто',
      crypto_desc: 'Цифрові валюти',
      commodities: 'Сировина',
      commodities_desc: 'Золото, Нафта, Метали',
      strategy_intro: 'Оберіть торгову стратегію. Вона визначає як бот керує коштами.',
      strategy_label: 'Торгова стратегія',
      strategy_conservative: 'Консервативна',
      strategy_balanced: 'Збалансована',
      strategy_aggressive: 'Агресивна',
      start_bot: 'Запустити бота',
      bot_running: 'Бот працює',
      pause: 'Пауза',
      resume: 'Продовжити',
      bot_running_button: 'Бот працює...'
    },
    chart: {
      title: 'Графік балансу',
      no_balance_title: 'Щоб почати, поповніть баланс',
      no_balance_desc: 'Натисніть «Поповнити», щоб додати кошти',
      no_balance_btn: 'Поповнити зараз',
      start_hint_title: 'Запустіть бота, щоб побачити живий графік',
      start_hint_desc: 'Задайте налаштування та натисніть «Запустити бота»',
      total_balance: 'Загальний баланс',
      profit: 'Профіт:',
      tooltip_balance: 'Баланс: $ {value}',
      annotation_initial: 'Початкове поповнення'
    },
    stats: {
      intro: 'Статистика показує вашу ефективність: кількість угод, винрейт та прибуток.',
      total_trades: 'Всього угод',
      winrate: 'Виграшність',
      profit_today: 'Профіт сьогодні',
      total_profit: 'Загальний профіт'
    },
    history: {
      intro: 'Таблиця показує останні угоди з деталями по кожній.',
      title: 'Останні угоди',
      time: 'Час',
      asset: 'Актив',
      type: 'Тип',
      entry: 'Вхід',
      exit: 'Вихід',
      amount: 'Сума',
      pnl: 'PnL',
      empty: 'Поки що немає угод. Запустіть бота, щоб побачити активність.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Демо Трейдинг-бота.',
      simulation: 'Це симуляція лише для демонстрації.',
      no_real: 'Реальні гроші не використовуються, реальні угоди не виконуються.',
      terms: 'Умови використання',
      privacy: 'Політика конфіденційності',
      cookies: 'Політика Cookies',
      risk: 'Попередження про ризики',
      terms_full: 'Правила та умови'
    },
    modals: {
      deposit_title: 'Поповнити баланс [Демо]',
      deposit_hint: 'Оберіть суму для поповнення вашого торгового рахунку.',
      deposit_amount: 'Сума поповнення (250 - $ 50 000)',
      deposit_confirm: 'Підтвердити поповнення',
      withdraw_title: 'Виведення коштів',
      withdraw_hint: 'Оберіть суму та метод виведення з торгового рахунку.',
      withdraw_amount: 'Сума виведення',
      withdraw_available: 'Доступно:',
      withdraw_method: 'Метод виведення',
      paypal_email: 'Email PayPal',
      iban_number: 'Номер IBAN',
      bank_name: 'Назва банку',
      bank_placeholder: 'Назва банку...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Підтвердити виведення'
    },
    notifications: {
      timeframe_changed: 'Таймфрейм змінено на {tf}',
      deposit_success: 'Поповнення на $ {amount} виконано успішно',
      withdraw_success: 'Виведення на $ {amount} виконано успішно'
    },
    tutorial: {
      step1: 'Вітаємо у демо трейдинг-бота! Це ваша панель, де можна відстежувати активність і результати.',
      step2: 'Тут ви налаштовуєте бота: поповнення, ринки та стратегію.',
      step3: 'Спочатку поповнімо баланс. Почнемо з 250.',
      step4: 'Оберіть ринки для торгівлі. Можна обрати декілька.',
      step5: 'Оберіть торгову стратегію — вона впливає на керування капіталом.',
      step6: 'Натисніть, щоб запустити бота. Він почне виконувати угоди за вашими налаштуваннями.',
      step7: 'Тут живий графік, де видно зростання балансу та активність бота.',
      step8: 'Тут будуть живі сповіщення про угоди.',
      step9: 'Ці показники відображають ефективність: кількість угод, винрейт, прибуток.',
      step10: 'У таблиці — останні угоди з деталями.'
    },
    chat: {
      full_access: 'Отримати повний доступ',
      first_name: 'Ім’я',
      last_name: 'Прізвище',
      email: 'Електронна пошта',
      phone: 'Телефон',
      start_now: 'Почати зараз'
    },
    forms: {
      ready_title: 'Готові <span class="text-gradient">почати?</span>',
      ready_desc: 'Заповніть форму нижче й почніть змінювати своє фінансове життя вже сьогодні.',
      first_name: 'Ім’я',
      last_name: 'Прізвище',
      email: 'Електронна пошта',
      phone: 'Телефон',
      start: 'Почати',
      accept_html: 'Реєструючись, ви приймаєте наші <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-500 hover:underline">Умови використання</a> та <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-500 hover:underline">Політику конфіденційності</a>.'
    },
    liveTrades: {
      none: 'Наразі немає активних угод.',
      sell_badge: 'SELL',
      gain: 'Профіт',
      price: 'Ціна: $ {value}'
    },
    countdown: {
      remaining: 'Залишилось часу:'
    },
    trade: {
      buy: 'BUY',
      sell: 'SELL'
    }
  };

  if (window.i18n) {
    window.i18n.register('uk', uk);
  } else {
    window.__ukDict = uk;
  }
})();
