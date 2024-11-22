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
            
            // 이미지 저장 관련 속성 추가
            img.setAttribute('crossorigin', 'anonymous')
            img.setAttribute('loading', 'eager')
            img.setAttribute('decoding', 'sync')
            // 컨텍스트 메뉴 허용
            img.style.webkitTouchCallout = 'default'
            img.style.webkitUserSelect = 'auto'
            img.style.userSelect = 'auto'
            // 다운로드 속성 추가
            img.setAttribute('download', 'card.png')
            
            // 이미지 로드 이벤트를 먼저 설정
            if (document.contains(cardVisual)) {
                cardVisual.innerHTML = ''
                // 이미지를 링크로 감싸기
                const link = document.createElement('a')
                link.href = savedState.decoBoxImage
                link.download = 'card.png'
                link.appendChild(img)
                cardVisual.appendChild(link)
                
                // 이미지 저장 이벤트 리스너 추가
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault()
                    const a = document.createElement('a')
                    a.href = savedState.decoBoxImage
                    a.download = 'card.png'
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                })
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