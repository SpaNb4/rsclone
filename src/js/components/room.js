/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-cycle */
import { state } from './state.ts';
import { headerInit, loadRoomState } from './header';
import { footerInit } from './footer.ts';
import { memoryGame } from './memory';
import { simonGame } from './simon.ts';
import { guessAnumberGame } from './guessanumber.ts';
import { gameTicTacToe, closeGameTicTacToe } from './tic-tac-toe';
import { startTetris, KeyDown, stopTetris, touchDown } from './tetris';
import { snakeGame } from './snake';
import { KeyDownLock, arrLock, layoutLockGame, displayLock } from './game-over';
import { getCoordsArray, getRandomIntInclusive, addClickListeners } from './utils';
import { gamearea } from './keyboard.ts';
import * as intro from './intro.ts';
import { newGame } from './hangman.ts';
import { GemPuzzle } from './gem_puzzle';
import { fakeObjects, swingPicture, fakesInit } from './fakes.ts';

const ACTIVE = 'active';
const LOAD_TIME = 300;
const arrows = document.querySelector('#room-arrows');
const overlay = document.querySelector('#overlay');
const preloader = document.querySelector('#preloader');
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
const picture = document.querySelector(`#picture-${getRandomIntInclusive(1, 3)}`);
const fakePictures = Array.from(document.querySelectorAll('.picture')).filter((pic) => pic !== picture);
const safebox = document.querySelector('#safe-box');

const memory = document.querySelector('#memory-game');
const simon = document.querySelector('#simon-game');
const snake = document.querySelector('#snake');
const tetris = document.querySelector('.tetris');
const guessAnumber = document.querySelector('#guess-a-number');
const ticTacToe = document.querySelector('.tic-tac-toe');

const repeatTicTacToe = document.querySelector('.tic-tac-toe__repeat');
const repeatTetris = document.querySelector('.tetris__repeat');

const hangman = document.querySelector('.hangman');
const gemPuzzle = document.querySelector('.gem-puzzle');

const lockContent = document.querySelector('.game-over-lock__content');
const secretWordContainers = [...document.querySelectorAll('.secret-word')];
// eslint-disable-next-line import/no-mutable-exports
let indexLock;

//  open functions:
const openMemoryGame = () => {
    memoryGame.create();
    memoryGame.links[0].focus();
};

const openSimonGame = () => {
    simonGame.create();
    simonGame.button.focus();
};

const openGuessaNumberGame = () => {
    guessAnumberGame.create();
};

const openTicTacToeGame = () => {
    gameTicTacToe();
};

const openLocks = (elem) => {
    indexLock = elem;
    lockContent.innerHTML = layoutLockGame;
    document.addEventListener('keydown', KeyDownLock);
    displayLock(indexLock);
    document.querySelector('.lock-game__text').focus();
};

const openTetrisGame = () => {
    startTetris();
    document.addEventListener('', KeyDown);
    document.addEventListener('keydown', KeyDown);
    touchDown();
};

const openSnakeGameClick = () => {
    snakeGame.create();
};

const openHangmanGame = () => {
    newGame();
};

const openGemPuzzleGame = () => {
    GemPuzzle.init();
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
    ticTacToe.classList.remove(ACTIVE);
};

const closeLocks = () => {
    lock.classList.remove(ACTIVE);
};

const closeTetrisGame = () => {
    stopTetris();
    tetris.classList.remove(ACTIVE);
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
    gameTicTacToe();
};

// open overlay and add handlers
const openMiniGame = (callback, game) => (elem) => {
    callback(elem);
    game.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
    state.isMiniGameOpened = true;
    gamearea.switch();
};

// all clickable objects
const openGameObjects = [
    [piano, openMiniGame(openSimonGame, simon)],
    [clock, openMiniGame(openMemoryGame, memory)],
    [box, openMiniGame(openHangmanGame, hangman)],
    [picture, openMiniGame(openGemPuzzleGame, gemPuzzle)],
    [safebox, openMiniGame(openGemPuzzleGame, gemPuzzle)],
    [frame, openMiniGame(openTicTacToeGame, ticTacToe)],
    [cube, openMiniGame(openTetrisGame, tetris)],
    [paperTwo, openMiniGame(openGuessaNumberGame, guessAnumber)],
    [paperOne, openMiniGame(openSnakeGameClick, snake)],
];

