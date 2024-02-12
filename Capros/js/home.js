var audio = document.getElementById('audio');
var playPauseButton = document.getElementById('playPauseButton');
var progressContainer = document.getElementById('progressContainer');
var progressBar = document.getElementById('progressBar');

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseButton.classList.remove('fa-play');
    playPauseButton.classList.add('fa-pause');
  } else {
    audio.pause();
    playPauseButton.classList.remove('fa-pause');
    playPauseButton.classList.add('fa-play');
  }
}

audio.addEventListener('ended', function() {
  audio.currentTime = 0;
  playPauseButton.classList.remove('fa-pause');
  playPauseButton.classList.add('fa-play');
});


function goBack() {
 window.location.href = 'index.html';
}

function clickPreSave(){
  window.open('https://distrokid.com/hyperfollow/capros/barcelona', '_blank');
}