const cartoesDestino = document.getElementsByClassName('cartaoDestino');
const tituloCartoes = document.querySelectorAll('.cartaoDestino h4');

// TÍTULO DOS CARTÕES 

function tituloComposto(numeroCartao, listaDestinos) {
    for (let k = 0; k < listaDestinos.length; k++) {
        setInterval(()=> {
            tituloCartoes[numeroCartao].innerHTML = listaDestinos[k];
        }, 2000 * (k + 1))
    }
}

for (let i = 0; i < tituloCartoes.length; i++) {
    let lista = []
    lista = destinos[i].destinos.split(' / ');
    
    for (let j = 0; j < lista.length; j++) {
        let elementoLista = document.createElement('li');
        elementoLista.textContent = lista[j];
        let local = document.querySelector(`.destino${i + 1} ul`);
        local.appendChild(elementoLista);
    }

    // Se não houver título definido...
    if (destinos[i].titulo == '') {
        // Formatação com adição de 'span' aos elementos
        let listaComSpan = lista.map(item => {
            // Retira espaços do início e do fim / separa em uma array com base nos espaços
            item = item.trim().split(/\s+/);
            // Seleciona o último termo
            item[item.length - 1] = `<span>${item[item.length - 1]}</span>`;
            return item.join(' ');
        })



        // Define o título como o 1° elemento da lista
        tituloCartoes[i].innerHTML = listaComSpan[0];

        // Se a lista tiver mais de 1 elemento...
        if (lista.length > 1) {
            // Realiza a troca de títulos
            tituloComposto(i, listaComSpan);
        }
        
    } else {
        let titulo = destinos[i].titulo.replace('*', '<span>').replace('*', '</span>');
        tituloCartoes[i].innerHTML = titulo;
    }

    // Ocultar cartões sem informações
    if (destinos[i].destinos == '') {
        cartoesDestino[i].style.display = 'none';
    }
}

// Usar .trim para retirar espaços das palavras!

// ATUALIZAR IMAGENS DOS CARTÕES

const imgsCartoes = document.querySelectorAll('.imgCartao');

fetch('imagens/destinos/destinos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Exibe os dados no console
        console.log(data.nome); // Acessa propriedades específicas, ex: nome
    })
    .catch(error => {
        console.error('Erro:', error);
    });