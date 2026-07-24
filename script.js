const links = {
  github: "https://github.com/ali79hm/kde.jalaliCalendar",
  store: "https://store.kde.org/",
};

document.querySelectorAll("[data-link]").forEach((link) => {
  link.href = links[link.dataset.link];
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  nav.classList.toggle("open", !isOpen);
});

const tabs = [...document.querySelectorAll('[role="tab"]')];

function selectTab(selectedTab) {
  tabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !selected;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});
