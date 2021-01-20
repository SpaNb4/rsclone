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

const arrows = document.querySelector('#room-arrows');
const overlay = document.querySelector('#overlay');
const walls = [...document.querySelectorAll('.wall')];
const allCloseButtons = [...document.querySelectorAll('.all-close-button')];

const clock = document.querySelector('#clock');
const piano = document.querySelector('#piano');
const paperOne = document.querySelector('#paper_one');
const paperTwo = document.querySelector('#paper_two');
const frame = document.querySelector('.frame-image');
const cube = document.querySelector('.cube4');
const lock = document.querySelector('.game-over-lock');

const memory = document.querySelector('#memory-game');
const simon = document.querySelector('#simon-game');
const snake = document.querySelector('#snake');
const gameTetris = document.querySelector('.tetris');
const guessAnumber = document.querySelector('#guess-a-number');
const gameTicTacToePlay = document.querySelector('.tic-tac-toe');

const repeatTicTacToe = document.querySelector('.tic-tac-toe__repeat');
const repeatTetris = document.querySelector('.tetris__repeat');

const lockContent = document.querySelector('.game-over-lock__content');

let indexLock;

const openMemoryGame = () => {
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

const openSimonGame = () => {
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

//
// all clickable objects
const openGameObjects = [
    [piano, openSimonGame],
    [clock, openMemoryGame],
    [box, onBoxClick],
    [picture, onPictureClick],
    [frame, openTicTacToeGame],
    [cube, openTetrisGame],
    [paperTwo, openGuessaNumberGame],
    [paperOne, openSnakeGameClick]
];

const clearGameOBjects = [
    [repeatTicTacToe, clearTicTacToeGame],
    [repeatTetris, clearTetrisGame],
]

const closeCallbacks = [
    closeMemoryGame,
    closeHangmanGame,
    closeGemPuzzleGame,
    closeSimonGame,
    closenGuessaNumberGame,
    closeTicTacToeGame,
    closeTetrisGame,
    closeLocks,
    closeSnakeGameClick
]

const closeAllGames = () => {
    closeCallbacks.forEach((callback) => callback());
}

const onDocumentEscPress = (evt) => {
    if (evt.keyCode === 27) {
        closeAllGames();
    }
};

const outGameClick = (evt) => {
    if (evt.target === overlay) {
        closeAllGames();
    }
};

class Room {
    constructor() {
        this.activeWall = walls[0];
    }

    init() {
        arrows.addEventListener('click', (evt) => {
            this.activeWall.classList.remove(ACTIVE);
            let index = walls.indexOf(this.activeWall);

            if (evt.target.classList.contains('arrow--right')) {
                this.activeWall = index < walls.length - 1 ? walls[index + 1] : walls[0];
            } else {
                this.activeWall = index > 0 ? walls[index - 1] : walls[walls.length - 1];
            }
            this.activeWall.classList.add(ACTIVE);
        });

        // open or clear any games
        [...openGameObjects, ...clearGameOBjects].forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });

        // close any game by clock
        allCloseButtons.forEach((button) => {
            button.addEventListener('click', closeAllGames);
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
