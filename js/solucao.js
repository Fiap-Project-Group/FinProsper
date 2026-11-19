// =============================================================
// FinProsper — Simulador de investimentos (pages/solucao.html)
// Lê as respostas da pessoa, percorre o array "investimentos"
// (js/investimentos.js) e monta um cartão para cada item na página.
// =============================================================

// Prazos que aparecem como opção (em anos)
var PRAZOS = [1, 3, 5, 10, 20];

// Lê um campo numérico; vazio ou negativo vira 0
function lerValor(id) {
  var valor = parseFloat($("#" + id).val()) || 0;
  if (valor < 0) {
    valor = 0;
  }
  return valor;
}

// Descobre qual prazo está marcado
function prazoEscolhido() {
  for (var i = 0; i < PRAZOS.length; i++) {
    if (document.getElementById("prazo-" + PRAZOS[i]).checked) {
      return PRAZOS[i];
    }
  }
  return 5;
}

function textoDoPrazo(anos) {
  if (anos == 1) {
    return "1 ano";
  }
  return `${anos} anos`;
}

// Juros compostos com depósitos mensais:
// cada mês o saldo rende e recebe o novo depósito
function calcularMontante(inicial, mensal, taxaAnual, meses) {
  var taxaMensal = (1 + taxaAnual) ** (1 / 12) - 1;
  var saldo = inicial;
  for (var i = 0; i < meses; i++) {
    saldo = saldo * (1 + taxaMensal) + mensal;
  }
  return saldo;
}

// Classe de cor da etiqueta de risco
function classeDoRisco(risco) {
  switch (risco) {
    case "Baixo":
      return "sim-risco-baixo";
    case "Médio":
      return "sim-risco-medio";
    default:
      return "sim-risco-alto";
  }
}

// Monta o HTML de um cartão a partir de um objeto do array
function montarCartao(inv, posicao, anos, totalGuardado, montante) {
  var taxaTexto = formatarNumero(inv.taxaAnual * 100, 2) + "% ao ano";
  var rendimento = montante - totalGuardado;
  var textoRendimento = "Não rendeu nada";
  if (rendimento > 0.5) {
    textoRendimento = "Rendeu " + formatarMoeda(rendimento, 0);
  }
  var resultado = `
      <p class="sim-cartao-rotulo">Em ${textoDoPrazo(anos)} você teria</p>
      <p class="sim-cartao-valor">${formatarMoeda(montante, 0)}</p>
      <div class="sim-barra" aria-hidden="true">
        <div class="sim-barra-preenchida" id="barra-${posicao}"></div>
      </div>
      <p class="sim-cartao-detalhe">
        Você guardou ${formatarMoeda(totalGuardado, 0)} ·
        <strong>${textoRendimento}</strong>
      </p>`;

  return `
    <article class="sim-cartao">
      <div class="sim-cartao-topo">
        <span class="sim-cartao-icone">
          <i aria-hidden="true" class="fa-solid ${inv.icone} fp-icon"></i>
        </span>
        <div class="sim-cartao-titulo">
          <h3 class="sim-cartao-nome">${inv.nome}</h3>
          <p class="sim-cartao-categoria">${inv.categoria}</p>
        </div>
        <span class="sim-risco ${classeDoRisco(inv.risco)}">Risco ${inv.risco}</span>
      </div>
      ${resultado}
      <p class="sim-cartao-explicacao">${inv.explicacao}</p>
      <ul class="sim-cartao-dados">
        <li><span>Taxa usada</span><strong>${taxaTexto}</strong></li>
        <li><span>Quando posso sacar</span><strong>${inv.resgate}</strong></li>
        <li><span>A partir de</span><strong>${inv.minimo}</strong></li>
        <li><span>Imposto de Renda</span><strong>${inv.impostoRenda}</strong></li>
        <li><span>Garantia</span><strong>${inv.garantia}</strong></li>
      </ul>
    </article>`;
}

