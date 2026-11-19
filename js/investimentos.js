// =============================================================
// FinProsper — Dados do simulador
// Array de objetos: cada objeto é um tipo de investimento.
// A página do simulador percorre este array com um laço "for"
// e monta um cartão para cada investimento (DOM).
//
// Taxas aproximadas de novembro de 2026, usadas só na simulação:
//   - Selic: 13,75% ao ano (Copom, 04/11/2026)
//   - CDI: cerca de 13,65% ao ano
//   - Poupança: 8,29% nos últimos 12 meses
//   - Tesouro Direto: taxas de 11/11/2026
//
// taxaAnual = rendimento por ano (0.1365 = 13,65%).
// Só entram investimentos com rendimento que dá para estimar
// (renda fixa). Ações, ETFs e fundos imobiliários ficaram de fora
// porque o preço deles sobe e desce todos os dias.
// Debêntures e CRI/CRA: risco médio (crédito privado, sem FGC).
//   Debêntures incentivadas: cerca de IPCA + 7% ao ano
//   CRI e CRA: cerca de CDI + 1,5% ao ano
// =============================================================

var investimentos = [
  {
    nome: "Deixar parado na conta",
    categoria: "Sem investir",
    icone: "fa-wallet",
    taxaAnual: 0,
    risco: "Baixo",
    saqueImediato: true,
    resgate: "A qualquer momento",
    minimo: "R$ 0",
    impostoRenda: "Não se aplica",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "O dinheiro fica na conta sem render nada, e a inflação diminui o quanto ele compra a cada mês.",
  },
  {
    nome: "Poupança",
    categoria: "Renda fixa",
    icone: "fa-piggy-bank",
    taxaAnual: 0.0829,
    risco: "Baixo",
    saqueImediato: true,
    resgate: "A qualquer momento (rende só no aniversário)",
    minimo: "R$ 1",
    impostoRenda: "Isento",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "A aplicação mais conhecida do Brasil. É simples, mas rende menos que quase todas as outras da lista.",
  },
  {
    nome: "Conta remunerada (caixinha)",
    categoria: "Renda fixa",
    icone: "fa-money-check-dollar",
    taxaAnual: 0.1365,
    risco: "Baixo",
    saqueImediato: true,
    resgate: "A qualquer momento",
    minimo: "R$ 1",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "As “caixinhas” dos bancos digitais: você guarda e saca quando quiser, e o dinheiro rende todo dia (100% do CDI).",
  },
  {
    nome: "Tesouro Selic",
    categoria: "Renda fixa · Tesouro Direto",
    icone: "fa-building-columns",
    taxaAnual: 0.1375,
    risco: "Baixo",
    saqueImediato: true,
    resgate: "A qualquer momento",
    minimo: "Cerca de R$ 180",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "Governo Federal",
    explicacao:
      "Você empresta dinheiro ao governo e recebe de volta com juros que acompanham a Selic. É o investimento mais seguro do país.",
  },
  {
    nome: "Fundo DI",
    categoria: "Renda fixa · Fundo",
    icone: "fa-chart-pie",
    taxaAnual: 0.1297,
    risco: "Baixo",
    saqueImediato: true,
    resgate: "Em 1 ou 2 dias úteis",
    minimo: "Varia de R$ 1 a R$ 100",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "Nenhuma garantia extra",
    explicacao:
      "Um gestor junta o dinheiro de muita gente e aplica em renda fixa. É prático, mas cobra uma taxa de administração.",
  },
  {
    nome: "CDB de banco grande",
    categoria: "Renda fixa",
    icone: "fa-building",
    taxaAnual: 0.1433,
    risco: "Baixo",
    saqueImediato: false,
    resgate: "Na data combinada (vencimento)",
    minimo: "Varia de R$ 1 a R$ 1.000",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "Você empresta dinheiro a um banco e ele devolve com juros numa data combinada (cerca de 105% do CDI).",
  },
  {
    nome: "CDB de banco médio",
    categoria: "Renda fixa",
    icone: "fa-money-bill-trend-up",
    taxaAnual: 0.157,
    risco: "Baixo",
    saqueImediato: false,
    resgate: "Na data combinada (vencimento)",
    minimo: "Varia de R$ 1 a R$ 1.000",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "Igual ao CDB de banco grande, mas bancos menores pagam mais para atrair clientes (cerca de 115% do CDI).",
  },
  {
    nome: "LCI e LCA",
    categoria: "Renda fixa",
    icone: "fa-house",
    taxaAnual: 0.1229,
    risco: "Baixo",
    saqueImediato: false,
    resgate: "Só depois de um prazo mínimo (carência)",
    minimo: "Varia de R$ 100 a R$ 1.000",
    impostoRenda: "Isento",
    garantia: "FGC até R$ 250 mil",
    explicacao:
      "Você empresta a um banco para financiar imóveis (LCI) ou o agronegócio (LCA). Rende um pouco menos, mas não paga Imposto de Renda.",
  },
  {
    nome: "Tesouro Prefixado 2029",
    categoria: "Renda fixa · Tesouro Direto",
    icone: "fa-calendar-day",
    taxaAnual: 0.1465,
    risco: "Baixo",
    saqueImediato: false,
    resgate: "No vencimento (vender antes pode dar ganho ou perda)",
    minimo: "Cerca de R$ 30",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "Governo Federal",
    explicacao:
      "Você já sabe hoje quanto vai receber no vencimento. Bom para metas com data marcada.",
  },
  {
    nome: "Tesouro IPCA+ 2032",
    categoria: "Renda fixa · Tesouro Direto",
    icone: "fa-shield-halved",
    taxaAnual: 0.1261,
    risco: "Baixo",
    saqueImediato: false,
    resgate: "No vencimento (vender antes pode dar ganho ou perda)",
    minimo: "Cerca de R$ 30",
    impostoRenda: "Sim, sobre o rendimento",
    garantia: "Governo Federal",
    explicacao:
      "Rende a inflação mais um ganho fixo (IPCA + 7,68% ao ano), protegendo o seu poder de compra no longo prazo.",
  },
  {
    nome: "Debêntures incentivadas",
    categoria: "Renda fixa · Crédito privado",
    icone: "fa-briefcase",
    taxaAnual: 0.119,
    risco: "Médio",
    saqueImediato: false,
    resgate: "No vencimento (vender antes pode dar ganho ou perda)",
    minimo: "Cerca de R$ 1.000",
    impostoRenda: "Isento",
    garantia: "Nenhuma: depende da empresa pagar",
    explicacao:
      "Você empresta dinheiro a uma empresa que constrói estradas, usinas ou saneamento (cerca de IPCA + 7% ao ano). Rende bem e é isento de IR, mas não tem FGC.",
  },
  {
    nome: "CRI e CRA",
    categoria: "Renda fixa · Crédito privado",
    icone: "fa-building",
    taxaAnual: 0.1535,
    risco: "Médio",
    saqueImediato: false,
    resgate: "No vencimento",
    minimo: "Cerca de R$ 1.000",
    impostoRenda: "Isento",
    garantia: "Nenhuma: depende de quem deve pagar",
    explicacao:
      "Você financia dívidas ligadas a imóveis (CRI) ou ao agronegócio (CRA), em torno de CDI + 1,5% ao ano. Paga mais porque o risco de calote é maior e não tem FGC.",
  },
];
