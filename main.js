document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLang = 'en';

    // Language switcher functionality
    const languageButtons = document.querySelectorAll('.language-switcher button');

    // Set initial active state
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');

    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);

            // Update active button state
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Function to set language
    function setLanguage(lang) {
        currentLang = lang;
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Load saved language preference or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
});
