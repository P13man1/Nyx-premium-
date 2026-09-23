// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with persistence
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector(".theme-icon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  icon.textContent = theme === "light" ? "☀" : "☾";
}

let saved = "dark";
try {
  saved = localStorage.getItem("theme") || "dark";
} catch (e) {
  // localStorage may be unavailable (private mode); fall back to default
}
applyTheme(saved);

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // ignore write failures
  }
});

// Reveal-on-scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}
