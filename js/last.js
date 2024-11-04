function initCardGenerator() {
    try {
        const savedState = JSON.parse(localStorage.getItem('cardState'));
        if (!savedState) return;

        const card = document.querySelector('.card');
        const cardVisual = document.querySelector('.card-visual');
        const txtBox = document.querySelector('.txt-box');

        // 원본 deco-box의 크기와 비율을 저장
        const originalDecoBox = {
            width: 100,  // deco-box의 원본 너비 (%)
            height: 100, // deco-box의 원본 높이 (%)
            aspectRatio: 1  // deco-box의 가로세로 비율
        };

        // background 복원
        if (savedState.background) {
            card.style.background = savedState.background;
        }

        if (savedState.text && txtBox) {
            txtBox.textContent = savedState.text;
        }

        if (savedState.composition && cardVisual) {
            savedState.composition.forEach(container => {
                const draggableContainer = document.createElement('div');
                draggableContainer.className = 'draggable-container';
                draggableContainer.style.position = 'absolute';
                
                // 위치를 퍼센트로 변환하여 저장
                const originalLeft = container.position.left.includes('%') ? 
                    parseFloat(container.position.left) :
                    (parseFloat(container.position.left) / originalDecoBox.width) * 100;
                    
                const originalTop = container.position.top.includes('%') ?
                    parseFloat(container.position.top) :
                    (parseFloat(container.position.top) / originalDecoBox.height) * 100;

                draggableContainer.style.left = `${originalLeft}%`;
                draggableContainer.style.top = `${originalTop}%`;
                draggableContainer.style.border = container.style.border;

                const img = document.createElement('img');
                img.src = container.image.src;
                img.alt = container.image.alt;

                // 이미지 크기도 퍼센트로 변환
                const originalWidth = container.image.width.includes('%') ?
                    parseFloat(container.image.width) :
                    (parseFloat(container.image.width) / originalDecoBox.width) * 100;
                
                const originalHeight = container.image.height.includes('%') ?
                    parseFloat(container.image.height) :
                    (parseFloat(container.image.height) / originalDecoBox.height) * 100;

                img.style.width = `${originalWidth}%`;
                img.style.height = `${originalHeight}%`;

                draggableContainer.appendChild(img);
                cardVisual.appendChild(draggableContainer);
                
                const resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        const cardRect = entry.target.getBoundingClientRect();
                        const cardAspectRatio = cardRect.width / cardRect.height;

                        // card와 deco-box의 비율 차이에 따른 스케일 조정
                        const scaleRatio = cardAspectRatio / originalDecoBox.aspectRatio;
                        
                        // 비율에 맞춰 위치와 크기 조정
                        if (scaleRatio > 1) {
                            // card가 더 넓은 경우
                            const adjustedLeft = originalLeft * scaleRatio;
                            draggableContainer.style.left = `${adjustedLeft}%`;
                            img.style.width = `${originalWidth * scaleRatio}%`;
                        } else {
                            // card가 더 좁은 경우
                            const adjustedTop = originalTop * (1/scaleRatio);
                            draggableContainer.style.top = `${adjustedTop}%`;
                            img.style.height = `${originalHeight * (1/scaleRatio)}%`;
                        }
                    }
                });
                
                resizeObserver.observe(card);
            });
        }

        localStorage.removeItem('cardState');

        waitForImages(card).then(() => {
            card.addEventListener('touchstart', handleLongPress);
            card.addEventListener('mousedown', handleLongPress);
        });

    } catch (error) {
        console.error('Error restoring card state:', error);
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

function handleLongPress(event) {
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

    if (event.type === 'touchstart') {
        start();
        card.addEventListener('touchend', end, { once: true });
        card.addEventListener('touchmove', end, { once: true });
    }
    else if (event.type === 'mousedown') {
        start();
        card.addEventListener('mouseup', end, { once: true });
        card.addEventListener('mousemove', end, { once: true });
    }
}

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
        });

        const imageDataUrl = canvas.toDataURL('image/png');

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