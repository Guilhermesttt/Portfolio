const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('show-menu');
    }
};

navLinks.forEach(navLink => navLink.addEventListener('click', linkAction));

const blurHeader = () => {
    const header = document.getElementById('header');
    if (header) {
        window.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
    }
};
window.addEventListener('scroll', blurHeader);

const scrollUp = () => {
    const scrollUpButton = document.getElementById('scroll-up');
    if (scrollUpButton) {
        window.scrollY >= 350 ? scrollUpButton.classList.add('show-scroll') : scrollUpButton.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', scrollUp);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(currentSection => {
        const sectionHeight = currentSection.offsetHeight;
        const sectionTop = currentSection.offsetTop - 58;
        const sectionId = currentSection.getAttribute('id');
        const sectionNavLink = document.querySelector('.nav__link[href*="' + sectionId + '"]');

        if (sectionNavLink) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionNavLink.classList.add('active-link');
            } else {
                sectionNavLink.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', scrollActive);

window.addEventListener('load', function() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        loader.classList.add('hide');
    }
});

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    // reset: true, // Animations repeat
});

sr.reveal('.home__img, .new__data, .about__img, .contact__content, .footer');
sr.reveal('.about__list, .contact__img', { delay: 500 });
sr.reveal('.new__card', { delay: 500, interval: 100 });
sr.reveal('.shop__card', { interval: 100 });
