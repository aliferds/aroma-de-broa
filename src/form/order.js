import { localGet, localRemove, localSave } from "../utils/localStorage.js";
import { openModal } from "./openModal.js";
import { isInputValid } from "./validarInputs.js";

// === SELETORES DE ELEMENTOS DO DOM ===
const btnProduct = document.getElementById('addOnCart');
const productModal = document.getElementById('product_modal');
const elemQuant = document.querySelectorAll('.quantity');
const addChartBtn = document.getElementById('submit_chart');
const cleanChartBtn = document.getElementById('reset_order');
const resetFormBtn = document.getElementById('reset_form');
const resetCartBtn = document.getElementById('resetCart');
const myChartContainer = document.getElementById('itemsOnChart');
const emptyMessageElem = document.getElementById('empty');
const prevBtn = document.getElementById('prev_btn'); // Use IDs para maior segurança
const nextBtn = document.getElementById('next_btn'); // Use IDs para maior segurança

// === VARIÁVEL DE ESTADO DO CARRINHO ===
let chart = [];

// === FUNÇÕES DE UTILIDADE ===

/**
 * Remove caracteres de moeda e espaços e converte a string para um número.
 * @param {string} priceText - A string de preço (ex: "R$ 15,00").
 * @returns {number} - O valor numérico (ex: 15.00).
 */
function parsePrice(priceText) {
    // Usa uma regex para remover tudo que não seja número, ponto ou vírgula
    let valorLimpo = priceText.replace(/[^0-9,.]/g, '');
    // Substitui a vírgula por ponto para parseFloat
    valorLimpo = valorLimpo.replace(',', '.');
    return parseFloat(valorLimpo);
}

/**
 * Limpa todos os inputs de quantidade do modal.
 */
function clearModalInputs() {
    elemQuant.forEach(elem => {
        const input = elem.querySelector('input');
        input.value = 0;
    });
}

/**
 * Atualiza a visibilidade da mensagem de carrinho vazio.
 * @param {boolean} isVisible - Se a mensagem deve ser visível ou não.
 */
function setEmptyMessageVisibility(isVisible) {
    emptyMessageElem.style.display = isVisible ? 'block' : 'none';
}

/**
 * Salva o carrinho no localStorage e atualiza a exibição.
 */
function saveAndRenderChart() {
    localSave('carrinho', chart);
    if (chart.length > 0) {
        createTable(['produto', 'quantidade', 'valor unid.', 'subtotal', ''], chart);
    } else {
        removeTable();
        setEmptyMessageVisibility(true);
    }
}

/**
 * Limpa completamente o carrinho (variável, localStorage e DOM).
 */
function clearChart() {
    chart = [];
    localRemove('carrinho');
    removeTable();
    setEmptyMessageVisibility(true);
    clearModalInputs();
    const obs = form.querySelector('textarea');
    obs.value = '';
}

/**
 * Remove a tabela do carrinho do DOM.
 */
function removeTable() {
    const existingTable = document.getElementById('produtosCarrinho');
    if (existingTable) {
        existingTable.remove();
    }
}



/**
 * Cria e renderiza a tabela do carrinho.
 * @param {Array<string>} heads - Os cabeçalhos da tabela.
 * @param {Array<object>} lines - Os dados das linhas.
 */
