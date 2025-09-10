const desktopScroll = () => {
  window.addEventListener('scroll', setBoxShadow);

  const header = document.querySelector('.header');

  function setBoxShadow() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if(scrollPosition >= 100) {
      if(!header.classList.contains('scrooled')){
        header.classList.add('scrooled');
      }
    }else {
      header.classList.remove('scrooled');
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('wc-link');


  function removeActiveClasses() {
    navLinks.forEach(link => {
      link.parentElement.classList.remove('active-desktop', 'active-mobile');
    })
  };



  function setActiveLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150; // Adiciona um offset para ativar antes de a seção chegar ao topo

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      if (scrollPosition >= sectionTop) {
        currentSectionId = section.id;
      }
    });
    removeActiveClasses();
    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentSectionId)) {
          if (window.matchMedia('(min-width: 769px)').matches) {
            link.parentElement.classList.add('active-desktop');
          } else {
            link.parentElement.classList.add('active-mobile');
          }
        }
      });
    }
  }

  window.addEventListener('scroll', setActiveLink);
  window.addEventListener('resize', setActiveLink);
  setActiveLink();

  desktopScroll();
})

const desktopNavbar = document.querySelector('.desktop-navbar');
const mobileNavContainer = document.getElementById('mobile-nav');


const originalParent = desktopNavbar.parentElement;


const mobileQuery = window.matchMedia('(max-width: 768px)');

function handleMediaQueryChange(e) {
  if (e.matches) {

    mobileNavContainer.appendChild(desktopNavbar);

  } else {
    originalParent.appendChild(desktopNavbar);
    desktopNavbar.style.display = 'flex';
  }
}


mobileQuery.addEventListener('change', handleMediaQueryChange);


handleMediaQueryChange(mobileQuery);