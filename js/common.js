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

                const selecpage = ['select.html']
                const decopage = ['deco_spring.html', 'deco_summer.html', 'deco_autumn.html', 'deco_winter.html']

                if (decopage.includes(page)) {
                    decoEvent();
                    sildeSwiper();
                }

                if (selecpage.includes(page)) {
                    select();
                }
            }

            if (callback) callback();
        }
    };
    xhr.send();

}

// load 
document.addEventListener('DOMContentLoaded', function () {
    loadPage('first.html', function () {

        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('start')) {
                loadPage('select.html', select);
                
            }
        })
    });
})

//select page
function select() {
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const colors = {
        spring: 'pink',
        summer: 'blue',
        autumn: 'orange',
        winter: 'snowblue'
    };

    function checkActiveSeason(swiper) {
        const button = document.querySelector('.button');
        if (!button) return;

        const realIndex = swiper.realIndex;
        const activeSeason = seasons[realIndex];

        if (activeSeason) {
            Object.values(colors).forEach(color => button.classList.remove(color));
            button.classList.add(colors[activeSeason]);
        }
    }

    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        // loopedSlides: 4,
        initialSlide: 0,
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
            clickable: true,
            type: 'bullets',
        },
        on: {
            init: function(swiper) {
                checkActiveSeason(swiper);
            },
            slideChange: function (swiper) {
                let slides = document.querySelectorAll(".swiper-slide");
                slides.forEach((slide) => {
                    if (slide.classList.contains("swiper-slide-active")) {
                        slide.style.transform = "translateY(0)";
                    } else if (slide.classList.contains("swiper-slide")) {
                        slide.style.transform = "translateY(30px)";
                        slide.style.transition = ".6s";
                    }
                });
                
                checkActiveSeason(swiper);

                // pagination 수동 업데이트
                swiper.pagination.render();
                swiper.pagination.update();
            }
        }
    });
    return swiper;
}
const swiper = select();


window.loadPage = loadPage;

// click event


// swiper
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