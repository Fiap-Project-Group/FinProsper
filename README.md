# FinProsper

Plataforma de educação financeira transparente, autônoma e inclusiva, baseada na regra 50/30/20.
Projeto de front-end recriado a partir do protótipo feito no Google Stitch, usando apenas o conteúdo
apresentado no 1º ano de Engenharia de Software (FIAP).

## Tecnologias

- **HTML5**: páginas separadas, uma para cada seção do site
- **CSS3**: folha de estilos própria (`css/style.css`)
- **SASS**: Bootstrap 5 customizado com a paleta do FinProsper (`scss/bootstrap-finprosper.scss`)
- **Bootstrap 5.3**: grid, utilitários, formulários, modal, acordeão (collapse) e chave liga/desliga
- **JavaScript**: funções, laços, eventos, `getElementById` e `getElementsByClassName`
- **jQuery 3.7**: seletores, `.click()`, `.text()`, `.val()`, `addClass()` e `removeClass()`
- **Font Awesome 6**: ícones (somente os usados, embutidos em `css/fontawesome.css`)
- **Google Fonts**: Inter, Manrope e JetBrains Mono

## Páginas

| Arquivo               | Conteúdo                                      |
| --------------------- | --------------------------------------------- |
| `index.html`          | Início / Dashboard                            |
| `pages/noticias.html` | Notícias e glossário financeiro               |
| `pages/solucao.html`  | Simulador de juros compostos e regra 50/30/20 |
| `pages/impacto.html`  | Painel de impacto e métricas                  |
| `pages/equipe.html`   | Equipe, cultura e formulário de parcerias     |

Cada página tem uma versão para celular/tablet (até 991 px) e outra para desktop (a partir de 992 px),
alternadas com as classes `d-lg-none` e `d-none d-lg-block` do Bootstrap.

## Estrutura

```
FinProsper/
├── index.html
├── pages/          páginas internas
├── css/
│   ├── bootstrap.css     Bootstrap compilado a partir do SASS
│   ├── fontawesome.css   ícones usados no site
│   └── style.css         estilos próprios
├── js/
│   ├── funcoes.js        funções de apoio (formatar moeda, normalizar texto...)
│   ├── noticias.js
│   ├── solucao.js
│   ├── impacto.js
│   └── equipe.js
├── images/
└── scss/
    └── bootstrap-finprosper.scss
```

## Como abrir

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
