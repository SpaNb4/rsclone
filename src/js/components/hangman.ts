/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
import correctSound from '../../assets/audio/hangman_correct.mp3';
import uncorrectSound from '../../assets/audio/hangman_uncorrect.mp3';
import loseSound from '../../assets/audio/hangman_lose.mp3';
import winSound from '../../assets/audio/hangman_win.mp3';

// @ts-ignore
import { checkSymbol, playAudio } from './utils';
// @ts-ignore
import { ACTIVE, setHiddenWordVisibility } from './room';
// @ts-ignore
import { GameTimer } from './timer';
// @ts-ignore
import { createTimerView } from './timer_view';
// @ts-ignore
import { getRoomState } from './room_state';
// @ts-ignore
import { definitionCodeWord } from './game-over';

const gameName = 'hangman';
const stateTimer = new GameTimer(gameName, getRoomState());

const wordField = document.querySelector('.word_field');
const messageDiv = document.querySelector('.message');
const wrongLetters = document.querySelector('.wrong_letters');
const hangmanImg: HTMLImageElement = document.querySelector('.hangman_img');
const hangmanForm = document.querySelector('.hangman_form');

// once you got six wrong letters, you lose
const SIX_ERRORS: number = 6;
const UNDERSCORE: string = '_ ';
const secretWord = definitionCodeWord();

const wordsArr: Array<string> = [
    'javascript',
    'chrome',
    'firefox',
    'programmer',
    'codepen',
    'jquery',
    'github',
    'wordpress',
    'opera',
    'sass',
    'layout',
    'developer',
    'module',
    'component',
    'website',
    'browser',
    'screen',
    'footer',
    'header',
    'responsive',
    'programmer',
    'css',
    'object',
    'bootstrap',
    'node',
    'application',
    'internet',
    'background',
    'property',
    'html',
    'font',
    'network',
    'server',
    'database',
    'function',
    'variable',
    'link',
    'angular',
    'react',
    'cloud',
];

let random: number;
let keyword: Array<string>;
let partGuessWord: Array<string>;
let errors: number = 0;
let isHangmanSolved: boolean = false;

// eslint-disable-next-line import/prefer-default-export
export function newGame(): void {
    random = Math.floor(Math.random() * (wordsArr.length - 1));
    keyword = wordsArr[random].split('');
    partGuessWord = new Array(keyword.length);
    errors = 0;

    // underscore in the guessfield
    for (let i = 0; i < partGuessWord.length; i += 1) {
        partGuessWord[i] = UNDERSCORE;
    }

    messageDiv.classList.remove(ACTIVE);
    wordField.innerHTML = '';
    wrongLetters.innerHTML = '<p>Wrong Letters:</p>';
    hangmanImg.src = './assets/img/hangman_0.png';
    printGuessField();

    const timerContainer = document.querySelector('#timer-hangman');
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimer);
    stateTimer.gameOpened();
    const gameFinished = getRoomState().isGameFinished(gameName);
    setHiddenWordVisibility(gameFinished, secretWord, gameName);
}

const guessBtn = document.querySelector('.guess_btn');
guessBtn.addEventListener('click', () => {
    checkSymbols();
});

hangmanForm.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkSymbols();
    }
});

// prints the guessfield
function printGuessField(): void {
    partGuessWord.forEach((item) => {
        const letter = document.createTextNode(item);
        wordField.appendChild(letter);
    });
}

function checkWin(): void {
    // checks if all letters have been found
    isHangmanSolved = true;
    partGuessWord.forEach((item) => {
        if (item === UNDERSCORE) {
            isHangmanSolved = false;
        }
    });

    if (isHangmanSolved) {
        messageDiv.classList.add(ACTIVE);
        messageDiv.innerHTML = `<h1 class="title">Awesome, You Won! The word is <span class="highlight">${secretWord}</span>!`;
        const audioWin = new Audio(winSound);
        playAudio(audioWin);

        stateTimer.gameFinished();
        setHiddenWordVisibility(true, secretWord, gameName);
    }

    if (errors === SIX_ERRORS) {
        messageDiv.classList.add(ACTIVE);
        messageDiv.innerHTML = `
            <h1 class='title'>You Lost.. The word was <span class="highlight">${keyword.join('')}</span></h1>
            <p class="text">Don't worry, you'll get the next one!</p>
            <button class="res_btn">Play Again?</button>`;
        const audioLose = new Audio(loseSound);
        playAudio(audioLose);

        const resBtn = document.querySelector('.res_btn');
        resBtn.addEventListener('click', () => {
            newGame();
        });
    }
}

// checks if the the letter provided by the user matches one or more of the letters in the word
function checkSymbols(): void {
    const letter: HTMLInputElement = document.querySelector('.letter_input');
    // the letter provided by the user
    let userLetter: string = letter.value;
    userLetter = userLetter.toUpperCase();

    const isCorrectLetter = checkSymbol(keyword, userLetter, partGuessWord);
    if (isCorrectLetter) {
        const audioCorrect = new Audio(correctSound);
        playAudio(audioCorrect);
    }
    letter.value = '';

    // deletes the guessfield and replaces it with the new one
    wordField.innerHTML = '';
    printGuessField();

    // if a guessed letter is not in the word, the letter will be put on the
    // "wrong letters"-list and hangman grows
    if (!isCorrectLetter && userLetter) {
        const li = document.createElement('li');
        li.innerHTML = `${userLetter}`;
        wrongLetters.appendChild(li);
        errors += 1;
        hangmanImg.src = `./assets/img/hangman_${errors}.png`;
        const audioUncorrect = new Audio(uncorrectSound);
        playAudio(audioUncorrect);
    }

    checkWin();
}
