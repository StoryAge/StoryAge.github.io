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