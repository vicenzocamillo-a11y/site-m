const calmo = matchMedia('(prefers-reduced-motion: reduce)').matches;
const raiz = document.documentElement;
// Onde o navegador não liga animação à rolagem (iPhone antes do iOS 26, Firefox), o JS faz o mesmo.
// ?fallback força esse caminho para testar.
const semTimeline = !(window.CSS && CSS.supports('animation-timeline: view()')) || location.search.includes('fallback');
if (semTimeline) raiz.classList.add('sem-timeline');
const limitar = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suavizar = (t) => 1 - Math.pow(1 - t, 3); // ease-out cúbico para o que a rolagem move
const suave = (t) => t * t * (3 - 2 * t);      // começa e termina parado: para o giro preso à rolagem

// iOS só aplica :active em links e botões quando existe um ouvinte de toque
document.addEventListener('touchstart', () => {}, { passive: true });

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

// ---------- Depois da primeira pintura ----------
// O primeiro quadro não precisa de nada daqui (palavras, revelar, rolagem em JS, poeira):
// a página pinta primeiro e isto roda logo em seguida.
requestAnimationFrame(() => setTimeout(preparar));
function preparar() {
  // ---------- Palavra por palavra ----------
  // O leitor de tela lê a frase inteira (.sr); as palavras visíveis ficam escondidas dele.
  function fatiar(el, embrulhar) {
    const texto = el.textContent.trim().replace(/\s+/g, ' ');
    const sr = document.createElement('span');
    sr.className = 'sr';
    sr.textContent = texto;
    const visivel = document.createElement('span');
    visivel.setAttribute('aria-hidden', 'true');
    const palavras = texto.split(' ').map((p, i) => {
      const s = document.createElement('span');
      s.textContent = p;
      s.style.setProperty('--i', i);
      if (i) visivel.append(' ');
      visivel.append(embrulhar ? embrulhar(s) : s);
      return s;
    });
    el.replaceChildren(sr, visivel);
    return palavras;
  }
  const titulos = document.querySelectorAll('main h2');
  titulos.forEach((h) => fatiar(h, (s) => {
    const m = document.createElement('span');
    m.className = 'm';
    m.append(s);
    return m;
  }));

  const frase = document.querySelector('.frase');
  const palavras = fatiar(frase);
  palavras.forEach((w) => {
    w.className = 'palavra';
    if (/^(Contabilidade|Cósmica)/.test(w.textContent)) w.classList.add('ouro');
    w.style.setProperty('--n', palavras.length);
  });

  // ---------- Revelar ao entrar ----------
  // Começa uma tela inteira antes do elemento aparecer e dura 300ms: quando a pessoa chega, já está lá.
  // Só o que entra junto vem em sequência. O que está a até duas telas quando isto roda aparece sem animação.
  // No movimento reduzido, o CSS troca o deslocamento por um fade curto.
  if ('IntersectionObserver' in window) {
    const alvos = [...titulos, ...document.querySelectorAll('[data-r]')];
    const revela = new IntersectionObserver((es) => es.filter((e) => e.isIntersecting).forEach((e, k) => {
      e.target.style.setProperty('--i', Math.min(k, 4));
      e.target.classList.add('in');
      revela.unobserve(e.target);
    }), { rootMargin: '100% 0px 100% 0px' });
    alvos.forEach((el) => { if (el.dataset.r) [...el.children].forEach((c, i) => c.style.setProperty('--i', Math.min(i, 4))); });
    const topos = alvos.map((el) => el.getBoundingClientRect().top);
    alvos.forEach((el, k) => (topos[k] < innerHeight * 2 ? el.classList.add('in') : revela.observe(el)));
    raiz.classList.add('anima'); // na mesma tarefa: o que já recebeu .in não chega a piscar escondido
  }

  // ---------- Movimento ligado à rolagem, para quem não tem animation-timeline ----------
  // Um só ouvinte de rolagem. Lê as caixas de todos de uma vez e depois escreve: são cinco, e assim
  // nenhum quadro sai velho depois de um salto (link com #, rolagem restaurada, busca na página).
  const scrubs = new Map();
  let pedido = 0;
  function rolar() {
    pedido = 0;
    const vh = innerHeight;
    const lidos = [...scrubs.keys()].map((el) => [el, el.getBoundingClientRect()]); // lê tudo, depois escreve
    lidos.forEach(([el, r]) => scrubs.get(el)(r, vh));
  }
  function ligar(el, fn) { if (el) scrubs.set(el, fn); }
  // progresso como no CSS: entrada (topo no pé da tela → elemento inteiro dentro) e cobertura
  const entrada = (r, vh, fim = 1) => limitar((vh - r.top) / (Math.min(r.height, vh) * fim));
  const cobertura = (r, vh) => limitar((vh - r.top) / (vh + r.height));
  const cel = matchMedia('(max-width: 1000px)');

  if (semTimeline && !calmo) {
    addEventListener('scroll', () => { if (!pedido) pedido = requestAnimationFrame(rolar); }, { passive: true });
    addEventListener('resize', rolar);

    // a frase acende palavra por palavra e está toda acesa quando chega ao meio da tela
    const n = palavras.length;
    ligar(frase, (r, vh) => {
      const t = cobertura(r, vh);
      palavras.forEach((w, i) => { w.style.opacity = (0.4 + 0.6 * limitar((t - (i / n) * 0.3) / 0.12)).toFixed(3); });
    });

    // a guirlanda se desenrola do centro
    const guirlanda = document.querySelector('.guirlanda img');
    ligar(guirlanda.parentNode, (r, vh) => {
      const t = entrada(r, vh);
      guirlanda.style.clipPath = t < 1 ? `inset(0 ${((1 - t) * 50).toFixed(2)}%)` : 'none';
      guirlanda.style.opacity = (0.4 + 0.6 * t).toFixed(3);
    });

    // os raios do medalhão giram com a rolagem
    const medalhao = document.querySelector('.medalhao');
    ligar(medalhao, (r, vh) => medalhao.style.setProperty('--giro', (30 * cobertura(r, vh)).toFixed(2) + 'deg'));

    // a página clara chega como um painel: escala .92 → 1 (os cantos redondos são fixos, no CSS)
    const como = document.querySelector('.como');
    ligar(como, (r, vh) => { como.style.scale = (1 - 0.08 * (1 - entrada(r, vh, 0.5))).toFixed(4); });

    // no computador, os santinhos saem de um monte só e abrem em leque
    const leque = document.querySelector('.leque');
    const cartas = [...leque.children];
    const pilha = [[104, 0, 0.94, 3], [0, 2.5, 0.96, 0], [-104, 0, 0.94, -3]]; // x%, y rem, escala, graus
    ligar(leque, (r, vh) => {
      if (cel.matches) return;
      const k = 1 - entrada(r, vh, 0.8);
      cartas.forEach((c, i) => {
        const [x, y, s, g] = pilha[i];
        c.style.translate = k ? `${(x * k).toFixed(2)}% ${(y * k).toFixed(3)}rem` : 'none';
        c.style.scale = k ? (1 - (1 - s) * k).toFixed(4) : 'none';
        c.style.rotate = k ? `${(g * k).toFixed(2)}deg` : 'none';
      });
    });

    // no celular, o cartão do centro da galeria fica em foco
    let pl = 0;
    const focar = () => {
      pl = 0;
      const lr = leque.getBoundingClientRect();
      const meio = lr.left + lr.width / 2;
      cartas.forEach((c) => {
        const cr = c.getBoundingClientRect();
        const d = cel.matches ? limitar(Math.abs(cr.left + cr.width / 2 - meio) / cr.width) : 0;
        c.firstElementChild.style.scale = d ? (1 - 0.06 * d).toFixed(4) : '';
        c.firstElementChild.style.opacity = d ? (1 - 0.18 * d).toFixed(3) : '';
        if (cel.matches) c.style.translate = c.style.scale = c.style.rotate = '';
      });
    };
    leque.addEventListener('scroll', () => { if (!pl) pl = requestAnimationFrame(focar); }, { passive: true });
    cel.addEventListener('change', () => { focar(); rolar(); });
    focar();
    rolar(); // o primeiro quadro já sai certo
  }

  // Luz que se move: pontos de luz dourada sobem devagar atrás do santinho (só CSS, pausam fora da tela)
  if (!calmo) {
    const total = innerWidth < 700 ? 12 : 20;
    for (let i = 0; i < total; i++) {
      const m = document.createElement('i');
      const perto = i % 4 === 0; // um em cada quatro é maior, desfocado e fica nas bordas
      const dur = (perto ? 14 : 20) + Math.random() * 12;
      const x = perto ? (i % 8 ? Math.random() * 14 : 86 + Math.random() * 14) : Math.random() * 100;
      const tam = perto ? 5 + Math.random() * 3 : 2 + Math.random() * 2.5;
      m.style.cssText = `left:${x.toFixed(1)}%;--s:${tam.toFixed(1)}px;--o:${(perto ? 0.5 : 0.45 + Math.random() * 0.45).toFixed(2)};--x:${(Math.random() * 6 - 3).toFixed(1)}vw;animation-duration:${dur.toFixed(1)}s;animation-delay:-${(Math.random() * dur).toFixed(1)}s`;
      if (perto) m.className = 'perto';
      poeira.append(m);
    }
  }
}

