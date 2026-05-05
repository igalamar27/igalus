// ================= PROFILS DEMO =================
const profiles = [
  { name: "Alex, 23", bio: "Design • Ville", photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe" },
  { name: "Camille, 24", bio: "Communication • Mode", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
  { name: "Jordan, 22", bio: "Commerce • Sport", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12" }
];

let index = 0;

// ================= DOM =================
const card = document.getElementById("card");
const photo = document.getElementById("photo");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const likeLabel = document.getElementById("likeLabel");
const nopeLabel = document.getElementById("nopeLabel");
const likeBtn = document.getElementById("likeBtn");
const nopeBtn = document.getElementById("nopeBtn");
const authBox = document.getElementById("authBox");
const loginBox = document.getElementById("loginBox");

// ================= FIREBASE =================
const auth = firebase.auth();
const db = firebase.firestore();

// ================= PROFIL =================
function loadProfile() {
  const p = profiles[index];
  photo.src = p.photo;
  nameEl.textContent = p.name;
  bioEl.textContent = p.bio;
}

// ================= AUTH =================
function register() {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        email: cred.user.email,
        premium: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => authMessage.textContent = "✅ Compte créé")
    .catch(e => authMessage.textContent = e.message);
}

function login() {
  auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(() => loginMessage.textContent = "✅ Connecté")
    .catch(e => loginMessage.textContent = e.message);
}

// ================= SWIPE =================
let startX = 0, currentX = 0;
const LIMIT = 120;

function move(x) {
  currentX = x - startX;
  card.style.transform = `translateX(${currentX}px) rotate(${currentX/12}deg)`;
  likeLabel.style.opacity = currentX > 0 ? Math.min(currentX/100,1) : 0;
  nopeLabel.style.opacity = currentX < 0 ? Math.min(-currentX/100,1) : 0;
}

function release() {
  if (!auth.currentUser) {
    alert("Connecte-toi pour swiper");
    reset();
    return;
  }
  if (Math.abs(currentX) > LIMIT) swipe();
  else reset();
}

function swipe() {
  card.style.transition = "transform .3s";
  card.style.transform = currentX > 0 ? "translateX(1000px)" : "translateX(-1000px)";
  setTimeout(() => {
    index = (index + 1) % profiles.length;
    reset(true);
    loadProfile();
  }, 300);
}

function reset(hard=false) {
  card.style.transition = hard ? "none" : "transform .3s";
  card.style.transform = "translateX(0)";
  currentX = 0;
  likeLabel.style.opacity = 0;
  nopeLabel.style.opacity = 0;
}

// Touch + Mouse
card.addEventListener("touchstart", e => startX = e.touches[0].clientX);
card.addEventListener("touchmove", e => move(e.touches[0].clientX));
card.addEventListener("touchend", release);
card.addEventListener("mousedown", e => {
  startX = e.clientX;
  document.onmousemove = e => move(e.clientX);
  document.onmouseup = () => {
    document.onmousemove = null;
    release();
  };
});
likeBtn.onclick = swipe;
nopeBtn.onclick = swipe;

// ================= ÉTAT UTILISATEUR =================
auth.onAuthStateChanged(user => {
  if (user) {
    authBox.style.display = "none";
    loginBox.style.display = "none";
    card.style.display = "block";
    loadProfile();
  } else {
    authBox.style.display = "block";
    loginBox.style.display = "block";
    card.style.display = "none";
  }
});
