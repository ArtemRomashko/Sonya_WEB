// ===============================
// INDEX — Категорії та Гайди
// ===============================

const searchIndex = [

    // ---------- КАТЕГОРІЇ ----------
    {
        type: "category",
        title: "Житло",
        url: "/pages/category/housing.html",
        keywords: "оренда переїзд комуналка житло квартира договір застави"
    },
    {
        type: "category",
        title: "Документи",
        url: "/pages/category/documents.html",
        keywords: "паспорт ipn діа довіреності документи id"
    },
    {
        type: "category",
        title: "Медицина",
        url: "/pages/category/medicine.html",
        keywords: "сімейний лікар медкнижка 103 медична допомога"
    },
    {
        type: "category",
        title: "Фінанси",
        url: "/pages/category/finance.html",
        keywords: "картки бюджет податки накопичення гроші банк"
    },
    {
        type: "category",
        title: "Робота",
        url: "/pages/category/work.html",
        keywords: "резюме співбесіди червоні прапорці працевлаштування"
    },
    {
        type: "category",
        title: "Транспорт",
        url: "/pages/category/transport.html",
        keywords: "права авто страховка транспорт посвідчення"
    },
    {
        type: "category",
        title: "Побут",
        url: "/pages/category/home.html",
        keywords: "прання прибирання базова кухня побут порядок"
    },
    {
        type: "category",
        title: "Психологія",
        url: "/pages/category/psychology.html",
        keywords: "межі тривожність вигорання емоції психологія"
    },
    {
        type: "category",
        title: "Кухня",
        url: "/pages/category/kitchen.html",
        keywords: "сніданки обіди рецепти прості страви кухня"
    },
    {
        type: "category",
        title: "Безпека",
        url: "/pages/category/safety.html",
        keywords: "тривога пожежі екстрені дії безпека"
    },
    {
        type: "category",
        title: "Подорожі",
        url: "/pages/category/travel.html",
        keywords: "аеропорт квитки документи подорожі"
    },

    // ---------- ГАЙДИ ----------
    {
        type: "guide",
        title: "Зйом квартири",
        url: "/pages/guide/housing-rent.html",
        keywords: "житло перевірки договори застава оренда зйом квартира"
    },
    {
        type: "guide",
        title: "Комунальні платежі",
        url: "/pages/guide/utilities.html",
        keywords: "лічильники рахунки хто платить комуналка електрика газ вода"
    },
    {
        type: "guide",
        title: "Сімейний лікар",
        url: "/pages/guide/family-doctor.html",
        keywords: "декларація лікар запис аналізи нсзу медична допомога"
    },
    {
        type: "guide",
        title: "Екстрена допомога 103",
        url: "/pages/guide/emergency.html",
        keywords: "коли дзвонити що сказати невідкладна допомога кровотеча опіки"
    },
    {
        type: "guide",
        title: "Основні документи",
        url: "/pages/guide/basic-documents.html",
        keywords: "паспорт id ipn список документи отримати"
    },
    {
        type: "guide",
        title: "Дія: як користуватись",
        url: "/pages/guide/dia.html",
        keywords: "дія цифрові документи налаштування підпис qr"
    },
    {
        type: "guide",
        title: "Бюджет без болю",
        url: "/pages/guide/budget.html",
        keywords: "бюджет витрати накопичення фінанси планування"
    },
    {
        type: "guide",
        title: "Співбесіда: як підготуватись",
        url: "/pages/guide/interview.html",
        keywords: "робота співбесіда питання відповіді червоні прапорці"
    },
    {
        type: "guide",
        title: "Водійське посвідчення",
        url: "/pages/guide/driving-license.html",
        keywords: "права авто отримати відновити документи"
    },
    {
        type: "guide",
        title: "Прибирання без хаосу",
        url: "/pages/guide/cleaning.html",
        keywords: "прибирання план порядок побут хаос"
    },
    {
        type: "guide",
        title: "Вигорання",
        url: "/pages/guide/burnout.html",
        keywords: "вигорання ознаки причини психологія емоції"
    },
    {
        type: "guide",
        title: "Швидкі сніданки",
        url: "/pages/guide/quick-breakfasts.html",
        keywords: "сніданки рецепти кухня швидко просто"
    },
    {
        type: "guide",
        title: "Повітряна тривога",
        url: "/pages/guide/air-alert.html",
        keywords: "тривога укриття що робити безпека"
    },
    {
        type: "guide",
        title: "Аеропорт: вперше",
        url: "/pages/guide/airport.html",
        keywords: "аеропорт багаж контроль посадка реєстрація"
    }
];

// ===============================
// LIVE SEARCH
// ===============================

function initLiveSearch() {
    const input = document.getElementById("search-input");
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
            container.innerHTML = `<p>Нічого не знайдено за: <strong>${query}</strong></p>`;
            return;
        }

        container.innerHTML = results
            .map(item => `
                <a class="search-item" href="${item.url}">
                    <div class="search-type">${item.type === "guide" ? "Гайд" : "Категорія"}</div>
                    <h3>${item.title}</h3>
                    <p>${item.keywords}</p>
                </a>
            `)
            .join("");
    });
}

document.addEventListener("DOMContentLoaded", initLiveSearch);
