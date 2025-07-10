// Enhanced Modern JavaScript with GSAP Animations and Advanced Features
class EmprendeUniApp {
    constructor() {
        this.state = {
            isLoading: true,
            isMobileMenuOpen: false,
            currentSection: 'hero',
            scrollDirection: 'down',
            lastScrollY: 0,
            isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            theme: this.getStoredTheme() || 'light',
            language: this.getStoredLanguage() || 'es'
        };
        
        this.observers = new Map();
        this.animations = new Map();
        this.debounceTimers = new Map();
        
        this.init();
    }

    // Enhanced initialization with error handling
    async init() {
        try {
            // Inicializar pantalla de carga primero
            this.initLoadingScreen();
            
            // Cargar assets críticos
            await this.preloadCriticalAssets();
            
            // Configurar el resto de la aplicación
            this.setupAccessibility();
            this.registerGSAPPlugins();
            this.setupEventListeners();
            this.initThemeSystem();
            this.initInternationalization();
            this.initPerformanceObserver();
            this.initNavigationEffects();
            this.initHeroAnimations();
            this.initScrollAnimations();
            this.initCounterAnimations();
            this.initCardAnimations();
            this.initParallaxEffects();
            this.initInteractiveElements();
            this.initMobileMenu();
            this.initKeyboardNavigation();
            this.initFormValidation();
            this.initNotificationSystem();
            this.initProgressTracking();
            this.initAnalytics();
        } catch (error) {
            this.handleError('Initialization failed', error);
            // Asegurar que el preloader se oculte incluso si hay un error
            this.hideLoadingScreen(document.getElementById('loadingScreen'));
        }
    }

