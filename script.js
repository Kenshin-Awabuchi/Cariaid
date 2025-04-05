
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
