
const video = document.getElementById('mainvideo');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.textContent = 'Pause'; // Change button text to "Pause"
    } else {
        video.pause();
        playButton.textContent = 'Play'; // Change button text back to "Play"
    }
});
