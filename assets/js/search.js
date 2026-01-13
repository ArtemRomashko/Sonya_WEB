// SelfMade search
console.log("[SelfMade] search.js loaded");

// ===============================
// INDEX — Категорії та Гайди
// ===============================

const searchIndex = [

    // ---------- КАТЕГОРІЇ ----------
    {
        type: "category",
        folder: "category",
        title: "Житло",
        url: "housing.html",
        keywords: "оренда переїзд комуналка житло квартира договір застава"
    },
    {
        type: "category",
        folder: "category",
        title: "Документи",
        url: "documents.html",
        keywords: "паспорт ipn дія довіреності документи id"
    },
    {
        type: "category",
        folder: "category",
        title: "Медицина",
        url: "medicine.html",
        keywords: "сімейний лікар медкнижка 103 медична допомога"
    },
    {
        type: "category",
        folder: "category",
        title: "Фінанси",
        url: "finance.html",
        keywords: "картки бюджет податки накопичення гроші банк"
    },
    {
        type: "category",
        folder: "category",
        title: "Робота",
        url: "work.html",
        keywords: "резюме співбесіди червоні прапорці працевлаштування"
    },
    {
        type: "category",
        folder: "category",
        title: "Транспорт",
        url: "transport.html",
        keywords: "права авто страховка транспорт посвідчення"
    },
    {
        type: "category",
        folder: "category",
        title: "Побут",
        url: "home.html",
        keywords: "прання прибирання базова кухня побут порядок"
    },
    {
        type: "category",
        folder: "category",
        title: "Психологія",
        url: "psychology.html",
        keywords: "межі тривожність вигорання емоції психологія"
    },
    {
        type: "category",
        folder: "category",
        title: "Кухня",
        url: "kitchen.html",
        keywords: "сніданки обіди рецепти прості страви кухня"
    },
    {
        type: "category",
        folder: "category",
        title: "Безпека",
        url: "safety.html",
        keywords: "тривога пожежі екстрені дії безпека"
    },
    {
        type: "category",
        folder: "category",
        title: "Подорожі",
        url: "travel.html",
        keywords: "аеропорт квитки документи подорожі"
    },

    // ---------- ГАЙДИ ----------
    {
        type: "guide",
        folder: "guide",
        title: "Зйом квартири",
        url: "housing-rent.html",
        keywords: "житло перевірки договори застава оренда зйом квартира переїзд комуналка"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Комунальні платежі",
        url: "utilities.html",
        keywords: "лічильники рахунки хто платить комуналка електрика газ вода"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Сімейний лікар",
        url: "family-doctor.html",
        keywords: "декларація лікар запис аналізи нсзу медична допомога"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Екстрена допомога 103",
        url: "emergency.html",
        keywords: "103 коли дзвонити невідкладна допомога кровотеча опіки шок"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Основні документи",
        url: "basic-documents.html",
        keywords: "паспорт id ipn список документи отримати"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Дія: як користуватись",
        url: "dia.html",
        keywords: "дія цифрові документи налаштування підтвердження підпис"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Бюджет без болю",
        url: "budget.html",
        keywords: "бюджет фінанси витрати накопичення планування гроші карта"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Співбесіда: як підготуватись",
        url: "interview.html",
        keywords: "робота співбесіда питання відповіді червоні прапорці"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Водійське посвідчення",
        url: "driving-license.html",
        keywords: "права авто посвідчення отримати відновити"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Прибирання без хаосу",
        url: "cleaning.html",
        keywords: "прибирання план порядок хаос побут чистота"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Вигорання",
        url: "burnout.html",
        keywords: "вигорання ознаки причини тривожність психологія"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Швидкі сніданки",
        url: "quick-breakfasts.html",
        keywords: "сніданки рецепти кухня швидко просто"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Повітряна тривога",
        url: "air-alert.html",
        keywords: "тривога укриття безпека сигнал дії"
    },
    {
        type: "guide",
        folder: "guide",
        title: "Аеропорт: вперше",
        url: "airport.html",
        keywords: "аеропорт багаж контроль посадка реєстрація"
    }
];

// ===============================
// LIVE SEARCH
// ===============================

function initLiveSearch() {
    const input = document.getElementById("search-input");
    const container = document.getElementById("search-results");

    if (!input || !container) {
        console.log("[SelfMade] search: input or results container not found");
        return;
    }

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

        console.log("[SelfMade] query:", query, "results:", results.length);

        if (results.length === 0) {
            container.innerHTML = `<p>Нічого не знайдено за: <strong>${query}</strong></p>`;
            return;
        }

        // 🔹 ТУТ МЫ ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ CSS
        container.innerHTML = results
            .map(item => `
                <a class="search-card" href="${item.folder}/${item.url}">
                    <div class="search-card-type">
                        ${item.type === "guide" ? "Гайд" : "Категорія"}
                    </div>
                    <div class="search-card-title">
                        ${item.title}
                    </div>
                    <div class="search-card-keywords">
                        ${item.keywords}
                    </div>
                </a>
            `)
            .join("");
    });
}

document.addEventListener("DOMContentLoaded", initLiveSearch);
