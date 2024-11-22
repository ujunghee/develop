
function last() {
    document.addEventListener('click', async function (event) {
        // 공유 버튼 클릭
        if (event.target.classList.contains('share')) {
            const shareData = {
                title: '나만의 카드 만들기',
                text: '나만의 특별한 카드를 만들어보시와용',
                url: window.location.href
            };

            // 모바일 기기 체크
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log('Share failed:', err);
                }
            } else if (isMobile) {
                // 모바일인 경우 기본 공유 인텐트 사용
                const shareText = `${shareData.text}\n${shareData.url}`;
                window.location.href = `sms:?body=${encodeURIComponent(shareText)}`;
                // 또는 다음 중 하나를 시도할 수 있습니다
                // window.location.href = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
                // window.location.href = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareText)}`;
            } else {
                // 데스크톱에서는 클립보드에 복사
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다!');
                } catch (err) {
                    alert('죄송합니다. 이 브라우저에서는 공유하기가 지원되지 않습니다.');
                }
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