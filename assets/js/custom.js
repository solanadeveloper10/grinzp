(function ($) {
    //preloader js
    $(window).on('load', function () {
        $('.preloader').fadeOut(1000);
    })


    //Header
    var fixed_top = $("header");
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            fixed_top.addClass("header--fixed");
        } else {
            fixed_top.removeClass("header--fixed");
        }
    });

    //close mobile menu after clicking nav-link
    $(".nav-link").click(function () {
        $(".navbar-toggler").addClass("collapsed");
    });
    $(".nav-link").click(function () {
        $(".navbar-collapse").removeClass("show");
    });


    //Animation on Scroll initializing
    AOS.init();


    //Collection slider 1

    var swiper = new Swiper(".collection__thumb-slider-1", {
        spaceBetween: 20,
        direction: 'vertical',
        grabCursor: true,
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 1,
        },
        speed: 3000,
    });


    // collection slider 2
    var swiper = new Swiper(".collection__thumb-slider-2", {
        spaceBetween: 20,
        direction: 'vertical',
        grabCursor: true,
        loop: true,
        slidesPerView: 2,
        autoplay: {
            delay: 1,
            reverseDirection: true,
        },
        speed: 4000,
    });



    // Roadmap slider
    var swiper = new Swiper(".roadmap__slider", {
        spaceBetween: 20,
        grabCursor: true,
        slidesPerView: 1,
        autoplay: {
            delay: 1,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
        navigation: {
            nextEl: ".roadmap__next",
            prevEl: ".roadmap__prev",
        },
        speed: 4000,
    });


    //gallery slider
    var swiper = new Swiper(".gallery__slider", {
        effect: "coverflow",
        slidesPerView: 2,
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 20,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
                coverflowEffect: {
                    stretch: 50,
                    depth: 200,
                    modifier: 1,
                },
            },
            1400: {
                slidesPerView: 3,
                coverflowEffect: {
                    stretch: 100,
                    depth: 150,
                    modifier: .96,
                },
            },
        },
        loop: true,
        autoplay: {
            delay: 3000,
        },
    });

    //Countdown js initialization
    document.addEventListener('readystatechange', event => {
        if (event.target.readyState === "complete") {
            var clockdiv = document.getElementsByClassName("countdown__list");
            var countDownDate = new Array();
            for (var i = 0; i < clockdiv.length; i++) {
                countDownDate[i] = new Array();
                countDownDate[i]['el'] = clockdiv[i];
                countDownDate[i]['time'] = new Date(clockdiv[i].getAttribute('data-date')).getTime();
                countDownDate[i]['days'] = 0;
                countDownDate[i]['hours'] = 0;
                countDownDate[i]['seconds'] = 0;
                countDownDate[i]['minutes'] = 0;
            }

            var countdownfunction = setInterval(function () {
                for (var i = 0; i < countDownDate.length; i++) {
                    var now = new Date().getTime();
                    var distance = countDownDate[i]['time'] - now;
                    countDownDate[i]['days'] = Math.floor(distance / (1000 * 60 * 60 * 24));
                    countDownDate[i]['hours'] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    countDownDate[i]['minutes'] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    countDownDate[i]['seconds'] = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance < 0) {
                        countDownDate[i]['el'].querySelector('.countdown__number-days').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-hours').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-minutes').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.countdown__number-seconds').innerHTML = 0;
                    } else {
                        countDownDate[i]['el'].querySelector('.countdown__number-days').innerHTML = countDownDate[i]['days'];
                        countDownDate[i]['el'].querySelector('.countdown__number-hours').innerHTML = countDownDate[i]['hours'];
                        countDownDate[i]['el'].querySelector('.countdown__number-minutes').innerHTML = countDownDate[i]['minutes'];
                        countDownDate[i]['el'].querySelector('.countdown__number-seconds').innerHTML = countDownDate[i]['seconds'];
                    }
                }
            }, 1000);
        }
    });

    // document.addEventListener('DOMContentLoaded', () => {
    //     "use strict";

    //     // Add copy button
    //     const copyButton = document.getElementById('contract');
    //     const textToCopy = document.getElementById('contract-text');
    //     const copiedMssg = document.getElementById('contract-text-copied');

    //     copyButton.addEventListener('click', async () => {
    //         try {
    //             // Copy text to clipboard
    //             console.log(textToCopy, textToCopy.innerText)

    //             const textToCopyInnerText = textToCopy.innerText;

    //             await navigator.clipboard.writeText(textToCopyInnerText);
    //             // Show success message
    //             copiedMssg.style.display = 'flex';
    //             setTimeout(() => {
    //                 copiedMssg.style.display = 'none';
    //             }, 2000); // Hide the message after 2 seconds
    //         } catch (err) {
    //             console.error('Failed to copy text: ', err);
    //         }
    //     });
    // });

    document.addEventListener('DOMContentLoaded', function () {
        const overlay = document.querySelector('.hero-overlay');
        const hero = document.querySelector('.hero');

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (overlay && hero) {
            if (isTouchDevice) {
                // Only add touch events to the hero section, not the document
                hero.addEventListener('touchstart', handleTouch, { passive: true });
                hero.addEventListener('touchmove', handleTouch, { passive: true });
                hero.addEventListener('touchend', removeHover);
            } else {
                hero.addEventListener('mousemove', updatePosition);
                hero.addEventListener('mouseleave', removeHover);
            }

            function handleTouch(e) {
                // Remove preventDefault to allow scrolling
                const touch = e.touches[0];
                if (!touch) return;

                const rect = hero.getBoundingClientRect();
                if (touch.clientY >= rect.top && touch.clientY <= rect.bottom &&
                    touch.clientX >= rect.left && touch.clientX <= rect.right) {

                    targetX = touch.clientX - rect.left;
                    targetY = touch.clientY - rect.top;
                    overlay.classList.add('hover');
                } else {
                    removeHover();
                }
            }

            function updatePosition(e) {
                const rect = hero.getBoundingClientRect();
                targetX = e.clientX - rect.left;
                targetY = e.clientY - rect.top;
                overlay.classList.add('hover');
            }

            function removeHover() {
                overlay.classList.remove('hover');
            }

            function animate() {
                const ease = isTouchDevice ? 0.2 : 0.08; // Faster follow on mobile
                currentX = currentX + (targetX - currentX) * ease;
                currentY = currentY + (targetY - currentY) * ease;

                overlay.style.setProperty('--x', `${currentX}px`);
                overlay.style.setProperty('--y', `${currentY}px`);

                requestAnimationFrame(animate);
            }

            animate();
        }
    });

})(jQuery);
