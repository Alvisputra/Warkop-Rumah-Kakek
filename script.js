// 1. Navbar Effect (Mengubah warna background navbar saat di-scroll)
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Sembunyikan indikator scroll secara halus saat user mulai scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// Kembalikan ke atas saat di-refresh (Mengatasi browser yang menyimpan posisi scroll)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Paksa scroll ke atas secepat mungkin sebelum event load untuk mencegah kedipan/lompatan
window.scrollTo(0, 0);

window.addEventListener('load', function() {
    // Sebagai jaring pengaman, panggil scrollTo lagi dengan timeout kecil setelah load sempurna
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 10);
});

// Safari Desktop seringkali kebal terhadap cara biasa, tambahan trik:
window.addEventListener('pageshow', function (event) {
    if (event.persisted || performance.navigation.type === 1) {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
});

// 2. Scroll Reveal Animations (Elemen muncul mulus saat layar di-scroll)
// Fitur ini menambah kesan sangat profesional dan elegan
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // Berapa px sebelum elemen terlihat di layar memicu animasi

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Tambahkan class CSS secra dinamis via JS jika animasi aktif
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Animasi hero section saat pertama render (fade-up) */
    .fade-up {
        animation: fadeUpAnim 1s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    .delay-1 { animation-delay: 0.2s; }
    .delay-2 { animation-delay: 0.4s; }

    @keyframes fadeUpAnim {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

window.addEventListener("scroll", reveal);

// Panggil sekali saat load
reveal();

// 3. Hamburger Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menutup menu jika link di-klik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.click();
            }
        });
    });
}

// 4. Lightbox Gallery Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const galleryItems = document.querySelectorAll('.gallery-item img');

if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }
    });
}
