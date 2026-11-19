
const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const main = document.getElementById("main");

let opened = false;

// Opening the invitation
openBtn.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");
  openBtn.textContent = "OPENING YOUR INVITATION...";

  setTimeout(() => {
    intro.style.transition = "opacity 1.5s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      main.classList.remove("hidden");
      document.getElementById("musicBtn").hidden = false;
      window.scrollTo(0, 0);
    }, 1500);
  }, 1500);
});

// Wedding countdown
const weddingDate = new Date("2025-12-25T00:00:00");

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;

  if (difference <= 0) {
    document.getElementById("countdown").style.display = "none";
    document.getElementById("countdownMessage").textContent =
      "Forever Begins Here ♥";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Floating rose petals
const petalsContainer = document.getElementById("petals");

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > .5 ? "❀" : "♥";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.fontSize = (12 + Math.random() * 15) + "px";
  petal.style.animationDuration = (7 + Math.random() * 8) + "s";

  petalsContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 16000);
}

setInterval(createPetal, 700);

// Golden particles
const particlesContainer = document.getElementById("particles");

for (let i = 0; i < 35; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.animationDelay = Math.random() * 3 + "s";
  particlesContainer.appendChild(particle);
}

// Background music
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "♫";
    } catch {
      alert("Please add romantic-music.mp3 to your website folder.");
    }
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

// RSVP through WhatsApp
document.getElementById("rsvpForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guestCount").value;
  const attendance = document.getElementById("attendance").value;

  const message =
    `Wedding RSVP for Hamza & Hannah\n` +
    `Guest: ${name}\n` +
    `Number of guests: ${guests}\n` +
    `Response: ${attendance}`;

  // Replace with the couple's WhatsApp number, including country code.
  const whatsappNumber = "";

  if (!whatsappNumber) {
    document.getElementById("rsvpMessage").textContent =
      "Thank you! Your RSVP details are ready. Please connect a WhatsApp number to send them.";
    return;
  }

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
