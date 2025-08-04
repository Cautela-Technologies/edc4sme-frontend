const hamburger = document.getElementById("hamburger");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileLinks = document.querySelectorAll(
  ".mobile-nav-links a, .mobile-login-btn"
);

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileOverlay.classList.contains("active")
    ? "hidden"
    : "";
});

// Close menu when clicking on links
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Close menu when clicking outside
mobileOverlay.addEventListener("click", (e) => {
  if (e.target === mobileOverlay) {
    hamburger.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Handle escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileOverlay.classList.contains("active")) {
    hamburger.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("currentYearFooter").textContent =
  new Date().getFullYear();
