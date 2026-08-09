// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});


// ================= CLOSE MENU =================

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


// ================= NAVBAR EFFECT =================

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 40) {

        navbar.style.boxShadow =
            "0 8px 25px rgba(30, 20, 10, 0.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


// ================= VIDEO PAUSE =================

const videos = document.querySelectorAll("video");

videos.forEach(function (video) {

    video.addEventListener("play", function () {

        videos.forEach(function (otherVideo) {

            if (otherVideo !== video) {
                otherVideo.pause();
            }

        });

    });

});
