document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".js-slide");
    const bullets = document.querySelectorAll(".js-bullet");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let slideIndex = 0;

    let autoPlayTimer = null;

    const AUTO_PLAY_TIME = 5000;

    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === slideIndex) {
                slide.classList.add("is-active");
                bullets[index].classList.add("slider-bullet_active");
            } else {
                slide.classList.remove("is-active");
                bullets[index].classList.remove("slider-bullet_active");
            }
        })
    }

    function previousSlide() {
        slideIndex -= 1;

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        updateSlider();
        resetAutoPlay();
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlider();
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_TIME);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", () => {
            slideIndex = index;
            updateSlider();
            resetAutoPlay();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", previousSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
    }

    updateSlider();
    startAutoPlay();

})
