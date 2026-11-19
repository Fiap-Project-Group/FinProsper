// =============================================================
// FinProsper — Dados do glossário
// Array de objetos: cada objeto é um termo técnico que aparece
// em alguma página do FinProsper. A página do glossário percorre
// este array com um laço "for" e monta a lista (DOM).
//
// nome      = nome do termo
// sigla     = (opcional) nome completo de uma sigla
// categoria = basico | taxas | investimentos | regras | dividas
// definicao = explicação em linguagem simples
// exemplo   = (opcional) exemplo prático
// paginas   = onde o termo aparece: inicio | simulador | impacto | equipe
// guia      = (opcional) número do tópico do guia que fala do termo
// busca     = (opcional) outras palavras que levam a este termo
// =============================================================

var termos = [
  {
    nome: "Aniversário da poupança",
    categoria: "investimentos",
    definicao:
      "Dia do mês em que cada depósito na poupança completa mais um mês e recebe o rendimento. Se você sacar antes dessa data, perde o rendimento daquele mês.",
    exemplo:
      "Depositou no dia 10? O rendimento cai todo dia 10. Sacar no dia 9 faz você perder o mês inteiro.",
    paginas: ["simulador"],
    busca: "data rendimento mensal",
  },
  {
    nome: "Aporte",
    categoria: "basico",
    definicao:
      "Cada valor que você coloca em um investimento. O aporte inicial é o primeiro depósito; o aporte mensal é o que você guarda todo mês.",
    exemplo:
      "Começar com R$ 500 e depois guardar R$ 200 por mês: R$ 500 é o aporte inicial e R$ 200 é o aporte mensal.",
    paginas: ["impacto"],
    busca: "deposito aplicar valor inicial mensal",
  },
  {
    nome: "Apostas on-line (bets)",
    categoria: "dividas",
    definicao:
      "Jogos de azar e apostas esportivas pela internet. Não são investimento: as regras são feitas para que, na média, quem aposta perca dinheiro. Promessas de “dinheiro rápido” costumam levar a dívidas.",
    paginas: ["inicio"],
    busca: "bet tigrinho jogo aposta cassino",
  },
  {
    nome: "Aposentadoria",
    categoria: "basico",
    definicao:
      "Período em que a pessoa para de trabalhar e passa a viver de uma renda mensal, que pode vir do INSS, da previdência privada ou dos próprios investimentos. Quanto antes você começa a guardar, menor o esforço por mês.",
    paginas: [],
    guia: 4,
    busca: "inss previdencia terceira idade",
  },
  {
    nome: "Carência",
    categoria: "regras",
    definicao:
      "Prazo inicial em que o dinheiro não pode ser resgatado. Só depois dele você consegue sacar.",
    exemplo:
      "LCI e LCA têm carência: durante esse período, o dinheiro fica preso no investimento.",
    paginas: ["simulador"],
    busca: "prazo minimo saque bloqueado",
  },
  {
    nome: "Cartão de crédito",
    categoria: "dividas",
    definicao:
      "Forma de pagamento em que o banco paga a compra por você e cobra tudo de uma vez na fatura do mês seguinte. Usado sem planejamento, vira uma das dívidas mais caras do país.",
    paginas: ["impacto"],
    guia: 6,
    busca: "credito compra parcelada",
  },
  {
    nome: "CDB",
    sigla: "Certificado de Depósito Bancário",
    categoria: "investimentos",
    definicao:
      "Você empresta dinheiro a um banco e ele devolve com juros, numa data combinada (vencimento) ou quando você pedir, se tiver liquidez diária. Costuma render um percentual do CDI e tem a proteção do FGC.",
    exemplo:
      "Um CDB que paga 105% do CDI rende um pouco mais que o próprio CDI.",
    paginas: ["simulador"],
    busca: "banco renda fixa",
  },
  {
    nome: "CDI",
    sigla: "Certificado de Depósito Interbancário",
    categoria: "taxas",
    definicao:
      "Taxa de juros que os bancos cobram para emprestar dinheiro uns aos outros por um dia. Fica sempre muito perto da Selic e é a principal referência de rendimento da renda fixa (CDB, LCI, LCA, caixinhas e fundos DI).",
    paginas: ["inicio", "simulador"],
    busca: "interbancario taxa referencia",
  },
  {
    nome: "Cheque especial",
    categoria: "dividas",
    definicao:
      "Limite de dinheiro que o banco deixa disponível na conta corrente, mesmo quando o saldo acaba. É um empréstimo automático com juros muito altos (até 8% ao mês, pelo limite do Banco Central) e deve ser usado só em último caso.",
    paginas: ["impacto"],
    busca: "limite conta negativa saldo negativo",
  },
  {
    nome: "Consumo consciente",
    categoria: "basico",
    definicao:
      "Hábito de pensar antes de comprar: separar o que é necessidade do que é desejo, comparar preços e só gastar quando cabe no orçamento.",
    paginas: ["impacto"],
    guia: 2,
    busca: "necessidade desejo compras",
  },
  {
    nome: "Conta corrente",
    categoria: "basico",
    definicao:
      "Conta usada para receber o salário e pagar as contas do dia a dia. O dinheiro parado nela não rende nada e perde valor com a inflação.",
    paginas: ["inicio", "simulador"],
    busca: "dinheiro parado conta banco",
  },
  {
    nome: "Conta remunerada (caixinha)",
    categoria: "investimentos",
    definicao:
      "Conta ou “caixinha” de bancos digitais em que o dinheiro rende todo dia, normalmente um percentual do CDI, e pode ser sacado quando você quiser. Tem Imposto de Renda sobre o rendimento.",
    exemplo:
      "Uma caixinha que rende 100% do CDI acompanha a taxa do CDI dia a dia.",
    paginas: ["simulador"],
    busca: "caixinha cofrinho banco digital",
  },
  {
    nome: "Copom",
    sigla: "Comitê de Política Monetária",
    categoria: "taxas",
    definicao:
      "Grupo de diretores do Banco Central que se reúne oito vezes por ano para decidir a taxa Selic. As decisões do Copom mudam os juros de empréstimos e o rendimento da renda fixa.",
    paginas: ["simulador"],
    busca: "banco central reuniao",
  },
  {
    nome: "Custo fixo",
    categoria: "basico",
    definicao:
      "Despesas que se repetem todo mês com valor parecido, como aluguel, condomínio, luz, água, internet e transporte. É a base para calcular o tamanho da reserva de emergência.",
    exemplo:
      "Se o seu custo fixo é R$ 2.000, uma reserva de 6 meses é R$ 12.000.",
    paginas: ["impacto"],
    busca: "despesa fixa contas mensais gastos fixos",
  },
  {
    nome: "Dívida e endividamento",
    categoria: "dividas",
    definicao:
      "Dívida é todo valor que você ainda precisa pagar. Estar endividado não é sempre um problema; o perigo é quando as parcelas ocupam tanto da renda que faltam recursos para o básico, e a dívida vira uma bola de neve.",
    paginas: ["inicio", "impacto", "equipe"],
    guia: 5,
    busca: "divida endividado parcelas",
  },
  {
    nome: "Empréstimo",
    categoria: "dividas",
    definicao:
      "Dinheiro que o banco empresta e você devolve em parcelas, com juros. Antes de contratar, compare o Custo Efetivo Total (CET), que soma juros, taxas e seguros.",
    paginas: ["impacto"],
    busca: "credito pessoal financiamento cet",
  },
  {
    nome: "Fatura",
    categoria: "dividas",
    definicao:
      "Conta mensal do cartão de crédito, com todas as compras do período. Pagar o valor total até o vencimento evita juros; pagar só uma parte joga o restante no rotativo.",
    paginas: ["impacto"],
    busca: "cartao pagamento minimo boleto",
  },
  {
    nome: "FGC",
    sigla: "Fundo Garantidor de Créditos",
    categoria: "regras",
    definicao:
      "Proteção que devolve o seu dinheiro se o banco quebrar: até R$ 250 mil por CPF em cada instituição (com limite total de R$ 1 milhão a cada 4 anos). Cobre poupança, CDB, LCI, LCA e contas. Não cobre Tesouro Direto (garantido pelo governo) nem fundos.",
    paginas: ["simulador"],
    busca: "garantia seguranca banco quebrar",
  },
  {
    nome: "Fundo DI",
    categoria: "investimentos",
    definicao:
      "Fundo de investimento em que um gestor junta o dinheiro de muitas pessoas e aplica em títulos que acompanham o CDI. É prático, mas cobra taxa de administração, que reduz o rendimento.",
    paginas: ["simulador"],
    busca: "fundo de investimento gestor cotas",
  },
  {
    nome: "Gastos por impulso",
    categoria: "basico",
    definicao:
      "Compras feitas sem planejamento, levadas pela emoção do momento ou por promoções. Somadas, desequilibram o orçamento.",
    exemplo:
      "Uma dica simples: esperar 24 horas antes de comprar algo que não estava planejado.",
    paginas: ["impacto"],
    guia: 6,
    busca: "compra por impulso superfluo",
  },
  {
    nome: "Imposto de Renda sobre investimentos",
    categoria: "regras",
    definicao:
      "Imposto cobrado só sobre o que o investimento rendeu, não sobre o valor que você guardou. Na maior parte da renda fixa, a alíquota diminui quanto mais tempo o dinheiro fica aplicado (tabela regressiva).",
    paginas: ["simulador"],
    busca: "ir imposto tributo aliquota regressiva",
  },
  {
    nome: "Inadimplência",
    categoria: "dividas",
    definicao:
      "Quando uma conta ou parcela não é paga no prazo. Gera multa e juros e pode levar o nome aos cadastros de devedores, dificultando conseguir crédito.",
    paginas: [],
    guia: 5,
    busca: "nome sujo atraso negativado serasa spc",
  },
  {
    nome: "Inflação",
    categoria: "taxas",
    definicao:
      "Aumento geral dos preços ao longo do tempo. Com inflação, o mesmo dinheiro compra menos coisas, por isso o dinheiro parado perde valor.",
    exemplo:
      "Com inflação de 4% ao ano, algo que custa R$ 100 hoje passa a custar cerca de R$ 104 daqui a um ano.",
    paginas: ["inicio", "simulador"],
    busca: "precos aumento custo de vida",
  },
  {
    nome: "Investimento",
    categoria: "basico",
    definicao:
      "Aplicar dinheiro hoje esperando que ele cresça com o tempo. Todo investimento combina três pontos: quanto rende (rentabilidade), quão seguro é (risco) e quando dá para sacar (liquidez).",
    paginas: ["inicio", "simulador"],
    guia: 2,
    busca: "investir aplicar aplicacao",
  },
  {
    nome: "IPCA",
    sigla: "Índice Nacional de Preços ao Consumidor Amplo",
    categoria: "taxas",
    definicao:
      "Índice oficial de inflação do Brasil, calculado pelo IBGE. Mede quanto variaram os preços de produtos e serviços que as famílias compram, como comida, aluguel e transporte.",
    paginas: ["simulador"],
    busca: "inflacao oficial ibge indice",
  },
  {
    nome: "Isenção de Imposto de Renda",
    categoria: "regras",
    definicao:
      "Quando o investimento não paga Imposto de Renda sobre o rendimento. Para pessoas físicas, poupança, LCI e LCA são isentas; por isso, mesmo com taxa menor, podem render parecido com outras opções.",
    paginas: ["simulador"],
    busca: "isento sem imposto",
  },
  {
    nome: "Juros",
    categoria: "taxas",
    definicao:
      "O “preço” do dinheiro no tempo. Quem empresta recebe juros; quem pega emprestado paga juros. Nas dívidas, os juros trabalham contra você; nos investimentos, a seu favor.",
    paginas: ["inicio", "simulador", "impacto"],
    guia: 2,
    busca: "taxa de juros",
  },
  {
    nome: "Juros compostos",
    categoria: "taxas",
    definicao:
      "Juros sobre juros: a cada mês, o rendimento é calculado sobre o que você guardou e também sobre os juros que já ganhou. É o efeito “bola de neve”: quanto mais tempo, mais o dinheiro cresce.",
    exemplo:
      "R$ 1.000 rendendo 1% ao mês viram cerca de R$ 1.126,83 em 12 meses, e não R$ 1.120.",
    paginas: ["inicio", "simulador", "impacto"],
    busca: "bola de neve juros sobre juros",
  },
  {
    nome: "LCI e LCA",
    sigla: "Letra de Crédito Imobiliário e Letra de Crédito do Agronegócio",
    categoria: "investimentos",
    definicao:
      "Você empresta dinheiro a um banco para financiar imóveis (LCI) ou o agronegócio (LCA). Para pessoas físicas, são isentas de Imposto de Renda e têm a proteção do FGC, mas exigem um prazo de carência.",
    paginas: ["simulador"],
    busca: "letra credito imobiliario agronegocio isento",
  },
  {
    nome: "Liquidez",
    categoria: "regras",
    definicao:
      "A rapidez com que um investimento vira dinheiro na mão sem perder valor. “Liquidez diária” significa que dá para sacar em qualquer dia útil.",
    exemplo:
      "No simulador, a opção “Posso precisar do dinheiro a qualquer momento” mostra só investimentos com liquidez diária.",
    paginas: ["simulador"],
    busca: "liquidez diaria saque imediato sacar",
  },
  {
    nome: "Meta financeira",
    categoria: "basico",
    definicao:
      "Objetivo com valor e prazo definidos. Dividir o valor pelo número de meses mostra quanto guardar por mês.",
    exemplo: "Juntar R$ 6.000 em 12 meses significa guardar R$ 500 por mês.",
    paginas: ["inicio", "impacto"],
    guia: 3,
    busca: "objetivo planejamento metas",
  },
  {
    nome: "Montante",
    categoria: "basico",
    definicao:
      "Valor total no fim do período: tudo o que você guardou mais o que o dinheiro rendeu. É o resultado que o simulador mostra em “Em X anos você teria”.",
    paginas: ["simulador"],
    busca: "valor final total acumulado",
  },
  {
    nome: "Orçamento",
    categoria: "basico",
    definicao:
      "Plano de quanto dinheiro entra e quanto sai a cada mês. Com ele, você define limites de gastos e quanto vai guardar.",
    paginas: ["inicio", "impacto"],
    guia: 2,
    busca: "orcamento pessoal familiar planejamento renda despesas",
  },
  {
    nome: "Patrimônio",
    categoria: "basico",
    definicao:
      "Tudo o que você tem de valor: dinheiro guardado, investimentos, imóveis e veículos. Descontando as dívidas, chega-se ao patrimônio líquido.",
    paginas: ["inicio", "impacto"],
    guia: 5,
    busca: "bens riqueza patrimonio liquido",
  },
  {
    nome: "Percentual do CDI (% do CDI)",
    categoria: "taxas",
    definicao:
      "Forma de dizer quanto um investimento rende em comparação com o CDI. 100% do CDI rende igual ao CDI; 105% do CDI rende 5% a mais que ele.",
    exemplo:
      "Com o CDI em 13,65% ao ano, um CDB de 105% do CDI rende cerca de 14,33% ao ano.",
    paginas: ["simulador"],
    busca: "porcentagem do cdi 100% 105% 115%",
  },
  {
    nome: "Poder de compra",
    categoria: "taxas",
    definicao:
      "Quantidade de produtos e serviços que um valor em dinheiro consegue comprar. A inflação reduz o poder de compra; investimentos que rendem acima dela o protegem.",
    paginas: ["simulador"],
    busca: "valor do dinheiro inflacao",
  },
  {
    nome: "Poupança",
    categoria: "investimentos",
    definicao:
      "A aplicação mais conhecida do Brasil. É isenta de Imposto de Renda e protegida pelo FGC, mas rende menos que quase todas as outras opções de renda fixa. Quando a Selic está acima de 8,5% ao ano, rende 0,5% ao mês mais a TR (Taxa Referencial).",
    paginas: ["simulador", "equipe"],
    busca: "caderneta poupanca",
  },
  {
    nome: "Regra 50-30-20",
    categoria: "basico",
    definicao:
      "Referência para dividir a renda: 50% para necessidades (moradia, comida, contas), 30% para desejos (lazer, compras) e 20% para poupança e objetivos. Pode ser adaptada à sua realidade.",
    exemplo:
      "Com renda de R$ 2.000: R$ 1.000 para necessidades, R$ 600 para desejos e R$ 400 para guardar.",
    paginas: ["inicio", "simulador", "impacto"],
    guia: 7,
    busca: "50/30/20 divisao renda",
  },
  {
    nome: "Renda fixa",
    categoria: "investimentos",
    definicao:
      "Investimentos em que a forma de remuneração é combinada no momento da aplicação: uma taxa fixa ou um índice, como CDI, Selic ou IPCA. Poupança, CDB, LCI, LCA e Tesouro Direto são renda fixa.",
    paginas: ["inicio", "simulador", "impacto"],
    busca: "investimento seguro",
  },
  {
    nome: "Rendimento",
    categoria: "basico",
    definicao:
      "Quanto o dinheiro ganhou enquanto estava aplicado. É a diferença entre o montante final e o total que você guardou.",
    exemplo:
      "Guardou R$ 10.000 e terminou com R$ 11.200: o rendimento foi de R$ 1.200.",
    paginas: ["simulador"],
    busca: "rentabilidade ganho lucro rendeu",
  },
  {
    nome: "Rentabilidade real",
    categoria: "taxas",
    definicao:
      "Quanto o investimento rendeu acima da inflação, ou seja, o ganho verdadeiro de poder de compra.",
    exemplo:
      "Se o investimento rendeu 10% e a inflação foi 4%, o ganho real foi de cerca de 5,8%.",
    paginas: ["simulador"],
    busca: "ganho real acima da inflacao",
  },
  {
    nome: "Reserva de emergência",
    categoria: "basico",
    definicao:
      "Dinheiro guardado só para imprevistos, como perda de emprego, doença ou conserto urgente. Costuma-se recomendar de 3 a 6 meses do custo fixo, aplicados em algo seguro e com liquidez diária, como Tesouro Selic ou CDB com liquidez diária.",
    paginas: ["impacto", "equipe"],
    guia: 3,
    busca: "emergencia imprevistos poupanca preventiva colchao",
  },
  {
    nome: "Resgate",
    categoria: "regras",
    definicao:
      "Retirar o dinheiro de um investimento. Alguns resgates caem na hora; outros levam alguns dias úteis para chegar na conta (por exemplo, “D+1” significa um dia útil depois do pedido).",
    paginas: ["simulador"],
    busca: "saque sacar retirar d+1",
  },
  {
    nome: "Risco",
    categoria: "investimentos",
    definicao:
      "Chance de o resultado ser diferente do esperado, inclusive de perder dinheiro. Pode ser o risco de quem recebeu o dinheiro não pagar, de o preço do investimento oscilar ou de não conseguir sacar quando precisar.",
    paginas: ["inicio", "simulador"],
    guia: 6,
    busca: "seguranca perda risco baixo",
  },
  {
    nome: "Rotativo do cartão",
    categoria: "dividas",
    definicao:
      "Crédito que entra automaticamente quando você paga menos que o total da fatura. Tem um dos juros mais altos do mercado. Por lei, juros e encargos do rotativo não podem passar de 100% do valor da dívida original.",
    paginas: ["impacto"],
    busca: "juros do rotativo pagamento minimo cartao",
  },
  {
    nome: "Selic",
    sigla: "Sistema Especial de Liquidação e de Custódia",
    categoria: "taxas",
    definicao:
      "Taxa básica de juros da economia, definida pelo Copom. Serve de referência para todas as outras: quando ela sobe, empréstimos ficam mais caros e a renda fixa rende mais; quando cai, acontece o contrário.",
    exemplo: "O simulador usa a Selic de 13,75% ao ano.",
    paginas: ["inicio", "simulador"],
    busca: "taxa basica de juros",
  },
  {
    nome: "Taxa ao ano (% a.a.)",
    categoria: "taxas",
    definicao:
      "Rendimento (ou custo) acumulado em 12 meses. Também existe a taxa ao mês (% a.m.). Ao comparar opções, confira se estão na mesma unidade.",
    exemplo: "1% ao mês equivale a cerca de 12,68% ao ano, por causa dos juros compostos.",
    paginas: ["simulador", "impacto"],
    busca: "a.a. a.m. ao mes anual mensal",
  },
  {
    nome: "Taxa de administração",
    categoria: "regras",
    definicao:
      "Percentual cobrado por ano pelos fundos de investimento para pagar a gestão. É descontado do rendimento, então taxas altas comem boa parte do ganho.",
    paginas: ["simulador"],
    busca: "custo fundo gestor",
  },
  {
    nome: "Tesouro Direto",
    categoria: "investimentos",
    definicao:
      "Programa do Tesouro Nacional para pessoas comuns comprarem títulos públicos pela internet. Na prática, você empresta dinheiro ao Governo Federal, que garante o pagamento. Dá para começar com cerca de R$ 30.",
    paginas: ["simulador"],
    busca: "titulo publico governo",
  },
  {
    nome: "Tesouro IPCA+",
    categoria: "investimentos",
    definicao:
      "Título público que rende a inflação (IPCA) mais uma taxa fixa. Protege o poder de compra no longo prazo. Vender antes do vencimento pode dar ganho ou perda.",
    exemplo: "IPCA + 7,68% ao ano: você ganha a inflação do período mais 7,68% ao ano.",
    paginas: ["simulador"],
    busca: "ipca mais inflacao titulo publico aposentadoria",
  },
  {
    nome: "Tesouro Prefixado",
    categoria: "investimentos",
    definicao:
      "Título público com taxa definida no dia da compra: você já sabe quanto vai receber no vencimento. Bom para metas com data marcada. Vender antes pode dar ganho ou perda.",
    paginas: ["simulador"],
    busca: "prefixado taxa fixa titulo publico",
  },
  {
    nome: "Tesouro Selic",
    categoria: "investimentos",
    definicao:
      "Título público que acompanha a Selic. Pode ser resgatado em qualquer dia útil e quase não oscila, por isso é uma das opções mais usadas para a reserva de emergência.",
    paginas: ["simulador"],
    busca: "titulo publico selic reserva",
  },
  {
    nome: "Vencimento",
    categoria: "regras",
    definicao:
      "Data em que o investimento termina e o dinheiro volta para você com o rendimento combinado. Em títulos como Tesouro Prefixado e IPCA+, vender antes do vencimento é feito pelo preço do dia, que pode ser maior ou menor.",
    paginas: ["simulador"],
    busca: "data final prazo marcacao a mercado",
  },
];
