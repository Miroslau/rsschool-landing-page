document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.querySelector(".burger-button");
    const burgerMenu = document.querySelector(".header-burger-menu");
    const menuLinks = document.querySelectorAll(".burger-navigation__link, .burger-menu__button");
    const bodyElement = document.body;

    function toggleMenu() {
        burgerButton.classList.toggle("is-active");
        burgerMenu.classList.toggle("is-active");
        bodyElement.classList.toggle("lock-scroll");
    }

    function closeMenu() {
        if (burgerButton && burgerMenu.classList.contains("is-active")) {
            burgerButton.classList.remove("is-active");
            burgerMenu.classList.remove("is-active");
            bodyElement.classList.remove("lock-scroll");
        }
    }

    if (burgerButton) {
        burgerButton.addEventListener("click", toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    })

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeMenu();
        }
    })

    const desktopBreakPoint = window.matchMedia("(max-width: 1024px)");

    function handleBreakpointChange(event) {
        if (event.matches) {
            closeMenu();
        }

    }

    desktopBreakPoint.addEventListener("change", handleBreakpointChange);

})
