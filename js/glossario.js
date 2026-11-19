// =============================================================
// FinProsper — Glossário
// Monta a lista de termos a partir do array "termos" (termos.js),
// agrupada por letra, e cuida da busca, dos filtros por categoria,
// do índice A-Z, do contador e de abrir um termo pelo endereço
// (ex.: glossario.html#termo-selic).
// =============================================================

var CATEGORIAS = {
  basico: "Conceitos básicos",
  taxas: "Juros e índices",
  investimentos: "Investimentos",
  regras: "Regras e impostos",
  dividas: "Crédito e dívidas",
};

var PAGINAS = {
  inicio: { nome: "Início", link: "../index.html" },
  simulador: { nome: "Simulador", link: "solucao.html" },
  impacto: { nome: "Impacto", link: "impacto.html" },
  equipe: { nome: "Equipe", link: "equipe.html" },
};

var categoriaAtual = "todas";
var letras = []; // letras que têm pelo menos um termo

// ---------- Apoio ----------

// "Taxa ao ano (% a.a.)" -> "taxa-ao-ano-a-a"
function criarId(texto) {
  var base = normalizar(texto);
  var resultado = "";
  var ultimoFoiTraco = true;
  for (var i = 0; i < base.length; i++) {
    var letra = base.substring(i, i + 1);
    var ehLetraOuNumero =
      (letra >= "a" && letra <= "z") || (letra >= "0" && letra <= "9");
    if (ehLetraOuNumero) {
      resultado = resultado + letra;
      ultimoFoiTraco = false;
    } else if (!ultimoFoiTraco) {
      resultado = resultado + "-";
      ultimoFoiTraco = true;
    }
  }
  if (resultado.substring(resultado.length - 1) == "-") {
    resultado = resultado.substring(0, resultado.length - 1);
  }
  return resultado;
}

// Primeira letra do termo, em maiúscula e sem acento
function letraDoTermo(termo) {
  return normalizar(termo.nome.substring(0, 1)).toUpperCase();
}

// ---------- Montagem da lista (DOM) ----------

function montarOndeAparece(termo) {
  var links = [];
  for (var i = 0; i < termo.paginas.length; i++) {
    var pagina = PAGINAS[termo.paginas[i]];
    links.push(`<a href="${pagina.link}">${pagina.nome}</a>`);
  }
  if (termo.guia) {
    links.push(`<a href="#guia-${termo.guia}">Guia · tópico ${termo.guia}</a>`);
  }
  if (links.length == 0) {
    return "";
  }
  return `
        <p class="glo-onde">
          <i aria-hidden="true" class="fa-solid fa-book-open fp-icon"></i>
          <span>Aparece em:</span> ${links.join("")}
        </p>`;
}

function montarTermo(termo) {
  var sigla = "";
  if (termo.sigla) {
    sigla = `<p class="glo-sigla">${termo.sigla}</p>`;
  }
  var exemplo = "";
  if (termo.exemplo) {
    exemplo = `
        <p class="glo-exemplo">
          <i aria-hidden="true" class="fa-solid fa-lightbulb fp-icon"></i>
          <span><strong>Exemplo:</strong> ${termo.exemplo}</span>
        </p>`;
  }
  return `
    <div class="col glo-item" id="item-${termo.id}">
      <article class="glo-termo" id="termo-${termo.id}">
        <h4>
          <button
            class="glo-termo-botao collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#def-${termo.id}"
            aria-expanded="false"
            aria-controls="def-${termo.id}"
          >
            <span class="glo-termo-nome">${termo.nome}</span>
            <span class="glo-categoria glo-cat-${termo.categoria}">${CATEGORIAS[termo.categoria]}</span>
            <i aria-hidden="true" class="fa-solid fa-chevron-down fp-icon glo-seta"></i>
          </button>
        </h4>
        <div class="collapse" id="def-${termo.id}">
          <div class="glo-termo-corpo">
            ${sigla}
            <p class="glo-definicao">${termo.definicao}</p>
            ${exemplo}
            ${montarOndeAparece(termo)}
          </div>
        </div>
      </article>
    </div>`;
}

function montarGlossario() {
  // ordem alfabética (sem diferenciar acentos)
  termos.sort(function (a, b) {
    return normalizar(a.nome) < normalizar(b.nome) ? -1 : 1;
  });

  var html = "";
  var letraAnterior = "";
  for (var i = 0; i < termos.length; i++) {
    var termo = termos[i];
    termo.id = criarId(termo.nome);
    termo.letra = letraDoTermo(termo);
    // a busca olha o nome, a sigla e as palavras-chave (não a explicação inteira,
    // para "selic" não trazer todo termo que só cita a Selic)
    termo.textoBusca = normalizar(
      termo.nome + " " + (termo.sigla || "") + " " + (termo.busca || ""),
    );

    if (termo.letra != letraAnterior) {
      if (letraAnterior != "") {
        html += "</div></section>";
      }
      letras.push(termo.letra);
      html += `
        <section class="glo-grupo" id="letra-${termo.letra}" aria-labelledby="titulo-letra-${termo.letra}">
          <h3 class="glo-letra" id="titulo-letra-${termo.letra}">${termo.letra}</h3>
          <div class="row row-cols-1 row-cols-lg-2 g-3 align-items-start">`;
      letraAnterior = termo.letra;
    }
    html += montarTermo(termo);
  }
  html += "</div></section>";
  $("#glossario-lista").html(html);
}

