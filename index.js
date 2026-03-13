console.log("Welcome to Spotify");

// ----------------------
// Navigation Functionality
// ----------------------
const navItems = document.querySelectorAll(".navItem");
const contentContainer = document.getElementById("contentContainer");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const section = item.getAttribute("data-section");

    if(section === "home") {
      contentContainer.innerHTML = `
        <h1 id="vibes">Soft Beats, Soft Hearts ✨</h1>
        <p>Welcome to your favorite songs collection!</p>
      `;
    } else if(section === "about") {
      contentContainer.innerHTML = `
        <h1>About This App</h1>
        <p>This is a Spotify clone made with HTML, CSS, and JavaScript. 🎵</p>
        <p>Click on any song to play it and manage your music library!</p>
      `;
    } else if(section === "songs") {
      // Render Songs Section dynamically
      let html = `<h1>All Songs 🎶</h1><div class="songItemContainer">`;
      songs.forEach((song, index) => {
        html += `
          <div class="songList">
            <img src="${song.coverpath}" alt="">
            <span class="songName">${song.songName}</span>
            <span class="songlistplay">
              <span class="timestamp">03:45 <i class="far fa-2x fa-play-circle songItemPlay" data-index="${index}"></i></span>
            </span>
          </div>
        `;
      });
      html += `</div>`;
      contentContainer.innerHTML = html;

      // Attach event listeners to new song buttons
      attachSongListeners();
    }
  });
});

// ----------------------
// Songs Setup
// ----------------------
let songIndex = 0;
let audioElement = new Audio('Blue.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songs = [
  { songName: "Blue", filepath: "Blue.mp3", coverpath: "blue.jpg" },
  { songName: "Dandelions", filepath: "Dandelions.mp3", coverpath: "download (1).jpg" },
  { songName: "Night Changes", filepath: "One Direction - Night Changes.mp3", coverpath: "Regalos Personalizados en 24h _ Transparent Gift.jpg" },
  { songName: "One Dance", filepath: "SpotiDown.App - One Dance - Drake.mp3", coverpath: "I and that _no face_ guy in my dream_.jpg" },
  { songName: "Co2", filepath: "Prateek Kuhad Co2 _ Prateek Ku.mp3", coverpath: "Screenshot 2025-11-28 194622.png" },
  { songName: "Memories", filepath: "memories-430937.mp3", coverpath: "bg.jpg" },
  { songName: "Bring me back", filepath: "bring-me-back-283196.mp3", coverpath: "Screenshot 2025-11-28 194211.png" },
  { songName: "Sunset Dreams", filepath: "SunsetDreams.mp3", coverpath: "sunset.jpg" }
];

// ----------------------
// Master Play/Pause
// ----------------------
masterPlay.addEventListener('click', () => {
  if(audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
    gif.style.opacity = 0;
  }
});

// ----------------------
// Progress Bar
// ----------------------
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
});

// ----------------------
// Next & Previous Buttons
// ----------------------
document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex+1) % songs.length;
  playSong(songIndex);
});

document.getElementById('prev').addEventListener('click', () => {
  songIndex = (songIndex-1+songs.length) % songs.length;
  playSong(songIndex);
});

// ----------------------
// Function to play a song
// ----------------------
function playSong(index){
  audioElement.src = songs[index].filepath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[index].songName;
  masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
}

// ----------------------
// Attach listeners to individual song buttons dynamically
// ----------------------
function attachSongListeners(){
  const songItemPlays = document.querySelectorAll('.songItemPlay');
  songItemPlays.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = parseInt(button.getAttribute('data-index'));
      if(audioElement.src !== songs[index].filepath){
        audioElement.src = songs[index].filepath;
        audioElement.currentTime = 0;
      }

      if(audioElement.paused){
        audioElement.play();
        makeAllPlays();
        button.classList.replace('fa-play-circle','fa-pause-circle');
        masterPlay.classList.replace('fa-play-circle','fa-pause-circle');
        gif.style.opacity = 1;
      } else {
        audioElement.pause();
        button.classList.replace('fa-pause-circle','fa-play-circle');
        masterPlay.classList.replace('fa-pause-circle','fa-play-circle');
        gif.style.opacity = 0;
      }

      masterSongName.innerText = songs[index].songName;
      songIndex = index;
    });
  });
}

// Reset all small play buttons
function makeAllPlays(){
  const allPlays = document.querySelectorAll('.songItemPlay');
  allPlays.forEach(btn => btn.classList.replace('fa-pause-circle','fa-play-circle'));
}