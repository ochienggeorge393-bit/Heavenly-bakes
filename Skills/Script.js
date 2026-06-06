function activatePanel(tabName) {
    const buttons = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
    panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tab === tabName));
}

function performSearch(searchInput, noResults) {
    if (!searchInput) return;
    const filter = searchInput.value.toLowerCase();
    const activePanel = document.querySelector('.tab-panel.active');

    if (!activePanel) {
        if (noResults) noResults.hidden = true;
        return;
    }

    const cards = activePanel.querySelectorAll('.cake-card');
    let visibleCount = 0;

    cards.forEach(cake => {
        const text = cake.textContent.toLowerCase();
        const isMatch = text.includes(filter);
        cake.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleCount += 1;
    });

    if (noResults) {
        noResults.hidden = visibleCount > 0;
    }
}

function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-button');
        const panels = container.querySelectorAll('.tab-panel');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedTab = button.dataset.tab;
                buttons.forEach(btn => btn.classList.toggle('active', btn === button));
                panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tab === selectedTab));
                const searchInput = document.getElementById('search-input');
                const noResults = document.getElementById('no-results');
                performSearch(searchInput, noResults);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTabs();

    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const noResults = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', () => performSearch(searchInput, noResults));
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            performSearch(searchInput, noResults);
        });
    }
});
