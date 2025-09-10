export class RodapeAlifer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        a {
          text-decoration: none;
          color: inherit;
        }
        footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 5px;
          box-sizing: border-box;
        }
        @media(max-width: 500px) {
          footer {
            flex-direction: column;
          }
        }
      </style>
      <footer>
        <span data-lang-key="credits">
          Criação e desenvolvimento por 
        </span>
        <span>
          <a href="https://www.aliferdev.digital/">Alifer DS </a>
          &copy; 2025
        </span>
      </footer>
    `;

  }
}