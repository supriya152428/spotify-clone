console.log("Welcome to Spotify");

// Initial Values
let songIndex = 0;
let audioElement = new Audio('Blue.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songList'));

// Songs list
let songs = [
  { songName: "Blue", filepath: "Blue.mp3", coverpath: "blue.jpg" },
  { songName: "Dandelions", filepath: "Dandelions.mp3", coverpath: "download (1).jpg" },
  { songName: "Night Changes", filepath: "One Direction - Night Changes.mp3", coverpath: "Regalos Personalizados en 24h _ Transparent Gift.jpg" },
  { songName: "One Dance", filepath: "SpotiDown.App - One Dance - Drake.mp3", coverpath: "I and that _no face_ guy in my dream_.jpg" },
  { songName: "Co2", filepath: "Prateek Kuhad Co2 _ Prateek Ku.mp3", coverpath: "Screenshot 2025-11-28 194622.png" },
  { songName: "Memories", filepath: "memories-430937.mp3", coverpath: "bg.jpg" },
  { songName: "Bring me back", filepath: "bring-me-back-283196.mp3", coverpath: "Screenshot 2025-11-28 194211.png" }
];

// Set song names & covers dynamically
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/pause master button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Change music by slider
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all small play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
}

// Individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
  element.addEventListener('click', (e) => {
    if (audioElement.src !== songs[index].filepath) {
      audioElement.src = songs[index].filepath;
      audioElement.currentTime = 0;
    }

    if (audioElement.paused) {
      makeAllPlays();
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.play();
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    }

    masterSongName.innerText = songs[index].songName;
    songIndex = index;
  });
});
