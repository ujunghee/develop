// const _ = window._;
// const {gsap} = window;

//ajax start

function loadPage(page, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText
            }

            if (callback) callback();
        }
    };
    xhr.send();

}
document.addEventListener('DOMContentLoaded', function() {
    loadPage('first.html', function() {
    });

});

window.loadPage = loadPage;
