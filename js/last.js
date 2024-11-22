function initCardGenerator() {
    try {
        // localStorage에서 상태 읽기 전에 약간의 지연
        setTimeout(() => {
            const savedState = JSON.parse(localStorage.getItem('cardState'))
            if (!savedState || !savedState.decoBoxImage) {
                return
            }

            // DOM 요소 찾기 시도
            const card = document.querySelector('.card')
            const cardVisual = document.querySelector('.card-visual')

            if (!card || !cardVisual) {
                // DOM 요소를 찾지 못했다면 재시도
                setTimeout(initCardGenerator, 100)
                return
            }

            // 이미지 엘리먼트 생성
            const img = document.createElement('img')

            // 안드로이드 네이버웍스 체크
            const isAndroidNaverWorks = /android/i.test(navigator.userAgent) &&
                /NAVER(.*?)/i.test(navigator.userAgent);

            if (isAndroidNaverWorks) {
                // 안드로이드 네이버웍스용 속성 추가
                img.setAttribute('data-downloadable', 'true');
                img.style.webkitTouchCallout = 'default';
                img.style['-webkit-user-select'] = 'none';
                img.style['-webkit-touch-callout'] = 'default';
                img.style['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)';
                img.setAttribute('contextmenu', 'true');
            }

            // 이미지 로드 이벤트를 먼저 설정
            img.onload = () => {
                img.style.width = '100%'
                img.style.height = '100%'
                // img.style.objectFit = 'cover'

                // cardVisual이 여전히 존재하는지 한번 더 확인
                if (document.contains(cardVisual)) {
                    cardVisual.innerHTML = ''
                    cardVisual.appendChild(img)
                }
            }

            img.onerror = (e) => {
                console.error('Image failed to load:', e)
            }

            // src 설정은 이벤트 핸들러 설정 후에
            img.src = savedState.decoBoxImage

        }, 50) // localStorage 읽기 전 짧은 지연

    } catch (error) {
        console.error('Error in initCardGenerator:', error)
    }
}


window.initCardGenerator = initCardGenerator


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered')
    initCardGenerator()
})