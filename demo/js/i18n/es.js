// Spanish (es) translations
(function(){
  const es = {
    common: {
      back: 'Atrás',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Bienvenido a la demo del<br> <span class="text-gradient">Bot de Trading</span>',
      description: 'Esta es una demostración de cómo funciona un bot de trading automatizado. No se usa dinero real ni se ejecutan operaciones reales.',
      learn_title: 'Aprenderás:',
      learn_points: {
        setup: 'Cómo configurar un bot de trading',
        markets: 'Cómo elegir mercados y estrategias',
        monitor: 'Cómo monitorear el rendimiento del bot',
        auto: 'Cómo el bot ejecuta operaciones automáticamente'
      },
      tutorial_hint: 'Comencemos con un breve tutorial que muestra cómo funciona todo.',
      start_btn: 'Iniciar demo'
    },
    header: {
      full_access: 'Obtener acceso completo',
      balance_label: 'Saldo DEMO actual'
    },
    settings: {
      title: 'Ajustes de trading',
      deposit: 'Depositar',
      withdraw: 'Retirar',
      markets_intro: 'Elige los mercados en los que quieres operar. Puedes seleccionar varios.',
      markets_label: 'Seleccionar mercados',
      forex_pairs: 'Pares',
      stocks: 'Acciones',
      crypto: 'Cripto',
      crypto_desc: 'Monedas digitales',
      commodities: 'Materias primas',
      commodities_desc: 'Oro, petróleo, metales',
      strategy_intro: 'Elige tu estrategia de trading. Esto afecta cómo el bot gestiona tus fondos.',
      strategy_label: 'Estrategia de trading',
      strategy_conservative: 'Conservadora',
      strategy_balanced: 'Equilibrada',
      strategy_aggressive: 'Agresiva',
      start_bot: 'Iniciar bot',
      bot_running: 'Bot en ejecución',
      pause: 'Pausa',
      resume: 'Reanudar',
      bot_running_button: 'Bot ejecutándose...'
    },
    chart: {
      title: 'Gráfico de saldo',
      no_balance_title: 'Necesitas depositar fondos para empezar',
      no_balance_desc: 'Haz clic en “Depositar” para añadir fondos',
      no_balance_btn: 'Depositar ahora',
      start_hint_title: 'Inicia el bot para ver el gráfico en vivo',
      start_hint_desc: 'Configura tus preferencias y haz clic en “Iniciar bot”',
      total_balance: 'Saldo total',
      profit: 'Ganancia:',
      tooltip_balance: 'Saldo: $ {value}',
      annotation_initial: 'Depósito inicial'
    },
    stats: {
      intro: 'Las estadísticas muestran tu rendimiento: operaciones totales, tasa de aciertos y ganancias.',
      total_trades: 'Operaciones totales',
      winrate: 'Tasa de aciertos',
      profit_today: 'Ganancia hoy',
      total_profit: 'Ganancia total'
    },
    history: {
      intro: 'La tabla muestra tus operaciones recientes con detalles por transacción.',
      title: 'Operaciones recientes',
      time: 'Hora',
      asset: 'Activo',
      type: 'Tipo',
      entry: 'Entrada',
      exit: 'Salida',
      amount: 'Monto',
      pnl: 'PnL',
      empty: 'Aún no hay operaciones. Inicia el bot para ver actividad.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Demo del Bot de Trading.',
      simulation: 'Esto es una simulación solo con fines demostrativos.',
      no_real: 'No se usa dinero real y no se ejecutan operaciones reales.',
      terms: 'Términos de uso',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      risk: 'Advertencia de riesgos',
      terms_full: 'Términos y condiciones'
    },
    modals: {
      deposit_title: 'Depositar fondos [Demo]',
      deposit_hint: 'Elige el monto que deseas depositar en tu cuenta.',
      deposit_amount: 'Monto a depositar (250 - $ 50,000)',
      deposit_confirm: 'Confirmar depósito',
      withdraw_title: 'Retirar fondos',
      withdraw_hint: 'Elige el monto y el método para retirar de tu cuenta.',
      withdraw_amount: 'Monto a retirar',
      withdraw_available: 'Disponible:',
      withdraw_method: 'Método de retiro',
      paypal_email: 'Correo de PayPal',
      iban_number: 'Número IBAN',
      bank_name: 'Nombre del banco',
      bank_placeholder: 'Nombre del banco...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Confirmar retiro'
    },
    notifications: {
      timeframe_changed: 'Marco temporal cambiado a {tf}',
      deposit_success: 'Depósito de $ {amount} realizado con éxito',
      withdraw_success: 'Retiro de $ {amount} realizado con éxito'
    },
    tutorial: {
      step1: '¡Bienvenido a la demo del bot de trading! Este es tu panel para monitorear la actividad y el rendimiento.',
      step2: 'Aquí configuras el bot: depósito, mercados y estrategia.',
      step3: 'Primero deposita fondos para empezar. Ingresemos 250.',
      step4: 'Elige los mercados en los que quieras operar. Puedes elegir varios.',
      step5: 'Elige la estrategia. Afecta cómo el bot gestiona tu capital.',
      step6: 'Haz clic en este botón para iniciar el bot. Empezará a operar según tu configuración.',
      step7: 'Este es el gráfico en vivo: crecimiento del saldo y actividad del bot.',
      step8: 'Aquí verás notificaciones en vivo sobre las operaciones.',
      step9: 'Estas estadísticas muestran tu rendimiento: operaciones, tasa de aciertos y ganancias.',
      step10:'Esta tabla muestra tus operaciones más recientes con detalles.'
    },
    chat: {
      full_access: 'Obtener acceso completo',
      first_name: 'Nombre',
      last_name: 'Apellido',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      start_now: 'Comenzar ahora'
    },
    forms: {
      ready_title: '¿Listo para <span class="text-gradient">comenzar?</span>',
      ready_desc: 'Completa el formulario y empieza a cambiar tu vida financiera hoy.',
      first_name: 'Nombre',
      last_name: 'Apellido',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      start: 'Comenzar',
      accept_html: 'Al registrarte aceptas nuestros <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Términos de uso</a> y la <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Política de privacidad</a>.'
    },
    liveTrades: {
      none: 'No hay operaciones activas por el momento.',
      sell_badge: 'VENTA',
      gain: 'Ganancia',
      price: 'Precio: $ {value}'
    },
    countdown: {
      remaining: 'Tiempo restante:'
    },
    trade: {
      buy: 'COMPRA',
      sell: 'VENTA'
    }
  };

  if (window.i18n) {
    window.i18n.register('es', es);
  } else {
    window.__esDict = es;
  }
})();
