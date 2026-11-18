// =============================================================
// FinProsper — Glossário
// Filtro do glossário (acordeão do Bootstrap)
// =============================================================

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
