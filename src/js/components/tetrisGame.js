import { playAudio } from './utils';
import { definitionCodeWord } from './game-over';
import { GameTimer } from './timer.js';
import { createTimerView } from './timer_view.js';
import { getRoomState } from './room_state.js';
import { setHiddenWordVisibility } from './room';
import soundWinTetris from './../../assets/audio/tictactoe-win.mp3';
import soundGameOverTetris from './../../assets/audio/tictactoe-gameover.mp3';

const tetris = '.tetris__game',
      numberScore = '.numberScore',
      context2D = '2d',
      resultTetris = '.resultTetris',
      classCodeTetris = '.codeTetris',
      textCodeTetris = `<span>Code word:</span> `,
      white = 'white',
      salmon = 'salmon',
      yellow = 'yellow',
      cyan = 'cyan',
      magenta = 'magenta',
      dodgerBlue = 'dodgerBlue',
      aquamarine = 'aquamarine',
      darkViolet = 'darkViolet',
      row = 20,
      column = 10,
      size = 20,
      colorBackground = white,
      textGameOver = '<span>The game is over, you lose</span>',
      winText = '<span>You won</span> !',
      audioWinTetris = new Audio(soundWinTetris),
      audioGameOverTetris = new Audio(soundGameOverTetris),
      elem0 = 0,
      elem1 = 1,
      startScore = 0,
      winScore = 50,
      indexFigure = 0,
      indexColor = 1,
      addScore = 10,
      coord0 = 0,
      coordStartX = 3,
      coodStartY = -2,
      gameNameTetris = 'tetris',
      stateTimerTetris = new GameTimer(gameNameTetris, getRoomState()),
      secretWordTetris = definitionCodeWord(),
      idTimerTetris = '#timer-tetris';

let score = startScore,
    board = [];

const I = [
	[
		[elem0, elem0, elem0, elem0],
		[elem1, elem1, elem1, elem1],
		[elem0, elem0, elem0, elem0],
		[elem0, elem0, elem0, elem0],
	],
	[
		[elem0, elem0, elem1, elem0],
		[elem0, elem0, elem1, elem0],
		[elem0, elem0, elem1, elem0],
		[elem0, elem0, elem1, elem0],
	],
	[
		[elem0, elem0, elem0, elem0],
		[elem0, elem0, elem0, elem0],
		[elem1, elem1, elem1, elem1],
		[elem0, elem0, elem0, elem0],
	],
	[
		[elem0, elem1, elem0, elem0],
		[elem0, elem1, elem0, elem0],
		[elem0, elem1, elem0, elem0],
		[elem0, elem1, elem0, elem0],
	]
];

const J = [
	[
		[elem1, elem0, elem0],
		[elem1, elem1, elem1],
		[elem0, elem0, elem0]
	],
	[
		[elem0, elem1, elem1],
		[elem0, elem1, elem0],
		[elem0, elem1, elem0]
	],
	[
		[elem0, elem0, elem0],
		[elem1, elem1, elem1],
		[elem0, elem0, elem1]
	],
	[
		[elem0, elem1, elem0],
		[elem0, elem1, elem0],
		[elem1, elem1, elem0]
	]
];

const L = [
	[
		[elem0, elem0, elem1],
		[elem1, elem1, elem1],
		[elem0, elem0, elem0]
	],
	[
		[elem0, elem1, elem0],
		[elem0, elem1, elem0],
		[elem0, elem1, elem1]
	],
	[
		[elem0, elem0, elem0],
		[elem1, elem1, elem1],
		[elem1, elem0, elem0]
	],
	[
		[elem1, elem1, elem0],
		[elem0, elem1, elem0],
		[elem0, elem1, elem0]
	]
];

const O = [
	[
		[elem0, elem0, elem0, elem0],
		[elem0, elem1, elem1, elem0],
		[elem0, elem1, elem1, elem0],
		[elem0, elem0, elem0, elem0],
	]
];

const S = [
	[
		[elem0, elem1, elem1],
		[elem1, elem1, elem0],
		[elem0, elem0, elem0]
	],
	[
		[elem0, elem1, elem0],
		[elem0, elem1, elem1],
		[elem0, elem0, elem1]
	],
	[
		[elem0, elem0, elem0],
		[elem0, elem1, elem1],
		[elem1, elem1, elem0]
	],
	[
		[elem1, elem0, elem0],
		[elem1, elem1, elem0],
		[elem0, elem1, elem0]
	]
];

const T = [
	[
		[elem0, elem1, elem0],
		[elem1, elem1, elem1],
		[elem0, elem0, elem0]
	],
	[
		[elem0, elem1, elem0],
		[elem0, elem1, elem1],
		[elem0, elem1, elem0]
	],
	[
		[elem0, elem0, elem0],
		[elem1, elem1, elem1],
		[elem0, elem1, elem0]
	],
	[
		[elem0, elem1, elem0],
		[elem1, elem1, elem0],
		[elem0, elem1, elem0]
	]
];

