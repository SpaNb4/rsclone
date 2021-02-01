/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { playAudio, getRandomInt } from './utils';
import { definitionCodeWord } from './game-over';
import { GameTimer } from './timer';
import { createTimerView } from './timer_view';
import { getRoomState } from './room_state';
import { setHiddenWordVisibility } from './room';
import soundClickTicTacToe from '../../assets/audio/tictactoe-click.mp3';
import soundWinTicTacToe from '../../assets/audio/tictactoe-win.mp3';
import soundGameOverTicTacToe from '../../assets/audio/tictactoe-gameover.mp3';

const classCeil = '.cell';
const classWin = '.win';
const stepX = '<img src="./assets/img/pistols.png">';
const step0 = '<img src="./assets/img/losso.png">';
const index0 = 0;
const index1 = 1;
const index2 = 2;
const index3 = 3;
const index4 = 4;
const index5 = 5;
const index6 = 6;
const index7 = 7;
const index8 = 8;
const winX = '<span>You won</span> !';
const gameOver = '<span>The game is over, you lose</span>';
const countBlock = 9;
const maxStep = 5;
const firstStep = 0;
const elemArr0 = 0;
const elemArr1 = 1;
const elemArr2 = 2;
const audioClickTicTacToe = new Audio(soundClickTicTacToe);
const audioWinTicTacToe = new Audio(soundWinTicTacToe);
const audioGameOverTicTacToe = new Audio(soundGameOverTicTacToe);
const timeStepComputer = 300;
const gameNameTicTacToe = 'tic_tac_toe';
const stateTimerTicTacToe = new GameTimer(gameNameTicTacToe, getRoomState());
const secretWordTicTacToe = definitionCodeWord();
const idTimerTicTacToe = '#timer-tictactoe';

let step = firstStep;
let gameOverTicTacToe = false;
let arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];

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
                    // eslint-disable-next-line no-param-reassign
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
};

export const closeGameTicTacToe = () => {
    document.querySelectorAll(classCeil).forEach((elem) => {
        // eslint-disable-next-line no-param-reassign
        elem.innerHTML = '';
    });

    document.querySelector(classWin).innerHTML = '';
    step = firstStep;
    arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];
};

const computer = () => {
    const index = getRandomInt(countBlock);
    if (document.querySelectorAll(classCeil)[index].innerHTML === '') {
        document.querySelectorAll(classCeil)[index].innerHTML = step0;
        arr[index] = elemArr2;
    } else {
        computer();
    }
};

// eslint-disable-next-line no-shadow
const winTicTacToe = (step, win) => {
    if (arr[index0] === step && arr[index3] === step && arr[index6] === step) conclusionGameTicTacToe(win);
    else if (arr[index1] === step && arr[index4] === step && arr[index7] === step) conclusionGameTicTacToe(win);
    else if (arr[index2] === step && arr[index5] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index0] === step && arr[index1] === step && arr[index2] === step) conclusionGameTicTacToe(win);
    else if (arr[index3] === step && arr[index4] === step && arr[index5] === step) conclusionGameTicTacToe(win);
    else if (arr[index6] === step && arr[index7] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index0] === step && arr[index4] === step && arr[index8] === step) conclusionGameTicTacToe(win);
    else if (arr[index2] === step && arr[index4] === step && arr[index6] === step) conclusionGameTicTacToe(win);
};

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
};
