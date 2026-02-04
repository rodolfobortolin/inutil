# Instruções para Claude Code

Este arquivo contém diretrizes para manutenção e desenvolvimento do projeto "A CLASSE INÚTIL".

---

## Visão Geral do Projeto

**Título:** A CLASSE INÚTIL — Como a Inteligência Artificial Vai Tornar Bilhões de Pessoas Dispensáveis

**Objetivo:** Criar um livro de não-ficção impactante sobre o futuro do trabalho na era da IA, com landing pages para venda e ferramentas de marketing para Instagram.

---

## Estrutura de Pastas

```
inutil/
├── livro/                    # 📚 Conteúdo do livro
│   ├── parte-XX-cap-YY.md    # Capítulos
│   ├── apendice-*.md         # Apêndices
│   ├── epilogo.md            # Epílogo
│   ├── ebook-inutil.md       # Capa, prefácio e metadata
│   ├── referencia-gramatical.md
│   └── a-classe-inutil.pdf   # PDF gerado
│
├── instagram/                # 📱 Ferramentas de marketing
│   ├── instagram-posts-manager.html  # Gerador de posts
│   ├── reels-generator.html          # Gerador de reels
│   └── prompts-musica-suno.md        # Prompts para músicas
│
├── scripts/                  # ⚙️ Scripts de automação
│   └── gerar-pdf.sh          # Gerador de PDF
│
├── images/                   # 🖼️ Imagens do site
│   ├── autor.jpg
│   └── capa*.png
│
├── v1.html, v2.html, v3.html # 🌐 Landing pages
├── carrossel.html            # Página de carrossel
├── 404.html                  # Página de erro
├── index.html                # Redirecionamento
└── vercel.json               # Configuração Vercel
```

---

## Site (Vercel)

**URL:** https://a-classe-inutil.vercel.app

O `.vercelignore` garante que apenas o site seja publicado:
- Landing pages (v1.html, v2.html, v3.html)
- Imagens (images/)
- Página 404

**Arquivos privados (não publicados):**
- livro/ (conteúdo do livro)
- instagram/ (ferramentas internas)
- scripts/

---

## Tom e Estilo do Livro

### Características Obrigatórias
- Linguagem acessível mas impactante
- Dados concretos com fontes verificáveis
- Citações de especialistas (Harari, Musk, Altman, Gates, etc.)
- Analogias com situações cotidianas
- Urgência sem sensacionalismo vazio
- Seções práticas em cada capítulo
- Perguntas retóricas para engajamento

### Público-Alvo
- Profissionais preocupados com o futuro do trabalho
- Pais pensando na educação dos filhos
- Pessoas interessadas em tecnologia
- Leitores de não-ficção e atualidades

### Evitar
- Jargão técnico excessivo
- Otimismo ingênuo ou pessimismo paralisante
- Afirmações sem dados ou fontes
- Linguagem acadêmica desnecessária

---

## Template de Capítulo

```markdown
# Capítulo X — Título do Capítulo

---

## [Citação de Abertura]

> "Citação impactante de alguém relevante"
> — Nome, Cargo/Obra

---

## Introdução

[2-3 parágrafos que capturam a atenção e estabelecem o tema]

---

## Seção Principal 1

[Conteúdo com dados, exemplos e análise]

### Subseção

[Detalhamento]

**Exemplo Real:**
[Caso concreto com dados verificáveis]

---

## O Que Isso Significa Para Você

[Seção prática conectando o conteúdo à vida do leitor]

---

## Resumo do Capítulo

- **Ponto 1:** Resumo em uma frase
- **Ponto 2:** Resumo em uma frase
- **Ponto 3:** Resumo em uma frase

---

## Referências

- [Fonte 1](url)
- [Fonte 2](url)

---

*Próximo capítulo: Título do Próximo*
```

---

## Comandos Úteis

### Gerar PDF
```bash
./scripts/gerar-pdf.sh
```

### Contar palavras de um capítulo
```bash
wc -w livro/parte-01-cap-01.md
```

### Contar palavras totais
```bash
cat livro/*.md | wc -w
```

### Deploy para Vercel
```bash
vercel --prod --yes
```

### Servir ferramentas Instagram localmente
```bash
python3 -m http.server 8888
# Acesse: http://localhost:8888/instagram/
```

---

## Fontes e Pesquisa

### Fontes Prioritárias
- Estudos do McKinsey Global Institute sobre automação
- Relatórios do World Economic Forum (Future of Jobs)
- Pesquisas de Oxford Martin School (Frey & Osborne)
- Livros de Yuval Noah Harari (especialmente "21 Lições")
- Declarações públicas de líderes de IA (Altman, Musk, Hinton)
- Dados do Bureau of Labor Statistics (EUA)
- Relatórios da OCDE sobre emprego

### Dados a Incluir
- Estatísticas de automação por setor
- Projeções de desemprego tecnológico
- Comparações históricas com revoluções anteriores
- Casos reais de empresas que automatizaram
- Investimentos em IA e robótica

---

## Verificação de Qualidade

Antes de finalizar um capítulo, verificar:

- [ ] Todas as citações têm fonte
- [ ] Dados estatísticos têm referência
- [ ] Linguagem está acessível
- [ ] Existe conexão prática com o leitor
- [ ] O capítulo segue o template
- [ ] Links nas referências funcionam
- [ ] Não há erros de português

---

## Geração do PDF

O script `scripts/gerar-pdf.sh`:
1. Verifica dependências (pandoc, xelatex)
2. Concatena todos os arquivos na ordem correta
3. Gera o PDF em `livro/a-classe-inutil.pdf`
4. Mostra estatísticas (palavras, tamanho)

### Requisitos
- pandoc (>= 2.0)
- xelatex (via MacTeX ou TeX Live)

---

## Manutenção

### Adicionar Novo Capítulo
1. Criar arquivo em `livro/` seguindo a convenção de nome
2. Adicionar ao array `CAPITULOS` em `scripts/gerar-pdf.sh`
3. Atualizar índice em `livro/ebook-inutil.md`

### Atualizar Dados
- Verificar anualmente se estatísticas ainda são relevantes
- Atualizar referências com dados mais recentes
- Adicionar novos desenvolvimentos em IA ao conteúdo

### Atualizar Site
- Editar arquivos v1.html, v2.html, v3.html na raiz
- Fazer deploy: `vercel --prod --yes`
