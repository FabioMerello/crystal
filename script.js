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


    document.querySelectorAll(".carousel").forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const slides = Array.from(track.children);
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        let index = 0;

        // Imposta larghezza slide al resize
        function setSlideWidths() {
            const slideWidth = carousel.clientWidth;
            slides.forEach(slide => slide.style.width = `${slideWidth}px`);
            updateCarousel();
        }

        window.addEventListener("resize", setSlideWidths);
        setSlideWidths();

        // Aggiorna carosello
        function updateCarousel() {
            const slideWidth = slides[0].clientWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        // Pulsanti
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Swipe touch per mobile
        let startX = 0;
        let endX = 0;

        track.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener("touchend", e => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) { // swipe sinistra
                index = (index + 1) % slides.length;
                updateCarousel();
            } else if (diff < -50) { // swipe destra
                index = (index - 1 + slides.length) % slides.length;
                updateCarousel();
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

document.addEventListener("DOMContentLoaded", function () {
    // Array con tutte le mappe
    const maps = [
        {
            id: "map-container",
            iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.0149038410486!2d8.959283!3d44.43285649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d34525a19ebdb5%3A0x6cba00123af70db9!2sStudio%20SC!5e0!3m2!1sit!2sit!4v1764954743178!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        },
        {
            id: "map-container-2",
            iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2863.873418584938!2d8.2599499!3d44.127233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d2f7c72ce2e4bb%3A0x6446d6da999f8cba!2sLa%20Bottega%20del%20Mugugno!5e0!3m2!1sit!2sit!4v1753451058925!5m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        },
        {
            id: "map-container-3",
            iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2959.384089328617!2d14.705938999999999!3d42.120659999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDA3JzE0LjQiTiAxNMKwNDInMjEuNCJF!5e0!3m2!1sit!2sit" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        }
    ];

    // Funzione per caricare una mappa
    function loadMap(map) {
        const container = document.getElementById(map.id);
        if(container) {
            container.innerHTML = map.iframe;
        }
    }

    // Se consenso già dato, carica tutte le mappe
    if (localStorage.getItem("cookiesAccepted") === "true") {
        maps.forEach(loadMap);
    }

    // Banner cookie
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");

    if (!localStorage.getItem("cookiesAccepted") && banner) {
        setTimeout(() => banner.classList.add("show"), 300);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", function () {
            localStorage.setItem("cookiesAccepted", "true");
            banner.classList.remove("show");
            maps.forEach(loadMap);
        });
    }
});