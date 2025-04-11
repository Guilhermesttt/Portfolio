// Elementos principais
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUpButton = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');
const loader = document.getElementById('loading-overlay');

/*=============== MENU SHOW/HIDE ===============*/
navToggle?.addEventListener('click', () => navMenu?.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu?.classList.remove('show-menu'));

/*=============== CLOSE MENU ON LINK CLICK ===============*/
navLinks.forEach(link => 
    link.addEventListener('click', () => navMenu?.classList.remove('show-menu'))
);

/*=============== HEADER BLUR ON SCROLL ===============*/
const blurHeader = () => {
    header?.classList.toggle('blur-header', window.scrollY >= 50);
};

/*=============== SHOW SCROLL-UP BUTTON ===============*/
const scrollUp = () => {
    scrollUpButton?.classList.toggle('show-scroll', window.scrollY >= 350);
};

/*=============== ACTIVE LINK BASED ON SECTION ===============*/
const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 58;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        navLink?.classList.toggle('active-link', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
    });
};

/*=============== PAGE LOADER ===============*/
window.addEventListener('load', () => loader?.classList.add('hide'));

/*=============== SCROLL EVENTS ===============*/
window.addEventListener('scroll', () => {
    blurHeader();
    scrollUp();
    scrollActive();
});

/*=============== SCROLLREVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
});

sr.reveal('.home__img, .new__data, .about__img, .contact__content, .footer');
sr.reveal('.about__list, .contact__img', { delay: 500 });
sr.reveal('.new__card', { delay: 500, interval: 100 });
sr.reveal('.shop__card', { interval: 100 });
