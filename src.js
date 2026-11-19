
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



const contadorVisitas = document.querySelector("#contadorVisitas");
const recomecarVisitas = document.querySelector("#recomecarVisitas");

function atualizarVisitas() {
    let visitas = Number(localStorage.getItem("biblioteca:visitas")) || 0;

    visitas++;

    try {
        localStorage.setItem("biblioteca:visitas", visitas);
    } catch (erro) {
        console.warn("Não foi possível guardar as visitas.");
    }

    if (contadorVisitas) {
        contadorVisitas.textContent =
            `É a ${visitas}.ª vez que nos visitas.`;
    }
}

if (contadorVisitas) {
    atualizarVisitas();
}

if (recomecarVisitas) {
    recomecarVisitas.addEventListener("click", () => {
        localStorage.removeItem("biblioteca:visitas");

        if (contadorVisitas) {
            contadorVisitas.textContent = "Contador reposto.";
        }
    });
}


function guardar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        console.warn("Não foi possível guardar:", erro);
        return false;
    }
}

function ler(chave, porOmissao) {
    try {
        const texto = localStorage.getItem(chave);

        if (texto === null) {
            return porOmissao;
        }

        return JSON.parse(texto);
    } catch (erro) {
        console.warn("Não foi possível ler os dados:", erro);
        return porOmissao;
    }
}

const leitorExemplo = {
    nome: "Leitor da Biblioteca",
    cartao: "DEMO-001",
    generos: ["Romance", "Policial"]
};

if (localStorage.getItem("biblioteca:leitor") === null) {
    guardar("biblioteca:leitor", leitorExemplo);
}

const leitor = ler("biblioteca:leitor", null);

const saudacao = document.querySelector("#saudacao");
const listaGeneros = document.querySelector("#listaGeneros");

if (leitor && saudacao) {
    saudacao.textContent = `Olá, ${leitor.nome}!`;
}

if (leitor && listaGeneros) {
    listaGeneros.replaceChildren();

    for (const genero of leitor.generos || []) {
        const li = document.createElement("li");
        li.textContent = genero;
        listaGeneros.append(li);
    }
}



// TEMA E BOTÃO SEGUIR O SISTEMA

const botaoTema = document.querySelector("#botaoTema");
const seguirSistema = document.querySelector("#seguirSistema");

function aplicarTema() {
    const temaGuardado = localStorage.getItem("tema");

    const sistemaEscuro = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const segueSistema = temaGuardado === null || temaGuardado === "sistema";

    const escuro = segueSistema
        ? sistemaEscuro
        : temaGuardado === "escuro";

    document.body.classList.toggle("escuro", escuro);

    if (botaoTema) {
        botaoTema.setAttribute("aria-pressed", String(escuro));
        botaoTema.textContent = escuro
            ? "Ativar tema claro"
            : "Ativar tema escuro";
    }

    if (seguirSistema) {
        seguirSistema.textContent = segueSistema
            ? "Deixar de seguir"
            : "Seguir o sistema";
    }
}

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const escuro = !document.body.classList.contains("escuro");

        localStorage.setItem("tema", escuro ? "escuro" : "claro");

        aplicarTema();
    });
}

if (seguirSistema) {
    seguirSistema.addEventListener("click", () => {
        const temaGuardado = localStorage.getItem("tema");

        const segueSistema = temaGuardado === null || temaGuardado === "sistema";

        if (segueSistema) {
            const escuro = document.body.classList.contains("escuro");

            localStorage.setItem("tema", escuro ? "escuro" : "claro");
        } else {
            localStorage.setItem("tema", "sistema");
        }

        aplicarTema();
    });
}

aplicarTema();



// TAMANHO DA LETRA

const tamanhoLetra = document.querySelector("#tamanhoLetra");

function aplicarTamanhoLetra() {
    const tamanho = localStorage.getItem("biblioteca:tamanho-letra") || "normal";

    document.body.classList.remove(
        "letra-grande",
        "letra-muito-grande"
    );

    if (tamanho === "grande") {
        document.body.classList.add("letra-grande");
    }

    if (tamanho === "muito-grande") {
        document.body.classList.add("letra-muito-grande");
    }

    if (tamanhoLetra) {
        tamanhoLetra.value = tamanho;
    }
}

if (tamanhoLetra) {
    tamanhoLetra.addEventListener("change", () => {
        localStorage.setItem(
            "biblioteca:tamanho-letra",
            tamanhoLetra.value
        );

        aplicarTamanhoLetra();
    });
}

aplicarTamanhoLetra();



// AVISO DA BIBLIOTECA

const aviso = document.querySelector(".aviso");

if (aviso) {
    const chaveAviso = "biblioteca:aviso-fechado";

    try {
        if (sessionStorage.getItem(chaveAviso) === "sim") {
            aviso.hidden = true;
        } else {
            aviso.hidden = false;

            const fecharAviso = document.createElement("button");
            fecharAviso.textContent = "Fechar aviso";
            fecharAviso.type = "button";

            aviso.append(fecharAviso);

            fecharAviso.addEventListener("click", () => {
                aviso.hidden = true;
                sessionStorage.setItem(chaveAviso, "sim");
            });
        }
    } catch (erro) {
        console.warn("Não foi possível guardar o estado do aviso.");
    }
}



// SINCRONIZAÇÃO ENTRE SEPARADORES

window.addEventListener("storage", (evento) => {
    if (evento.key === "tema") {
        aplicarTema();
    }

    if (evento.key === "biblioteca:tamanho-letra") {
        aplicarTamanhoLetra();
    }
});
