"use strict"
class financiar{
    constructor(vP, i, n){
        this.pmt        = [];/* Prestação do Financiamento*/
        this.vP         = vP;/* Valor Presente(Valor do Financiamento) */
        this.i          = i;/* Taxa de Juros ( ao mês)*/
        this.n          = n;/* Número de Parcelas(Período)*/
        this.a          = 0;/* Amortização = Valor do Financiamento dividido pelo número de parcelas */
        this.totalJuros = 0;/* Total de juros pagos no financiamento*/
        this.totalPago  = 0;/* Total pago no financiamento acrescido os juros*/
        this.listaSacText=""; /* Armazena uma lista de texto puro com as prestações SAC*/
        this.listaSacHTML=""; /* Armazena uma lista de html com as prestações SAC*/

    }
    tratarMascaraReal(){
        let vp  = this.vP.replace(".","");
            vp  = vp.replace(",",".");
        this.vP = vp;

        let i = this.i.replace(".","");
            i = i.replace(",",".");
       this.i = i;

    }
    formataDados(){
        this.vP = parseFloat(this.vP); /* Convertemos para float/decimal (valor monetário) */
        this.i  = (parseFloat(this.i))/100;/* A taxa é dada em %, logo precisamos dividir por 100(pr cento) */
        this.n  = parseInt(this.n); /*Convertemos o número de parcelas para inteiro */
    }

    formataMascara(label, valor){
      let formato = { minimumFractionDigits: 2 , style: 'currency', currency: label }
      return valor.toLocaleString('pt-BR', formato)
    }

    calculaAmortizacao(){
        this.a = this.vP / this.n;
        return this.a;
    }

    financiarPrice(){
      /* Aplicamos a fórmula de financiamento com base na tabela PRICE */
      let prestacao = this.vP * ( Math.pow((1+this.i),this.n) * this.i ) / ( Math.pow((1+this.i),this.n) -1 );
      this.pmt.push(prestacao);
      return this.formataMascara('BRL',this.pmt[0]);
    }

    financiarSac(){
        /* Aplicamos a fórmula de financiamento com base na tabela SAC */
        this.calculaAmortizacao();
        for(let y=0; y<this.n; y++){
            let prestacao = this.a +this.i * ( this.vP - ( y * this.a ) );
            this.pmt.push(prestacao);
            this.listaSacText+=(y+1)+". prestação: "+this.formataMascara('BRL',prestacao)+"\n\r";
            this.listaSacHTML+=(y+1)+". prestação: "+this.formataMascara('BRL',prestacao)+"<br>";
        }
    }

    calculaTotalPagoPrice(){
        this.totalPago = this.pmt[0] * this.n;
        return this.formataMascara('BRL',this.totalPago);
    }

    calculaTotalJurosPrice(){
         if(this.totalPago===0){
            let total = this.calculaTotalPagoPrice();
            this.totalJuros = total - this.vP;
        }else{
            this.totalJuros = this.totalPago - this.vP;
        }
        return this.formataMascara('BRL',this.totalJuros);
    }
    calculaTotalPagoSac(){
        for(let p=0; p< this.n;p++){
            this.totalPago+=this.pmt[p];
        }
        return this.formataMascara('BRL',this.totalPago);
    }
    calculaTotalJurosSac(){
         if(this.totalPago===0){
            let total = this.calculaTotalPagoSac();
            this.totalJuros = total - this.vP;
        }else{
            this.totalJuros = this.totalPago - this.vP;
        }
        return this.formataMascara('BRL',this.totalJuros);
    }
}

module.exports.financiar = financiar;