const Z = [
	[
		[elem1, elem1, elem0],
		[elem0, elem1, elem1],
		[elem0, elem0, elem0]
	],
	[
		[elem0, elem0, elem1],
		[elem0, elem1, elem1],
		[elem0, elem1, elem0]
	],
	[
		[elem0, elem0, elem0],
		[elem1, elem1, elem0],
		[elem0, elem1, elem1]
	],
	[
		[elem0, elem1, elem0],
		[elem1, elem1, elem0],
		[elem1, elem0, elem0]
	]
];

const pieces = [
    [Z, salmon],
    [S, yellow],
    [T, cyan],
    [O, magenta],
    [L, dodgerBlue],
    [I, aquamarine],
    [J, darkViolet]
];

const drawSquare = (x, y, color) => {
    document.querySelector(tetris).getContext(context2D).fillStyle = color;
    document.querySelector(tetris).getContext(context2D).fillRect(x*size, y*size, size, size);

    document.querySelector(tetris).getContext(context2D).strokeStyle = white;
    document.querySelector(tetris).getContext(context2D).strokeRect(x*size, y*size, size, size);
}

export const createBoard = () => {
    for(let y = 0; y < row; y++){
        board[y] = [];
        for(let x = 0; x < column; x++){
            board[y][x] = colorBackground;
        }
    }

    const timerContainer = document.querySelector(idTimerTetris);
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimerTetris);
    stateTimerTetris.gameOpened();
    const gameFinished = getRoomState().isGameFinished(gameNameTetris);
    setHiddenWordVisibility(gameFinished, secretWordTetris);
}

export const drawBoard = () => {
    for(let y = 0; y < row; y++){
        for(let x = 0; x < column; x++){
            drawSquare(x, y, board[y][x]);
        }
    }
}

class Piece {
    constructor(tetromino,color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        
        this.x = coordStartX;
        this.y = coodStartY;
    }    
    
    fill(color) {
        for(let y = 0; y < this.activeTetromino.length; y++){
            for(let x = 0; x < this.activeTetromino.length; x++){
                if( this.activeTetromino[y][x]){
                    drawSquare(this.x + x, this.y + y, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(colorBackground);
    }

    moveDown() {
        if(!this.collision(0, 1, this.activeTetromino)){
            this.unDraw();
            this.y++;
            this.draw();
        }else{
            this.lock();
            piece = createPiece();
        }
        
    }

    moveRight() {
        if(!this.collision(1, 0, this.activeTetromino)){
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    
    moveLeft() {
        if(!this.collision(-1, 0, this.activeTetromino)){
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;
        
        if(this.collision(0, 0, nextPattern)){
            if(this.x > column / 2){
                kick = -1; 
            }else{
                kick = 1;
            }
        }
        
        if(!this.collision(kick, 0, nextPattern)){
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    lock() {
        for(let y = 0; y < this.activeTetromino.length; y++){
            for(let x = 0; x < this.activeTetromino.length; x++){
                if( !this.activeTetromino[y][x]){
                    continue;
                }
                if(this.y + y < 0){
                    document.querySelector(resultTetris).innerHTML = textGameOver;
                    gameOver = true;
                    playAudio(audioGameOverTetris);
                    break;
                }
                board[this.y + y][this.x + x] = this.color;
            }
        }

        for(let y = 0; y < row; y++){
            let isrowFull = true;
            for(let x = 0; x < column; x++){
                isrowFull = isrowFull && (board[y][x] != colorBackground);
            }
            if(isrowFull){
                for(let r = y; r > 1; r--){
                    for(let c = 0; c < column; c++){
                        board[r][c] = board[r - 1][c];
                    }
                }
                
                for(let c = 0; c < column; c++){
                    board[0][c] = colorBackground;
                }
                score += addScore;
            }
        }
        drawBoard();
        
        document.querySelector(numberScore).innerHTML = score;
        winTetris(score);
    }

    collision(x, y, piece) {
        for(let r = 0; r < piece.length; r++){
            for(let c = 0; c < piece.length; c++){
                if(!piece[r][c]){
                    continue;
                }
                
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                
                if(newX < coord0 || newX >= column || newY >= row){
                    return true;
                }
                
                if(newY < coord0){
                    continue;
                }
                
                if( board[newY][newX] != colorBackground){
                    return true;
                }
            }
        }
        return false;
    }
}

const createPiece = () => {
    let index = Math.floor(Math.random() * pieces.length);
    return new Piece( pieces[index][indexFigure], pieces[index][indexColor]);
}

export let piece = createPiece();
export let gameOver = false;

const winTetris = (score) => {
    if (score >= winScore) {
        stateTimerTetris.gameFinished();
        setHiddenWordVisibility(true, secretWordTetris);
        document.querySelector(resultTetris).innerHTML = winText;
        gameOver = true;
        playAudio(audioWinTetris);
    }
}

export const clear = () => {
    score = startScore;
    document.querySelector(numberScore).innerHTML = score;
    document.querySelector(resultTetris).innerHTML = '';
    gameOver = false;
}