// =============================================================
// FinProsper — Glossário
// Pílulas de categoria e filtro do glossário (acordeão do Bootstrap)
// =============================================================

// ---------- Pílulas de categoria ----------
function marcarPilula(categoria) {
  $(".pagina-noticias .filter-pill").removeClass(
    "active-pill fp-bg-primary fp-text-on-primary fp-shadow-sm",
  );
  $(".pagina-noticias .filter-pill").addClass(
    "fp-bg-surface-container fp-text-on-surface-variant",
  );
  $(".pagina-noticias [data-category='" + categoria + "']").removeClass(
    "fp-bg-surface-container fp-text-on-surface-variant",
  );
  $(".pagina-noticias [data-category='" + categoria + "']").addClass(
    "active-pill fp-bg-primary fp-text-on-primary fp-shadow-sm",
  );
}

function ligarPilula(categoria) {
  $(".pagina-noticias [data-category='" + categoria + "']").click(function () {
    marcarPilula(categoria);
  });
}

// ---------- Filtro do glossário ----------
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

$(document).ready(function () {
  ligarPilula("all");
  ligarPilula("selic");
  ligarPilula("inflacao");
  ligarPilula("dividas");
  ligarPilula("renda-fixa");
  ligarPilula("orcamento");
});
