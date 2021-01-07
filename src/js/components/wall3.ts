// @ts-ignore
import * as room from './room';
import { newGame, hangmanSolved } from './hangman';

const hangman = document.querySelector('.hangman');
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
    if (!hangmanSolved) {
        openHangmanGame();
    }
};

const onPictureClick = () => {
    picture.classList.add('dropped');
};

export { box, picture, onBoxClick, onPictureClick, closeHangmanGame, hangman };
