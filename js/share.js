
function last() {
    const shareButton = document.querySelector('.share');
    
    shareButton.addEventListener('click', async () => {
        console.log('Share button clicked');  // 버튼 클릭 확인용 로그
        
        if (!navigator.share) {
            console.log('Web Share API not supported');  // API 지원 여부 확인용 로그
            alert('죄송합니다. 이 브라우저에서는 공유하기가 지원되지 않습니다.');
            return;
        }

        try {
            console.log('Attempting to share...');  // 공유 시도 확인용 로그
            await navigator.share({
                title: '나만의 카드 만들기',
                text: '나만의 특별한 카드를 만들어보세요!',
                url: window.location.href
            });
            console.log('Successfully shared');  // 공유 성공 확인용 로그
        } catch (err) {
            console.log('Share failed:', err);  // 에러 확인용 로그
            alert('공유하기에 실패했습니다.');
        }
    });
    
    document.addEventListener('click', function (event){
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