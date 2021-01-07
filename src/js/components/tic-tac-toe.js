const classCeil = '.cell',
      classWin = '.win',
      stepX = 'X',
      step0 = '0',
      index0 = '0',
      index1 = '1',
      index2 = '2',
      index3 = '3',
      index4 = '4',
      index5 = '5',
      index6 = '6',
      index7 = '7',
      index8 = '8',
      winX = 'Вы выиграли !',
      gameOver = 'Игра закончена, вы проиграли',
      countBlock = 9,
      maxStep = 5,
      firstStep = 0,
      frameImage = '.frame-image',
      game = '.tic-tac-toe',
      close = '.tic-tac-toe__close',
      repeat = '.tic-tac-toe__repeat';
let step = firstStep;

document.querySelector(frameImage).addEventListener('click', () => {
    document.querySelector(game).classList.add('active');
    gameTicTacToe();
});

document.querySelector(close).addEventListener('click', () => {
    document.querySelector(game).classList.remove('active');
    clearGameTicTacToe();
});

document.querySelector(repeat).addEventListener('click', () => {
    clearGameTicTacToe();
});

const gameTicTacToe = () => {
    document.querySelectorAll(classCeil).forEach((elem) => {
        elem.addEventListener('click', () => {
            if (elem.innerHTML === '') {
                elem.innerHTML = stepX;
    
                step++;
                if (step !== maxStep) {
                    computer();
                }
                check();
    
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
}

const computer = () => {
    let index = randIndex();
    if (document.querySelectorAll(classCeil)[index].innerHTML === '') {
        document.querySelectorAll(classCeil)[index].innerHTML = step0;
    } else {
        computer();
    }
}

const randIndex = () => {
    return Math.floor(Math.random() * countBlock);
}

const check = () => {
    let cell = document.querySelectorAll(classCeil),
        textWin = document.querySelector(classWin);

    win(cell, textWin, stepX, winX);
    win(cell, textWin, step0, gameOver);
}

const win = (cell, textWin, step, win) => {
    if (cell[index0].innerHTML === step && cell[index3].innerHTML === step && cell[index6].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index1].innerHTML === step && cell[index4].innerHTML === step && cell[index7].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index2].innerHTML === step && cell[index5].innerHTML === step && cell[index8].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index0].innerHTML === step && cell[index1].innerHTML === step && cell[index2].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index3].innerHTML === step && cell[index4].innerHTML === step && cell[index5].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index6].innerHTML === step && cell[index7].innerHTML === step && cell[index8].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index0].innerHTML === step && cell[index4].innerHTML === step && cell[index8].innerHTML === step) textWin.innerHTML = win;
    else if (cell[index2].innerHTML === step && cell[index4].innerHTML === step && cell[index6].innerHTML === step) textWin.innerHTML = win;
}