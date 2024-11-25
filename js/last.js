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

            try {
                  if (!savedState.decoBoxImage.startsWith('data:image')) {
                    throw new Error('Invalid image data');
                }

                // Base64 데이터를 바이너리로 변환
                const base64Data = savedState.decoBoxImage.split(',')[1];
                const byteCharacters = atob(base64Data);
                const byteNumbers = new Array(byteCharacters.length);
                
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/png' });
                const blobUrl = URL.createObjectURL(blob);

                img.onload = () => {
                    img.style.width = '100%';
                    img.style.height = '100%';

                    if (document.contains(cardVisual)) {
                        cardVisual.innerHTML = '';
                        cardVisual.appendChild(img);
                    }
                    URL.revokeObjectURL(blobUrl);
                }

                img.onerror = (e) => {
                    console.error('Image failed to load:', e);
                    console.log('Falling back to original data URL');
                    // fallback을 적용하기 전에 이전 이벤트 핸들러 제거
                    img.onerror = null;
                    img.src = savedState.decoBoxImage;
                }

                img.src = blobUrl;

            } catch (error) {
                console.error('Error processing image:', error);
                img.src = savedState.decoBoxImage;
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