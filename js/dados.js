/*
 * Dados da Vila Gastronômica.
 *
 * TIPOS     → ordem dos grupos na tela e ícone de cada tipo (icones/<icone>.png).
 * QUIOSQUES → um item por quiosque. O cardápio fica em cardapios/NN.pdf,
 *             onde NN é o número com dois dígitos (ex.: 07 → cardapios/07.pdf).
 *             O campo "tipo" precisa ser igual a um "nome" de TIPOS.
 */

const TIPOS = [
  { nome: "Hot Dog", icone: "hotdog" },
  { nome: "Pastel", icone: "pastel" },
  { nome: "Crepe", icone: "crepe" },
  { nome: "Panelinha", icone: "panelinha" },
  { nome: "Massas", icone: "massas" },
  { nome: "Hambúrguer", icone: "hamburguer" },
  { nome: "Comida Árabe", icone: "arabe" },
  { nome: "Pamonha e Caldos", icone: "pamonha" },
  { nome: "Jantinha e Espetos", icone: "jantinha" },
  { nome: "Café e Quitandas", icone: "cafe" },
  { nome: "Sucos e Cremes", icone: "sucos" },
  { nome: "Pizza", icone: "pizza" },
  { nome: "Churros", icone: "churros" },
  { nome: "Sorvetes", icone: "sorvetes" },
  { nome: "Doces", icone: "doces" },
  { nome: "Vinho", icone: "vinho" },
  { nome: "Chopp", icone: "chopp" },
];

const QUIOSQUES = [
  { numero: 1, tipo: "Pizza", nome: "Caz-Ô Pizzaria", prato: "Fatia de pizza banana com canela (145g)", preco: 8 },
  { numero: 2, tipo: "Sorvetes", nome: "Açaí do Bem", prato: "Picolés frutados (70g)", preco: 8 },
  { numero: 3, tipo: "Panelinha", nome: "Panelinha da Nega", prato: "Galinhada (290g)", preco: 12 },
  { numero: 4, tipo: "Massas", nome: "Masseo", prato: "Macarrão pizza (375g)", preco: 12 },
  { numero: 5, tipo: "Hambúrguer", nome: "Burger Della’s", prato: "Clássico (200g)", preco: 12 },
  { numero: 6, tipo: "Chopp", nome: "Colombina Chopp", prato: "Chopp artesanal pilsen puro malte (300ml)", preco: 8 },
  { numero: 7, tipo: "Crepe", nome: "Crepedelic", prato: "Crepe francês marguerita (185g)", preco: 12 },
  { numero: 8, tipo: "Café e Quitandas", nome: "Lila Culinária", prato: "Disco de carne com mussarela (130g)", preco: 12 },
  { numero: 9, tipo: "Pastel", nome: "Pastelaria Ebenezer", prato: "Mini pastel, 1 de carne e 1 de queijo (215g)", preco: 10 },
  { numero: 10, tipo: "Hot Dog", nome: "Uai! Dog", prato: "Dog social (310g)", preco: 12 },
  { numero: 11, tipo: "Jantinha e Espetos", nome: "Jantinha da Peta", prato: "Mini jantinha (300g)", preco: 12 },
  { numero: 12, tipo: "Pizza", nome: "Bonna Sabor", prato: "Pizza de muçarela (270g)", preco: 12 },
  { numero: 13, tipo: "Hambúrguer", nome: "Vila Buldogs", prato: "X-Burguer (240g)", preco: 12 },
  { numero: 14, tipo: "Vinho", nome: "Empório Aleana", prato: "Taça de vinho Talacasto tinto suave (120ml)", preco: 12 },
  { numero: 15, tipo: "Pamonha e Caldos", nome: "Canju Alimentos", prato: "Caldo de feijão (380g)", preco: 12 },
  { numero: 16, tipo: "Sucos e Cremes", nome: "Mr. Diow", prato: "Suco de laranja (500ml)", preco: 12 },
  { numero: 17, tipo: "Crepe", nome: "Crepe com Amor", prato: "Crepe francês marguerita (200g)", preco: 12 },
  { numero: 18, tipo: "Comida Árabe", nome: "Xufi Culinária Árabe", prato: "Esfiha aberta de carne (60g)", preco: 12 },
  { numero: 19, tipo: "Hambúrguer", nome: "Panças BBQ & Burguer", prato: "Smoked Smash (250g)", preco: 12 },
  { numero: 20, tipo: "Panelinha", nome: "Comitiva Gourmet", prato: "Risoto do cerrado com pequi (350g)", preco: 12 },
  { numero: 21, tipo: "Doces", nome: "Frutarte Confeitaria", prato: "Bolo gelado de coco (150g)", preco: 12 },
  { numero: 22, tipo: "Chopp", nome: "Chopp Jalapa", prato: "Chopp artesanal puro malte (300ml)", preco: 8 },
  { numero: 23, tipo: "Pizza", nome: "Folli Pizzaria", prato: "Fatia de pizza de muçarela (130g)", preco: 6 },
  { numero: 24, tipo: "Pastel", nome: "Arcanjo’s Pastéis", prato: "Pastel de presunto e queijo (150g)", preco: 12 },
  { numero: 25, tipo: "Massas", nome: "Casa das Massas", prato: "Rondele (300g)", preco: 12 },
  { numero: 26, tipo: "Hot Dog", nome: "Dogão Goiano", prato: "Dog social (270g)", preco: 10 },
  { numero: 27, tipo: "Churros", nome: "Calais Churros", prato: "Mini churros recheado (140g)", preco: 12 },
  { numero: 28, tipo: "Jantinha e Espetos", nome: "Jantinha da Maju", prato: "Linguiça cuiabana com mandioca e vinagrete (400g)", preco: 10 },
  { numero: 29, tipo: "Hambúrguer", nome: "604 Burger", prato: "Parquinho (200g)", preco: 9.9 },
];

const TEXTOS = {
  // HTML permitido: <strong> marca o trecho em negrito.
  dica: "Toque no número de um quiosque para ver o <strong>cardápio</strong>",
  avisoPratoSocial: "Na indisponibilidade do prato social, será oferecido um prato do cardápio como substituto no mesmo valor.",
};
