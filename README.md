Finance-PRICE-SAC
==============

Um simulador de financiamento utilizando o modelo matemático baseado nas metodologias PRICE e SAC.

> *Você pode optar por simular usando uma das duas tabelas dinamicamente, preenchendo o formulário.*

Modelo Matemático Utilizado
==============
### Equação para a metodologia  PRICE
[![Cálculo Tabela Price](https://wikimedia.org/api/rest_v1/media/math/render/svg/bc51f6f035b10c7426702dc9c4b7d2dceea3cdd1 "Cálculo Tabela Price")](http://https://wikimedia.org/api/rest_v1/media/math/render/svg/bc51f6f035b10c7426702dc9c4b7d2dceea3cdd1 "Cálculo Tabela Price")
### Equação para a metodologia  SAC

[![Cálculo Tabela Price](https://www.renatrader.com.br/images/aprender/matematica-financeira/image038.gif "Cálculo Tabela Sac")](https://www.renatrader.com.br/images/aprender/matematica-financeira/image038.gif "Cálculo Tabela Sac")



Transformando em Javascript
==============
```
Traduzindo a variável temos:
PV = Present Value = Valor Presente = vP

PRICE
	pmt .push( vP * ( Math.pow((1+i),n) * i ) / ( Math.pow((1+i),n) -1 ) );

SAC
  > amortização =  a = VP /n
  > ( k - 1 ) x i  = é o período analisado que será abstraído tornando-se ( y )
  > 1a parcela = a + i * VP
  > 2a parcela = a + i * ( VP -  1 * a )
  > 3a parcela = a + i * ( VP -  2 * a )
  ...
  Onde  y => É o número da parcela que já foi paga no loop FOR
  A fórmula em javascript fica:
  PMT = a + i * ( vP - ( y * a ) )
  Como iremos contruir uma lista de prestações, então temos:
  pmt.push( a + i * ( vP - ( y * a ) ) );
```

Onde as variáveis representam:
==============
```
let pmt = [ ];           /* Lista de Prestações do Financiamento*/
let vP = 0;              /* [ PV ] Valor Presente(Valor do Financiamento) */
let i = 0;                 /* Taxa de Juros ( ao mês)*/
let n = 0;               /* Número de Parcelas(Período)*/
let a = 0;               /* Amortização =>   a =  vP / n ;  */
let y = 0;               /* Número de Parcelas Pagas */
let totalJuros = 0;  /* Total de juros pagos no financiamento*/
let totalPago  = 0; /* Total pago no financiamento acrescido os juros*/

vP = 50000.00;/* Valor decimal ou ponto flutuante ou inteiro */
i  = 1.0 / 100; /* 1%[ao mês].  Sempre deve ser dividida por 100(por cento)*/
n  = 60; /* Em 60 vezes(meses) -- A taxa e o período devem sempre estar na mesma unidade(mês ou ano) */

```

### Instalação

1. Faça o download ou clone do projeto com `git clone https://github.com/danielsidev/finance-price-sac.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Instale o Browserify globalmente e rode: browserify ./view/financiarView.js -o ./bundle.js

### Testando a aplicação

- Abra o arquivo index.html no navegador
- Preencha o formulário com o valor( 50.000,00 ou sem máscara 50000), taxa(1 ou 1,00) e parcelas(60 ou outro valor)
- Clique no botão simular

#### Para Alterações

- O modelo foi feito utilizando alguns recursos do ES6, por isso usei o Browserify, logo a cada alteração na view ou no controller é necessário rodar o comando no terminal novamente para empacotar o código em bundle.js

```
browserify ./view/financiarView.js -o ./bundle.js
```
