async function playVideo() {
    try {
        const heroVideo = document.getElementById('hero-video');
        if (!heroVideo) {
            throw new Error(`No heroVideo found for video`);
        }

        await heroVideo.play();

        heroVideo.classList.add('is-playing');
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', playVideo)
