// Menu no celular
const topo = document.querySelector('.topo');
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
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('aberto')) { fecharMenu(); botaoMenu.focus(); }
});
// fecha o menu quando o foco sai do topo, para nada ficar escondido atrás dele
topo.addEventListener('focusout', (e) => { if (!topo.contains(e.relatedTarget)) fecharMenu(); });

// Virar o santinho pelo botão
const santinho = document.querySelector('[data-santinho]');
document.querySelector('[data-virar]').addEventListener('click', () => santinho.classList.toggle('virado'));

// O santinho vira sozinho enquanto a pessoa rola, só depois de estar inteiro na tela
const giro = document.querySelector('.santinho-giro');
const calmo = matchMedia('(prefers-reduced-motion: reduce)');
let inicio = 0, fim = 1, pedido = 0;

function medir() {
  const r = giro.getBoundingClientRect();
  const topoCartao = r.top + scrollY;
  inicio = Math.max(0, topoCartao + r.height - innerHeight * 0.9);
  fim = inicio + Math.min(innerHeight * 0.5, r.height * 0.75);
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

// Agendar: monta o link do WhatsApp com espaços como %20 (alguns aparelhos mostram "+")
const agendar = document.querySelector('.agendar');
agendar.addEventListener('submit', (e) => {
  e.preventDefault();
  open(agendar.action + '?text=' + encodeURIComponent(agendar.elements.text.value), '_blank', 'noopener');
});

// Botão flutuante do WhatsApp aparece depois do formulário de agendamento
const flutuante = document.querySelector('.whats-flutuante');
new IntersectionObserver(([e]) => {
  flutuante.classList.toggle('escondido', e.isIntersecting);
  flutuante.inert = e.isIntersecting;
}).observe(agendar);
