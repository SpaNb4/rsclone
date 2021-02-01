import {createBoard, drawBoard, piece, gameOver, clear, tetris, startTimerTetris} from './tetrisGame.js'
import { playAudio } from './utils';
import soundClickTetris from './../../assets/audio/tetris-click.mp3';

const audioClickTetris = new Audio(soundClickTetris);

let dropStart = Date.now(),
    stopGameTetris = false;

export const startTetris = () => {
    stopGameTetris = false;
    createBoard();
    drawBoard();
    clear();
    drop();
    startTimerTetris();
}

export const stopTetris = () => {
    stopGameTetris = true;
}

const audioGameTetris = () => {
    if(!stopGameTetris){
        playAudio(audioClickTetris);
    }
}

const checkGame = (movement) => {
    if (!gameOver) {
        movement;
        audioGameTetris();
    }
}

const movementLeft = () => {
    piece.moveLeft();
    dropStart = Date.now();
}

const movementUp = () => {
    piece.rotate();
    dropStart = Date.now();
}

const movementRight = () => {
    piece.moveRight();
    dropStart = Date.now();
}

const movementDown = () => {
    piece.moveDown();
}

export const KeyDown = (event) => {
    switch(event.keyCode) {
        case 37:
            checkGame(movementLeft());
            break;
        case 38:
            checkGame(movementUp());
            break;
        case 39:
            checkGame(movementRight());
            break;
        case 40:
            checkGame(movementDown());
            break;
    }
}

export const touchDown = () => {
    let start_x = 0;
    let start_y = 0;
    document.querySelector(tetris).addEventListener('touchstart', (event) => {
        start_x = event.touches[0].clientX;
        start_y = event.touches[0].clientY;
    });
    document.querySelector(tetris).addEventListener('touchend', (event) => {
        const end_x = event.changedTouches[0].clientX;
        const end_y = event.changedTouches[0].clientY;
        const x = end_x - start_x;
        const y = end_y - start_y;

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
}

const drop = () => {
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        piece.moveDown();
        dropStart = Date.now();
    }

    if(!gameOver && !stopGameTetris){
        requestAnimationFrame(drop);
    }
}