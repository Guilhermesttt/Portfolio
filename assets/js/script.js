AOS.init({
    duration: 800, // values from 0 to 3000, with step 50ms
    once: true, // whether animation should happen only once - while scrolling down
}); 

// Project card -> overlay flip interaction (DISABLED - Using project-modal.js instead)
(function () {
  const overlay = document.getElementById('project-overlay');
  if (!overlay) return;
  
  // Disable this system to avoid conflicts with project-modal.js
  return;

  const modal = overlay.querySelector('.project-modal');
  const flipInner = overlay.querySelector('#project-flip-inner');
  const imgEl = overlay.querySelector('#project-modal-image');
  const titleEl = overlay.querySelector('#project-modal-title');
  const iconsEl = overlay.querySelector('#project-modal-icons');
  const linkEl = overlay.querySelector('#project-modal-link');
  const modalContent = overlay.querySelector('#project-modal-content');
  const iconsWrap = overlay.querySelector('.project-modal__icons');
  const closeBtn = overlay.querySelector('.project-modal__close');

  let lastActiveCard = null;

  // ====== Audio setup for overlay ======
  const hoverSfx = new Audio('assets/Sounds/hover.mp3');
  const closeSfx = new Audio('assets/Sounds/close.mp3');
  const openSfx = new Audio('assets/Sounds/open.mp3');
  const flipSfx = new Audio('assets/Sounds/flip.mp3');
  [hoverSfx, closeSfx, openSfx, flipSfx].forEach(a => { a.preload = 'auto'; a.volume = 0.35; });
  // Slightly lower hover volume
  hoverSfx.volume = 0.55;
  let audioPrimed = false;
  let suppressHoverUntil = 0; // evita tocar hover imediatamente após abrir
  const primeAudio = () => {
    if (audioPrimed) return;
    audioPrimed = true;
    [hoverSfx, closeSfx, openSfx, flipSfx].forEach(a => {
      a.muted = true;
      a.play().catch(() => {}).finally(() => { a.pause(); a.currentTime = 0; a.muted = false; });
    });
    ['click','touchstart','keydown'].forEach(evt => document.removeEventListener(evt, primeAudio));
  };
  ['click','touchstart','keydown'].forEach(evt => document.addEventListener(evt, primeAudio, { once: true }));

  function openOverlayFromCard(card) {
    lastActiveCard = card;

    const img = card.querySelector('.project__img');
    const title = card.querySelector('.project__title');
    const techIcons = card.querySelector('.tech-icons');
    const link = card.querySelector('.project__link');
    // Optional data-description fallback
    const desc = card.getAttribute('data-description');
    const dataLink = card.getAttribute('data-link');

    if (imgEl && img) imgEl.src = img.src;
    if (titleEl && title) titleEl.textContent = title.textContent || '';
    if (iconsEl && techIcons) {
      iconsEl.innerHTML = techIcons.innerHTML;
    }
    if (linkEl) {
      const href = (link && link.getAttribute('href')) || dataLink || '#';
      linkEl.href = href;
      linkEl.textContent = 'Visitar projeto';
    }
    // Inject custom details from hidden template if available
    if (modalContent) {
      const detailsTpl = card.querySelector('template.project__details');
      if (detailsTpl && detailsTpl.content) {
        modalContent.innerHTML = '';
        modalContent.appendChild(detailsTpl.content.cloneNode(true));
      } else {
        // Fallback to simple text if provided
        modalContent.innerHTML = desc ? `<p>${desc}</p>` : '';
      }
    }

    // Open overlay first to measure modal size
    overlay.classList.add('project-overlay--open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    try { openSfx.currentTime = 0.1; openSfx.play().catch(() => {}); } catch {}
    // Suprimir hover por um curto período após abrir (para evitar disparo ao aparecer sob o cursor)
    suppressHoverUntil = performance.now() + 800;

    // Compute FLIP animation from card rect to modal rect
    requestAnimationFrame(() => {
      const cardRect = card.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      const dx = cardRect.left - modalRect.left;
      const dy = cardRect.top - modalRect.top;
      const sx = cardRect.width / modalRect.width;
      const sy = cardRect.height / modalRect.height;

      modal.style.transformOrigin = 'top left';
      modal.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      modal.style.opacity = '0.2';

      // Play to center
      requestAnimationFrame(() => {
        modal.style.transform = '';
        modal.style.opacity = '';
      });
    });

    // Focus trapping setup
    const focusableSelectors = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusables = overlay.querySelectorAll(focusableSelectors);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (firstFocusable) firstFocusable.focus();

    function onKeyDownTrap(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    overlay.addEventListener('keydown', onKeyDownTrap);

    // Auto flip to back after settle
    setTimeout(() => {
      try { flipSfx.currentTime = 0.15; flipSfx.play().catch(() => {}); } catch {}
      flipInner.classList.add('is-flipped');
    }, 500);

    // store trap remover
    overlay._trapHandler = onKeyDownTrap;
  }

  function closeOverlay() {
    // Reset flip state first
    flipInner.classList.remove('is-flipped');
    try { closeSfx.currentTime = 0.05; closeSfx.play().catch(() => {}); } catch {}

    // Animate back to card if available
    if (overlay._trapHandler) {
      overlay.removeEventListener('keydown', overlay._trapHandler);
      overlay._trapHandler = null;
    }

    if (lastActiveCard) {
      const cardRect = lastActiveCard.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();
      const dx = cardRect.left - modalRect.left;
      const dy = cardRect.top - modalRect.top;
      const sx = cardRect.width / modalRect.width;
      const sy = cardRect.height / modalRect.height;

      modal.style.transformOrigin = 'top left';
      // Trigger transition
      requestAnimationFrame(() => {
        modal.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
        modal.style.opacity = '0.2';
        setTimeout(() => {
          overlay.classList.remove('project-overlay--open');
          overlay.setAttribute('aria-hidden', 'true');
          modal.style.transform = '';
          modal.style.opacity = '';
          document.body.style.overflow = '';
          lastActiveCard = null;
        }, 400);
      });
    } else {
      overlay.classList.remove('project-overlay--open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lastActiveCard = null;
    }
  }

  // Attach events to cards
  document.querySelectorAll('.project__card').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', (ev) => {
      const anchor = ev.target.closest('a');
      if (anchor) ev.preventDefault();
      openOverlayFromCard(card);
    });
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        openOverlayFromCard(card);
      }
    });
  });

  // Flip on modal click (toggle front/back)
  overlay.querySelector('.project-flip-card').addEventListener('click', (e) => {
    // Avoid closing if clicking inside
    e.stopPropagation();
    try { flipSfx.currentTime = 0.15; flipSfx.play().catch(() => {}); } catch {}
    flipInner.classList.toggle('is-flipped');
  });

  // Close handlers
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-overlay]')) {
      closeOverlay();
    }
  });

  // Hover sounds for modal controls and icons (delegated)
  function playHover() {
    if (performance.now() < suppressHoverUntil) return;
    try { hoverSfx.currentTime = 0; hoverSfx.play().catch(() => {}); } catch {}
  }
  // Não tocar hover no botão de fechar
  if (iconsWrap) {
    iconsWrap.addEventListener('mouseover', (e) => {
      // Não tocar hover em dispositivos sem hover (mobile)
      const noHover = matchMedia('(hover: none), (pointer: coarse)').matches;
      if (!noHover && e.target.closest('i, img')) playHover();
    });
  }
  // Não tocar hover no título/cabeçalho

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('project-overlay--open')) {
      closeOverlay();
    }
  });
})();