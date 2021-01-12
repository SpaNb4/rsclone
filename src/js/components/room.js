import { memoryGame } from './memory';
import { simonGame } from './simon';
import { box, picture, onBoxClick, onPictureClick, closeHangmanGame, closeGemPuzzleGame } from './wall3';

const ACTIVE = 'active';
const leftArrow = document.querySelector('#room-arrow-left');
const rightArrow = document.querySelector('#room-arrow-right');
const clock = document.querySelector('#clock');
const piano = document.querySelector('#piano');
const memory = document.querySelector('#memory-game');
const memoryClose = document.querySelector('#memory-game-close');
const simon = document.querySelector('#simon-game');
const overlay = document.querySelector('#overlay');

const walls = [document.querySelector('#wall-1'), document.querySelector('#wall-2'), document.querySelector('#wall-3'), document.querySelector('#wall-4')];

const openMemoryGame = () => {
    memoryGame.create();
    memoryGame.links[0].focus(); // add focus to first element

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
    simonGame.button.focus();

    simon.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outGameClick);
}

const closeSimonGame = () => {
    simonGame.reset();

    simon.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outGameClick);
}

const onDocumentEscPress = (evt) => {
    if (evt.keyCode === 27) {
        closeMemoryGame();
        closeHangmanGame();
        closeGemPuzzleGame();
        closeSimonGame();
    }
};

const outGameClick = (evt) => {
    if (evt.target === overlay) {
        closeMemoryGame();
        closeHangmanGame();
        closeGemPuzzleGame();
        closeSimonGame();
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
            [piano, openSimonGame],
            [clock, openMemoryGame],
            [box, onBoxClick],
            [picture, onPictureClick],
            [memoryClose, closeMemoryGame],
        ];

        clickableObjArr.forEach((item) => {
            item[0].addEventListener('click', item[1]);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});

export { ACTIVE, overlay, onDocumentEscPress, outGameClick };
