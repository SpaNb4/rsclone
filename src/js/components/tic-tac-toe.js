import { playAudio } from './utils';
import soundClickTicTacToe from './../../assets/audio/tictactoe-click.mp3';
import soundWinTicTacToe from './../../assets/audio/tictactoe-win.mp3';
import soundGameOverTicTacToe from './../../assets/audio/tictactoe-gameover.mp3';

const classCeil = '.cell',
      classWin = '.win',
      stepX = '<img src="./assets/img/lollipops.png">',
      step0 = '<img src="./assets/img/donut.png">',
      index0 = 0,
      index1 = 1,
      index2 = 2,
      index3 = 3,
      index4 = 4,
      index5 = 5,
      index6 = 6,
      index7 = 7,
      index8 = 8,
      winX = 'You won !',
      gameOver = 'The game is over, you lose',
      countBlock = 9,
      maxStep = 5,
      firstStep = 0,
      elemArr0 = 0,
      elemArr1 = 1,
      elemArr2 = 2,
      frameImage = '.frame-image',
      game = '.tic-tac-toe',
      close = '.tic-tac-toe__close',
      repeat = '.tic-tac-toe__repeat',
      classCodeTicTacToe = '.codeTicTacToe',
      textCodeTicTacToe = 'Code word: TEST',
      audioClickTicTacToe = new Audio(soundClickTicTacToe),
      audioWinTicTacToe = new Audio(soundWinTicTacToe),
      audioGameOverTicTacToe = new Audio(soundGameOverTicTacToe);

let step = firstStep,
    arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];

document.querySelector(frameImage).addEventListener('click', () => {
    document.querySelector(game).classList.add('active');
    gameTicTacToe();
    playAudio(audioClickTicTacToe);
});

document.querySelector(close).addEventListener('click', () => {
    document.querySelector(game).classList.remove('active');
    clearGameTicTacToe();
    playAudio(audioClickTicTacToe);
});

document.querySelector(repeat).addEventListener('click', () => {
    clearGameTicTacToe();
    playAudio(audioClickTicTacToe);
});

const gameTicTacToe = () => {
    document.querySelectorAll(classCeil).forEach((elem, index) => {
        elem.addEventListener('click', () => {
            playAudio(audioClickTicTacToe);
            if (elem.innerHTML === '') {
                elem.innerHTML = stepX;
                arr[index] = elemArr1;
    
                step++;
                if (step !== maxStep) {
                    computer();
                }
                winTicTacToe(elemArr1, winX);
                winTicTacToe(elemArr2, gameOver);
    
                if (step === maxStep && document.querySelector(classWin).innerHTML === '') {
                    document.querySelector(classWin).innerHTML = gameOver;
                }
            }
        });
    });
}

const clearGameTicTacToe = () => {
    document.querySelectorAll(classCeil).forEach((elem) => {
        elem.innerHTML = '';
    });

    document.querySelector(classWin).innerHTML = '';
    step = firstStep;
    arr = [elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0, elemArr0];
}

const computer = () => {
    let index = randIndex();
    if (document.querySelectorAll(classCeil)[index].innerHTML === '') {
        document.querySelectorAll(classCeil)[index].innerHTML = step0;
        arr[index] = elemArr2;
    } else {
        computer();
    }
}

const randIndex = () => {
    return Math.floor(Math.random() * countBlock);
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
    if (win === winX) {
        document.querySelector(classCodeTicTacToe).innerHTML = textCodeTicTacToe;
        playAudio(audioWinTicTacToe);
    } else {
        playAudio(audioGameOverTicTacToe);
    }
}