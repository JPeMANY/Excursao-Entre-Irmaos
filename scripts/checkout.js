// VARIÁVEIS
    const form = document.getElementById('formReserva');

    const inputWhats = document.getElementById('whats');
    const inputNascimento = document.getElementById('nascimento');

    const inputsPagamento = document.getElementById('pagamento');
    const inputPessoas = document.getElementById('pessoas');

    const cartoes = document.querySelectorAll('.infoDestino label');
    const inputCartoes = document.querySelectorAll('.infoDestino input')
    const imagensDestinos = document.querySelectorAll('.infoDestino img');
    const tituloCartoes = document.querySelectorAll('.infoDestino h2');
    const valorCartoes = document.querySelectorAll('.infoDestino label span');

    const valorTotalSpan = document.getElementById('valorTotal');

    const camposObrigatorios = document.querySelectorAll('.campoObrigatorio');
    // ---- ADICIONAR DESTAQUES PARA CAMPOS NÃO PREENCHIDOS


// ATUALIZAR AS IMAGENS / NOME / VALOR / DOS CARTÕES
    function atualizarDadosDestino (atualizarValue) {{
        for (let i = 0; i < cartoes.length; i++) {
            if (destinos[i].titulo != '') { // Se houver título no banco de dados
                const nomeViagem = destinos[i].titulo;
                const valorViagem = `R$ ${destinos[i].valor},00`;

                tituloCartoes[i].textContent = nomeViagem;
                valorCartoes[i].textContent = valorViagem;

                inputCartoes[i].value = destinos[i].valor;

                // Assim que enviar, troca os values, para garantir que não haverá hacks de alteração
                if (atualizarValue) {
                    inputCartoes[i].value = `${nomeViagem} (${valorViagem})`;
                }
            } else {
                // Oculta se não houverem informações de título
                cartoes[i].style.display = 'none';
            }
        }
    }}
    atualizarDadosDestino(false);


// ATUALIZAR VALOR TOTAL
// Se o usuário atualizar as informações, o valor é atualizado
    inputCartoes.forEach(opcaoDestino => {
        opcaoDestino.addEventListener('click', () => {
            calcularValor();
        })
    })

    inputPessoas.addEventListener('input', () => {
        calcularValor();
    })

// Função para calcular o valor
    function calcularValor() {
        const destinoSelecionado = document.querySelector('.infoDestino input:checked');

        // Se houver um elemento input:checked
        if (destinoSelecionado != null) {
            let valorTotal = Number(destinoSelecionado.value) * Number(inputPessoas.value);
            valorTotalSpan.textContent = valorTotal;
        }
    }


// FORMATAÇÕES
// Formatar o número de Whats
    inputWhats.addEventListener('input', function(e) {
        let input = e.target.value;

        input = input.replace(/\D/g, ''); // Remove tudo que não é dígito

        if (input.length > 10) {
            input = input.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (input.length > 6) {
            input = input.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (input.length > 2) {
            input = input.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            input = input.replace(/^(\d*)/, '($1');
        }
        e.target.value = input;
    });

// Define o input como tipo DATA (evitar que o span suba antes do usuário clicar)
    inputNascimento.addEventListener('click', e => {
        e.target.type = 'date';
    })

// CÓDIGO PARA ENVIO NO GOOGLE SHEETS
    form.addEventListener('submit', function(e) {
        atualizarDadosDestino(true);
        e.preventDefault(); // Impede de enviar o formulário
        // ADICIONAR TELA DE ESPERA! ---------------------------------------
    
        const formData = new FormData(form);
    
        fetch('https://script.google.com/macros/s/AKfycbyTo1VvFzArzFzNRhKytllZdscQnhQue2iU09OS0PrS8L2czM-7EWqt2flNpcn3WOjx/exec', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            form.reset(); // Limpa o formulário após o envio
            valorTotalSpan.textContent = 0;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });