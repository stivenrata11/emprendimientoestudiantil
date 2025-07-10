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

    // Ocultar mensajes flash después de 4 segundos
    setTimeout(function() {
        document.querySelectorAll('.flash-message').forEach(function(msg) {
            msg.style.transition = 'opacity 0.5s';
            msg.style.opacity = '0';
            setTimeout(function() {
                msg.remove();
            }, 500);
        });
    }, 4000);
});
