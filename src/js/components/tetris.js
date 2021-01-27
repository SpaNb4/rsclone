import {createBoard, drawBoard, piece, gameOver, clear} from './tetrisGame.js'
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
}

export const stopTetris = () => {
    stopGameTetris = true;
}

export const KeyDown = (event) => {
    switch(event.keyCode) {
        case 37:
            piece.moveLeft();
            dropStart = Date.now();
            if(!stopGameTetris){
                playAudio(audioClickTetris);
            }
            break;
        case 38:
            piece.rotate();
            dropStart = Date.now();
            if(!stopGameTetris){
                playAudio(audioClickTetris);
            }
            break;
        case 39:
            piece.moveRight();
            dropStart = Date.now();
            if(!stopGameTetris){
                playAudio(audioClickTetris);
            }
            break;
        case 40:
            piece.moveDown();
            if(!stopGameTetris){
                playAudio(audioClickTetris);
            }
            break;
    }
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