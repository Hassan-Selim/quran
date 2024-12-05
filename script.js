const apiUrl = "https://mp3quran.net/api/v3";
const reciters = "reciters";
const language = "ar";

async function getReciters() {
  const chooseReciter = document.querySelector("#chooseReciter");
  const res = await fetch(`${apiUrl}/reciters?language=${language}`);
  const data = await res.json();
  chooseReciter.innerHTML = `<option value="">اختر قارئ</option>`;
  data.reciters.forEach(
    (reciter) =>
      (chooseReciter.innerHTML += `<option value ="${reciter.id}">${reciter.name}</option>`)
  );
  chooseReciter.addEventListener("change", (e) => getMoshaf(e.target.value));
}

getReciters();

async function getMoshaf(reciter) {
  const chooseMoshaf = document.querySelector("#chooseMoshaf");
  const res = await fetch(
    `${apiUrl}/reciters?language=${language}&reciter=${reciter}`
  );
  const data = await res.json();
  const moshafs = data.reciters[0].moshaf;
  chooseMoshaf.innerHTML = `<option value="" data-server="" data-surahList="">اختر رواية</option>`;
  moshafs.forEach((moshaf) => {
    chooseMoshaf.innerHTML += `<option value ="${moshaf.id}"
                                    data-server="${moshaf.server}"
                                    data-surahList="${moshaf.surah_list}"
                                    >${moshaf.name}</option>`;
  });

  chooseMoshaf.addEventListener("change", (e) => {
    const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
    const surahServer = selectedMoshaf.dataset.server;
    const surahList = selectedMoshaf.dataset.surahlist;
    getSurah(surahServer, surahList);
  });

  //getSurah(e.target.value));

  async function getSurah(surahServer, surahList) {
    const chooseSurah = document.querySelector("#chooseSurah");

    const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    const surahNames = data.suwar;

    surahList = surahList.split(",");
    chooseSurah.innerHTML = `<option value="">اختر سورة</option>`;
    surahList.forEach((surah) => {
      const padSurah = surah.padStart(3, "0");

      surahNames.forEach((surahName) => {
        if (surahName.id == surah) {
          chooseSurah.innerHTML += `<option value ="${surahServer}${padSurah}.mp3">${surahName.name}</option>`;
        }
      });
    });
  }
  chooseSurah.addEventListener("change", (e) => {
    const selectedSurah = chooseSurah.options[chooseSurah.selectedIndex];
    playSurah(selectedSurah.value);
  });
}
function playSurah(surahMp3) {
  const audioPlayer = document.querySelector("#audio");
  audioPlayer.src = surahMp3;
  audioPlayer.play();
}
const radioAudio = document.querySelector("#radio-audio");
const roqiaAudio = document.querySelector("#roqia-audio");
const audioPlayer = document.querySelector("#audio");
const moshaf = document.querySelector(".moshf");
const roqia = document.querySelector(".roqia");
const radio = document.querySelector(".radio");
const blog = document.querySelector(".blog");
const moshf = document.querySelector(".count");
const redio = document.querySelector(".count2");
const ruqia = document.querySelector(".count3");

function showRuqia() {
  roqia.classList.add("active");
  radio.classList.remove("active");
  moshaf.classList.remove("active");
  blog.classList.remove("active");
  ruqia.style.display = "flex";
  moshf.style.display = "none";
  redio.style.display = "none";
  radioAudio.pause();
  audioPlayer.pause();
}
function showRedio() {
  radio.classList.add("active");
  roqia.classList.remove("active");
  moshaf.classList.remove("active");
  blog.classList.remove("active");
  redio.style.display = "flex";
  moshf.style.display = "none";
  ruqia.style.display = "none";
  roqiaAudio.pause();
  audioPlayer.pause();
}
function showMoshf() {
  moshaf.classList.add("active");
  roqia.classList.remove("active");
  radio.classList.remove("active");
  blog.classList.remove("active");
  moshf.style.display = "flex";
  redio.style.display = "none";
  ruqia.style.display = "none";
  radioAudio.pause();
  roqiaAudio.pause();
}
function showBlog() {
  blog.classList.add("active");
  moshaf.classList.remove("active");
  roqia.classList.remove("active");
  radio.classList.remove("active");
}
