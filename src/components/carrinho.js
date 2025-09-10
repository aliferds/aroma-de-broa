import { localGet } from '../utils/localStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  const myChart = localGet('carrinho');
  const carrinho = document.querySelector('a.carrinho');
  if(myChart !== null) {
    // console.log(myChart.length);
    const tagCarrinho = document.createElement('style');
    tagCarrinho.innerHTML = `
      .carrinho::before {
        content: '${myChart.length}';
        color: var(--pale_sand);
        background-color: #ff4646;
        position: absolute;
        min-width: 0.5rem;
        min-height: 0.5rem;
        padding: 0.2rem;
        font-size: 0.5rem;
        text-align: center;
        border-radius: 50%;
        right: 16px;
        top: 25%;
      }
    `;
    carrinho.appendChild(tagCarrinho);
  }
})