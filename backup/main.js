// --- LANGUAGE LOGIC ---
function setLanguage(lang) {
    if (!translations[lang]) return;

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    // Note: Since we reload header via JS, buttons reset visually, 
    // but usually language state is stored in localStorage in prod. 
    // For this simple demo, it updates the text immediately.
}

// --- ACCORDION LOGIC ---
function toggleStory(element) {
    // Toggle the 'active' class on the clicked item
    element.classList.toggle('active');
}