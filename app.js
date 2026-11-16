
const catalogo = [
  { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
  { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
  { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
  { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
  { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: true },
  { titulo: "Ensaio sobre a Cegueira", autor: "José Saramago", ano: 1995, disponivel: false }
];

function emprestar(titulo) {
  const livro = catalogo.find(l => l.titulo === titulo);
  if (!livro) return "Livro não encontrado.";
  if (!livro.disponivel) return "Já está emprestado.";
  livro.disponivel = false;
  return "Emprestado!";
}

// --- EXERCÍCIO 6 ---

console.log("--- Testes Exercício 6 ---");

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

console.log(`Mais antigo: ${antigo.titulo} — ${antigo.autor} (${antigo.ano})`);

console.log(emprestar("Os Maias"));
console.log(emprestar("Os Maias")); // Testar aviso de já emprestado

// --- EXERCÍCIO 7 ---

console.log("--- Testes Exercício 7 (DOM) ---");

const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("#resumo-catalogo");

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

    lista.append(item);
  }

  if (resumo) {
    const n = livros.filter(l => l.disponivel).length;
    resumo.textContent = `${livros.length} livros, ${n} disponíveis`;
  }
}

// --- EXERCÍCIO 8 ---

console.log("--- Testes Exercício 8 (Eventos e Formulário) ---");

const pesquisa = document.querySelector("#pesquisa");
const botaoFiltro = document.querySelector("#btn-filtro");

let soDisponiveis = false;

function atualizar() {
  if (!pesquisa) return;

  const texto = pesquisa.value.trim().toLowerCase();
  let res = catalogo.filter(l => l.titulo.toLowerCase().includes(texto));

  if (soDisponiveis) {
    res = res.filter(l => l.disponivel);
  }

  mostrarLivros(res);

  if (!res.length && lista) {
    lista.textContent = "Nenhum livro encontrado.";
  }
}

if (pesquisa) {
  pesquisa.addEventListener("input", atualizar);
}

if (botaoFiltro) {
  botaoFiltro.addEventListener("click", () => {
    soDisponiveis = !soDisponiveis;
    atualizar();
  });
}

const form = document.querySelector("#inscricao");
const erro = document.querySelector("#mensagem");

if (form) {
  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (nome === "" || !email.includes("@")) {
      if (erro) erro.textContent = "Preencha o nome e um e-mail válido.";
      return;
    }

    if (erro) erro.textContent = `Obrigado, ${nome}! Inscrição feita.`;
  });
}

if (lista) {
  mostrarLivros(catalogo);
}
