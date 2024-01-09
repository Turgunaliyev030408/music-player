const playBtn = document.getElementById("play");
const previous = document.getElementById("previous");
const forward = document.getElementById("forward");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const container = document.querySelector(".container");
const musicVoice = document.getElementById("music-voice");
const playIcon = document.getElementById("playIcon");
const progres = document.getElementById("progres");

const musics = [
  "Eminem - Mockingbird",
  "Eminem - Lose Yourself",
  "Xcho - Ты и Я",
  "Гио Пика - Буйно голова",
  "Гио Пика - Едет-Катится (Adam Maniac Remix)",
  "Гио Пика - Листопадом",
  "Гио Пика - Чёрный Дельфин",
  "Каспийский Груз feat. Гио Пика - На Белом",
  "Кравц feat. Гио Пика - Опять Дожди"
];

let currentMusicIndex = 0;

const currentMusic = (index) => {
  audio.src = `../music/${musics[index]}.mp3`;
  cover.src = `../images/${musics[index]}.jpg`;
  title.textContent = musics[index];
};

currentMusic(currentMusicIndex);

playBtn.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    pauseMusic();
  } else {
    playMusic();
  }
});

forward.addEventListener("click", () => {
  forwardSong();
});

previous.addEventListener("click", () => {
  if (currentMusicIndex > 0) {
    currentMusicIndex--;
  } else {
    currentMusicIndex = musics.length - 1;
  }
  currentMusic(currentMusicIndex);
  playMusic();
});
function playMusic() {
  audio.play();
  playIcon.setAttribute("class", "fa-solid fa-pause");
  container.classList.add("play");
}
function pauseMusic() {
  audio.pause();
  container.classList.remove("play");
  playIcon.setAttribute("class", "fa-solid fa-play");
}
function forwardSong() {
  if (currentMusicIndex > 0) {
    currentMusicIndex--;
  } else {
    currentMusicIndex = musics.length - 1;
  }
  currentMusic(currentMusicIndex);
  playMusic();
}

musicVoice.addEventListener("input", (e) => {
  audio.volume = musicVoice.value / 10;
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  innerProgress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener("timeupdate", (e) => {
  console.log(e.target.currentTime);
});

audio.addEventListener("ended", (e) => {
  forwardSong();
});
