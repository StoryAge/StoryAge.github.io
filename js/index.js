// Index.js

// Menu Open Close
function menuToggler() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+ burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
}

// Sticky navbar
function stickyNavbar() {
    var navbarContainer = document.querySelector("#Navbar");
    var navbar = document.querySelector(".navbar");
    var sticky = navbarContainer.offsetTop + 1;

    var fixTop = function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("is-fixed-top")
        } else {
            navbar.classList.remove("is-fixed-top");
        }
    }
    
    window.addEventListener('scroll', fixTop);
    fixTop();
}

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
}

// Drag Scroll
function bindDragScroll(dragScrollElement) {
    var dragScroll = dragScrollElement ? dragScrollElement: document.querySelector('.drag-scroll');
    dragScroll.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        dragScroll.style.cursor = 'grabbing';
        dragScroll.style.userSelect = 'none';

        pos = {
            left: dragScroll.scrollLeft,
            top: dragScroll.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        disableMiddleMouseScroll(e);

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        document.addEventListener('dragleave', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        dragScroll.scrollTop = pos.top - dy;
        dragScroll.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        dragScroll.style.cursor = 'grab';
        dragScroll.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('dragleave', mouseUpHandler);
    };

    const disableMiddleMouseScroll = function (e) {
        if(e.button == 1) {
            e.preventDefault();
            return false;
        }
    }

    // Attach the handler
    dragScroll.addEventListener('mousedown', mouseDownHandler);
}
