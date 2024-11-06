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
                    setupHeaderActions()
                }

                if (selecpage.includes(page)) {
                    select()
                }
                
                if (page === 'last.html') {
                    initCardGenerator()
                }
            }

            if (callback) callback()
        }
    }
    xhr.send()

}

// 헤더 액션 설정 함수
function setupHeaderActions() {
    const header = document.querySelector('.header');
    if (!header) return;

    // 기존 이벤트 리스너 제거
    header.removeEventListener('click', handleHeaderClick);
    // 새 이벤트 리스너 추가
    header.addEventListener('click', handleHeaderClick);
}

// 헤더 클릭 이벤트 핸들러
function handleHeaderClick(event) {
    if (!event.target.closest('.season-prev') && !event.target.closest('.first') 
        && !event.target.closest('.select-prev')) {
            const decoBox = document.querySelector('.deco-box');
            if (!decoBox) {
                console.log('decoBox not found');
                return;
            }
            
            console.log('Starting capture process...');
            html2canvas(decoBox, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                ignoreElements: (element) => {
                    return element.classList.contains('reset');
                }
            }).then(canvas => {
                console.log('Canvas created');
                const imageDataUrl = canvas.toDataURL('image/png');
                console.log('Image URL created');
                const currentState = {
                    decoBoxImage: imageDataUrl,
                    background: decoBox.style.background || ''
                };
                console.log('State prepared:', currentState);
                localStorage.setItem('cardState', JSON.stringify(currentState));
                console.log('State saved to localStorage');
                return Promise.resolve();
            }).then(() => {
                console.log('Starting page transition...');
                loadPage('last.html');
            }).catch(error => {
                console.error('Error in capture process:', error);
                loadPage('last.html');
            });
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
                return element.classList.contains('reset');
            }
        });

        const imageDataUrl = canvas.toDataURL('image/png');
        const currentState = {
            decoBoxImage: imageDataUrl,
            background: element.style.background || ''
        };

        localStorage.setItem('cardState', JSON.stringify(currentState));
        return true;
    } catch (error) {
        console.error('Capture failed:', error);
        throw error;
    }
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