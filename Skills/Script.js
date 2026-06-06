const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const filter = e.target.value.toLowerCase();
        const cakes = document.querySelectorAll('.cake');
        cakes.forEach(cake => {
            const text = cake.textContent.toLowerCase();
            cake.style.display = text.includes(filter) ? '' : 'none';
        });
    });
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
