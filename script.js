document.querySelectorAll('.thumbnail').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0; // Reset the video to the start
    });
});