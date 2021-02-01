/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable import/no-cycle */
import { indexLock } from './room';
import { state } from './state.ts';
import { getRandomInt } from './utils';
import { openFinalIntro } from './intro.ts';

let flagOpen = false;
let countOpenLock = 0;

const lockClose = '.lock__close';
const lockOpen = '.lock__open';
const lockActive = 'lock__active';
const lockGameText = '.lock-game__text';
const lockGameClose = '.lock-game__close';
const lockGameOpen = '.lock-game__open';
const lockGameActive = 'lock-game__active';
const doorOpen = '.door-open';
const door = '.door';
const doorNoneDisplay = 'door-none';
const enter = 13;
const numLockFromString = 5;
const num = 1;
const stateCloseLock = 0;
const stateOpenLock = 1;
const countPharese = 3;
const countWord = 1;
const indexArr = 0;
const neededCountDublicate = 0;

const arrOpenLocks = [stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock];

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

export const arrLock = ['.lock1', '.lock2', '.lock3', '.lock4', '.lock5', '.lock6', '.lock7', '.lock8'];

const passpharasesArr = [
    ['Always', 'forgive', 'your', 'enemies', 'Nothing', 'annoys', 'them', 'more'],
    ['Success', 'is', 'one', 'percent', 'inspiration', 'ninety-nine', 'percent', 'perspiration'],
    ['The answer', 'is meaningless', 'unless', 'you', 'discover', 'it', 'for', 'yourself'],
];

const codePhrase = passpharasesArr[getRandomInt(countPharese)];
const arrRandomIndex = [];

const addRandomElement = () => {
    const number = getRandomInt(codePhrase.length);
    let countDublicate = neededCountDublicate;
    arrRandomIndex.forEach((elem) => {
        if (number === elem) {
            countDublicate++;
        }
    });

    if (countDublicate > neededCountDublicate) {
        addRandomElement();
    } else {
        arrRandomIndex.push(number);
    }
};

const addArrayRandomElement = () => {
    while (arrRandomIndex.length !== arrLock.length) {
        addRandomElement();
    }
};
addArrayRandomElement();

export const definitionCodeWord = () => {
    const word = codePhrase[arrRandomIndex[indexArr]];
    arrRandomIndex.splice(indexArr, countWord);
    return word;
};

arrLock.forEach((elem) => {
    document.querySelector(elem).innerHTML += layoutLock;
});

export const KeyDownLock = (event) => {
    switch (event.keyCode) {
        case enter:
            checkTextExit();
            break;
        default:
            break;
    }
};

const checkOpenLock = (elem) => {
    document.querySelector(`${elem} ${lockClose}`).classList.remove(lockActive);
    document.querySelector(`${elem} ${lockOpen}`).classList.add(lockActive);
    checkGameOverDoor();
};

const checkTextExit = () => {
    if (document.querySelector(lockGameText).value.toLowerCase() === codePhrase[indexLock[numLockFromString] - num].toLowerCase()) {
        if (arrOpenLocks[indexLock[numLockFromString] - num] === stateCloseLock) {
            document.querySelector(lockGameClose).classList.remove(lockGameActive);
            document.querySelector(lockGameOpen).classList.add(lockGameActive);
            flagOpen = true;
            countOpenLock++;
            arrOpenLocks[indexLock[numLockFromString] - num] = stateOpenLock;
        }
    } else {
        flagOpen = false;
    }
    if (flagOpen) {
        checkOpenLock(indexLock);
    }
};

const checkGameOverDoor = () => {
    if (countOpenLock === arrLock.length) {
        document.querySelector(doorOpen).classList.remove(doorNoneDisplay);
        document.querySelector(door).classList.add(doorNoneDisplay);
        state.locksOpen = true;
        openDoor();
    }
};

const openDoor = () => {
    document.querySelector(doorOpen).addEventListener('click', openFinalIntro);
};

export const displayLock = (elem) => {
    if (document.querySelector(`${elem} ${lockOpen}`).classList.contains(lockActive)) {
        document.querySelector(lockGameClose).classList.remove(lockGameActive);
        document.querySelector(lockGameOpen).classList.add(lockGameActive);
    }
};
