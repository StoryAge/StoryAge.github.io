// Index.js

// Menu Open Close
var burger = document.querySelector('.burger');
var menu = document.querySelector('#'+ burger.dataset.target);
burger.addEventListener('click', function() {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
});


// Sticky navbar
var navbar = document.querySelector(".navbar");
var sticky = navbar.offsetTop + 1;
window.addEventListener('scroll', function() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("is-fixed-top")
    } else {
        navbar.classList.remove("is-fixed-top");
    }
});

// Animate css animator
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

// Carousel(SlideShow)
function getCurrentCarouselSlide() {
    var dots = document.getElementsByClassName("carousel-dot");
    var finded = 0;
    for (i = 0; i < dots.length; i++) {
        const currentDot = dots[i];      
        if (currentDot.classList.contains("carousel-active-dot")) {
            finded = i;
        }
    }
    return finded;
}
function showCarouselSlide(carouselSlide) {
    var i;
    var slides = document.getElementsByClassName("carousel-slide");
    var dots = document.getElementsByClassName("carousel-dot");
    var slideIndex = (carouselSlide !== '++' && carouselSlide !== '--' ? carouselSlide : (getCurrentCarouselSlide() + 1));
    if (carouselSlide === '++') { slideIndex++ }
    if (carouselSlide === '--') { slideIndex-- }
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" carousel-active-dot", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " carousel-active-dot";
    console.log(slideIndex + " : " + slides.length)
}