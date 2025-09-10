import { desktopScroll } from "./navbar/interactions.js";
import { caroussel } from "./components/carrousel.js";

import { RodapeAlifer } from "./components/rodape-alifer.js";
import { WCLink } from "./components/wc-link.js";
import { NavBar } from "./components/adb-navbar.js";

customElements.define('rodape-alifer', RodapeAlifer);
customElements.define('wc-link', WCLink);
customElements.define('ul-navbar', NavBar);

document.addEventListener("DOMContentLoaded", () => {
    caroussel();
    desktopScroll();
});