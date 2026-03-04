// 1. Scroll To Projects
function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

// 2. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

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

// 4. Scroll Spy
const sections = document.querySelectorAll('section, header');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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

// 5. Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const staggerReveals = document.querySelectorAll('.reveal-stagger');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('active'); }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    staggerReveals.forEach(stagger => staggerObserver.observe(stagger));
});

// 6. Image Slider Modal Logic
let currentImages = [];
let currentIndex = 0;

function openGallery(imagesArray) {
    const modal = document.getElementById("imageModal");
    currentImages = imagesArray;
    currentIndex = 0; 
    
    modal.style.display = "flex"; 
    updateModalContent();
    document.body.style.overflow = "hidden"; // Stop background scroll
}

function updateModalContent() {
    const modalImg = document.getElementById("expandedImg");
    const caption = document.getElementById("caption");
    
    modalImg.style.opacity = 0;
    
    setTimeout(() => {
        modalImg.src = currentImages[currentIndex];
        caption.innerHTML = `Gambar ${currentIndex + 1} dari ${currentImages.length}`;
        modalImg.style.opacity = 1;
    }, 150);
}

function changeImage(step) {
    currentIndex += step;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateModalContent();
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
    document.body.style.overflow = "auto"; // Restore scroll
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});