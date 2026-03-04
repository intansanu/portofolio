// Fungsi untuk tombol View My Work
function scrollToProjects() {
    document.getElementById("projects").scrollIntoView({
        behavior: "smooth"
    });
}

// Fitur Animasi Scroll (Fade-in elements)
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: hentikan observasi setelah elemen muncul agar animasi hanya terjadi sekali
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Elemen akan muncul saat 10% bagiannya terlihat di layar
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});