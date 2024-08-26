// VARIÁVEIS GERAIS

const indice = Number(title.textContent);


// ATUALIZAR TÍTULO
const title = document.querySelector('title');
const titulo = destinos[indice].titulo;
title.textContent = titulo;