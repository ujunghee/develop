// const _ = window._
// const {gsap} = window

//ajax
function loadPage(page, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', page, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText

                const selecpage = ['select.html']
                const decopage = ['deco_spring.html', 'deco_summer.html', 'deco_autumn.html', 'deco_winter.html']

                
                if (decopage.includes(page)) {
                    navigation()
                    sildeSwiper()
                    objectItem()
                    palettebg()
                    initDraggableComposition()
                }

                if (selecpage.includes(page)) {
                    select()
                }
            }

            if (callback) callback()
        }
    }
    xhr.send()

}

window.loadPage = loadPage

// load 
document.addEventListener('DOMContentLoaded', function () {
    loadPage('first.html', function () {

        document.addEventListener('click', function (event) {

            // 시작하기
            if (event.target.classList.contains('start')) {
                loadPage('select.html', select)
            }
            
            // 계절선택
            if(event.target.classList.contains('pink')) {
                sessionStorage.setItem('selectedSeason', 'deco_spring.html');
                loadPage('deco_spring.html')
            }
            if(event.target.classList.contains('blue')) {
                sessionStorage.setItem('selectedSeason', 'deco_summer.html');
                loadPage('deco_summer.html')
            }
            if(event.target.classList.contains('orange')) {
                sessionStorage.setItem('selectedSeason', 'deco_autumn.html');
                loadPage('deco_autumn.html')
            }
            if(event.target.classList.contains('snowblue')) {
                sessionStorage.setItem('selectedSeason', 'deco_winter.html');
                loadPage('deco_winter.html')
            }

            // 뒤로가기
            if (event.target.classList.contains('select-prev')) {
                loadPage('select.html')
            }
            if (event.target.classList.contains('season-prev')) {
                loadPage(sessionStorage.getItem('selectedSeason'));
            }

            // 완성하기
            if(event.target.classList.contains('submit')) {
                loadPage('last.html')
            }

            // 다시하기
            if(event.target.classList.contains('first')) {
                loadPage('first.html')
            }
            
            // 솔브케이 클릭
            if(event.target.classList.contains('solvek')) {
                const solvek = document.querySelector('.last')
                const headerarrow = document.querySelector('.back')

                if(solvek.classList.contains('white')) {
                    solvek.classList.remove('white')
                    solvek.classList.add('black')
                    headerarrow.classList.add('deco-prev')
                    headerarrow.classList.remove('season-prev')
                }
            }
            
            // 뒤로가기
            if(event.target.classList.contains('deco-prev')) {
                loadPage('last.html')
            }
            
        })
    })
})


// swiper
function sildeSwiper() {
    var swiper = new Swiper(".slider-list", {
        // loop: true,
        spaceBetween: 9,
        slidesPerView: 2,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            320: {
                slidesPerView: 5,
            },
            420: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            960: {
                slidesPerView: 2,
            }
        },
    })
    new Swiper(".slider", {
        // loop: true,
        thumbs: {
            swiper: swiper,
        },
       
    })
}