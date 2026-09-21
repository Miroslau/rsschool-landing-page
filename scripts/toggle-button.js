const themeButton = document.getElementById('theme-button');
const rootElement = document.documentElement;
const logoImg = document.querySelector('.logo__img');
const cupIconImgs = document.querySelectorAll('.cup-icon__img');

const LIGHT_LOGO = './pictures/svg/logo.svg';
const DARK_LOGO = './pictures/svg/logo-light.svg';

const LIGHT_CUP_ICON = './pictures/svg/coffee-cup-light.svg';
const DARK_CUP_ICON = './pictures/svg/coffee-cup.svg';

function togglePathIcon(elements, newPath) {
    for (const element of elements) {
        element.src = newPath;
    }
}

function getTheme() {
    const theme = localStorage.getItem('theme');

    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === 'dark' || (!theme && prefersDarkTheme)) {
        rootElement.classList.add('dark-theme');
        if (logoImg) logoImg.src = DARK_LOGO;
        if (cupIconImgs.length) {
            togglePathIcon(cupIconImgs, LIGHT_CUP_ICON)
        }
    } else {
        rootElement.classList.remove('dark-theme');
        if (logoImg) logoImg.src = LIGHT_LOGO;
        if (cupIconImgs.length) {
            togglePathIcon(cupIconImgs, DARK_CUP_ICON)
        }
    }
}

function toggleTheme() {
    rootElement.classList.toggle('dark-theme');

    if (rootElement.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        if (logoImg) logoImg.src = DARK_LOGO;
        if (cupIconImgs.length) {
            togglePathIcon(cupIconImgs, LIGHT_CUP_ICON)
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (logoImg) logoImg.src = LIGHT_LOGO;
        if (cupIconImgs.length) {
            togglePathIcon(cupIconImgs, DARK_CUP_ICON)
        }
    }
}

getTheme()

if (themeButton) {
    themeButton.addEventListener('click', toggleTheme)
}

