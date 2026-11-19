// =============================================================
// FinProsper — Equipe & Sobre
// Formulário de sugestões, com verificação dos campos
// (somente JavaScript básico: variáveis, laços, if/else e métodos
//  de string, como em funcoes.js)
// =============================================================

var MINIMO_MENSAGEM = 20;
var MAXIMO_MENSAGEM = 500;

// caracteres aceitos em cada parte do e-mail (nome@dominio.com)
var CARACTERES_USUARIO = "abcdefghijklmnopqrstuvwxyz0123456789._%+-";
var CARACTERES_DOMINIO = "abcdefghijklmnopqrstuvwxyz0123456789.-";
var LETRAS = "abcdefghijklmnopqrstuvwxyz";

// campos já visitados: o erro só aparece depois que a pessoa sai do campo
// ou tenta enviar, e não enquanto ainda está digitando pela primeira vez
var camposTocados = {};

// ---------- Funções de apoio ----------

// true se todos os caracteres do texto estão na lista de permitidos
function soTemCaracteres(texto, permitidos) {
  for (var i = 0; i < texto.length; i++) {
    if (permitidos.indexOf(texto.substring(i, i + 1)) == -1) {
      return false;
    }
  }
  return true;
}

// Separa o texto em palavras, ignorando espaços repetidos
function separarPalavras(texto) {
  var partes = aparar(texto).split(" ");
  var palavras = [];
  for (var i = 0; i < partes.length; i++) {
    if (partes[i] != "") {
      palavras.push(partes[i]);
    }
  }
  return palavras;
}

// ---------- Regras de cada campo ----------
// Cada função devolve "" se o valor está certo ou a mensagem de erro.

function verificarNome(valor) {
  var palavras = separarPalavras(valor);
  if (palavras.length == 0) {
    return "Digite o seu nome completo.";
  }
  // letras (com ou sem acento), hífen e apóstrofo: "Ana-Clara", "D'Ávila"
  var texto = normalizar(palavras.join(""));
  if (!soTemCaracteres(texto, LETRAS + "-'")) {
    return "O nome deve ter apenas letras.";
  }
  if (palavras.length < 2) {
    return "Digite nome e sobrenome.";
  }
  return "";
}

function verificarEmail(valor) {
  var email = aparar(valor).toLowerCase();
  if (email == "") {
    return "Digite o seu e-mail.";
  }
  if (email.indexOf(" ") != -1) {
    return "O e-mail não pode ter espaços.";
  }

  var arroba = email.indexOf("@");
  if (arroba == -1) {
    return "O e-mail precisa ter @. Exemplo: nome@email.com";
  }
  if (email.indexOf("@", arroba + 1) != -1) {
    return "O e-mail deve ter apenas um @.";
  }

  var usuario = email.substring(0, arroba);
  var dominio = email.substring(arroba + 1);

  // parte antes do @
  if (usuario == "") {
    return "Falta o nome antes do @. Exemplo: nome@email.com";
  }
  if (!soTemCaracteres(usuario, CARACTERES_USUARIO)) {
    return "O e-mail tem caracteres inválidos antes do @.";
  }
  if (
    usuario.substring(0, 1) == "." ||
    usuario.substring(usuario.length - 1) == "." ||
    usuario.indexOf("..") != -1
  ) {
    return "O e-mail tem pontos em posição inválida antes do @.";
  }

  // parte depois do @
  if (dominio == "") {
    return "Falta o domínio depois do @. Exemplo: nome@email.com";
  }
  if (!soTemCaracteres(dominio, CARACTERES_DOMINIO)) {
    return "O domínio do e-mail tem caracteres inválidos.";
  }
  var ultimoPonto = dominio.lastIndexOf(".");
  if (ultimoPonto == -1) {
    return "O domínio precisa ter um ponto. Exemplo: email.com";
  }
  if (
    dominio.substring(0, 1) == "." ||
    dominio.substring(0, 1) == "-" ||
    dominio.indexOf("..") != -1 ||
    dominio.indexOf(".-") != -1 ||
    dominio.indexOf("-.") != -1
  ) {
    return "O domínio do e-mail está incompleto ou mal escrito.";
  }
  // final do domínio (.org, .com, .br): só letras e pelo menos 2
  var final = dominio.substring(ultimoPonto + 1);
  if (final.length < 2 || !soTemCaracteres(final, LETRAS)) {
    return "O final do e-mail está incompleto. Exemplo: .com, .org ou .br";
  }
  return "";
}

function verificarMensagem(valor) {
  var texto = aparar(valor);
  if (texto == "") {
    return "Escreva a sua sugestão.";
  }
  if (texto.length < MINIMO_MENSAGEM) {
    var faltam = MINIMO_MENSAGEM - texto.length;
    return `Escreva pelo menos ${MINIMO_MENSAGEM} caracteres (faltam ${faltam}).`;
  }
  return "";
}