function createTable(heads, lines) {
    removeTable();
    setEmptyMessageVisibility(false);

    const tabela = document.createElement('table');
    tabela.id = "produtosCarrinho";
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headRow = document.createElement('tr');
    heads.forEach(headText => {
        const newTh = document.createElement('th');
        newTh.innerText = headText;
        newTh.classList.add('uppercase');
        headRow.appendChild(newTh);
    });
    thead.appendChild(headRow);

    function float2Real(value){
        const result = `R$ ${value.toFixed(2).replace('.', ',')}`;
        return result;
    }

    lines.forEach(item => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${item.key}</td>
            <td>${item.value}</td>
            <td>${float2Real(item.price)}</td>
            <td>${float2Real(item.subTotal)}</td>
            <td>
                <button class="remove-item-btn" data-key="${item.key}">
                    <svg fill="#ff4646" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 485 485" xml:space="preserve">
                        <g><g>
                            <rect x="67.224" width="350.535" height="71.81"/>
                            <path d="M417.776,92.829H67.237V485h350.537V92.829H417.776z M165.402,431.447h-28.362V146.383h28.362V431.447z M256.689,431.447h-28.363V146.383h28.363V431.447z M347.97,431.447h-28.361V146.383h28.361V431.447z"/>
                        </g></g>
                    </svg>
                </button>
            </td>
        `;
        tbody.appendChild(newRow);
    });

    function sumTotal() {
        let valor = 0.0;
        chart.forEach(item => {
            valor+=item.subTotal;
        })
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    const value = chart.length > 0 ? sumTotal() : "R$ 0,00"
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td class='uppercase bold'>Total</td>
        <td></td>
        <td></td>
        <td></td>
        <td>${value}</td>
    `;
    tbody.appendChild(totalRow);

    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    myChartContainer.appendChild(tabela);

    // Adiciona event listener para o clique em todos os botões de remover da tabela
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const keyToRemove = btn.getAttribute('data-key');
            try {
                const confirmar = await openModal('Deseja excluir este item da sua lista de compras?', true);
                if (confirmar) {
                    chart = chart.filter(item => item.key !== keyToRemove);
                    saveAndRenderChart();
                }
            } catch (error) {
                console.error('Ocorreu um erro ao abrir o modal:', error);
            }
        });
    });
}


const container = productModal.children[0];

const btn_prev = document.getElementById('previous');
const btn_next = document.getElementById('next');  

btn_prev.addEventListener('click', e => {
    e.preventDefault();
    previousItems();
});
btn_next.addEventListener('click', e => {
    e.preventDefault();
    nextItems();
});


function nextItems(){
    const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
    container.scrollBy({left: scrollDistance, behavior: "smooth"});
    // console.log(scrollDistance);
}
function previousItems(){
    const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
    container.scrollBy({left: -scrollDistance, behavior: "smooth"});
}


// === EVENTOS E INICIALIZAÇÃO ===

// Eventos para abrir e fechar o modal
btnProduct.addEventListener('click', (e) => {
    e.preventDefault();
    productModal.classList.add('open');
    atualizaModalInputs();
});

productModal.addEventListener('click', (e) => {
    if (e.target.id === 'product_modal') {
        productModal.classList.remove('open');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('open')) {
        productModal.classList.remove('open');
    }
});

// Eventos dos botões de quantidade
elemQuant.forEach(elem => {
    const btn_remove = elem.children[0];
    const input = elem.children[1];
    const btn_add = elem.children[2];

    btn_remove.addEventListener('click', e => {
        e.preventDefault();
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
        }
    });

    btn_add.addEventListener('click', e => {
        e.preventDefault();
        input.value = parseInt(input.value) + 1;
    });
});

// Eventos para botões de controle do carrinho
addChartBtn.addEventListener('click', e => {
    e.preventDefault();
    const produtos = document.querySelectorAll('.card_produto');
    const newChart = [];

    produtos.forEach(produto => {
        const qtdStr = produto.querySelector('.quantity input').value;
        const qtd = parseInt(qtdStr, 10);

        if (qtd > 0) {
            const productName = produto.querySelector('label.product').innerText;
            const prod_id = produto.querySelector('label.product').innerText;
            const priceText = produto.querySelector('span.price').innerText;
            const price = parsePrice(priceText);
            const subTotal = price * qtd;

            newChart.push({
                key: productName,
                value: qtd,
                price: price,
                id: prod_id,
                subTotal: subTotal
            });
        }
    });

    chart = newChart;
    saveAndRenderChart();
    productModal.classList.remove('open');
});

cleanChartBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const confirmar = await openModal(`Tem certeza que gostaria de remover TODOS os itens da sua lista de compras?`, true);
        if (confirmar) {
            clearChart();
            productModal.classList.remove('open');
        }
    } catch (error) {
        console.error('Ocorreu um erro ao abrir o modal:', error);
    }
});

resetFormBtn.addEventListener('click', async () => {
    try {
        const confirmar = await openModal('Quer limpar todos os campos deste formulário?', true);
        if (confirmar) {
            clearChart();
        }
    } catch (error) {
        console.error('Ocorreu um erro ao abrir o modal:', error);
    }
});

resetCartBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const confirmar = await openModal(`Deseja retirar todos os itens da sua lista de compras?`, true);
        if (confirmar) {
            clearChart();
        }
    } catch (error) {
        console.error('Ocorreu um erro ao abrir o modal:', error);
    }
});