// Recalcula tudo e monta a lista na página
function atualizarSimulacao() {
  var mensal = lerValor("valor-mensal");
  var inicial = lerValor("valor-inicial");
  var anos = prazoEscolhido();
  var meses = anos * 12;
  var totalGuardado = inicial + mensal * meses;

  var soBaixoRisco = document.getElementById("filtro-risco").checked;
  var soSaqueImediato = document.getElementById("filtro-saque").checked;

  // 1) calcula o montante de cada investimento e acha o maior
  var montantes = [];
  var maiorMontante = 0;
  for (var i = 0; i < investimentos.length; i++) {
    var montante = calcularMontante(inicial, mensal, investimentos[i].taxaAnual, meses);
    montantes[i] = montante;
    if (montante > maiorMontante) {
      maiorMontante = montante;
    }
  }

  // 2) monta os cartões, respeitando os filtros
  $("#lista-investimentos").html("");
  var visiveis = 0;
  for (var j = 0; j < investimentos.length; j++) {
    var inv = investimentos[j];
    var mostrar = true;
    if (soBaixoRisco && inv.risco != "Baixo") {
      mostrar = false;
    }
    if (soSaqueImediato && inv.saqueImediato == false) {
      mostrar = false;
    }
    if (mostrar) {
      $("#lista-investimentos").append(montarCartao(inv, j, anos, totalGuardado, montantes[j]));
      if (maiorMontante > 0) {
        var largura = (montantes[j] / maiorMontante) * 100;
        $("#barra-" + j).css("width", largura + "%");
      }
      visiveis++;
    }
  }
  $("#contador").text(`Mostrando ${visiveis} de ${investimentos.length} investimentos`);

  // 3) resumo e destaque
  if (totalGuardado == 0) {
    $("#resumo").text("Digite quanto você consegue guardar por mês para ver a simulação.");
    $("#destaque").html("");
    return;
  }

  var textoResumo = `Guardando ${formatarMoeda(mensal, 0)} por mês durante ${textoDoPrazo(anos)} (${meses} meses), você vai tirar do bolso ${formatarMoeda(totalGuardado, 0)} no total`;
  if (inicial > 0) {
    textoResumo = textoResumo + `, contando os ${formatarMoeda(inicial, 0)} que você já tem`;
  }
  $("#resumo").text(textoResumo + ".");

  // opção de baixo risco que mais rende e valor da poupança
  var melhor = -1;
  var poupanca = 0;
  for (var k = 0; k < investimentos.length; k++) {
    if (investimentos[k].nome == "Poupança") {
      poupanca = montantes[k];
    }
    if (investimentos[k].risco == "Baixo") {
      if (melhor == -1 || montantes[k] > montantes[melhor]) {
        melhor = k;
      }
    }
  }
  var aMais = montantes[melhor] - poupanca;

  $("#destaque").html(`
    <i aria-hidden="true" class="fa-solid fa-lightbulb fp-icon sim-destaque-icone"></i>
    <p>
      Parado na conta, o seu dinheiro continua <strong>${formatarMoeda(totalGuardado, 0)}</strong>
      — e perde valor com a inflação. Na poupança, ele vira
      <strong>${formatarMoeda(poupanca, 0)}</strong>. Entre as opções de baixo risco, quem
      rende mais é <strong>${investimentos[melhor].nome}</strong>:
      <strong>${formatarMoeda(montantes[melhor], 0)}</strong>, ou
      <strong>${formatarMoeda(aMais, 0)} a mais</strong> do que na poupança.
    </p>`);
}

// ---------- Ajuda: regra 50/30/20 ----------
var valorSugerido = 0;

function calcularSugestao() {
  var renda = lerValor("renda-mensal");
  valorSugerido = renda * 0.2;
  valorSugerido = valorSugerido - (valorSugerido % 1); // sem centavos
  if (renda > 0) {
    $("#resultado-503020").html(
      `Com renda de ${formatarMoeda(renda, 0)}, o ideal é guardar
      <strong>${formatarMoeda(valorSugerido, 0)} por mês</strong>.`,
    );
    $("#usar-503020").removeClass("d-none");
  } else {
    $("#resultado-503020").html("");
    $("#usar-503020").addClass("d-none");
  }
}

// Liga um botão de valor sugerido (R$ 50, R$ 100...) ao campo
function ligarAtalho(valor) {
  $("#atalho-" + valor).click(function () {
    $("#valor-mensal").val(valor);
    atualizarSimulacao();
  });
}

// Liga uma opção de prazo à simulação
function ligarPrazo(anos) {
  document.getElementById("prazo-" + anos).addEventListener("change", atualizarSimulacao);
}

$(document).ready(function () {
  document.getElementById("valor-mensal").addEventListener("keyup", atualizarSimulacao);
  document.getElementById("valor-mensal").addEventListener("change", atualizarSimulacao);
  document.getElementById("valor-inicial").addEventListener("keyup", atualizarSimulacao);
  document.getElementById("valor-inicial").addEventListener("change", atualizarSimulacao);

  ligarAtalho(50);
  ligarAtalho(100);
  ligarAtalho(200);
  ligarAtalho(500);

  for (var i = 0; i < PRAZOS.length; i++) {
    ligarPrazo(PRAZOS[i]);
  }

  $("#filtro-risco").click(atualizarSimulacao);
  $("#filtro-saque").click(atualizarSimulacao);

  $("#abrir-ajuda").click(function () {
    $("#ajuda-503020").toggleClass("d-none");
  });
  document.getElementById("renda-mensal").addEventListener("keyup", calcularSugestao);
  document.getElementById("renda-mensal").addEventListener("change", calcularSugestao);
  $("#usar-503020").click(function () {
    $("#valor-mensal").val(valorSugerido);
    $("#ajuda-503020").addClass("d-none");
    atualizarSimulacao();
  });

  atualizarSimulacao();
});
