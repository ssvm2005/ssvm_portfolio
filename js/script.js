const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".main-nav");

function setTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  themeToggle.querySelector(".theme-icon").textContent = dark ? "☼" : "◐";
  themeToggle.querySelector(".theme-label").textContent = dark ? "Light mode" : "Dark mode";
  document.querySelector('meta[name="theme-color"]').content = dark ? "#171717" : "#f7f5f0";
  try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("portfolio-theme") || "light"; } catch (_) {}
setTheme(savedTheme);
themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));
}


/* =====================================
   HOME SECTION - UPDATED TYPOGRAPHY
===================================== */

body {
  font-family: 'Space Grotesk', sans-serif;
}

.wordmark,
.main-nav,
.hero-kicker,
.eyebrow,
.mono-note {
  font-family: 'Space Mono', monospace;
}

.wordmark {
  gap: 8px;
}

.hero {
  display: flex;
  min-height: 570px;
  align-items: center;
  padding-top: 75px;
  padding-bottom: 75px;
}

.hero-copy {
  width: 100%;
  max-width: 900px;
}

.hero h1 {
  max-width: 900px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(48px, 7vw, 88px);
  line-height: 1.08;
  letter-spacing: -0.055em;
}

.hero-summary {
  max-width: 700px;
  font-size: 17px;
  line-height: 1.8;
}

.hero-kicker {
  margin-top: 34px;
  margin-bottom: 24px;
  font-size: 13px;
  letter-spacing: 0.08em;
}

/* Remove old hero illustration and location layout */

.hero-art,
.hero-bottom {
  display: none !important;
}

/* Mobile layout */

@media (max-width: 620px) {
  .hero {
    min-height: 0;
    padding-top: 65px;
    padding-bottom: 75px;
  }

  .hero h1 {
    font-size: clamp(43px, 12vw, 65px);
  }

  .hero-summary {
    font-size: 15px;
  }
}

