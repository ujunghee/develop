function initCardGenerator() {
    try {
        // console.log('initCardGenerator started')
        const savedState = JSON.parse(localStorage.getItem('cardState'))
        // console.log('Saved state:', savedState)

        if (!savedState || !savedState.decoBoxImage) {
            // console.log('No saved state or image found')
            return
        }

        const card = document.querySelector('.card')
        const cardVisual = document.querySelector('.card-visual')
        
        if (!card || !cardVisual) {
            // console.log('Card elements not found')
            return
        }

        // 이미지 엘리먼트 생성
        const img = document.createElement('img')
        img.src = savedState.decoBoxImage
        // console.log('Image element created with src')

        // 이미지 로드 이벤트 추가
        img.onload = () => {
            // console.log('Image loaded successfully')
            img.style.width = '100%'
            img.style.height = '100%'
            img.style.objectFit = 'contain'
            cardVisual.innerHTML = ''
            cardVisual.appendChild(img)
            // console.log('Image added to cardVisual')

            if (savedState.background) {
                card.style.background = savedState.background
                // console.log('Background applied')
            }

            // 이벤트 리스너 추가
            card.addEventListener('touchstart', handleLongPress)
            card.addEventListener('mousedown', handleLongPress)
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

// 길게 누르기 이벤트 핸들러
function handleLongPress(event) {
    let timer
    const card = event.currentTarget

    const start = () => {
        timer = setTimeout(() => {
            convertToImage(card)
        }, 1000)
    }

    const end = () => {
        clearTimeout(timer)
    }

    // 터치 이벤트
    if (event.type === 'touchstart') {
        start()
        card.addEventListener('touchend', end, { once: true })
        card.addEventListener('touchmove', end, { once: true })
    }
    // 마우스 이벤트
    else if (event.type === 'mousedown') {
        start()
        card.addEventListener('mouseup', end, { once: true })
        card.addEventListener('mousemove', end, { once: true })
    }
}

// 카드를 이미지로 변환하고 다운로드
async function convertToImage(card) {
    try {
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true,
            width: card.offsetWidth,
            height: card.offsetHeight,
            removeContainer: true
        })

        // canvas를 이미지로 변환
        const imageDataUrl = canvas.toDataURL('image/png')

        // 다운로드
        // const link = document.createElement('a')
        // link.href = imageDataUrl
        // link.download = `card-${Date.now()}.png`
        // document.body.appendChild(link)
        // link.click()
        // document.body.removeChild(link)

    } catch (error) {
        console.error('이미지 변환 중 오류:', error)
    }
}

window.initCardGenerator = initCardGenerator

