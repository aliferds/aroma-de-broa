const btnProduct = document.getElementById('addOnCart');
const btnReset = document.getElementById('resetCart');
const productModal = document.getElementById('product_modal');


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