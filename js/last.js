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

            function dataURLtoBlob(dataURL) {
                const parts = dataURL.split(';base64,');
                const contentType = parts[0].split(':')[1];
                const raw = window.atob(parts[1]);
                const rawLength = raw.length;
                const uInt8Array = new Uint8Array(rawLength);
                
                for(let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                
                return new Blob([uInt8Array], { type: contentType });
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

            try {
                const blob = dataURLtoBlob(savedState.decoBoxImage);
                const blobUrl = URL.createObjectURL(blob);
                img.src = blobUrl;

                // 메모리 누수 방지를 위해 이미지 로드 후 URL 해제
                img.onload = () => {
                    img.style.width = '100%'
                    img.style.height = '100%'
                    
                    if (document.contains(cardVisual)) {
                        cardVisual.innerHTML = ''
                        cardVisual.appendChild(img)
                    }
                    
                    URL.revokeObjectURL(blobUrl);
                }
            } catch (error) {
                console.error('Error converting to Blob URL:', error);
                // 실패시 원본 Data URL 사용
                img.src = savedState.decoBoxImage;
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