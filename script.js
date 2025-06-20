const mensagens = [
  "Você é a melhor parte da minha vida. ❤️",
  "Cada sorriso seu é um presente pra mim.",
  "Nossa jornada só está começando.",
  "Te amo mais a cada segundo. 🌹",
  "Com você, todos os dias têm brilho. 💕"
];

const slides = [
  { type: 'img', src: 'img/foto6.jpg.webp', legenda: 'Nosso primeiro passeio juntos ❤️' },
  { type: 'video', src: 'videos.mp4/video3.mp4', legenda: 'Esse foi um dia especial pra nós.' },
  { type: 'img', src: 'img/foto3.jpg.webp', legenda: 'Lembranças que guardo no coração.' },
  { type: 'video', src: 'videos.mp4/video2.mp4', legenda: 'Relembrando momentos únicos. 🥰' },
  { type: 'img', src: 'img/foto4.jpg.webp', legenda: 'Só começo da nossa história.' }
];

const slideContainer = document.getElementById('slide-container');
const legenda = document.getElementById('legenda');
const mensagemElement = document.getElementById('mensagem');

let slideAtual = 0;
let mensagemAtual = 0;
let slideInterval = null;

// Variáveis para swipe
let startX = 0;
let isHovering = false;

function criarSlides() {
  slides.forEach(item => {
    const slide = document.createElement('div');
    slide.classList.add('slide-item');

    if (item.type === 'img') {
      const img = document.createElement('img');
      img.src = item.src;
      slide.appendChild(img);
    } else if (item.type === 'video') {
      const video = document.createElement('video');
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      slide.appendChild(video);
    }

    slideContainer.appendChild(slide);
  });
  atualizarSlide();
}

function atualizarSlide() {
  const offset = -(slideAtual * 100);
  slideContainer.style.transform = `translateX(${offset}%)`;
  legenda.textContent = slides[slideAtual].legenda;

  mensagemAtual = (mensagemAtual + 1) % mensagens.length;
  mensagemElement.textContent = mensagens[mensagemAtual];

  // Limpa o intervalo antigo antes de criar outro
  if (slideInterval) {
    clearInterval(slideInterval);
  }

  const slideAtualElemento = slideContainer.children[slideAtual];
  const video = slideAtualElemento.querySelector('video');

  if (video) {
    video.currentTime = 0;
    video.play();

    video.onended = () => {
      if (!isHovering) iniciarAutoSlide();
    };
  } else {
    if (!isHovering) iniciarAutoSlide();
  }
}

function iniciarAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    mudarSlide(1);
  }, 7000);
}

function pararAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function mudarSlide(direcao) {
  slideAtual = (slideAtual + direcao + slides.length) % slides.length;
  atualizarSlide();
}

// Eventos para swipe mobile
slideContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  pararAutoSlide();
});

slideContainer.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) mudarSlide(1);
    else mudarSlide(-1);
  }
  iniciarAutoSlide();
});

// Pausar autoplay no hover desktop
slideContainer.addEventListener('mouseenter', () => {
  isHovering = true;
  pararAutoSlide();

  // Pause vídeo se houver
  const slideAtualElemento = slideContainer.children[slideAtual];
  const video = slideAtualElemento.querySelector('video');
  if (video) video.pause();
});

slideContainer.addEventListener('mouseleave', () => {
  isHovering = false;

  // Recomeça autoplay
  iniciarAutoSlide();

  // Resume vídeo se houver
  const slideAtualElemento = slideContainer.children[slideAtual];
  const video = slideAtualElemento.querySelector('video');
  if (video) video.play();
});

// Navegação por teclado
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    pararAutoSlide();
    mudarSlide(-1);
  } else if (e.key === 'ArrowRight') {
    pararAutoSlide();
    mudarSlide(1);
  }
});

// Corações animados
function criarCoração() {
  const coração = document.createElement('div');
  coração.classList.add('coração');
  coração.style.left = Math.random() * 100 + "vw";
  coração.style.fontSize = (Math.random() * 20 + 10) + "px";
  coração.textContent = "❤";
  document.getElementById('corações').appendChild(coração);
  setTimeout(() => coração.remove(), 5000);
}

criarSlides();
setInterval(criarCoração, 300);
iniciarAutoSlide();
