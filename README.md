# Site — Anelise Werle Camillo, Terapeuta Quântica

Site de uma página para agendar atendimentos pelo WhatsApp. HTML, CSS e JS puros, sem build.

O conceito visual é o **Santinho de Luz**: o site é um santinho brasileiro (o cartãozinho devocional de renda de papel) cuja figura é um Dragão de Luz dourado. O cartão da abertura vira sozinho conforme a pessoa rola a página e mostra o verso, escrito como uma oração.

## Ver no computador

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir o `index.html` direto com dois cliques também funciona, mas as fontes só carregam quando o site é servido por um servidor.

## O que falta preencher

Tudo o que aparece no site entre `[[ ]]` com contorno tracejado rosa é informação que não encontrei publicamente e precisa vir da Anelise:

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

Ele baixa as quatro imagens para `assets/img/` e troca os links do `index.html`. Depois disso, ajuste a tag `og:image` para o endereço completo do site (ex.: `https://seudominio.com.br/assets/img/dragao-1100.webp`), porque o WhatsApp e o Instagram só leem link completo.

Prompts usados:
- **Dragão de Luz (frente do santinho):** ilustração de santinho em cromolitografia, sem texto: um Dragão de Luz dourado e sereno subindo em S diante de um resplendor de raios gravados, fundo rosa-pêssego com grão de papel, sóis dourados nos cantos de cima e rosas com folhas esmeralda nos cantos de baixo. Modelo Nano Banana 2.1.
- **Guirlanda:** faixa ornamental de rosas, folhas esmeralda, arabescos dourados e dois sóis, sobre azul-ultramar liso (fundo removido depois). Modelo Nano Banana 2.1.

## Publicar

Qualquer hospedagem de site estático serve:
- **GitHub Pages:** Settings → Pages → Deploy from a branch → escolha a branch e a pasta `/`.
- **Netlify / Hostinger:** envie a pasta inteira.

## Arquivos

- `index.html` — todo o conteúdo
- `assets/site.css` — visual (cores e fontes no topo, em `:root`)
- `assets/site.js` — menu do celular, virar o santinho, botão flutuante do WhatsApp
- `assets/renda.svg` — a borda de renda de papel dos cartões
- `assets/fonts/` — Bodoni Moda e Alegreya (licença SIL OFL, arquivos `OFL-*.txt`)
- `PESQUISA.md` — o que a pesquisa encontrou sobre a Anelise e as fontes
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/` — registro do produto e do sistema visual para futuras edições

## Cuidados com o texto

Terapia quântica não é profissão regulamentada. O site evita promessa de cura, "diagnóstico", "tratamento" e "paciente", e mostra o aviso de que as práticas são complementares e não substituem acompanhamento médico ou psicológico (Código Penal, arts. 283 e 284; CDC, arts. 36 e 37). Ao editar, mantenha esse cuidado.
