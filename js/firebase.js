<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "TON_API_KEY",
    authDomain: "TON_DOMAINE",
    projectId: "igalus",
    storageBucket: "TON_BUCKET",
    messagingSenderId: "TON_ID",
    appId: "TON_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
</script>
