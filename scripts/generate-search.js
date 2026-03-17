/**
 * generate-search.js
 * Автоматически генерирует searchIndex в search.js на основе HTML файлов.
 *
 * Как использовать:
 *   node scripts/generate-search.js
 *
 * При добавлении нового гайда:
 *   1. Создай HTML файл в pages/guide/ или pages/category/
 *   2. Добавь ключевые слова в scripts/search-keywords.json
 *   3. Запусти этот скрипт
 */

const fs   = require('fs');
const path = require('path');

const ROOT         = path.join(__dirname, '..');
const KEYWORDS_FILE = path.join(__dirname, 'search-keywords.json');
const SEARCH_JS     = path.join(ROOT, 'assets', 'js', 'search.js');
const PAGES_DIR     = path.join(ROOT, 'pages');

const keywords = JSON.parse(fs.readFileSync(KEYWORDS_FILE, 'utf8'));

// Извлекаем заголовок из <title>Заголовок — SelfMade</title>
function extractTitle(html) {
    const m = html.match(/<title>([^<]+)<\/title>/i);
    if (!m) return null;
    return m[1].replace(/\s*[—–-]\s*SelfMade\s*/i, '').trim();
}

// Сканируем папки guide и category
function scanFolder(folderName) {
    const dir = path.join(PAGES_DIR, folderName);
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.html'))
        .map(file => {
            const fullPath = path.join(dir, file);
            const html     = fs.readFileSync(fullPath, 'utf8');
            const title    = extractTitle(html);
            const key      = `${folderName}/${file}`;
            const kw       = keywords[key];

            if (!title) {
                console.warn(`  ⚠ No title found: ${key}`);
                return null;
            }
            if (!kw) {
                console.warn(`  ⚠ No keywords for: ${key} — add to search-keywords.json`);
            }

            return {
                type:     folderName === 'guide' ? 'guide' : 'category',
                folder:   folderName,
                title,
                url:      file,
                keywords: kw || ''
            };
        })
        .filter(Boolean);
}

// Собираем индекс: сначала категории, потом гайды
const categories = scanFolder('category');
const guides     = scanFolder('guide');
const index      = [...categories, ...guides];

// Сериализуем в JS-массив
const items = index.map(item => {
    return `    {
        type:     "${item.type}",
        folder:   "${item.folder}",
        title:    "${item.title.replace(/"/g, '\\"')}",
        url:      "${item.url}",
        keywords: "${item.keywords}"
    }`;
}).join(',\n');

const newIndex = `// SelfMade search
// ⚠ Этот файл генерируется автоматически. Не редактируй вручную.
// Чтобы обновить: node scripts/generate-search.js

const searchIndex = [
${items}
];

// ===============================
// LIVE SEARCH
// ===============================

function initLiveSearch() {
    const input     = document.getElementById("search-input");
    const container = document.getElementById("search-results");

    if (!input || !container) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        container.innerHTML = "";

        if (query.length < 1) {
            container.innerHTML = "<p>Почніть вводити запит...</p>";
            return;
        }

        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.keywords.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            container.innerHTML = \`<p>Нічого не знайдено за: <strong>\${query}</strong></p>\`;
            return;
        }

        container.innerHTML = results
            .map(item => \`
                <a class="search-card" href="\${item.folder}/\${item.url}">
                    <div class="search-card-type">
                        \${item.type === "guide" ? "Гайд" : "Категорія"}
                    </div>
                    <div class="search-card-title">
                        \${item.title}
                    </div>
                    <div class="search-card-keywords">
                        \${item.keywords}
                    </div>
                </a>
            \`)
            .join("");
    });
}

document.addEventListener("DOMContentLoaded", initLiveSearch);
`;

fs.writeFileSync(SEARCH_JS, newIndex, 'utf8');
console.log(`\n✓ search.js updated: ${index.length} items (${categories.length} categories + ${guides.length} guides)\n`);
