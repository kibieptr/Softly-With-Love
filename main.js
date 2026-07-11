// ---------- CONFIG ----------
// Ganti tanggal ini ke tanggal mulai kalian jadian / kenal, format: YYYY-MM-DD
const START_DATE = new Date("2026-07-04");

// ---------- TYPING EFFECT ----------
function typeText(elId, text, speed, onDone) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);
  let i = 0;
  function step() {
    if (i < text.length) {
      cursor.insertAdjacentText("beforebegin", text[i]);
      i++;
      // Keep the typing cursor in view as the letter grows, so new
      // lines never get hidden below the bottom of the screen.
      keepCursorVisible(cursor);
      setTimeout(step, speed);
    } else {
      cursor.remove();
      if (onDone) onDone();
    }
  }
  step();
}

function keepCursorVisible(cursor) {
  const rect = cursor.getBoundingClientRect();
  const margin = 90; // breathing room from the bottom edge (buttons, footer, etc.)
  if (rect.bottom > window.innerHeight - margin) {
    const offset = rect.bottom - (window.innerHeight - margin);
    window.scrollBy({ top: offset, left: 0, behavior: "smooth" });
  }
}

const letter1 = `Hai Fitria. 🤍

Aku tahu akhir-akhir ini banyak hal yang lagi kamu pikirin. Mungkin ada hari-hari di mana semuanya terasa berat, sampai kamu bingung harus mulai dari mana.

Tapi aku ingin kamu tahu satu hal.

Kamu bukan orang yang egois.

Kamu juga bukan beban buat siapa pun.

Kalau kamu lagi capek, itu bukan berarti kamu lemah.

Kalau kamu lagi banyak pikiran, itu bukan berarti kamu gagal.

Setiap orang punya waktunya sendiri untuk merasa lelah, dan itu sangat manusiawi.

Jangan pernah merasa bersalah hanya karena kamu sedang berusaha menyembuhkan hati dan pikiranmu.

Aku melihat semua perjuanganmu.

Walaupun mungkin orang lain tidak menyadarinya, aku tahu kamu sudah berusaha semampu yang kamu bisa.

Dan buat aku...

Itu sudah lebih dari cukup.`;

const letter2 = `Fitria...

Jangan terlalu keras sama diri sendiri ya.

Kamu nggak harus selalu kuat setiap saat.

Nggak apa-apa kalau hari ini kamu memilih untuk istirahat.

Nggak apa-apa kalau kamu butuh waktu buat nenangin semuanya.

Aku bangga sama kamu.

Bukan karena kamu selalu terlihat kuat.

Tapi karena kamu tetap bertahan, meskipun banyak hal yang mungkin tidak pernah kamu ceritakan.

Kalau suatu saat dunia terasa terlalu berat...

Datang ke aku.

Cerita ke aku.

Diam di samping aku juga nggak apa-apa.

Aku mungkin nggak selalu punya jawaban.

Aku mungkin nggak bisa menghilangkan semua rasa sedihmu.

Tapi aku akan selalu punya waktu untuk mendengarkanmu.

Aku akan tetap memilih untuk menemani kamu.

Sedikit demi sedikit...

Kita lewati semuanya bersama.

Terima kasih sudah bertahan sejauh ini.

Terima kasih sudah menjadi Fitria yang selama ini aku kenal.

Dan kalau suatu hari nanti kamu lupa seberapa berharganya dirimu...

Aku akan selalu mengingatkanmu.

Karena buat aku...

Kamu sangat berharga.

Aku sayang banget sama kamu.

Hari ini.

Besok.

Dan selama Tuhan masih mengizinkan aku menemani perjalananmu.`;

// ---------- SCENE NAVIGATION ----------
const scene0 = document.getElementById("scene0");
const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");
const envelopeBtn = document.getElementById("envelopeBtn");
const toScene2Btn = document.getElementById("toScene2");
const toScene3Btn = document.getElementById("toScene3");

function openEnvelope() {
  // This click is a real user gesture, so it's the most reliable
  // place to start the background music.
  tryPlayMusic();

  scene0.classList.remove("active");
  scene1.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  typeText("letter1", letter1, 28, () => {
    toScene2Btn.classList.add("show");
  });
}

