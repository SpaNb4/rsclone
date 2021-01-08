// @ts-ignore
import * as room from './room';
import { newGame, isHangmanSolved } from './hangman';
import { GemPuzzle } from './gem_puzzle';

const hangman = document.querySelector('.hangman');
const gemPuzzle = document.querySelector('.gem-puzzle');

const box = document.querySelector('#box');
const picture = document.querySelector('#picture');

const openHangmanGame = () => {
    newGame();
    hangman.classList.add(room.ACTIVE);
    room.overlay.classList.add(room.ACTIVE);
    document.addEventListener('keydown', room.onDocumentEscPress);
    document.addEventListener('click', room.outMemoryGameClick);
};

const closeHangmanGame = () => {
    newGame();
    hangman.classList.remove(room.ACTIVE);
    room.overlay.classList.remove(room.ACTIVE);
    document.removeEventListener('keydown', room.onDocumentEscPress);
    document.removeEventListener('click', room.outMemoryGameClick);
};

const onBoxClick = () => {
    if (!isHangmanSolved) {
        openHangmanGame();
    }
};

const openGemPuzzleGame = () => {
    GemPuzzle.init();
    gemPuzzle.classList.add(room.ACTIVE);
    room.overlay.classList.add(room.ACTIVE);
    document.addEventListener('keydown', room.onDocumentEscPress);
    document.addEventListener('click', room.outMemoryGameClick);
};

const closeGemPuzzleGame = () => {
    gemPuzzle.classList.remove(room.ACTIVE);
    room.overlay.classList.remove(room.ACTIVE);
    document.removeEventListener('keydown', room.onDocumentEscPress);
    document.removeEventListener('click', room.outMemoryGameClick);
};

const onPictureClick = () => {
    if (!GemPuzzle.isPuzzleSolved) {
        openGemPuzzleGame();
    }
};

export { box, picture, onBoxClick, onPictureClick, closeHangmanGame, hangman, closeGemPuzzleGame };
