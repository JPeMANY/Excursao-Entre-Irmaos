const cartoes = Array.from(document.querySelectorAll('.formDestinos div'))

const imagensDestinos = Array.from(document.querySelectorAll('.formDestinos img'));

for (let i = 0; i < imagensDestinos.length; i++) {
    if (destinos[i].imagens != '') {
        imagensDestinos[i].src = `imagens/destino${i+1}/${destinos[i].imagens[i]}`;
        
        console.log('com img')
    } else {
        cartoes[i].style.display = 'none';
        console.log('sem img')
    }
}