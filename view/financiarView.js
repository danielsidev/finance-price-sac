let {financiar} = require("../controller/financiarController");
let $ = require("jquery");
$(function() {
  $('#simulador').on('submit', function (event) {
    event.preventDefault();//Para não fazer refresh
  });

  let simular = function(){
    let valor    = $("#valor").val();//vP
    let taxa     = $("#taxa").val();//i
    let parcelas = $("#parcelas").val();//n
     if(valor!=="" && taxa!==""    && parcelas!=="" ){

        let simuladorA = new financiar(valor, taxa, parcelas);
            simuladorA.tratarMascaraReal();/* Remove a máscara de R$ */
            simuladorA.formataDados(); /* Faz as conversões para Int e Float */
              $("#resultado").html("");
              $("#resultado").append("<h2>SIMULAÇÃO PRICE ( Prestação Fixa )</h2><br>");
              $("#resultado").append("Valor da Prestação é: "+simuladorA.financiarPrice()+"<hr>");
              $("#resultado").append("Valor Total do Financiamento Pago é: "+simuladorA.calculaTotalPagoPrice()+"<hr>");
              $("#resultado").append("Valor Total de Juros Pago é: "+simuladorA.calculaTotalJurosPrice()+"<hr>");
              $("#resultado").append("<h2>SIMULAÇÃO SAC ( Prestação Decrescente )</h2>");
       let simuladorB = new financiar(valor, taxa, parcelas);
           simuladorB.tratarMascaraReal();/* Remove a máscara de R$ */
           simuladorB.formataDados(); /* Faz as conversões para Int e Float */
           simuladorB.financiarSac();/* Faz a simulação Sac e constrói a lista de prestações */
              $("#resultado").append("<div class='parcelas-sac'>Os Valores das Prestações são: <br><br>"+simuladorB.listaSacHTML+"</div><hr>");
              $("#resultado").append("Valor Total do Financiamento Pago é: "+simuladorB.calculaTotalPagoSac()+"<hr>");
              $("#resultado").append("Valor Total de Juros Pago é: "+simuladorB.calculaTotalJurosSac()+"<hr>");
     }else{
         alert("Preencha o valor, a taxa e as parcelas!");
     }
  };
  $(document).keypress(function(e) {
     if(e.which == 13) {
       $("#simulador").submit();
       simular();
     }
   });

   $("#simular").click(function(){
     simular();
   });

  /* Mock para teste no console */
  // $("#simular").click(function(){
  //   let simuladorA = new financiar("50.000,00", "1,00", "60");
  //   simuladorA.tratarMascaraReal();/* Remove a máscara de R$ */
  //   simuladorA.formataDados(); /* Faz as conversões para Int e Float */
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE PRICE ----------------- INI");
  //   console.log("Valor da Prestação é: "+simuladorA.financiarPrice());
  //   console.log("Valor Total do Financiamento Pago é: "+simuladorA.calculaTotalPagoPrice());
  //   console.log("Valor Total de Juros Pago é: "+simuladorA.calculaTotalJurosPrice());
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE PRICE ----------------- FIM");
  //
  //   console.log("----------------- |||||||||||||||||||||||||||||||| ----------------- FIM");
  //
  //   let simuladorB = new financiar("50.000,00", "1,00", "60");
  //   simuladorB.tratarMascaraReal();/* Remove a máscara de R$ */
  //   simuladorB.formataDados(); /* Faz as conversões para Int e Float */
  //   simuladorB.financiarSac();/* Faz a simulação Sac e constrói a lista de prestações */
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE SAC ----------------- INI");
  //   console.log("Os Valores das Prestações são: \n\r"+simuladorB.listaSacText);
  //   console.log("Valor Total do Financiamento Pago é: "+simuladorB.calculaTotalPagoSac());
  //   console.log("Valor Total de Juros Pago é: "+simuladorB.calculaTotalJurosSac());
  //   console.log("----------------- SIMULAÇÃO DE FINANCIAMENTE SAC ----------------- FIM");
  // });




});
