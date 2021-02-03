/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { getRoomState } from './room_state';

const secondsPerMinute = 60;

function createStatistics() {
    const roomState = getRoomState();
    const statistics = document.querySelector('#game-statistics');
    document.querySelector('#menu-stats-button').addEventListener('click', () => {
        statistics.innerHTML = '';
        const allGames = roomState.getAllGames();
        for (const [name, time] of Object.entries(allGames)) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${name.split('_').join(' ')}</td>
                <td>${addZero(Math.floor(time / secondsPerMinute))}:${addZero(time % secondsPerMinute)}</td>
            `;
            statistics.append(tr);
        }
    });
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

createStatistics();