/**
 * =======================FUNÇÕES DO CAROUSEL =================================
*/
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
        productModal.querySelector('.modal_body').scrollBy({ left: -scrollDistance, behavior: "smooth" });
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
        productModal.querySelector('.modal_body').scrollBy({ left: scrollDistance, behavior: "smooth" });
    });
}

/**
 * Atualiza os inputs de quantidade do modal com os valores do carrinho.
 */
function atualizaModalInputs() {
    const produtos = document.querySelectorAll('.card_produto');
    produtos.forEach(produto => {
        const prodName = produto.children[0].innerText;
        const input = produto.querySelector('.quantity input');
        const itemInChart = chart.find(item => item.key === prodName);
        input.value = itemInChart ? itemInChart.value : 0;
    });
}
/**
 * ================== CARREGA ITENS DO CARRINHO ================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const localData = localGet('carrinho');
    if (localData) {
        chart = localData;
        saveAndRenderChart();
    } else {
        setEmptyMessageVisibility(true);
    }
});


/**
 * ======================== BUSCA NO CARRINHO ==================================
 */
// Obtém o campo de busca
const searchInput = document.getElementById('product_search');

// Obtém todos os cards de produtos
const allProductCards = document.querySelectorAll('.card_produto');

// Adiciona um listener para a busca
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Filtra os cards para encontrar os que correspondem à busca
    const filteredCards = Array.from(allProductCards).filter(card => {
        const productName = card.querySelector('label.product').textContent.toLowerCase().trim();
        // console.log(productName.includes(searchTerm));
        return productName.includes(searchTerm);
    });

    // Exibe os cards filtrados e esconde os demais
    allProductCards.forEach(card => card.style.display = 'none');
    filteredCards.forEach(card => card.style.display = 'grid');

});



/**
 * ============================= ENVIA FORMULARIO ==============================
 */
const form = document.querySelector('form#pedido');
const submit = document.getElementById('send_form');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let isFormValid = true;
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        // console.log(input);
        // console.log(`${input.type} \n ${input}`);
        if(input.required){
        const isValid = isInputValid(input);
        // console.log(`Validando ${input.id}: ${isValid}`);
        if(!isValid) {
            isFormValid = false;
            input.classList.add('invalid');
        }
        }
    })
    const items = document.querySelector('#produtosCarrinho');
    const paragraph_items = document.querySelector('#itemsOnChart p');
    paragraph_items.classList.add('invalid');
    if(!items){
        isFormValid = false;
    }
    if(isFormValid){
        // console.log(`Form validado!`);
        const orderToSend = {};
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            if(input.type !== 'reset' && input.type !== 'submit'){
                const input_key = input.id;
                const value = input.value;
                orderToSend[input_key] = value;
            }
        });
        const pedidos = [];
        chart.forEach(item => {
            const id = item.id;
            const nome = item.key;
            const qtd = item.value;
            pedidos.push({
                id: id,
                name: nome,
                quantidade: qtd
            })
        });
        orderToSend['pedido'] = pedidos;
        
        let confirmarPedido = ``;
        pedidos.forEach(pedido => {
            confirmarPedido+=`<p>${pedido.quantidade}x ${pedido.name}</p>`
        });

        const observacoes = form.querySelector('textarea').value;
        orderToSend['observacao'] = observacoes;

        let totalAmount = 0.0;
        chart.forEach(item => {
            totalAmount+=item.subTotal;
        })

        console.log(orderToSend);
        try{
            const confirmar = await openModal(`
                <h1>Confirmar Pedido</h1>
                <p>
                    <span class="bold">
                        Nome: 
                    </span>
                    ${orderToSend['nome']}
                </p>
                    
                <p>
                    <span class="bold">
                        telefone: 
                    </span>
                    ${orderToSend['telefone']}</p>
                <p>
                    <span class="bold">
                        email: 
                    </span>
                    ${orderToSend['email']}</p>
                ${confirmarPedido}
                <p>Observação:</p>
                <p>${orderToSend['observacao']}</p>
                <p>
                    <span class="bold">
                        Total R$${totalAmount.toFixed(2).replace('.', ',')}
                    </span>
                </p>
            `, true);
            if(confirmar){
                console.log('Pedido enviado!');
                form.reset();
                clearChart();
            }
        } catch (error) { console.error(`Erro ao abrir modal: ${error}`) }
        

        // Colocar lógica para enviar para API
    
  } else {
    openModal(`<p>Preencha todos os campos!<p>`);
  }
})