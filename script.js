
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide-img');
const dots = document.querySelectorAll('.dot');
const slider = document.querySelector('.slider-slide');

let currentSlide = 0;
let intervalId = null;

function goToSlide(index) {
  const offset = -index * 100;
  track.style.transform = `translateX(${offset}vw)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function startSlider() {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 3000);
}

goToSlide(currentSlide);
startSlider();

function isOutsideSlider(e) {
  return !slider.contains(e.relatedTarget);
}

// ✅ 修正ポイント：ドットクリックしても「mouseleave扱い」にならないように
slider.addEventListener('mouseover', () => {
  clearInterval(intervalId);
  intervalId = null;
});

slider.addEventListener('mouseout', (e) => {
  if (isOutsideSlider(e)) {
    startSlider();
  }
});

// ✅ ドットクリックしても問題なく再スタート
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    startSlider();
  });
});




//ログイン、アウト
/*
 type="module"
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyB-kZseSpbFLvXYVBy5bmsw-M2jHVorLZ8",
    authDomain: "cariaid.firebaseapp.com",
    projectId: "cariaid",
    storageBucket: "cariaid.appspot.com",
    messagingSenderId: "388903287463",
    appId: "1:388903287463:web:60cfe73f87131e47db7982"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const container = document.getElementById("auth-button-container");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ログイン中 → ログアウトボタンを表示
      container.innerHTML = `<button onclick="logout()">Logout</button>`;
    } else {
      // 未ログイン → ログインページへ誘導
      container.innerHTML = `<a href="loguin_en.html">Login</a>`;
    }
  });

  // ログアウト処理
  window.logout = async function () {
    await signOut(auth);
    location.reload(); // 状態を更新
  };
*/
