// Initialize AOS

AOS.init({
  duration: 800, // Default animation duration
  easing: "ease-in-out", // Default easing
  once: true, // Animation happens only once
  offset: 100, // Trigger animations 100px before element comes into view
  delay: 0, // Default delay
});

// Optional: Refresh AOS on window resize
window.addEventListener("resize", function () {
  AOS.refresh();
});
