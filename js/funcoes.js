// =============================================================
// FinProsper — funções de apoio usadas por várias páginas
// (somente JavaScript básico: variáveis, laços, if/else,
//  operadores aritméticos e métodos de string)
// =============================================================

// Coloca o ponto de milhar em um número inteiro: 1234567 -> "1.234.567"
function separarMilhar(inteiro) {
  var texto = "" + inteiro;
  var resultado = "";
  var contador = 0;
  for (var i = texto.length - 1; i >= 0; i--) {
    resultado = texto.substring(i, i + 1) + resultado;
    contador++;
    if (contador % 3 == 0 && i > 0) {
      resultado = "." + resultado;
    }
  }
  return resultado;
}

// Formata um número com "casas" casas decimais no padrão brasileiro: 1234.5 -> "1.234,50"
function formatarNumero(valor, casas) {
  var sinal = "";
  if (valor < 0) {
    sinal = "-";
    valor = -valor;
  }
  var fator = 10 ** casas;
  var total = valor * fator + 0.5; // + 0,5 para arredondar
  total = total - (total % 1); // tira a parte quebrada
  var parteDecimal = total % fator;
  var parteInteira = (total - parteDecimal) / fator;
  var texto = sinal + separarMilhar(parteInteira);
  if (casas > 0) {
    var decimais = "" + parteDecimal;
    while (decimais.length < casas) {
      decimais = "0" + decimais;
    }
    texto = texto + "," + decimais;
  }
  return texto;
}

// Formata como moeda: 1234.5 -> "R$ 1.234,50"
function formatarMoeda(valor, casas) {
  return "R$ " + formatarNumero(valor, casas);
}

// Lê um valor digitado no formato brasileiro ("5.500,00" ou "R$ 5.500,00") e devolve o número
function lerMoeda(texto) {
  texto = texto.replace("R$", "");
  while (texto.indexOf(" ") != -1) {
    texto = texto.replace(" ", "");
  }
  while (texto.indexOf(".") != -1) {
    texto = texto.replace(".", "");
  }
  texto = texto.replace(",", ".");
  return parseFloat(texto) || 0;
}

// Remove espaços do início e do fim de um texto
function aparar(texto) {
  while (texto.length > 0 && texto.substring(0, 1) == " ") {
    texto = texto.substring(1, texto.length);
  }
  while (
    texto.length > 0 &&
    texto.substring(texto.length - 1, texto.length) == " "
  ) {
    texto = texto.substring(0, texto.length - 1);
  }
  return texto;
}

// Deixa o texto em minúsculas e sem acentos, para comparar buscas
// ("Inflação" e "inflacao" passam a ser iguais)
var LETRAS_ORIGINAIS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç";
var LETRAS_TROCADAS = "abcdefghijklmnopqrstuvwxyzaaaaeeiooouc" + "aaaaeeiooouc";

function normalizar(texto) {
  var resultado = "";
  for (var i = 0; i < texto.length; i++) {
    var letra = texto.substring(i, i + 1);
    var posicao = LETRAS_ORIGINAIS.indexOf(letra);
    if (posicao != -1) {
      letra = LETRAS_TROCADAS.substring(posicao, posicao + 1);
    }
    resultado = resultado + letra;
  }
  return resultado;
}
