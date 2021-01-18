
import {createBoard, drawBoard, piece, gameOver, clear} from './tetrisGame.js'
import { playAudio } from './utils';
import soundClickTetris from './../../assets/audio/tetris-click.mp3';

const cubeImage = '.cube4',
      close = '.tetris__close',
      game = '.tetris',
      repeat = '.tetris__repeat',
      active = 'active',
      audioClickTetris = new Audio(soundClickTetris);

let dropStart = Date.now();

document.querySelector(cubeImage).addEventListener('click', () => {
    document.querySelector(game).classList.add(active);
    startTetris();
    playAudio(audioClickTetris);
});

document.querySelector(close).addEventListener('click', () => {
    document.querySelector(game).classList.remove(active);
    playAudio(audioClickTetris);
    
});

document.querySelector(repeat).addEventListener('click', () => {
    startTetris();
    playAudio(audioClickTetris);
});

const startTetris = () => {
    createBoard();
    drawBoard();
    clear();
    drop();
}


const KeyDown = (event) => {
    switch(event.keyCode) {
        case 37:
            piece.moveLeft();
            dropStart = Date.now();
            playAudio(audioClickTetris);
            break;
        case 38:
            piece.rotate();
            dropStart = Date.now();
            playAudio(audioClickTetris);
            break;
        case 39:
            piece.moveRight();
            dropStart = Date.now();
            playAudio(audioClickTetris);
            break;
        case 40:
            piece.moveDown();
            playAudio(audioClickTetris);
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

document.addEventListener("keydown", KeyDown);