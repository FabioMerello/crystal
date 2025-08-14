document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    // Navbar scroll transparency effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    });

    // Toggle menu mobile with animation
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Scroll fluido per link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funzione per nascondere banner
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    function hideBanner() {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 600);
    }

    function showBanner() {
        banner.style.display = 'flex';
        setTimeout(() => {
            banner.classList.add('show');
        }, 50);
    }

    if (localStorage.getItem('cookieAccepted') !== 'true') {
        showBanner();
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieAccepted', 'true');
        hideBanner();
    });
});