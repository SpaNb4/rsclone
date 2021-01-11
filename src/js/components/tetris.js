
import {createBoard, drawBoard, piece, gameOver, clear} from './tetrisGame.js'

const cubeImage = '.cube4',
      close = '.tetris__close',
      game = '.tetris',
      repeat = '.tetris__repeat',
      active = 'active';

let dropStart = Date.now();

document.querySelector(cubeImage).addEventListener('click', () => {
    document.querySelector(game).classList.add(active);
    startTetris();
});

document.querySelector(close).addEventListener('click', () => {
    document.querySelector(game).classList.remove(active);
    
});

document.querySelector(repeat).addEventListener('click', () => {
    startTetris();
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
            break;
        case 38:
            piece.rotate();
            dropStart = Date.now();
            break;
        case 39:
            piece.moveRight();
            dropStart = Date.now();
            break;
        case 40:
            piece.moveDown();
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