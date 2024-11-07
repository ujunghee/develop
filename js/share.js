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