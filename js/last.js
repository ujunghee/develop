function initCardGenerator() {
    try {
        const savedState = JSON.parse(localStorage.getItem('cardState'))

        if (!savedState || !savedState.decoBoxImage) {
            return
        }

        const card = document.querySelector('.card')
        const cardVisual = document.querySelector('.card-visual')
        
        if (!card || !cardVisual) {
            return
        }

        // 이미지 엘리먼트 생성
        const img = document.createElement('img')
        img.src = savedState.decoBoxImage

        // 이미지 로드 이벤트 추가
        img.onload = () => {
            img.style.width = '100%'
            img.style.height = '100%'
            img.style.objectFit = 'contain'
            cardVisual.innerHTML = ''
            cardVisual.appendChild(img)

            if (savedState.background) {
                card.style.background = savedState.background
            }
        }

        img.onerror = (e) => {
            console.error('Image failed to load:', e)
        }

    } catch (error) {
        console.error('Error in initCardGenerator:', error)
    }
}

// 모든 이미지 로드 대기
function waitForImages(element) {
    const images = element.getElementsByTagName('img')
    const promises = Array.from(images).map(img => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve()
            } else {
                img.onload = () => resolve()
                img.onerror = () => resolve()
            }
        })
    })
    return Promise.all(promises)
}

window.initCardGenerator = initCardGenerator

