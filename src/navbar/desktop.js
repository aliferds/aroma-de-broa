export const navbarMenu = () => {
  const navLinks = document.querySelectorAll('.nav-items a[href^="#"]');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight; 
        const scrollPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        navLinks.forEach(item => item.parentElement.classList.remove('active'));
        this.parentElement.classList.add('active');
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink() {
    const scrollY = window.pageYOffset; // Posição atual do scroll
    const navbarHeight = navbar.offsetHeight; // Altura da navbar para offset

    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop - navbarHeight; // Ajusta o topo da seção pelo navbar
      
      if(header.offsetTop >= 572){
        header.classList.add('scrooled');
        console.log('add');
      }else {
        console.log('remove');
        header.classList.remove('scrooled');
      }
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight - 50) {
        navLinks.forEach(link => link.parentElement.classList.remove('active'));

        // Encontra o link correspondente à seção ativa
        const matchingLink = document.querySelector(`.nav-items a[href="#${currentSection.id}"]`);
        if (matchingLink) {
          matchingLink.parentElement.classList.add('active'); // Adiciona 'active' ao pai (nav-item)
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink);
}