envelopeBtn.addEventListener("click", openEnvelope);
envelopeBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openEnvelope();
  }
});

toScene2Btn.addEventListener("click", () => {
  scene1.classList.remove("active");
  scene2.classList.add("active");
  typeText("letter2", letter2, 24, () => {
    // Jump straight to the "Hari Bersama" section instantly, before
    // the counting-up animation starts.
    const daysBlock = document.querySelector(".days-block");
    daysBlock.scrollIntoView({ behavior: "auto", block: "center" });
    updateDays();
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
});

toScene3Btn.addEventListener("click", () => {
  scene2.classList.remove("active");
  scene3.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------- DAYS COUNTER ----------
function updateDays() {
  const now = new Date();
  const diffMs = now - START_DATE;
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const el = document.getElementById("daysCount");
  const sub = document.getElementById("daysSince");
  let count = 0;
  const timer = setInterval(() => {
    count += Math.ceil(days / 40) || 1;
    if (count >= days) {
      count = days;
      clearInterval(timer);
    }
    el.textContent = count;
  }, 25);
  sub.textContent =
    "sejak " +
    START_DATE.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
}

// ---------- VIRTUAL HUG ----------
const hugPopup = document.getElementById("hugPopup");
document.getElementById("hugBtn").addEventListener("click", () => {
  burstHearts(90);
  setTimeout(() => hugPopup.classList.add("show"), 500);
});
document.getElementById("closeHug").addEventListener("click", () => {
  hugPopup.classList.remove("show");
});

function burstHearts(n) {
  const emojis = ["🤍", "💗", "💕"];
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "burst-heart";
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 14 + Math.random() * 18 + "px";
      const dur = 3 + Math.random() * 2.5;
      h.style.animationDuration = dur + "s";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), dur * 1000 + 100);
    }, i * 25);
  }
}

// ---------- MUSIC (autoplay, no buttons) ----------
const music = document.getElementById("bgMusic");
music.volume = 0.6;

function tryPlayMusic() {
  const p = music.play();
  if (p !== undefined) {
    p.catch(() => {
      // Blocked because there's still no user gesture yet (e.g. page
      // was opened but envelope hasn't been touched). It will retry
      // on the very next click/tap/key anywhere on the page.
    });
  }
}

// Try right away in case the browser allows it.
window.addEventListener("DOMContentLoaded", tryPlayMusic);

// Fallback: catch the very first interaction anywhere on the page
// (clicking the envelope already triggers this directly, this is
// just an extra safety net for any other kind of first interaction).
function unlockMusicOnce() {
  if (music.paused) {
    tryPlayMusic();
  }
  document.removeEventListener("click", unlockMusicOnce);
  document.removeEventListener("touchstart", unlockMusicOnce);
  document.removeEventListener("keydown", unlockMusicOnce);
}
document.addEventListener("click", unlockMusicOnce);
document.addEventListener("touchstart", unlockMusicOnce);
document.addEventListener("keydown", unlockMusicOnce);

// ---------- KIRIM BALASAN (WhatsApp) ----------
const WHATSAPP_NUMBER = "6285188915925";
const replyText = document.getElementById("replyText");
const sendReplyBtn = document.getElementById("sendReplyBtn");

sendReplyBtn.addEventListener("click", () => {
  const msg = replyText.value.trim();
  if (!msg) {
    replyText.focus();
    replyText.classList.add("shake");
    setTimeout(() => replyText.classList.remove("shake"), 400);
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

// ---------- AMBIENT FLOATING HEARTS + STARS ----------
const ambient = document.getElementById("ambient");

function spawnAmbientHeart() {
  const h = document.createElement("div");
  h.className = "float-heart";
  h.textContent = Math.random() > 0.5 ? "🤍" : "💗";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 12 + Math.random() * 16 + "px";
  const dur = 10 + Math.random() * 10;
  h.style.animationDuration = dur + "s";
  h.style.bottom = "-40px";
  ambient.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
setInterval(spawnAmbientHeart, 1400);
for (let i = 0; i < 5; i++) setTimeout(spawnAmbientHeart, i * 400);

function spawnStars(n) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = 1 + Math.random() * 2;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDelay = Math.random() * 3 + "s";
    ambient.appendChild(s);
  }
}
spawnStars(40);
