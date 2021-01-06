import { resetGame, createGrid, links } from './memory';

const ACTIVE = 'active';
const leftArrow = document.querySelector('#room-arrow-left');
const rightArrow = document.querySelector('#room-arrow-right');
const clock = document.querySelector('#clock');
const memory = document.querySelector('#memory-game');
const overlay = document.querySelector('#overlay');

const walls = [
    document.querySelector('#wall-1'),
    document.querySelector('#wall-2'),
    document.querySelector('#wall-3'),
    document.querySelector('#wall-4')
];

const openMemoryGame = () => {
    createGrid();
    links[0].focus(); // add focus to first element

    memory.classList.add(ACTIVE);
    overlay.classList.add(ACTIVE);
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', outMemoryGameClick);
}

const closeMemoryGame = () => {
    resetGame();
    memory.classList.remove(ACTIVE);
    overlay.classList.remove(ACTIVE);
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', outMemoryGameClick);
}

const onClockClick = () => {
    openMemoryGame();
}

const onDocumentEscPress = (evt) => {
    if (evt.keyCode === 27) {
        closeMemoryGame();
    }
}

const outMemoryGameClick = (evt) => {
    if (evt.target === overlay) {
        closeMemoryGame();
    }
}

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

        clock.addEventListener('click', onClockClick);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});
