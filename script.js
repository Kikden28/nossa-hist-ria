const mensagens = [
  "Você é a melhor parte da minha vida. ❤️",
  "Cada elogio teu me esquenta o coração",
  "Quero construir uma familia com vc, florzinha",
  "Eu te amo mais a cada segundo. 🌹",
  "Com você, todos os dias têm brilho. 💕",
  "Eu sempre vou estar ao seu lado em todas as situações",
  "Cada gargalhada tua me contagia <3",
  "A distância é minha inimiga, eu amo ficar do teu ladinho",
  "Penso em ti o dia inteiro, vidoca",
];

const slides = [
  { type: 'img', src: 'img/foto6.jpg.webp', legenda: 'Cada fotinha é uma lembrança de felicidade ❤️' },
  { type: 'video', src: 'videos.mp4/video3.mp4', legenda: 'Teu sorriso me alegra nesses dias escuros' },
  { type: 'img', src: 'img/foto3.jpg.webp', legenda: 'Eu aproveito cada momento do teu ladinho' },
  { type: 'video', src: 'videos.mp4/video2.mp4', legenda: 'Sempre vou te amar com todas as minhas forças 🥰' },
  { type: 'img', src: 'img/foto4.jpg.webp', legenda: 'A tua beleza sempre me encanta, e todo dia eu me apaixono mais por ti' },
  { type: 'img', src: 'img/foto5.jpg.webp', legenda: 'Fiz isso com carinho pra vc, meu bem' },
  { type: 'img', src: 'img/foto7.jpg.webp', legenda: 'Essa foto ficou lindona ó' },
  { type: 'img', src: 'img/foto8.webp', legenda: 'Eu já disse que te amo? Eu te amo, vidoca' },
  { type: 'img', src: 'img/final.webp', legenda: 'Esse é meu presente pra vc, paixão' },
];

const slideContainer = document.getElementById('slide-container');
const legenda = document.getElementById('legenda');
const mensagemElement = document.getElementById('mensagem');

let slideAtual = 0;
let mensagemAtual = 0;
let slideInterval = null;

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

function typeWriter(text, element, delay = 50) {
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    }
  }
  typing();
}

function atualizarSlide() {
  const offset = -(slideAtual * 100);
  slideContainer.style.transform = `translateX(${offset}%)`;
  legenda.textContent = slides[slideAtual].legenda;

  mensagemAtual = (mensagemAtual + 1) % mensagens.length;
  typeWriter(mensagens[mensagemAtual], mensagemElement);

  Array.from(slideContainer.children).forEach((slide, idx) => {
    slide.classList.toggle('active', idx === slideAtual);
  });

  if (slideInterval) clearInterval(slideInterval);
  const slideAtualElemento = slideContainer.children[slideAtual];
  const video = slideAtualElemento.querySelector('video');

  if (video) {
    video.currentTime = 0;
    video.play();
    video.onended = () => iniciarAutoSlide();
  } else {
    iniciarAutoSlide();
  }
}

function iniciarAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => mudarSlide(1), 7000);
}

function mudarSlide(direcao) {
  slideAtual = (slideAtual + direcao + slides.length) % slides.length;
  atualizarSlide();
}

function criarCoração() {
  const coração = document.createElement('div');
  coração.classList.add('coração');
  coração.style.left = Math.random() * 100 + "vw";
  coração.style.fontSize = (Math.random() * 25 + 10) + "px";
  coração.style.animationDuration = (Math.random() * 4 + 3) + "s";
  coração.textContent = "❤";
  document.getElementById('corações').appendChild(coração);
  setTimeout(() => coração.remove(), 7000);
}

document.getElementById('btnCurtir').addEventListener('click', (e) => {
  const coração = document.createElement('div');
  coração.textContent = '❤️';
  coração.className = 'coração-explode';
  coração.style.left = e.clientX + 'px';
  coração.style.top = e.clientY + 'px';
  document.body.appendChild(coração);
  setTimeout(() => coração.remove(), 700);
});

// Contador regressivo para 12 de agosto de 2025 00:00:00
// ... seu código existente aqui (slides, mensagens, etc)

// Contador regressivo
const dataAlvo = new Date("2025-08-12T00:00:00").getTime();

function atualizarContador() {
  const agora = new Date().getTime();
  const distancia = dataAlvo - agora;

  const contadorEl = document.getElementById("contador");
  const contadorWrapper = document.querySelector(".contador-wrapper");
  const presenteContainer = document.getElementById("presente-container");

  if (distancia <= 0) {
    // Quando zerar, esconde o contador e mostra o presente
    contadorWrapper.classList.add("hidden");
    presenteContainer.classList.remove("hidden");

    // Inicia o presente (slides, corações etc)
    criarSlides();
    setInterval(criarCoração, 300);
    iniciarAutoSlide();

    return; // para não ficar chamando o setTimeout do contador
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  contadorEl.innerHTML = `
    <span>${dias}d</span> : 
    <span>${horas}h</span> : 
    <span>${minutos}m</span> : 
    <span>${segundos}s</span> 
    <br> para abrir o presente 🎁
  `;

  setTimeout(atualizarContador, 1000);
}

// Inicialmente só roda o contador — o presente só inicia depois do countdown zerar
document.addEventListener("DOMContentLoaded", () => {
  atualizarContador();
});

