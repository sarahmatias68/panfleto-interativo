/*
 * Vila Gastronômica: monta o mapa de quiosques, os filtros e a ficha do quiosque.
 * Os dados vêm de js/dados.js (TIPOS, QUIOSQUES, TEXTOS).
 *
 * Fluxo: montar() desenha tudo uma vez; atualizar() só mostra/esconde
 * e reescreve textos a partir de `estado`.
 */
"use strict";

/* ---------- Utilidades ---------- */

const $ = (id) => document.getElementById(id);
const doisDigitos = (n) => String(n).padStart(2, "0");
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const plural = (n, singular, pluralTexto) => `${n} ${n === 1 ? singular : pluralTexto}`;
const escapar = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const iconePorTipo = new Map(TIPOS.map((t) => [t.nome, `icones/${t.icone}.png`]));
const quiosquePorNumero = new Map(QUIOSQUES.map((q) => [q.numero, q]));
const cardapio = (numero) => `cardapios/${doisDigitos(numero)}.pdf`;

/** Tipos que têm pelo menos um quiosque, na ordem de TIPOS. */
const GRUPOS = TIPOS
  .map((tipo) => ({ ...tipo, quiosques: QUIOSQUES.filter((q) => q.tipo === tipo.nome) }))
  .filter((grupo) => grupo.quiosques.length > 0);

const desktop = matchMedia("(min-width: 900px)");

/* ---------- Estado ---------- */

const estado = {
  pratoSocial: false,
  tipos: new Set(), // tipos selecionados no filtro; vazio = todos
};

/* ---------- Elementos ---------- */

const el = {
  painel: document.querySelector(".painel"),
  conteudo: document.querySelector(".conteudo"),
  resumo: $("resumo"),
  mapa: $("mapa"),
  lista: $("lista"),
  chave: $("chave"),
  botaoFiltros: $("botao-filtros"),
  contador: $("contador"),
  ativos: $("ativos"),
  gaveta: $("gaveta"),
  opcoes: $("opcoes"),
  gavetaFechar: $("gaveta-fechar"),
  gavetaLimpar: $("gaveta-limpar"),
  gavetaOk: $("gaveta-ok"),
  folha: $("folha"),
  folhaIcone: $("folha-icone"),
  folhaNome: $("folha-nome"),
  folhaTipo: $("folha-tipo"),
  folhaPrato: $("folha-prato"),
  folhaCardapio: $("folha-cardapio"),
};

/* ---------- Montagem (uma vez) ---------- */

function htmlGrupo({ nome, quiosques }) {
  const numeros = quiosques
    .map((q) => `<button type="button" class="num-quiosque" data-numero="${q.numero}"
        aria-label="Quiosque ${doisDigitos(q.numero)}, ${escapar(q.nome)}">${doisDigitos(q.numero)}</button>`)
    .join("");
  return `<section class="grupo" data-tipo="${escapar(nome)}" aria-label="${escapar(nome)}">
      <img src="${iconePorTipo.get(nome)}" alt="" width="46" height="46" decoding="async">
      <span class="grupo-nome">${escapar(nome)}</span>
      <div class="grupo-numeros">${numeros}</div>
    </section>`;
}

function htmlOpcao({ nome, quiosques }) {
  const total = quiosques.length;
  return `<button type="button" class="opcao" data-tipo="${escapar(nome)}" aria-pressed="false">
      <img src="${iconePorTipo.get(nome)}" alt="" width="44" height="44">
      <span class="opcao-nome">${escapar(nome)}</span>
      <span class="opcao-total" aria-label="${plural(total, "quiosque", "quiosques")}">${total}</span>
    </button>`;
}

function htmlPrato(q) {
  return `<button type="button" class="prato" data-tipo="${escapar(q.tipo)}" data-numero="${q.numero}">
      <img src="${iconePorTipo.get(q.tipo)}" alt="" width="38" height="38" loading="lazy" decoding="async">
      <span class="prato-texto">
        <small>${doisDigitos(q.numero)} · ${escapar(q.nome)}</small>
        <b>${escapar(q.prato)}</b>
      </span>
      <span class="prato-preco">${moeda.format(q.preco)}</span>
    </button>`;
}

function montar() {
  el.mapa.innerHTML = GRUPOS.map(htmlGrupo).join("");
  el.opcoes.innerHTML = GRUPOS.map(htmlOpcao).join("");
  el.lista.innerHTML =
    QUIOSQUES.map(htmlPrato).join("") +
    `<p class="lista-nota">${escapar(TEXTOS.avisoPratoSocial)}</p>`;
}

/* ---------- Atualização (a cada mudança de estado) ---------- */

function atualizar({ rolar = false } = {}) {
  const { pratoSocial, tipos } = estado;
  const filtrando = tipos.size > 0;
  const visivel = (tipo) => !filtrando || tipos.has(tipo);
  const visiveis = QUIOSQUES.filter((q) => visivel(q.tipo));
  const total = visiveis.length;

  el.chave.setAttribute("aria-checked", pratoSocial);
  for (const opcao of el.opcoes.children) opcao.setAttribute("aria-pressed", tipos.has(opcao.dataset.tipo));
  for (const grupo of el.mapa.children) grupo.hidden = !visivel(grupo.dataset.tipo);
  for (const prato of el.lista.querySelectorAll(".prato")) prato.hidden = !visivel(prato.dataset.tipo);

  el.mapa.hidden = pratoSocial;
  el.lista.hidden = !pratoSocial;

  atualizarFiltrosAtivos(filtrando);
  if (filtrando || pratoSocial) el.resumo.textContent = textoResumo(visiveis);
  else el.resumo.innerHTML = TEXTOS.dica;
  el.gavetaOk.textContent = pratoSocial
    ? `Ver ${plural(total, "prato social", "pratos sociais")}`
    : `Ver ${plural(total, "quiosque", "quiosques")}`;

  if (rolar) rolarParaPainel();
}

