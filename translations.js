document.addEventListener('DOMContentLoaded', function() {
    
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    
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

        
        languageButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        
        localStorage.setItem('preferredLanguage', lang);
    }

    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    
    setLanguage(currentLang);

    
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

    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
});
