const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUpButton = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');
const loader = document.getElementById('loading-overlay');

// Toggle Menu
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose && navMenu) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// Close menu when link is clicked
const linkAction = () => navMenu?.classList.remove('show-menu');
navLinks.forEach(navLink => navLink.addEventListener('click', linkAction));

// Header Blur Effect
const blurHeader = () => {
    if (header) {
        window.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
    }
};

// Scroll Up Button Visibility
const scrollUp = () => {
    if (scrollUpButton) {
        window.scrollY >= 350 ? scrollUpButton.classList.add('show-scroll') : scrollUpButton.classList.remove('show-scroll');
    }
};

// Highlight active link based on scroll position
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

// Hide loader on page load
window.addEventListener('load', () => loader?.classList.add('hide'));

// ScrollReveal Animations
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

// Attach scroll event listeners
window.addEventListener('scroll', () => {
    blurHeader();
    scrollUp();
    scrollActive();
});
