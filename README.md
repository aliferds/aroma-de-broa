# Projeto Aroma de Broa

Este é um projeto executado por [Alifer Duarte Silva](#Author) durante as aulas do curso de programação web da [FAT](https://escolatecnicafat.org.br/) turma T148 B.

## Sumário

- [Projeto Aroma de Broa](#projeto-aroma-de-broa)
  - [Sumário](#sumário)
  - [Introdução](#introdução)
  - [Status](#status)
  - [Estrutura de diretórios](#estrutura-de-diretórios)
  - [Decisões de projeto](#decisões-de-projeto)
    - [Menu de navegação](#menu-de-navegação)
    - [Fomularios](#fomularios)
      - [Pedido](#pedido)
      - [feedback](#feedback)
      - [cadastro](#cadastro)
    - [Styles and Scripts](#styles-and-scripts)
      - [Web Components](#web-components)
  - [ToDo](#todo)
    - [Melhorias futuras](#melhorias-futuras)
  - [Informações sobre as imagens](#informações-sobre-as-imagens)
  - [Autor](#autor)

## Introdução

O projeto simula um site para a padaria de bairro. O nome Aroma de Broa foi criado por mim (Alifer). Foi pedido que houvesse além da página inicial com informações da padaria, também apresentasse as páginas para feedback, contato, cadastrar e pedidos.

## Status

Em construção 


## Estrutura de diretórios

O projeto é dividido em pastas de forma que possa ser localizados bem dentro do projeto:

📁 **"/public/"**: se encontra arquivos de imagem, fontes, áudio, etc.

📁 **"styles/"**: encontram-se os guias css para o site

📁 **"src/"**: encontram-se os scripts que dá as interatividades e funcionalidades do site.

Contém arquivo **.gitignore** para não subir imagens e arquivos zip das tarefas para o github

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 cadastro/
│   └── 🌐 index.html
├── 📁 contato/
│   └── 🌐 index.html
├── 📁 feedback/
│   └── 🌐 index.html
├── 📁 pedido/
│   └── 🌐 index.html
├── 📁 public/
│   └── 📁 assets/
│       ├── 📁 images/
│       │   ├── 📁 diferenciais/
│       │   │   ├── 🖼️ atendimento.png 🚫 (auto-hidden)
│       │   │   ├── 🖼️ ingredientes.jpg
│       │   │   └── 🖼️ tradicional.jpg
│       │   ├── 📁 logo/
│       │   │   ├── 🖼️ aroma_de_broa_logo.png 🚫 (auto-hidden)
│       │   │   └── 🖼️ aroma_de_broa_logo.svg
│       │   ├── 📁 photos/
│       │   │   └── 🖼️ fachada.png 🚫 (auto-hidden)
│       │   ├── 📁 products/
│       │   │   ├── 🖼️ bolo_cenoura.png 🚫 (auto-hidden)
│       │   │   ├── 🖼️ bolo_chocolate.jpg
│       │   │   ├── 🖼️ bolo_fuba.png 🚫 (auto-hidden)
│       │   │   ├── 🖼️ broa.jpg
│       │   │   ├── 🖼️ cafe.jpg
│       │   │   ├── 🖼️ cha.JPG
│       │   │   ├── 🖼️ coxinha.jpg
│       │   │   ├── 🖼️ croissant.jpg
│       │   │   ├── 🖼️ empadas.png 🚫 (auto-hidden)
│       │   │   ├── 🖼️ milkshake.jpg
│       │   │   ├── 🖼️ pao_frances.jpg
│       │   │   ├── 🖼️ pastel.png 🚫 (auto-hidden)
│       │   │   ├── 🖼️ pudim.jpg
│       │   │   └── 🖼️ quindim.jpg
│       │   └── 📁 slide/
│       │       ├── 🖼️ breads.png 🚫 (auto-hidden)
│       │       ├── 🖼️ cakes.png 🚫 (auto-hidden)
│       │       ├── 🖼️ candies.png 🚫 (auto-hidden)
│       │       ├── 🖼️ pizzas_and_burguers.png 🚫 (auto-hidden)
│       │       └── 🖼️ snacks.png 🚫 (auto-hidden)
│       └── 🖼️ favicon.ico
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📄 adb-navbar.js
│   │   ├── 📄 carrinho.js
│   │   ├── 📄 carrousel.js
│   │   ├── 📄 modal.js
│   │   ├── 📄 rating.js
│   │   ├── 📄 rodape-alifer.js
│   │   ├── 📄 select.js
│   │   ├── 📄 wc-link.js
│   │   └── 📄 welcome.js
│   ├── 📁 form/
│   │   ├── 📄 openModal.js
│   │   ├── 📄 order.js
│   │   ├── 📄 validadeForm.js
│   │   └── 📄 validarInputs.js
│   ├── 📁 navbar/
│   │   └── 📄 interactions.js
│   ├── 📁 utils/
│   │   └── 📄 localStorage.js
│   └── 📄 scripts.js
├── 📁 styles/
│   ├── 📁 forms/
│   │   ├── 🎨 carrinho.css
│   │   ├── 🎨 checkbox-switch.css
│   │   ├── 🎨 checkbox-tags.css
│   │   ├── 🎨 coffe-ratting.css
│   │   ├── 🎨 index.css
│   │   └── 🎨 reason.css
│   ├── 📁 theme/
│   │   └── 🎨 adb-theme.css
│   ├── 🎨 about.css
│   ├── 🎨 cardapio.css
│   ├── 🎨 carrinho.css
│   ├── 🎨 carrousel.css
│   ├── 🎨 footer.css
│   ├── 🎨 globals.css
│   ├── 🎨 logo.css
│   ├── 🎨 navbar.css
│   ├── 🎨 reset.css
│   ├── 🎨 simple-card.css
│   └── 🎨 video.css
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 adb-products.json
└── 🌐 index.html
```

## Decisões de projeto

Para o cardápio é utilizado uma tabela, e então é estilizada com CSS por questão de semântica do HTML.
Há um slider de imagens que seriam de produtos da padaria.
Adicionado foto da "fachada" da padaria para uma melhor explicação sobre a padaria.
Para contatos foi utilizado Descritive List.

### Menu de navegação

Há um icone de carrinho no canto superior do header para direcionar para a página de pedidos, assim como há em vários sites que fazem vendas.

Há um script para deixar o menu na navegação com interatividade na página.

Para a versão mobile é utilizado um menu de navegação na parte inferior da tela, deixando o site mais próximo de um aplicativo.

### Fomularios

Para os inputs, foi considerado que todos são obrigatórios com exceção daqueles marcados como opcionais em decorrência da experiência de usuário.

Para alguns formulários foram utilizadas algumas decisões mais específicas, como é descrito a seguir.

A validação dos formulários(com exceção de pedido) acontecem dentro de validateForm.js, nele é selecionado o formulário, então para cada input obrigatório faz uma verificação se ele é válido. Caso o input não seja válido a borda da área do input fica vermelha. No caso de entradas para avaliação e pedidos, o paragrafo é colocado como vermelho.

#### Pedido

Para o formulário de pedido, foi considerado que para adicionar o pedido a pessoa selecionará o produto que será mostrado em formato de tabela, podendo adicionar, visualizar, editar e excluir o pedido.

Os pedidos estão sendo salvos localmente, assim caso ele entre futuramente o seu carrinho está salvo.

#### feedback

Para feedback ao invés de utilizar um sistema de estrelas para a avaliação foi considerado o contexto e utilizado xícaras de café. Podendo ser de 1 a 5 xícaras.

#### cadastro

No formulário de cadastro, foi utilizado checkbox como possibilidade de mostrar sobre os produtos que o cliente selecionar.

Para a questão de confirmar em receber anúncios e termos foi utilizado checkbox como um toggle que deixa o usuário decidir.

### Styles and Scripts

Os arquivos estão componentizados de forma a tentar reaproveitar o máximo do código e ficar de forma simples e legível, sem que tenha problema para localizar o que precisa mudar!

#### Web Components

Foi criado web components para modal, assim é possível reaproveitar o máximo possível o código. Também há web component para navbar e footer.

## ToDo

Tarefas feitas e pontos de melhorias futuras:

- [X] Modal de boas vindas!
- [X] Página Inicial
  - [X] Menu navbar com links de navegação e interatividade
  - [X] Cardápio parecendo um cardápio físico de padaria
  - [X] Seção sobre
  - [X] Seção de Contatos
  - [X] Seção com diferenciais
  - [X] Footer
  - [X] Carrinho indicando se há algum produto
- [X] Formulários
  - [X] Pedido
    - [X] Modal para adicionar produtos
    - [X] Campo de busca para produtos
    - [X] Adição e remoção de produtos
    - [X] Revisão antes de enviar o pedido
  - [X] Cadastro
  - [X] Feedback
    - [X] Avaliação baseada em café
  - [X] Contato
  - [ ] Validação de todos os formulários com modal de confirmação
  - [ ] Validação de inputs
    - [ ] Ao ir digitando tirar a classe invalid do input

### Melhorias futuras

- [ ] Colocar avaliação de produtos mostrando no modal de carrinho.
- [ ] Integrar com HEADLESS CMS (Wordpress com Woocommerce)

## Informações sobre as imagens

As imagens foram geradas por IA, ou retiradas do 
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page)

## Autor

<div align="center">
  <img 
    src= "https://github.com/aliferds/aliferds/raw/main/images/selfie.png"
    width= "100"
    alt="Alifer's photo"
  />
</div>

<div align="center">
  <a target="_blank" href="https://aliferdev.digital">Alifer Duarte Silva</a>
</div>