/**
 * migrate-components.js
 * Заменяет хедер и футер во всех HTML файлах на компонентные плейсхолдеры.
 * Запускать: node scripts/migrate-components.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Определяем глубину файла и data-base
function getBase(filePath) {
    const rel = path.relative(ROOT, filePath);
    const depth = rel.split(path.sep).length - 1; // количество папок
    return '../'.repeat(depth);
}

// Ищем все HTML файлы рекурсивно
function findHtmlFiles(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== '.git' && entry.name !== 'scripts' && entry.name !== 'node_modules') {
            findHtmlFiles(full, files);
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            files.push(full);
        }
    }
    return files;
}

function migrateFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const base = getBase(filePath);
    let changed = false;

    // 1. Добавляем data-base к <html> если нет
    if (!html.includes('data-base=')) {
        html = html.replace(/<html([^>]*)>/, `<html$1 data-base="${base}">`);
        changed = true;
    }

    // 2. Заменяем хедер (любой вариант комментария + <header ...>...</header>)
    const headerRegex = /(\s*<!--[^>]*HEADER[^>]*-->\s*)?\s*<header\s+class="header">[\s\S]*?<\/header>/i;
    if (headerRegex.test(html)) {
        html = html.replace(headerRegex, '\n\n    <div id="site-header"></div>');
        changed = true;
    }

    // 3. Заменяем футер (любой вариант комментария + <footer ...>...</footer>)
    const footerRegex = /(\s*<!--[^>]*FOOTER[^>]*-->\s*)?\s*<footer\s+class="footer">[\s\S]*?<\/footer>/i;
    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, '\n\n    <div id="site-footer"></div>');
        changed = true;
    }

    // 4. Убираем inline скрипт с годом
    const yearScriptRegex = /\s*<script>\s*document\.getElementById\(["']y["']\)\.textContent\s*=\s*new Date\(\)\.getFullYear\(\);\s*<\/script>/g;
    if (yearScriptRegex.test(html)) {
        html = html.replace(yearScriptRegex, '');
        changed = true;
    }

    // 5. Добавляем <script src="...components.js"> перед </body> если нет
    const componentsScript = `<script src="${base}assets/js/components.js"></script>`;
    if (!html.includes('components.js')) {
        html = html.replace('</body>', `    ${componentsScript}\n</body>`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✓  ${path.relative(ROOT, filePath)}`);
    } else {
        console.log(`—  ${path.relative(ROOT, filePath)} (no changes)`);
    }
}

const files = findHtmlFiles(ROOT);
console.log(`\nFound ${files.length} HTML files. Migrating...\n`);
files.forEach(migrateFile);
console.log('\nDone!');
