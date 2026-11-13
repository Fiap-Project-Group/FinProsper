// =============================================================
// FinProsper — Notícias & Glossário
// Mobile (tela-s4): busca, filtros, glossário rápido e leitura
// Desktop (tela-s8): filtros, glossário em acordeão e newsletter
// =============================================================

// ---------- MOBILE: glossário rápido ----------
function mostrarTermo(chave) {
  var titulo = "";
  var etiqueta = "";
  var descricao = "";
  switch (chave) {
    case "selic":
      titulo = "Taxa Selic";
      etiqueta = "Juros Básicos";
      descricao =
        "É a taxa básica de juros da economia brasileira definida pelo Copom. Ela influencia os juros de empréstimos, financiamentos e o retorno de investimentos em renda fixa.";
      break;
    case "cdi":
      titulo = "CDI (Certificado de Depósito Interbancário)";
      etiqueta = "Referência Bancária";
      descricao =
        "É o título emitido entre bancos para empréstimos de 1 dia. Seu valor fica muito próximo à Selic e é o índice mais usado para rentabilidade de CDBs e contas correntes remuneradas.";
      break;
    case "real":
      titulo = "Rentabilidade Real";
      etiqueta = "Poder de Compra";
      descricao =
        "É o ganho do seu investimento subtraído da inflação (IPCA). Se seu investimento rende 10% e a inflação é 4%, seu ganho real foi de aproximadamente 6%.";
      break;
  }
  $("#glossary-title").text(titulo);
  $("#glossary-tag").text(etiqueta);
  $("#glossary-desc").text(descricao);
}

// ---------- MOBILE: busca e filtros de artigos ----------
var categoriaAtiva = "all";
// categoria de cada artigo, na mesma ordem em que aparecem na página
var categoriasDosArtigos = [
  "selic",
  "dividas",
  "investimentos",
  "inflacao",
  "orcamento",
];

function aplicarFiltros() {
  var busca = normalizar(aparar($("#search-input").val()));
  var artigos = document.getElementsByClassName("article-card");
  var visiveis = 0;

  for (var i = 0; i < artigos.length; i++) {
    var texto = normalizar($(artigos[i]).text());
    var passaCategoria =
      categoriaAtiva == "all" || categoriasDosArtigos[i] == categoriaAtiva;
    var passaBusca = busca == "" || texto.indexOf(busca) != -1;

    if (passaCategoria && passaBusca) {
      $(artigos[i]).removeClass("d-none");
      visiveis++;
    } else {
      $(artigos[i]).addClass("d-none");
    }
  }

  if (visiveis == 1) {
    $("#articles-count").text("1 artigo");
  } else {
    $("#articles-count").text(`${visiveis} artigos`);
  }

  if (visiveis == 0) {
    $("#no-results-state").removeClass("d-none");
  } else {
    $("#no-results-state").addClass("d-none");
  }

  if (busca.length > 0) {
    $("#clear-search-btn").removeClass("d-none");
  } else {
    $("#clear-search-btn").addClass("d-none");
  }
}

function escolherCategoria(categoria) {
  $(".tela-s4 .filter-pill").removeClass(
    "active fp-bg-primary fp-text-on-primary",
  );
  $(".tela-s4 .filter-pill").addClass(
    "fp-bg-surface-container-low fp-text-on-surface-variant",
  );
  $("[data-filter='" + categoria + "']").removeClass(
    "fp-bg-surface-container-low fp-text-on-surface-variant",
  );
  $("[data-filter='" + categoria + "']").addClass(
    "active fp-bg-primary fp-text-on-primary",
  );
  categoriaAtiva = categoria;
  aplicarFiltros();
}

function ligarCategoria(categoria) {
  $("[data-filter='" + categoria + "']").click(function () {
    escolherCategoria(categoria);
  });
}

function limparFiltros() {
  $("#search-input").val("");
  escolherCategoria("all");
}

// ---------- MOBILE: janela de leitura (modal do Bootstrap) ----------
function abrirLeitura(titulo, resumo) {
  $("#modal-article-title").text(titulo);
  $("#modal-article-summary").text(resumo);
}

// ---------- DESKTOP: pílulas de categoria ----------
function marcarPilula(categoria) {
  $(".tela-s8 .filter-pill").removeClass(
    "active-pill fp-bg-primary fp-text-on-primary fp-shadow-sm",
  );
  $(".tela-s8 .filter-pill").addClass(
    "fp-bg-surface-container fp-text-on-surface-variant",
  );
  $(".tela-s8 [data-category='" + categoria + "']").removeClass(
    "fp-bg-surface-container fp-text-on-surface-variant",
  );
  $(".tela-s8 [data-category='" + categoria + "']").addClass(
    "active-pill fp-bg-primary fp-text-on-primary fp-shadow-sm",
  );
}

function ligarPilula(categoria) {
  $(".tela-s8 [data-category='" + categoria + "']").click(function () {
    marcarPilula(categoria);
  });
}

// ---------- DESKTOP: filtro do glossário ----------
function filtrarGlossario() {
  var busca = normalizar(aparar($("#glossarySearchInput").val()));
  var termos = document.getElementsByClassName("glossary-item");
  for (var i = 0; i < termos.length; i++) {
    var texto = normalizar($(termos[i]).text());
    if (busca == "" || texto.indexOf(busca) != -1) {
      $(termos[i]).removeClass("d-none");
    } else {
      $(termos[i]).addClass("d-none");
    }
  }
}

// ---------- DESKTOP: newsletter ----------
function assinarNewsletter(evento) {
  evento.preventDefault();
  if ($("#newsletterEmail").val() != "") {
    $("#newsletterSuccess").removeClass("d-none");
    $("#newsletterEmail").val("");
  }
}

$(document).ready(function () {
  document
    .getElementById("search-input")
    .addEventListener("keyup", aplicarFiltros);
  document
    .getElementById("search-input")
    .addEventListener("change", aplicarFiltros);

  $("#clear-search-btn").click(function () {
    $("#search-input").val("");
    aplicarFiltros();
  });

  ligarCategoria("all");
  ligarCategoria("selic");
  ligarCategoria("inflacao");
  ligarCategoria("dividas");
  ligarCategoria("investimentos");
  ligarCategoria("orcamento");

  ligarPilula("all");
  ligarPilula("selic");
  ligarPilula("inflacao");
  ligarPilula("dividas");
  ligarPilula("renda-fixa");
  ligarPilula("orcamento");
});
