function initCardGenerator() {
    try {
        const savedState = JSON.parse(localStorage.getItem('cardState'));
        if (!savedState) return;

        const card = document.querySelector('.card');
        const cardVisual = document.querySelector('.card-visual');
        const txtBox = document.querySelector('.txt-box');

        const cardRect = card.getBoundingClientRect();
        const cardPadding = 20;
        const maxWidth = cardRect.width - (cardPadding * 2);
        const maxHeight = cardRect.height - (cardPadding * 2);

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
                
                const left = container.position.left.includes('%') ? 
                    (parseFloat(container.position.left) / 100) * maxWidth + cardPadding :
                    Math.min(parseFloat(container.position.left), maxWidth);
                    
                const top = container.position.top.includes('%') ?
                    (parseFloat(container.position.top) / 100) * maxHeight + cardPadding :
                    Math.min(parseFloat(container.position.top), maxHeight);

                draggableContainer.style.left = `${left}px`;
                draggableContainer.style.top = `${top}px`;
                draggableContainer.style.border = container.style.border;

                const img = document.createElement('img');
                img.src = container.image.src;
                img.alt = container.image.alt;

                const originalWidth = parseInt(container.image.width);
                const originalHeight = parseInt(container.image.height);
                
                let newWidth = originalWidth;
                let newHeight = originalHeight;

                if (originalWidth > maxWidth) {
                    const scale = maxWidth / originalWidth;
                    newWidth = maxWidth;
                    newHeight = originalHeight * scale;
                }

                if (newHeight > maxHeight) {
                    const scale = maxHeight / newHeight;
                    newHeight = maxHeight;
                    newWidth = newWidth * scale;
                }

                const right = left + newWidth;
                const bottom = top + newHeight;

                if (right > cardRect.width - cardPadding) {
                    draggableContainer.style.left = `${cardRect.width - cardPadding - newWidth}px`;
                }

                if (bottom > cardRect.height - cardPadding) {
                    draggableContainer.style.top = `${cardRect.height - cardPadding - newHeight}px`;
                }

                img.style.width = `${newWidth}px`;
                img.style.height = `${newHeight}px`;

                draggableContainer.appendChild(img);
                cardVisual.appendChild(draggableContainer);
                
                const resizeObserver = new ResizeObserver(entries => {
                    for (let entry of entries) {
                        const newCardRect = entry.target.getBoundingClientRect();
                        const scale = newCardRect.width / cardRect.width;
                        
                        const scaledLeft = parseFloat(draggableContainer.style.left) * scale;
                        const scaledTop = parseFloat(draggableContainer.style.top) * scale;
                        const scaledWidth = parseFloat(img.style.width) * scale;
                        const scaledHeight = parseFloat(img.style.height) * scale;
                        
                        draggableContainer.style.left = `${scaledLeft}px`;
                        draggableContainer.style.top = `${scaledTop}px`;
                        img.style.width = `${scaledWidth}px` / 3;
                        img.style.height = `${scaledHeight}px` / 3;
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

// 길게 누르기 이벤트 핸들러
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
            width: card.offsetWidth,
            height: card.offsetHeight,
            removeContainer: true
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