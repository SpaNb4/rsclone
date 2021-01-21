import { state } from './state';
import { memoryGame } from './memory';
import { simonGame } from './simon';
import { guessAnumberGame } from './guess-a-number.ts';
import { gameTicTacToe, closeGameTicTacToe } from './tic-tac-toe';
import { startTetris, KeyDown } from './tetris';
import { snakeGame } from './snake';
import { KeyDownLock, arrLock, layoutLockGame } from './game-over';
import { newGame, isHangmanSolved } from './hangman';
import { GemPuzzle } from './gem_puzzle';

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
const box = document.querySelector('#box');
const picture = document.querySelector('#picture');

const memory = document.querySelector('#memory-game');
const simon = document.querySelector('#simon-game');
const snake = document.querySelector('#snake');
const gameTetris = document.querySelector('.tetris');
const guessAnumber = document.querySelector('#guess-a-number');
const gameTicTacToePlay = document.querySelector('.tic-tac-toe');

const repeatTicTacToe = document.querySelector('.tic-tac-toe__repeat');
const repeatTetris = document.querySelector('.tetris__repeat');

const hangman = document.querySelector('.hangman');
const gemPuzzle = document.querySelector('.gem-puzzle');

const lockContent = document.querySelector('.game-over-lock__content');

let indexLock;

//  open functions:
const openMemoryGame = () => {
    memoryGame.create();
    state.memory ? memoryGame.links[0].focus() : memoryClose.focus();
    memory.classList.add(ACTIVE);
};

const openSimonGame = () => {
    simonGame.create();
    state.simon ? simonGame.button.focus() : simonClose.focus();
    simon.classList.add(ACTIVE);
};

const openGuessaNumberGame = () => {
    guessAnumberGame.create();
    guessAnumber.classList.add(ACTIVE);
};

const openTicTacToeGame = () => {
    gameTicTacToe();
    gameTicTacToePlay.classList.add(ACTIVE);
};

const openLocks = () => {
    lock.classList.add(ACTIVE);
    lockContent.innerHTML = layoutLockGame;
    document.addEventListener('keydown', KeyDownLock);
};

const openTetrisGame = () => {
    startTetris();
    gameTetris.classList.add(ACTIVE);
    document.addEventListener('keydown', KeyDown);
};

const openSnakeGameClick = () => {
    snakeGame.create();
    snake.classList.add(ACTIVE);
};

const openHangmanGame = () => {
    if (!isHangmanSolved) {
        newGame();
        hangman.classList.add(ACTIVE);
    }
};

const openGemPuzzleGame = () => {
    if (!GemPuzzle.isPuzzleSolved) {
        GemPuzzle.init();
        gemPuzzle.classList.add(ACTIVE);
    }
};

//  close functions:
const closeMemoryGame = () => {
    memoryGame.reset();
    memory.classList.remove(ACTIVE);
};

const closeSimonGame = () => {
    simonGame.reset();
    simon.classList.remove(ACTIVE);
};

const closeGuessaNumberGame = () => {
    guessAnumberGame.reset();
    guessAnumber.classList.remove(ACTIVE);
};

const closeTicTacToeGame = () => {
    closeGameTicTacToe();
    gameTicTacToePlay.classList.remove(ACTIVE);
};

const closeLocks = () => {
    lock.classList.remove(ACTIVE);
};

const closeTetrisGame = () => {
    gameTetris.classList.remove(ACTIVE);
};

const closeSnakeGameClick = () => {
    snakeGame.reset();
    snake.classList.remove(ACTIVE);
};

const closeHangmanGame = () => {
    hangman.classList.remove(ACTIVE);
};

const closeGemPuzzleGame = () => {

    gemPuzzle.classList.remove(ACTIVE);
};

//  clear functions:
const clearTetrisGame = () => {
    startTetris();
};

const clearTicTacToeGame = () => {
    closeGameTicTacToe();
};

// all clickable objects
const openGameObjects = [
    [piano, openSimonGame],
    [clock, openMemoryGame],
    [box, openHangmanGame],
    [picture, openGemPuzzleGame],
    [frame, openTicTacToeGame],
    [cube, openTetrisGame],
    [paperTwo, openGuessaNumberGame],
    [paperOne, openSnakeGameClick],
];

const clearGameOBjects = [
    [repeatTicTacToe, clearTicTacToeGame],
    [repeatTetris, clearTetrisGame],
];

const closeCallbacks = [closeMemoryGame, closeHangmanGame, closeGemPuzzleGame, closeSimonGame, closeGuessaNumberGame, closeTicTacToeGame, closeTetrisGame, closeLocks, closeSnakeGameClick];

const closeAllGames = () => {
    closeCallbacks.forEach((callback) => callback());
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
};

// open overlay and add handlers
const addEventHandlers = () => {
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
};

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

        // open any games
        openGameObjects.forEach((item) => {
            item[0].addEventListener('click', () => {
                item[1]();
                addEventHandlers();
            });
        });

        // clear
        clearGameOBjects.forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });

        // close any game or lock by click
        allCloseButtons.forEach((button) => {
            button.addEventListener('click', closeAllGames);
        });

        // open clocks
        arrLock.forEach((elem) => {
            document.querySelector(elem).addEventListener('click', () => {
                openLocks();
                indexLock = elem;
                addEventHandlers();
            });
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});

export { ACTIVE, overlay, onDocumentEscPress, outGameClick, indexLock, picture };
