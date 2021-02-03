/* eslint-disable import/no-cycle */
import { getRandomIntInclusive, playAudio } from './utils';
import { createTimerView } from './timer_view';
import { GameTimer } from './timer';
import { getRoomState } from './room_state';
import winSound from '../../assets/audio/snake-game-win.mp3';
import overSound from '../../assets/audio/snake-game-over.mp3';
import { definitionCodeWord } from './game-over';
import { setHiddenWordVisibility } from './room';

const display = [];
let viewPort;
let gameStatus = 'stopped';
let snake = {};
let food = {};
let gameTimer;
const gameSpeed = 10;
let renderIndex = 0;
const speedUpLimit = 5;
let onTick;
const message = '#message';
const snakeLengthtoWin = 10;
const snakeClass = '.snake';
const startGameButton = 'startGame';
const activeClass = 'active';
const red = 'rgb(245, 0, 6)';
const green = 'rgb(10, 174, 31)';
const white = 'rgb(250, 250, 250)';
const codGray = 'rgb(25, 25, 25)';
const snakeLength = 'snakeLength';
const displayId = 'display';
const gameName = 'snake';
const timerSnake = '#timer-snake';
const stateTimer = new GameTimer(gameName, getRoomState());
const secretWord = definitionCodeWord();

const rectStyles = [
    {
        id: 0,
        type: 'Background',
        stroke: codGray,
        fill: codGray,
    },
    {
        id: 1,
        type: 'Snake head',
        stroke: white,
        fill: white,
    },
    {
        id: 2,
        type: 'Snake body',
        stroke: green,
        fill: green,
    },
    {
        id: 3,
        type: 'Food',
        stroke: red,
        fill: red,
    },
];

function createDisplay(width = 15, height = 15) {
    for (let w = 0; w < width; w += 1) {
        for (let h = 0; h < height; h += 1) {
            if (!display[h]) {
                display[h] = [];
            }

            display[h][w] = {
                h,
                w,
                id: 0,
                type: 0,
            };
        }
    }
}

function clearDisplay() {
    for (let h = 0; h < display.length; h += 1) {
        for (let w = 0; w < display[0].length; w += 1) {
            display[h][w].type = 0;
        }
    }
}

function render(element) {
    const ctx = element.getContext('2d');

    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;

    const rectWidth = parseInt(ctx.canvas.width / display[0].length - 1, 10);
    const rectHeight = parseInt(ctx.canvas.height / display.length - 1, 10);

    for (let h = 0; h < display.length; h += 1) {
        for (let w = 0; w < display[h].length; w += 1) {
            const left = w * rectWidth + w;
            const top = h * rectHeight + h;

            ctx.strokeStyle = rectStyles[display[h][w].type].fill;
            ctx.fillStyle = rectStyles[display[h][w].type].stroke;

            ctx.fillRect(left, top, rectWidth, rectHeight);
            ctx.strokeRect(left, top, rectWidth, rectHeight);
        }
    }
}

function createFood() {
    const emptyRects = [];
    for (let h = 0; h < display.length; h += 1) {
        for (let w = 0; w < display[0].length; w += 1) {
            if (display[h][w].type === 0) {
                emptyRects.push(display[h][w]);
            }
        }
    }

    const foodRect = emptyRects[getRandomIntInclusive(0, emptyRects.length - 1)];

    return {
        x: foodRect.w,
        y: foodRect.h,
        type: 1,
    };
}

function createSnake() {
    return {
        xDir: 0,
        yDir: 0,
        sections: [
            {
                x: parseInt(display[0].length / 2, 10),
                y: parseInt(display.length / 2, 10),
            },
        ],
    };
}

function leftPress() {
    snake.xDir = -1;
    snake.yDir = 0;
}

function rightPress() {
    snake.xDir = 1;
    snake.yDir = 0;
}

function upPress() {
    snake.yDir = -1;
    snake.xDir = 0;
}

function downPress() {
    snake.yDir = 1;
    snake.xDir = 0;
}

const keyMap = {
    ArrowRight: rightPress,
    ArrowLeft: leftPress,
    ArrowUp: upPress,
    ArrowDown: downPress,
};

function setKeyEvents() {
    document.addEventListener('keydown', (event) => {
        if (gameStatus === 'stopped') return;

        if (keyMap[event.code]) {
            event.stopPropagation();
            keyMap[event.code]();
        }
    });
}

