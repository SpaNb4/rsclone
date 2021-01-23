import { state } from './state';
import { memoryGame } from './memory';
import { simonGame } from './simon';
import { guessAnumberGame } from './guess-a-number.ts';
import { gameTicTacToe, closeGameTicTacToe } from './tic-tac-toe';
import { startTetris, KeyDown } from './tetris';
import { snakeGame } from './snake';
import { KeyDownLock, arrLock, layoutLockGame } from './game-over';
import { getCoordsArray } from './utils';
import { gamearea } from './keyboard';
import * as intro from './intro';
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

const openLocks = (elem) => {
    indexLock = elem;
    lock.classList.add(ACTIVE);
    lockContent.innerHTML = layoutLockGame;
    document.addEventListener('keydown', KeyDownLock);
};

const openTetrisGame = () => {
    startTetris();
    gameTetris.classList.add(ACTIVE);
    document.addEventListener('', KeyDown);
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

// all clickable objects coordinates
let clickableCoords = getCoordsArray([...openGameObjects, ...arrLock
    .map(elem => [document.querySelector(elem), openLocks])]);

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
    miniGameHandler();
};

// open overlay and add handlers
const addEventHandlers = () => {
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
    miniGameHandler();
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

const miniGameHandler = () => {
    state.isMiniGameOpened = !state.isMiniGameOpened;
    gamearea.switch();
}

class Room {
    constructor() {
        this.keys = [];
        this.activeWall = walls[0];
    }

    changeWall(side) {
        let index = walls.indexOf(this.activeWall);
        this.activeWall.classList.remove(ACTIVE);

        if (side === 'right') {
            this.activeWall = index < walls.length - 1 ? walls[index + 1] : walls[0];
        }

        if (side === 'left') {
            this.activeWall = index > 0 ? walls[index - 1] : walls[walls.length - 1];
        }

        this.activeWall.classList.add(ACTIVE);

        // update coordinates after changing wall
        clickableCoords = getCoordsArray(openGameObjects);
        console.log(clickableCoords);

    }

    onArrowsClick(evt) {
        this.changeWall(evt.target.dataset.side);
    }

    keysPressed(evt) {
        if (!state.isMiniGameOpened) {
            evt.preventDefault();

            this.keys[evt.keyCode] = true;

            if (this.keys[17] && this.keys[39]) {
                this.changeWall('left');
            }

            if (this.keys[17] && this.keys[37]) {
                this.changeWall('right');
            }
        }
    }

    keysReleased(evt) {
        if (state.isMiniGameOpened) return null;
        this.keys[evt.keyCode] = false;
    }

    init() {
        intro.init();

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
                openLocks(elem);
                addEventHandlers();
            });
        });

        // arrows
        arrows.addEventListener('click', this.onArrowsClick.bind(this));
        document.addEventListener('keydown', this.keysPressed.bind(this), false);
        document.addEventListener('keyup', this.keysReleased.bind(this), false);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});

export { ACTIVE, overlay, onDocumentEscPress, outGameClick, indexLock, picture, clickableCoords, addEventHandlers };
