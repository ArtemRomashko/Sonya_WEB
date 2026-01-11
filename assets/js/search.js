// CONFIG: список всіх гайдів
// Додай сюди всі сторінки, які повинні потрапити в пошук

const guidesIndex = [
    {
        title: "Зйом квартири",
        url: "/pages/guide/housing-rent.html",
        keywords: "оренда зйом житло договір перевірка"
    },
    {
        title: "Комунальні послуги",
        url: "/pages/guide/utilities.html",
        keywords: "лічильники вода світло тариф платіжка"
    },
    {
        title: "Сімейний лікар",
        url: "/pages/guide/family-doctor.html",
        keywords: "декларація лікар медпослуги нсзУ"
    },
    {
        title: "Невідкладні стани",
        url: "/pages/guide/emergency.html",
        keywords: "опіки кровотеча алергія непритомність"
    }
];

// LOGIC: пошук
function searchGuides(query) {
    query = query.toLowerCase().trim();
    const results = guidesIndex.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query)
    );
    return results;
}

// RENDER: показ результатів на сторінці search.html
function renderSearchResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    const container = document.getElementById("search-results");
    const input = document.getElementById("search-input");

    if (!query) {
        container.innerHTML = "<p>Введіть запит для пошуку.</p>";
        return;
    }

    input.value = query;

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
