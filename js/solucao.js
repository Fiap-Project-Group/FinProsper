// =============================================================
// FinProsper — Solução & Simulador
// Simulador de juros compostos (página única e responsiva)
// =============================================================

// ---------- Simulador de juros compostos ----------
var taxaAtual = 12.0;
var textoBotaoSalvar = "";
var simulacaoSalva = false;

function calcularJuros() {
  var inicial = parseFloat($("#initial-val").val()) || 0;
  var mensal = parseFloat($("#monthly-val").val()) || 0;
  var anos = parseFloat($("#years-val").val()) || 1;
  var meses = anos * 12;
  $("#months-calc").text(`(${meses} meses)`);

  // Juros compostos: taxa anual convertida para mensal
  var taxaAnual = taxaAtual / 100;
  var taxaMensal = (1 + taxaAnual) ** (1 / 12) - 1;
  var fator = (1 + taxaMensal) ** meses;
  var totalAcumulado = inicial * fator + mensal * ((fator - 1) / taxaMensal);

  var totalInvestido = inicial + mensal * meses;
  var totalJuros = totalAcumulado - totalInvestido;
  if (totalJuros < 0) {
    totalJuros = 0;
  }

  // Ganho real: desconta IPCA estimado de 4% ao ano
  var taxaRealAnual = (1 + taxaAnual) / 1.04 - 1;
  var taxaRealMensal = (1 + taxaRealAnual) ** (1 / 12) - 1;
  var fatorReal = (1 + taxaRealMensal) ** meses;
  var totalReal =
    inicial * fatorReal + mensal * ((fatorReal - 1) / taxaRealMensal);

  // Renda passiva estimada a 0,83% ao mês
  var rendaPassiva = totalAcumulado * 0.0083;

  $("#kpi-total-val").text(formatarMoeda(totalAcumulado, 0));
  $("#kpi-invested-val").text(formatarMoeda(totalInvestido, 0));
  $("#kpi-interest-val").text(formatarMoeda(totalJuros, 0));
  $("#kpi-real-val").text(formatarMoeda(totalReal, 0) + ",00");
  $("#kpi-passive-val").text(formatarMoeda(rendaPassiva, 0) + "/mês");

  // Se a simulação mudou, o botão "Salvar" volta ao normal
  if (simulacaoSalva) {
    $("#save-sim-btn").html(textoBotaoSalvar);
    $("#save-sim-btn").removeClass("fp-salvo");
    $("#save-sim-btn").addClass("fp-bg-blue-600");
    simulacaoSalva = false;
  }
}

// Mantém o campo numérico e o controle deslizante com o mesmo valor
function ligarCampoESlider(idCampo, idSlider) {
  var campo = document.getElementById(idCampo);
  var slider = document.getElementById(idSlider);
  slider.addEventListener("change", function () {
    $("#" + idCampo).val($("#" + idSlider).val());
    calcularJuros();
  });
  campo.addEventListener("keyup", function () {
    $("#" + idSlider).val($("#" + idCampo).val());
    calcularJuros();
  });
  campo.addEventListener("change", function () {
    $("#" + idSlider).val($("#" + idCampo).val());
    calcularJuros();
  });
}

function escolherTaxa(taxa) {
  var seletor = "[data-rate='" + taxa + "']";

  // desmarca todos os cartões
  $(".pagina-solucao .rate-card").removeClass(
    "fp-bg-blue-50 fp-border fp-border-blue-200",
  );
  $(".pagina-solucao .rate-card").addClass("fp-bg-surface-container-low");
  $(".pagina-solucao .rate-card span:first-child").removeClass("fp-text-blue-700");
  $(".pagina-solucao .rate-card span:first-child").addClass(
    "fp-text-on-surface-variant",
  );
  $(".pagina-solucao .rate-card span:nth-child(2)").removeClass("fp-text-blue-700");
  $(".pagina-solucao .rate-card span:nth-child(2)").addClass("fp-text-on-surface");

  // marca o escolhido
  $(seletor).removeClass("fp-bg-surface-container-low");
  $(seletor).addClass("fp-bg-blue-50 fp-border fp-border-blue-200");
  $(seletor + " span:first-child").removeClass("fp-text-on-surface-variant");
  $(seletor + " span:first-child").addClass("fp-text-blue-700");
  $(seletor + " span:nth-child(2)").removeClass("fp-text-on-surface");
  $(seletor + " span:nth-child(2)").addClass("fp-text-blue-700");

  taxaAtual = parseFloat(taxa);
  calcularJuros();
}

function ligarTaxa(taxa) {
  $("[data-rate='" + taxa + "']").click(function () {
    escolherTaxa(taxa);
  });
}

function escolherObjetivo(objetivo) {
  $(".pagina-solucao .objective-btn").removeClass(
    "fp-bg-blue-50 fp-text-blue-700 fp-border fp-border-blue-200 fw-semibold",
  );
  $(".pagina-solucao .objective-btn").addClass(
    "fp-bg-transparent fp-text-on-surface-variant",
  );
  $("[data-target='" + objetivo + "']").removeClass(
    "fp-bg-transparent fp-text-on-surface-variant",
  );
  $("[data-target='" + objetivo + "']").addClass(
    "fp-bg-blue-50 fp-text-blue-700 fp-border fp-border-blue-200 fw-semibold",
  );

  // valores sugeridos para cada objetivo
  var anos;
  var mensal;
  switch (objetivo) {
    case "reserva":
      anos = 2;
      mensal = 800;
      break;
    case "aposentadoria":
      anos = 25;
      mensal = 1800;
      break;
    case "imovel":
      anos = 5;
      mensal = 2200;
      break;
    default:
      anos = 10;
      mensal = 1400;
  }
  $("#years-val").val(anos);
  $("#slider-years").val(anos);
  $("#monthly-val").val(mensal);
  $("#slider-monthly").val(mensal);
  calcularJuros();
}

function ligarObjetivo(objetivo) {
  $("[data-target='" + objetivo + "']").click(function () {
    escolherObjetivo(objetivo);
  });
}

$(document).ready(function () {
  ligarCampoESlider("initial-val", "slider-initial");
  ligarCampoESlider("monthly-val", "slider-monthly");
  ligarCampoESlider("years-val", "slider-years");

  ligarTaxa("10.5");
  ligarTaxa("12.0");
  ligarTaxa("14.5");

  ligarObjetivo("liberdade");
  ligarObjetivo("reserva");
  ligarObjetivo("aposentadoria");
  ligarObjetivo("imovel");

  $("#toggle-inflation").click(calcularJuros);

  textoBotaoSalvar = $("#save-sim-btn").html();
  $("#save-sim-btn").click(function () {
    $("#save-sim-btn").html(
      '<i aria-hidden="true" class="fa-solid fa-check fp-icon fp-text-18px"></i><span>Simulação Salva!</span>',
    );
    $("#save-sim-btn").removeClass("fp-bg-blue-600");
    $("#save-sim-btn").addClass("fp-salvo");
    simulacaoSalva = true;
  });

  calcularJuros();
});
