document.addEventListener('DOMContentLoaded', function () {
  // 🎵 Sons de hover e clique
  const hoverSound = new Audio('assets/Sounds/hover.mp3');

  // Adiciona fonte Ogg para compatibilidade
  hoverSound.src = 'assets/Sounds/hover.mp3';
  hoverSound.type = 'audio/mpeg';

  hoverSound.preload = 'auto';

  let userInteracted = false;

  // ⚙️ Inicializa os áudios após primeira interação
  function initAudio() {
    userInteracted = true;

    [hoverSound].forEach(sound => {
      sound.volume = 0;
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      }).catch(e => console.log("Pré-carregamento de áudio falhou:", e));
    });

    ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
      document.removeEventListener(evt, initAudio);
    });
  }

  // Escutar primeira interação
  ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, initAudio, { once: true });
  });

  let hoverTimeout;

  // 🔁 Função para aplicar som de hover
  function aplicarHover(elements) {
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!userInteracted) return;
        clearTimeout(hoverTimeout);
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.2;
        hoverSound.play().catch(e => console.log("Erro ao tocar hoverSound:", e));
      });

      el.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          hoverSound.pause();
          hoverSound.currentTime = 0;
        }, 100);
      });
    });
  }
});

