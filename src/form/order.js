const btnProduct = document.getElementById('addOnCart');
const btnReset = document.getElementById('resetCart');
const productModal = document.getElementById('product_modal');

const elemQuant = document.querySelectorAll('.quantity');

btnProduct.addEventListener('click', (e) => {
  e.preventDefault();
  productModal.classList.add('open');
});

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
        let qtd = parseInt(input.getAttribute('value'));
        input.setAttribute('value', qtd+value);
        // console.log(input);
    }

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
})
cleanChart.addEventListener('click', e => {
    e.preventDefault();
    // lógica para limpar o que foi selecionado
})