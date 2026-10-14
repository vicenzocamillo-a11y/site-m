#!/usr/bin/env bash
# Baixa as artes do site (hoje hospedadas no CDN do Higgsfield) para assets/img
# e troca os links no index.html para os arquivos locais. Rode uma vez, na raiz do projeto.
set -euo pipefail
CDN="https://d2ol7oe51mr4n9.cloudfront.net/user_3JWCbqGOdJK9lfvh2f44thjxYM1"
mkdir -p assets/img
while read -r id nome; do
  curl -fsSL "$CDN/$id.webp" -o "assets/img/$nome.webp"
  sed -i.bak "s#$CDN/$id.webp#assets/img/$nome.webp#g" index.html
done <<'LISTA'
98c1b80b-80bf-4542-937f-472f96ea50e8 dragao-1100
08167ffa-38ca-4469-a65b-636e795d3a43 dragao-640
b90d1f41-c351-42a9-a728-eb88bd5d7f88 guirlanda-1600
176cfbd4-e73b-4219-a294-f5c6f6070377 guirlanda-900
LISTA
rm -f index.html.bak
sed -i.bak '/rel="preconnect" href="https:\/\/d2ol7oe51mr4n9/d' index.html && rm -f index.html.bak
echo "Pronto: imagens em assets/img e index.html atualizado."
