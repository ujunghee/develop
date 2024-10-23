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


    // 가구, 도자기, 책 이미지
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
        ],
        season: {
            spring: [
                "./image/object/season/spring/display-38.png",
                "./image/object/season/spring/display-39.png",
                "./image/object/season/spring/display-40.png",
                "./image/object/season/spring/display-41.png",
                "./image/object/season/spring/display-42.png",
                "./image/object/season/spring/display-43.png",
                "./image/object/season/spring/display-44.png",
                "./image/object/season/spring/display-45.png",
                "./image/object/season/spring/display-46.png",
            ],
            summer: [
                "./image/object/season/summer/display-47.png",
                "./image/object/season/summer/display-48.png",
                "./image/object/season/summer/display-49.png",
                "./image/object/season/summer/display-50.png",
                "./image/object/season/summer/display-51.png",
                "./image/object/season/summer/display-52.png",
                "./image/object/season/summer/display-53.png",
                "./image/object/season/summer/display-54.png",
                "./image/object/season/summer/display-55.png",
            ],
            autumn: [
                "./image/object/season/autumn/display-65.png",
                "./image/object/season/autumn/display-66.png",
                "./image/object/season/autumn/display-67.png",
                "./image/object/season/autumn/display-68.png",
                "./image/object/season/autumn/display-69.png",
                "./image/object/season/autumn/display-70.png",
                "./image/object/season/autumn/display-71.png",
                "./image/object/season/autumn/display-72.png",
                "./image/object/season/autumn/display-73.png",
            ],
            winter: [
                "./image/object/season/winter/display-56.png",
                "./image/object/season/winter/display-57.png",
                "./image/object/season/winter/display-58.png",
                "./image/object/season/winter/display-59.png",
                "./image/object/season/winter/display-60.png",
                "./image/object/season/winter/display-61.png",
                "./image/object/season/winter/display-62.png",
                "./image/object/season/winter/display-63.png",
                "./image/object/season/winter/display-64.png",
            ]
        }
    }

    // 가구, 도자기, 책 텍스트
    const altPaths = {
        furniture: [
            "소반",
            "뒤주",
            "화탁",
            "탁자",
            "다기장",
            "머릿 장",
            "나주 호족반",
            "수납장",
            "꽃병 상",
        ],
        jar: [
            "백자 청화송죽인물문 항아리",
            "백자 상감모란문 병",
            "백자 병형 주전자",
            "백자 화병",
            "청자 양각죽절문 병",
            "백자 항아리",
            "백자 십각 항아리",
            "청화철화’시’명나비문 팔각연적",
            "분청사기 박지연화문 편병",
        ],
        book: [
            "분홍색 서책",
            "파란색 서책",
            "노란색 서책",
            "초록색 서책",
            "꽃무늬 서책",
            "보라색 서책",
            "봄무늬 서책",
            "여름무늬 서책",
            "펼처진 서책",
        ],
        season: {
            spring: [
                "복숭아",
                "모란꽃",
                "앵화",
                "호랑이·까치",
                "모란·화병",
                "서각통",
                "나비1",
                "나비2",
                "나비3",
            ],
            summer: [
                "물고기",
                "거북이",
                "소나무",
                "석류·석류꽃",
                "연꽃·수반",
                "대나무",
                "영지버섯",
                "수박",
                "고양이",
            ],
            autumn: [
                "호박",
                "수탉",
                "감",
                "불수감",
                "공작새 깃털",
                "국화",
                "접시꽃",
                "어치",
                "단풍",
            ],
            winter: [
                "향로·토끼",
                "옥토끼",
                "조롱박",
                "매화",
                "필통",
                "파초잎",
                "벼루",
                "치자꽃",
                "바둑",
            ],
        }
    }
    const seasonAlt = {
        spring: [
            "젊음과 청춘, 아름다움",
            "봄, 번영",
            "봄, 4월의 꽃",
            "불운을 내쫓는, 좋은 소식",
            "봄, 번영, 지적성취",
            "행복",
            "변화와 불멸, 기쁨",
            "변화와 불멸, 기쁨",
            "변화와 불멸, 기쁨",
        ],
        summer: [
            "번영,역동성,벽사",
            "장수의 상징",
            "불로장생",
            "유월, 자식번성, 번창, 풍요",
            "칠월, 여름, 아름다움",
            "장수를 축하하고 기원",
            "불로장생",
            "다산, 장수, 풍요",
            "장수, 악귀를 쫓는",
        ],
        autumn: [
            "복과 풍요",
            "출세와 성공",
            "번창, 벼슬이 높아짐",
            "부, 신의 가호, 복의상징",
            "벼슬, 관직",
            "시월, 가을, 품위",
            "구월, 승진",
            "관운, 승진",
            "대궐, 조정",
        ],
        winter: [
            "학문, 세상만물, 명예, 지혜",
            "지혜, 부활, 불멸",
            "길상, 선비, 액운 물리침",
            "선비, 겨울, 선비의 기품",
            "학문의 성취",
            "독학, 신선, 기사회생, 부귀",
            "학문",
            "신중함, 11월",
            "학자의 표상",
        ],
    }

    // 카테고리 설정
    const categoryConfig = {
        furniture: {
            buttonStates: { fButton: true, fTwist: false },
            name: 'furniture',
            text: '가구 자세히보기 >'
        },
        jar: {
            buttonStates: { fButton: true, fTwist: false },
            name: 'jar',
            text: '도자기 자세히보기 >'
        },
        book: {
            buttonStates: { fButton: false, fTwist: true },
            name: 'book',
        },
        season: {
            buttonStates: { fButton: true, fTwist: false },
            name: 'furniture',
            text: {
                spring: "봄의 만물 자세히보기 >",
                summer: "여름의 만물 자세히보기 >",
                autumn: "가을의 만물 자세히보기 >",
                winter: "겨울의 만물 자세히보기 >",
            }
        },
    }


    // navigation 클릭 이벤트
    document.addEventListener('click', handleNavClick)
    let seasonValue = 'spring'

    function handleNavClick(e) {
        const navElement = e.target.closest('.p-b')
        if (!navElement) return

        const fButton = document.querySelector('.f-button')
        const fTwist = document.querySelector('.f-twist')

        // 현재 클릭된 요소의 카테고리 찾기
        const category = Object.keys(categoryConfig).find(key =>
            navElement.classList.contains(key)
        )

        // 버튼 상태 업데이트
        if (!category) {
            console.warn('유효하지 않은 카테고리입니다.')
            return
        }

        // buttonStates에 따라 버튼 표시/숨김 처리
        if (fButton) {
            fButton.style.display = categoryConfig[category].buttonStates.fButton ? 'block' : 'none'
        }
        if (fTwist) {
            fTwist.style.display = categoryConfig[category].buttonStates.fTwist ? 'block' : 'none'
        }


        // 텍스트 업데이트
        if (category === 'season') {
            const clickedSeason = navElement.dataset.season || navElement.value
            if (clickedSeason && fButton) {
                fButton.textContent = categoryConfig.season.text[clickedSeason]
            }
            seasonValue = clickedSeason
        } else {
            if (fButton) {
                fButton.textContent = categoryConfig[category].text
            }
        }

        // 이미지 업데이트
        updateImages(category)
    }


    // 이미지 이벤트
    function updateImages(category) {

        if (!imgPaths[category]) {
            console.warn(`${category}에 대한 이미지 경로가 없습니다.`)
            return
        }

        // 좌우반전 이벤트 s
        const fTwist = document.querySelector('.f-twist')
        let isRotate = false;

        fTwist.removeEventListener('click', handleRotation);

        function handleRotation() {
            if (fTwist.style.display === 'block') {
                isRotate = !isRotate;
                popupImages.forEach(img => {
                    if (isRotate) {
                        img.classList.add('rotated');
                    } else {
                        img.classList.remove('rotated');
                    }
                });
            }
        }
        fTwist.addEventListener('click', handleRotation);
        // 좌우반전 이벤트 e


        popupImages.forEach((img, index) => {

            // 좌우반전
            img.classList.remove('rotated');

            // 카테고리별 이미지 교체
            if (category === 'season') {
                if (index < imgPaths.season[seasonValue].length) {
                    img.src = imgPaths.season[seasonValue][index]
                    img.alt = altPaths.season[seasonValue][index]

                } else {
                    img.src = ''
                    img.alt = ''
                }
            } else {
                if (index < imgPaths[category].length) {
                    img.src = imgPaths[category][index]
                    img.alt = altPaths[category][index]

                } else {
                    img.src = ''
                    img.alt = ''
                }
            }

        })
    }
}