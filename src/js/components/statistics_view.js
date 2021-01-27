import { getRoomState } from './room_state';

function createStatistics() {
    const roomState = getRoomState();
    const statistics = document.querySelector('#game-statistics');
    document.querySelector('#menu-stats-button').addEventListener('click', () => {
        const result = [];
        const allGames = roomState.getAllGames();
        for (const [name, time] of Object.entries(allGames)) {
            result.push(`${name} - ${addZero(Math.floor(time/60))}:${addZero(time % 60)}</br>`);
        }
        statistics.innerHTML = result.join('');
    });
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

createStatistics();
