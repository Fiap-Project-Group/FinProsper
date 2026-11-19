# FinProsper

Plataforma de educação financeira transparente, autônoma e inclusiva, baseada na regra 50/30/20.
Projeto de front-end recriado a partir do protótipo feito no Google Stitch, usando apenas o conteúdo
apresentado no 1º ano de Engenharia de Software (FIAP).

## Tecnologias

- **HTML5**: páginas separadas, uma para cada seção do site
- **CSS3**: `css/style.css` (compartilhado) e um arquivo por página, com media queries
- **SASS**: Bootstrap 5 customizado com a paleta do FinProsper (`scss/bootstrap-finprosper.scss`)
- **Bootstrap 5.3**: grid, utilitários, formulários, modal, acordeão (collapse) e chave liga/desliga
- **JavaScript**: funções, laços, eventos, `getElementById` e `getElementsByClassName`
- **jQuery 3.7**: seletores, `.click()`, `.text()`, `.val()`, `addClass()` e `removeClass()`
- **Font Awesome 6**: ícones (somente os usados, embutidos em `css/fontawesome.css`)
- **Google Fonts**: Inter, Manrope e JetBrains Mono

## Páginas

| Arquivo               | Conteúdo                                      |
| --------------------- | --------------------------------------------- |
| `index.html`          | Início: o problema, o cidadão, a solução e os ODS |
| `pages/glossario.html` | Guia de educação financeira e glossário      |
| `pages/solucao.html`  | Simulador: compara 12 investimentos de renda fixa (array de objetos) |
| `pages/impacto.html`  | Painel de impacto e métricas                  |
| `pages/equipe.html`   | Equipe, cultura e formulário de sugestões     |

Todas as páginas têm um layout único e responsivo: grid e flexbox (do Bootstrap e próprios) e
media queries nos arquivos CSS de cada página. Só o cabeçalho muda de formato: no celular e no
tablet (até 991 px) o menu fica numa barra fixa na parte de baixo da tela.

## Estrutura

```
FinProsper/
├── index.html
├── pages/          páginas internas
├── css/
│   ├── bootstrap.css     Bootstrap compilado a partir do SASS
│   ├── fontawesome.css   ícones usados no site
│   ├── style.css         estilos compartilhados (base, cabeçalho, menu e rodapé)
│   ├── index.css         estilos da página inicial
│   ├── glossario.css     estilos do guia e do glossário
│   ├── solucao.css       estilos do simulador
│   ├── impacto.css       estilos do painel de impacto
│   └── equipe.css        estilos da página da equipe
├── js/
│   ├── funcoes.js        funções de apoio (formatar moeda, normalizar texto...)
│   ├── termos.js         dados do glossário (array de termos)
│   ├── glossario.js      monta o glossário (busca, filtros, índice A-Z)
│   ├── investimentos.js  dados do simulador (array com 12 investimentos)
│   ├── solucao.js        monta os cartões do simulador e faz os cálculos
│   └── equipe.js         validação do formulário de sugestões
├── img/            imagens do site
└── scss/
    └── bootstrap-finprosper.scss
```

## Integrantes

| Nome         | RM       |
| ------------ | -------- |
| João Marcos  | RM569356 |
| Igor Miguel  | RM573567 |
| Yago Avena   | RM568635 |

## Vídeo pitch

Link (acesso público): https://youtu.be/0QXePla2mDM

## Uso de IA generativa

Declaramos as ferramentas de IA usadas no projeto, conforme as regras da Global Solution:

- **Google Stitch**: geração do protótipo visual inicial (layout, paleta de cores e telas), que serviu de base para o design do site.
- **Claude (Anthropic)**: apoio na conversão do protótipo para HTML, CSS, SASS, Bootstrap e JavaScript/jQuery usando só o conteúdo visto no curso, na revisão de responsividade e acessibilidade, na pesquisa das taxas usadas no simulador e na revisão de texto.

Todo o código foi revisado e entendido pelo grupo, que fez as próprias alterações e decisões de conteúdo
(problema, cidadão, ODS, glossário, formulário e simulador).

## Como abrir e executar

Não precisa instalar nada: basta abrir o `index.html` no navegador.
jQuery e o JavaScript do Bootstrap são carregados por CDN, então é preciso estar conectado à internet.

## Como recompilar o Bootstrap (SASS)

Só é necessário se você alterar as variáveis em `scss/bootstrap-finprosper.scss`:

```bash
npm install
npm run build:css
```

## Publicar no GitHub Pages

No repositório, vá em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
O site fica disponível em `https://<seu-usuario>.github.io/<nome-do-repositorio>/`.
