// Russian (ru) translations
(function(){
  const ru = {
    common: {
      back: 'Назад',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Добро пожаловать в демо<br> <span class="text-gradient">Трейдинг-бота</span>',
      description: 'Это демонстрация работы автоматизированного трейдинг-бота. Реальные деньги не используются и реальные сделки не выполняются.',
      learn_title: 'Вы узнаете:',
      learn_points: {
        setup: 'Как настроить трейдинг-бота',
        markets: 'Как выбирать рынки и стратегии',
        monitor: 'Как отслеживать эффективность бота',
        auto: 'Как бот автоматически совершает сделки'
      },
      tutorial_hint: 'Начнем с короткого руководства, которое покажет, как всё работает.',
      start_btn: 'Запустить демо'
    },
    header: {
      full_access: 'Получить полный доступ',
      balance_label: 'Текущий DEMO баланс'
    },
    settings: {
      title: 'Торговые настройки',
      deposit: 'Пополнить',
      withdraw: 'Вывести',
      markets_intro: 'Выберите рынки, на которых хотите торговать. Можно выбрать несколько.',
      markets_label: 'Выбор рынков',
      forex_pairs: 'Пары',
      stocks: 'Акции',
      crypto: 'Крипто',
      crypto_desc: 'Цифровые валюты',
      commodities: 'Сырьё',
      commodities_desc: 'Золото, нефть, металлы',
      strategy_intro: 'Выберите стратегию. Это влияет на то, как бот управляет средствами.',
      strategy_label: 'Торговая стратегия',
      strategy_conservative: 'Консервативная',
      strategy_balanced: 'Сбалансированная',
      strategy_aggressive: 'Агрессивная',
      start_bot: 'Запустить бота',
      bot_running: 'Бот запущен',
      pause: 'Пауза',
      resume: 'Продолжить',
      bot_running_button: 'Бот работает...'
    },
    chart: {
      title: 'График баланса',
      no_balance_title: 'Чтобы начать, пополните счёт',
      no_balance_desc: 'Нажмите «Пополнить», чтобы добавить средства',
      no_balance_btn: 'Пополнить сейчас',
      start_hint_title: 'Запустите бота, чтобы увидеть лайв-график',
      start_hint_desc: 'Задайте параметры и нажмите «Запустить бота»',
      total_balance: 'Всего на счёте',
      profit: 'Профит:',
      tooltip_balance: 'Баланс: $ {value}',
      annotation_initial: 'Начальный депозит'
    },
    stats: {
      intro: 'Статистика показывает вашу торговую эффективность: количество сделок, винрейт и прибыль.',
      total_trades: 'Всего сделок',
      winrate: 'Винрейт',
      profit_today: 'Прибыль сегодня',
      total_profit: 'Итоговая прибыль'
    },
    history: {
      intro: 'Таблица показывает ваши последние сделки с деталями по каждой.',
      title: 'Последние сделки',
      time: 'Время',
      asset: 'Актив',
      type: 'Тип',
      entry: 'Вход',
      exit: 'Выход',
      amount: 'Сумма',
      pnl: 'PnL',
      empty: 'Пока нет сделок. Запустите бота, чтобы увидеть активность.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Демо Трейдинг-бота.',
      simulation: 'Это симуляция исключительно в демонстрационных целях.',
      no_real: 'Реальные деньги не используются и реальные сделки не выполняются.',
      terms: 'Условия использования',
      privacy: 'Политика конфиденциальности',
      cookies: 'Политика Cookies',
      risk: 'Предупреждение о рисках',
      terms_full: 'Правила и условия'
    },
    modals: {
      deposit_title: 'Пополнение средств [Демо]',
      deposit_hint: 'Выберите сумму, которую хотите внести на счёт.',
      deposit_amount: 'Сумма пополнения (250 - $ 50,000)',
      deposit_confirm: 'Подтвердить пополнение',
      withdraw_title: 'Вывод средств',
      withdraw_hint: 'Выберите сумму и способ вывода со счёта.',
      withdraw_amount: 'Сумма к выводу',
      withdraw_available: 'Доступно:',
      withdraw_method: 'Способ вывода',
      paypal_email: 'Email PayPal',
      iban_number: 'Номер IBAN',
      bank_name: 'Название банка',
      bank_placeholder: 'Название банка...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Подтвердить вывод'
    },
    notifications: {
      timeframe_changed: 'Таймфрейм изменён на {tf}',
      deposit_success: 'Пополнение $ {amount} успешно выполнено',
      withdraw_success: 'Вывод $ {amount} успешно выполнен'
    },
    tutorial: {
      step1: 'Добро пожаловать в демо трейдинг-бота! Это ваш дашборд для мониторинга торговли и результатов.',
      step2: 'Здесь вы настраиваете бота: пополнение, рынки и стратегия.',
      step3: 'Сначала пополните счёт, чтобы начать торговать. Давайте внесём 250.',
      step4: 'Выберите рынки для торговли. Можно выбрать несколько.',
      step5: 'Выберите стратегию. Это влияет на управление капиталом.',
      step6: 'Нажмите эту кнопку, чтобы запустить бота. Он начнёт торговать по вашим настройкам.',
      step7: 'Это лайв-график, где видно рост баланса и активность бота.',
      step8: 'Здесь отображаются лайв-уведомления о текущих сделках.',
      step9: 'Эта статистика показывает эффективность: сделки, винрейт и прибыль.',
      step10:'Таблица ниже показывает ваши последние сделки с деталями.'
    },
    chat: {
      full_access: 'Получить полный доступ',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      start_now: 'Начать сейчас'
    },
    forms: {
      ready_title: 'Готовы <span class="text-gradient">начать?</span>',
      ready_desc: 'Заполните форму ниже и начните менять свою финансовую жизнь уже сегодня.',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      start: 'Начать',
      accept_html: 'Регистрируясь, вы принимаете наши <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Условия использования</a> и <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Политику конфиденциальности</a>.'
    },
    liveTrades: {
      none: 'Сейчас нет активных сделок.',
      sell_badge: 'ПРОДАЖА',
      gain: 'Прибыль',
      price: 'Цена: $ {value}'
    },
    countdown: {
      remaining: 'Оставшееся время:'
    },
    trade: {
      buy: 'ПОКУПКА',
      sell: 'ПРОДАЖА'
    }
  };

  if (window.i18n) {
    window.i18n.register('ru', ru);
  } else {
    window.__ruDict = ru;
  }
})();
