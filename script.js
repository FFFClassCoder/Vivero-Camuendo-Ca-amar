const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const contactoForm = document.querySelector('.contacto-form');

const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
};

if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');

        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.45,
});

document.querySelectorAll('section[id]').forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

if (contactoForm) {
    contactoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        if (!btn) return;

        const originalText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '¡Mensaje enviado!';
            btn.style.background = '#28a745';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                this.reset();
            }, 2000);
        }, 1500);
    });
}

const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 80) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
};

window.addEventListener('scroll', updateHeader);
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

updateHeader();
