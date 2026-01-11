// ===============================
// INDEX of guides (fixed URLs)
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
// SEARCH LOGIC
// ===============================

function searchGuides(query) {
    const q = query.toLowerCase().trim();
    return guidesIndex.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
}

// ===============================
// RENDER SEARCH RESULTS
// ===============================

function renderSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    const container = document.getElementById("search-results");
    const input = document.getElementById("search-input");

    if (!query || query.trim() === "") {
        container.innerHTML = "<p>Введіть запит для пошуку.</p>";
        return;
    }

    // Заповнюємо поле введення текстом запиту
    if (input) input.value = query;

    const results = searchGuides(query);

    if (results.length === 0) {
        container.innerHTML = `<p>Нічого не знайдено за запитом: <strong>${query}</strong></p>`;
        return;
    }

    // Generate HTML results
    container.innerHTML = results
        .map(item => `
            <a class="search-item" href="${item.url}">
                <h3>${item.title}</h3>
                <p>${item.keywords}</p>
            </a>
        `)
        .join("");
}
