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