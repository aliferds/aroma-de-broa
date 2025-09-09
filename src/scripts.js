import { navbarMenu } from "./navbar/desktop.js";
import { mobileMenu } from './navbar/mobile.js';
import { caroussel } from "./components/carrousel.js";

document.addEventListener("DOMContentLoaded", () => {
    caroussel();
    navbarMenu();
    mobileMenu();
});