import { state } from './state';
import { memoryGame } from './memory';
import { simonGame } from './simon';
import { box, picture, onBoxClick, onPictureClick, closeHangmanGame, closeGemPuzzleGame } from './wall3';
import { guessAnumberGame } from './guess-a-number.ts';
import { gameTicTacToe, closeGameTicTacToe } from './tic-tac-toe';
import { startTetris, KeyDown } from './tetris';
import { snakeGame } from './snake';
import { KeyDownLock, arrLock, layoutLockGame } from './game-over';

const ACTIVE = 'active';
const leftArrow = document.querySelector('#room-arrow-left');
const rightArrow = document.querySelector('#room-arrow-right');
const clock = document.querySelector('#clock');
const piano = document.querySelector('#piano');
const memory = document.querySelector('#memory-game');
const memoryClose = document.querySelector('#memory-game-close');
const simon = document.querySelector('#simon-game');
const simonClose = document.querySelector('#simon-game-close');
const overlay = document.querySelector('#overlay');
const paperitem = document.querySelector('#paper_two');
const guessAnumber = document.querySelector('#guess-a-number');
const frameImage = document.querySelector('.frame-image');
const gameTicTacToePlay = document.querySelector('.tic-tac-toe');
const closeTicTacToe = document.querySelector('.tic-tac-toe__close');
const repeatTicTacToe = document.querySelector('.tic-tac-toe__repeat');
const cubeImage = document.querySelector('.cube4');
const gameTetris = document.querySelector('.tetris');
const closeTetris = document.querySelector('.tetris__close');
const repeatTetris = document.querySelector('.tetris__repeat');
const lock = document.querySelector('.game-over-lock');
const closeLock = document.querySelector('.game-over-lock__close');
const lockContent = document.querySelector('.game-over-lock__content');

const paperitemone = document.querySelector('#paper_one');
const snake = document.querySelector('#snake');
const snakeClose = document.querySelector('.snake__close');
const guessANumberClose = document.querySelector('.guess-a-number__close');

const walls = [document.querySelector('#wall-1'), document.querySelector('#wall-2'), document.querySelector('#wall-3'), document.querySelector('#wall-4')];

let indexLock;

const onClockClick = () => {
    memoryGame.create();
    state.memory ? memoryGame.links[0].focus() : memoryClose.focus();

    memory.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const closeMemoryGame = () => {
    memoryGame.reset();
    memory.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const onPianoClick = () => {
    simonGame.create();
    state.simon ? simonGame.button.focus() : simonClose.focus();

    simon.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const closeSimonGame = () => {
    simonGame.reset();

    simon.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const openGuessaNumberGame = () => {
    guessAnumberGame.create();

    guessAnumber.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const closenGuessaNumberGame = () => {
    guessAnumberGame.reset();

    guessAnumber.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const openTicTacToeGame = () => {
    gameTicTacToe();
    gameTicTacToePlay.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const closeTicTacToeGame = () => {
    closeGameTicTacToe();
    gameTicTacToePlay.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const clearTicTacToeGame = () => {
    closeGameTicTacToe();
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const closeLocks = () => {
    lock.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
}

const openLocks = () => {
    lock.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    lockContent.innerHTML = layoutLockGame;
    document.addEventListener("keydown", KeyDownLock);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
}

const openTetrisGame = () => {
    startTetris();
    gameTetris.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
    document.addEventListener("keydown", KeyDown);
};

const closeTetrisGame = () => {
    gameTetris.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const clearTetrisGame = () => {
    startTetris();
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

const openSnakeGameClick = () => {
    snakeGame.create();

    snake.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

const closeSnakeGameClick = () => {
    snakeGame.reset();

    snake.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.addEventListener('click', outGameClick);
};

const onDocumentEscPress = (evt) => {
    if (evt.keyCode === 27) {
        closeMemoryGame();
        closeHangmanGame();
        closeGemPuzzleGame();
        closeSimonGame();
        closenGuessaNumberGame();
        closeTicTacToeGame();
        closeTetrisGame();
        closeLocks();
        closeSnakeGameClick();
    }
};

const outGameClick = (evt) => {
    if (evt.target === overlay) {
        closeMemoryGame();
        closeHangmanGame();
        closeGemPuzzleGame();
        closeSimonGame();
        closenGuessaNumberGame();
        closeTicTacToeGame();
        closeTetrisGame();
        closeLocks();
        closeSnakeGameClick();
    }
};

class Room {
    constructor() {
        this.activeWall = walls[0];
    }

    init() {
        leftArrow.addEventListener('click', () => {
            this.activeWall.classList.remove(ACTIVE);
            let index = walls.indexOf(this.activeWall);
            this.activeWall = index > 0 ? walls[index - 1] : walls[walls.length - 1];
            this.activeWall.classList.add(ACTIVE);
        });

        rightArrow.addEventListener('click', () => {
            this.activeWall.classList.remove(ACTIVE);
            let index = walls.indexOf(this.activeWall);
            this.activeWall = index < walls.length - 1 ? walls[index + 1] : walls[0];
            this.activeWall.classList.add(ACTIVE);
        });

        // all clickable objects
        const clickableObjArr = [
            [piano, onPianoClick],
            [clock, onClockClick],
            [box, onBoxClick],
            [picture, onPictureClick],
            [memoryClose, closeMemoryGame],
            [simonClose, closeSimonGame],
            [frameImage, openTicTacToeGame],
            [closeTicTacToe, closeTicTacToeGame],
            [repeatTicTacToe, clearTicTacToeGame],
            [cubeImage, openTetrisGame],
            [closeTetris, closeTetrisGame],
            [repeatTetris, clearTetrisGame],
            [closeLock, closeLocks],
            [paperitem, openGuessaNumberGame],
            [paperitemone, openSnakeGameClick],
            [snakeClose, closeSnakeGameClick],
            [guessANumberClose, closenGuessaNumberGame],
        ];

        clickableObjArr.forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });

        arrLock.forEach((elem) => {
            document.querySelector(elem).addEventListener('click', () => {
                openLocks();
                indexLock = elem;
            });
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});

export {
    ACTIVE, overlay, onDocumentEscPress, outGameClick, indexLock
};
