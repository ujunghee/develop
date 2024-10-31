// import html2canvas from 'html2canvas';

// MIME 타입과 품질 설정
const IMAGE_CONFIG = {
    type: 'image/png',
    quality: 1.0,
    scale: 2,
    prefix: 'card'
};

// 상태 관리를 위한 클래스
class CardState {
    constructor() {
        this.isGenerating = false;
        this.hasError = false;
        this.errorMessage = '';
    }

    setGenerating(value) {
        this.isGenerating = value;
        this.updateUI();
    }

    setError(message) {
        this.hasError = true;
        this.errorMessage = message;
        this.updateUI();
    }

    clearError() {
        this.hasError = false;
        this.errorMessage = '';
        this.updateUI();
    }

    updateUI() {
        const loadingEl = document.querySelector('.loading');
        if (loadingEl) {
            loadingEl.style.display = this.isGenerating ? 'block' : 'none';
        }
    }
}

// 카드 생성기 초기화
function initCardGenerator() {
    const cardState = new CardState();

    try {
        const savedState = JSON.parse(localStorage.getItem('cardState'));
        if (!savedState) {
            throw new Error('저장된 카드 상태를 찾을 수 없습니다.');
        }

        const elements = {
            card: document.querySelector('.card'),
            cardVisual: document.querySelector('.card-visual'),
            txtBox: document.querySelector('.txt-box')
        };

        if (!validateElements(elements)) {
            throw new Error('필요한 DOM 요소를 찾을 수 없습니다.');
        }

        // UI 초기화
        initializeCardUI(elements, savedState);
        
        // 이미지 로드 후 이벤트 설정
        waitForImages(elements.card).then(() => {
            setupCardEvents(elements.card, cardState);
        }).catch(error => {
            cardState.setError('이미지 로드 중 오류가 발생했습니다.');
            console.error('이미지 로드 오류:', error);
        });

        // 상태 정리
        localStorage.removeItem('cardState');

    } catch (error) {
        cardState.setError(error.message);
        console.error('카드 초기화 오류:', error);
    }
}

// DOM 요소 유효성 검사
function validateElements(elements) {
    return elements.card && elements.cardVisual && elements.txtBox;
}

// UI 초기화
function initializeCardUI(elements, savedState) {
    const { card, cardVisual, txtBox } = elements;

    // 배경 설정
    if (savedState.background) {
        card.style.background = savedState.background;
    }

    // 텍스트 설정
    if (savedState.text) {
        txtBox.textContent = savedState.text;
    }

    // Composition 복원
    if (savedState.composition) {
        restoreComposition(cardVisual, savedState.composition);
    }

    // 로딩 UI 추가
    createLoadingUI(card);
}

// Composition 요소 복원
function restoreComposition(cardVisual, composition) {
    composition.forEach(container => {
        const draggableContainer = createDraggableContainer(container);
        cardVisual.appendChild(draggableContainer);
    });
}

// Draggable 컨테이너 생성
function createDraggableContainer(containerData) {
    const container = document.createElement('div');
    container.className = 'draggable-container';
    container.style.position = 'absolute';
    container.style.left = containerData.position.left;
    container.style.top = containerData.position.top;
    container.style.border = containerData.style.border;

    const img = createImage(containerData.image);
    container.appendChild(img);

    return container;
}

// 이미지 요소 생성
function createImage(imageData) {
    const img = new Image();
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.style.width = imageData.width;
    img.style.height = imageData.height;
    img.draggable = false; // 이미지 드래그 방지

    return img;
}

// 로딩 UI 생성
function createLoadingUI(parentElement) {
    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading';
    loadingEl.style.display = 'none';
    loadingEl.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">이미지 생성 중...</div>
    `;
    parentElement.appendChild(loadingEl);
}

// 이미지 로드 대기
function waitForImages(element) {
    const images = element.getElementsByTagName('img');
    const promises = Array.from(images).map(img => {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                resolve();
            } else {
                img.onload = () => resolve();
                img.onerror = (error) => reject(error);
            }
        });
    });
    return Promise.all(promises);
}

// 카드 이벤트 설정
function setupCardEvents(card, cardState) {
    let pressTimer;
    let isTouching = false;

    const handleStart = (e) => {
        if (cardState.isGenerating) return;
        
        isTouching = true;
        pressTimer = setTimeout(() => {
            if (isTouching) {
                generateCardImage(card, cardState);
            }
        }, 1000);
    };

    const handleEnd = () => {
        isTouching = false;
        clearTimeout(pressTimer);
    };

    const handleMove = () => {
        if (isTouching) {
            isTouching = false;
            clearTimeout(pressTimer);
        }
    };

    // 이벤트 리스너 등록
    card.addEventListener('touchstart', handleStart, { passive: true });
    card.addEventListener('touchend', handleEnd);
    card.addEventListener('touchmove', handleMove);
    card.addEventListener('mousedown', handleStart);
    card.addEventListener('mouseup', handleEnd);
    card.addEventListener('mouseleave', handleEnd);
}

// 카드 이미지 생성
async function generateCardImage(card, cardState) {
    if (cardState.isGenerating) return;

    try {
        cardState.setGenerating(true);
        cardState.clearError();

        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: IMAGE_CONFIG.scale,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: card.offsetWidth,
            height: card.offsetHeight,
            onclone: (clonedDoc) => {
                const clonedCard = clonedDoc.querySelector('.card');
                if (clonedCard) {
                    const loadingEl = clonedCard.querySelector('.loading');
                    if (loadingEl) {
                        loadingEl.remove();
                    }
                }
            }
        });

        const imageData = canvas.toDataURL(IMAGE_CONFIG.type, IMAGE_CONFIG.quality);
        downloadImage(imageData);

    } catch (error) {
        cardState.setError('이미지 생성 중 오류가 발생했습니다.');
        console.error('이미지 생성 오류:', error);
    } finally {
        cardState.setGenerating(false);
    }
}

// 이미지 다운로드
function downloadImage(imageData) {
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${IMAGE_CONFIG.prefix}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 전역으로 노출
window.initCardGenerator = initCardGenerator;