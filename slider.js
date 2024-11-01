const coffeeBox = document.querySelectorAll(".favorite-coffee__wrapper");
const cardCoffee = document.querySelectorAll(".coffee");
const sliderBox = document.querySelector(".slider-bar");
const sliders = document.querySelectorAll(".slider");
const sliderLine = document.querySelector(".favorite-coffee__line");
const buttonNext = document.querySelector(".button-arrow--next");
const buttonPrev = document.querySelector(".button-arrow--prev");
let currentCardIndex = 0;
let width;
let autoSlideInterval;
let startTouch = 0;
let endTouch = 0;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveToNextSlide();
  }, 5000);
  toggleSlider();
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function moveToNextSlide() {
  currentCardIndex++;
  if (currentCardIndex >= cardCoffee.length) {
    currentCardIndex = 0;
  }
  changeCard();
}

function moveToPrevSlide() {
  currentCardIndex--;
  if (currentCardIndex < 0) {
    currentCardIndex = cardCoffee.length - 1;
  }
  changeCard();
}

function changeCard() {
  let widthCard = cardCoffee[0].offsetWidth;

  const offset = currentCardIndex * widthCard;
  sliderLine.style.transform = "translateX(-" + offset + "px)";
  toggleSlider();
}

function toggleSlider() {
  sliders.forEach((slider) => slider.classList.remove("slider-active"));
  sliders.forEach((slider) => slider.classList.remove("slider-unactive"));

  sliders[currentCardIndex].classList.toggle("slider-active");
  if (currentCardIndex === 0) {
    sliders[2].classList.toggle("slider-unactive");
  }
  sliders[currentCardIndex - 1].classList.toggle("slider-unactive");
}

sliderLine.addEventListener("touchstart", (e) => {
  const firstTouch = e.touches[0];
  startTouch = firstTouch.clientX;
});

sliderLine.addEventListener("touchmove", (e) => {
  const lastTouch = e.touches[0];
  endTouch = lastTouch.clientX;
});

sliderLine.addEventListener("touchend", function () {
  handleSwipe();
});

function handleSwipe() {
  const minSwipe = 50;
  if (endTouch + minSwipe < startTouch) {
    stopAutoSlide();
    moveToNextSlide();
    startAutoSlide();
  }
  if (startTouch + minSwipe < endTouch) {
    stopAutoSlide();
    moveToPrevSlide();
    startAutoSlide();
  }
}

buttonNext.addEventListener("click", function () {
  stopAutoSlide();
  moveToNextSlide();
  startAutoSlide();
});

buttonPrev.addEventListener("click", function () {
  stopAutoSlide();
  moveToPrevSlide();
  startAutoSlide();
});

// coffeeBox.forEach((box) => {
//   box.addEventListener("mouseover", () => {
//     stopAutoSlide();
//   });

//   box.addEventListener("mouseout", () => {
//     startAutoSlide();
//   });
// });

function resize() {
  widthCard = cardCoffee[0].offsetWidth;
  changeCard();
}

window.addEventListener("resize", resize);
startAutoSlide();
