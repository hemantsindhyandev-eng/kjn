#!/usr/bin/env node

/**
 * Markdown to PDF Converter using Puppeteer
 * Converts Markdown to PDF with professional formatting
 * 
 * Usage: node convert_to_pdf.js
 * 
 * Requirements: npm install puppeteer marked
 */

const fs = require('fs');
const path = require('path');

async function convertMarkdownToPDF() {
  try {
    // Try using puppeteer for professional PDF generation
    const puppeteer = require('puppeteer');
    const marked = require('marked');
    
    console.log('🔄 Reading Markdown file...');
    const mdContent = fs.readFileSync('Pandas_Series_Notes_Formatted.md', 'utf-8');
    
    console.log('📝 Converting Markdown to HTML...');
    const htmlContent = marked.parse(mdContent);
    
    // Wrap in HTML template with styling
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pandas Series – Complete Study Notes</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #fff;
          padding: 40px;
          font-size: 11pt;
        }
        h1 {
          font-size: 28pt;
          color: #1f77b4;
          margin-bottom: 10px;
          page-break-after: avoid;
        }
        h2 {
          font-size: 18pt;
          color: #1f77b4;
          margin-top: 30px;
          margin-bottom: 15px;
          page-break-after: avoid;
        }
        h3 {
          font-size: 14pt;
          color: #2ca02c;
          margin-top: 20px;
          margin-bottom: 10px;
          page-break-after: avoid;
        }
        p {
          margin-bottom: 12px;
          text-align: justify;
        }
        code {
          background-color: #f5f5f5;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 10pt;
        }
        pre {
          background-color: #f8f8f8;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 12px;
          margin: 15px 0;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 9pt;
          line-height: 1.4;
          page-break-inside: avoid;
        }
        pre code {
          background-color: transparent;
          padding: 0;
          color: #333;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 15px 0;
          page-break-inside: avoid;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #1f77b4;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        blockquote {
          border-left: 4px solid #1f77b4;
          margin: 15px 0;
          padding: 0 15px;
          color: #555;
          page-break-inside: avoid;
        }
        a {
          color: #1f77b4;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        strong {
          color: #d62728;
          font-weight: bold;
        }
        em {
          color: #2ca02c;
          font-style: italic;
        }
        hr {
          border: none;
          border-top: 2px solid #ddd;
          margin: 30px 0;
          page-break-after: avoid;
        }
        .page-break {
          page-break-after: always;
        }
        ul, ol {
          margin-left: 30px;
          margin-bottom: 12px;
        }
        li {
          margin-bottom: 6px;
        }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
    `;
    
    console.log('🌐 Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    console.log('📄 Rendering HTML to PDF...');
    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: 'Pandas_Series_Notes_Formatted.pdf',
      format: 'A4',
      margin: {
        top: '40px',
        right: '40px',
        bottom: '40px',
        left: '40px'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="text-align: center; font-size: 10px; width: 100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    });
    
    await browser.close();
    
    const stats = fs.statSync('Pandas_Series_Notes_Formatted.pdf');
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log('✅ PDF created successfully!');
    console.log(`📊 File: Pandas_Series_Notes_Formatted.pdf`);
    console.log(`📏 Size: ${sizeMB} MB`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Try installing dependencies:');
    console.log('   npm install puppeteer marked');
    process.exit(1);
  }
}

convertMarkdownToPDF();
