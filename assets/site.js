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

// O topo vira vidro assim que a página sai do começo
const marco = document.createElement('div');
marco.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
document.body.prepend(marco);
new IntersectionObserver(([e]) => topo.classList.toggle('rolado', !e.isIntersecting)).observe(marco);

// ---------- O santinho ----------
// Ângulo total = inclinação inicial + giro da rolagem + giro da mão (arrastar ou botão).
// A mão anda com uma mola (resposta/amortecimento, como a Apple descreve): começa do valor
// que está na tela, herda a velocidade do dedo e pode ser agarrada no meio do caminho.
const giro = document.querySelector('.santinho-giro');
const botaoVirar = document.querySelector('[data-virar]');
const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;

let rolagem = 0;          // 0..1, quanto a rolagem já virou o cartão
let mao = 0;              // graus vindos da mão
let velocidade = 0;       // graus/s da mola
let alvo = 0;
let mola = null;          // { k, c } quando há mola correndo
let quadro = 0;

function desenhar() {
  const graus = -14 + rolagem * 194 + mao;
  giro.style.transform = `rotateY(${graus.toFixed(2)}deg) rotateX(3deg)`;
  const face = ((graus % 360) + 360) % 360;
  botaoVirar.classList.toggle('no-verso', face > 90 && face < 270);
}

function soltarMola(destino, resposta, amortecimento, v0 = 0) {
  alvo = destino;
  velocidade = v0;
  const k = (2 * Math.PI / resposta) ** 2;
  mola = { k, c: 4 * Math.PI * amortecimento / resposta };
  if (!quadro) quadro = requestAnimationFrame(passo);
}

let ultimo = 0;
function passo(t) {
  quadro = 0;
  const dt = ultimo ? Math.min((t - ultimo) / 1000, 1 / 30) : 1 / 60;
  ultimo = t;
  if (mola) {
    for (let i = 0; i < 4; i++) { // subpassos para a mola ficar estável
      const h = dt / 4;
      velocidade += (-mola.k * (mao - alvo) - mola.c * velocidade) * h;
      mao += velocidade * h;
    }
    if (Math.abs(mao - alvo) < 0.05 && Math.abs(velocidade) < 0.5) { mao = alvo; mola = null; }
  }
  desenhar();
  if (mola) quadro = requestAnimationFrame(passo); else ultimo = 0;
}
const pedirQuadro = () => { if (!quadro) quadro = requestAnimationFrame(passo); };

// Botão: vira para a próxima face, sem quique (amortecimento 1)
botaoVirar.addEventListener('click', () => {
  soltarMola(Math.round((mao + 180) / 180) * 180, 0.45, 1);
});

// Arrastar: o cartão acompanha o dedo 1:1 e, ao soltar, projeta o impulso
// para decidir a face e continua na mesma velocidade.
const projetar = (v, d = 0.995) => (v / 1000) * d / (1 - d);
const grausPorPx = () => 180 / (giro.offsetWidth * 0.8);
let toque = null;

giro.addEventListener('pointerdown', (e) => {
  if (calmo || toque || (e.pointerType === 'mouse' && e.button !== 0)) return;
  toque = { id: e.pointerId, x0: e.clientX, mao0: mao, movendo: false, historico: [{ x: e.clientX, t: e.timeStamp }] };
  mola = null; velocidade = 0; // agarrou: para onde está
  giro.setPointerCapture(e.pointerId);
  giro.classList.add('segurando');
});
giro.addEventListener('pointermove', (e) => {
  if (!toque || e.pointerId !== toque.id) return;
  const dx = e.clientX - toque.x0;
  if (!toque.movendo && Math.abs(dx) < 8) return; // folga antes de assumir a direção
  toque.movendo = true;
  mao = toque.mao0 + dx * grausPorPx();
  toque.historico.push({ x: e.clientX, t: e.timeStamp });
  if (toque.historico.length > 6) toque.historico.shift();
  pedirQuadro();
});
function soltar(e) {
  if (!toque || e.pointerId !== toque.id) return;
  giro.classList.remove('segurando');
  const { historico, movendo } = toque;
  toque = null;
  if (!movendo) { botaoVirar.click(); return; } // um toque simples também vira
  // velocidade só dos últimos ~100ms, que é o que o dedo estava fazendo ao soltar
  const b = historico[historico.length - 1];
  const a = historico.find((h) => b.t - h.t <= 100) || historico[0];
  const pxPorS = b.t > a.t ? (b.x - a.x) / ((b.t - a.t) / 1000) : 0;
  const v = pxPorS * grausPorPx(); // graus/s
  const destino = Math.round((mao + projetar(v)) / 180) * 180;
  soltarMola(destino, 0.4, 0.8, v); // veio de um gesto com impulso: um pouco de quique
}
giro.addEventListener('pointerup', soltar);
giro.addEventListener('pointercancel', soltar);

// A rolagem vira o cartão, só depois de ele estar inteiro na tela
let inicio = 0, fim = 1;
function medir() {
  const r = giro.getBoundingClientRect();
  const topoCartao = r.top + scrollY;
  inicio = Math.max(0, topoCartao + r.height - innerHeight * 0.9);
  fim = inicio + Math.min(innerHeight * 0.5, r.height * 0.75);
}
function aoRolar() {
  rolagem = Math.min(1, Math.max(0, (scrollY - inicio) / (fim - inicio)));
  pedirQuadro();
}
if (!calmo) {
  medir();
  aoRolar();
  addEventListener('resize', () => { medir(); aoRolar(); });
  // só escuta a rolagem enquanto a abertura está na tela
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) addEventListener('scroll', aoRolar, { passive: true });
    else removeEventListener('scroll', aoRolar);
  }).observe(document.querySelector('.abertura'));
}

// ---------- Agendar ----------
// Monta o link do WhatsApp com espaços como %20 (alguns aparelhos mostram "+")
// e confirma no próprio botão que algo aconteceu.
const agendar = document.querySelector('.agendar');
const botaoAgendar = agendar.querySelector('.botao-ouro');
const rotulo = botaoAgendar.querySelector('span');
agendar.addEventListener('submit', (e) => {
  e.preventDefault();
  open(agendar.action + '?text=' + encodeURIComponent(agendar.elements.text.value), '_blank', 'noopener');
  const original = rotulo.textContent;
  botaoAgendar.classList.add('trocando');
  setTimeout(() => { rotulo.textContent = 'Abrindo o WhatsApp…'; botaoAgendar.classList.remove('trocando'); }, 120);
  setTimeout(() => {
    botaoAgendar.classList.add('trocando');
    setTimeout(() => { rotulo.textContent = original; botaoAgendar.classList.remove('trocando'); }, 120);
  }, 2600);
});

// Botão flutuante do WhatsApp aparece depois do formulário de agendamento
const flutuante = document.querySelector('.whats-flutuante');
new IntersectionObserver(([e]) => {
  flutuante.classList.toggle('escondido', e.isIntersecting);
  flutuante.inert = e.isIntersecting;
}).observe(agendar);
