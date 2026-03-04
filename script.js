// 1. Fungsi Tombol Hero
function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
}

// 2. Mobile Menu Toggle (Hamburger)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Menutup menu mobile saat link diklik
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// 3. Navbar Shrink on Scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '15px 8%';
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    } else {
        nav.style.padding = '20px 8%';
        nav.style.background = 'rgba(10, 10, 10, 0.7)';
    }
});

// 4. Scroll Spy (Highlight active nav link)
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Deteksi jika kita sudah scroll masuk ke area section tersebut
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// 5. Scroll Reveal Animations (termasuk Staggered effect)
document.addEventListener('DOMContentLoaded', () => {
    // Reveal biasa
    const reveals = document.querySelectorAll('.reveal');
    // Reveal untuk grid (staggered)
    const staggerReveals = document.querySelectorAll('.reveal-stagger');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // Logika khusus untuk animasi staggered (bergantian) di grid
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Memberikan delay berdasarkan urutan elemen
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 150); // Delay 150ms tiap elemen
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    staggerReveals.forEach(stagger => staggerObserver.observe(stagger));
});

// 6. Modal Image Gallery Logic
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("expandedImg");
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    
    // Mencegah body di-scroll saat modal terbuka
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    // Mengembalikan fungsi scroll pada body
    document.body.style.overflow = "auto";
}

// Tutup modal jika user mengklik area di luar gambar
window.addEventListener('click', function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});