// const _ = window._;
// const {gsap} = window;

//ajax
function loadPage(page, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText

                const decopage = ['deco_spring.html', 'deco_summer.html', 'deco_autumn.html', 'deco_winter.html']
                if (decopage.includes(page)) {
                    decoEvent();
                    sildeSwiper();
                }
            }

            if (callback) callback();
        }
    };
    xhr.send();

}
document.addEventListener('DOMContentLoaded', function () {
    loadPage('deco_spring.html', function () {
        Swieprobx();
    });

});

window.loadPage = loadPage;

//swiper 
function Swieprobx() {
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: "1.5",
        coverflowEffect: {
            rotate: 0,
            slideShadows: false,
        },
        breakpoints: {
            320: {
                spaceBetween: 20,
            },
            420: {
                spaceBetween: 30,
            },
            768: {
                spaceBetween: 50,
            },
            960: {
                spaceBetween: 50,
            }
        },
        pagination: {
            el: ".swiper-pagination",
        },
        on: {
            slideChange: function () {
                let slides = document.querySelectorAll(".swiper-slide");
                slides.forEach((slide) => {
                    if (slide.classList.contains("swiper-slide-active")) {
                        slide.style.transform = "translateY(0)";
                    }

                    if (slide.classList.contains("swiper-slide")) {
                        slide.style.transform = "translateY(30px)";
                        slide.style.transition = ".6s";
                    }
                })
            }
        }
    });
};

function sildeSwiper() {
    var swiper = new Swiper(".slider-list", {
        loop: true,
        spaceBetween: 9,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
      });
      new Swiper(".slider", {
        loop: true,
        thumbs: {
          swiper: swiper,
        },
      });
}