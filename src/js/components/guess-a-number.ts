import { getRandomInt, playAudio } from './utils.js';
import winSound from '../../assets/audio/guessanumber_win.mp3';
import uncorrectSound from '../../assets/audio/guessanumber_wrong_answer.mp3';
import { Timer } from './timer.js';
import { createTimerView } from './timer_view.js'

let randomNumber: number = 0;
let numberOfGuesses: number = 0;
const userGuess: any = 'userGuess';
const statusArea: string = 'statusArea';
const historyList: string = 'historyList';
const maxValue: number = 100;
const buttonArea: string = 'buttonArea';
const stateTimer = new Timer('guess-a-number');

function writeMessage(elementId: any, message: string, appendMessage: any) {
    const elemToUpdate = document.getElementById(elementId);
    if (appendMessage) {
        elemToUpdate.innerHTML += message;
    } else {
        elemToUpdate.innerHTML = message;
    }
}

function newGame() {
    randomNumber = getRandomInt(maxValue) + 1;
    numberOfGuesses = 0;
    writeMessage('historyList', '', '');
    document.getElementById(userGuess).focus();
    const timerContainer = document.querySelector('#timer-guess-a-number');
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimer);
    stateTimer.reset();
}

function guessInRange(guess: number) {
    return (guess > 0 && guess < 101);
}

function userGuessed() {
    const userGuessednumber: any = document.getElementById(userGuess).value;
    if (!userGuessednumber.length || !guessInRange(userGuessednumber)) {
        // Nothing entered or our of range.
        writeMessage(statusArea, '<p><span>Please enter a number</span> 1-100 <span>and press the Guess button</span>.</p>', '');
    } else if (userGuessednumber.indexOf('.') !== -1) {
        writeMessage(statusArea, '<p><span>Please enter a whole number</span> 1-100 <span>and press the Guess button</span>.</p>', '');
    } else {
        numberOfGuesses += 1;

        if (Number(userGuessednumber) === randomNumber) {
            // Got it
            writeMessage(statusArea, `<p style='color:rgb(245, 0, 6)'><span>You got me in</span> ${numberOfGuesses} <span>guesses</span>, <span>I was thinking</span> ${randomNumber}. <span>You won</span>!</p>`, '');
            const audioWin = new Audio(winSound);
            playAudio(audioWin);
            stateTimer.finish();
            //newGame();
        } else if (Number(userGuessednumber) < randomNumber) {
            // User needs to guess higher
            writeMessage(statusArea, `<p><span>You need to guess higher than</span> ${userGuessednumber}, <span>try again</span>...</p>`, '');
            writeMessage(historyList, `<li>${userGuessednumber} (<span>too low</span>)</li>`, true);
            const audioUncorrect = new Audio(uncorrectSound);
            playAudio(audioUncorrect);
        } else {
            // User needs to guess lower
            writeMessage(statusArea, `<p><span>You need to guess lower than</span> ${userGuessednumber}, <span>try again</span>...</p>`, '');
            writeMessage(historyList, `<li>${userGuessednumber} (<span>too high</span>)</li>`, true);
            const audioUncorrect = new Audio(uncorrectSound);
            playAudio(audioUncorrect);
        }
    }

    document.getElementById(userGuess).value = '';
    document.getElementById(userGuess).focus();
}

document.getElementById(userGuess).addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        userGuessed();
    }
});

function resetGame() {
    numberOfGuesses = 0;
    document.getElementById(statusArea).innerHTML = '<p><span>Please enter a number</span> 1-100 <span>and press the Guess button</span>.</p>';
    document.getElementById(userGuess).value = '';
    document.getElementById(userGuess).focus();
}

document.getElementById(buttonArea).addEventListener('click', () => {
    userGuessed();
    document.getElementById(userGuess).focus();
});

const guessAnumberGame = {
    create: newGame,
    reset: resetGame,
};

export { guessAnumberGame };
