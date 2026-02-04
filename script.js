// Search toggle
const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
if (searchIcon && searchContainer) {
  searchIcon.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
  });
}

// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu when mouse leaves the menu or the hamburger (desktop).
  let menuCloseTimer = null;
  const closeMenu = () => mobileMenu.classList.remove('active');
  const scheduleClose = () => {
    clearTimeout(menuCloseTimer);
    menuCloseTimer = setTimeout(closeMenu, 250);
  };
  const cancelClose = () => clearTimeout(menuCloseTimer);

  mobileMenu.addEventListener('mouseleave', scheduleClose);
  mobileMenu.addEventListener('mouseenter', cancelClose);
  hamburger.addEventListener('mouseleave', scheduleClose);
  hamburger.addEventListener('mouseenter', cancelClose);
}

function swapImage(el) {
  // If gallery slides exist, activate the corresponding slide
  const gallery = el.closest('.product-gallery');
  if (gallery) {
    const slides = Array.from(gallery.querySelectorAll('.slide'));
    const thumbs = Array.from(gallery.querySelectorAll('.thumbs img'));
    const idx = thumbs.indexOf(el);
    if (idx >= 0 && slides[idx]) {
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      return;
    }
  }
  const main = document.getElementById("mainImage");
  if (main) main.src = el.src;
}

// Initialize layered galleries: arrows, thumbnails, and hover behavior
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-gallery').forEach(gallery => {
    const slides = Array.from(gallery.querySelectorAll('.slide'));
    const thumbs = Array.from(gallery.querySelectorAll('.thumbs img'));
    const prev = gallery.querySelector('.arrow.prev');
    const next = gallery.querySelector('.arrow.next');
    let current = slides.findIndex(s => s.classList.contains('active'));
    if (current < 0) current = 0;

    const show = idx => {
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      current = idx;
    };

    if (prev) prev.addEventListener('click', () => show((current - 1 + slides.length) % slides.length));
    if (next) next.addEventListener('click', () => show((current + 1) % slides.length));

    thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));

    // Optional: change slide on hover left/right areas
    gallery.addEventListener('mousemove', (e) => {
      // nothing by default; arrows appear via CSS on hover
    });
  });
});
