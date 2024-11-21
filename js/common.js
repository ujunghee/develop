// const _ = window._

// const { opacity } = require("html2canvas/dist/types/css/property-descriptors/opacity")

// const { first } = require("lodash")

//ajax
function loadPage(page, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', page, true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText

                const firstpage = ['first.html']
                const selecpage = ['select.html']
                const decopage = ['deco_spring.html', 'deco_summer.html', 'deco_autumn.html', 'deco_winter.html']
                const lastpage = ['last.html']

                const isFirstVisit = firstpage.includes(page) && !sessionStorage.getItem('visited')

                if (firstpage.includes(page)) {
                    const loading = document.querySelector('.loading')
                    if(isFirstVisit) {
                        sessionStorage.setItem('visited', 'true');
                        loadAnimation(() => {
                            firstAnimation()
                        })
                    } else {
                        loading.style.display = 'none'
                        firstAnimation()
                    }
                }

                if (decopage.includes(page)) {
                    decoAnimaiton()
                    navigation()
                    sildeSwiper()
                    objectItem()
                    palettebg()
                    initDraggableComposition()
                    setupHeaderActions()
                }

                if (selecpage.includes(page)) {
                    seletAnimation()
                    select()
                }

                if (lastpage.includes(page)) {
                    last()
                }
            }

            if (callback) callback()
        }
    }
    xhr.send()

}

// 로딩 
function loadAnimation(callback) {
    const loading = document.querySelector('.loading')
    const $counter = document.querySelector('.count')

    if (!loading || !$counter) return

    let tl = gsap.timeline({
        onComplete: () => {
            setTimeout(() => {
                const counter = ($counter, max) => {
                    let now = 0
                    const duration = 1500 // 2초
                    const interval = 10 // 50ms마다 업데이트
                    const steps = duration / interval
                    const increment = max / steps

                    const handle = setInterval(() => {
                        now += increment
                        $counter.innerHTML = Math.min(Math.round(now), max)
                        if (now >= max) {
                            clearInterval(handle)
                            if (callback) callback()
                        }
                    }, interval)
                }

                if (document.readyState === 'complete') {
                    counter($counter, 100)
                } else {
                    window.addEventListener('load', () => counter($counter, 100))
                }
            })
        }
    })
    setTimeout(() => {
        loading.style.transform = 'translateY(-10px)'
        loading.style.opacity = '0'
        loading.style.visibility = 'hidden'
    }, 1500)

    return tl
}
// 헤더 액션 설정 함수
function setupHeaderActions() {
    const header = document.querySelector('.header .submit')
    if (!header) return

    header.removeEventListener('click', handleHeaderClick)
    header.addEventListener('click', handleHeaderClick)
}

// 헤더 클릭 이벤트 핸들러
function handleHeaderClick(event) {
    if (!event.target.closest('.season-prev') && !event.target.closest('.first')
        && !event.target.closest('.select-prev')) {
        const decoBox = document.querySelector('.deco-box')
        if (!decoBox) return

        // lastAinmation()

        html2canvas(decoBox, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            ignoreElements: (element) => {
                return element.classList.contains('reset')
            }
        }).then(canvas => {
            const imageDataUrl = canvas.toDataURL('image/png')
            const currentState = {
                decoBoxImage: imageDataUrl,
                background: decoBox.style.background || '',
            }


            localStorage.setItem('cardState', JSON.stringify(currentState))

            // 직접 DOM 조작
            document.getElementById('content').innerHTML = '' // 현재 내용 비우기

            // XHR 요청으로 last.html 내용 가져오기
            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'last.html', true)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById('content').innerHTML = xhr.responseText
                    initCardGenerator() // 내용 삽입 후 초기화

                    setTimeout(() => {
                        lastAinmation()
                    }, 100)
                }
            }
            xhr.send()
        }).catch(error => {
            console.error('Error:', error)
        })
    }
}

// 상태 캡처 및 저장 함수
async function captureAndSaveState(element) {

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            ignoreElements: (element) => {
                return element.classList.contains('reset')
            }
        })

        const imageDataUrl = canvas.toDataURL('image/png')
        const currentState = {
            decoBoxImage: imageDataUrl,
            background: element.style.background || ''
        }

        localStorage.setItem('cardState', JSON.stringify(currentState))

        return true
    } catch (error) {
        console.error('Capture failed:', error)
        throw error
    }
}

// 이미지 인터랙션
function lastAinmation() {
    let tl = gsap.timeline({
        ease: "power1.inOut",
    })

    // 요소 존재 여부 확인
    if (document.querySelector('.last')) {
        tl.to('.last', {
            opacity: 1,
        })
    }

    if (document.querySelector('.back')) {
        tl.to('.back', {
            scale: 1,
            opacity: 1,
        }, '<')
    }

    if (document.querySelector('.first')) {
        tl.to('.first', {
            scale: 1,
            opacity: 1,
            duration: .5,
            ease: "back.out(1.7)",
        }, '<')
    }

    if (document.querySelector('.f-16')) {
        tl.to('.f-16', {
            opacity: 1,
            y: 0,
            stagger: {
                each: 0.05,
            },
        }, '<')
    }

    if (document.querySelector('.cover-top')) {
        tl.to('.cover-top', {
            opacity: 1,
            ease: "expo.out",
            duration: 2,
            y: 0,
        }, '<+1')
    }

    if (document.querySelector('.cover-bottom')) {
        tl.to('.cover-bottom', {
            opacity: 1,
            ease: "expo.out",
            duration: 2,
            y: 0,
        }, '<')
    }

    if (document.querySelector('.bg')) {
        tl.to('.bg', {
            opacity: 1,
        }, '<+1')
    }

    if (document.querySelector('.card-visual')) {
        tl.to('.card-visual', {
            opacity: 1,
        }, '<')
    }

    if (document.querySelector('.btn')) {
        tl.to('.btn', {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            opacity: 1,
            stagger: {
                each: 0.08,
            }
        }, '<+.1.5')
    }

    return tl
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
            if (event.target.classList.contains('pink')) {
                sessionStorage.setItem('selectedSeason', 'deco_spring.html')
                loadPage('deco_spring.html')
            }
            if (event.target.classList.contains('blue')) {
                sessionStorage.setItem('selectedSeason', 'deco_summer.html')
                loadPage('deco_summer.html')
            }
            if (event.target.classList.contains('orange')) {
                sessionStorage.setItem('selectedSeason', 'deco_autumn.html')
                loadPage('deco_autumn.html')
            }
            if (event.target.classList.contains('snowblue')) {
                sessionStorage.setItem('selectedSeason', 'deco_winter.html')
                loadPage('deco_winter.html')
            }

            // 뒤로가기
            if (event.target.classList.contains('select-prev')) {
                loadPage('select.html')
            }
            if (event.target.classList.contains('season-prev')) {
                loadPage(sessionStorage.getItem('selectedSeason'))
            }

            // 완성하기
            if (event.target.classList.contains('submit')) {
                loadPage('last.html')
            }

            // 다시하기
            if (event.target.classList.contains('first')) {
                loadPage('first.html')
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