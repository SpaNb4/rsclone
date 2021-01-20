// @ts-ignore
import * as room from './room';
import { newGame, isHangmanSolved } from './hangman';
// @ts-ignore
import { GemPuzzle } from './gem_puzzle';

const hangman = document.querySelector('.hangman');
const gemPuzzle = document.querySelector('.gem-puzzle');

const box = document.querySelector('#box');
const picture = document.querySelector('#picture');

const openHangmanGame = () => {
    newGame();
    hangman.classList.add(room.ACTIVE);
};

const closeHangmanGame = () => {
    hangman.classList.remove(room.ACTIVE);
};

const onBoxClick = () => {
    if (!isHangmanSolved) {
        openHangmanGame();
    }
};

const openGemPuzzleGame = () => {
    GemPuzzle.init();
    gemPuzzle.classList.add(room.ACTIVE);
};

const closeGemPuzzleGame = () => {
    gemPuzzle.classList.remove(room.ACTIVE);
};

const onPictureClick = () => {
    if (!GemPuzzle.isPuzzleSolved) {
        openGemPuzzleGame();
    }
};

export { box, picture, onBoxClick, onPictureClick, closeHangmanGame, hangman, closeGemPuzzleGame };
