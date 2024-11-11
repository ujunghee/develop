function last() {
    document.addEventListener("click", async function(event) {
        // 공유 버튼 클릭
        if (event.target.classList.contains("share")) {
            console.log("Share button clicked");
            if (!navigator.share) {
                alert("\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C\uB294 \uACF5\uC720\uD558\uAE30\uAC00 \uC9C0\uC6D0\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
                return;
            }
            try {
                await navigator.share({
                    title: "\uB098\uB9CC\uC758 \uCE74\uB4DC \uB9CC\uB4E4\uAE30",
                    text: "\uB098\uB9CC\uC758 \uD2B9\uBCC4\uD55C \uCE74\uB4DC\uB97C \uB9CC\uB4E4\uC5B4\uBCF4\uC2DC\uC640\uC6A9",
                    url: window.location.href
                });
            } catch (err) {
                console.log("Share failed:", err);
            }
        }
        // 솔브케이 클릭
        if (event.target.classList.contains("solvek")) {
            const solvek = document.querySelector(".last");
            const headerarrow = document.querySelector(".back");
            if (solvek.classList.contains("white")) {
                solvek.classList.remove("white");
                solvek.classList.add("black");
                headerarrow.classList.add("deco-prev");
                headerarrow.classList.remove("season-prev");
            }
        }
        // 뒤로가기
        if (event.target.classList.contains("deco-prev")) {
            const solvek = document.querySelector(".last");
            const headerarrow = document.querySelector(".back");
            if (solvek.classList.contains("black")) {
                solvek.classList.remove("black");
                solvek.classList.add("white");
                headerarrow.classList.remove("deco-prev");
                headerarrow.classList.add("season-prev");
            }
        }
    });
}

//# sourceMappingURL=index.4814ce60.js.map