// ---------- A cena da abertura ----------
// A cena é presa à rolagem: o título sai, o santinho sobe até o centro e vira.
// O ângulo do cartão soma a rolagem e a mão (arrastar ou botão). A mão anda com uma
// mola (resposta e amortecimento, como a Apple descreve): começa do valor que está na
// tela, herda a velocidade do dedo e pode ser agarrada no meio do caminho.
const cena = document.querySelector('.cena');
const texto = document.querySelector('.cena-texto');
const cartao = document.querySelector('.cena-cartao');
const giro = document.querySelector('.santinho-giro');
const poeira = document.querySelector('.poeira');
const brilhos = document.querySelectorAll('.brilho');
const botaoVirar = document.querySelector('[data-virar]');
const tipo = texto.querySelectorAll('h1, .lead'); // só a letra desfoca; o botão de ouro só esmaece

let progresso = 0;      // 0..1 dentro da cena
let mao = 0, velocidade = 0, alvo = 0, mola = null, quadro = 0, ultimo = 0;

function desenhar() {
  // 1) o texto sai antes do cartão chegar: some, sobe um pouco e a letra desfoca
  const q = suavizar(limitar(progresso / 0.22));
  texto.style.opacity = String(1 - q);
  texto.style.transform = q > 0.001 ? `translateY(${(-6 * q).toFixed(2)}svh) scale(${(1 - 0.04 * q).toFixed(4)})` : '';
  const borrao = q > 0.01 ? `blur(${(6 * q).toFixed(2)}px)` : '';
  tipo.forEach((el) => { el.style.filter = borrao; });
  texto.style.visibility = q > 0.99 ? 'hidden' : '';
  texto.style.pointerEvents = q > 0.05 ? 'none' : ''; // um toque no cartão nunca cai no formulário que sai

  // 2) o santinho sobe do pé da tela até o centro (mesma conta do CSS, sem medir nada)
  const r = suavizar(limitar(progresso / 0.45));
  cartao.style.transform = `translate(-50%, calc(-50% + ${(1 - r).toFixed(4)} * var(--desce))) scale(${(0.86 + 0.14 * r).toFixed(4)})`;

  // 3) e vira enquanto a rolagem continua; termina a 80% da cena
  const virada = suave(limitar((progresso - 0.42) / 0.38));
  const graus = -12 + virada * 192 + mao;
  giro.style.transform = `rotateY(${graus.toFixed(2)}deg) rotateX(3deg)`;
  const face = ((graus % 360) + 360) % 360;
  botaoVirar.classList.toggle('no-verso', face > 90 && face < 270);

  // a luz atravessa o papel conforme o cartão gira (rolagem, dedo ou botão)
  const a = ((graus % 180) + 180) % 180;
  const luz = Math.sin((a / 180) * Math.PI) ** 2 * 0.8;
  brilhos.forEach((b) => {
    b.style.transform = `translateX(${(-120 + (240 * a) / 180).toFixed(1)}%)`;
    b.style.opacity = luz.toFixed(3);
  });

  // profundidade: a poeira sobe mais rápido que o palco (os raios giram só pelo CSS, onde há timeline)
  poeira.style.transform = `translate3d(0, ${(-14 * progresso).toFixed(2)}svh, 0)`;
}