function setTouchEvents(container) {
    let touchpx = 0;
    let touchpy = 0;
    container.addEventListener('touchstart', (event) => {
        touchpx = event.touches[0].clientX;
        touchpy = event.touches[0].clientY;
    });
    container.addEventListener('touchend', (event) => {
        const touchEndPX = event.changedTouches[0].clientX;
        const touchEndPY = event.changedTouches[0].clientY;
        const dx = touchEndPX - touchpx;
        const dy = touchEndPY - touchpy;
        if (Math.abs(dx) >= Math.abs(dy)) {
            if (dx > 0) {
                rightPress();
            } else if (dx < 0) {
                leftPress();
            }
        } else if (dy > 0) {
            downPress();
        } else if (dy < 0) {
            upPress();
        }
    });
}

function gameOver() {
    clearInterval(gameTimer);
    gameStatus = 'stopped';
    document.querySelector(message).innerHTML = '<span>The game is over. You can try again!</span>';
    const audioOver = new Audio(overSound);
    playAudio(audioOver);
}

function gameWin() {
    gameStatus = 'win';
    document.querySelector(message).innerHTML = '<span>You won</span>!';
    stateTimer.gameFinished();
    const audioWin = new Audio(winSound);
    playAudio(audioWin);
    setHiddenWordVisibility(true, secretWord, gameName);
}

function setSnakeOnDisplay() {
    display[snake.sections[0].y][snake.sections[0].x].type = 1;
    if (snake.sections.length > 1) {
        for (let index = 1; index < snake.sections.length; index += 1) {
            display[snake.sections[index].y][snake.sections[index].x].type = 2;
        }
    }
}

function renderSnake() {
    const head = snake.sections[0];
    const headNewX = snake.xDir + head.x;
    const headNewY = snake.yDir + head.y;

    // check for crash
    if (headNewX < 0) return gameOver('crash');
    if (headNewY < 0) return gameOver('crash');
    if (headNewX >= display[0].length) return gameOver('crash');
    if (headNewY >= display.length) return gameOver('crash');

    // win
    if (snake.sections.length === snakeLengthtoWin) return gameWin('win');

    // check for bite
    if (snake.sections.length > 1) {
        for (let index = 1; index < snake.sections.length; index += 1) {
            if (headNewX === snake.sections[index].x && headNewY === snake.sections[index].y) {
                return gameOver('Bite');
            }
        }
    }

    // check for food
    if (food.x === headNewX && food.y === headNewY) {
        const newSections = [{ x: headNewX, y: headNewY }];
        // eslint-disable-next-line no-restricted-syntax
        for (const section of snake.sections) {
            newSections.push(section);
        }

        snake.sections = newSections;
        food = createFood();

        return setSnakeOnDisplay();
    }

    // Then recalculate all snake sections
    let newCoords = {
        x: headNewX,
        y: headNewY,
    };

    for (let index = 0; index < snake.sections.length; index += 1) {
        const tmp = { ...snake.sections[index] };
        snake.sections[index] = { ...newCoords };
        newCoords = tmp;
    }

    // Then show them on display
    setSnakeOnDisplay();

    return 0;
}

function renderFood() {
    display[food.y][food.x].type = 3;
}

function tick() {
    if (gameStatus !== 'game') return; // game paused
    renderIndex += 1;
    if (renderIndex > speedUpLimit) {
        renderIndex = 0;
        clearInterval(gameTimer);
        gameTimer = setInterval(tick, 1000 - gameSpeed * 50);
    }

    clearDisplay();
    renderFood();
    renderSnake();
    render(viewPort);

    if (onTick) onTick();
}

function initGame(container) {
    gameStatus = 'stopped';
    createDisplay();
    viewPort = container;
    render(viewPort);
    setKeyEvents();
    setTouchEvents(viewPort);
}

function startGame(onTickHandler) {
    snake = createSnake();
    food = createFood();
    gameStatus = 'game';
    onTick = onTickHandler;
    gameTimer = setInterval(tick, 1000 - gameSpeed * 50);
}

function statRender() {
    document.getElementById(snakeLength).innerHTML = snake.sections.length;
}

document.getElementById(startGameButton).onclick = () => {
    document.querySelector(message).textContent = '';
    clearInterval(gameTimer);
    initGame(viewPort);
    startGame(statRender);
};

function openSnakeGame() {
    document.querySelector(snakeClass).classList.add(activeClass);
    viewPort = document.getElementById(displayId);
    initGame(viewPort);
    startGame(statRender);
    const timerContainer = document.querySelector(timerSnake);
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimer);
    stateTimer.gameOpened();
    const gameFinished = getRoomState().isGameFinished(gameName);
    setHiddenWordVisibility(gameFinished, secretWord, gameName);
}

function closeSnakeGame() {
    document.querySelector(message).textContent = '';
    clearInterval(gameTimer);
    clearDisplay();
    document.querySelector(snakeClass).classList.remove(activeClass);
}

const snakeGame = {
    create: openSnakeGame,
    reset: closeSnakeGame,
};

// eslint-disable-next-line import/prefer-default-export
export { snakeGame, secretWord };
