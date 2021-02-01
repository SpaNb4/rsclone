import { indexLock } from './room';
import { state } from './state';
import { getRandomInt } from './utils';
import { openFinalIntro } from './intro';

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
    conteinerWall1 = '.wall__container',
    htmlDoorOpen = '<div class="door-open element door-none"></div>',
    door = '.door',
    doorNoneDisplay = 'door-none',
    enter = 13,
    numLockFromString = 5,
    num = 1,
    stateCloseLock = 0,
    stateOpenLock = 1,
    countPharese = 3,
    countWord = 1,
    indexArr = 0,
    neededCountDublicate = 0,
    timeReplaceDoor = 300;


let arrOpenLocks = [stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock, stateCloseLock];

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
    ['The answer', 'is meaningless', 'unless', 'you', 'discover', 'it', 'for', 'yourself']
];

const codePhrase = passpharasesArr[getRandomInt(countPharese)];
let arrRandomIndex = [];

const addRandomElement = () => {
    let number = getRandomInt(codePhrase.length);
    let countDublicate = neededCountDublicate;
    arrRandomIndex.forEach(elem => {
        if (number === elem) {
            countDublicate++;
        }
    })

    if (countDublicate > neededCountDublicate) {
        addRandomElement();
    } else {
        arrRandomIndex.push(number)
    }
}

const addArrayRandomElement = () => {
    while (arrRandomIndex.length !== arrLock.length) {
        addRandomElement();
    }
}
addArrayRandomElement();

export const definitionCodeWord = () => {
    let word = codePhrase[arrRandomIndex[indexArr]];
    arrRandomIndex.splice(indexArr, countWord);
    return word;
}

arrLock.forEach((elem) => {
    document.querySelector(elem).innerHTML += layoutLock;
});

export const KeyDownLock = (event) => {
    switch (event.keyCode) {
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
        checkOpenLock(indexLock)
    }
}

const checkGameOverDoor = () => {
    if (countOpenLock === arrLock.length) {
        document.querySelector(conteinerWall1).innerHTML += htmlDoorOpen;
        setTimeout(() => replaceTheDoor(), timeReplaceDoor);
        state.locksOpen = true;
        openDoor();
    }
}

const replaceTheDoor = () => {
    document.querySelector(doorOpen).classList.remove(doorNoneDisplay);
    document.querySelector(door).classList.add(doorNoneDisplay);
}

const openDoor = () => {
    document.querySelector(doorOpen).addEventListener('click', openFinalIntro);
}

export const displayLock = (elem) => {
    if (document.querySelector(`${elem} ${lockOpen}`).classList.contains(lockActive)) {
        document.querySelector(lockGameClose).classList.remove(lockGameActive);
        document.querySelector(lockGameOpen).classList.add(lockGameActive);
    }
}
