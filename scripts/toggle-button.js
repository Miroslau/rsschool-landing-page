const themeButton = document.getElementById('theme-button');
const rootElement = document.documentElement;

function getTheme() {
    const theme = localStorage.getItem('theme');

    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === 'dark' || (!theme && prefersDarkTheme)) {
        rootElement.classList.add('dark-theme');
    } else {
        rootElement.classList.remove('dark-theme');
    }
}

function toggleTheme() {
    rootElement.classList.toggle('dark-theme');

    if (rootElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

getTheme()

if (themeButton) {
    themeButton.addEventListener('click', toggleTheme)
}

