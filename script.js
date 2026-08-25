document.addEventListener("DOMContentLoaded", () => {
    const lightSwitch = document.querySelector(".light-switch");

    updateCursor("#000000");

    lightSwitch.addEventListener("click", (_) => {
        if (lightSwitch.classList.contains("night")) {
            lightSwitch.classList.remove("night");
            lightSwitch.classList.add("day");
            switchMode("light");
        } else if (lightSwitch.classList.contains("day")) {
            lightSwitch.classList.remove("day");
            lightSwitch.classList.add("night");
            switchMode("dark");
        }
    });

});

document.addEventListener("projectsLoaded", () => {
    pressdfButton();
})

// Wenn nach unten gescrollt wird soll der Header verschwinden und beim nach oben scrollen wieder erscheinen

let lastScrollY = window.scrollY;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Verhindert negatives Scrollen (z. B. Elastic Scrolling auf iOS)
  if (currentScrollY < 0) return;

  // Nach unten scrollen -> Verstecken | Nach oben scrollen -> Zeigen
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.classList.add('header--hidden');
  } else {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentScrollY;
});

function switchMode(color) {
    const themes = {
        default: {
            "--color-heading": "#000000",
            "--color-bg": "#ffffff",
            "--color-primary": "#414141",
            "--color-secondary": "#8b44444b",
        },
        night: {
           "--color-heading": "#ffffff",
            "--color-bg": "#080808",
            "--color-primary": "#DADADA",
            "--color-secondary": "#d4d4d424",
        },
    };

    let selectedTheme;

    if (color == "light") {
        selectedTheme = themes.default;
    } else {
        selectedTheme = themes.night;
    }

    // Theme anwenden
    const root = document.documentElement;
    Object.entries(selectedTheme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    updateCursor(selectedTheme["--color-heading"]);
}

function updateCursor(color) {
    const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2" fill="${color}"/></svg>`;
    const cursorUrl = `url("data:image/svg+xml,${encodeURIComponent(cursorSvg)}") 4 4, auto`;

    document.body.style.cursor = cursorUrl;
}

// function toggleMenu() {
//     const menu = document.querySelector("aside");
//     const menuButton = document.querySelector(".menu-button");

//     menuButton.addEventListener("click", () => {
//         const isOpen = menu.classList.toggle("open");

//         if (isOpen) {
//             menu.style.bottom = "30%";
//         } else {
//             const hiddenOffset = Math.ceil(menu.offsetHeight / 5) * 4;
//             menu.style.bottom = `-${hiddenOffset}px`;
//         }
//     });
// }

function pressdfButton() {
    const dfBtn = document.querySelector(".df-btn");
    const dfProject = document.getElementById("project-3");
    dfBtn.addEventListener("click", () => {
        const offset = 40;
        const topPosition = dfProject.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
    })
}