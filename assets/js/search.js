// SelfMade search
// ⚠ Этот файл генерируется автоматически. Не редактируй вручную.
// Чтобы обновить: node scripts/generate-search.js

const searchIndex = [
    {
        type:     "category",
        folder:   "category",
        title:    "Документи",
        url:      "documents.html",
        keywords: "паспорт ipn дія довіреності документи id нотаріус"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Побут",
        url:      "everyday.html",
        keywords: "прання прибирання побут порядок організація простір набір для дому"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Фінанси",
        url:      "finance.html",
        keywords: "картки бюджет податки накопичення гроші банк заощадження"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Житло",
        url:      "housing.html",
        keywords: "оренда переїзд комуналка житло квартира договір застава"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Кухня",
        url:      "kitchen.html",
        keywords: "сніданки обіди рецепти прості страви кухня готувати посуд"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Медицина",
        url:      "medicine.html",
        keywords: "сімейний лікар медкнижка 103 медична допомога аналізи довідка"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Психологія",
        url:      "psychology.html",
        keywords: "межі тривожність вигорання емоції психологія планування"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Безпека",
        url:      "safety.html",
        keywords: "тривога пожежа екстрені дії безпека тривожна сумка контакти"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Транспорт",
        url:      "transport.html",
        keywords: "права авто страховка транспорт посвідчення громадський купівля"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Подорожі",
        url:      "travel.html",
        keywords: "аеропорт квитки документи подорожі підготовка виїзд"
    },
    {
        type:     "category",
        folder:   "category",
        title:    "Робота",
        url:      "work.html",
        keywords: "резюме співбесіди червоні прапорці працевлаштування перший тиждень"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Основні документи",
        url:      "documents-basic.html",
        keywords: "паспорт id ipn список документи отримати закордонний"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Дія: як користуватись",
        url:      "documents-diia.html",
        keywords: "дія цифрові документи налаштування підтвердження підпис додаток"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Нотаріальні документи",
        url:      "documents-notarial.html",
        keywords: "нотаріус довіреність заява дублікат засвідчення підпис копія"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Прибирання без хаосу",
        url:      "everyday-cleaning.html",
        keywords: "прибирання план порядок хаос побут чистота тиждень"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Базовий набір для дому",
        url:      "everyday-home-kit.html",
        keywords: "переїзд купити дім посуд прибирання постіль рушники інструменти"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Організація простору",
        url:      "everyday-space.html",
        keywords: "зберігання шафа кухня організація порядок речі мінімалізм"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Прання",
        url:      "everyday-washing.html",
        keywords: "прати сортування режими температура одяг машинка"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Бюджет без болю",
        url:      "finance-budget.html",
        keywords: "бюджет фінанси витрати накопичення планування гроші 50 30 20"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Банківські картки",
        url:      "finance-card.html",
        keywords: "дебетові кредитні ліміти комісії картка банк"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Накопичення",
        url:      "finance-savings.html",
        keywords: "заощадження подушка безпеки депозит цілі накопичення інвестиції"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Податки",
        url:      "finance-taxes.html",
        keywords: "пдфо фоп єдиний податок декларація підприємець фріланс"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Переїзд",
        url:      "housing-moving.html",
        keywords: "переїзд пакування коробки чеклист нове житло заселення"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Зйом квартири",
        url:      "housing-rent.html",
        keywords: "житло перевірки договори застава оренда зйом квартира переїзд"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Комунальні послуги",
        url:      "housing-utilities.html",
        keywords: "лічильники рахунки комуналка електрика газ вода платити"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Базова кухня",
        url:      "kitchen-basics.html",
        keywords: "варити смажити тушкувати запікати спеції техніки готування"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Сніданки вдома",
        url:      "kitchen-breakfasts.html",
        keywords: "сніданок швидко яйця вівсянка бутерброд смузі кухня"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Прості обіди",
        url:      "kitchen-lunches.html",
        keywords: "обід meal prep гречка рис курка страви тиждень готувати"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Кухонний мінімум",
        url:      "kitchen-tools.html",
        keywords: "посуд сковорідка каструля ніж техніка чайник блендер кухня"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Медична книжка",
        url:      "medicine-book.html",
        keywords: "медкнижка медогляд флюорографія де зробити терміни лікарі"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Невідкладні стани",
        url:      "medicine-emergency.html",
        keywords: "103 коли дзвонити невідкладна допомога кровотеча опіки шок екстрена"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Сімейний лікар",
        url:      "medicine-family-doctor.html",
        keywords: "декларація лікар запис аналізи нсзу медична допомога helsi"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Медицина: FAQ для молоді",
        url:      "medicine-faq.html",
        keywords: "аналізи довідка запис лікарняний права пацієнта helsi безкоштовно"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Тривожність",
        url:      "psychology-anxiety.html",
        keywords: "тривога напруга стрес як заспокоїтись технік дихання"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Особисті межі",
        url:      "psychology-boundaries.html",
        keywords: "межі ні відмовити провина маніпуляція стосунки робота"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Професійне вигорання",
        url:      "psychology-burnout.html",
        keywords: "вигорання ознаки причини мотивація психологія робота стрес"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Планування життя",
        url:      "psychology-planning.html",
        keywords: "цілі планування фокус прокрастинація pomodoro тиждень ритм"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Повітряна тривога",
        url:      "safety-air-alert.html",
        keywords: "тривога укриття безпека сигнал дії підвал вулиця вдома"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Тривожна сумка",
        url:      "safety-bag.html",
        keywords: "тривожна сумка евакуація документи вода їжа аптечка 72 години"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Екстрені контакти",
        url:      "safety-contacts.html",
        keywords: "112 101 102 103 104 екстрений виклик поліція швидка пожежна"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Пожежна безпека",
        url:      "safety-fire.html",
        keywords: "пожежа евакуація вогонь 101 дим датчик вогнегасник"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Купівля авто",
        url:      "transport-car-buy.html",
        keywords: "вживане авто перевірка vin договір купівля шахрайство ризики"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Страхування авто",
        url:      "transport-insurance.html",
        keywords: "осцпв зелена карта страховка авто обов'язкове страхування"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Водійське посвідчення",
        url:      "transport-license.html",
        keywords: "права авто посвідчення отримати відновити автошкола іспит"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Громадський транспорт",
        url:      "transport-public.html",
        keywords: "метро автобус маршрут картка абонемент пересадка місто"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Перший раз в аеропорту",
        url:      "travel-airport.html",
        keywords: "аеропорт багаж контроль посадка реєстрація гейт рейс"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Документи для подорожей",
        url:      "travel-documents.html",
        keywords: "паспорт віза шенген страховка закордонний подорож"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Підготовка до поїздки",
        url:      "travel-preparation.html",
        keywords: "чеклист пакування валіза виїзд підготовка поїздка за кордон"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Квитки: як обрати і не переплатити",
        url:      "travel-tickets.html",
        keywords: "авіаквитки дешево skyscanner google flights лоукост ryanair"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Перший тиждень на роботі",
        url:      "work-first-week.html",
        keywords: "адаптація колектив перший день нова робота вигорання питати керівник"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Співбесіда: як підготуватись",
        url:      "work-interview.html",
        keywords: "співбесіда питання відповіді підготовка нервувати умови"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Червоні прапорці на роботі",
        url:      "work-red-flags.html",
        keywords: "шахрайство вакансія підозрілий договір неофіційна робота конверт прапорці"
    },
    {
        type:     "guide",
        folder:   "guide",
        title:    "Резюме",
        url:      "work-resum.html",
        keywords: "резюме cv написати приклад роботодавець запрошення"
    }
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
            container.innerHTML = `<p>Нічого не знайдено за: <strong>${query}</strong></p>`;
            return;
        }

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
