function initCardGenerator() {
    try {
        setTimeout(() => {
            const savedState = JSON.parse(localStorage.getItem('cardState'))
            if (!savedState || !savedState.decoBoxImage) {
                return
            }

            const card = document.querySelector('.card')
            const cardVisual = document.querySelector('.card-visual')

            if (!card || !cardVisual) {
                setTimeout(initCardGenerator, 100)
                return
            }

            const img = document.createElement('img')

            // 이미지 로드 이벤트를 먼저 설정
            img.onload = () => {
                img.style.width = '100%'
                img.style.height = '100%'
                // img.style.objectFit = 'cover'

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

        }, 50) 

    } catch (error) {
        console.error('Error in initCardGenerator:', error)
    }
}


window.initCardGenerator = initCardGenerator


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered')
    initCardGenerator()
})