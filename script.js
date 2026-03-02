document.addEventListener('DOMContentLoaded', () => {

    // --- State Management ---
    const State = {
        lang: localStorage.getItem('lang') || 'tr',
        theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    };

    // --- DOM Elements ---
    const elements = {
        html: document.documentElement,
        themeToggleBtn: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        langToggleBtn: document.getElementById('lang-toggle'),
        langText: document.getElementById('lang-text'),
        translatableNodes: document.querySelectorAll('[data-tr]')
    };

    // --- Initialization ---
    initTheme();
    initLang();
    initScrollReveal();
    initGlowEffect();
    updateYear();

    // --- Actions ---
    
    // Theme Toggle
    elements.themeToggleBtn.addEventListener('click', () => {
        State.theme = State.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', State.theme);
        applyTheme();
    });

    // Language Toggle
    elements.langToggleBtn.addEventListener('click', () => {
        State.lang = State.lang === 'tr' ? 'en' : 'tr';
        localStorage.setItem('lang', State.lang);
        applyLang();
    });

    // --- Functions ---
    
    function initTheme() {
        applyTheme();
    }

    function applyTheme() {
        elements.html.setAttribute('data-theme', State.theme);
        // Update feather icon safely if feather is loaded
        if (typeof feather !== 'undefined') {
            elements.themeToggleBtn.innerHTML = `<i data-feather="${State.theme === 'dark' ? 'sun' : 'moon'}"></i>`;
            feather.replace();
        }
    }

    function initLang() {
        applyLang();
    }

    function applyLang() {
        // Update toggle button text
        elements.langText.textContent = State.lang === 'tr' ? 'EN' : 'TR';
        
        // Update document lang
        elements.html.setAttribute('lang', State.lang);
        
        // Update all translatable elements
        elements.translatableNodes.forEach(node => {
            const translatedText = node.getAttribute(`data-${State.lang}`);
            if (translatedText) {
                // Determine if it's an input/placeholder or textContent
                if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                    node.placeholder = translatedText;
                } else {
                    node.textContent = translatedText;
                }
            }
        });
    }

    // Intersection Observer for scroll reveal animations
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once revealed
                    // observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    }

    // Dynamic glow effect on hover for cards
    function initGlowEffect() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    function updateYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
});
