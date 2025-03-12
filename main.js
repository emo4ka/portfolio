document.addEventListener('DOMContentLoaded', function() {
    // Default language
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Language switcher functionality
    const languageButtons = document.querySelectorAll('.language-switcher button');

    function setLanguage(lang) {
        currentLang = lang;
        const elements = document.querySelectorAll('[data-translate]');

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update active button state
        languageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    // Add click event listeners to language buttons
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Set initial language
    setLanguage(currentLang);

    // Dark/Light mode toggle
    const modeSwitch = document.getElementById('modeSwitch');
    modeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // Set initial mode
    if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add('light-mode');
    }
});
