import { useEffect } from 'react';

const SoundManager = () => {
  useEffect(() => {
    // Create audio elements
    const hoverSound = new Audio('assets/Sounds/hover.mp3');
    const clickSound = new Audio('assets/Sounds/click.mp3');
    const openSound = new Audio('assets/Sounds/open.mp3');
    const closeSound = new Audio('assets/Sounds/close.mp3');
    const scrollSound = new Audio('assets/Sounds/backtotop.mp3');

    // Set audio properties
    [hoverSound, clickSound, openSound, closeSound, scrollSound].forEach(sound => {
      sound.preload = 'auto';
      sound.volume = 0.3;
    });

    let userInteracted = false;

    // Initialize audio after first user interaction
    const initAudio = () => {
      userInteracted = true;
      
      [hoverSound, clickSound, openSound, closeSound, scrollSound].forEach(sound => {
        sound.volume = 0;
        sound.play().then(() => {
          sound.pause();
          sound.currentTime = 0;
        }).catch(e => console.log("Audio preload failed:", e));
      });

      // Remove event listeners after first interaction
      ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
        document.removeEventListener(evt, initAudio);
      });
    };

    // Listen for first interaction
    ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
      document.addEventListener(evt, initAudio, { once: true });
    });

    // Play sound function
    const playSound = (sound, volume = 0.3) => {
      if (!userInteracted) return;
      
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play().catch(e => console.log("Sound play failed:", e));
    };

    // Add hover sounds
    const addHoverSound = (selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => playSound(hoverSound, 0.2));
      });
    };

    // Add click sounds
    const addClickSound = (selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.addEventListener('click', () => playSound(clickSound, 0.4));
      });
    };

    // Apply sounds to elements
    const applyHoverSounds = () => {
      addHoverSound('.card-hover');
      addHoverSound('[class*="hover:"]');
      addHoverSound('button');
      addHoverSound('a[href^="#"]');
      addHoverSound('.glass-effect');
    };

    const applyClickSounds = () => {
      addClickSound('a[href^="https://"]');
      addClickSound('button');
      addClickSound('.btn-primary');
    };

    // Initial application
    applyHoverSounds();
    applyClickSounds();

    // Reapply sounds when new elements are added (for dynamic content)
    const observer = new MutationObserver(() => {
      applyHoverSounds();
      applyClickSounds();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Menu sounds
    const menuToggle = document.querySelector('[aria-label="Open menu"]');
    const menuClose = document.querySelector('[aria-label="Close menu"]');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => playSound(openSound, 0.5));
    }
    
    if (menuClose) {
      menuClose.addEventListener('click', () => playSound(closeSound, 0.4));
    }

    // Scroll to top sound
    const scrollToTopBtn = document.querySelector('[aria-label="Scroll to top"]');
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', () => playSound(scrollSound, 0.5));
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SoundManager;