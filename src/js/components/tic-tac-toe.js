import { playAudio, getRandomInt } from './utils';
import { definitionCodeWord } from './game-over';
import { GameTimer } from './timer.js';
import { createTimerView } from './timer_view.js';
import { getRoomState } from './room_state.js';
import { setHiddenWordVisibility } from './room';
import soundClickTicTacToe from './../../assets/audio/tictactoe-click.mp3';
import soundWinTicTacToe from './../../assets/audio/tictactoe-win.mp3';
import soundGameOverTicTacToe from './../../assets/audio/tictactoe-gameover.mp3';

const classCeil = '.cell',
      classWin = '.win',
      stepX = '<img src="./assets/img/pistols.png">',
      step0 = '<img src="./assets/img/losso.png">',
      index0 = 0,
      index1 = 1,
      index2 = 2,
      index3 = 3,
      index4 = 4,
      index5 = 5,
      index6 = 6,
      index7 = 7,
      index8 = 8,
      winX = '<span>You won</span> !',
      gameOver = '<span>The game is over, you lose</span>',
      countBlock = 9,
      maxStep = 5,
      firstStep = 0,
      elemArr0 = 0,
      elemArr1 = 1,
      elemArr2 = 2,
      audioClickTicTacToe = new Audio(soundClickTicTacToe),
      audioWinTicTacToe = new Audio(soundWinTicTacToe),
      audioGameOverTicTacToe = new Audio(soundGameOverTicTacToe),
      timeStepComputer = 300,
      gameNameTicTacToe = 'tic_tac_toe',
      stateTimerTicTacToe = new GameTimer(gameNameTicTacToe, getRoomState()),
      secretWordTicTacToe = definitionCodeWord(),
      idTimerTicTacToe = '#timer-tictactoe';

let step = firstStep,
    gameOverTicTacToe = false,
    arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];
    
export const gameTicTacToe = () => {
    gameOverTicTacToe = false;
    const timerContainer = document.querySelector(idTimerTicTacToe);
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimerTicTacToe);
    stateTimerTicTacToe.gameOpened();
    const gameFinished = getRoomState().isGameFinished(gameNameTicTacToe);
    setHiddenWordVisibility(gameFinished, secretWordTicTacToe, gameNameTicTacToe);
    document.querySelectorAll(classCeil).forEach((elem, index) => {
        elem.addEventListener('click', () => {
            if (!gameOverTicTacToe) {
                if (elem.innerHTML === '') {
                    playAudio(audioClickTicTacToe);
                    elem.innerHTML = stepX;
                    arr[index] = elemArr1;

                    step++;
                    if (step !== maxStep) {
                        setTimeout(() => computer(), timeStepComputer);
                    }
                    winTicTacToe(elemArr1, winX);
                    winTicTacToe(elemArr2, gameOver);

                    if (step === maxStep && document.querySelector(classWin).innerHTML === '') {
                        document.querySelector(classWin).innerHTML = gameOver;
                    }
                }
            }
        });
    });
}

export const closeGameTicTacToe = () => {
    document.querySelectorAll(classCeil).forEach((elem) => {
        elem.innerHTML = '';
    });

    document.querySelector(classWin).innerHTML = '';
    step = firstStep;
    arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];
}

const computer = () => {
    let index = getRandomInt(countBlock);
    if (document.querySelectorAll(classCeil)[index].innerHTML === '') {
        document.querySelectorAll(classCeil)[index].innerHTML = step0;
        arr[index] = elemArr2;
    } else {
        computer();
    }
}

const winTicTacToe = (step, win) => {
    if (arr[index0] === step && arr[index3] === step && arr[index6] === step) conclusionGameTicTacToe(win);
    else if (arr[index1] === step && arr[index4] === step && arr[index7] === step) conclusionGameTicTacToe(win);
    else if (arr[index2] === step && arr[index5] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index0] === step && arr[index1] === step && arr[index2] === step) conclusionGameTicTacToe(win);
    else if (arr[index3] === step && arr[index4] === step && arr[index5] === step) conclusionGameTicTacToe(win);
    else if (arr[index6] === step && arr[index7] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index0] === step && arr[index4] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index2] === step && arr[index4] === step && arr[index6] === step) conclusionGameTicTacToe(win);
}

const conclusionGameTicTacToe = (win) => {
    document.querySelector(classWin).innerHTML = win;
    gameOverTicTacToe = true;
    stateTimerTicTacToe.gameFinished();
    setHiddenWordVisibility(true, secretWordTicTacToe, gameNameTicTacToe);
    if (win === winX) {
        playAudio(audioWinTicTacToe);
    } else {
        playAudio(audioGameOverTicTacToe);
    }
}