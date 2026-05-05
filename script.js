// ===============================
// I G A L U S  –  SCRIPT COMPLET
// ===============================

const profiles = [
  {
    name: "Alex, 23",
    bio: "Master design • Café • Lifestyle urbain",
    photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&h=600"
  },
  {
    name: "Camille, 24",
    bio: "Communication • Mode • Photo",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=600"
  },
  {
    name: "Jordan, 22",
    bio: "École de commerce • Sport & voyages",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&h=600"
  },
  {
    name: "Lina, 25",
    bio: "Architecture • Art contemporain",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=600"
  },
  {
    name: "Noah, 26",
    bio: "Ingénierie • Tech vibes • Créatif",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=600"
  }
];

let index = 0;

// DOM
const card = document.getElementById("card");
const photo = document.getElementById("photo");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const likeLabel = document.getElementById("likeLabel");
const nopeLabel = document.getElementById("nopeLabel");
const likeBtn = document.getElementById("likeBtn");
const nopeBtn = document.getElementById("nopeBtn");

// Load profile
function loadProfile() {
  const p = profiles[index];
  photo.src = p.photo;
  nameEl.textContent = p.name;
  bioEl.textContent = p.bio;
}
loadProfile();

// Swipe logic
let startX = 0;
let currentX = 0;
const SWIPE_LIMIT = 120;

function move(x) {
  currentX = x - startX;
  card.style.transform =
    `translateX(${currentX}px) rotate(${currentX / 12}deg)`;

  likeLabel.style.opacity = currentX > 0 ? Math.min(currentX / 100, 1) : 0;
  nopeLabel.style.opacity = currentX < 0 ? Math.min(-currentX / 100, 1) : 0;
}

function release() {
  if (currentX > SWIPE_LIMIT) swipe("right");
  else if (currentX < -SWIPE_LIMIT) swipe("left");
  else reset();
}

function swipe(direction) {
  card.style.transition = "transform 0.3s";
  card.style.transform =
    direction === "right"
      ? "translateX(1000px) rotate(30deg)"
      : "translateX(-1000px) rotate(-30deg)";

  setTimeout(() => {
    index = (index + 1) % profiles.length;
    reset(true);
    loadProfile();
  }, 300);
}

function reset(hard = false) {
  card.style.transition = hard ? "none" : "transform 0.3s";
  card.style.transform = "translateX(0)";
  currentX = 0;
  likeLabel.style.opacity = 0;
  nopeLabel.style.opacity = 0;
}

// Mobile
card.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  card.style.transition = "none";
});
card.addEventListener("touchmove", e => move(e.touches[0].clientX));
card.addEventListener("touchend", release);

// Desktop
card.addEventListener("mousedown", e => {
  startX = e.clientX;
  card.style.transition = "none";
  document.onmousemove = e => move(e.clientX);
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    release();
  };
});

// Buttons
likeBtn.onclick = () => swipe("right");
nopeBtn.onclick = () => swipe("left");
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("authMessage");

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      message.style.color = "green";
      message.textContent = "✅ Compte créé avec succès";
      console.log("Utilisateur créé :", userCredential.user.email);
    })
    .catch(error => {
      message.style.color = "red";
      message.textContent = error.message;
      console.error(error);
    });
}
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("✅ Utilisateur connecté :", user.email);
    document.getElementById("authBox").style.display = "none";
  } else {
    console.log("❌ Aucun utilisateur connecté");
  }
});
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "Veuillez remplir tous les champs";
    message.style.color = "red";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      message.style.color = "green";
      message.textContent = "✅ Connecté avec succès";
      console.log("Utilisateur connecté :", userCredential.user.email);
    })
    .catch(error => {
      message.style.color = "red";
      message.textContent = error.message;
      console.error(error);
    });
}
``
