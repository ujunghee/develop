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

function openInBrowser() {
    // 웹뷰 감지
    const isWebView = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        return /(webview|wv|naver|line|kakaotalk|naver\(inapp|worksmobile)/i.test(userAgent);
    }

    // 웹뷰일 경우 외부 브라우저로 리다이렉션
    if (isWebView()) {
        const browserUrl = "intent://" + window.location.href.replace(/^https?:\/\//, '') + "#Intent;scheme=https;package=com.android.chrome;end";
        window.location.href = browserUrl;
        
        // 폴백(fallback) - 크롬이 설치되어 있지 않은 경우
        setTimeout(() => {
            window.location.href = "market://details?id=com.android.chrome";
        }, 2000);
    }
}



window.initCardGenerator = initCardGenerator


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered')
    openInBrowser()
    initCardGenerator()
})