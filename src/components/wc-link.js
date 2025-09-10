// WCLink.js

export class WCLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --hover-color: red;
          --transition: all 0.3s ease-in-out;
          --font-size: 16px;
          --display: flex;
        }
        a {
          box-sizing: border-box;
          color: inherit;
          width: 100%;
          display: var(--display);
          flex-wrap: wrap;
          font-size: var(--font-size);
          justify-content: center;
          align-items: center;
          text-decoration: underline;
          transition: var(--transition);
        }
        a.no-decoration {
          text-decoration: none;
        }
        a:hover {
          color: var(--hover-color);
        }
      </style>
      <a href="#" target="_self">
        <slot></slot>
      </a>
    `;
  }

  static get observedAttributes() {
    return ['href', 'target', 'no-decoration'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const link = this.shadowRoot.querySelector('a');
    if (!link) return;

    switch (name) {
      case 'href':
        if (newValue !== null) {
          link.setAttribute('href', newValue);
        }
        break;
      case 'target':
        if (newValue !== null && newValue !== '_self') {
          link.setAttribute('target', newValue);
        }
        break;
      case 'no-decoration':
        if (this.hasAttribute('no-decoration')) {
          link.classList.add('no-decoration');
        } else {
          link.classList.remove('no-decoration');
        }
        break;
    }
  }

  // Use connectedCallback para adicionar o event listener
  connectedCallback() {
    const link = this.shadowRoot.querySelector('a');
    
    // Adicione um listener de clique ao link
    link.addEventListener('click', (event) => {
      const href = this.getAttribute('href');
      
      // Verifique se o href é uma âncora interna (começa com #)
      if (href && href.startsWith('#')) {
        event.preventDefault(); // Impede o comportamento padrão do link

        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Use o método scrollIntoView para rolagem suave
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // Opcional: Alinha o topo do elemento com o topo da área visível
          });
        }
      }
    });
  }
}