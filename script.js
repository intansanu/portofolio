// 1. Scroll To Projects
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

// 2. Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-item");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  hamburger.classList.toggle("toggle");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("nav-active")) {
      navLinks.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
    }
  });
});

// 3. Navbar Shrink on Scroll
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.style.padding = "15px 8%";
    nav.style.background = "rgba(5, 5, 5, 0.9)";
    nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    nav.style.padding = "20px 8%";
    nav.style.background = "rgba(5, 5, 5, 0.6)";
    nav.style.boxShadow = "none";
  }
});

// 4. Scroll Spy (Highlight active nav link)
const sections = document.querySelectorAll("section, header");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(current)) {
      item.classList.add("active");
    }
  });
});

// 5. Scroll Reveal Animations (Makin Halus)
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const staggerReveals = document.querySelectorAll(".reveal-stagger");

  // Opsi agar elemen mulai muncul saat 15% bagiannya masuk ke layar
  const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach((reveal) => revealOnScroll.observe(reveal));

  // Animasi bergantian (staggered)
  const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 180);
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  staggerReveals.forEach((stagger) => staggerObserver.observe(stagger));
});

// 6. BARU: Parallax Mouse Move (Bikin Latar Belakang Interaktif)
document.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".ambient-light");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  // Menggeser cahaya berlawanan arah dengan mouse
  orbs[0].style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
  orbs[1].style.transform = `translate(${x * 60}px, ${y * 60}px)`;
  orbs[2].style.transform = `translate(-${x * 30}px, ${y * 30}px)`;
});

// 7. Image Slider Modal Logic (Animasi Lebih Mulus)
let currentImages = [];
let currentIndex = 0;

function openGallery(imagesArray) {
  const modal = document.getElementById("imageModal");
  currentImages = imagesArray;
  currentIndex = 0;

  modal.style.display = "flex";
  updateModalContent();
  document.body.style.overflow = "hidden"; // Berhenti scroll web di latar
}

function updateModalContent() {
  const modalImg = document.getElementById("expandedImg");
  const caption = document.getElementById("caption");

  // Transisi gambar
  modalImg.style.opacity = 0;
  modalImg.style.transform = "scale(0.95)";

  setTimeout(() => {
    modalImg.src = currentImages[currentIndex];
    caption.innerHTML = `🖼️ Gambar ${currentIndex + 1} / ${currentImages.length}`;
    modalImg.style.opacity = 1;
    modalImg.style.transform = "scale(1)";
  }, 200); // Jeda kecil untuk efek fade
}

function changeImage(step) {
  currentIndex = currentIndex + step;

  if (currentIndex < 0) {
    currentIndex = currentImages.length - 1;
  }

  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }

  updateModalContent();
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.opacity = 0;
  setTimeout(() => {
    modal.style.display = "none";
    modal.style.opacity = 1; // Reset opacity untuk buka selanjutnya
    document.body.style.overflow = "auto"; // Kembalikan fungsi scroll web
  }, 300);
}

// Tutup modal jika area gelap di luar gambar diklik
window.addEventListener("click", function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (document.getElementById("imageModal").style.display === "flex") {
    if (e.key === "ArrowRight") {
      changeImage(1);
    }

    if (e.key === "ArrowLeft") {
      changeImage(-1);
    }

    if (e.key === "Escape") {
      closeModal();
    }
  }
});
