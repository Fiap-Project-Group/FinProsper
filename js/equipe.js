// =============================================================
// FinProsper — Equipe & Sobre
// Formulário de proposta de parceria (versão desktop)
// =============================================================
var naturezaInicial = "";

function enviarProposta(evento) {
  evento.preventDefault(); // não recarrega a página

  // mostra a mensagem de sucesso
  $("#form-feedback").removeClass("d-none");

  // limpa o formulário
  $("#contact-name").val("");
  $("#contact-email").val("");
  $("#contact-org").val("");
  $("#contact-message").val("");
  $("#contact-nature").val(naturezaInicial);
  document.getElementById("lgpd-agree").checked = false;
}

$(document).ready(function () {
  naturezaInicial = $("#contact-nature").val();
});
