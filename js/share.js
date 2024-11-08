function share() {
    // Share 버튼 요소 가져오기
    const shareButton = document.querySelector('.share');
    const resultElement = document.querySelector('.result');
    
    // Web Share API 지원 여부 확인
    if (!navigator.share) {
        if (resultElement) {
            resultElement.textContent = "이 브라우저는 공유 기능을 지원하지 않습니다.";
        }
        console.log("Web Share API not supported");
        return;
    }

    const shareData = {
        title: "민화꾸미기",
        url: window.location.href
    };

    // 클릭 이벤트 리스너 추가
    shareButton.addEventListener("click", async () => {
        try {
            if (resultElement) {
                resultElement.textContent = "공유하는 중...";
            }

            await navigator.share(shareData);
            
            if (resultElement) {
                resultElement.textContent = "공유가 완료되었습니다!";
                
                setTimeout(() => {
                    resultElement.textContent = "";
                }, 3000);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                if (resultElement) {
                    resultElement.textContent = "공유가 취소되었습니다.";
                }
            } else {
                if (resultElement) {
                    resultElement.textContent = "공유 중 오류가 발생했습니다.";
                }
                console.error("공유 오류:", err);
            }
            
            setTimeout(() => {
                if (resultElement) {
                    resultElement.textContent = "";
                }
            }, 3000);
        }
    });
}

function last() {
    document.addEventListener('click', function (){
            // 솔브케이 클릭
            if(event.target.classList.contains('solvek')) {
                const solvek = document.querySelector('.last')
                const headerarrow = document.querySelector('.back')

                if(solvek.classList.contains('white')) {
                    solvek.classList.remove('white')
                    solvek.classList.add('black')
                    headerarrow.classList.add('deco-prev')
                    headerarrow.classList.remove('season-prev')
                }
            }
            
            // 뒤로가기
            if(event.target.classList.contains('deco-prev')) {
                // loadPage('last.html')
                const solvek = document.querySelector('.last')
                const headerarrow = document.querySelector('.back')

                if(solvek.classList.contains('black')) {
                    solvek.classList.remove('black')
                    solvek.classList.add('white')
                    headerarrow.classList.remove('deco-prev')
                    headerarrow.classList.add('season-prev')
                }
            }
            
    })
}