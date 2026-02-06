// Particle System (reused from placeholder)
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById('canvas-container');
        this.container.appendChild(this.canvas);

        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.particleCount = 40; // Reduced for performance with more content

        this.resize();
        this.init();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.updateMouse(e));

        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.createParticles();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    updateMouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - distance / 150)})`;
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity})`;
            this.ctx.fill();
        });
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Translations Logic
let currentLang = 'en';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
    });

    // Update text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });

    // Save preference
    localStorage.setItem('preferredLang', lang);
}

// Story Toggle
function toggleStory(btn) {
    const parent = btn.parentElement;
    const storyDiv = parent.querySelector('.full-story');
    const isHidden = storyDiv.classList.contains('hidden');

    if (isHidden) {
        storyDiv.classList.remove('hidden');
        btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
    } else {
        storyDiv.classList.add('hidden');
        btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
    }
}

// Scroll Animations
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Particles
    new ParticleSystem();

    // 2. Init Scroll Reveal
    initScrollReveal();

    // 3. Init Language
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
});
