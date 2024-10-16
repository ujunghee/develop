// 네비게이션 바 요소 이벤트
function navigation() {
    let activeToggle = null;
    let popup = document.querySelector('.object');
    let colorPalette = document.querySelector('.colorpalette');
    let textField = document.querySelector('.textfield');
    let infortMore = document.querySelector('.infor');

    // 해당 클릭할 요소 선택 및 공통 이벤트 실행
    document.addEventListener('click', function (event) {

        // 변수에 할당된 요소들이 클릭할 때 handleToggle 호출
        let clickedToggle = event.target.closest('.p-b, .painting, .textfielding');
        if (clickedToggle) {
            handleToggle(clickedToggle);
        }

        // scroll 요소 클릭할 때 closeAllPopups 호출
        let scrollElement = event.target.closest('.scroll');
        if (scrollElement) {
            closeAllPopups();
        }

        // 가구 자세히보기
        if(event.target.closest('.f-button')) {
            infortMore.classList.add('on');
        }
        if(event.target.closest('.close')) {
            infortMore.classList.remove('on');
        }
    });

    //  토글 활성 비활성화
    function handleToggle(toggle) {
        if (activeToggle === toggle) {
            deactivateToggle(toggle);
        } else {
            if (activeToggle) {
                deactivateToggle(activeToggle);
            }
            activateToggle(toggle);
        }
    }

    // on 이벤트
    function activateToggle(toggle) {
        toggle.classList.add('on');
        // painting을 찾고 colorPalette에 on
        if (toggle.classList.contains('painting')) {
            colorPalette.classList.add('on');
        } else {
            popup.classList.add('on');
        }
        if(toggle.classList.contains('textfielding')) {
            textField.classList.add('on');
            popup.classList.remove('on');
        }
        activeToggle = toggle;
    }

    // on 제거
    function deactivateToggle(toggle) {
        toggle.classList.remove('on');
        popup.classList.remove('on');
        textField.classList.remove('on');
        colorPalette.classList.remove('on');
        activeToggle = null;
    }

    //  모든 팝업 전체 on 제거
    function closeAllPopups() {
        popup.classList.remove('on');
        colorPalette.classList.remove('on');
        textField.classList.remove('on');
        document.querySelectorAll('.p-b, .painting, .textfielding').forEach(toggle => toggle.classList.remove('on'));
        activeToggle = null;
    }


}