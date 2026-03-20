document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-pill");
  const menuToggle = document.querySelector(".menu-toggle");
  const topbar = document.querySelector(".topbar");
  const sosBubble = document.querySelector(".sos-bubble");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      topbar?.classList.remove("nav-open");
    });
  });

  menuToggle?.addEventListener("click", () => {
    topbar?.classList.toggle("nav-open");
  });

  sosBubble?.addEventListener("click", () => {
    window.alert("Shadow Guardian activated. Emergency contacts, live location sharing, and safe route monitoring would trigger here.");
  });
});
