# Instruções para Claude Code

Este arquivo contém diretrizes para manutenção e desenvolvimento do livro "A CLASSE INÚTIL".

---

## Visão Geral do Projeto

**Título:** A CLASSE INÚTIL — Como a Inteligência Artificial Vai Tornar Bilhões de Pessoas Dispensáveis

**Objetivo:** Criar um livro de não-ficção impactante sobre o futuro do trabalho na era da IA.

---

## Estrutura de Arquivos

### Convenção de Nomenclatura
- `parte-XX-cap-YY.md` — Capítulos (XX = número da parte, YY = número do capítulo)
- `apendice-*.md` — Apêndices
- `epilogo.md` — Epílogo
- `ebook-inutil.md` — Arquivo principal com capa, prefácio e metadata

### Ordem dos Arquivos para PDF
A ordem está definida no script `gerar-pdf.sh`. Qualquer novo arquivo deve ser adicionado ao array `CAPITULOS`.

---

## Tom e Estilo

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

## Seção Principal 2

[Continua o padrão]

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
./gerar-pdf.sh
```

### Contar palavras de um capítulo
```bash
wc -w parte-01-cap-01.md
```

### Contar palavras totais
```bash
cat *.md | wc -w
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

O script `gerar-pdf.sh`:
1. Verifica dependências (pandoc, xelatex)
2. Concatena todos os arquivos na ordem correta
3. Gera o PDF com índice automático
4. Mostra estatísticas (palavras, tamanho)

### Requisitos
- pandoc (>= 2.0)
- xelatex (via MacTeX ou TeX Live)

---

## Manutenção

### Adicionar Novo Capítulo
1. Criar arquivo seguindo a convenção de nome
2. Adicionar ao array `CAPITULOS` em `gerar-pdf.sh`
3. Atualizar índice em `ebook-inutil.md`
4. Atualizar README.md se necessário

### Atualizar Dados
- Verificar anualmente se estatísticas ainda são relevantes
- Atualizar referências com dados mais recentes
- Adicionar novos desenvolvimentos em IA ao conteúdo
