// 🚀 Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  initRippleEffect();
  initCardTilt();
  initScrollAnimations();
  initActiveSidebar();
  initHoverSound(optional = false);
});

function initRippleEffect() {
    const buttons = document.querySelectorAll(".btn");
  
    buttons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;
  
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
        circle.classList.add("ripple");
  
        const ripple = this.querySelector(".ripple");
        if (ripple) ripple.remove();
  
        this.appendChild(circle);
      });
    });
  }

  function initCardTilt() {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const rotateX = ((y - centerY) / 20) * -1;
        const rotateY = (x - centerX) / 20;
  
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });
  }

  function initScrollAnimations() {
    const elements = document.querySelectorAll(".fade-up");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });
  
    elements.forEach(el => observer.observe(el));
  }


  function initActiveSidebar() {
    const items = document.querySelectorAll(".sidebar-item");
  
    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }


  const searchInput = document.querySelector(".search-bar input");

if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchInput.parentElement.classList.add("active");
  });

  searchInput.addEventListener("blur", () => {
    searchInput.parentElement.classList.remove("active");
  });
}

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  const aiBox = document.querySelector(".ai-box");
const aiToggle = document.querySelector(".ai-toggle");

if (aiToggle && aiBox) {
  aiToggle.addEventListener("click", () => {
    aiBox.classList.toggle("open");
  });
}

function randomFloat() {
    const floatEls = document.querySelectorAll(".float");
  
    floatEls.forEach(el => {
      const duration = Math.random() * 2 + 3;
      el.style.animationDuration = `${duration}s`;
    });
  }
  
  randomFloat();

  function initHoverSound(enabled) {
    if (!enabled) return;
  
    const sound = new Audio("hover.mp3");
  
    document.querySelectorAll(".btn, .card").forEach(el => {
      el.addEventListener("mouseenter", () => {
        sound.currentTime = 0;
        sound.play();
      });
    });
  }

  
