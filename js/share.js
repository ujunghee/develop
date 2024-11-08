
function last() {
    document.addEventListener('click', async function (event) {
        // 공유 버튼 클릭
        if (event.target.classList.contains('share')) {
            console.log('Share button clicked');

            if (!navigator.share) {
                alert('죄송합니다. 이 브라우저에서는 공유하기가 지원되지 않습니다.');
                return;
            }

            try {
                await navigator.share({
                    title: '나만의 카드 만들기',
                    text: '나만의 특별한 카드를 만들어보시와용',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        }

        // 솔브케이 클릭
        if (event.target.classList.contains('solvek')) {
            const solvek = document.querySelector('.last');
            const headerarrow = document.querySelector('.back');

            if (solvek.classList.contains('white')) {
                solvek.classList.remove('white');
                solvek.classList.add('black');
                headerarrow.classList.add('deco-prev');
                headerarrow.classList.remove('season-prev');
            }
        }

        // 뒤로가기
        if (event.target.classList.contains('deco-prev')) {
            const solvek = document.querySelector('.last');
            const headerarrow = document.querySelector('.back');

            if (solvek.classList.contains('black')) {
                solvek.classList.remove('black');
                solvek.classList.add('white');
                headerarrow.classList.remove('deco-prev');
                headerarrow.classList.add('season-prev');
            }
        }
    })
}