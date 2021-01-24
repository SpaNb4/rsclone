import { indexLock } from './room';
import { getRandomInt } from './utils';

let flagOpen = false,
    countOpenLock = 0;

const lockClose = '.lock__close',
      lockOpen = '.lock__open',
      lockActive = 'lock__active',
      lockGameText = '.lock-game__text',
      lockGameClose = '.lock-game__close',
      lockGameOpen = '.lock-game__open',
      lockGameActive = 'lock-game__active',
      doorOpen = '.door-open',
      door = '.door',
      doorNoneDisplay = 'door-none',
      enter = 13,
      numLockFromString = 5,
      num = 1;

export const arrLock = ['.lock1', '.lock2', '.lock3', '.lock4', '.lock5', '.lock6', '.lock7', '.lock8'];

const firstPassphrase = ['Always', 'forgive', 'your', 'enemies', 'Nothing', 'annoys', 'them', 'more'];
const secondPassphrase = ['Success', 'is', 'one', 'percent', 'inspiration', 'ninety-nine', 'percent', 'perspiration'];
const thirdPassphrase = ['The answer', 'is meaningless', 'unless', 'you', 'discover', 'it', 'for', 'yourself'];
let codePhrase;

export let codeWordGameGemPuzzle;
export let codeWordGameMemory;
export let codeWordGameSnake;
export let codeWordGameTetris;
export let codeWordGameGuess;
export let codeWordGameSimon;
export let codeWordGameTicTacToe;
export let codeWordGameHangman;

const definePhrase = () => {
    switch(getRandomInt(3)) {
        case 0:
            codePhrase = firstPassphrase;
            break;
        case 1:
            codePhrase = secondPassphrase;
            break;
        case 2:
            codePhrase = thirdPassphrase;
            break;
    }
}

const distributionOfCodewords = () => {
    definePhrase();
    console.log(codePhrase);

    codeWordGameGemPuzzle = codePhrase[0];
    codeWordGameMemory = codePhrase[1];
    codeWordGameSnake = codePhrase[2];
    codeWordGameTetris = codePhrase[3];
    codeWordGameGuess = codePhrase[4];
    codeWordGameSimon = codePhrase[5];
    codeWordGameHangman = codePhrase[6];
    codeWordGameTicTacToe = codePhrase[7];
}

distributionOfCodewords();

const layoutLock = `
    <div class="lock__close lock__active">
        <img src="./assets/img/close.png">
    </div>
    <div class="lock__open">
        <img src="./assets/img/open.png">
    </div>
`;

export const layoutLockGame = `
    <div class="lock-game">
        <div class="lock-game__close lock-game__active">
            <img src="./assets/img/close.png">
        </div>
        <div class="lock-game__open">
            <img src="./assets/img/open.png">
        </div>
        <div class="lock-game__exit">
            <input class="lock-game__text">
        </div>
    </div>
`;

arrLock.forEach((elem) => {
    document.querySelector(elem).innerHTML += layoutLock;
});

export const KeyDownLock = (event) => {
    switch(event.keyCode) {
        case enter:
            checkTextExit();
            break;
    }
}

const checkOpenLock = (elem) => {
    document.querySelector(`${elem} ${lockClose}`).classList.remove(lockActive);
    document.querySelector(`${elem} ${lockOpen}`).classList.add(lockActive);

    checkGameOverDoor();
}

const checkTextExit = () => {
    if (document.querySelector(lockGameText).value === codePhrase[indexLock[numLockFromString] - num]) {
        document.querySelector(lockGameClose).classList.remove(lockGameActive);
        document.querySelector(lockGameOpen).classList.add(lockGameActive);
        flagOpen = true;
        countOpenLock++;
    }
    if (flagOpen) {
        checkOpenLock(indexLock)
    }
}

const checkGameOverDoor = () => {
    if (countOpenLock === arrLock.length) {
        document.querySelector(doorOpen).classList.remove(doorNoneDisplay);
        document.querySelector(door).classList.add(doorNoneDisplay);
        openDoor();
    }
}

const openDoor = () => {
    document.querySelector(doorOpen).addEventListener('click', () => {
        document.querySelector('#intro-content-3').classList.remove('disabled');
        document.querySelector('#intro-content-3').parentElement.classList.remove('disabled');
    });
}

export const displayLock = (elem) => {
    if (document.querySelector(`${elem} ${lockOpen}`).classList.contains(lockActive)) {
        document.querySelector(lockGameClose).classList.remove(lockGameActive);
        document.querySelector(lockGameOpen).classList.add(lockGameActive);
    }
}