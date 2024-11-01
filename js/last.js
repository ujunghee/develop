// import html2canvas from 'html2canvas';

function initCardGenerator() {
    try {
        const savedState = JSON.parse(localStorage.getItem('cardState'));
        if (!savedState) return;

        const card = document.querySelector('.card');
        const cardVisual = document.querySelector('.card-visual');
        const txtBox = document.querySelector('.txt-box');

        // background 복원
        if (savedState.background) {
            card.style.background = savedState.background;
        }

        // 텍스트 내용 복원
        if (savedState.text && txtBox) {
            txtBox.textContent = savedState.text;
        }

        // composition 내용 복원
        if (savedState.composition && cardVisual) {
            savedState.composition.forEach(container => {
                const draggableContainer = document.createElement('div');
                draggableContainer.className = 'draggable-container';
                draggableContainer.style.position = 'absolute';
                draggableContainer.style.left = container.position.left;
                draggableContainer.style.top = container.position.top;
                draggableContainer.style.border = container.style.border;

                const img = document.createElement('img');
                img.src = container.image.src;
                img.alt = container.image.alt;
                img.style.width = container.image.width;
                img.style.height = container.image.height;

                // 개별 이미지 클릭 이벤트 추가
                draggableContainer.addEventListener('click', (e) => {
                    // 이벤트 전파 중지
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = img.src;
                    link.download = `image-${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });

                draggableContainer.appendChild(img);
                cardVisual.appendChild(draggableContainer);
            });
        }

        // 상태 정리
        localStorage.removeItem('cardState');

        // 모든 이미지가 로드된 후에 이벤트 리스너 추가
        waitForImages(card).then(() => {
            card.addEventListener('touchstart', handleLongPress);
            card.addEventListener('mousedown', handleLongPress);
        });

    } catch (error) {
        console.error('카드 상태 복원 중 오류:', error);
    }
}

// 모든 이미지 로드 대기
function waitForImages(element) {
    const images = element.getElementsByTagName('img');
    const promises = Array.from(images).map(img => {
        return new Promise((resolve) => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
            }
        });
    });
    return Promise.all(promises);
}

// 길게 누르기 이벤트 핸들러
function handleLongPress(event) {
    // draggableContainer를 클릭한 경우는 무시
    if (event.target.closest('.draggable-container')) {
        return;
    }

    let timer;
    const card = event.currentTarget;

    const start = () => {
        timer = setTimeout(() => {
            convertToImage(card);
        }, 1000);
    };

    const end = () => {
        clearTimeout(timer);
    };

    // 터치 이벤트
    if (event.type === 'touchstart') {
        start();
        card.addEventListener('touchend', end, { once: true });
        card.addEventListener('touchmove', end, { once: true });
    }
    // 마우스 이벤트
    else if (event.type === 'mousedown') {
        start();
        card.addEventListener('mouseup', end, { once: true });
        card.addEventListener('mousemove', end, { once: true });
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
            logging: true,
            width: card.offsetWidth,
            height: card.offsetHeight
        });

        // canvas를 이미지로 변환
        const imageDataUrl = canvas.toDataURL('image/png');

        // 다운로드
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = `card-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('이미지 변환 중 오류:', error);
    }
}

window.initCardGenerator = initCardGenerator;