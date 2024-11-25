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
            try {
                // Base64 데이터가 올바른 형식인지 확인
                if (!savedState.decoBoxImage.startsWith('data:image')) {
                    throw new Error('Invalid image data');
                }

                // Base64를 Blob URL로 변환
                const base64Data = savedState.decoBoxImage.split(',')[1];
                const blob = new Blob([atob(base64Data)], { type: 'image/png' });
                const blobUrl = URL.createObjectURL(blob);
                
                img.onload = () => {
                    img.style.width = '100%'
                    img.style.height = '100%'

                    if (document.contains(cardVisual)) {
                        cardVisual.innerHTML = ''
                        cardVisual.appendChild(img)
                    }
                }

                img.onerror = (e) => {
                    console.error('Image failed to load:', e)
                    // 에러 발생시 원본 Base64 데이터로 fallback
                    img.src = savedState.decoBoxImage
                }

                img.src = blobUrl;

            } catch (error) {
                console.error('Error processing image:', error)
                // 에러 발생시 원본 Base64 데이터 사용
                img.src = savedState.decoBoxImage
            }

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