function soltarMola(destino, resposta, amortecimento, v0 = velocidade) {
  alvo = destino;
  velocidade = v0; // a velocidade atravessa cada novo destino: nada de parar no muro
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

// Botão: cada toque soma meia volta a partir de onde o cartão está indo, sem quique
botaoVirar.addEventListener('click', () => soltarMola((mola ? alvo : Math.round(mao / 180) * 180) + 180, 0.45, 1));

// Arrastar: o cartão acompanha o dedo 1:1; ao soltar, projeta o impulso para escolher a face
// e continua na mesma velocidade, com um pouco de quique porque veio de um gesto.
const projetar = (v, d = 0.995) => (v / 1000) * d / (1 - d);
const grausPorPx = () => 180 / (giro.offsetWidth * 0.8);
let toque = null;

giro.addEventListener('pointerdown', (e) => {
  if (calmo || toque || (e.pointerType === 'mouse' && e.button !== 0)) return;
  toque = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: e.timeStamp, sy: scrollY, mao0: mao, movendo: false, historico: [{ x: e.clientX, t: e.timeStamp }] };
  mola = null; velocidade = 0; // agarrou: para onde está
  giro.setPointerCapture(e.pointerId);
  giro.classList.add('segurando');
});
giro.addEventListener('pointermove', (e) => {
  if (!toque || e.pointerId !== toque.id) return;
  const dx = e.clientX - toque.x0, dy = e.clientY - toque.y0;
  if (!toque.movendo) {
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { largar(); return; } // gesto vertical: não é virar
    if (Math.abs(dx) < 8) return; // folga antes de assumir a direção
  }
  toque.movendo = true;
  mao = toque.mao0 + dx * grausPorPx();
  toque.historico.push({ x: e.clientX, t: e.timeStamp });
  if (toque.historico.length > 8) toque.historico.shift();
  pedirQuadro();
});
// solta sem virar; se estava arrastando, assenta na face mais próxima
function largar() {
  if (giro.hasPointerCapture(toque.id)) giro.releasePointerCapture(toque.id);
  const { movendo } = toque;
  toque = null;
  giro.classList.remove('segurando');
  if (movendo) soltarMola(Math.round(mao / 180) * 180, 0.4, 1, 0);
}
giro.addEventListener('pointerup', (e) => {
  if (!toque || e.pointerId !== toque.id) return;
  giro.classList.remove('segurando');
  const { historico, movendo, y0, t0, sy } = toque;
  toque = null;
  if (!movendo) { // um toque simples também vira, mas só se foi mesmo um toque
    if (Math.abs(e.clientY - y0) < 10 && e.timeStamp - t0 < 350 && scrollY === sy) botaoVirar.click();
    return;
  }
  const b = historico[historico.length - 1];
  const a = historico.find((h) => b.t - h.t <= 100) || historico[0];
  const v = (b.t > a.t ? (b.x - a.x) / ((b.t - a.t) / 1000) : 0) * grausPorPx(); // graus/s
  soltarMola(Math.round((mao + projetar(v)) / 180) * 180, 0.4, 0.8, v);
});
// rolar a página com o dedo em cima do cartão cancela o toque: nunca vira por isso
giro.addEventListener('pointercancel', (e) => { if (toque && e.pointerId === toque.id) largar(); });

let topoCena = 0, curso = 1;
function medir() {
  topoCena = cena.getBoundingClientRect().top + scrollY;
  curso = Math.max(1, cena.offsetHeight - innerHeight);
  // o topo do cartão em repouso (escala .86) fica 12px abaixo do fim do texto; medidas de layout, sem transform
  const minimo = texto.offsetTop + texto.offsetHeight + 12 - cartao.offsetTop + 0.43 * cartao.offsetHeight;
  cartao.style.setProperty('--abaixo-do-texto', minimo.toFixed(1) + 'px');
}
function aoRolar() {
  progresso = limitar((scrollY - topoCena) / curso);
  pedirQuadro();
}
if (!calmo) {
  medir();
  aoRolar();
  addEventListener('resize', () => { medir(); aoRolar(); });
  // só escuta a rolagem enquanto a cena está na tela; fora dela a poeira para
  new IntersectionObserver(([e]) => {
    cena.classList.toggle('fora', !e.isIntersecting);
    if (e.isIntersecting) { addEventListener('scroll', aoRolar, { passive: true }); aoRolar(); } // voltou de um salto: lê já
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
// Já nasce escondido no HTML: não aparece e some no primeiro quadro.
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
