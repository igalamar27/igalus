function signup() {
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      return db.collection("users").doc(user.user.uid).set({
        prenom: prenom,
        email: email,
        likes: [],
        matches: []
      });
    })
    .then(() => {
      alert("Compte créé !");
      window.location.href = "app.html";
    })
    .catch(err => alert(err.message));
}
``
