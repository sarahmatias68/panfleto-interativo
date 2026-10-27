document.addEventListener("DOMContentLoaded", () => {
  const panfleto = document.getElementById("panfleto");
  const balao = document.getElementById("balao");
  const balaoTitulo = document.getElementById("balao-titulo");
  const balaoDescricao = document.getElementById("balao-descricao");
  const balaoLink = document.getElementById("balao-link");
  const btnFecharBalao = document.getElementById("balao-fechar");

  let timerFechar = null;

  function cancelarFechamento() {
    if (timerFechar) {
      clearTimeout(timerFechar);
      timerFechar = null;
    }
  }

  function agendarFechamento() {
    cancelarFechamento();
    timerFechar = setTimeout(fecharBalao, 300);
  }

  lojasDados.forEach((loja, i) => {
    const btn = document.createElement("button");
    btn.className = "bolinha";
    btn.textContent = loja.id;
    btn.setAttribute("aria-label", `Loja ${loja.id}: ${loja.nome}`);
    btn.style.top = loja.top;
    btn.style.left = loja.left;
    btn.style.animationDelay = `${400 + i * 45}ms`;

    btn.addEventListener("mouseenter", () => {
      cancelarFechamento();
      abrirBalao(loja, btn);
    });
    btn.addEventListener("mouseleave", agendarFechamento);
    btn.addEventListener("focus", () => {
      cancelarFechamento();
      abrirBalao(loja, btn);
    });
    btn.addEventListener("blur", agendarFechamento);

    btn.addEventListener("click", (e) => {
      cancelarFechamento();
      abrirBalao(loja, btn);
      e.stopPropagation();
    });

    panfleto.appendChild(btn);
  });

  balao.addEventListener("mouseenter", cancelarFechamento);
  balao.addEventListener("mouseleave", agendarFechamento);
  balao.addEventListener("focusin", cancelarFechamento);
  balao.addEventListener("focusout", agendarFechamento);

  function abrirBalao(loja, btn) {
    balaoTitulo.textContent = `${loja.id} - ${loja.nome}`;
    balaoDescricao.textContent = loja.desc;
    balaoLink.href = loja.link;
    esconderDica();
    
    balao.style.top = loja.top;
    balao.style.left = loja.left;
    const x = parseFloat(loja.left);
    if (x >= 75) balao.style.transform = "translate(-80%, -120%)";
    else if (x <= 25) balao.style.transform = "translate(-20%, -120%)";
    else balao.style.transform = "translate(-50%, -120%)";
    balao.classList.add("ativo");
  }

  function fecharBalao() {
    balao.classList.remove("ativo");
  }

  btnFecharBalao.addEventListener("click", fecharBalao);

  const dica = document.getElementById("dica-toque");
  function esconderDica() {
    if (dica) dica.classList.add("oculta");
  }
  if (dica) setTimeout(esconderDica, 6000);

  document.addEventListener("click", (e) => {
    if (!balao.contains(e.target) && !e.target.classList.contains("bolinha")) {
      fecharBalao();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharBalao();
  });
});