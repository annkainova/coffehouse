const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const links = document.querySelectorAll(".nav__link");
const body = document.body;

burger.addEventListener("click", function () {
  toggleNav();
});

links.forEach((link) =>
  link.addEventListener("click", function () {
    if (nav.classList.contains("open")) {
      toggleNav();
    }
  })
);

function toggleNav() {
  nav.classList.toggle("open");
  body.classList.toggle("no-scroll");
}