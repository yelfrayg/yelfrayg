document.addEventListener("DOMContentLoaded", () => {
    const lightSwitch = document.querySelector(".light-switch");

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

    toggleMenu();
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
}

function toggleMenu() {
    const menu = document.querySelector("aside");
    const menuButton = document.querySelector(".menu-button");

    menuButton.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");

        if (isOpen) {
            menu.style.bottom = "30%";
        } else {
            const hiddenOffset = Math.ceil(menu.offsetHeight / 5) * 4;
            menu.style.bottom = `-${hiddenOffset}px`;
        }
    });
}