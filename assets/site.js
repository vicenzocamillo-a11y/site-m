const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suavizar = (t) => 1 - Math.pow(1 - t, 3); // ease-out cúbico para o que a rolagem move

// ---------- Menu no celular ----------
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

// O vidro do topo fica mais denso assim que a página sai do começo
const marco = document.createElement('div');
marco.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none';
document.body.prepend(marco);
new IntersectionObserver(([e]) => topo.classList.toggle('rolado', !e.isIntersecting)).observe(marco);

// ---------- A frase que acende palavra por palavra ----------
// Embrulha cada palavra num span; o CSS liga cada uma à rolagem.
document.querySelectorAll('[data-revela]').forEach((el) => {
  const palavras = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', el.textContent.trim());
  el.replaceChildren(...palavras.flatMap((p, i) => {
    const span = document.createElement('span');
    span.className = 'palavra';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = p;
    return i ? [' ', span] : [span];
  }));
});

// ---------- A cena da abertura ----------
// A cena é presa à rolagem: o título sai, o santinho sobe até o centro e vira.
// O ângulo do cartão soma a rolagem e a mão (arrastar ou botão). A mão anda com uma
// mola (resposta e amortecimento, como a Apple descreve): começa do valor que está na
// tela, herda a velocidade do dedo e pode ser agarrada no meio do caminho.
const cena = document.querySelector('.cena');
const texto = document.querySelector('.cena-texto');
const cartao = document.querySelector('.cena-cartao');
const giro = document.querySelector('.santinho-giro');
const botaoVirar = document.querySelector('[data-virar]');

let progresso = 0;      // 0..1 dentro da cena
let mao = 0, velocidade = 0, alvo = 0, mola = null, quadro = 0, ultimo = 0;

function desenhar() {
  // 1) o texto sai: some, sobe um pouco e desfoca
  const q = suavizar(limitar(progresso / 0.28));
  texto.style.opacity = String(1 - q);
  texto.style.transform = `translateY(${(-6 * q).toFixed(2)}svh) scale(${(1 - 0.04 * q).toFixed(4)})`;
  texto.style.filter = q > 0.01 ? `blur(${(6 * q).toFixed(2)}px)` : '';
  texto.style.visibility = q > 0.99 ? 'hidden' : '';

  // 2) o santinho sobe do pé da tela até o centro
  const r = suavizar(limitar(progresso / 0.34));
  const alturaCartao = giro.offsetHeight;
  const inicioY = innerHeight * 0.76 + alturaCartao / 2 - innerHeight / 2;
  const y = inicioY * (1 - r);
  cartao.style.transform = `translate(-50%, calc(-50% + ${y.toFixed(1)}px)) scale(${(0.86 + 0.14 * r).toFixed(4)})`;

  // 3) e vira enquanto a rolagem continua
  const virada = suavizar(limitar((progresso - 0.4) / 0.38));
  const graus = -12 + virada * 192 + mao;
  giro.style.transform = `rotateY(${graus.toFixed(2)}deg) rotateX(3deg)`;
  const face = ((graus % 360) + 360) % 360;
  botaoVirar.classList.toggle('no-verso', face > 90 && face < 270);
}

function soltarMola(destino, resposta, amortecimento, v0 = 0) {
  alvo = destino;
  velocidade = v0;
  mola = { k: (2 * Math.PI / resposta) ** 2, c: 4 * Math.PI * amortecimento / resposta };
  pedirQuadro();
}
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
  if (mola) pedirQuadro(); else ultimo = 0;
}
function pedirQuadro() { if (!quadro) quadro = requestAnimationFrame(passo); }

// Botão: vira para a próxima face, sem quique (amortecimento 1)
botaoVirar.addEventListener('click', () => soltarMola(Math.round((mao + 180) / 180) * 180, 0.45, 1));

// Arrastar: o cartão acompanha o dedo 1:1; ao soltar, projeta o impulso para escolher a face
// e continua na mesma velocidade, com um pouco de quique porque veio de um gesto.
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
  if (toque.historico.length > 8) toque.historico.shift();
  pedirQuadro();
});
function soltar(e) {
  if (!toque || e.pointerId !== toque.id) return;
  giro.classList.remove('segurando');
  const { historico, movendo } = toque;
  toque = null;
  if (!movendo) { botaoVirar.click(); return; } // um toque simples também vira
  const b = historico[historico.length - 1];
  const a = historico.find((h) => b.t - h.t <= 100) || historico[0];
  const v = (b.t > a.t ? (b.x - a.x) / ((b.t - a.t) / 1000) : 0) * grausPorPx(); // graus/s
  soltarMola(Math.round((mao + projetar(v)) / 180) * 180, 0.4, 0.8, v);
}
giro.addEventListener('pointerup', soltar);
giro.addEventListener('pointercancel', soltar);

let topoCena = 0, curso = 1;
function medir() {
  topoCena = cena.getBoundingClientRect().top + scrollY;
  curso = Math.max(1, cena.offsetHeight - innerHeight);
}
function aoRolar() {
  progresso = limitar((scrollY - topoCena) / curso);
  pedirQuadro();
}
if (!calmo) {
  medir();
  aoRolar();
  addEventListener('resize', () => { medir(); aoRolar(); });
  // só escuta a rolagem enquanto a cena está na tela
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) addEventListener('scroll', aoRolar, { passive: true });
    else removeEventListener('scroll', aoRolar);
  }).observe(cena);
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
  const trocar = (novo) => {
    botaoAgendar.classList.add('trocando');
    setTimeout(() => { rotulo.textContent = novo; botaoAgendar.classList.remove('trocando'); }, 120);
  };
  trocar('Abrindo o WhatsApp…');
  setTimeout(() => trocar(original), 2600);
});

// ---------- Botão flutuante do WhatsApp ----------
// Fica escondido enquanto o botão de agendar da abertura está à vista; depois entra de baixo.
const flutuante = document.querySelector('.whats-flutuante');
function atualizarFlutuante() {
  const escondido = scrollY < topoCena + curso * 0.2;
  if (flutuante.classList.contains('escondido') !== escondido) {
    flutuante.classList.toggle('escondido', escondido);
    flutuante.inert = escondido;
  }
}
if (calmo) medir();
atualizarFlutuante();
addEventListener('scroll', atualizarFlutuante, { passive: true });
