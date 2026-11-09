
// Dinis Ribeiro

console.log("Boas vindas à Biblioteca do Bairro!");

let anoAtual = new Date().getFullYear();
let anoAbertura = 1987;

let anos = anoAtual - anoAbertura;

console.log("A biblioteca abriu há " + anos + " anos.");
console.log("TESTE DE ERRO");

const nome = "Biblioteca do Bairro";
const morada = "Rua Principal";

let livros = 1250;

livros = livros - 3;

console.log(`A ${nome} tem ${livros} livros disponíveis.`);

console.log(typeof nome);
console.log(typeof morada);
console.log(typeof livros);

console.log(nome.toUpperCase());


let dia = "quarta";
let hora = 15;

let aberta = (
  (dia === "segunda" && hora >= 9 && hora < 19) ||
  (dia === "terça" && hora >= 9 && hora < 19) ||
  (dia === "quarta" && hora >= 9 && hora < 19) ||
  (dia === "quinta" && hora >= 9 && hora < 19) ||
  (dia === "sexta" && hora >= 9 && hora < 19) ||
  (dia === "sábado" && hora >= 10 && hora < 13)
);

if (aberta) {
  console.log("Aberta");
} else {
  console.log("Fechada");
}


function calcularMulta(dias) {
  return dias > 15 ? (dias - 15) * 0.50 : 0;
}



function estaAberta(dia, hora) {
  return (
    (dia !== "sábado" && dia !== "domingo" && hora >= 9 && hora < 19) ||
    (dia === "sábado" && hora >= 10 && hora < 13)
  );
}


function formatarEuros(valor) {
  return valor.toFixed(2).replace(".", ",") + " €";
}


function mensagemMulta(dias) {
  let multa = calcularMulta(dias);

  return multa > 0
    ? "Multa a pagar: " + formatarEuros(multa)
    : "Sem multa";
}

console.log(calcularMulta(10), calcularMulta(16), calcularMulta(20));

console.log(
  estaAberta("domingo", 11),
  estaAberta("quarta", 10),
  estaAberta("sábado", 14)
);

console.log(
  formatarEuros(3.5),
  formatarEuros(10),
  formatarEuros(0.5)
);

console.log(
  mensagemMulta(12),
  mensagemMulta(16),
  mensagemMulta(20)
);


console.log("--- Testes Exercício 5 ---");

const listaLivros = [
  "Os Maias",
  "Mensagem",
  "A Sibila",
  "Os Lusíadas",
  "Aparição"
];

listaLivros.push("Memorial do Convento", "Ensaio sobre a Cegueira");

console.log(`Total de livros: ${listaLivros.length}`);



console.log("--- Lista Numerada ---");

listaLivros.forEach((titulo, i) => {
  console.log(`${i + 1}. ${titulo}`);
});


const longos = listaLivros.filter(t => t.length > 10);

console.log("--- Livros com mais de 10 letras ---");
console.log(longos);


const maiusculas = listaLivros.map(t => t.toUpperCase());

console.log("--- Títulos em maiúsculas ---");
console.log(maiusculas);
