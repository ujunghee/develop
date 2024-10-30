function initDraggableComposition() {
    const composition = document.querySelector('.composition');
    const popupImages = document.querySelectorAll('.popup ul li img');
    const resetButton = document.querySelector('.reset'); 

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


    // Reset 버튼 클릭 이벤트 핸들러
    resetButton.addEventListener('click', function() {
        const draggableContainers = composition.querySelectorAll('.draggable-container');
        draggableContainers.forEach(container => {
            container.remove(); 
        });
    });


    // 이미지 클릭/터치 이벤트 핸들러
    popupImages.forEach(img => {
        img.addEventListener('click', createDraggableImage);
        img.addEventListener('touchstart', createDraggableImage, { passive: true });
    });

    function createDraggableImage() {
        const img = this;
        const originalWidth = img.naturalWidth;
        const originalHeight = img.naturalHeight;

        const draggableContainer = document.createElement('div');
        draggableContainer.className = 'draggable-container';
        draggableContainer.style.position = 'absolute';
        draggableContainer.style.cursor = 'move';

        const clonedImg = img.cloneNode(true);
        clonedImg.style.width = `${originalWidth / 3}px`;
        clonedImg.style.height = `${originalHeight / 3}px`;
        clonedImg.style.userSelect = 'none';
        clonedImg.style.webkitUserSelect = 'none';

        const dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle';
        dragHandle.innerHTML = dragHandleIcon;

        draggableContainer.appendChild(clonedImg);
        draggableContainer.appendChild(dragHandle);

        // 초기 위치를 패딩(16px)을 고려하여 설정
        draggableContainer.style.left = '16px';
        draggableContainer.style.top = '16px';
        
        // 초기 transform 초기화
        draggableContainer.style.transform = 'translate(0, 0)';
        xOffset = 0;
        yOffset = 0;

        composition.appendChild(draggableContainer);
        setDraggable(draggableContainer);
    }

    function setDraggable(element) {
        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        element.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', dragEnd);
    }

    function dragStart(e) {
        if (e.type === 'mousedown') {
            selectedElement = e.target.closest('.draggable-container');
            if (selectedElement) {
                isDragging = true;
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                composition.appendChild(selectedElement);
            }
        } else if (e.type === 'touchstart') {
            selectedElement = e.target.closest('.draggable-container');
            if (selectedElement) {
                isDragging = true;
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
                composition.appendChild(selectedElement);
            }
        }
    }

    function drag(e) {
        if (isDragging && selectedElement) {
            e.preventDefault();

            const compRect = composition.getBoundingClientRect();
            const elemRect = selectedElement.getBoundingClientRect();
            
            // 현재 마우스/터치 위치 계산
            let clientX, clientY;
            if (e.type === 'mousemove') {
                clientX = e.clientX;
                clientY = e.clientY;
            } else if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            // 새로운 위치 계산
            let newX = clientX - initialX;
            let newY = clientY - initialY;

            // composition 영역 제한 (패딩 16px 고려)
            const padding = 16;
            const maxX = compRect.width - elemRect.width - padding;
            const maxY = compRect.height - elemRect.height - padding;

            // 위치 제한 적용
            newX = Math.max(padding, Math.min(newX, maxX));
            newY = Math.max(padding, Math.min(newY, maxY));

            currentX = newX;
            currentY = newY;
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

    // 모바일에서 드래그 중 스크롤 방지
    composition.addEventListener('touchmove', function (e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });
}