const getClickableCoords = () => getCoordsArray([
    ...openGameObjects,
    ...fakeObjects,
    ...arrLock.map((elem) => [document.querySelector(elem), openMiniGame(openLocks, lock)]),
    ...fakePictures.map((elem) => [elem, swingPicture]),
]);

const clearGameOBjects = [
    [repeatTicTacToe, clearTicTacToeGame],
    [repeatTetris, clearTetrisGame],
];

const closeCallbacks = [
    closeMemoryGame,
    closeHangmanGame,
    closeGemPuzzleGame,
    closeSimonGame,
    closeGuessaNumberGame,
    closeTicTacToeGame,
    closeTetrisGame,
    closeLocks,
    closeSnakeGameClick,
];

const closeAllGames = () => {
    closeCallbacks.forEach((callback) => callback());
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
    state.isMiniGameOpened = false;
    gamearea.switch();
    // clean secret words container
    // eslint-disable-next-line no-param-reassign
    secretWordContainers.forEach((secretWordContainer) => (secretWordContainer.innerHTML = ''));
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

const setHiddenWordVisibility = (visible, secretWord, gameName) => {
    document.querySelector(`#${gameName}-secret-word`).innerHTML = visible ? `Code word: ${secretWord}` : '';
};

class Room {
    constructor() {
        this.keys = [];
        // eslint-disable-next-line prefer-destructuring
        this.activeWall = walls[0];
    }

    changeWall(side) {
        const index = walls.indexOf(this.activeWall);

        preloader.classList.add(ACTIVE);
        this.activeWall.classList.remove(ACTIVE);

        safebox.style.right = getComputedStyle(picture).right;

        if (side === 'right') {
            this.activeWall = index < walls.length - 1 ? walls[index + 1] : walls[0];
        }

        if (side === 'left') {
            this.activeWall = index > 0 ? walls[index - 1] : walls[walls.length - 1];
        }

        this.activeWall.classList.add(ACTIVE);
        // update coordinates after changing wall
        state.coords = getClickableCoords();

        setTimeout(() => preloader.classList.remove(ACTIVE), LOAD_TIME);
    }

    onArrowsClick(evt) {
        this.changeWall(evt.target.dataset.side);
    }

    keysPressed(evt) {
        if (!state.isMiniGameOpened && !state.paused) {
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
        if (state.isMiniGameOpened && !state.paused) return null;
        this.keys[evt.keyCode] = false;
        return 0;
    }

    init() {
        // all clickable objects coordinates
        state.coords = getClickableCoords();

        // open any games
        openGameObjects.forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });

        // clear
        clearGameOBjects.forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });

        // close any game or lock by click
        allCloseButtons.forEach((button) => {
            button.addEventListener('click', closeAllGames);
        });

        // open locks
        arrLock.forEach((elem) => {
            document.querySelector(elem).addEventListener('click', () => {
                openMiniGame(openLocks, lock)(elem);
            });
        });

        // fake pictures
        fakePictures.forEach((pic) => {
            pic.addEventListener('click', (evt) => swingPicture(`#${evt.target.id}`));
        });

        // another fake objects
        addClickListeners(fakeObjects);

        // arrows
        arrows.addEventListener('click', this.onArrowsClick.bind(this));
        document.addEventListener('keydown', this.keysPressed.bind(this), false);
        document.addEventListener('keyup', this.keysReleased.bind(this), false);
    }
}

window.addEventListener('load', () => {
    document.body.classList.remove('preload');
    preloader.classList.remove(ACTIVE);

    intro.init();
    new Room().init();
    loadRoomState();
    headerInit();
    footerInit();
    fakesInit();
});

export {
    ACTIVE, overlay, onDocumentEscPress, outGameClick, openMiniGame, indexLock, picture, setHiddenWordVisibility, getClickableCoords,
};
