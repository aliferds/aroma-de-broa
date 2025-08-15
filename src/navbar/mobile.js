export const mobileMenu = () => {
    const bottomMenu = document.getElementById('bottom-menu');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    const menuHeight = bottomMenu.offsetHeight;

    const contentHeight = header.offsetHeight + main.offsetHeight + footer.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition < contentHeight) {
            bottomMenu.classList.add('visible');
        }
    });
}