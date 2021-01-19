const tetris = '.tetris__game',
      numberScore = '.numberScore',
      context2D = '2d',
      resultTetris = '.resultTetris',
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
      textGameOver = '<span>The game is over, you lost</span>',
      winText = '<span>You won</span>';

let score = 0,
    board = [];

const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[0, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 0, 0],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
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
        
        this.x = 3;
        this.y = -2;
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
                score += 10;
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
                
                if(newX < 0 || newX >= column || newY >= row){
                    return true;
                }
                
                if(newY < 0){
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
    return new Piece( pieces[index][0], pieces[index][1]);
}

export let piece = createPiece();
export let gameOver = false;

const winTetris = (score) => {
    if (score > 40) {
        document.querySelector(resultTetris).innerHTML = winText;
        gameOver = true;
    }
}

export const clear = () => {
    score = 0;
    document.querySelector(numberScore).innerHTML = score;
    document.querySelector(resultTetris).innerHTML = '';
    gameOver = false;
}