// ATUALIZA AS IMAGENS / NOME / VALOR / DOS CARTÕES

    const infoDestino = document.querySelector('.infoDestino');
    const cartoes = document.querySelectorAll('.infoDestino label');
    const inputCartoes = document.querySelectorAll('.infoDestino input')
    const imagensDestinos = document.querySelectorAll('.infoDestino img');
    const tituloCartoes = document.querySelectorAll('.infoDestino h2');
    const valorCartoes = document.querySelectorAll('.infoDestino label span');

    for (let i = 0; i < cartoes.length; i++) {
        // Verifica se há imagens no banco de dados para a viagem
        if (destinos[i].imagens != '') {
            // Atualiza a imagem
            imagensDestinos[i].src = `imagens/destino${i+1}/${destinos[i].imagens[i]}`;

            // Atualiza o título / OPCIONAL replace !!!!!!!!!!!!!!!!!!!!!! Implementar no Google Sheets
            tituloCartoes[i].textContent = destinos[i].titulo.replace(/\*/g, '');

            // Atualiza o valor 
            valorCartoes[i].textContent = 'R$ ' + destinos[i].valor.replace(/,00/g, '') + ',00';
            inputCartoes[i].value = destinos[i].valor.replace(/,00/g, '');

        } else {
            cartoes[i].style.display = 'none';
            console.log('sem img')
        }
    }


// BACK

    // Inputs
    const inputs = document.querySelectorAll('.formDados input')
    const inputNome = document.getElementById('nome');
    const inputPessoas = document.getElementById('pessoas');
    const inputWhats = document.getElementById('whats');
    const inputsPagamento = document.getElementById('pagamento');
    const inputObservacao = document.getElementById('observacao');

    // Valor
    const valorP = document.querySelector('.valorTotal');

    // Botões
    const btnLimpar = document.getElementById('btnLimpar');
    const btnCalcular = document.getElementById('btnCalcular');
    const btnEnviar = document.getElementById('btnEnviar');

    // Campos obrigatórios
    const camposObrigatorios = document.querySelectorAll('.campoObrigatorio');

    let valorTotal;

    function atualizarValor() {
        const destinoSelecionado = document.querySelector('.infoDestino input:checked');
        valorTotal = destinoSelecionado.value * inputPessoas.value;
        valorP.textContent = `R$ ${valorTotal},00`;
    }


// Clique botão CALCULAR
    btnCalcular.addEventListener('click', ()=> {
        let verificarPreenchimento = 0;

        // Verifica se alguma opção de destino está Check
        const destinosCheck = document.querySelector('.infoDestino input:checked') != null;
        if (destinosCheck) {
            verificarPreenchimento += 1;
        } else {
            infoDestino.style.border = '3px solid red';
            setTimeout(()=> {
                infoDestino.style.border = 'none';
            }, 4000)
        }

        // Verifica cada input obrigatório
        for (let i = 0; i < (camposObrigatorios.length); i++) {
            // Verifica se campos estão preenchidos
            if (inputs[i].value != '') {
                verificarPreenchimento += 1;
            } else {
                // Marcar vermelho
                inputs[i].style.border = '3px solid red';
                // Voltar ao normal
                setTimeout(()=> { inputs[i].style.border = '1px solid #b3b3b3' }, 4000)
            }
        }

        console.log(verificarPreenchimento)

        // Se todos estiverem preenchidos
        if (verificarPreenchimento >= (camposObrigatorios.length + 1)) {
            console.log('todos os campos estão preenchidos!')
            atualizarValor();
        } else {
            console.log('faltam ' + (5 - verificarPreenchimento) + ' campos');
        }
    })












    
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


// Botões página

        //buttonCima
        //buttonBaixo

        const infoPessoais = document.querySelector('.infoPessoais');
        //const infoDestino = document.querySelector('.infoDestino'); - JÁ EXISTE
        const infoViagem = document.querySelector('.infoViagem');
        const revisao = document.querySelector('.revisao');

        const btnAnterior = document.getElementById('btnAnterior');
        const btnProximo = document.getElementById('btnProximo');








        // ENVIAR

        const form = document.getElementById('formReserva');

        form.addEventListener('submit', function(e) {
          e.preventDefault();
      
          const formData = new FormData(form);
      
          fetch('https://script.google.com/macros/s/AKfycbyTo1VvFzArzFzNRhKytllZdscQnhQue2iU09OS0PrS8L2czM-7EWqt2flNpcn3WOjx/exec', {
            method: 'POST',
            body: formData,
          })
          .then(response => response.text())
          .then(result => {
            alert(result);
            form.reset(); // Limpa o formulário após o envio
          })
          .catch(error => {
            console.error('Erro:', error);
          });
        });
