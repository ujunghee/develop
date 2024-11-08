
function last() {
    
    const shareButton = document.querySelector('.share');

    shareButton.addEventListener('click', async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: '나만의 카드 만들기',
                    text: '나만의 특별한 카드를 만들어보세요!',
                    url: window.location.href
                });
            } else {
                // 클립보드에 URL 복사
                await navigator.clipboard.writeText(window.location.href);
                alert('URL이 클립보드에 복사되었습니다.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
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