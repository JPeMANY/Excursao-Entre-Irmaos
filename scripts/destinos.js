// GERAL
    const tituloPagina = document.querySelector('title');
    const indice = Number(tituloPagina.textContent) -1;

// ATUALIZAR TÍTULO DA PÁGINA
    let tituloDados = destinos[indice].titulo;
    tituloDados = tituloDados.replace(/\*/g, '');

    if (tituloDados === ''){
        tituloPagina.textContent = `Viagem ${indice}`;
    } else {
        tituloPagina.textContent = tituloDados;
    }

// ATUALIZAR URL DAS IMAGENS
    const imagens = destinos[indice].imagens;
    const elementosImg = Array.from(document.querySelectorAll('.imagens div'));

    for (let i = 0; i < imagens.length; i++) {
        elementosImg[i].style.backgroundImage = `url('imagens/destino${indice + 1}/${imagens[i]}')`
    }
