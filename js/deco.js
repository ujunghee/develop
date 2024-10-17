// 네비게이션 바 요소 이벤트
function navigation() {
    let activeToggle = null
    let popup = document.querySelector('.object')
    let colorPalette = document.querySelector('.colorpalette')
    let textField = document.querySelector('.textfield')
    let infortMore = document.querySelector('.infor')

    // 해당 클릭할 요소 선택 및 공통 이벤트 실행
    document.addEventListener('click', function (event) {

        // 변수에 할당된 요소들이 클릭할 때 handleToggle 호출
        let clickedToggle = event.target.closest('.p-b, .painting, .textfielding')
        if (clickedToggle) {
            handleToggle(clickedToggle)
        }

        // scroll 요소 클릭할 때 closeAllPopups 호출
        let scrollElement = event.target.closest('.scroll')
        if (scrollElement) {
            closeAllPopups()
        }

        // 가구 자세히보기
        if (event.target.closest('.f-button')) {
            infortMore.classList.add('on')
        }
        if (event.target.closest('.close')) {
            infortMore.classList.remove('on')

        }
    })

    //  토글 활성 비활성화
    function handleToggle(toggle) {
        if (activeToggle === toggle) {
            deactivateToggle(toggle)
        } else {
            if (activeToggle) {
                deactivateToggle(activeToggle)
            }
            activateToggle(toggle)
        }
    }

    // on 이벤트
    function activateToggle(toggle) {
        toggle.classList.add('on')
        // painting을 찾고 colorPalette에 on
        if (toggle.classList.contains('painting')) {
            colorPalette.classList.add('on')
        } else {
            popup.classList.add('on')
        }
        if (toggle.classList.contains('textfielding')) {
            textField.classList.add('on')
            popup.classList.remove('on')
        }
        activeToggle = toggle
    }

    // on 제거
    function deactivateToggle(toggle) {
        toggle.classList.remove('on')
        popup.classList.remove('on')
        textField.classList.remove('on')
        colorPalette.classList.remove('on')
        activeToggle = null
    }

    //  모든 팝업 전체 on 제거
    function closeAllPopups() {
        popup.classList.remove('on')
        colorPalette.classList.remove('on')
        textField.classList.remove('on')
        document.querySelectorAll('.p-b, .painting, .textfielding').forEach(toggle => toggle.classList.remove('on'))
        activeToggle = null
    }


}

// 오브젝트 리스트 변환
function objectItem() {
    const popupImages = document.querySelectorAll('.piclist li img')
    const nav = document.querySelector('.nav')

    const objectList = {
        nav: [
            '.furniture',
            '.jar',
            '.book',
            '.season',
        ]
    }

    const imgPaths = {
        furniture: [
            "./image/object/furniture/display-01.png",
            "./image/object/furniture/display-02.png",
            "./image/object/furniture/display-03.png",
            "./image/object/furniture/display-04.png",
            "./image/object/furniture/display-05.png",
            "./image/object/furniture/display-06.png",
            "./image/object/furniture/display-07.png",
            "./image/object/furniture/display-08.png",
            "./image/object/furniture/display-09.png",
        ],
        jar: [
            "./image/object/jar/display-11.png",
            "./image/object/jar/display-12.png",
            "./image/object/jar/display-13.png",
            "./image/object/jar/display-14.png",
            "./image/object/jar/display-15.png",
            "./image/object/jar/display-16.png",
            "./image/object/jar/display-17.png",
            "./image/object/jar/display-18.png",
            "./image/object/jar/display-19.png",
        ],
        book: [
            "./image/object/book/display-20.png",
            "./image/object/book/display-21.png",
            "./image/object/book/display-22.png",
            "./image/object/book/display-23.png",
            "./image/object/book/display-24.png",
            "./image/object/book/display-25.png",
            "./image/object/book/display-26.png",
            "./image/object/book/display-27.png",
            "./image/object/book/display-28.png",
            "./image/object/book/display-29.png",
        ]
    }


    // 오브제 공통 영역 바꾸기
    objectList.nav.forEach((selector, navIndex) => {
        const el = nav.querySelector(selector);

        if (el) {
            el.addEventListener('click', function () {
                console.log(el + '클릭')
                const category = selector.substring(1);

                if (imgPaths[category]) {
                    popupImages.forEach((image, imgIndex) => {
                        // 각 이미지에 대해, 해당 카테고리의 같은 인덱스 이미지로 변경
                        if (imgPaths[category][imgIndex]) {
                            image.src = imgPaths[category][imgIndex];
                            console.log(imgPaths[category][imgIndex])
                        }
                    });
                }

                // 현재 클릭된 버튼에 'on' 클래스 추가, 다른 버튼에서는 제거
                objectList.nav.forEach((otherSelector, otherIndex) => {
                    const otherEl = nav.querySelector(otherSelector);
                    if (otherEl) {
                        if (otherIndex === navIndex) {
                            otherEl.classList.add('on');
                        } else {
                            otherEl.classList.remove('on');
                        }
                    }
                });
            });
        }
    });
}