#!/bin/bash

# ===========================================
# Script para gerar PDF do Ebook A CLASSE INÚTIL
# ===========================================

set -e  # Para em caso de erro

echo "📚 Gerando PDF do Ebook 'A Classe Inútil'"
echo "==========================================================="
echo ""

# Verifica se pandoc está instalado
if ! command -v pandoc &> /dev/null; then
    echo "❌ Erro: pandoc não está instalado."
    echo ""
    echo "Instale com:"
    echo "  macOS:  brew install pandoc"
    echo "  Ubuntu: sudo apt install pandoc"
    exit 1
fi

# Verifica se xelatex está instalado
if ! command -v xelatex &> /dev/null; then
    echo "❌ Erro: xelatex não está instalado."
    echo ""
    echo "Instale com:"
    echo "  macOS:  brew install --cask mactex"
    echo "  Ubuntu: sudo apt install texlive-xetex"
    exit 1
fi

# Lista de capítulos na ordem correta
CAPITULOS=(
    "parte-01-cap-01.md"
    "parte-01-cap-02.md"
    "parte-01-cap-03.md"
    "parte-01-cap-04.md"
    "parte-02-cap-05.md"
    "parte-02-cap-06.md"
    "parte-02-cap-07.md"
    "parte-02-cap-08.md"
    "parte-03-cap-09.md"
    "parte-03-cap-10.md"
    "parte-03-cap-11.md"
    "parte-03-cap-12.md"
    "parte-04-cap-13.md"
    "parte-04-cap-14.md"
    "parte-04-cap-15.md"
    "parte-04-cap-16.md"
    "parte-05-cap-17.md"
    "parte-05-cap-18.md"
    "parte-05-cap-19.md"
    "parte-05-cap-20.md"
    "parte-06-cap-21.md"
    "parte-06-cap-22.md"
    "parte-06-cap-23.md"
    "parte-06-cap-24.md"
    "parte-06-cap-25.md"
    "epilogo.md"
    "apendice-linha-tempo.md"
    "apendice-profissoes.md"
    "apendice-glossario.md"
    "apendice-recursos.md"
)

# Verifica se todos os arquivos existem
echo "🔍 Verificando arquivos..."
if [ ! -f "ebook-inutil.md" ]; then
    echo "❌ Erro: Arquivo não encontrado: ebook-inutil.md"
    exit 1
fi
if [ ! -f "images/capa.png" ]; then
    echo "❌ Erro: Imagem de capa não encontrada: images/capa.png"
    exit 1
fi
for cap in "${CAPITULOS[@]}"; do
    if [ ! -f "$cap" ]; then
        echo "❌ Erro: Arquivo não encontrado: $cap"
        exit 1
    fi
done
echo "✅ Todos os arquivos encontrados"
echo ""

# Concatena os capítulos com quebras de página
echo "📝 Concatenando capítulos com quebras de página..."

# Começa com o arquivo principal (capa + intro)
cat ebook-inutil.md > ebook-completo-temp.md

# Adiciona cada capítulo com quebra de página antes
for cap in "${CAPITULOS[@]}"; do
    echo "" >> ebook-completo-temp.md
    echo "\\newpage" >> ebook-completo-temp.md
    echo "" >> ebook-completo-temp.md
    cat "$cap" >> ebook-completo-temp.md
done

echo "✅ Capítulos concatenados"
echo ""

# Conta palavras
PALAVRAS=$(wc -w < ebook-completo-temp.md)
echo "📊 Total de palavras: $PALAVRAS"
echo ""

# Gera o PDF
echo "🔄 Gerando PDF (isso pode demorar alguns segundos)..."
pandoc ebook-completo-temp.md \
    -o a-classe-inutil.pdf \
    --pdf-engine=xelatex \
    -f markdown+raw_tex \
    2>&1 | grep -v "Missing character" || true

# Remove arquivo temporário
rm ebook-completo-temp.md

# Verifica se PDF foi criado
if [ -f "a-classe-inutil.pdf" ]; then
    TAMANHO=$(ls -lh a-classe-inutil.pdf | awk '{print $5}')
    PAGINAS=$(mdls -name kMDItemNumberOfPages a-classe-inutil.pdf 2>/dev/null | awk '{print $3}' || echo "?")
    echo ""
    echo "==========================================================="
    echo "✅ PDF gerado com sucesso!"
    echo ""
    echo "   Arquivo:  a-classe-inutil.pdf"
    echo "   Tamanho:  $TAMANHO"
    echo "   Palavras: $PALAVRAS"
    echo "   Páginas:  $PAGINAS"
    echo "==========================================================="
else
    echo "❌ Erro: PDF não foi gerado"
    exit 1
fi
