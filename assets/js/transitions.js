(function () {
    // Фікс bfcache: при натисканні "назад" знімаємо page-exit
    window.addEventListener('pageshow', function (e) {
        document.body.classList.remove('page-exit');
    });

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href');
        if (!href) return;

        // Пропускаємо зовнішні посилання, якорі, mailto, tel
        if (
            href.startsWith('http') ||
            href.startsWith('//') ||
            href.startsWith('#') ||
            href.startsWith('mailto') ||
            href.startsWith('tel')
        ) return;

        e.preventDefault();
        var target = link.href;

        document.body.classList.add('page-exit');
        setTimeout(function () {
            window.location.href = target;
        }, 220);
    });
})();
