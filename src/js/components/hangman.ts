/* eslint-disable no-use-before-define */
import correctSound from './../../assets/audio/hangman_correct.mp3';
import uncorrectSound from './../../assets/audio/hangman_uncorrect.mp3';
import loseSound from './../../assets/audio/hangman_lose.mp3';
import winSound from './../../assets/audio/hangman_win.mp3';

// @ts-ignore
import { checkSymbol } from './../../js/components/utils';
// @ts-ignore
import { overlay, ACTIVE } from './room';
import { hangman as hangmanDiv } from './wall3';

const wordField = document.querySelector('.word_field');
const messageDiv = document.querySelector('.message');
const wrongLetters = document.querySelector('.wrong_letters');
const hangmanImg: HTMLImageElement = document.querySelector('.hangman_img');

const audioCorrect = new Audio(correctSound);
const audioUncorrect = new Audio(uncorrectSound);
const audioLose = new Audio(loseSound);
const audioWin = new Audio(winSound);

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
export let hangmanSolved: boolean = false;

export function newGame() {
    random = Math.floor(Math.random() * (wordsArr.length - 1));
    keyword = wordsArr[random].split('');
    // user hint :)
    console.log(keyword);
    partGuessWord = new Array(keyword.length);
    errors = 0;

    // underscore in the guessfield
    for (let i = 0; i < partGuessWord.length; i += 1) {
        partGuessWord[i] = '_ ';
    }

    messageDiv.classList.remove('active');
    wordField.innerHTML = '';
    wrongLetters.innerHTML = '<p>Wrong Letters:</p>';
    hangmanImg.src = './assets/img/hangman_0.png';
    printGuessField();
}

const guessBtn = document.querySelector('.guess_btn');
guessBtn.addEventListener('click', () => {
    checkSymbols();
});

const form = document.querySelector('.hangman_form');
form.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkSymbols();
    }
});

// prints the guessfield
function printGuessField() {
    partGuessWord.forEach((item) => {
        const letter = document.createTextNode(item);
        wordField.appendChild(letter);
    });
}

function checkWin() {
    // checks if all letters have been found
    hangmanSolved = true;
    partGuessWord.forEach((item) => {
        if (item === '_ ') {
            hangmanSolved = false;
        }
    });

    if (hangmanSolved) {
        messageDiv.classList.add('active');
        messageDiv.innerHTML = '<h1 class="title">Awesome, You Won!';
        setTimeout(() => {
            messageDiv.style.display = 'none';
            hangmanDiv.classList.remove(ACTIVE);
            overlay.classList.remove(ACTIVE);
        }, 2000);
        audioWin.play();
    }

    // once you got six wrong letters, you lose
    if (errors === 6) {
        messageDiv.classList.add('active');
        messageDiv.innerHTML = `
            <h1 class='title'>You Lost.. The word was <span class="highlight">${keyword.join('')}</span></h1>
            <p class="text">Don't worry, you'll get the next one!</p>
            <button class="res_btn">Play Again?</button>`;
        audioLose.play();

        const resBtn = document.querySelector('.res_btn');
        resBtn.addEventListener('click', () => {
            newGame();
        });
    }
}

// checks if the the letter provided by the user matches one or more of the letters in the word
function checkSymbols() {
    const letter: HTMLInputElement = document.querySelector('.letter_input');
    // the letter provided by the user
    let userLetter: string = letter.value;
    userLetter = userLetter.toUpperCase();

    if (checkSymbol(keyword, userLetter, partGuessWord)) {
        audioCorrect.play();
    }
    letter.value = '';

    // deletes the guessfield and replaces it with the new one
    wordField.innerHTML = '';
    printGuessField();

    // if a guessed letter is not in the word, the letter will be put on the
    // "wrong letters"-list and hangman grows
    if (!checkSymbol(keyword, userLetter, partGuessWord) && userLetter) {
        const li = document.createElement('li');
        li.innerHTML = `${userLetter}`;
        wrongLetters.appendChild(li);
        errors += 1;
        hangmanImg.src = `./assets/img/hangman_${errors}.png`;
        audioUncorrect.play();
    }

    checkWin();
}
