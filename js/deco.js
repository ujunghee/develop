function navigation() {
    let activeToggle = null;
    let popup = document.querySelector('.object');
    let colorPalette = document.querySelector('.colorpalette');

    document.addEventListener('click', function (event) {
        let clickedToggle = event.target.closest('.p-b, .painting');

        if (clickedToggle) {
            handleToggle(clickedToggle);
        }

        let scrollElement = event.target.closest('.scroll');
        if (scrollElement) {
            closeAllPopups();
        }
    });

    function handleToggle(toggle) {
        if (activeToggle === toggle) {
            deactivateToggle(toggle);
        } else {
            if (activeToggle) {
                deactivateToggle(activeToggle);
            }
            activateToggle(toggle);
        }
    }

    function activateToggle(toggle) {
        toggle.classList.add('on');
        if (toggle.classList.contains('painting')) {
            colorPalette.classList.add('on');
        } else {
            popup.classList.add('on');
        }
        activeToggle = toggle;
    }

    function deactivateToggle(toggle) {
        toggle.classList.remove('on');
        popup.classList.remove('on');
        colorPalette.classList.remove('on');
        activeToggle = null;
    }

    function closeAllPopups() {
        popup.classList.remove('on');
        colorPalette.classList.remove('on');
        document.querySelectorAll('.p-b, .painting').forEach(toggle => toggle.classList.remove('on'));
        activeToggle = null;
    }
}