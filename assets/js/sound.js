document.addEventListener('DOMContentLoaded', function () {
  // Elementos de áudio
  const hoverSound = document.getElementById('hoverSound');
  const clickSound = document.getElementById('clickSound');
  const scrollToTopBtn = document.getElementById('scroll-up');

  // Variável de controle
  let userInteracted = false;

  // Função de ativação de áudio
  function initAudio() {
    userInteracted = true;

    [hoverSound, clickSound].forEach(sound => {
      if (!sound) return;
      sound.volume = 0;
      sound.play()
        .then(() => {
          sound.pause();
          sound.currentTime = 0;
        })
        .catch(e => console.log("Pré-carregamento de áudio falhou:", e));
    });

    // Remove os ouvintes após a primeira ativação
    ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
      document.removeEventListener(evt, initAudio);
    });
  }

  // Adiciona múltiplos eventos para liberar o som após qualquer interação
  ['click', 'mousedown', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, initAudio, { once: true });
  });

  // Botão de scroll para o topo com som
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function (e) {
      if (!userInteracted) return;

      e.preventDefault();

      // Toca o som de clique
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.3;
        clickSound.play().catch(e => console.log("Falha ao reproduzir som de clique:", e));
      }

      // Scroll suave
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Pequeno delay opcional
      setTimeout(() => {
        window.location.href = '#';
      }, 100);
    });
  }

  // Sons nos cards de habilidade
  const skillCards = document.querySelectorAll('.skill__card');
  let isPlaying = false;

  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      if (!userInteracted || isPlaying || !hoverSound) return;

      hoverSound.currentTime = 0;
      hoverSound.volume = 0.2;
      hoverSound.play()
        .then(() => { isPlaying = true; })
        .catch(e => console.log("Falha ao reproduzir som de hover:", e));
    });

    card.addEventListener('mouseleave', function () {
      if (isPlaying && hoverSound) {
        hoverSound.pause();
        hoverSound.currentTime = 0;
        isPlaying = false;
      }
    });
  });
});
