export class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Define o HTML interno com as duas versões do navbar
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          box-sizing: border-box;
          width: 100%;
        }
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
      </style>
      <nav class="navbar">
        <ul class="nav-items">
          <slot name="nav-link"></slot>
        </ul>
      </nav>
    `;
  }
}