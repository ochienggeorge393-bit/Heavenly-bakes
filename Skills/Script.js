const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const noResults = document.getElementById('no-results');

function performSearch() {
    if (!searchInput) return;
    const filter = searchInput.value.toLowerCase();
    const cakes = document.querySelectorAll('.cake-card');
    let visibleCount = 0;

    cakes.forEach(cake => {
        const text = cake.textContent.toLowerCase();
        const isMatch = text.includes(filter);
        cake.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleCount += 1;
    });

    if (noResults) {
        noResults.hidden = visibleCount > 0;
    }
}

if (searchInput) {
    searchInput.addEventListener('input', performSearch);
}

if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        performSearch();
    });
} else if (searchButton) {
    searchButton.addEventListener('click', performSearch);
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
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initTabs);