    // Preload critical assets for better performance
    async preloadCriticalAssets() {
        const criticalImages = [
            '/images/hero-bg.webp',
            '/images/logo.svg'
        ];

        const preloadPromises = criticalImages.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                const timeout = setTimeout(() => {
                    resolve(); // Resolver después del timeout
                }, 2000); // Reducir el timeout a 2 segundos

                img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                };
                img.onerror = () => {
                    clearTimeout(timeout);
                    resolve(); // Resolver incluso si hay error
                };
                img.src = src;
            });
        });

        try {
            await Promise.allSettled(preloadPromises);
        } catch (error) {
            console.warn('Some critical assets failed to preload:', error);
        }
    }

    // Enhanced accessibility setup
    setupAccessibility() {
        // Add skip to content link
        this.createSkipLink();
        
        // Set up ARIA live regions
        this.createLiveRegions();
        
        // Focus management
        this.initFocusManagement();
        
        // Keyboard navigation
        this.setupKeyboardShortcuts();
    }

    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            z-index: 999999;
            padding: 8px 16px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.left = '8px';
            skipLink.style.top = '8px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    createLiveRegions() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
    }

    // Enhanced theme system
    initThemeSystem() {
        this.applyTheme(this.state.theme);
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Watch for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
        this.state.theme = newTheme;
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        this.announceToScreenReader(`Tema cambiado a ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Animate theme transition
        if (!this.state.isReducedMotion) {
            gsap.to('body', {
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    // Internationalization system
    initInternationalization() {
        this.translations = {
            es: {
                loading: 'Cargando...',
                welcome: 'Bienvenido',
                error: 'Error',
                success: 'Éxito'
            },
            en: {
                loading: 'Loading...',
                welcome: 'Welcome',
                error: 'Error',
                success: 'Success'
            }
        };
        
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        const newLang = this.state.language === 'es' ? 'en' : 'es';
        this.state.language = newLang;
        this.applyLanguage(newLang);
        localStorage.setItem('language', newLang);
    }

    applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang);
        // Update text content based on data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
    }

    getStoredLanguage() {
        return localStorage.getItem('language');
    }

    // Performance monitoring
    initPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.trackPerformanceMetric('page_load_time', entry.loadEventEnd - entry.loadEventStart);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
        }
    }

    registerGSAPPlugins() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, TextPlugin);
            
            // Configure ScrollTrigger for better performance
            ScrollTrigger.config({
                autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
            });
            
            // Set default animation settings
            gsap.defaults({
                duration: this.state.isReducedMotion ? 0.1 : 0.6,
                ease: 'power2.out'
            });
        }
    }

    // Enhanced event listeners with performance optimization
    setupEventListeners() {
        // Passive listeners for better scroll performance
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16), { passive: true });
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        window.addEventListener('load', () => this.handlePageLoad());
        
        // Enhanced smooth scroll with better UX
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
        
        // Handle visibility changes for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Handle connection changes
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', () => {
                this.adjustForConnectionSpeed();
            });
        }

        // Botones animados
        const buttons = document.querySelectorAll('.btn-animated');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const shine = button.querySelector('.btn-shine');
                if (shine) {
                    gsap.to(shine, {
                        x: x,
                        y: y,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            // Efecto ripple (pulsación)
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
                button.appendChild(ripple);
                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });
            });
        });
    }

    // Enhanced loading screen with progress indication
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Forzar la ocultación después de 5 segundos como máximo
        const forceHideTimeout = setTimeout(() => {
            this.hideLoadingScreen(loadingScreen);
        }, 5000);

        // Ocultar cuando la página esté completamente cargada
        window.addEventListener('load', () => {
            clearTimeout(forceHideTimeout);
            this.hideLoadingScreen(loadingScreen);
        });

        // Ocultar si hay un error
        window.addEventListener('error', () => {
            clearTimeout(forceHideTimeout);
            this.hideLoadingScreen(loadingScreen);
        });
    }

    hideLoadingScreen(loadingScreen) {
        if (!loadingScreen) return;
        
        // Asegurar que el estado se actualice
        this.state.isLoading = false;
        
        // Ocultar con animación
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                loadingScreen.style.display = 'none';
                // Iniciar animaciones principales
                this.startMainAnimations();
            }
        });
    }

    // Enhanced navigation with scroll spy
    initNavigationEffects() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;

        // Enhanced navbar scroll effect with direction detection
        ScrollTrigger.create({
            start: 'top -80',
            end: 99999,
            onUpdate: self => {
                const direction = self.direction;
                this.state.scrollDirection = direction === 1 ? 'down' : 'up';
                
                navbar.classList.toggle('scrolled', self.progress > 0);
                navbar.classList.toggle('hide', direction === 1 && self.progress > 0.1);
            }
        });

        // Scroll spy functionality
        this.initScrollSpy(navLinks);

        // Enhanced nav link interactions
        navLinks.forEach(link => {
            this.enhanceNavLink(link);
        });
    }

    initScrollSpy(navLinks) {
        const sections = Array.from(navLinks).map(link => {
            const href = link.getAttribute('href');
            return href.startsWith('#') ? document.querySelector(href) : null;
        }).filter(Boolean);

        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 50%',
                end: 'bottom 50%',
                onEnter: () => this.setActiveNavLink(navLinks[index]),
                onEnterBack: () => this.setActiveNavLink(navLinks[index])
            });
        });
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const underline = link.querySelector('.nav-link-underline');
            if (underline) {
                gsap.to(underline, { scaleX: 0, duration: 0.3 });
            }
        });

        activeLink.classList.add('active');
        const underline = activeLink.querySelector('.nav-link-underline');
        if (underline) {
            gsap.to(underline, { scaleX: 1, duration: 0.3 });
        }
    }

    enhanceNavLink(link) {
        const underline = link.querySelector('.nav-link-underline');
        
        link.addEventListener('mouseenter', () => {
            if (!this.state.isReducedMotion && underline) {
                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active') && underline) {
                gsap.to(underline, {
                    scaleX: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        // Add focus styles for keyboard navigation
        link.addEventListener('focus', () => {
            link.style.outline = '2px solid var(--color-primary)';
            link.style.outlineOffset = '2px';
        });

        link.addEventListener('blur', () => {
            link.style.outline = 'none';
        });
    }

    // Enhanced hero animations with intersection observer
    initHeroAnimations() {
        if (this.state.isReducedMotion) return;

        // Optimized orb animations
        this.createOrbAnimations();
        
        // Parallax background
        this.initHeroParallax();
    }

    createOrbAnimations() {
        const orbs = document.querySelectorAll('[class*="orb-"]');
        
        orbs.forEach((orb, index) => {
            const animation = gsap.to(orb, {
                x: 100 * (index % 2 === 0 ? 1 : -1),
                y: 50 * (index % 2 === 0 ? -1 : 1),
                rotation: 360 * (index % 2 === 0 ? 1 : -1),
                duration: 20 + (index * 5),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            this.animations.set(`orb-${index}`, animation);
        });
    }

    // Enhanced form validation
    initFormValidation() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            this.setupFormValidation(form);
        });
    }

    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', this.debounce(() => this.validateField(input), 300));
        });

        form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
    }

    validateField(field) {
        const value = field.value.trim();
        const rules = field.dataset.rules ? field.dataset.rules.split('|') : [];
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.includes('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (rules.includes('email') && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }

        // Length validation
        const minLength = rules.find(rule => rule.startsWith('min:'));
        if (minLength && value.length < parseInt(minLength.split(':')[1])) {
            isValid = false;
            errorMessage = `Mínimo ${minLength.split(':')[1]} caracteres`;
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const errorElement = field.parentNode.querySelector('.error-message') || 
                           this.createErrorElement(field);

        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid);

        if (!isValid && message) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        } else {
            errorElement.style.display = 'none';
        }
    }

    createErrorElement(field) {
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: 0.875rem;
            margin-top: 4px;
            display: none;
        `;
        field.parentNode.appendChild(errorElement);
        return errorElement;
    }

    // Notification system
    initNotificationSystem() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: var(--color-${type}, #007bff);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            margin-bottom: 12px;
            box-shadow: var(--shadow-lg);
            pointer-events: auto;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        notification.textContent = message;

        const container = document.getElementById('notification-container');
        container.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        // Click to dismiss
        notification.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Enhanced keyboard navigation
    initKeyboardNavigation() {
        this.focusableElements = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');
    }

    handleKeyboardNavigation(e) {
        // Escape key handling
        if (e.key === 'Escape') {
            this.handleEscapeKey();
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            this.handleTabNavigation(e);
        }

        // Custom shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    this.openSearch();
                    break;
                case '/':
                    e.preventDefault();
                    this.toggleShortcutsHelp();
                    break;
            }
        }
    }

    handleEscapeKey() {
        // Close mobile menu
        if (this.state.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Close any open modals
        const openModal = document.querySelector('.modal.active');
        if (openModal) {
            this.closeModal(openModal);
        }
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        return function(...args) {
            const key = func.name || 'anonymous';
            clearTimeout(this.debounceTimers.get(key));
            this.debounceTimers.set(key, setTimeout(() => func.apply(this, args), wait));
        }.bind(this);
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Performance optimization methods
    pauseAnimations() {
        this.animations.forEach(animation => {
            if (animation.pause) animation.pause();
        });
    }

    resumeAnimations() {
        this.animations.forEach(animation => {
            if (animation.resume) animation.resume();
        });
    }

    adjustForConnectionSpeed() {
        if (navigator.connection) {
            const connection = navigator.connection;
            const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                   connection.effectiveType === '2g';
            
            if (isSlowConnection) {
                // Disable heavy animations
                this.state.isReducedMotion = true;
                document.documentElement.classList.add('reduced-motion');
            }
        }
    }

    // Error handling
    handleError(context, error) {
        console.error(`${context}:`, error);
        
        // Report to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `${context}: ${error.message}`,
                fatal: false
            });
        }

        // Show user-friendly error message
        this.showNotification('Ha ocurrido un error. Por favor, intenta de nuevo.', 'error');
    }

    // Analytics integration
    initAnalytics() {
        // Track page performance
        if ('PerformanceObserver' in window) {
            this.trackPagePerformance();
        }
        
        // Track user interactions
        this.trackUserInteractions();
    }

    trackPagePerformance() {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'largest-contentful-paint') {
                    this.trackPerformanceMetric('lcp', entry.startTime);
                }
            });
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    trackUserInteractions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-track]')) {
                const action = e.target.dataset.track;
                this.trackEvent('interaction', action);
            }
        });
    }

    trackEvent(category, action, label = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    trackPerformanceMetric(name, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: name,
                value: Math.round(value)
            });
        }
    }

    // Enhanced cleanup for better memory management
    destroy() {
        // Clear all timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
        
        // Kill all animations
        this.animations.forEach(animation => {
            if (animation.kill) animation.kill();
        });
        this.animations.clear();
        
        // Disconnect observers
        this.observers.forEach(observer => {
            if (observer.disconnect) observer.disconnect();
        });
        this.observers.clear();
        
        // Clear ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }

    // Animaciones principales
    startMainAnimations() {
        this.animateNavbar();
        this.animateHeroContent();
        this.initScrollAnimations();
        this.initCounterAnimations();
        this.initCardAnimations();
        this.initParallaxEffects();
        this.initInteractiveElements();
    }

    animateNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        // Animación inicial
        gsap.from(navbar, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Efecto de scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        const tl = gsap.timeline();

        tl.from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .from('.hero-title .title-line', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-buttons', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.scroll-indicator', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');

        // Animación de los orbes
        this.createOrbAnimations();
    }

    createOrbAnimations() {
        const orbs = document.querySelectorAll('.gradient-orb');
        if (!orbs.length) return;

        orbs.forEach((orb, index) => {
            gsap.to(orb, {
                y: 'random(-20, 20)',
                x: 'random(-20, 20)',
                duration: 'random(3, 5)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.2
            });
        });
    }

    initScrollAnimations() {
        // Animación de elementos al hacer scroll
        const elements = document.querySelectorAll('.stat-item, .emprendimiento-card, .section-header');
        
        elements.forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Animación del scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            gsap.to(scrollIndicator, {
                opacity: 0,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    initCounterAnimations() {
        // Desactivado para evitar doble animación y reinicio a 0
        // La animación ahora se maneja por fetch y animateStatNumber
    }

    initCardAnimations() {
        const cards = document.querySelectorAll('.emprendimiento-card');
        if (!cards.length) return;

        cards.forEach((card, index) => {
            // Efecto hover
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            // Efecto de brillo
            const glow = card.querySelector('.card-glow');
            if (glow) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    gsap.to(glow, {
                        x: x,
                        y: y,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });
    }

    initParallaxEffects() {
        // Efecto parallax para elementos flotantes
        const floatingElements = document.querySelectorAll('.floating-element');
        if (!floatingElements.length) return;

        floatingElements.forEach(element => {
            gsap.to(element, {
                y: 'random(-100, 100)',
                x: 'random(-50, 50)',
                rotation: 'random(-30, 30)',
                duration: 'random(10, 20)',
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        });
    }

    initInteractiveElements() {
        // Botones animados
        const buttons = document.querySelectorAll('.btn-animated');
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const shine = button.querySelector('.btn-shine');
                if (shine) {
                    gsap.to(shine, {
                        x: x,
                        y: y,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Enlaces de redes sociales
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Enhanced mobile menu with better UX
    initMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');
        const body = document.body;

        // Crear overlay si no existe
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        // Función para abrir el menú
        const openMenu = () => {
            menu.classList.add('active');
            toggle.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('menu-open');
            this.state.isMobileMenuOpen = true;
        };

        // Función para cerrar el menú
        const closeMenu = () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            this.state.isMobileMenuOpen = false;
        };

        // Event listener para el botón de toggle
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.state.isMobileMenuOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        // Cerrar menú al hacer click en el overlay
        overlay.addEventListener('click', closeMenu);

        // Cerrar menú al hacer click en un enlace
        const menuLinks = menu.querySelectorAll('.nav-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Cerrar menú al hacer scroll
        window.addEventListener('scroll', () => {
            if (this.state.isMobileMenuOpen) {
                closeMenu();
            }
        });

        // Manejar gestos de swipe
        let touchStartX = 0;
        let touchEndX = 0;

        menu.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        menu.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0 && this.state.isMobileMenuOpen) {
                    // Swipe right - close menu
                    closeMenu();
                } else if (swipeDistance < 0 && !this.state.isMobileMenuOpen) {
                    // Swipe left - open menu
                    openMenu();
                }
            }
        };
    }

    // Enhanced scroll handling with performance optimization
    handleScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.state.lastScrollY ? 'down' : 'up';
        
        // Actualizar estado
        this.state.lastScrollY = currentScrollY;
        this.state.scrollDirection = scrollDirection;

        // Manejar navbar
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
            if (scrollDirection === 'down' && this.state.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        } else {
            navbar.classList.remove('scrolled');
        }

        // Actualizar sección activa
        this.updateActiveSection();
    }

    updateScrollProgress(progress) {
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
        }
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (this.state.currentSection !== section.id) {
                    this.state.currentSection = section.id;
                    this.onSectionChange(section.id);
                }
            }
        });
    }

    onSectionChange(sectionId) {
        // Update URL hash without scrolling
        if (history.replaceState) {
            history.replaceState(null, null, `#${sectionId}`);
        }

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('sectionchange', {
            detail: { sectionId }
        }));
    }

    // Enhanced smooth scroll with better UX
    handleSmoothScroll(e) {
        e.preventDefault();
        
        const targetId = e.currentTarget.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        // Show loading indicator
        e.currentTarget.classList.add('loading');
        
        const scrollOptions = {
            duration: this.state.isReducedMotion ? 0.1 : 1,
            scrollTo: {
                y: targetElement,
                offsetY: 80
            },
            ease: 'power2.inOut',
            onComplete: () => {
                e.currentTarget.classList.remove('loading');
                targetElement.focus();
                this.announceToScreenReader(`Navegado a ${targetElement.getAttribute('aria-label') || targetId}`);
            }
        };

        if (typeof gsap !== 'undefined') {
            gsap.to(window, scrollOptions);
        } else {
            // Fallback to native smooth scroll
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Progress tracking system
    initProgressTracking() {
        this.createProgressIndicator();
        this.trackReadingProgress();
    }

    createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';
        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 9999;
            pointer-events: none;
        `;

        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            height: 100%;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.1s ease;
        `;

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
    }

    trackReadingProgress() {
        const articles = document.querySelectorAll('article, .content-section');
        
        articles.forEach(article => {
            this.setupReadingProgress(article);
        });
    }

    setupReadingProgress(article) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.trackEvent('reading', 'section_viewed', entry.target.id);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(article);
        this.observers.set(`reading-${article.id}`, observer);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EmprendeUniApp();
    if (window.app && typeof window.app.initMobileMenu === 'function') {
        window.app.initMobileMenu();
    }

    // Cambiar palabra en el hero cada segundo
    const highlight = document.querySelector('.hero-title .title-highlight');
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('visible');
        }, 200); // Pequeño delay para animación de entrada
    }
    if (!highlight) return;
    let idx = 0;
    const palabrasHero = [
        'Emprendimiento',
        'Proyecto',
        'Idea',
        'Startup',
        'Negocio',
        'Sueño',
        'Meta',
        'Visión',
        'Desafío',
        'Innovación'
    ];
    setInterval(() => {
        idx = (idx + 1) % palabrasHero.length;
        highlight.classList.remove('fade-in');
        highlight.classList.add('fade-out');
        setTimeout(() => {
            highlight.textContent = palabrasHero[idx];
            highlight.classList.remove('fade-out');
            highlight.classList.add('fade-in');
        }, 300);
    }, 3000);

    // Actualización dinámica de stats con animación
    function animateStatNumber(element, newValue) {
        const current = parseInt(element.textContent, 10) || 0;
        if (current !== newValue) {
            gsap.to(element, {
                textContent: newValue,
                duration: 1,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                    element.textContent = Math.round(this.targets()[0].textContent);
                }
            });
        }
    }

    function actualizarStats() {
        fetch('/api/stats')
            .then(res => res.json())
            .then(data => {
                const e = document.getElementById('total-emprendimientos');
                if (e) animateStatNumber(e, data.total);
                const c = document.getElementById('total-categorias');
                if (c) animateStatNumber(c, data.total_categorias);
                const s = document.getElementById('total-estudiantes');
                if (s) animateStatNumber(s, data.total_emprendedores);
            });
    }
    actualizarStats();
    setInterval(actualizarStats, 10000);
});