/* eslint-disable indent */
/* eslint-disable import/no-cycle */
// eslint-disable-next-line object-curly-newline
import { createBoard, drawBoard, piece, gameOver, clear, tetris, startTimerTetris } from './tetrisGame';
import { playAudio } from './utils';
import soundClickTetris from '../../assets/audio/tetris-click.mp3';

const audioClickTetris = new Audio(soundClickTetris);

let dropStart = Date.now();
let stopGameTetris = false;

export const startTetris = () => {
    stopGameTetris = false;
    createBoard();
    drawBoard();
    clear();
    // eslint-disable-next-line no-use-before-define
    drop();
    startTimerTetris();
}

export const stopTetris = () => {
    stopGameTetris = true;
};

const audioGameTetris = () => {
    if (!stopGameTetris) {
        playAudio(audioClickTetris);
    }
};

const checkGame = (movement) => {
    if (!gameOver) {
        movement();
        audioGameTetris();
    }
};

const movementLeft = () => {
    piece.moveLeft();
    dropStart = Date.now();
};

const movementUp = () => {
    piece.rotate();
    dropStart = Date.now();
};

const movementRight = () => {
    piece.moveRight();
    dropStart = Date.now();
};

const movementDown = () => {
    piece.moveDown();
};

export const KeyDown = (event) => {
    switch (event.keyCode) {
        case 37:
            checkGame(movementLeft);
            break;
        case 38:
            checkGame(movementUp);
            break;
        case 39:
            checkGame(movementRight);
            break;
        case 40:
            checkGame(movementDown);
            break;
        default:
            break;
    }
};

export const touchDown = () => {
    let startX = 0;
    let startY = 0;
    document.querySelector(tetris).addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    document.querySelector(tetris).addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const x = endX - startX;
        const y = endY - startY;

        if (Math.abs(x) >= Math.abs(y)) {
            if (x > 0) {
                checkGame(movementRight());
            } else if (x < 0) {
                checkGame(movementLeft());
            }
        } else if (y > 0) {
            checkGame(movementDown());
        } else if (y < 0) {
            checkGame(movementUp());
        }
    });
};

const drop = () => {
    const now = Date.now();
    const delta = now - dropStart;
    if (delta > 1000) {
        piece.moveDown();
        dropStart = Date.now();
    }

    if (!gameOver && !stopGameTetris) {
        requestAnimationFrame(drop);
    }
};
