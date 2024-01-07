var audio = document.getElementById('audio');
var playPauseButton = document.getElementById('playPauseButton');
var progressContainer = document.getElementById('progressContainer');
var progressBar = document.getElementById('progressBar');

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseButton.textContent = 'Play';
  }
}

audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
  var progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
}

audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    playPauseButton.textContent = 'Play';
  });