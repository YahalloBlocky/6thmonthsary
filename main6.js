// ════════════════════════════════════════
// FALLING PETALS
// ════════════════════════════════════════
const petalsWrap = document.getElementById('petals');
const petalEmojis = ['🌸', '🍓', '✿', '❀', '♡'];

function spawnPetal() {
  const el = document.createElement('div');
  el.className = 'fp';
  el.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  el.style.left = (Math.random() * 100) + 'vw';
  el.style.fontSize = (0.6 + Math.random() * 0.9) + 'rem';
  const dur = 7 + Math.random() * 9;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = (Math.random() * 3) + 's';
  petalsWrap.appendChild(el);
  setTimeout(() => el.remove(), (dur + 3) * 1000);
}

setInterval(spawnPetal, 1000);

// ════════════════════════════════════════
// ENVELOPE (index6.html only)
// ════════════════════════════════════════
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  document.getElementById('envFlap').classList.add('opened');
  document.getElementById('envSeal').classList.add('opened');

  setTimeout(() => {
    document.querySelector('.env-letter').classList.add('opened');
  }, 400);

  setTimeout(() => {
    document.getElementById('stage').classList.add('fade-out');
  }, 900);

  setTimeout(() => {
    document.getElementById('overlay').classList.add('show');
  }, 1300);

  setTimeout(() => {
    window.location.href = 'letter6.html';
  }, 1700);
}

// ════════════════════════════════════════
// MUSIC PLAYER (letter6.html only)
// ════════════════════════════════════════

// ── ADD YOUR SONGS HERE ──
// Place your mp3 files in a "songs/" folder
// and update the src paths below.
const songs = [
  { src: 'mm.MP3', title: 'Magkabilang Mundo Piano', artist: 'Jireh Lim' },
  // add more songs here:
  // { src: 'songs/another.mp3', title: 'Another Song', artist: 'Artist' },
];

let currentIndex = 0;
let isPlaying = false;
const audio = new Audio();

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startMusic() {
  const player = document.getElementById('music-player');
  if (!player || songs.length === 0) return;
  shuffle(songs);
  loadSong(0);
  player.classList.add('visible');
  audio.play()
    .then(() => { isPlaying = true; updatePlayBtn(); })
    .catch(() => { });
}

function loadSong(index) {
  currentIndex = index;
  audio.src = songs[currentIndex].src;
  updateSongInfo();
  updateProgress();
}

function updateSongInfo() {
  const t = document.getElementById('song-title');
  const a = document.getElementById('song-artist');
  if (t) t.textContent = songs[currentIndex].title;
  if (a) a.textContent = songs[currentIndex].artist;
}

function updatePlayBtn() {
  const btn = document.getElementById('play-btn');
  if (btn) btn.textContent = isPlaying ? '⏸' : '▶';
}

function togglePlay() {
  if (isPlaying) { audio.pause(); isPlaying = false; }
  else { audio.play(); isPlaying = true; }
  updatePlayBtn();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  if (isPlaying) audio.play();
}

audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
  const bar = document.getElementById('progress-bar');
  const cur = document.getElementById('current-time');
  const dur = document.getElementById('duration');
  if (audio.duration && bar) {
    bar.value = (audio.currentTime / audio.duration) * 100;
    if (cur) cur.textContent = fmt(audio.currentTime);
    if (dur) dur.textContent = fmt(audio.duration);
  }
}

function seek(val) {
  if (audio.duration) audio.currentTime = (val / 100) * audio.duration;
}

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// Auto-start music on the letter page
if (document.querySelector('.letter-page')) {
  window.addEventListener('load', startMusic);
}
