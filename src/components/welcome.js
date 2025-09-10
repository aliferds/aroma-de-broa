document.addEventListener('DOMContentLoaded', () => {
   // A chave que vamos usar para marcar a visita nesta sessão
    const hasVisitedSessionKey = 'hasVisitedThisSession';

    if (!sessionStorage.getItem(hasVisitedSessionKey)) {
      const modal = document.createElement('wc-modal');
      
      modal.innerHTML = `
        <style>
          wc-modal {
            --wc-modal-container-bg-color: var(--pale_sand);
          }
          p {
            margin-top: 1rem;
          }
        </style>
        <h1>Bem-vindo ao site da padaria Aroma de Broa</h1>
        <p>
          Aqui você irá encontrar todos os nossos produtos, informações
          sobre a padaria e contatos. Tanbém será possível fazer suas compras
          por aqui.
        </p>
      `;

      document.body.appendChild(modal);
      modal.open();
      sessionStorage.setItem(hasVisitedSessionKey, 'true');
  }
});