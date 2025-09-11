export class WcModal extends HTMLElement {
  constructor() {
    super();

    // Cria o Shadow DOM
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Cria o wrapper do modal
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal-wrapper');

    // Cria o contêiner do modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    // Cria o botão de fechar
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';

    // Cria o slot para o conteúdo dinâmico
    const contentSlot = document.createElement('slot');

    // Adiciona os elementos ao contêiner
    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(contentSlot);

    // Adiciona a folha de estilo ao Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      .modal-wrapper {
        position: var(--wc-modal-position, fixed);
        top: var(--wc-modal-top, 0);
        left: var(--wc-modal-left, 0);
        width: var(--wc-modal-width, 100%);
        height: var(--wc-modal-height, 100%);
        background-color: var(--wc-modal-bg-color, rgba(0, 0, 0, 0.7));
        display: var(--wc-modal-display, flex);
        justify-content: var(--wc-modal-justify-content, center);
        align-items: var(--wc-modal-align-items, center);
        z-index: var(--wc-modal-z-index, 1000);
        opacity: var(--wc-modal-opacity, 0);
        visibility: var(--wc-modal-visibility, hidden);
        transition: var(--wc-modal-transition, all 0.3s ease);
      }

      .modal-wrapper.active {
        opacity: var(--wc-modal-active-opacity, 1);
        visibility: var(--wc-modal-active-visibility, visible);
      }

      .modal-container {
        background-color: var(--wc-modal-container-bg-color, white);
        padding: var(--wc-modal-container-padding, 2rem);
        border-radius: var(--wc-modal-container-border-radius, 8px);
        position: relative;
        max-width: var(--wc-modal-container-max-width, 500px);
        box-shadow: var(--wc-modal-container-box-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
        transform: scale(0.95);
        transition: all 0.3s ease;
      }

      .modal-wrapper.active .modal-container {
        transform: scale(1);
      }

      .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      .confirm-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
      }

      .confirm, .cancel {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        border: none;
      }

      .confirm {
        background-color: var(--wc-modal-btn-confirm, #28a745);
        color: var(--wc-modal-btn-color, white);
      }

      .cancel {
        background-color: var(--wc-modal-btn-cancel, #dc3545);
        color: var(--wc-modal-btn-color, white);
      }
    `;

    // Adiciona os elementos ao Shadow DOM
    shadowRoot.appendChild(style);
    modalWrapper.appendChild(modalContainer);
    shadowRoot.appendChild(modalWrapper);
  }

  connectedCallback() {
    // Adiciona um listener para o botão de fechar
    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.addEventListener('click', () => this.close(false));

    // Fecha o modal ao clicar fora dele
    const modalWrapper = this.shadowRoot.querySelector('.modal-wrapper');
    modalWrapper.addEventListener('click', (event) => {
      if (event.target === modalWrapper) {
        this.close(false);
      }
    });

    // Fecha o modal ao pressionar a tecla 'Esc'
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.shadowRoot.querySelector('.modal-wrapper').classList.contains('active')) {
        this.close(false);
      }
    });

    // Adiciona os botões de confirmação se o atributo estiver presente
    const isConfirm = this.hasAttribute('confirm');
    if (isConfirm) {
      this._addConfirmButtons();
    }
  }

  _addConfirmButtons() {
    const modalContainer = this.shadowRoot.querySelector('.modal-container');
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('confirm-buttons');

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';
    confirmButton.classList.add('confirm');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.classList.add('cancel');

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    modalContainer.appendChild(buttonContainer);

    this.confirmButton = confirmButton;
    this.cancelButton = cancelButton;
  }

  open() {
    if(this.hasAttribute('confirm')){
      return this.openAndConfirm();
    }else {
      this.openSimpleModal();
    }
  }

  openSimpleModal() {
    this.shadowRoot.querySelector('.modal-wrapper').classList.add('active');
  }

  close(result) {
    this.shadowRoot.querySelector('.modal-wrapper').classList.remove('active');
    // Emite um evento personalizado com o resultado
    this.dispatchEvent(new CustomEvent('modalclosed', {
      detail: { result }
    }));
  }

  openAndConfirm() {
    return new Promise((resolve) => {
      this.openSimpleModal();
      
      const confirmButton = this.shadowRoot.querySelector('.confirm');
      const cancelButton = this.shadowRoot.querySelector('.cancel');
      const closeButton = this.shadowRoot.querySelector('.close-button');
      const modalWrapper = this.shadowRoot.querySelector('.modal-wrapper');

      const handleConfirm = () => {
        this.close(true);
        resolve(true);
      };

      const handleCancel = () => {
        this.close(false);
        resolve(false);
      };

      const handleWrapperClick = (event) => {
        if (event.target === modalWrapper) {
          handleCancel();
        }
      };

      if (confirmButton) {
        confirmButton.addEventListener('click', handleConfirm);
        this.confirmButtonListener = handleConfirm;
      }
      if (cancelButton) {
        cancelButton.addEventListener('click', handleCancel);
        this.cancelButtonListener = handleCancel;
      }
      
      closeButton.addEventListener('click', handleCancel);
      this.closeButtonListener = handleCancel;
      
      modalWrapper.addEventListener('click', handleWrapperClick);
      this.wrapperClickListener = handleWrapperClick;
    });
  }
}