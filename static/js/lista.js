document.addEventListener('DOMContentLoaded', function() {
    // The loading screen is now part of the HTML, so we just need to find it.
    const loadingScreen = document.getElementById('loadingScreen');

    // Hide the loading screen when the page is fully loaded.
    if (loadingScreen) {
        window.addEventListener('load', () => {
            // Use a small timeout to avoid a jarring transition
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        });
    }

    // --- Menú hamburguesa para móvil ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // --- Lógica de búsqueda y filtrado ---
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.btn.btn-primary');
    const grid = document.getElementById('emprendimientos-grid');
    const categoriaSelect = document.getElementById('categoria-filter');
    let resetButton = null;

    function filtrarEmprendimientos() {
        if (!grid) return;
        const query = searchInput.value.trim().toLowerCase();
        const categoria = categoriaSelect ? categoriaSelect.value : '';
        const cards = grid.querySelectorAll('.emprendimiento-card');
        let count = 0;
        cards.forEach(card => {
            const nombre = card.getAttribute('data-nombre') || '';
            const descripcion = card.getAttribute('data-descripcion') || '';
            const estudiante = card.getAttribute('data-estudiante') || '';
            const cardCategoria = card.getAttribute('data-categoria') || '';
            const matchCategoria = !categoria || cardCategoria === categoria;
            const matchBusqueda =
                nombre.includes(query) ||
                descripcion.includes(query) ||
                estudiante.includes(query);
            const visible = matchCategoria && matchBusqueda;
            card.style.display = visible ? '' : 'none';
            if (visible) count++;
        });
        // Actualizar el contador de resultados
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) resultsCount.textContent = count;
        // Mostrar/ocultar estado vacío
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) emptyState.style.display = count === 0 ? '' : 'none';
        // Cambiar el botón a reset
        mostrarBotonReset();
    }

    function mostrarBotonReset() {
        if (!resetButton) {
            resetButton = document.createElement('button');
            resetButton.className = 'btn btn-secondary btn-reset';
            resetButton.innerHTML = '<i class="fas fa-undo"></i> Ver Todos';
            searchButton.parentNode.insertBefore(resetButton, searchButton.nextSibling);
            resetButton.addEventListener('click', function() {
                // Limpiar búsqueda y filtro
                searchInput.value = '';
                if (categoriaSelect) categoriaSelect.value = '';
                filtrarEmprendimientosReset();
                resetButton.remove();
                resetButton = null;
            });
        }
        searchButton.style.display = 'none';
    }

    function filtrarEmprendimientosReset() {
        if (!grid) return;
        const cards = grid.querySelectorAll('.emprendimiento-card');
        let count = 0;
        cards.forEach(card => {
            card.style.display = '';
            count++;
        });
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) resultsCount.textContent = count;
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) emptyState.style.display = 'none';
        searchButton.style.display = '';
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', filtrarEmprendimientos);
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                filtrarEmprendimientos();
            }
        });
        if (categoriaSelect) {
            categoriaSelect.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    filtrarEmprendimientos();
                }
            });
        }
    }
});
