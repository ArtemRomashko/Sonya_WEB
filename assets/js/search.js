// ===============================
// INDEX of guides
// ===============================

const guidesIndex = [
    {
        title: "Зйом квартири",
        url: "guide/housing-rent.html",
        keywords: "оренда зйом житло договір перевірка квартира"
    },
    {
        title: "Комунальні послуги",
        url: "guide/utilities.html",
        keywords: "лічильники вода світло тариф платіжка комуналка"
    },
    {
        title: "Сімейний лікар",
        url: "guide/family-doctor.html",
        keywords: "декларація лікар медпослуги нсзу запис консультація"
    },
    {
        title: "Невідкладні стани",
        url: "guide/emergency.html",
        keywords: "опіки кровотеча алергія непритомність електрика шок"
    }
];

// ===============================
// LOGIC
// ===============================

function searchGuides(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 1) return [];

    return guidesIndex.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
}

// ===============================
// LIVE SEARCH
// ===============================

function initLiveSearch() {
    const input = document.getElementById("search-input");
    const container = document.getElementById("search-results");

    if (!input || !container) return;

    input.addEventListener("input", () => {
        const query = input.value.trim();

        if (query === "") {
            container.innerHTML = "<p>Введіть слово для пошуку.</p>";
            return;
        }

        const results = searchGuides(query);

        if (results.length === 0) {
            container.innerHTML = `<p>Нічого не знайдено за: <strong>${query}</strong></p>`;
            return;
        }

        container.innerHTML = results
            .map(item => `
                <a class="search-item" href="${item.url}">
                    <h3>${item.title}</h3>
                    <p>${item.keywords}</p>
                </a>
            `)
            .join("");
    });
}
