/*************************
 *  I G A L U S
 *  Script complet
 *************************/

/* ======================
   PROFILS (démo)
====================== */
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
  }
];

let index = 0;

/* ======================
   ÉLÉMENTS DOM
====================== */
// Carte & profil
const card = document.getElementById("card");
const photo = document.getElementById("photo");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");

// Labels
const likeLabel = document.getElementById("likeLabel");
const nopeLabel = document.getElementById("nopeLabel");

// Boutons
const likeBtn = document.getElementById("likeBtn");
const nopeBtn = document.getElementById("nopeBtn");

// Auth UI
const authBox = document.getElementById("authBox");
const loginBox = document.getElementById("loginBox");

/* ======================
   FIREBASE AUTH
====================== */
// Ces objets existent parce que
// firebase.initializeApp(...) est dans index.html
// et Firebase SDK est chargé
const auth = firebase.auth();

/* ======================
   AFFICHER UN PROFIL
====================== */
function loadProfile() {
  const p = profiles[index];
  photo.src = p.photo;
  nameEl.textContent = p.name;
  bioEl.textContent = p.bio;
}
loadProfile();

/* ======================
   SWIPE LOGIC
====================== */
let startX = 0;
let currentX = 0;
const SWIPE_LIMIT = 120;

function isLoggedIn() {
  return auth.currentUser !== null;
}

function move(x) {
  currentX = x - startX;
  card.style.transform =
    `translateX(${currentX}px) rotate(${currentX / 12}deg)`;

  likeLabel.style.opacity = currentX > 0 ? Math.min(currentX / 100, 1) : 0;
  nopeLabel.style.opacity = currentX < 0 ? Math.min(-currentX / 100, 1) : 0;
}

function release() {
  if (!isLoggedIn()) {
    alert("Vous devez vous inscrire ou vous connecter");
    reset();
    return;
  }

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

// Boutons
likeBtn.onclick = () => swipe("right");
nopeBtn.onclick = () => swipe("left");

/* ======================
   INSCRIPTION
====================== */
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("authMessage");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      msg.textContent = "✅ Compte créé";
      msg.style.color = "green";
    })
    .catch(err => {
      msg.textContent = err.message;
      msg.style.color = "red";
    });
}

/* ======================
   CONNEXION
====================== */
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMessage");

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      msg.textContent = "✅ Connecté";
      msg.style.color = "green";
    })
    .catch(err => {
      msg.textContent = err.message;
      msg.style.color = "red";
    });
}

/* ======================
