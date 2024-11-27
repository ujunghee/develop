function initDraggableComposition() {
    const composition = document.querySelector('.composition')
    const popupImages = document.querySelectorAll('.popup ul li img')
    const resetButton = document.querySelector('.reset')
    const textField = document.querySelector('.textfield')

    // 드래그 상태 관리 변수
    let isDragging = false
    // let currentX
    // let currentY
    let initialX
    let initialY
    // let xOffset = 0
    // let yOffset = 0
    let selectedElement = null

    // 상태 관리 변수 추가
    let prevDiff = -1;
    const touchHistory = [];
    let isZooming = false;
    let currentScale = 1;

    // 드래그 핸들 아이콘 SVG
    const dragHandleIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 25 25" fill="none">
        <path d="M6.41309 6.57068L19.141 19.2986" stroke="#787470"/>
        <path d="M19.1411 6.57068L6.41319 19.2986" stroke="#787470"/>
        </svg>
    `


    // Reset 버튼 클릭 이벤트 핸들러
    resetButton.addEventListener('click', function () {
        textField.classList.remove('on')
        const draggableContainers = composition.querySelectorAll('.draggable-container')
        draggableContainers.forEach(container => {
            container.remove()
        })
    })

    // 이미지 클릭/터치 이벤트 핸들러
    popupImages.forEach(img => {
        img.addEventListener('click', createDraggableImage)
        img.addEventListener('touchstart', createDraggableImage, { passive: true })
    })

    function createDraggableImage() {
        const img = this
        const originalWidth = img.naturalWidth
        const originalHeight = img.naturalHeight

        const draggableContainer = document.createElement('div')
        draggableContainer.className = 'draggable-container'
        draggableContainer.style.position = 'absolute'
        draggableContainer.style.cursor = 'move'

        const clonedImg = img.cloneNode(true)
        clonedImg.style.width = `${originalWidth / 3}px`
        clonedImg.style.height = `${originalHeight / 3}px`
        clonedImg.style.userSelect = 'none'
        clonedImg.style.webkitUserSelect = 'none'

        const dragHandle = document.createElement('div')
        dragHandle.className = 'drag-close'
        dragHandle.innerHTML = dragHandleIcon
        // dragHandle.style.display = 'none'
        
        // dragHandle 삭제
        dragHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation()
            e.preventDefault()
            draggableContainer.remove()
        })
        dragHandle.addEventListener('touchstart', (e) => {
            e.stopPropagation()
            e.preventDefault()
            draggableContainer.remove()
        }, { passive: false });

        draggableContainer.appendChild(clonedImg)
        draggableContainer.appendChild(dragHandle)

        // 중앙 위치 계산
        const compRect = composition.getBoundingClientRect()
        const imageWidth = originalWidth / 3
        const imageHeight = originalHeight / 3

        const centerX = (compRect.width - imageWidth) / 2
        const centerY = (compRect.height - imageHeight) / 3

        // 초기 위치를 중앙으로 설정 (left/top 사용)
        draggableContainer.style.left = `${centerX}px`
        draggableContainer.style.top = `${centerY}px`

        // 드레그시 가운데 
        draggableContainer.style.transformOrigin = 'center center';
        draggableContainer.style.transform = 'scale(1)';

        composition.appendChild(draggableContainer)
        setDraggable(draggableContainer)
    }

    function setDraggable(element) {
        element.addEventListener('mousedown', dragStart)
        document.addEventListener('mousemove', drag)
        document.addEventListener('mouseup', dragEnd)

        element.addEventListener('touchstart', handleTouchStart, { passive: false })
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd)
    }

    // 두 손가락 터치시 
    // 드레그 시작
    function handleTouchStart(e) {

        const touches = e.touches;

        // 두 손가락 터치 시작
        if (touches.length === 2) {
            isZooming = true;
            touchHistory.length = 0; // 터치 기록 초기화
            touchHistory.push(...Array.from(touches));
            e.preventDefault();
            return;
        }

        // 한 손가락 터치는 기존 dragStart 호출
        dragStart(e);
    }

    // 드레그 div 외에 클릭시 active 삭제
    composition.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('composition')) {
            const activeDivs = document.querySelectorAll('.draggable-container')
            activeDivs.forEach(item => {
                item.classList.remove('active')
            })
        }

    })
    composition.addEventListener('touchstart', (e) => {
        if (e.target.classList.contains('composition')) {
            const activeDivs = document.querySelectorAll('.draggable-container')
            activeDivs.forEach(item => {
                item.classList.remove('active')
            })
        }
    })

    // 드레그 시작
    function dragStart(e) {
        if (e.type === 'mousedown') {
            selectedElement = e.target.closest('.draggable-container')
            const activeDivs = document.querySelectorAll('.draggable-container')

            activeDivs.forEach(item => {
                item.classList.remove('active')
            })

            if (selectedElement) {
                isDragging = true
                initialX = e.clientX - parseFloat(selectedElement.style.left || 0)
                initialY = e.clientY - parseFloat(selectedElement.style.top || 0)
                composition.appendChild(selectedElement)
                selectedElement.classList.add('active')

            }

        } else if (e.type === 'touchstart') {
            selectedElement = e.target.closest('.draggable-container')

            const activeDivs = document.querySelectorAll('.draggable-container')
            activeDivs.forEach(item => {
                item.classList.remove('active')
            })

            if (selectedElement) {
                isDragging = true
                initialX = e.touches[0].clientX - parseFloat(selectedElement.style.left || 0)
                initialY = e.touches[0].clientY - parseFloat(selectedElement.style.top || 0)
                composition.appendChild(selectedElement)
                selectedElement.classList.add('active')
            }
        }
    }


    // 디바이스 기기마다 배수 설정
    function getMaxDevice() {
        const width = window.innerWidth;
        if (width <= 600) { // 모바일
            return 1.2;
        } else if (width <= 1024) { // 태블릿
            return 1.6;
        }
    }
    // 줌
    function handleTouchMove(e) {
        const touches = e.touches;

        // 핀치 줌 처리
        if (touches.length === 2 && isZooming) {
            e.preventDefault();

            // 현재 두 손가락 사이의 거리 계산
            const xDiff = touches[0].clientX - touches[1].clientX;
            const yDiff = touches[0].clientY - touches[1].clientY;
            const currentDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (prevDiff > 0) {
                const scale = currentDiff - prevDiff;
                const zoomSpeed = 0.005;
                const diveceScale = getMaxDevice();

                const newScale = Math.max(0.5, Math.min(diveceScale, currentScale + (scale * zoomSpeed)));

                if (selectedElement) {
                    selectedElement.style.transform = `scale(${newScale})`;
                    currentScale = newScale;
                }
            }

            prevDiff = currentDiff;
            return;
        }

        // 한 손가락 터치는 기존 drag 호출
        if (isDragging) {
            drag(e);
        }
    }
    // 드레그
    function drag(e) {
        if (isDragging && selectedElement) {
            e.preventDefault()

            const compRect = composition.getBoundingClientRect()
            const elemRect = selectedElement.getBoundingClientRect()

            let clientX, clientY

            if (e.type === 'mousemove') {
                clientX = e.clientX
                clientY = e.clientY
            } else if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX
                clientY = e.touches[0].clientY
            }

            // 새로운 위치 계산
            let newX = clientX - initialX
            let newY = clientY - initialY

            // composition 영역 제한
            const maxX = compRect.width - elemRect.width
            const maxY = compRect.height - elemRect.height

            // 위치 제한 적용
            newX = Math.max(0, Math.min(newX, maxX))
            newY = Math.max(0, Math.min(newY, maxY))

            // left/top으로 위치 설정
            selectedElement.style.left = `${newX}px`
            selectedElement.style.top = `${newY}px`
        }
    }

    // 드레그 끝
    function handleTouchEnd(e) {
        if (isZooming) {
            isZooming = false;
            prevDiff = -1;
            touchHistory.length = 0;
        }
        dragEnd();
    }

    function dragEnd() {
        isDragging = false

        if (selectedElement) {
            selectedElement = null
        }
    }
    // 모바일에서 드래그 중 스크롤 방지
    composition.addEventListener('touchmove', function (e) {
        if (isDragging) {
            e.preventDefault()
        }
    }, { passive: false })
}