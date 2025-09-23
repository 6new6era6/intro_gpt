// Portuguese (pt) translations
(function(){
  const pt = {
    common: {
      back: 'Voltar',
      demo: 'DEMO',
      currencySymbol: '$'
    },
    welcome: {
      title_html: 'Bem-vindo à demo do<br> <span class="text-gradient">Bot de Trading</span>',
      description: 'Esta é uma demonstração de como funciona um bot de trading automatizado. Não é usado dinheiro real nem são feitas operações reais.',
      learn_title: 'Você vai aprender:',
      learn_points: {
        setup: 'Como configurar um bot de trading',
        markets: 'Como escolher mercados e estratégias',
        monitor: 'Como monitorar a performance do bot',
        auto: 'Como o bot executa operações automaticamente'
      },
      tutorial_hint: 'Vamos começar com um breve tutorial que mostra como tudo funciona.',
      start_btn: 'Iniciar demo'
    },
    header: {
      full_access: 'Obter acesso completo',
      balance_label: 'Saldo DEMO atual'
    },
    settings: {
      title: 'Configurações de trading',
      deposit: 'Depositar',
      withdraw: 'Sacar',
      markets_intro: 'Escolha os mercados onde deseja negociar. Você pode selecionar vários.',
      markets_label: 'Selecionar mercados',
      forex_pairs: 'Pares',
      stocks: 'Ações',
      crypto: 'Cripto',
      crypto_desc: 'Moedas digitais',
      commodities: 'Commodities',
      commodities_desc: 'Ouro, petróleo, metais',
      strategy_intro: 'Escolha sua estratégia de trading. Isso afeta como o bot gerencia seus fundos.',
      strategy_label: 'Estratégia de trading',
      strategy_conservative: 'Conservadora',
      strategy_balanced: 'Equilibrada',
      strategy_aggressive: 'Agressiva',
      start_bot: 'Iniciar bot',
      bot_running: 'Bot em execução',
      pause: 'Pausar',
      resume: 'Retomar',
      bot_running_button: 'Bot em funcionamento...'
    },
    chart: {
      title: 'Gráfico de saldo',
      no_balance_title: 'Você precisa depositar fundos para começar',
      no_balance_desc: 'Clique em “Depositar” para adicionar fundos',
      no_balance_btn: 'Depositar agora',
      start_hint_title: 'Inicie o bot para ver o gráfico ao vivo',
      start_hint_desc: 'Defina suas preferências e clique em “Iniciar bot”',
      total_balance: 'Saldo total',
      profit: 'Lucro:',
      tooltip_balance: 'Saldo: $ {value}',
      annotation_initial: 'Depósito inicial'
    },
    stats: {
      intro: 'As estatísticas mostram seu desempenho: total de operações, taxa de acerto e lucros.',
      total_trades: 'Operações totais',
      winrate: 'Taxa de acerto',
      profit_today: 'Lucro hoje',
      total_profit: 'Lucro total'
    },
    history: {
      intro: 'A tabela mostra suas operações recentes com detalhes de cada transação.',
      title: 'Operações recentes',
      time: 'Hora',
      asset: 'Ativo',
      type: 'Tipo',
      entry: 'Entrada',
      exit: 'Saída',
      amount: 'Valor',
      pnl: 'PnL',
      empty: 'Ainda não há operações. Inicie o bot para ver atividade.'
    },
    footer: {
      company: 'Micronyx AI Ltd.© 2025',
      demo: 'Demo do Bot de Trading.',
      simulation: 'Esta é uma simulação apenas para fins de demonstração.',
      no_real: 'Não é usado dinheiro real nem são executadas operações reais.',
      terms: 'Termos de uso',
      privacy: 'Política de privacidade',
      cookies: 'Política de cookies',
      risk: 'Aviso de risco',
      terms_full: 'Termos e condições'
    },
    modals: {
      deposit_title: 'Depositar fundos [Demo]',
      deposit_hint: 'Escolha o valor que deseja depositar na sua conta.',
      deposit_amount: 'Valor do depósito (250 - $ 50.000)',
      deposit_confirm: 'Confirmar depósito',
      withdraw_title: 'Sacar fundos',
      withdraw_hint: 'Escolha o valor e o método para sacar da sua conta.',
      withdraw_amount: 'Valor do saque',
      withdraw_available: 'Disponível:',
      withdraw_method: 'Método de saque',
      paypal_email: 'Email do PayPal',
      iban_number: 'Número IBAN',
      bank_name: 'Nome do banco',
      bank_placeholder: 'Nome do banco...',
      iban_placeholder: 'IBAN...',
      withdraw_confirm: 'Confirmar saque'
    },
    notifications: {
      timeframe_changed: 'Intervalo alterado para {tf}',
      deposit_success: 'Depósito de $ {amount} concluído com sucesso',
      withdraw_success: 'Saque de $ {amount} concluído com sucesso'
    },
    tutorial: {
      step1: 'Bem-vindo à demo do bot de trading! Este é o seu painel para acompanhar a atividade e o desempenho.',
      step2: 'Aqui você configura o bot: depósito, mercados e estratégia.',
      step3: 'Primeiro, deposite fundos para começar. Vamos depositar 250.',
      step4: 'Escolha os mercados onde deseja operar. Você pode escolher vários.',
      step5: 'Escolha a estratégia. Isso afeta como o bot gerencia seu capital.',
      step6: 'Clique neste botão para iniciar o bot. Ele começará a operar conforme suas configurações.',
      step7: 'Este é o gráfico ao vivo: crescimento do saldo e atividade do bot.',
      step8: 'Aqui você verá notificações ao vivo sobre as operações.',
      step9: 'Estas estatísticas mostram seu desempenho: operações, taxa de acerto e lucros.',
      step10:'Esta tabela mostra suas operações mais recentes com detalhes.'
    },
    chat: {
      full_access: 'Obter acesso completo',
      first_name: 'Nome',
      last_name: 'Sobrenome',
      email: 'Email',
      phone: 'Telefone',
      start_now: 'Começar agora'
    },
    forms: {
      ready_title: 'Pronto para <span class="text-gradient">começar?</span>',
      ready_desc: 'Preencha o formulário abaixo e comece a mudar sua vida financeira hoje.',
      first_name: 'Nome',
      last_name: 'Sobrenome',
      email: 'Email',
      phone: 'Telefone',
      start: 'Começar',
      accept_html: 'Ao se registrar, você aceita nossos <a href="#" data-popup="termos-uso-popup" class="legal-popup-link text-blue-400 hover:underline">Termos de uso</a> e a <a href="#" data-popup="privacidade-popup" class="legal-popup-link text-blue-400 hover:underline">Política de privacidade</a>.'
    },
    liveTrades: {
      none: 'Não há operações ativas no momento.',
      sell_badge: 'VENDA',
      gain: 'Lucro',
      price: 'Preço: $ {value}'
    },
    countdown: {
      remaining: 'Tempo restante:'
    },
    trade: {
      buy: 'COMPRA',
      sell: 'VENDA'
    }
  };

  if (window.i18n) {
    window.i18n.register('pt', pt);
  } else {
    window.__ptDict = pt;
  }
})();
