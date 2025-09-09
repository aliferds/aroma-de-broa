import { navbarMenu } from "./navbar/desktop.js";
import { mobileMenu } from './navbar/mobile.js';
import { caroussel } from "./components/carrousel.js";
import { RodapeAlifer } from "../componentes/rodape-alifer.js";

customElements.define('rodape-alifer', RodapeAlifer);


document.addEventListener("DOMContentLoaded", () => {
    caroussel();
    navbarMenu();
    mobileMenu();
});