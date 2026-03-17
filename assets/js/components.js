(function () {
    const base = document.documentElement.dataset.base || '';

    const headerEl = document.getElementById('site-header');
    if (headerEl) {
        headerEl.outerHTML = `
    <header class="header">
        <div class="container header__inner">
            <div class="brand">
                <div class="brand__name">SelfMade</div>
                <div class="brand__tagline">практичний онлайн-довідник для молоді</div>
            </div>

            <nav class="nav">
                <a class="nav__link" href="${base}index.html">Головна</a>
                <a class="nav__link" href="${base}pages/categories.html">Категорії</a>
                <a class="nav__link" href="${base}pages/guides.html">Гайди</a>
                <a class="nav__link" href="${base}pages/about.html">Про нас</a>
                <a class="nav__link" href="${base}pages/contacts.html">Контакти</a>
            </nav>

            <a class="search" href="${base}pages/search.html">
                <span class="search__icon">🔎</span>
                <input class="search__input" type="search" placeholder="Пошук" />
            </a>
        </div>
    </header>`;
    }

    const footerEl = document.getElementById('site-footer');
    if (footerEl) {
        footerEl.outerHTML = `
    <footer class="footer">
        <div class="container footer__inner">
            <div>© <span id="y"></span> SelfMade</div>
            <div>
                <a class="nav__link" href="${base}pages/privacy.html">Privacy</a>
                <a class="nav__link" href="${base}pages/terms.html">Terms</a>
                <a class="nav__link" href="${base}pages/contacts.html">Contacts</a>
            </div>
        </div>
    </footer>`;

        const yearEl = document.getElementById('y');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
})();
