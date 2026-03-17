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

            <div class="header-right">
                <a class="search-btn" href="${base}pages/search.html" aria-label="Пошук">🔎</a>
                <button class="burger" aria-label="Меню" aria-expanded="false">
                    <span class="burger__line"></span>
                    <span class="burger__line"></span>
                    <span class="burger__line"></span>
                </button>
            </div>
        </div>
    </header>
    <nav class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <a class="mobile-nav__link" href="${base}index.html">🏠 Головна</a>
        <a class="mobile-nav__link" href="${base}pages/categories.html">📂 Категорії</a>
        <a class="mobile-nav__link" href="${base}pages/guides.html">📖 Гайди</a>
        <a class="mobile-nav__link" href="${base}pages/about.html">✨ Про нас</a>
        <a class="mobile-nav__link" href="${base}pages/contacts.html">📬 Контакти</a>
        <a class="mobile-nav__link" href="${base}pages/search.html">🔎 Пошук</a>
    </nav>`;
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

    // Hamburger menu
    const burger = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
        let savedScrollY = 0;

        function openMenu() {
            savedScrollY = window.scrollY;
            document.body.style.top = '-' + savedScrollY + 'px';
            document.body.classList.add('nav-open');
            burger.classList.add('is-open');
            mobileNav.classList.add('is-open');
            burger.setAttribute('aria-expanded', 'true');
            mobileNav.setAttribute('aria-hidden', 'false');
        }

        function closeMenu() {
            document.body.classList.remove('nav-open');
            document.body.style.top = '';
            window.scrollTo(0, savedScrollY);
            burger.classList.remove('is-open');
            mobileNav.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
        }

        burger.addEventListener('click', function () {
            burger.classList.contains('is-open') ? closeMenu() : openMenu();
        });

        mobileNav.querySelectorAll('.mobile-nav__link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }
})();