function verificarLgpd() {
  if (!document.getElementById("lgpd-agree").checked) {
    return "É preciso concordar com os termos da LGPD para enviar.";
  }
  return "";
}

// ---------- Mostrar e esconder erros ----------

// Lista dos campos: id do elemento e a função que verifica o valor
var CAMPOS = [
  { id: "contact-name", verificar: verificarNome },
  { id: "contact-email", verificar: verificarEmail },
  { id: "contact-message", verificar: verificarMensagem },
  { id: "lgpd-agree", verificar: verificarLgpd },
];

function mostrarErro(id, mensagem) {
  var campo = $("#" + id);
  var erro = $("#erro-" + id);
  if (mensagem == "") {
    campo.removeClass("equipe-campo-invalido");
    campo.removeAttr("aria-invalid");
    erro.addClass("d-none");
    erro.find("span").text("");
  } else {
    campo.addClass("equipe-campo-invalido");
    campo.attr("aria-invalid", "true");
    erro.removeClass("d-none");
    erro.find("span").text(mensagem);
  }
}

// Verifica um campo e mostra (ou limpa) a mensagem. Devolve true se está certo.
function verificarCampo(campoInfo) {
  var mensagem = campoInfo.verificar($("#" + campoInfo.id).val());
  mostrarErro(campoInfo.id, mensagem);
  // quando não sobra nenhum erro, some o aviso geral
  if ($(".equipe-campo-invalido").length == 0) {
    $("#form-erros").addClass("d-none").text("");
  }
  return mensagem == "";
}

function atualizarContador() {
  var tamanho = $("#contact-message").val().length;
  var texto = `${tamanho}/${MAXIMO_MENSAGEM} caracteres`;
  if (aparar($("#contact-message").val()).length < MINIMO_MENSAGEM) {
    texto = texto + ` (mínimo ${MINIMO_MENSAGEM})`;
  }
  $("#contador-contact-message").text(texto);
}

// ---------- Envio ----------

function enviarSugestao(evento) {
  evento.preventDefault(); // não recarrega a página

  // verifica todos os campos e guarda o primeiro com erro
  var primeiroInvalido = "";
  var totalErros = 0;
  for (var i = 0; i < CAMPOS.length; i++) {
    camposTocados[CAMPOS[i].id] = true;
    if (!verificarCampo(CAMPOS[i])) {
      totalErros++;
      if (primeiroInvalido == "") {
        primeiroInvalido = CAMPOS[i].id;
      }
    }
  }

  if (totalErros > 0) {
    $("#form-feedback").addClass("d-none");
    var aviso = "Corrija o campo destacado para enviar a sugestão.";
    if (totalErros > 1) {
      aviso = `Corrija os ${totalErros} campos destacados para enviar a sugestão.`;
    }
    $("#form-erros").text(aviso).removeClass("d-none");
    document.getElementById(primeiroInvalido).focus();
    return;
  }

  // tudo certo: mostra a mensagem de sucesso
  $("#form-erros").addClass("d-none").text("");
  $("#form-feedback").removeClass("d-none");

  // limpa o formulário
  $("#contact-name").val("");
  $("#contact-email").val("");
  $("#contact-message").val("");
  document.getElementById("lgpd-agree").checked = false;
  camposTocados = {};
  atualizarContador();
}

// Liga os eventos de um campo: verifica ao sair dele e, depois disso,
// a cada alteração (o erro some assim que o valor fica certo)
function ligarCampo(campoInfo) {
  var campo = $("#" + campoInfo.id);
  campo.on("blur", function () {
    // não acusa erro em campo vazio que a pessoa só atravessou com o Tab
    if (campo.val() != "" || camposTocados[campoInfo.id]) {
      camposTocados[campoInfo.id] = true;
      verificarCampo(campoInfo);
    }
  });
  campo.on("input change", function () {
    $("#form-feedback").addClass("d-none");
    if (camposTocados[campoInfo.id]) {
      verificarCampo(campoInfo);
    }
  });
}

$(document).ready(function () {
  // todos menos o último (a caixa da LGPD, tratada logo abaixo)
  for (var i = 0; i < CAMPOS.length - 1; i++) {
    ligarCampo(CAMPOS[i]);
  }
  // a caixa da LGPD não tem texto: verifica assim que é marcada ou desmarcada
  $("#lgpd-agree").on("change", function () {
    $("#form-feedback").addClass("d-none");
    camposTocados["lgpd-agree"] = true;
    verificarCampo(CAMPOS[CAMPOS.length - 1]);
  });
  $("#contact-message").on("input", atualizarContador);
  atualizarContador();
});
