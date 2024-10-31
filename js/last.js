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

        // 이미지로 변환된 내용 복원
        if (savedState.cardImage && cardVisual) {
            // 기존 내용 제거
            cardVisual.innerHTML = '';
            
            // 이미지 생성 및 설정
            const img = new Image();
            img.src = savedState.cardImage;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.pointerEvents = 'none'; // 이미지 클릭 방지
            
            cardVisual.appendChild(img);
        }

        // 저장 상태 제거
        localStorage.removeItem('cardState');

        // 카드 전체에 대한 이벤트 리스너 설정
        setupCardDownload(card);

    } catch (error) {
        console.error('카드 초기화 중 오류:', error);
    }
}

function setupCardDownload(card) {
    let pressTimer;

    const startPress = (e) => {
        pressTimer = setTimeout(() => {
            downloadCard(card);
        }, 1000);
        e.preventDefault();
    };

    const endPress = () => {
        clearTimeout(pressTimer);
    };

    card.addEventListener('touchstart', startPress);
    card.addEventListener('touchend', endPress);
    card.addEventListener('mousedown', startPress);
    card.addEventListener('mouseup', endPress);
}

async function downloadCard(card) {
    try {
        // 현재 카드를 다시 이미지로 변환
        const canvas = await html2canvas(card, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });

        const link = document.createElement('a');
        link.download = `card-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error('카드 다운로드 중 오류:', error);
    }
}

window.initCardGenerator = initCardGenerator;