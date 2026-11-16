
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



const catalogo = [
    { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
    { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
    { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
    { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
    { titulo: "O Principezinho", autor: "Antoine de Saint-Exupéry", ano: 1943, disponivel: false },
    { titulo: "Harry Potter", autor: "J.K. Rowling", ano: 1997, disponivel: true }
];

for (const l of catalogo) {
    console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}


console.log("Livros disponíveis: " +
    catalogo.filter(l => l.disponivel).length
);

let antigo = catalogo[0];

for (const l of catalogo) {
    if (l.ano < antigo.ano) {
        antigo = l;
    }
}

console.log("Livro mais antigo: " + antigo.titulo);

function emprestar(titulo) {
    const livro = catalogo.find(l => l.titulo === titulo);

    if (!livro) {
        return "Livro não encontrado.";
    }

    if (!livro.disponivel) {
        return "Já está emprestado.";
    }

    livro.disponivel = false;
    return "Emprestado!";
}

console.log(emprestar("Os Maias"));
console.log(emprestar("Mensagem"));
console.log(emprestar("Livro inexistente"));

console.log("Disponíveis agora: " +
    catalogo.filter(l => l.disponivel).length
);

function mostrarLivros(livros) {

    lista.replaceChildren();

    for (const l of livros) {

        const item = document.createElement("li");

        item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;

        if (!l.disponivel) {
            item.classList.add("indisponivel");
            item.append(" · emprestado");
        }

        lista.append(item);
    }

    const n = livros.filter(l => l.disponivel).length;

    resumo.textContent = `${livros.length} livros, ${n} disponíveis`;
}

mostrarLivros(catalogo);

const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("#resumo");
const pesquisa = document.querySelector("#pesquisa");
const botao = document.querySelector("#botao");

let soDisponiveis = false;

// Mostrar livros
function mostrarLivros(livros) {

    lista.replaceChildren();

    for (const l of livros) {

        const item = document.createElement("li");

        item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;

        if (!l.disponivel) {
            item.classList.add("indisponivel");
            item.append(" · emprestado");
        }

        lista.append(item);
    }

    const n = livros.filter(l => l.disponivel).length;

    resumo.textContent = `${livros.length} livros, ${n} disponíveis`;
}

// Pesquisar e filtrar
function atualizar() {

    const texto = pesquisa.value.trim().toLowerCase();

    let resultado = catalogo.filter(l =>
        l.titulo.toLowerCase().includes(texto)
    );

    if (soDisponiveis) {
        resultado = resultado.filter(l => l.disponivel);
    }

    mostrarLivros(resultado);

    if (resultado.length === 0) {
        lista.textContent = "Nenhum livro encontrado.";
    }
}

// Pesquisar enquanto escreve
pesquisa.addEventListener("input", atualizar);

// Ativar e desativar filtro
botao.addEventListener("click", () => {

    soDisponiveis = !soDisponiveis;

    atualizar();

});

// Formulário
const form = document.querySelector("#inscricao");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (nome === "" || !email.includes("@")) {

        mensagem.textContent = "Preencha o nome e um email válido.";
        return;

    }

    mensagem.textContent = `Obrigado, ${nome}! Inscrição feita.`;

    form.reset();

});

mostrarLivros(catalogo);

