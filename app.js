
const catalogo = [
    { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
    { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
    { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
    { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
    { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: true },
    { titulo: "Ensaio sobre a Cegueira", autor: "José Saramago", ano: 1995, disponivel: false }
];

// CHAVES DO LOCALSTORAGE
const CHAVE_LEITURA = "biblioteca:leitura";
const CHAVE_PESQUISAS = "biblioteca:pesquisas";

// FUNÇÕES PARA LER E GUARDAR DADOS
function lerDados(chave, valorInicial) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : valorInicial;
    } catch {
        return valorInicial;
    }
}

function guardarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
    } catch {
        console.log("Não foi possível guardar os dados.");
    }
}

// EXERCÍCIO 6 - FUNÇÃO EMPRESTAR
function emprestar(titulo) {
    const livro = catalogo.find(l => l.titulo === titulo);

    if (!livro) return "Livro não encontrado.";
    if (!livro.disponivel) return "Já está emprestado.";

    livro.disponivel = false;
    atualizar();

    return "Emprestado!";
}

// TESTES DO EXERCÍCIO 6
console.log("--- Exercício 6 ---");

for (const l of catalogo) {
    console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}

const disponiveisCount = catalogo.filter(l => l.disponivel).length;
console.log(`Disponíveis: ${disponiveisCount}`);

let antigo = catalogo[0];

for (const l of catalogo) {
    if (l.ano < antigo.ano) {
        antigo = l;
    }
}

console.log(`Mais antigo: ${antigo.titulo}`);
console.log(emprestar("Os Maias"));
console.log(emprestar("Os Maias"));

// ELEMENTOS HTML
const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("#resumo-catalogo");
const pesquisa = document.querySelector("#pesquisa");
const botaoFiltro = document.querySelector("#btn-filtro");

const listaLeituraHTML = document.querySelector("#lista-leitura");
const historicoHTML = document.querySelector("#historico-pesquisas");

let soDisponiveis = false;

// EXERCÍCIO 7 - MOSTRAR LIVROS
function mostrarLivros(livros) {
    if (!lista) return;

    lista.replaceChildren();

    for (const l of livros) {
        const item = document.createElement("li");

        item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;

        if (!l.disponivel) {
            item.classList.add("indisponivel");
            item.append(" — emprestado");
        }

        const botao = document.createElement("button");
        botao.textContent = "Adicionar à leitura";

        botao.addEventListener("click", () => {
            adicionarLeitura(l.titulo);
        });

        item.append(" ", botao);
        lista.append(item);
    }

    if (resumo) {
        const n = livros.filter(l => l.disponivel).length;
        resumo.textContent = `${livros.length} livros, ${n} disponíveis`;
    }
}

// EXERCÍCIO 8 - LISTA DE LEITURA
let leitura = lerDados(CHAVE_LEITURA, []);

function atualizarListaLeitura() {
    if (!listaLeituraHTML) return;

    listaLeituraHTML.replaceChildren();

    leitura.forEach((livro, indice) => {
        const item = document.createElement("li");

        item.textContent = livro.titulo +
            (livro.lido ? " — Lido" : " — Por ler");

        const botaoLido = document.createElement("button");
        botaoLido.textContent = livro.lido ? "Marcar por ler" : "Marcar como lido";

        botaoLido.addEventListener("click", () => {
            leitura[indice].lido = !leitura[indice].lido;
            atualizar();
        });

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";

        botaoRemover.addEventListener("click", () => {
            leitura.splice(indice, 1);
            atualizar();
        });

        item.append(" ", botaoLido, " ", botaoRemover);
        listaLeituraHTML.append(item);
    });
}

function adicionarLeitura(titulo) {
    const existe = leitura.some(l => l.titulo === titulo);

    if (existe) {
        alert("Este livro já está na tua lista!");
        return;
    }

    leitura.push({
        titulo: titulo,
        lido: false
    });

    atualizar();
}

