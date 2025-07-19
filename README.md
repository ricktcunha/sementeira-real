# 🌱 Sementeira Real

Sistema de solicitações para o setor de marketing - Plataforma web estática com acesso a MIVs, templates e formulário de briefing estruturado.

## 📋 Visão Geral

A **Sementeira Real** é uma aplicação web estática desenvolvida para facilitar o processo de solicitações de materiais de marketing. A plataforma oferece:

- **Landing Page** com apresentação da plataforma
- **Biblioteca de Recursos** com MIVs das 3 marcas e templates importantes
- **Formulário de Solicitação** com briefing estruturado
- **Sistema de Email** via mailto links (sem necessidade de backend)

## ✨ Funcionalidades Principais

### 🏠 Landing Page

- Design minimalista inspirado em referência visual
- Seções organizadas: Hero, Features, Recursos, CTA
- Navegação responsiva com menu mobile
- Toggle de tema claro/escuro

### 📚 Biblioteca de Recursos

- **MIVs das 3 Marcas**: Downloads diretos dos manuais de identidade visual
- **Templates Importantes**: Modelos de comunicação e convites PGD
- Cards organizados com preview e botões de download
- Estrutura de pastas clara (`/assets/mivs/`, `/assets/templates/`)

### 📝 Formulário de Solicitação

- **Dados do Solicitante**: Nome, Email, Departamento, Centro de Custo
- **Tipo de Material**: Arte, Vídeo, Marca, Banner, Outdoor, Folder, etc.
- **Prioridade**: Urgente (1 dia), Alta (3 dias), Normal (7 dias), Baixa (15 dias)
- **Descrição Detalhada**: Objetivo, público-alvo, mensagem principal
- **Especificações Técnicas**: Tamanhos, formatos, cores, sugestões de texto
- **Links de Referência**: URLs para inspiração
- **Observações Adicionais**: Informações complementares

### 📧 Sistema de Email

- Geração automática de email via mailto links
- 5 destinatários da equipe de marketing
- Formatação estruturada dos dados
- Abertura automática do cliente de email do usuário

## 🎨 Design e UX

### Paleta de Cores

- **Verde Principal**: `#2D5016`, `#3A6B1C`, `#4A7C2A`
- **Modo Claro**: Fundo branco, texto escuro
- **Modo Escuro**: Fundo escuro, texto claro

### Heurísticas de Nielsen Implementadas

1. **Visibilidade do Status**: Breadcrumbs, indicadores de progresso
2. **Compatibilidade**: Linguagem familiar, ícones intuitivos
3. **Controle do Usuário**: Botões voltar, cancelar, editar
4. **Consistência**: Padrões visuais uniformes
5. **Prevenção de Erros**: Validação em tempo real
6. **Reconhecimento**: Labels claros, placeholders informativos
7. **Flexibilidade**: Auto-preenchimento, atalhos
8. **Design Minimalista**: Interface limpa
9. **Recuperação**: Mensagens claras de erro
10. **Ajuda**: Tooltips, FAQ integrado

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos com Tailwind CSS
- **JavaScript Vanilla**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Tailwind CSS**: Framework CSS via CDN

### Funcionalidades JavaScript

- **Validação de Formulários**: Em tempo real com feedback visual
- **Sistema de Temas**: Claro/escuro com persistência
- **Navegação Suave**: Scroll animado entre seções
- **Intersection Observer**: Animações de entrada
- **Responsividade**: Mobile-first design

## 📁 Estrutura de Arquivos

```
sementeira-real/
├── index.html              # Landing page
├── formulario.html         # Página do formulário
├── css/
│   ├── style.css          # Estilos principais
│   └── themes.css         # Sistema de temas
├── js/
│   ├── main.js            # Funcionalidades principais
│   ├── theme-switcher.js  # Gerenciamento de temas
│   └── form-validation.js # Validação de formulários
├── assets/
│   ├── mivs/              # Manuais de Identidade Visual
│   │   ├── miv-marca1.pdf
│   │   ├── miv-marca2.pdf
│   │   └── miv-marca3.pdf
│   ├── templates/         # Templates importantes
│   │   ├── comunicacao.docx
│   │   └── convites-pgd.pptx
│   └── images/            # Imagens (futuro)
└── README.md              # Documentação
```

## 🚀 Como Usar

### 1. Acesso aos Recursos

- Navegue até a seção "Biblioteca de Recursos"
- Clique nos cards dos MIVs ou templates
- Download automático dos arquivos

### 2. Solicitação de Material

- Clique em "Criar Solicitação" ou navegue para `/formulario.html`
- Preencha todos os campos obrigatórios
- Validação em tempo real com feedback visual
- Clique em "Enviar Solicitação"
- Seu programa de email abrirá com dados pré-preenchidos
- Clique em "Enviar" no seu cliente de email

### 3. Alternar Tema

- Clique no ícone de lua/sol no header
- Preferência salva automaticamente

## 📧 Exemplo de Email Gerado

```
Para: marketing1@empresa.com, marketing2@empresa.com, marketing3@empresa.com, marketing4@empresa.com, marketing5@empresa.com
Assunto: Nova Solicitação de Material - Banner - Prioridade Urgente

Solicitação de Material - Sementeira Real

DADOS DO SOLICITANTE:
Nome: João Silva
Email: joao.silva@empresa.com
Departamento: Vendas
Centro de Custo: CC-001

DETALHES DA SOLICITAÇÃO:
Tipo de Material: Banner
Prioridade: Urgente (1 dia útil)
Título: Banner Promoção Black Friday

Descrição Detalhada:
Banner para promoção Black Friday, público jovem adulto,
foco em descontos de até 70%

Especificações Técnicas:
1920x1080px, formato JPG e PNG, cores da marca

Links de Referência:
https://exemplo.com/referencia1

Observações:
Prazo apertado, cliente VIP

---
Enviado via Sementeira Real
Data: 18/07/2025 14:30:25
```

## 🔧 Configuração

### Para Desenvolvimento Local

1. Clone o repositório
2. Abra `index.html` em um servidor local
3. Para desenvolvimento, use um servidor HTTP (Live Server, Python, etc.)

### Para Produção (GitHub Pages)

1. Faça push para o repositório
2. Ative GitHub Pages nas configurações
3. Acesse via `https://username.github.io/sementeira-real`

### Personalização

- **Emails**: Edite o array `destinatarios` em `js/main.js`
- **Cores**: Modifique as variáveis CSS em `css/themes.css`
- **MIVs/Templates**: Substitua os arquivos em `/assets/`

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## ♿ Acessibilidade

- **WCAG 2.1 AA** compliance
- Navegação por teclado
- Screen readers support
- Alto contraste
- Redução de movimento
- Labels e ARIA attributes

## 🔒 Segurança

- **Zero Backend**: Não há servidor ou banco de dados
- **Dados Locais**: Informações não são armazenadas
- **Email Nativo**: Usa cliente de email do usuário
- **HTTPS**: Recomendado para produção

## 🚀 Performance

- **Carregamento Rápido**: CSS/JS minificados
- **Lazy Loading**: Imagens otimizadas
- **Cache**: Service Worker (opcional)
- **SEO**: Meta tags otimizadas

## 📈 Analytics (Opcional)

Para adicionar Google Analytics:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma issue no GitHub
- Entre em contato com a equipe de marketing

---

**Desenvolvido com ❤️ para facilitar o trabalho da equipe de marketing**
