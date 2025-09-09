# Projeto Aroma de Broa

Este é um projeto executado por [Alifer Duarte Silva](#Author) durante as aulas do curso de programação web da [FAT](https://escolatecnicafat.org.br/) turma T148 B.

# Sumário

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
- [O que fazer?](#o-que-fazer)
- [Informações sobre as imagens](#informações-sobre-as-imagens)
- [Autor](#autor)

# Introdução

O projeto simula um site para a padaria de bairro. O nome Aroma de Broa foi criado por mim (Alifer). Foi pedido que houvesse além da página inicial com informações da padaria, também apresentasse as páginas para feedback, contato, cadastrar e pedidos.

# Status

Em construção 


# Estrutura de diretórios

O projeto é dividido em pastas de forma que possa ser localizados bem dentro do projeto:

📁 **"/public/"**: se encontra arquivos de imagem, fontes, áudio, etc.

📁 **"styles/"**: encontram-se os guias css para o site

📁 **"src/"**: encontram-se os scripts que dá as interatividades e funcionalidades do site.

Contém arquivo **.gitignore** para não subir imagens e arquivos zip das tarefas para o github

```
.
├── 📁 formulario/
│   ├── 📁 cadastro/
│   │   └── 🌐 index.html
│   ├── 📁 contato/
│   │   └── 🌐 index.html
│   ├── 📁 feedback/
│   │   └── 🌐 index.html
│   └── 📁 pedido/
│       └── 🌐 index.html
├── 📁 public/
│   └── 📁 assets/
│       ├── 📁 images/
│       │   ├── 📁 diferenciais/
│       │   │   ├── 🖼️ atendimento.png
│       │   │   ├── 🖼️ ingredientes.jpg
│       │   │   └── 🖼️ tradicional.jpg
│       │   ├── 📁 logo/
│       │   │   ├── 🖼️ aroma_de_broa_logo.png
│       │   │   └── 🖼️ aroma_de_broa_logo.svg
│       │   ├── 📁 photos/
│       │   │   └── 🖼️ fachada.png
│       │   ├── 📁 products/
│       │   │   ├── 🖼️ bolo_cenoura.png
│       │   │   ├── 🖼️ bolo_chocolate.jpg
│       │   │   ├── 🖼️ bolo_fuba.png
│       │   │   ├── 🖼️ broa.jpg
│       │   │   ├── 🖼️ cafe.jpg
│       │   │   ├── 🖼️ cha.JPG
│       │   │   ├── 🖼️ coxinha.jpg
│       │   │   ├── 🖼️ croissant.jpg
│       │   │   ├── 🖼️ empadas.png
│       │   │   ├── 🖼️ milkshake.jpg
│       │   │   ├── 🖼️ pao_frances.jpg
│       │   │   ├── 🖼️ pastel.png
│       │   │   ├── 🖼️ pudim.jpg
│       │   │   └── 🖼️ quindim.jpg
│       │   └── 📁 slide/
│       │       ├── 🖼️ breads.png
│       │       ├── 🖼️ cakes.png
│       │       ├── 🖼️ candies.png
│       │       ├── 🖼️ pizzas_and_burguers.png
│       │       └── 🖼️ snacks.png
│       └── 🖼️ favicon.ico
├── 📁 src/
│   ├── 📁 utils/
│   │   ├── 📄 localStorage.js
│   ├── 📁 components/
│   │   ├── 📄 rating.js
│   │   └── 📄 select.js
│   ├── 📁 form/
│   │   ├── 📄 order.js
│   │   └── 📄 validadeForm.js
│   ├── 📁 navbar/
│   │   ├── 📄 desktop.js
│   │   └── 📄 mobile.js
│   └── 📄 scripts.js
├── 📁 styles/
│   ├── 🎨 forms.css
│   └── 🎨 globals.css
├── 📖 README.md
└── 🌐 index.html
```

# Decisões de projeto

Para o cardápio é utilizado uma tabela, e então é estilizada com CSS por questão de semântica do HTML.
Há um slider de imagens que seriam de produtos da padaria.
Adicionado foto da "fachada" da padaria para uma melhor explicação sobre a padaria.

## Menu de navegação

Há um icone de carrinho no canto superior do header para direcionar para a página de pedidos, assim como há em vários sites que fazem vendas.

Há um script para deixar o menu na navegação com interatividade na página ao utilizar a versão desktop.

Para a versão mobile é utilizado um menu de navegação na parte inferior da tela, deixando o site mais próximo de um aplicativo.

## Fomularios

Todos os formulários possuem um único arquivo de estilização para manutenção de estilos.

Para os inputs, foi considerado que todos são obrigatórios com exceção daqueles marcados como opcionais em decorrência da experiência de usuário.

Para alguns formulários foram utilizadas algumas decisões mais específicas, como é descrito a seguir.

A validação dos formulários acontecem dentro de validateForm.js independente do formulário, nele é selecionado o formulário, então para cada input obrigatório faz uma verificação se ele é válido. Caso o input não seja válido a borda da área do input fica vermelha. No caso de entradas para avaliação e pedidos, o paragrafo é colocado como vermelho.

### Pedido
Para o formulário de pedido, foi considerado que para adicionar o pedido a pessoa selecionará o produto que será mostrado em formato de tabela, podendo adicionar, visualizar, editar e excluir o pedido.

### feedback
Para feedback ao invés de utilizar um sistema de estrelas para a avaliação foi considerado o contexto e utilizado xícaras de café. Podendo ser de 1 a 5 xícaras.

### cadastro

No formulário de cadastro, foi utilizado checkbox como possibilidade de mostrar sobre os produtos que o cliente selecionar.

Para a questão de confirmar em receber anúncios e termos foi utilizado checkbox como um toggle que deixa o usuário decidir.

## Styles and Scripts

Os arquivos estão componentizados de forma a tentar reaproveitar o máximo do código e ficar de forma simples e legível, sem que tenha problema para localizar o que precisa mudar!

# O que fazer?

- [ ] Fazer um modal de boas-vindas
- [ ] Fazer sobre uso de cookies e aceitação de termos
- [ ] Rever estilos de Diferemciais na página inicial
- [ ] Trocar link do footer para portifólio
- [ ] Colocar autocomplete para os inputs
- [ ] Botão do carrinho para adicionar itens
- [ ] Colocar campo de filtros e pesquisa no modal de adicionar itens
- [ ] Colocar modal para confirmação para limpar (resetar) formulários
- [ ] Colocar modal de confirmação e revisão antes de submeter um formulário
- [ ] Colocar cálculo de preço para pedidos
- [ ] Colocar tag com quantidade no icone de carrinho na tela inicial
- [ ] Colocar avaliação de produtos mostrando no modal de carrinho.
- [ ] Verificar possíveis maneiras de diminuir CSS
- [ ] Utilizar headless wordpress para conexão como sistema de API


# Informações sobre as imagens

As imagens foram geradas por IA, ou retiradas do 
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Main_Page)

# Autor

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