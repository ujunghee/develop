function initDraggableComposition() {
    const composition = document.querySelector('.composition');
    const popupImages = document.querySelectorAll('.popup ul li img');
    const resetButton = document.querySelector('.reset');
    const textField = document.querySelector('.textfield');

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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10.1309 0.581139C9.93564 0.385877 9.61905 0.385877 9.42379 0.581139L6.24181 3.76312C6.04655 3.95838 6.04655 4.27496 6.24181 4.47023C6.43707 4.66549 6.75365 4.66549 6.94892 4.47023L9.77734 1.6418L12.6058 4.47023C12.801 4.66549 13.1176 4.66549 13.3129 4.47023C13.5081 4.27496 13.5081 3.95838 13.3129 3.76312L10.1309 0.581139ZM9.42379 19.2882C9.61905 19.4835 9.93563 19.4835 10.1309 19.2882L13.3129 16.1063C13.5081 15.911 13.5081 15.5944 13.3129 15.3992C13.1176 15.2039 12.801 15.2039 12.6058 15.3992L9.77734 18.2276L6.94892 15.3992C6.75365 15.2039 6.43707 15.2039 6.24181 15.3992C6.04655 15.5944 6.04655 15.911 6.24181 16.1063L9.42379 19.2882ZM9.27734 0.934692L9.27734 18.9347L10.2773 18.9347L10.2773 0.934692L9.27734 0.934692Z" fill="#787470"/>
        <path d="M19.1309 10.2882C19.3262 10.093 19.3262 9.7764 19.1309 9.58114L15.9489 6.39916C15.7537 6.2039 15.4371 6.2039 15.2418 6.39916C15.0465 6.59442 15.0465 6.911 15.2418 7.10627L18.0702 9.93469L15.2418 12.7631C15.0465 12.9584 15.0465 13.275 15.2418 13.4702C15.4371 13.6655 15.7537 13.6655 15.9489 13.4702L19.1309 10.2882ZM0.42379 9.58114C0.228529 9.7764 0.228529 10.093 0.42379 10.2882L3.60577 13.4702C3.80103 13.6655 4.11762 13.6655 4.31288 13.4702C4.50814 13.275 4.50814 12.9584 4.31288 12.7631L1.48445 9.93469L4.31288 7.10626C4.50814 6.911 4.50814 6.59442 4.31288 6.39916C4.11762 6.2039 3.80103 6.2039 3.60577 6.39916L0.42379 9.58114ZM18.7773 9.43469L0.777344 9.43469L0.777344 10.4347L18.7773 10.4347L18.7773 9.43469Z" fill="#787470"/>
        </svg>
    `;


    // Reset 버튼 클릭 이벤트 핸들러
    resetButton.addEventListener('click', function () {

        textField.classList.remove('on')
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
        // 초기에는 dragHandle을 숨김
        dragHandle.style.display = 'none';

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
                selectedElement.style.border = '1px solid #D89B9B'

                const dragHandle = selectedElement.querySelector('.drag-handle');
                dragHandle.style.display = 'block';
            }
        } else if (e.type === 'touchstart') {
            selectedElement = e.target.closest('.draggable-container');
            if (selectedElement) {
                isDragging = true;
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
                composition.appendChild(selectedElement);
                selectedElement.style.border = '1px solid #D89B9B'

                const dragHandle = selectedElement.querySelector('.drag-handle');
                dragHandle.style.display = 'block';
            }
        }
    }

    function drag(e) {
        if (isDragging && selectedElement) {
            e.preventDefault();

            const compRect = composition.getBoundingClientRect();
            const elemRect = selectedElement.getBoundingClientRect();

            // border
            selectedElement.style.border = '1px solid #D89B9B'

            const dragHandle = selectedElement.querySelector('.drag-handle');
            dragHandle.style.display = 'block';

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
            selectedElement.style.border = 'inherit'
            selectedElement = null;

            const dragHandles = document.querySelectorAll('.drag-handle');
            dragHandles.forEach(handle => {
                handle.style.display = 'none';
            });
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