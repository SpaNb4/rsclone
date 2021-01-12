import { closenGuessaNumberGame } from './room';

let randomNumber: number = 0;
let numberOfGuesses: number = 0;
const userGuess: string = 'userGuess';
const statusArea: string = 'statusArea';
const historyList: string = 'historyList';

function writeMessage(elementId: any, message: string, appendMessage: any) {
    const elemToUpdate = document.getElementById(elementId);
    if (appendMessage) {
        elemToUpdate.innerHTML += message;
    } else {
        elemToUpdate.innerHTML = message;
    }
}

function newGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    numberOfGuesses = 0;
    writeMessage('historyList', '', '');
}

function guessInRange(guess: number) {
    return (guess > 0 && guess < 101);
}

function userGuessed() {
    const userGuessednumber: any = document.getElementById(userGuess).value;
    if (userGuessednumber.length === 0 || !guessInRange(userGuessednumber)) {
        // Nothing entered or our of range.
        writeMessage(statusArea, '<p>Please enter a number 1-100 and press the Guess button.</p>', '');
    } else if (userGuessednumber.indexOf('.') !== -1) {
        writeMessage(statusArea, '<p>Please enter a whole number 1-100 and press the Guess button.</p>', '');
    } else {
        numberOfGuesses += 1;

        if (Number(userGuessednumber) === randomNumber) {
            // Got it
            writeMessage(statusArea, `<p style='color:rgb(245, 0, 6)'>You got me in ${numberOfGuesses} guesses, I was thinking ${randomNumber}. You won!</p>`, '');
            newGame();
        } else if (Number(userGuessednumber) < randomNumber) {
            // User needs to guess higher
            writeMessage(statusArea, `<p>You need to guess higher than ${userGuessednumber}, try again...</p>`, '');
            writeMessage(historyList, `<li>${userGuessednumber} (too low)</li>`, true);
        } else {
            // User needs to guess lower
            writeMessage(statusArea, `<p>You need to guess lower than ${userGuessednumber}, try again...</p>`, '');
            writeMessage(historyList, `<li>${userGuessednumber} (too high)</li>`, true);
        }
    }

    document.getElementById(userGuess).value = '';
}

function resetGame() {
    numberOfGuesses = 0;
    document.getElementById(statusArea).innerHTML = '<p>Please enter a number 1-100 and press the Guess button.</p>';
}

document.getElementById('buttonArea').addEventListener('click', () => {
    userGuessed();
});

const guessAnumberGame = {
    create: newGame,
    reset: resetGame,
};

export { guessAnumberGame };
