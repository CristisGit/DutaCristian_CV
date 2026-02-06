// Function to render Header
function renderHeader(activePage) {
    const headerHTML = `
    <div class="container">
        <nav>
            <div class="logo">CD.</div>
            <div style="display: flex; align-items: center; gap: 30px;">
                <div class="nav-links">
                    <a href="index.html" class="${activePage === 'home' ? 'active-page' : ''}">Home</a>
                    <a href="about.html" class="${activePage === 'about' ? 'active-page' : ''}">About</a>
                    <a href="experience.html" class="${activePage === 'experience' ? 'active-page' : ''}">Work History</a>
                    <a href="skills.html" class="${activePage === 'skills' ? 'active-page' : ''}">Tech Stack</a>
                </div>
                <div class="lang-switch" style="display:flex; gap:10px;">
                    <button class="lang-btn active" onclick="setLanguage('en')">EN</button>
                    <button class="lang-btn" onclick="setLanguage('ro')">RO</button>
                    <button class="lang-btn" onclick="setLanguage('de')">DE</button>
                </div>
            </div>
        </nav>
    </div>
    `;
    document.querySelector('header').innerHTML = headerHTML;
}

// Function to render Footer
function renderFooter() {
    const footerHTML = `
    <div class="container">
        <div class="social-links">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:cristiduta88@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
        <p style="margin-top:15px; font-weight:600;">Waldenburg, Germany | +49 15511 398976</p>
        <p style="font-size: 0.8rem; opacity: 0.6;">&copy; 2026 Cristian Duta</p>
    </div>
    `;
    document.querySelector('footer').innerHTML = footerHTML;
}