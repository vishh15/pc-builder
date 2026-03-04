const THEME_KEY = "pcBuilderTheme";

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);
  const toggles = document.querySelectorAll("[data-theme-toggle]");
  toggles.forEach((toggle) => {
    toggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  });
};

const initThemeToggle = () => {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);

  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    });
  });
};

const initNavbarScroll = () => {
  const nav = document.querySelector(".navbar");
  if (!nav) {
    return;
  }

  const update = () => {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
};

const initActiveNav = () => {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar nav a").forEach((link) => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
};

initThemeToggle();
initNavbarScroll();
initActiveNav();
