document.addEventListener("DOMContentLoaded", function () {
    const languageButtons = document.querySelectorAll(".language-switcher .btn");
    const elementsToTranslate = document.querySelectorAll("[data-translate]");
    const jsonURL = "https://raw.githubusercontent.com/emo4ka/portfolio/main/translations.json";

    function setLanguage(lang, translations) {
        localStorage.setItem("selectedLanguage", lang);

        elementsToTranslate.forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        languageButtons.forEach(button => {
            button.classList.toggle("active", button.getAttribute("data-lang") === lang);
        });
    }

    function loadTranslations(lang) {
        fetch(jsonURL)
            .then(response => response.json())
            .then(translations => {
                setLanguage(lang, translations);
            })
            .catch(error => console.error("Error loading translations:", error));
    }

    languageButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedLang = button.getAttribute("data-lang");
            loadTranslations(selectedLang);
        });
    });

    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    loadTranslations(savedLang);
});
