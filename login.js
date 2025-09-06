// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBVJgqD79MXrKbU2okML4wzlMym7yaLxio",
  authDomain: "v11rutop.firebaseapp.com",
  projectId: "v11rutop",
  storageBucket: "v11rutop.firebasestorage.app",
  messagingSenderId: "664984661004",
  appId: "1:664984661004:web:357ea8a60723b000e55229",
  measurementId: "G-DMPEGNPVEN"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// UI elements
const loginBtn = document.getElementById("googleLogin");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Login with Google
loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    userInfo.textContent = `Welcome, ${user.displayName} (${user.email})`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } catch (error) {
    console.error(error);
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  userInfo.textContent = "";
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
});

// Track auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = `Welcome, ${user.displayName} (${user.email})`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    userInfo.textContent = "";
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
});
