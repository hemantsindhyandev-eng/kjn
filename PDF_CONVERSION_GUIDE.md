# Pandas Series Notes - PDF Conversion Guide

## Quick Start

The Markdown file `Pandas_Series_Notes_Formatted.md` can be converted to PDF using the provided script.

### Method 1: Using the Python Script (Recommended)

```bash
# Install dependencies
pip install markdown2pdf pypandoc

# Run the conversion script
python md_to_pdf.py
```

This will create `Pandas_Series_Notes_Formatted.pdf` in the same directory.

### Method 2: Using Pandoc Directly

If you have pandoc installed:

```bash
pandoc Pandas_Series_Notes_Formatted.md -o Pandas_Series_Notes_Formatted.pdf \
  --from markdown \
  --to pdf \
  --toc \
  --toc-depth=2 \
  --number-sections \
  -V colorlinks=true \
  -V linkcolor=blue \
  -V geometry:margin=1in \
  -V fontsize=11pt
```

### Method 3: Using Online Converters

No installation needed:
- [Markdowntopdf.com](https://markdowntopdf.com)
- [MD2PDF](https://md2pdf.netlify.app)
- [Vertopal](https://www.vertopal.com/en/convert/markdown-to-pdf)

Upload `Pandas_Series_Notes_Formatted.md` and download the PDF.

## File Contents

The document includes:

1. **Pandas Series – Complete Study Notes (Beginner to Intermediate)**
   - 1.1 Introduction to Pandas Series
   - 1.2 Series Creation
   - 1.3 Series Indexing & Selection
   - 1.4 Series Operations
   - Interview & Exam Tips

2. **Pandas Data Loading – Complete Notes**
   - CSV, Excel, JSON loading methods
   - File path handling
   - Performance optimization strategies

3. **Missing Data in Pandas – Deep-Dive Strategy Guide**
   - Types of missing data (MCAR, MAR, MNAR)
   - Filling strategies (mean, median, mode)
   - Time-series strategies (forward fill, backward fill)
   - Dropping missing values safely

## Requirements

Choose one of these approaches:

### For markdown2pdf:
```bash
pip install markdown2pdf
```

### For pypandoc (requires pandoc system package):
```bash
pip install pypandoc
# Ubuntu/Debian
sudo apt-get install pandoc wkhtmltopdf

# macOS
brew install pandoc wkhtmltopdf

# Windows (with Chocolatey)
choco install pandoc wkhtmltopdf
```

### For online conversion:
No installation needed – just upload to a web converter.

## Troubleshooting

### Error: "pandoc is not installed"
Install pandoc:
- Ubuntu: `sudo apt-get install pandoc`
- macOS: `brew install pandoc`
- Windows: Download from [pandoc.org](https://pandoc.org/installing.html)

### Error: "No module named 'markdown2pdf'"
Install it:
```bash
pip install markdown2pdf
```

### PDF won't generate
Try the online converter method instead – it's faster and requires no setup.

## Document Statistics

- **Total Sections**: 6 major sections
- **Estimated Pages**: 50-60 pages (depending on PDF settings)
- **Code Examples**: 50+
- **Tables**: 20+
- **Topics Covered**: Series creation, indexing, operations, data loading, missing data strategies
