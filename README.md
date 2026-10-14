# Site — Anelise Werle Camillo, Terapeuta Quântica

Site de uma página para agendar atendimentos pelo WhatsApp. HTML, CSS e JS puros, sem build.

O conceito visual é o **Santinho de Luz**: o site é um santinho brasileiro (o cartãozinho devocional de renda de papel) cuja figura é um Dragão de Luz dourado, sobre verde esmeralda e dourado. A abertura fica presa enquanto a pessoa rola: o título se desfaz, o santinho sobe até o centro e vira, mostrando o verso escrito como uma oração. Dá também para arrastar o cartão com o dedo ou virar pelo botão.

Movimento no estilo Apple, rápido e em todo navegador (inclusive iPhone): menu de vidro, molas que herdam a velocidade do dedo, pontos de luz dourada na abertura, títulos que sobem palavra por palavra e conteúdo que aparece um pouco antes de chegar à tela, mais transições ligadas à rolagem (raios girando, guirlanda que se desenrola, frase que acende palavra por palavra, a página clara que chega como um painel, cartões que se abrem em leque). Nada na primeira tela espera para aparecer. Quem pede menos movimento no sistema vê tudo parado. Para testar o caminho em JS (o que o iPhone antigo e o Firefox usam) no Chrome, abra o site com `?fallback` no fim do endereço.

## Ver no computador

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir o `index.html` direto com dois cliques também funciona, mas as fontes só carregam quando o site é servido por um servidor.

## O que falta preencher

Tudo o que aparece no site entre `[[ ]]` numa etiqueta dourada com estrelinha é informação que não encontrei publicamente e precisa vir da Anelise:

| O quê | Onde |
|---|---|
| Número do WhatsApp | Troque **todas** as ocorrências de `5500000000000` no `index.html` pelo número com DDI e DDD, só dígitos (ex.: `5519999999999`) |
| @ do Instagram | Seção Contato (`[[@usuario]]` e o link `https://instagram.com/`) |
| Foto dela | Seção Sobre, no medalhão oval (`[[foto da Anelise]]`) |
| Cidade, formato (online, presencial, à distância), duração e valores | Seções Sessões, Sobre, Como funciona e Perguntas |
| Trajetória e formações | Seção Sobre |
| Dias e horários de atendimento | Seção Contato |

Antes de publicar, procure por `[[` e por `5500000000000` no `index.html`: nenhum deve sobrar.

## Imagens

As artes (o Dragão de Luz do santinho e a guirlanda de rosas) foram geradas no Higgsfield e estão hospedadas no CDN deles. Para levar as imagens para dentro do projeto, rode uma vez:

```bash
./baixar-imagens.sh
```

Ele baixa as seis imagens para `assets/img/` e troca os links do `index.html`. Rode antes de publicar, num computador com internet: assim o site não depende do CDN do Higgsfield.

## Link do site e domínio

O site já aponta para `https://vicenzocamillo-a11y.github.io/site-m/` (link canônico, `og:url`, `og:image` e dados estruturados). Se for usar um domínio próprio, troque esse endereço no `<head>` do `index.html`. A imagem de compartilhamento do WhatsApp e do Instagram é `assets/og.jpg` (1200×630).

Prompts usados:
- **Dragão de Luz (frente do santinho):** ilustração de santinho em cromolitografia, sem texto: um Dragão de Luz dourado e sereno subindo em S diante de um resplendor de raios gravados, fundo rosa-pêssego com grão de papel, sóis dourados nos cantos de cima e rosas com folhas esmeralda nos cantos de baixo. Modelo Nano Banana 2.1.
- **Cartões Mesa Quântica e Harmonização:** dois santinhos lado a lado no mesmo estilo, uma mesa radiônica circular gravada com pêndulo e um sol em resplendor, rosas nos cantos, recortados em duas imagens. Modelo Nano Banana 2.1.
- **Guirlanda:** faixa ornamental de rosas, folhas esmeralda, arabescos dourados e dois sóis, sobre fundo liso (fundo removido depois). Modelo Nano Banana 2.1.

## Publicar

Qualquer hospedagem de site estático serve:
- **GitHub Pages:** Settings → Pages → Deploy from a branch → escolha a branch e a pasta `/`.
- **Netlify / Hostinger:** envie a pasta inteira.

## Arquivos

- `index.html` — todo o conteúdo
- `assets/site.css` — visual (cores esmeralda e dourado e fontes no topo, em `:root`)
- `assets/site.js` — menu do celular, cena da abertura, arrastar e virar o santinho com mola, botão flutuante do WhatsApp
- `assets/renda.svg` — a borda de renda de papel dos cartões
- `assets/fonts/` — Bodoni Moda (licença SIL OFL, `OFL-bodoni-moda.txt`); o texto corrido usa a fonte do sistema (SF Pro no iPhone e no Mac)
- `PESQUISA.md` — o que a pesquisa encontrou sobre a Anelise e as fontes
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/` — registro do produto e do sistema visual para futuras edições

## Cuidados com o texto

Terapia quântica não é profissão regulamentada. O site evita promessa de cura, "diagnóstico", "tratamento" e "paciente", e mostra o aviso de que as práticas são complementares e não substituem acompanhamento médico ou psicológico (Código Penal, arts. 283 e 284; CDC, arts. 36 e 37). Ao editar, mantenha esse cuidado.
