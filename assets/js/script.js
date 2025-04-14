// Elementos principais
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUpBtn = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');
const loader = document.getElementById('loading-overlay');

// Sons
const openSound = new Audio('assets/Sounds/open.mp3');
const closeSound = new Audio('assets/Sounds/close.mp3');

const scrollSound = new Audio('assets/Sounds/backtotop.mp3'); 

/*=============== MENU SHOW/HIDE COM SOM ===============*/
navToggle?.addEventListener('click', () => {
    navMenu?.classList.add('show-menu');
    openSound.currentTime = 0.5;
    openSound.play();
  });
  
  navClose?.addEventListener('click', () => {
    navMenu?.classList.remove('show-menu');
    closeSound.currentTime = 0.4;
    closeSound.play();
  });   

/*=============== FECHAR MENU AO CLICAR EM LINK ===============*/
navLinks.forEach(link =>
    link.addEventListener('click', () => {
      navMenu?.classList.remove('show-menu');
      closeSound.currentTime = 0.4  ;
      closeSound.play();
    })
  );

/*=============== FUNÇÕES DE SCROLL ===============*/
const onScroll = () => {
  const scrollY = window.scrollY;

  // Header blur
  header?.classList.toggle('blur-header', scrollY >= 50);

  // Botão "scroll-up"
  scrollUpBtn?.classList.toggle('show-scroll', scrollY >= 350);

  // Ativar link de seção
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 58;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    navLink?.classList.toggle(
      'active-link',
      scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
    );
  });
};

/*=============== BOTÃO DE SCROLL PARA O TOPO COM SOM ===============*/
scrollUpBtn?.addEventListener('click', (e) => {
  e.preventDefault();

  scrollSound.currentTime = 0;
  scrollSound.volume = 0.5;
  scrollSound.play().catch(() => {});

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/*=============== ESCONDER LOADER AO CARREGAR PÁGINA ===============*/
window.addEventListener('load', () => loader?.classList.add('hide'));

/*=============== EVENTO DE SCROLL ===============*/
window.addEventListener('scroll', onScroll);

/*=============== SCROLLREVEAL ANIMAÇÕES ===============*/
ScrollReveal().reveal('.home__img, .new__data, .about__img, .contact__content, .footer', {
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 300,
});
ScrollReveal().reveal('.about__list, .contact__img', { delay: 500 });
ScrollReveal().reveal('.new__card', { delay: 500, interval: 100 });
ScrollReveal().reveal('.shop__card', { interval: 100 });


