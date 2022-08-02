let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Sing Me To Sleep",
    artist: "Alan Walker",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
  {
    name: "Scarlet Fire",
    artist: "Otis Mcdonald",
    path: "https://doc-10-9g-docs.googleusercontent.com/docs/securesc/cutk53oj53q4mg8umqufei92glbkhhur/ceblmk312utfqmigrntm1607tl48ffbk/1659471000000/06196535892955136341/06196535892955136341/1nkEEetleVgLMQ7z_9tFqs3aJhv2iw_V7?e=open&ax=AI9vYm5cw9G5tTSaa8f5DT7MSj5JXo2UApAFgBHnxExOqDDoPhOYMD9AKLhfJN3eaGzvDHj9NqxR-vJEx70pv4yK94H4e9il7NEAcuTILmhCA0pT9D1fWQKrSsdsJjgPOyJ91mZ6wc8RuiId6r1B6lY0lBuPOlOND2TTh0vjBFDOCQsh4s0Z85U7CqVX8o4DadA4Ayk1rhNB_LM84a_S5tOkGKO3fTv700oSekpcWkk_DDRNG7A4BFPviTOCDrq_E8cjbrI4N_HM7slfIMm1ONf0hs5_YreGSlKEX_lR36Pejqx3gce0cmYXb2f5adWHQqnn_rNBlgHcFQnBaz-MjTdQhT6GPUWrbQWREDx1QW5OI7xJxnIocpeNa_j5NnOdH3b3lqo2COiohxflscjsWKGkCrZ0A3YmyGfQjUp_NEB1o4i_X8ZBoToqf_YSxRDBe0bd5xH8TcrDYb3UNYh_lPDIHotBxoJqq1hqV0kHLeFy4Qc5YdvbALp1ID8kK4o8sQYc23SH10Ef2C_5q_UnxeHw-p87lcI6n_wyUG9gbBJkha00mp7ZjODsA5YbI3oNip7GglXGJ-8oVKrnNzLQ3_npryCTEGlTK2AvCSP4phNT0BdlNOY2ng-eWRnFZYgrDZNdPj8l9TpEYOheH2iBDIkQBMB_zZP-SO0xPwv322ykdsztlrhR08atK8HlH8dMdj9KhpJ9DCoE4fqmVw&uuid=c740f3f9-b10a-423d-8c3a-1aad3cb80631&authuser=0"
  },
  {
    name: "I Remember U",
    artist: "Cartoon and Jüri Pootsmann",
    path: "https://doc-10-9g-docs.googleusercontent.com/docs/securesc/cutk53oj53q4mg8umqufei92glbkhhur/hi33ui725jv9u0md7klo6r8g94fpfvs4/1659467925000/06196535892955136341/06196535892955136341/1lHddDdvtQDhCJtHFxDpDdCiXwnX8nM41?e=open&ax=AI9vYm5P6kca32qHahEp-e-pfG4ubi0EdDu1tMoEITRAOYTCy940jtGbZu30uozK4kYk_5dgK5T36P91QQhMhfXwCaLYfV5FLeeHLYk9u8JPCN33FaRzsIlf0_rBLzyPTe4nfr3ob2GScpIr5ZfmxxrYBM6SvBXDx0oufnWcN4dnMsse39y85GSovkIRsfgTaPM2WVyTms7VIVPjBkqjmora2yzJDwg_nzWjPzkvJeO4yJd1prdwOmFNaHTWxlLoaMLO1cM-q537-OIVrTzgSgrzFc-gQfXcOGYwScL9ccFrvW3aqkI62FhFGnT8D7Ti--zbOo12uApUbAuDboVxF4mHpC0e9IiLi933PMEURrRhzQGyi3_pZkaLICqCO2mV_8nGrprJftL26nonk4Aqo5h0X2WYNzW3I7Lvqcz0iK9-h8_HX-mcVzx79B4F_46DHmnfthqwIpg8y7dFiKO6Q_Ot_rpx7Hz6k-1EI9deC_2kfk_sRHE6k0xABOfkWR26Fpasw8V9R8b9DWqfCf0K_AYRI7JTFSE9KIudQk8AbnhuWdIAwU3Z2SXAnmjqrHS8FSfru1mtyoVezhrLY3kx0b9i1esJEWRSInJEzo4p9o2RFBy5cJux6vSxn89nuvNiIKzBmbKIEPlIVCqJpBYDWMlFrVNpMBkKBo6M8Da2KkBZZl0-oNsXCaK3jQWtddaBtSei-Go0QAX8UAHIsw&uuid=a7b7223d-e5d6-424d-af40-d722b35945d5&authuser=0",
  },
  {
    name: "Be Right There (Boombox Remix)",
    artist: "Diplo",
    path: "https://doc-0s-9g-docs.googleusercontent.com/docs/securesc/cutk53oj53q4mg8umqufei92glbkhhur/9l8ctn646bfh1llvkcfgm3vq9a840kv3/1659467250000/06196535892955136341/06196535892955136341/1DfScoGTgrHJm2uSBGYJQ3zaKwweP8oKv?e=open&ax=AI9vYm64gSEuwLGcD4j2_QWE41iFeRAsCiKWo9NVGdNB9j_IL-tcFf5WCNIH7eiMlgjedn1nfGqVPK2sC_sghN1M8tDkHLlOBvtZqhBVVUqnxNF8aGix_wjN1S_VBeoCa1rApi6kpV51lrz-hPJEm8dpfpnQK-O9jZ0wZ6rfoVKeSYOMPo8bH7FSGSV5-AYBfgBOIYP7w44Xd66SRcMOQOBR-UZB39Z9T5ySTP5F0_rmLBxfnBGkKU1i8mGjX0AsnEqCg16HgnR3Ap9YF3O7UP1L4v1qWVsZqPHzvh-DpFprwuPkvYvF7FxCdCwJD7PNrH2FWNSPpOoDfFWTIVYou_hQwMQuu_RGdgfXS2JJb2_tiNecMB12I61beiBO0u7UFMUe9CeKCnjG_qYZDLdhHyi4aTyBammqI0WEjmA7z9XFldpQd22X0tbcRKJw_ZcXMZefsyc7hXoALW-ZyllRo1C3lkde0aXAyuGfH5eNBawIvjIEkALUwqnNRaNEtDrtXfulZJQ8ELXUYAn2qL7hhR2ZFk-u3RnkgNGTsuQVPSU7M3ETp9kFmIfwNz6xtdC-FeLXbCgwVLI3wA3-SWn96VZXvPTMoTnpZ6wRaWgeF_6Q8Xj7g2Mpw_RZe-jiVfXxH8b3bkILpYOyijYObwJ6w8Mw4Rj6uX1FvdjcVttiGO-4BKJcnk9GtZ8K0urrGbN5wEkPblM5LrU4OZKbjw&uuid=b334fd05-d767-426d-967d-752d04276b86&authuser=0&nonce=fk6pko4it239u&user=06196535892955136341&hash=nshnlqu89354vdlg3rao07ubeg7n6p82"
  }
];

/*function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}*/

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}