import {createBoard, drawBoard, piece, gameOver, clear} from './tetrisGame.js'
import { playAudio } from './utils';
import soundClickTetris from './../../assets/audio/tetris-click.mp3';

const audioClickTetris = new Audio(soundClickTetris);

let dropStart = Date.now();

export const startTetris = () => {
    createBoard();
    drawBoard();
    clear();
    drop();
}

export const KeyDown = (event) => {
    switch(event.keyCode) {
        case 37:
            piece.moveLeft();
            dropStart = Date.now();
            if(!gameOver){
                playAudio(audioClickTetris);
                audioClickTetris.currentTime = 0;
            }
            playAudio(audioClickTetris);
            break;
        case 38:
            piece.rotate();
            dropStart = Date.now();
            if(!gameOver){
                playAudio(audioClickTetris);
                audioClickTetris.currentTime = 0;
            }
            playAudio(audioClickTetris);
            break;
        case 39:
            piece.moveRight();
            dropStart = Date.now();
            if(!gameOver){
                playAudio(audioClickTetris);
                audioClickTetris.currentTime = 0;
            }
            playAudio(audioClickTetris);
            break;
        case 40:
            piece.moveDown();
            if(!gameOver){
                playAudio(audioClickTetris);
                audioClickTetris.currentTime = 0;
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
    
    if(!gameOver){
        requestAnimationFrame(drop);
    }
}