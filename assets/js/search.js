// ===============================
// INDEX — Категорії та Гайди
// ===============================

const searchIndex = [

    // ---------- КАТЕГОРІЇ ----------
    {
        type: "category",
        title: "Житло",
        url: "housing.html",
        folder: "category",
        keywords: "оренда переїзд комуналка житло квартира договір застави"
    },
    {
        type: "category",
        title: "Документи",
        url: "documents.html",
        folder: "category",
        keywords: "паспорт ipn діа довіреності документи id"
    },
    {
        type: "category",
        title: "Медицина",
        url: "medicine.html",
        folder: "category",
        keywords: "сімейний лікар медкнижка 103 медична допомога"
    },
    {
        type: "category",
        title: "Фінанси",
        url: "finance.html",
        folder: "category",
        keywords: "картки бюджет податки накопичення гроші банк"
    },
    {
        type: "category",
        title: "Робота",
        url: "work.html",
        folder: "category",
        keywords: "резюме співбесіди червоні прапорці працевлаштування"
    },
    {
        type: "category",
        title: "Транспорт",
        url: "transport.html",
        folder: "category",
        keywords: "права авто страховка транспорт посвідчення"
    },
    {
        type: "category",
        title: "Побут",
        url: "home.html",
        folder: "category",
        keywords: "прання прибирання базова кухня побут порядок"
    },
    {
        type: "category",
        title: "Психологія",
        url: "psychology.html",
        folder: "category",
        keywords: "межі тривожність вигорання емоції психологія"
    },
    {
        type: "category",
        title: "Кухня",
        url: "kitchen.html",
        folder: "category",
        keywords: "сніданки обіди рецепти прості страви кухня"
    },
    {
        type: "category",
        title: "Безпека",
        url: "safety.html",
        folder: "category",
        keywords: "тривога пожежі екстрені дії безпека"
    },
    {
        type: "category",
        title: "Подорожі",
        url: "travel.html",
        folder: "category",
        keywords: "аеропорт квитки документи подорожі"
    },

    // ---------- ГАЙДИ ----------
    {
        type: "guide",
        title: "Зйом квартири",
        url: "housing-rent.html",
        folder: "guide",
        keywords: "житло перевірки договори застава оренда зйом квартира"
    },
    {
        type: "guide",
        title: "Комунальні платежі",
        url: "utilities.html",
        folder: "guide",
        keywords: "лічильники рахунки хто платить комуналка електрика газ вода"
    },
    {
        type: "guide",
        title: "Сімейний лікар",
        url: "family-doctor.html",
        folder: "guide",
        keywords: "декларація лікар запис аналізи нсзу медична допомога"
    },
    {
        type: "guide",
        title: "Екстрена допомога 103",
        url: "emergency.html",
        folder: "guide",
        keywords: "103 коли дзвонити невідкладна кровотеча опіки шок"
    },
    {
        type: "guide",
        title: "Основні документи",
        url: "basic-documents.html",
        folder: "guide",
        keywords: "паспорт id ipn список документи отримати"
    },
    {
        type: "guide",
        title: "Дія: як користуватись",
        url: "dia.html",
        folder: "guide",
        keywords: "дія цифрові документи налаштування підтвердження підпис"
    },
    {
        type: "guide",
        title: "Бюджет без болю",
        url: "budget.html",
        folder: "guide",
        keywords: "бюджет фінанси витрати накопичення планування"
    },
    {
        type: "guide",
        title: "Співбесіда: як підготуватись",
        url: "interview.html",
        folder: "guide",
        keywords: "робота співбесіда питання відповіді червоні прапорці"
    },
    {
        type: "guide",
        title: "Водійське посвідчення",
        url: "driving-license.html",
        folder: "guide",
        keywords: "права авто посвідчення отримати відновити"
    },
    {
        type: "guide",
        title: "Прибирання без хаосу",
        url: "cleaning.html",
        folder: "guide",
        keywords: "прибирання план порядок хаос побут чистота"
    },
    {
        type: "guide",
        title: "Вигорання",
        url: "burnout.html",
        folder: "guide",
        keywords: "вигорання ознаки причини тривожність психологія"
    },
    {
        type: "guide",
        title: "Швидкі сніданки",
        url: "quick-breakfasts.html",
        folder: "guide",
        keywords: "сніданки рецепти кухня швидко просто"
    },
    {
        type: "guide",
        title: "Повітряна тривога",
        url: "air-alert.html",
        folder: "guide",
        keywords: "тривога укриття безпека сигнал дії"
    },
    {
        type: "guide",
        title: "Аеропорт: вперше",
        url: "airport.html",
        folder: "guide",
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
                <a class="search-item" href="/pages/${item.folder}/${item.url}">
                    <div class="search-type">${item.type === "guide" ? "Гайд" : "Категорія"}</div>
                    <h3>${item.title}</h3>
                    <p>${item.keywords}</p>
                </a>
            `)
            .join("");
    });
}

document.addEventListener("DOMContentLoaded", initLiveSearch);
