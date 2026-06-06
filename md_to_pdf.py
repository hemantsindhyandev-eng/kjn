#!/usr/bin/env python3
"""
Convert Markdown to PDF using markdown2pdf or pypandoc
Fallback method if pandoc is not available
"""

try:
    from markdown2pdf.converter import Converter
    print("Using markdown2pdf library...")
    Converter().convert("Pandas_Series_Notes_Formatted.md", "Pandas_Series_Notes_Formatted.pdf")
    print("✓ PDF created successfully: Pandas_Series_Notes_Formatted.pdf")
except ImportError:
    try:
        import pypandoc
        print("Using pypandoc...")
        pypandoc.convert_file("Pandas_Series_Notes_Formatted.md", "pdf", 
                             outputfile="Pandas_Series_Notes_Formatted.pdf",
                             extra_args=['--toc', '--toc-depth=2', '--number-sections'])
        print("✓ PDF created successfully: Pandas_Series_Notes_Formatted.pdf")
    except ImportError:
        print("Error: Neither markdown2pdf nor pypandoc is installed")
        print("Install with: pip install markdown2pdf pypandoc")