// EXERCÍCIO 11 - HISTÓRICO DE PESQUISAS
function guardarPesquisa(texto) {
    texto = texto.trim();

    if (texto.length === 0) return;

    let historico = lerDados(CHAVE_PESQUISAS, {
        versao: 1,
        guardadoEm: Date.now(),
        dados: []
    });

    // Apagar histórico com mais de 7 dias
    if (
        !historico ||
        !Array.isArray(historico.dados) ||
        Date.now() - historico.guardadoEm > 7 * 24 * 60 * 60 * 1000
    ) {
        historico = {
            versao: 1,
            guardadoEm: Date.now(),
            dados: []
        };
    }

    // Evitar pesquisas repetidas
    historico.dados = historico.dados.filter(
        p => p.toLowerCase() !== texto.toLowerCase()
    );

    // Colocar a pesquisa mais recente em primeiro lugar
    historico.dados.unshift(texto);

    // Guardar apenas as últimas 5 pesquisas
    historico.dados = historico.dados.slice(0, 5);

    historico.guardadoEm = Date.now();

    guardarDados(CHAVE_PESQUISAS, historico);

    mostrarHistorico();
}

function mostrarHistorico() {
    if (!historicoHTML) return;

    historicoHTML.replaceChildren();

    const historico = lerDados(CHAVE_PESQUISAS, {
        versao: 1,
        guardadoEm: Date.now(),
        dados: []
    });

    if (!Array.isArray(historico.dados)) return;

    historico.dados.forEach(texto => {
        const item = document.createElement("li");
        item.textContent = texto;
        historicoHTML.append(item);
    });
}

// PESQUISA E FILTRO
function atualizar() {
    if (!pesquisa) return;

    const texto = pesquisa.value.trim().toLowerCase();

    let resultados = catalogo.filter(l =>
        l.titulo.toLowerCase().includes(texto)
    );

    if (soDisponiveis) {
        resultados = resultados.filter(l => l.disponivel);
    }

    mostrarLivros(resultados);

    if (!resultados.length && lista) {
        lista.textContent = "Nenhum livro encontrado.";
    }

    guardarDados(CHAVE_LEITURA, leitura);

    atualizarListaLeitura();
    mostrarHistorico();
    mostrarDados();
}

if (pesquisa) {
    pesquisa.addEventListener("input", () => {
        atualizar();
        guardarPesquisa(pesquisa.value);
    });
}

if (botaoFiltro) {
    botaoFiltro.addEventListener("click", () => {
        soDisponiveis = !soDisponiveis;
        atualizar();
    });
}

// EXERCÍCIO 10 - SINCRONIZAR SEPARADORES
window.addEventListener("storage", evento => {
    if (evento.key === CHAVE_LEITURA) {
        leitura = lerDados(CHAVE_LEITURA, []);
        atualizarListaLeitura();
        mostrarDados();
    }

    if (evento.key === CHAVE_PESQUISAS) {
        mostrarHistorico();
    }
});

// INSCRIÇÃO NO CLUBE DE LEITURA
const form = document.querySelector("#inscricao");
const erro = document.querySelector("#mensagem");

if (form) {
    form.addEventListener("submit", evento => {
        evento.preventDefault();

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();

        if (nome === "" || !email.includes("@")) {
            if (erro) {
                erro.textContent = "Preenche o nome e um e-mail válido.";
            }
            return;
        }

        if (erro) {
            erro.textContent = `Obrigado, ${nome}! Inscrição feita.`;
        }

        form.reset();
    });
}

// EXERCÍCIO 12 - OS MEUS DADOS
function mostrarDados() {
    const elemento = document.querySelector("#dados-guardados");

    if (!elemento) return;

    const dados = {
        listaLeitura: lerDados(CHAVE_LEITURA, []),
        pesquisas: lerDados(CHAVE_PESQUISAS, {
            versao: 1,
            guardadoEm: Date.now(),
            dados: []
        })
    };

    elemento.textContent = JSON.stringify(dados, null, 2);
}

const botaoApagar = document.querySelector("#btn-apagar-dados");
const mensagemDados = document.querySelector("#mensagem-dados");

if (botaoApagar) {
    botaoApagar.addEventListener("click", () => {
        const confirmar = confirm("Queres mesmo apagar os teus dados?");

        if (!confirmar) return;

        localStorage.removeItem(CHAVE_LEITURA);
        localStorage.removeItem(CHAVE_PESQUISAS);

        leitura = [];

        atualizarListaLeitura();
        mostrarHistorico();
        mostrarDados();

        if (mensagemDados) {
            mensagemDados.textContent = "Os teus dados foram apagados.";
        }
    });
}

// MOSTRAR TUDO AO ABRIR A PÁGINA
atualizar();
