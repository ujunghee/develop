// const { forEach } = require("lodash")
// 네비게이션 바 요소 이벤트
function navigation() {
    let activeToggle = null;
    let popup = document.querySelector(".object");
    let colorPalette = document.querySelector(".colorpalette");
    let textField = document.querySelector(".textfield");
    let infortMore = document.querySelector(".infor");
    // 해당 클릭할 요소 선택 및 공통 이벤트 실행
    document.addEventListener("click", function(event) {
        // 변수에 할당된 요소들이 클릭할 때 handleToggle 호출
        let clickedToggle = event.target.closest(".p-b, .painting, .textfielding");
        if (clickedToggle) handleToggle(clickedToggle);
        // scroll 요소 클릭할 때 closeAllPopups 호출
        let scrollElement = event.target.closest(".scroll");
        if (scrollElement) closeAllPopups();
        // 가구 자세히보기
        if (event.target.closest(".f-button")) infortMore.classList.add("on");
        if (event.target.closest(".close")) infortMore.classList.remove("on");
    });
    //  토글 활성 비활성화
    function handleToggle(toggle) {
        if (activeToggle === toggle) deactivateToggle(toggle);
        else {
            if (activeToggle) deactivateToggle(activeToggle);
            activateToggle(toggle);
        }
    }
    // on 이벤트
    function activateToggle(toggle) {
        toggle.classList.add("on");
        // painting을 찾고 colorPalette에 on
        if (toggle.classList.contains("painting")) colorPalette.classList.add("on");
        else popup.classList.add("on");
        if (toggle.classList.contains("textfielding")) {
            textField.classList.add("on");
            popup.classList.remove("on");
        }
        activeToggle = toggle;
    }
    // on 제거
    function deactivateToggle(toggle) {
        toggle.classList.remove("on");
        popup.classList.remove("on");
        textField.classList.remove("on");
        colorPalette.classList.remove("on");
        activeToggle = null;
    }
    //  모든 팝업 전체 on 제거
    function closeAllPopups() {
        popup.classList.remove("on");
        colorPalette.classList.remove("on");
        textField.classList.remove("on");
        document.querySelectorAll(".p-b, .painting, .textfielding").forEach((toggle)=>toggle.classList.remove("on"));
        activeToggle = null;
    }
}
// 오브젝트 리스트 변환
function objectItem() {
    const popupImages = document.querySelectorAll(".piclist li img");
    const slideImagesMain = document.querySelectorAll(".infor-wrap .slider img");
    const dlideImagesList = document.querySelectorAll(".infor-wrap .slider-list img");
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
            "./image/object/furniture/display-09.png"
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
            "./image/object/jar/display-19.png"
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
            "./image/object/book/display-29.png"
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
                "./image/object/season/spring/display-46.png"
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
                "./image/object/season/summer/display-55.png"
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
                "./image/object/season/autumn/display-73.png"
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
                "./image/object/season/winter/display-64.png"
            ]
        }
    };
    // 가구, 도자기, 책 텍스트
    const altPaths = {
        furniture: [
            "\uC18C\uBC18",
            "\uB4A4\uC8FC",
            "\uD654\uD0C1",
            "\uD0C1\uC790",
            "\uB2E4\uAE30\uC7A5",
            "\uBA38\uB9BF \uC7A5",
            "\uB098\uC8FC \uD638\uC871\uBC18",
            "\uC218\uB0A9\uC7A5",
            "\uAF43\uBCD1 \uC0C1"
        ],
        jar: [
            "\uBC31\uC790 \uCCAD\uD654\uC1A1\uC8FD\uC778\uBB3C\uBB38 \uD56D\uC544\uB9AC",
            "\uBC31\uC790 \uC0C1\uAC10\uBAA8\uB780\uBB38 \uBCD1",
            "\uBC31\uC790 \uBCD1\uD615 \uC8FC\uC804\uC790",
            "\uBC31\uC790 \uD654\uBCD1",
            "\uCCAD\uC790 \uC591\uAC01\uC8FD\uC808\uBB38 \uBCD1",
            "\uBC31\uC790 \uD56D\uC544\uB9AC",
            "\uBC31\uC790 \uC2ED\uAC01 \uD56D\uC544\uB9AC",
            "\uCCAD\uD654\uCCA0\uD654\u2019\uC2DC\u2019\uBA85\uB098\uBE44\uBB38 \uD314\uAC01\uC5F0\uC801",
            "\uBD84\uCCAD\uC0AC\uAE30 \uBC15\uC9C0\uC5F0\uD654\uBB38 \uD3B8\uBCD1"
        ],
        book: [
            "\uBD84\uD64D\uC0C9 \uC11C\uCC45",
            "\uD30C\uB780\uC0C9 \uC11C\uCC45",
            "\uB178\uB780\uC0C9 \uC11C\uCC45",
            "\uCD08\uB85D\uC0C9 \uC11C\uCC45",
            "\uAF43\uBB34\uB2AC \uC11C\uCC45",
            "\uBCF4\uB77C\uC0C9 \uC11C\uCC45",
            "\uBD04\uBB34\uB2AC \uC11C\uCC45",
            "\uC5EC\uB984\uBB34\uB2AC \uC11C\uCC45",
            "\uD3BC\uCC98\uC9C4 \uC11C\uCC45"
        ],
        season: {
            spring: [
                "\uBCF5\uC22D\uC544",
                "\uBAA8\uB780\uAF43",
                "\uC575\uD654",
                "\uD638\uB791\uC774\xb7\uAE4C\uCE58",
                "\uBAA8\uB780\xb7\uD654\uBCD1",
                "\uC11C\uAC01\uD1B5",
                "\uB098\uBE441",
                "\uB098\uBE442",
                "\uB098\uBE443"
            ],
            summer: [
                "\uBB3C\uACE0\uAE30",
                "\uAC70\uBD81\uC774",
                "\uC18C\uB098\uBB34",
                "\uC11D\uB958\xb7\uC11D\uB958\uAF43",
                "\uC5F0\uAF43\xb7\uC218\uBC18",
                "\uB300\uB098\uBB34",
                "\uC601\uC9C0\uBC84\uC12F",
                "\uC218\uBC15",
                "\uACE0\uC591\uC774"
            ],
            autumn: [
                "\uD638\uBC15",
                "\uC218\uD0C9",
                "\uAC10",
                "\uBD88\uC218\uAC10",
                "\uACF5\uC791\uC0C8 \uAE43\uD138",
                "\uAD6D\uD654",
                "\uC811\uC2DC\uAF43",
                "\uC5B4\uCE58",
                "\uB2E8\uD48D"
            ],
            winter: [
                "\uD5A5\uB85C\xb7\uD1A0\uB07C",
                "\uC625\uD1A0\uB07C",
                "\uC870\uB871\uBC15",
                "\uB9E4\uD654",
                "\uD544\uD1B5",
                "\uD30C\uCD08\uC78E",
                "\uBCBC\uB8E8",
                "\uCE58\uC790\uAF43",
                "\uBC14\uB451"
            ]
        }
    };
    const seasonAlt = {
        spring: [
            "\uC80A\uC74C\uACFC \uCCAD\uCD98, \uC544\uB984\uB2E4\uC6C0",
            "\uBD04, \uBC88\uC601",
            "\uBD04, 4\uC6D4\uC758 \uAF43",
            "\uBD88\uC6B4\uC744 \uB0B4\uCAD3\uB294, \uC88B\uC740 \uC18C\uC2DD",
            "\uBD04, \uBC88\uC601, \uC9C0\uC801\uC131\uCDE8",
            "\uD589\uBCF5",
            "\uBCC0\uD654\uC640 \uBD88\uBA78, \uAE30\uC068",
            "\uBCC0\uD654\uC640 \uBD88\uBA78, \uAE30\uC068",
            "\uBCC0\uD654\uC640 \uBD88\uBA78, \uAE30\uC068"
        ],
        summer: [
            "\uBC88\uC601,\uC5ED\uB3D9\uC131,\uBCBD\uC0AC",
            "\uC7A5\uC218\uC758 \uC0C1\uC9D5",
            "\uBD88\uB85C\uC7A5\uC0DD",
            "\uC720\uC6D4, \uC790\uC2DD\uBC88\uC131, \uBC88\uCC3D, \uD48D\uC694",
            "\uCE60\uC6D4, \uC5EC\uB984, \uC544\uB984\uB2E4\uC6C0",
            "\uC7A5\uC218\uB97C \uCD95\uD558\uD558\uACE0 \uAE30\uC6D0",
            "\uBD88\uB85C\uC7A5\uC0DD",
            "\uB2E4\uC0B0, \uC7A5\uC218, \uD48D\uC694",
            "\uC7A5\uC218, \uC545\uADC0\uB97C \uCAD3\uB294"
        ],
        autumn: [
            "\uBCF5\uACFC \uD48D\uC694",
            "\uCD9C\uC138\uC640 \uC131\uACF5",
            "\uBC88\uCC3D, \uBCBC\uC2AC\uC774 \uB192\uC544\uC9D0",
            "\uBD80, \uC2E0\uC758 \uAC00\uD638, \uBCF5\uC758\uC0C1\uC9D5",
            "\uBCBC\uC2AC, \uAD00\uC9C1",
            "\uC2DC\uC6D4, \uAC00\uC744, \uD488\uC704",
            "\uAD6C\uC6D4, \uC2B9\uC9C4",
            "\uAD00\uC6B4, \uC2B9\uC9C4",
            "\uB300\uAD90, \uC870\uC815"
        ],
        winter: [
            "\uD559\uBB38, \uC138\uC0C1\uB9CC\uBB3C, \uBA85\uC608, \uC9C0\uD61C",
            "\uC9C0\uD61C, \uBD80\uD65C, \uBD88\uBA78",
            "\uAE38\uC0C1, \uC120\uBE44, \uC561\uC6B4 \uBB3C\uB9AC\uCE68",
            "\uC120\uBE44, \uACA8\uC6B8, \uC120\uBE44\uC758 \uAE30\uD488",
            "\uD559\uBB38\uC758 \uC131\uCDE8",
            "\uB3C5\uD559, \uC2E0\uC120, \uAE30\uC0AC\uD68C\uC0DD, \uBD80\uADC0",
            "\uD559\uBB38",
            "\uC2E0\uC911\uD568, 11\uC6D4",
            "\uD559\uC790\uC758 \uD45C\uC0C1"
        ]
    };
    // 카테고리 설정
    const categoryConfig = {
        furniture: {
            buttonStates: {
                fButton: true,
                fTwist: false
            },
            name: "furniture",
            text: "\uAC00\uAD6C \uC790\uC138\uD788\uBCF4\uAE30 >"
        },
        jar: {
            buttonStates: {
                fButton: true,
                fTwist: false
            },
            name: "jar",
            text: "\uB3C4\uC790\uAE30 \uC790\uC138\uD788\uBCF4\uAE30 >"
        },
        book: {
            buttonStates: {
                fButton: false,
                fTwist: true
            },
            name: "book"
        },
        season: {
            buttonStates: {
                fButton: true,
                fTwist: false
            },
            name: "furniture",
            text: {
                spring: "\uBD04\uC758 \uB9CC\uBB3C \uC790\uC138\uD788\uBCF4\uAE30 >",
                summer: "\uC5EC\uB984\uC758 \uB9CC\uBB3C \uC790\uC138\uD788\uBCF4\uAE30 >",
                autumn: "\uAC00\uC744\uC758 \uB9CC\uBB3C \uC790\uC138\uD788\uBCF4\uAE30 >",
                winter: "\uACA8\uC6B8\uC758 \uB9CC\uBB3C \uC790\uC138\uD788\uBCF4\uAE30 >"
            }
        }
    };
    // BUTTON_SELECTORS
    const BUTTON_SELECTORS = {
        fButton: ".f-button",
        fTwist: ".f-twist"
    };
    // 상태 관리
    let seasonValue = "spring";
    // 네비게이션 클릭 이벤트 핸들러
    function handleNavClick(e) {
        const navElement = e.target.closest(".p-b");
        if (!navElement) return;
        const category = findCategory(navElement);
        if (!isValidCategory(category)) return;
        updateButtonVisibility(category);
        updateButtonText(category, navElement);
        updateImages(category);
    }
    // 클릭된 요소의 카테고리 찾기
    function findCategory(element) {
        return Object.keys(categoryConfig).find((key)=>element.classList.contains(key));
    }
    // 카테고리 유효성 검사
    function isValidCategory(category) {
        if (!category) {
            console.warn("\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uCE74\uD14C\uACE0\uB9AC\uC785\uB2C8\uB2E4.");
            return false;
        }
        return true;
    }
    // 버튼 표시/숨김 상태 업데이트
    function updateButtonVisibility(category) {
        const buttonStates = categoryConfig[category].buttonStates;
        Object.entries(BUTTON_SELECTORS).forEach(([key, selector])=>{
            const element = document.querySelector(selector);
            if (element) element.style.display = buttonStates[key] ? "block" : "none";
        });
    }
    seasonValue = Object.keys(categoryConfig.season.text)[0];
    // 버튼 텍스트 업데이트
    function updateButtonText(category, navElement) {
        const fButton = document.querySelector(BUTTON_SELECTORS.fButton);
        const textElements = document.querySelectorAll(".f-s-13");
        if (!fButton) return;
        if (category === "season") {
            const clickedSeason = navElement.dataset.season || navElement.value;
            if (clickedSeason) {
                fButton.textContent = categoryConfig.season.text[clickedSeason];
                seasonValue = clickedSeason;
                fButton.setAttribute("data-season", "season");
                textElements.forEach((textEl, index)=>{
                    textEl.textContent = seasonAlt[seasonValue][index];
                    textEl.classList.add("on");
                });
            }
        } else {
            fButton.textContent = categoryConfig[category].text;
            fButton.setAttribute("data-season", "");
            textElements.forEach((textEl)=>{
                textEl.textContent = "";
                textEl.classList.remove("on");
            });
        }
    }
    // 이벤트 리스너 등록
    document.addEventListener("click", handleNavClick);
    // 이미지 이벤트
    function updateImages(category) {
        // 좌우반전 이벤트 s
        const fTwist = document.querySelector(".f-twist");
        let isRotate = false;
        fTwist.removeEventListener("click", handleRotation);
        function handleRotation() {
            if (fTwist.style.display === "block") {
                isRotate = !isRotate;
                popupImages.forEach((img)=>{
                    if (isRotate) img.classList.add("rotated");
                    else img.classList.remove("rotated");
                });
            }
        }
        fTwist.addEventListener("click", handleRotation);
        // 메뉴 카테고리별 이미지 교체
        function updateImagesByCategory(imageElements, category) {
            imageElements.forEach((img, index)=>{
                img.classList.remove("rotated");
                const paths = category === "season" ? {
                    images: imgPaths.season[seasonValue],
                    alts: altPaths.season[seasonValue]
                } : {
                    images: imgPaths[category],
                    alts: altPaths[category]
                };
                if (index < paths.images.length) {
                    img.src = paths.images[index];
                    img.alt = paths.alts[index];
                    const slideElement1 = img.closest(".swiper-slide");
                    if (slideElement1) {
                        const nameElement = slideElement1.querySelector(".s-15");
                        if (nameElement) nameElement.textContent = paths.alts[index];
                    }
                } else {
                    img.src = "";
                    img.alt = "";
                    if (slideElement) {
                        const nameElement = slideElement.querySelector(".s-15");
                        if (nameElement) nameElement.textContent = "";
                    }
                }
            });
        }
        // 사용
        updateImagesByCategory(popupImages, category);
        updateImagesByCategory(slideImagesMain, category);
        updateImagesByCategory(dlideImagesList, category);
    }
    return {
        imgPaths,
        altPaths,
        seasonAlt,
        categoryConfig
    };
}
// 팔레트 색상 전환
function palettebg() {
    const paletList = [
        "b-1",
        "b-2",
        "b-3",
        "b-4"
    ];
    const seasonPalette = [
        "spring",
        "summer",
        "autumn",
        "winter"
    ];
    const decoBg = document.querySelector(".deco-box");
    seasonPalette.forEach((season)=>{
        paletList.forEach((className)=>{
            const element = document.querySelector(`.palette.${season} .${className}`);
            if (element) element.addEventListener("click", function() {
                switch(season){
                    case "spring":
                        switch(className){
                            case "b-1":
                                decoBg.style.background = 'linear-gradient(180deg, #FFF 12.68%, #FAF6FF 56.66%, #FFECF4 99.99%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-2":
                                decoBg.style.background = 'linear-gradient(180deg, #FFF 29%, #FFF7F7 62.5%, #FFE6E1 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-3":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 242, 242, 0.70) 61.17%, #FAFFC7 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-4":
                                decoBg.style.background = '#fff url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                        }
                        break;
                    case "summer":
                        switch(className){
                            case "b-1":
                                decoBg.style.background = 'linear-gradient(180deg, #FFF 12.68%, #F4FEFF 56.66%, #E0F2FF 99.99%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-2":
                                decoBg.style.background = 'linear-gradient(175deg, #FFF 14.33%, #F5F3FF 56.83%, #DBE7FF 97.65%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-3":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #E6F2FF 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-4":
                                decoBg.style.background = '#fff url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                        }
                        break;
                    case "autumn":
                        switch(className){
                            case "b-1":
                                decoBg.style.background = 'linear-gradient(180deg, #FFF 12.68%, #FFF3EA 56.66%, #F6F3E1 99.99%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-2":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF1CC 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-3":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FBFFE3 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-4":
                                decoBg.style.background = '#fff url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                        }
                        break;
                    case "winter":
                        switch(className){
                            case "b-1":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(231, 253, 247, 0.50) 50%, #D8E6E8 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-2":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #EEF9FF 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-3":
                                decoBg.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #DCE2F6 100%), url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                            case "b-4":
                                decoBg.style.background = '#fff url("../image/main/visaul_bg.jpg") 50% / cover no-repeat';
                                break;
                        }
                        break;
                }
            });
        });
    });
}

//# sourceMappingURL=index.c470cbad.js.map
