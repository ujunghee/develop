
function initDraggableComposition() {
    const composition = document.querySelector('.composition');
    const popupImages = document.querySelectorAll('.popup ul li img');

    // 드래그 상태 관리 변수
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let selectedElement = null;

    // 드래그 핸들 아이콘 SVG
    const dragHandleIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v4"></path>
            <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
            <path d="M15 21h4a2 2 0 0 0 2-2v-4"></path>
            <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
            <line x1="12" y1="9" x2="12" y2="15"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
        </svg>
    `;

    // 이미지 클릭 이벤트 핸들러
    popupImages.forEach(img => {
        img.addEventListener('click', function() {
            // 드래그 가능한 컨테이너 생성
            const draggableContainer = document.createElement('div');
            draggableContainer.className = 'draggable-container';
            draggableContainer.style.position = 'absolute';
            draggableContainer.style.cursor = 'move';
            
            // 이미지 복제 및 스타일 적용
            const clonedImg = img.cloneNode(true);
            clonedImg.style.width = '100%';
            clonedImg.style.height = 'auto';
            clonedImg.style.userSelect = 'none';
            
            // 드래그 핸들 추가
            const dragHandle = document.createElement('div');
            dragHandle.className = 'drag-handle';
            dragHandle.innerHTML = dragHandleIcon;
            
            // 컨테이너에 요소들 추가
            draggableContainer.appendChild(clonedImg);
            draggableContainer.appendChild(dragHandle);
            
            // 초기 위치 설정 (composition 영역 중앙)
            const compositionRect = composition.getBoundingClientRect();
            draggableContainer.style.left = (compositionRect.width / 2 - 100) + 'px';
            draggableContainer.style.top = (compositionRect.height / 2 - 100) + 'px';
            
            composition.appendChild(draggableContainer);
            
            // 드래그 이벤트 설정
            setDraggable(draggableContainer);
        });
    });

    function setDraggable(element) {
        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
    }

    function dragStart(e) {
        selectedElement = e.target.closest('.draggable-container');
        if (selectedElement) {
            isDragging = true;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            // 선택된 요소를 최상위로 가져오기
            selectedElement.style.zIndex = '1000';
        }
    }

    function drag(e) {
        if (isDragging && selectedElement) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, selectedElement);
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        
        if (selectedElement) {
            selectedElement.style.zIndex = 'auto';
            selectedElement = null;
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}