let flagOpen = false,
    indexLock,
    countOpenLock = 0;

const lock = '.game-over-lock',
      lockContent = '.game-over-lock__content',
      active = 'active',
      close = '.game-over-lock__close',
      lockClose = '.lock__close',
      lockOpen = '.lock__open',
      lockActive = 'lock__active',
      lockGameText = '.lock-game__text',
      lockGameClose = '.lock-game__close',
      lockGameOpen = '.lock-game__open',
      lockGameActive = 'lock-game__active',
      doorOpen = '.door-open',
      door = '.door',
      doorNoneDisplay = 'door-none';

const arrLock = ['.lock1', '.lock2', '.lock3', '.lock4', '.lock5', '.lock6', '.lock7', '.lock8'],
      codeWords = ['тестовая', 'фраза', 'состоящая', 'из', 'восьми', 'слов', 'для', 'выхода'];

const layoutLock = `
    <div class="lock__close lock__active">
        <img src="./assets/img/close.png">
    </div>
    <div class="lock__open">
        <img src="./assets/img/open.png">
    </div>
`;

const layoutLockGame = `
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

arrLock.forEach((elem) => {
    document.querySelector(elem).addEventListener('click', () => {
        indexLock = elem;
        document.querySelector(lock).classList.add(active);
        document.querySelector(lockContent).innerHTML = layoutLockGame;
        document.addEventListener("keydown", KeyDown);
    });
});

document.querySelector(close).addEventListener('click', () => {
    document.querySelector(lock).classList.remove(active);
});

const KeyDown = (event) => {
    switch(event.keyCode) {
        case 13:
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
    if (document.querySelector(lockGameText).value === codeWords[indexLock[5] - 1]) {
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
    if (countOpenLock === 8) {
        document.querySelector(doorOpen).classList.remove(doorNoneDisplay);
        document.querySelector(door).classList.add(doorNoneDisplay);
    }
}