// ---------- Filtro (busca + categoria) ----------

function termoCombina(termo, palavras) {
  if (categoriaAtual != "todas" && termo.categoria != categoriaAtual) {
    return false;
  }
  for (var i = 0; i < palavras.length; i++) {
    if (palavras[i] != "" && termo.textoBusca.indexOf(palavras[i]) == -1) {
      return false;
    }
  }
  return true;
}

function filtrarGlossario() {
  var busca = normalizar(aparar($("#glossarySearchInput").val()));
  var palavras = busca.split(" ");
  var visiveis = 0;
  var letrasVisiveis = {};

  for (var i = 0; i < termos.length; i++) {
    var termo = termos[i];
    if (termoCombina(termo, palavras)) {
      $("#item-" + termo.id).removeClass("d-none");
      letrasVisiveis[termo.letra] = true;
      visiveis++;
    } else {
      $("#item-" + termo.id).addClass("d-none");
    }
  }

  // grupos de letra e índice A-Z só com as letras que sobraram
  var indice = "";
  for (var j = 0; j < letras.length; j++) {
    var letra = letras[j];
    if (letrasVisiveis[letra]) {
      $("#letra-" + letra).removeClass("d-none");
      indice += `<a href="#letra-${letra}">${letra}</a>`;
    } else {
      $("#letra-" + letra).addClass("d-none");
    }
  }
  $("#glo-letras").html(indice);

  // contador
  if (visiveis == termos.length) {
    $("#glo-contador").text(`${termos.length} termos no glossário`);
  } else if (visiveis == 1) {
    $("#glo-contador").text(`1 termo encontrado de ${termos.length}`);
  } else {
    $("#glo-contador").text(
      `${visiveis} termos encontrados de ${termos.length}`,
    );
  }

  // mensagem de nada encontrado e botão de limpar busca
  if (visiveis == 0) {
    $("#glo-vazio").removeClass("d-none");
    $("#glo-acoes").addClass("d-none");
  } else {
    $("#glo-vazio").addClass("d-none");
    $("#glo-acoes").removeClass("d-none");
  }
  if (busca == "") {
    $("#glo-limpar").addClass("d-none");
  } else {
    $("#glo-limpar").removeClass("d-none");
  }
}

function escolherCategoria(categoria) {
  categoriaAtual = categoria;
  $(".glo-filtro").attr("aria-pressed", "false");
  $(".glo-filtro[data-categoria='" + categoria + "']").attr(
    "aria-pressed",
    "true",
  );
  filtrarGlossario();
}

function limparFiltros() {
  $("#glossarySearchInput").val("");
  escolherCategoria("todas");
}

// ---------- Abrir e fechar definições ----------

function mostrarDefinicoes(abrir) {
  $(".glo-item:not(.d-none) .collapse").each(function () {
    var painel = bootstrap.Collapse.getOrCreateInstance(this, {
      toggle: false,
    });
    if (abrir) {
      painel.show();
    } else {
      painel.hide();
    }
  });
}

// Abre o termo indicado no endereço (glossario.html#termo-selic)
function abrirTermoDoEndereco() {
  var endereco = window.location.hash;
  if (endereco.indexOf("#termo-") != 0) {
    return;
  }
  var cartao = document.getElementById(endereco.substring(1));
  if (!cartao) {
    return;
  }
  if ($(cartao).closest(".glo-item").hasClass("d-none")) {
    limparFiltros();
  }
  bootstrap.Collapse.getOrCreateInstance($(cartao).find(".collapse")[0], {
    toggle: false,
  }).show();
  cartao.scrollIntoView({ block: "start" });
  $(cartao).find(".glo-termo-botao").focus({ preventScroll: true });
}

$(document).ready(function () {
  montarGlossario();
  filtrarGlossario();

  $("#glossarySearchInput").on("input", filtrarGlossario);
  $("#glo-limpar").click(function () {
    $("#glossarySearchInput").val("").focus();
    filtrarGlossario();
  });
  $("#glo-limpar-tudo").click(limparFiltros);

  $(".glo-filtro").click(function () {
    escolherCategoria($(this).attr("data-categoria"));
  });

  $("#glo-abrir-todos").click(function () {
    mostrarDefinicoes(true);
  });
  $("#glo-fechar-todos").click(function () {
    mostrarDefinicoes(false);
  });

  abrirTermoDoEndereco();
  $(window).on("hashchange", abrirTermoDoEndereco);
});
