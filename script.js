

// Mobile Navigation Toggle
const nav_btn = document.querySelector("#nav-toggle");
const nav = document.querySelector("nav");
let navIsOpen = false;

function nav_toggle() {
  if (navIsOpen) {
    nav.classList.remove("active");
    nav_btn.innerHTML = "=";
  } else {
    nav.classList.add("active");
    nav_btn.innerHTML = "x";
  }
  navIsOpen = !navIsOpen;
}

// Header Scrolling Effect
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  const scrollThreshold = 80;

  function handleScroll() {
    let scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      header.classList.add("scroll-down");
    } else if (scrollTop <= scrollThreshold) {
      header.classList.remove("scroll-down");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener("scroll", handleScroll, false);
});

// Hero stars
const hero = document.querySelector("#hero");

for (let i = 0; i < 100; i++) {
  let x = Math.random() * 100;
  let y = Math.random() * 100;
  let size = Math.random() * 3 + 1;
  let speed = Math.random() * 1.75 + 1.5;
  hero.innerHTML +=
    '<span class="star" style="width: ' +
    size +
    "px; height: " +
    size +
    "px; top: " +
    x +
    "%; left: " +
    y +
    "%; --speed: " +
    speed +
    's; z-index: -1; "></span>';
}
