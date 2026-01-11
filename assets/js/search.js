// CONFIG: список всіх гайдів
const guidesIndex = [
    {
        title: "Зйом квартири",
        url: "guide/housing-rent.html",
        keywords: "оренда зйом житло договір перевірка"
    },
    {
        title: "Комунальні послуги",
        url: "guide/utilities.html",
        keywords: "лічильники вода світло тариф платіжка"
    },
    {
        title: "Сімейний лікар",
        url: "guide/family-doctor.html",
        keywords: "декларація лікар медпослуги нсзу"
    },
    {
        title: "Невідкладні стани",
        url: "guide/emergency.html",
        keywords: "опіки кровотеча алергія непритомність"
    }
];

// LOGIC: пошук
function searchGuides(query) {
    query = query.toLowerCase().trim();
    return guidesIndex.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query)
    );
}

// RENDER: показ результатів на сторінці search.html
function renderSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    const container = document.getElementById("search-results");
    const input = document.getElementById("search-input");

    if (!query || query.trim() === "") {
        container.innerHTML = "<p>Введіть запит для пошуку.</p>";
        return;
    }

    // Заповнюємо інпут значенням запиту
    if (input) input.value = query;

    const results = searchGuides(query);

    if (results.length === 0) {
        container.innerHTML = `<p>Нічого не знайдено за запитом: <strong>${query}</strong></p>`;
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
}
