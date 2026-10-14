// Menu no celular
const botaoMenu = document.querySelector('.menu-botao');
const menu = document.getElementById('menu');
const fecharMenu = () => {
  botaoMenu.setAttribute('aria-expanded', 'false');
  menu.classList.remove('aberto');
};
botaoMenu.addEventListener('click', () => {
  const abrir = botaoMenu.getAttribute('aria-expanded') !== 'true';
  botaoMenu.setAttribute('aria-expanded', String(abrir));
  menu.classList.toggle('aberto', abrir);
});
menu.addEventListener('click', (e) => { if (e.target.closest('a')) fecharMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fecharMenu(); });

// Virar o santinho pelo botão
const santinho = document.querySelector('[data-santinho]');
const botaoVirar = document.querySelector('[data-virar]');
botaoVirar.addEventListener('click', () => {
  const virado = santinho.classList.toggle('virado');
  botaoVirar.setAttribute('aria-pressed', String(virado));
});

// O santinho vira sozinho enquanto a pessoa rola a abertura
const giro = document.querySelector('.santinho-giro');
const calmo = matchMedia('(prefers-reduced-motion: reduce)');
let inicio = 0, fim = 1, pedido = 0;

function medir() {
  const r = giro.getBoundingClientRect();
  const topo = r.top + scrollY;
  inicio = Math.max(0, topo - innerHeight * 0.65);
  fim = inicio + r.height * 0.75;
}
function girar() {
  pedido = 0;
  const p = Math.min(1, Math.max(0, (scrollY - inicio) / (fim - inicio)));
  giro.style.setProperty('--giro', p.toFixed(4));
}
function aoRolar() { if (!pedido) pedido = requestAnimationFrame(girar); }

if (!calmo.matches) {
  medir();
  girar();
  addEventListener('resize', () => { medir(); girar(); });
  // só escuta a rolagem enquanto a abertura está na tela
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) addEventListener('scroll', aoRolar, { passive: true });
    else removeEventListener('scroll', aoRolar);
  }).observe(document.querySelector('.abertura'));
}

// Botão flutuante do WhatsApp aparece depois do formulário de agendamento
const flutuante = document.querySelector('.whats-flutuante');
new IntersectionObserver(([e]) => {
  flutuante.classList.toggle('escondido', e.isIntersecting);
}).observe(document.querySelector('.agendar'));
