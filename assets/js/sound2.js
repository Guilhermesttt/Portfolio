  // Elementos principais
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.getElementById('header');
  const scrollUpBtn = document.getElementById('scroll-up');
  const sections = document.querySelectorAll('section[id]');
  const loader = document.getElementById('loading-overlay');
  // Backdrop para nav
  let navBackdrop = document.querySelector('.nav-backdrop');
  if (!navBackdrop) {
    navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);
  }

  // Sons
  const openSound = new Audio('assets/Sounds/open.mp3');
  const closeSound = new Audio('assets/Sounds/close.mp3');
  const scrollSound = new Audio('assets/Sounds/backtotop.mp3');
  const navSound = new Audio('assets/Sounds/Nav SFX.mp3');
  const linkSound = new Audio('assets/Sounds/Link SFX.mp3');
  const hoverSound = new Audio('assets/Sounds/hover.mp3');
  
  // Configurar volume e preload (otimizado para mobile)
  [openSound, closeSound, scrollSound, navSound, linkSound, hoverSound].forEach(sound => {
    sound.volume = 0.3; // Volume menor para mobile
    sound.preload = 'auto';
    sound.load(); // Força o carregamento
  });
  
  // Sistema de pré-carregamento leve de áudio
  let audioPrimed = false;
  
  // Função para pré-carregar áudio de forma leve
  function primeAudioLight() {
    if (audioPrimed) return;
    
    try {
      // Verifica se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Configura volume baseado no dispositivo
      const volume = isMobile ? 0.2 : 0.25;
      
      // Pré-carrega todos os sons de forma leve
      [openSound, closeSound, scrollSound, navSound, linkSound, hoverSound].forEach(sound => {
        sound.volume = volume;
        sound.preload = 'auto';
        
        // Tenta carregar o áudio sem tocar
        if (sound.readyState === 0) {
          sound.load();
        }
      });
      
      audioPrimed = true;
      console.log('Áudio pré-carregado com sucesso (modo leve)');
      
    } catch (error) {
      console.log('Erro ao pré-carregar áudio:', error);
    }
  }
  
  // Pré-carregar áudio automaticamente quando o site carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', primeAudioLight);
  } else {
    primeAudioLight();
  }
  
  // Também pré-carregar na primeira interação do usuário (fallback)
  ['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, primeAudioLight, { once: true });
  });

  /*=============== MENU SHOW/HIDE COM SOM e ACESSIBILIDADE ===============*/
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function enableMenu() {
    if (!navMenu) return;
    navMenu.classList.add('show-menu');
    navToggle?.setAttribute('aria-expanded', 'true');
    
    // Menu aberto (sem som)
    
    document.body.classList.add('no-scroll');
    navBackdrop.classList.add('is-visible');

    // Focus trap no menu mobile
    const focusable = navMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (first) first.focus();

    function trap(e) {
      if (e.key === 'Escape') { disableMenu(); }
      if (e.key === 'Tab' && focusable.length) {
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    navMenu._trapHandler = trap;
    document.addEventListener('keydown', trap);

    // Fechar ao clicar fora
    function onDocClick(ev) {
      if (!navMenu.contains(ev.target) && ev.target !== navToggle) { disableMenu(); }
    }
    navMenu._outsideHandler = onDocClick;
    document.addEventListener('click', onDocClick);
    navBackdrop.addEventListener('click', disableMenu, { once: true });
  }

  function disableMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('show-menu');
    navToggle?.setAttribute('aria-expanded', 'false');
    
    // Menu fechado (sem som)
    
    if (navMenu._trapHandler) { document.removeEventListener('keydown', navMenu._trapHandler); navMenu._trapHandler = null; }
    if (navMenu._outsideHandler) { document.removeEventListener('click', navMenu._outsideHandler); navMenu._outsideHandler = null; }
    navToggle?.focus();
    document.body.classList.remove('no-scroll');
    navBackdrop.classList.remove('is-visible');
  }

  navToggle?.setAttribute('aria-controls', 'nav-menu');
  navToggle?.setAttribute('aria-expanded', 'false');
  
  // Logo da navbar (sem som)
  const navLogo = document.querySelector('.nav__logo');
  
  // Função para tocar som de link
  function playLinkSound() {
    if (!prefersReduced) {
      try {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        linkSound.volume = isMobile ? 0.25 : 0.3;
        linkSound.currentTime = 0;
        linkSound.play().catch(() => {});
      } catch (error) {
        console.log('Erro ao tocar som de link:', error);
      }
    }
  }
  
  // Função para tocar som de hover
  function playHoverSound() {
    if (!prefersReduced) {
      try {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        hoverSound.volume = isMobile ? 0.2 : 0.25; // Volume menor para hover
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
        console.log('Som de hover tocado com sucesso'); // Debug temporário
      } catch (error) {
        console.log('Erro ao tocar som de hover:', error);
      }
    }
  }
  
  // Adicionar som de link aos botões CTA e links externos
  function setupLinkSounds() {
    console.log('Configurando sons de link e hover...'); // Debug
    
    // Botão CTA do GitHub
    const githubButton = document.querySelector('.cta-button');
    if (githubButton) {
      githubButton.addEventListener('click', playLinkSound);
      // Adicionar som de hover
      githubButton.addEventListener('mouseenter', playHoverSound);
      console.log('GitHub CTA configurado');
    }
    
    // Botão "Visit My GitHub"
    const githubBtn = document.querySelector('.animated-button');
    if (githubBtn) {
      githubBtn.addEventListener('click', playLinkSound);
      // Adicionar som de hover
      githubBtn.addEventListener('mouseenter', playHoverSound);
      console.log('GitHub button configurado');
    }
    
    // Links externos (redes sociais, etc.)
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      if (!link.classList.contains('nav__link') && !link.classList.contains('nav__logo')) {
        link.addEventListener('click', playLinkSound);
        // Adicionar som de hover para links externos
        link.addEventListener('mouseenter', playHoverSound);
      }
    });
    console.log(`${externalLinks.length} links externos configurados`);
    
    // Botão de visitar projeto no modal
    const projectLinks = document.querySelectorAll('.project-modal__flip-btn');
    projectLinks.forEach(link => {
      link.addEventListener('click', playLinkSound);
      // Adicionar som de hover
      link.addEventListener('mouseenter', playHoverSound);
    });
    console.log(`${projectLinks.length} botões de projeto configurados`);
    
    // Adicionar som de hover aos cards de projeto
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', playHoverSound);
    });
    console.log(`${projectCards.length} cards de projeto configurados`);
    
    // Adicionar som de hover aos cards de skills
    const skillCards = document.querySelectorAll('.skill__card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', playHoverSound);
    });
    console.log(`${skillCards.length} cards de skills configurados`);
    
    // Botões de contato (SEM som de hover)
    const socialLinks = document.querySelectorAll('.social__link');
    if (socialLinks.length > 0) {
      console.log(`${socialLinks.length} botões de contato encontrados (sem som de hover)`);
    }
    
    // Adicionar som de hover ao botão de scroll para o topo
    if (scrollUpBtn) {
      scrollUpBtn.addEventListener('mouseenter', playHoverSound);
      console.log('Botão scroll configurado');
    }
    
    // Adicionar som de hover ao botão de scroll para o topo (de forma mais robusta)
    document.addEventListener('mouseenter', (e) => {
      if (e.target && e.target.id === 'scroll-up') {
        playHoverSound();
      }
    }, true);
    
    console.log('Configuração de sons concluída');
  }
  
  // Configurar sons de link quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLinkSounds);
  } else {
    setupLinkSounds();
  }
  


  // Robust open on mobile: support click/touch/pointer with debounce
  let menuLock = false;
  const tryOpenMenu = (e) => {
    if (menuLock || navMenu?.classList.contains('show-menu')) return;
    menuLock = true;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    enableMenu();
    setTimeout(() => { menuLock = false; }, 350);
  };

  navToggle?.addEventListener('click', tryOpenMenu);
  navToggle?.addEventListener('pointerup', tryOpenMenu);
  navToggle?.addEventListener('touchend', tryOpenMenu, { passive: false });
  navToggle?.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  navClose?.addEventListener('click', disableMenu);
  // Also close on swipe right-to-left gesture inside menu
  if (navMenu) {
    let startX = null;
    navMenu.addEventListener('touchstart', (e) => { startX = e.touches?.[0]?.clientX ?? null; }, { passive: true });
    navMenu.addEventListener('touchend', (e) => {
      if (startX == null) return;
      const endX = e.changedTouches?.[0]?.clientX ?? startX;
      if (startX - endX > 50) disableMenu();
      startX = null;
    }, { passive: true });
  }

  /*=============== FECHAR MENU AO CLICAR EM LINK + SCROLL SUAVE ===============*/
  function scrollWithOffset(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;
    const headerOffset = 70; // aproximado da altura do header
    const rect = el.getBoundingClientRect();
    const offsetTop = window.pageYOffset + rect.top - headerOffset;
    window.scrollTo({ top: Math.max(offsetTop, 0), behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const id = href.replace('#', '');
        scrollWithOffset(id);
        disableMenu();
        // Atualiza destaque manual imediato
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
      }
    });
  });

  /*=============== FUNÇÕES DE SCROLL ===============*/
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Header blur
    header?.classList.toggle('blur-header', scrollY >= 50);

    // Botão "scroll-up"
    scrollUpBtn?.classList.toggle('show-scroll', scrollY >= 350);
  };

  /*=============== BOTÃO DE SCROLL PARA O TOPO COM SOM ===============*/
  scrollUpBtn?.addEventListener('click', (e) => {
    e.preventDefault();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    scrollSound.currentTime = 0;
    scrollSound.volume = isMobile ? 0.3 : 0.4;
    scrollSound.play().catch(() => {});

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /*=============== ESCONDER LOADER AO CARREGAR PÁGINA ===============*/
  window.addEventListener('load', () => loader?.classList.add('hide'));

  /*=============== EVENTO DE SCROLL com reduced motion ===============*/
  window.addEventListener('scroll', onScroll, { passive: true });
  if (prefersReduced) {
    // Desativa sons e reduz animações em dispositivos com preferência por movimento reduzido
    try { scrollSound.muted = true; } catch {}
  }

  /*=============== INTERSECTION OBSERVER PARA ACTIVE LINK ===============*/
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${id}"]`);
        if (!navLink) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          navLinks.forEach(l => l.classList.remove('active-link'));
          navLink.classList.add('active-link');
        }
      });
    }, { threshold: [0.55] });

    sections.forEach(sec => observer.observe(sec));
  }

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