function textoResumo(visiveis) {
  const nomes = [...estado.tipos].join(", ");
  const total = visiveis.length;
  if (estado.pratoSocial) {
    const precos = visiveis.map((q) => q.preco);
    const faixa = `de ${moeda.format(Math.min(...precos))} a ${moeda.format(Math.max(...precos))}`;
    return ["Prato social", nomes, `${plural(total, "opção", "opções")}, ${faixa}`].filter(Boolean).join(" · ");
  }
  return `${nomes} · ${plural(total, "quiosque", "quiosques")}`;
}

function atualizarFiltrosAtivos(filtrando) {
  const chips = [...estado.tipos].map((tipo) =>
    `<button type="button" class="ativo" data-tipo="${escapar(tipo)}" aria-label="Remover filtro ${escapar(tipo)}">
        ${escapar(tipo)}<span aria-hidden="true">×</span>
      </button>`);
  if (filtrando) chips.push(`<button type="button" class="limpar" data-acao="limpar">Limpar</button>`);

  el.ativos.innerHTML = chips.join("");
  el.ativos.hidden = !filtrando;
  el.gavetaLimpar.hidden = !filtrando;
  el.contador.hidden = !filtrando;
  el.contador.textContent = estado.tipos.size;
}

/** Ao mudar o filtro com a página rolada para baixo, volta ao topo do painel. */
function rolarParaPainel() {
  const topo = el.painel.getBoundingClientRect().top;
  if (topo < 0) window.scrollBy({ top: topo - 8 });
}

/* ---------- Ações ---------- */

function alternarTipo(tipo) {
  if (estado.tipos.has(tipo)) estado.tipos.delete(tipo);
  else estado.tipos.add(tipo);
  atualizar({ rolar: true });
}

function limparFiltros() {
  estado.tipos.clear();
  atualizar({ rolar: true });
}

function alternarPratoSocial() {
  estado.pratoSocial = !estado.pratoSocial;
  atualizar({ rolar: true });
}

/* Gaveta de filtros: só existe no mobile; no desktop os filtros ficam na lateral. */
const gavetaAberta = () => el.gaveta.classList.contains("aberta");

function definirGaveta(aberta) {
  if (desktop.matches) return;
  el.gaveta.classList.toggle("aberta", aberta);
  el.botaoFiltros.setAttribute("aria-expanded", aberta);
}

/* Ficha do quiosque (<dialog>). */
let origemFolha = null;

function abrirFolha(numero, origem) {
  const q = quiosquePorNumero.get(numero);
  origemFolha = origem;
  origem.classList.add("selecionado");

  el.folhaIcone.src = iconePorTipo.get(q.tipo);
  el.folhaNome.textContent = q.nome;
  el.folhaTipo.textContent = `Quiosque ${doisDigitos(numero)} · ${q.tipo}`;
  el.folhaPrato.textContent = `Prato social: ${q.prato} · ${moeda.format(q.preco)}`;
  el.folhaCardapio.href = cardapio(numero);
  el.folha.showModal();
}

function aoFecharFolha() {
  for (const item of document.querySelectorAll(".selecionado")) item.classList.remove("selecionado");
  origemFolha?.focus();
  origemFolha = null;
}

/* ---------- Eventos ---------- */

el.chave.addEventListener("click", alternarPratoSocial);
el.gavetaLimpar.addEventListener("click", limparFiltros);
el.botaoFiltros.addEventListener("click", () => definirGaveta(!gavetaAberta()));
el.gavetaFechar.addEventListener("click", () => definirGaveta(false));
el.gavetaOk.addEventListener("click", () => definirGaveta(false));

el.opcoes.addEventListener("click", (e) => {
  const opcao = e.target.closest(".opcao");
  if (opcao) alternarTipo(opcao.dataset.tipo);
});

el.ativos.addEventListener("click", (e) => {
  const botao = e.target.closest("button");
  if (!botao) return;
  if (botao.dataset.acao === "limpar") limparFiltros();
  else alternarTipo(botao.dataset.tipo);
});

el.conteudo.addEventListener("click", (e) => {
  const item = e.target.closest("[data-numero]");
  if (item) abrirFolha(Number(item.dataset.numero), item);
});

el.folha.addEventListener("close", aoFecharFolha);
el.folha.addEventListener("click", (e) => {
  if (e.target === el.folha) el.folha.close(); // clique no fundo escuro
});

document.addEventListener("keydown", (e) => {
  // Esc na ficha é tratado pelo próprio <dialog>.
  if (e.key === "Escape" && !el.folha.open && gavetaAberta()) definirGaveta(false);
});

desktop.addEventListener("change", () => {
  el.gaveta.classList.remove("aberta");
  el.botaoFiltros.setAttribute("aria-expanded", "false");
});

/* ---------- Início ---------- */

montar();
atualizar();
