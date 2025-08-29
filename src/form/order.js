/*
============= É preciso resolver o bug quando há atualização manual
============= Ao abrir o modal verificar os itens no carrinho...
*/


const btnProduct = document.getElementById('addOnCart');
const btnReset = document.getElementById('resetCart');
const productModal = document.getElementById('product_modal');

const elemQuant = document.querySelectorAll('.quantity');

let chart = [];

btnProduct.addEventListener('click', (e) => {
  e.preventDefault();
  productModal.classList.add('open');
  atualizaModal();
});

function atualizaModal(){
    // console.table(chart);
    const produtos = document.querySelectorAll('.card_produto');
    produtos.forEach(produto => {
        let hasNone = true;
        // console.log(`Produto: ${produto.children[0].innerText}`);
        chart.forEach(item => {
            // console.log(`Carrinho produto: ${item.key}`);
            if(item.key === produto.children[0].innerText){
                hasNone = false;
                // console.info("Encontrado!");
            }
        });
        if(hasNone){
            const qtdStr = produto.querySelector('.quantity input');
            qtdStr.value = 0;
        }
    })
}

productModal.addEventListener('click', (e) => {
    // Verifica se o clique foi diretamente na modal (e não em seus filhos)
    if (e.target.id === 'product_modal') {
        productModal.classList.remove('open');
    }
});

// Fecha a modal quando o usuário pressiona a tecla 'Esc'
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('open')) {
        productModal.classList.remove('open');
    }
});


elemQuant.forEach(elem => {
    const btn_remove = elem.children[0];
    const input = elem.children[1];
    const btn_add = elem.children[2];

    btn_remove.addEventListener('click', e => {
        e.preventDefault();
        // console.log(`Diminuindo 1 de ${input.id}`);
        if(parseInt(input.getAttribute('value')) > 0){
            sumQuantity(-1);
        }
    });

    function sumQuantity(value){
        input.value= value + parseInt(input.value);
        // console.log(input);
    }
    
    input.addEventListener('change', () => {
        input.setAttribute('value', `${input.value}`);
    })

    btn_add.addEventListener('click', e => {
        e.preventDefault();
        // console.log(`Acrescentando 1 em ${input.id}`);
        sumQuantity(1);
    });
})

const btn_prev = productModal.children[0][1];
const btn_next = productModal.children[0][0].children[1].children[2];


// console.log(productModal.children[0][0].children[1].children[2]);

btn_prev.addEventListener('click', e => {
    e.preventDefault();
    previousItems();
})
btn_next.addEventListener('click', e => {
    e.preventDefault();
    nextItems();
})

const container = productModal.children[0];

function nextItems(){
    const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
    container.scrollBy({left: scrollDistance, behavior: "smooth"});
    // console.log(scrollDistance);
}
function previousItems(){
    const scrollDistance = document.querySelector('.card_produto').getBoundingClientRect().width;
    container.scrollBy({left: -scrollDistance, behavior: "smooth"});
}

const addChart = document.getElementById('submit_chart');
const cleanChart = document.getElementById('reset_order');

addChart.addEventListener('click', e => {
    e.preventDefault();
    // logica para adicionar ao formulário de pedido
    getItems();
    productModal.classList.remove('open');
})
cleanChart.addEventListener('click', e => {
    e.preventDefault();
    // lógica para limpar o que foi selecionado
    removeTable();
    emptyMessage('block');
    clearModalInputs();
    productModal.classList.remove('open');
})


// console.log(elemQuant);

function clearModalInputs() {
    elemQuant.forEach(elem => {
        const input = elem.children[1];
        input.value = 0;
        input.setAttribute("value", "0");
        input.setAttribute("valueAsNumber", 0);
        input.innerText = 0;
        // console.log(input);
    });
}

function getItems() {
    const produtos = document.querySelectorAll('.card_produto');
    const newChart = []; // Crie um novo array para a próxima iteração

    produtos.forEach(produto => {
        const qtdStr = produto.querySelector('.quantity input').value;
        const qtd = parseInt(qtdStr, 10);
        const prod_id = produto.querySelector('label.product').innerText;
        
        if (qtd > 0) {
            const productName = produto.children[0].innerText;
            
            // Cria um novo objeto para o produto
            const novoItem = {
                key: productName,
                value: qtd,
                id: prod_id
            };
            
            // Adiciona o novo item ao array temporário
            newChart.push(novoItem);
        }
    });

    // Agora, vamos atualizar o 'chart' original com base no 'newChart'
    // Esta lógica garante que apenas itens com quantidade > 0 sejam considerados
    chart = newChart;

    if (chart.length > 0) {
        createTable(['produto', 'quantidade', ''], chart);
    } else {
        removeTable();
        emptyMessage('block');
    }
    
    // console.log(chart);
}


const myChart = document.getElementById('itemsOnChart');

function removeTable(){
    try {
        const tb = document.getElementById('produtosCarrinho');
        if(tb) {
            // console.log("Achou a tabela");
            tb.remove();
        }
    } catch(err) {
        console.error(err);
    }
}

function emptyMessage(value){
    const empty = document.getElementById('empty');
    empty.setAttribute('style', `display: ${value};`);
}

function createTable(heads, lines) {
    emptyMessage('none');
    removeTable();

    const tabela = document.createElement('table');
    tabela.id = "produtosCarrinho";
    const thead = document.createElement('thead');
    
    const headRow = document.createElement('tr');
    if(heads.length > 0) {
        for(let i = 0; i < heads.length; i++){
            const newTh = document.createElement('th');
            newTh.innerText = heads[i];
            headRow.appendChild(newTh);
        }
    }
    thead.appendChild(headRow);

    const tbody = document.createElement('tbody');
    if (lines.length) {
        for (let i = 0; i < lines.length; i++) {
            const newRow = document.createElement('tr');
            const newTd = document.createElement('td');
            const newTd2 = document.createElement('td');
            const celulaAcoes = document.createElement('td'); // Crie a célula de ações

            newTd.innerText = lines[i].key;
            newTd2.innerText = lines[i].value;

            // Cria o botão de excluir
            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir'; // Ou adicione um ícone, como '🗑️'
            celulaAcoes.appendChild(btnExcluir);

            // Adiciona a lógica de exclusão ao botão
            btnExcluir.addEventListener('click', () => {
                // Remove o item do array 'chart'
                // Use o 'filter' para remover o item pelo seu 'key'
                chart = chart.filter(item => item.key !== lines[i].key);
                
                // Recria a tabela para refletir a mudança
                if (chart.length > 0) {
                    createTable(heads, chart);
                } else {
                    removeTable();
                    emptyMessage('block');
                }

            });

            newRow.appendChild(newTd);
            newRow.appendChild(newTd2);
            newRow.appendChild(celulaAcoes); // Anexe a célula de ações à linha
            tbody.appendChild(newRow);
        }
    }
    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    myChart.appendChild(tabela);
}

const reset_form = document.getElementById('reset_form');
const send_form = document.getElementById('send_form');
const resetCart = document.getElementById('resetCart');

reset_form.addEventListener('click', () => {
    removeTable();
    emptyMessage('block');
    clearModalInputs();
});

resetCart.addEventListener('click', (e) => {
    e.preventDefault();
    removeTable();
    emptyMessage('block');
    clearModalInputs();
})