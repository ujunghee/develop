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
                loadPage('deco_spring.html')
            }
            if(event.target.classList.contains('blue')) {
                loadPage('deco_summer.html')
            }
            if(event.target.classList.contains('orange')) {
                loadPage('deco_autumn.html')
            }
            if(event.target.classList.contains('snowblue')) {
                loadPage('deco_winter.html')
            }

            // 뒤로가기
            if (event.target.classList.contains('back')) {
                loadPage('select.html')
            }
        })
    })
})


// swiper
function sildeSwiper() {
    var swiper = new Swiper(".slider-list", {
        // loop: true,
        spaceBetween: 9,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
    })
    new Swiper(".slider", {
        // loop: true,
        thumbs: {
            swiper: swiper,
        },
    })
}