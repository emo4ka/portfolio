document.addEventListener('DOMContentLoaded', function() {
    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        
        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
        
    
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.textContent = "Thank you for your message, " + name + "!";
        responseMessage.style.color = "green";

        contactForm.reset();
    });
    
 
});document.addEventListener('DOMContentLoaded', function() {
   
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

  
    const modeSwitch = document.getElementById('modeSwitch');
    modeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });


    if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add('light-mode');
    }
});
