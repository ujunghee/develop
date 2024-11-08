function share() {
    const shareData = {
        title: "민화꾸미기",
        url: "https://ujunghee.github.io/develop/"
    };

    const shareButton = document.querySelector('.share');
    const resultElement = document.querySelector('.result');

    // 클릭 이벤트 리스너 추가
    shareButton.addEventListener("click", async () => {
        try {
            // Web Share API 실행
            await navigator.share(shareData);
            if (resultElement) {
                resultElement.textContent = "공유가 완료되었습니다!";
            }
        } catch (err) {
            if (resultElement) {
                resultElement.textContent = `공유 중 오류가 발생했습니다: ${err}`;
            }
            console.error("공유 오류:", err);
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