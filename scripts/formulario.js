const inputNome = document.querySelector('#nome');
const inputsDestino = document.querySelectorAll('.destino');
const inputPessoas = document.querySelector('.numeroPessoas');
const inputsPagamento = document.getElementsByName('tipoPagamento');

const valor = document.querySelector('.valor');

const btnCalcular = document.querySelector('.btnCalcular');
const btnEnviar = document.querySelector('.btnEnviar');

let nome;
let destino;
let destinoValor;
let nPessoas;
let pagamento;
let total;

inputNome.addEventListener('keyup', () => {
    nome = inputNome.value;
})

inputsDestino.forEach(elemento => {
    elemento.addEventListener('click', () => {
        if (elemento.checked) {
            destinoValor = elemento.value;
            destino = document.querySelector(`.${elemento.id}`).textContent;
        }
    })
})

inputPessoas.addEventListener('keyup', () => {
    nPessoas = inputPessoas.value;
})

inputsPagamento.forEach(elemento => {
    elemento.addEventListener('click', () => {
        pagamento = elemento.value;
    })
})

btnCalcular.addEventListener('click', () => {
    total = destinoValor * nPessoas;
    valor.textContent = total;
    
    let linkWhats = `https://wa.me/5551997078804?text=Olá!%20Quero%20fazer%20uma%20reserva:%0A%0ANome:%20${nome}%0ADestino:%20${destino}%0ANúmero%20de%20pessoas:%20${nPessoas}%0AMétodo%20de%20pagamento:%20${pagamento}%0AValor%20total:%20R$%20${total},00`

    btnEnviar.href = linkWhats;
})
