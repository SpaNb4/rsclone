const updateInterval = 1000;

function createTimerView(container, timer) {
    const time = document.createElement('div');
    time.classList.add('time');
    time.innerHTML = `<i class="material-icons">alarm</i>
                        <span class='minutes'>00</span>
                        <span class='separator'>:</span>
                        <span class='seconds'>00</span>`;
    container.append(time);
    const seconds = time.querySelector('.seconds');
    const minutes = time.querySelector('.minutes');

    function pad(val) {
        return val > 9 ? val : `0${val}`;
    }
    setInterval(() => {
        let currentTime = timer.getTimeSeconds();
        seconds.innerHTML = pad(currentTime % 60);
        minutes.innerHTML = pad(parseInt(currentTime / 60, 10));
    }, updateInterval);
}

export { createTimerView };
