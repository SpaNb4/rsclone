import movesound from './../../assets/audio/move.mp3';
import * as swap from './gem_puzzle_swap';
import { picture, closeGemPuzzleGame } from './wall3';
import { playAudio } from './utils';

const container = document.querySelector('.gem-puzzle');
const SECRET_WORD = 'test word';

export const GemPuzzle = {
    size: 16,
    moves: 0,
    isPause: false,
    isPuzzleSolved: false,
    currTime: 0,
    arr: [],
    movesArr: [],
    cols: null,
    winMovesArr: [],
    interval: null,
    timeInterval: null,

    init() {
        this.clearField();

        const main = document.createElement('div');
        main.classList.add('cells_items');

        const cellsItemRowCount = Math.sqrt(this.size);
        main.style.cssText = `grid-template-columns: repeat(${cellsItemRowCount}, minmax(20px, 120px));
                              grid-template-rows: repeat(${cellsItemRowCount}, minmax(30px, 60px));`;

        const time = document.createElement('div');
        time.classList.add('time');
        time.innerHTML = `<i class="material-icons">alarm</i>
                        <span class='minutes'>00</span>
                        <span class='separator'>:</span>
                        <span class='seconds'>00</span>`;

        const moves = document.createElement('div');
        moves.classList.add('moves');
        moves.innerHTML = `<i class="material-icons">swap_horizontal_circle</i> ${this.moves}`;

        const menuBtn = document.createElement('a');
        menuBtn.classList.add('menu_btn');
        menuBtn.innerHTML = '<i class="material-icons">menu</i>';
        menuBtn.addEventListener('click', this.openMenu.bind(this));

        const topMenu = document.createElement('div');
        topMenu.classList.add('top_menu');
        topMenu.append(time, moves, menuBtn);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const gameMenuUl = document.createElement('ul');
        gameMenuUl.classList.add('game_menu');
        const menuArr = ['New Game'];
        for (let i = 0; i < menuArr.length; i += 1) {
            const gameMenuLi = document.createElement('li');
            gameMenuLi.innerHTML = menuArr[i];
            gameMenuUl.appendChild(gameMenuLi);
        }

        overlay.append(gameMenuUl);

        const solve = document.createElement('div');
        solve.classList.add('solve');
        solve.innerHTML = '<i class="material-icons">last_page</i>';
        solve.addEventListener('click', () => {
            if (!this.interval) {
                this.interval = setInterval(this.solvePuzzle.bind(this), 200);
            } else {
                clearInterval(this.interval);
                this.interval = null;
            }
        });

        const bottomMenu = document.createElement('div');
        bottomMenu.classList.add('bottom_menu');
        bottomMenu.append(solve);

        for (let i = 0; i < this.size; i += 1) {
            const cellsItem = document.createElement('div');
            cellsItem.classList.add('cells_item');
            cellsItem.style.order = i + 1;
            if (i === this.size - 1) {
                cellsItem.style.backgroundColor = 'transparent';
                cellsItem.style.border = 'none';
            }
            cellsItem.style.background = `url(./assets/img/gem_puzzle_bg.png)`;
            main.appendChild(cellsItem);
        }

        const win = document.createElement('div');
        win.classList.add('win');

        const closeGemPuzzleBtn = document.createElement('span');
        closeGemPuzzleBtn.classList.add('gem-puzzle_close_btn');
        closeGemPuzzleBtn.innerHTML = '<i class="material-icons medium grey-text text-grey">close</i>';
        closeGemPuzzleBtn.addEventListener('click', () => {
           closeGemPuzzleGame();
        });

        container.append(topMenu);
        main.append(overlay, win, closeGemPuzzleBtn);
        container.append(main, bottomMenu);

        document.body.append(container);

        const elHeight = document.querySelector('.cells_item').offsetWidth;

        main.style.cssText = `grid-template-columns: repeat(${cellsItemRowCount}, minmax(20px, 120px));
        grid-template-rows: repeat(${cellsItemRowCount}, ${elHeight}px);`;

        let k = 0;
        const cellsItem = document.querySelectorAll('.cells_item');
        for (let i = 0; i < Math.sqrt(this.size); i += 1) {
            for (let j = 0; j < Math.sqrt(this.size); j += 1) {
                cellsItem[k].style.backgroundPosition = `${512 - j * elHeight}px ${512 - i * elHeight}px`;
                k += 1;
            }
        }

        this.fieldFill();

        this.cols.forEach((col) => {
            col.addEventListener('click', this.handleClick.bind(this));
        });
    },

    clearField() {
        container.innerHTML = '';
        this.isPause = false;
        this.isPuzzleSolved = false;
        this.currTime = 0;
        this.arr = [];
        this.movesArr = [];
        this.moves = 0;
        clearInterval(this.timeInterval);
    },

    fieldFill() {
        // fill the array with numbers from 1 to size-1
        this.cols = document.querySelectorAll('.cells_item');
        let q = 0;
        for (let i = 0; i < Math.sqrt(this.size); i += 1) {
            this.arr[i] = [];
            for (let j = 0; j < Math.sqrt(this.size); j += 1) {
                this.arr[i][j] = (q + 1).toString();
                if (q === this.size - 1) {
                    this.arr[i][j] = '';
                }
                q += 1;
            }
        }
        this.colsSet();
        // mixing field
        const isRandom = true;
        for (let n = 1; n < 300; n += 1) {
            const i = this.randomInteger(0, Math.sqrt(this.size) - 1);
            const j = this.randomInteger(0, Math.sqrt(this.size) - 1);
            swap.checkNextEl.call(this, i, j, this.findEl(this.arr[i][j]), isRandom);
        }

        this.getTime();
        this.movesArr.pop();
    },

    colsSet() {
        let q = 0;
        for (let i = 0; i < this.cols.length; i += 1) {
            this.cols[q].innerHTML = q + 1;
            if (q === this.size - 1) {
                this.cols[q].innerHTML = '';
                this.cols[q].dataset.empty = true;
            }
            q += 1;
        }
        q = 0;
        for (let i = 0; i < Math.sqrt(this.size); i += 1) {
            for (let j = 0; j < Math.sqrt(this.size); j += 1) {
                this.findEl(this.arr[i][j]).style.order = q + 1;
                q += 1;
            }
        }
    },

    randomInteger(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },

    findEl(el) {
        for (let i = 0; i < this.cols.length; i += 1) {
            if (this.cols[i].innerHTML === el) {
                return this.cols[i];
            }
        }
        return false;
    },

    openMenu() {
        this.isPause = !this.isPause;
        this.getTime();
        const overlay = document.querySelector('.gem-puzzle .overlay');
        overlay.classList.toggle('visible');

        const menuBtn = document.querySelector('.menu_btn');
        if (menuBtn.innerHTML === '<i class="material-icons">menu</i>') {
            menuBtn.innerHTML = '<i class="material-icons">menu_open</i>';
        } else {
            menuBtn.innerHTML = '<i class="material-icons">menu</i>';
        }

        const time = document.querySelector('.time i');
        if (time.innerHTML === 'alarm') {
            time.innerHTML = 'alarm_off';
        } else {
            time.innerHTML = 'alarm';
        }

        const newGameLi = document.querySelector('.game_menu li');
        newGameLi.addEventListener('click', () => {
            this.isPause = !this.isPause;
            this.init();
        });
    },

    solvePuzzle() {
        let i = 0;
        let j = 0;

        if (this.isPuzzleSolved) {
            clearInterval(this.interval);
        } else {
            [i, j] = this.movesArr[this.movesArr.length - 1];
            swap.checkNextEl.call(this, i, j, this.findEl(this.arr[i][j]));
            this.movesArr.pop();
        }
    },

    getTime() {
        function pad(val) {
            return val > 9 ? val : `0${val}`;
        }
        const seconds = document.querySelector('.seconds');
        const minutes = document.querySelector('.minutes');
        if (!this.isPause) {
            this.timeInterval = setInterval(() => {
                // eslint-disable-next-line no-plusplus
                seconds.innerHTML = pad(++this.currTime % 60);
                minutes.innerHTML = pad(parseInt(this.currTime / 60, 10));
            }, 1000);
        } else {
            clearInterval(this.timeInterval);
        }
    },

    incrementMoves() {
        this.moves += 1;
        const moves = document.querySelector('.moves');
        moves.innerHTML = `<i class="material-icons">swap_horizontal_circle</i> ${this.moves}`;
    },

    addResToScore() {
        if (this.isPuzzleSolved) {
            const minutes = document.querySelector('.minutes').innerHTML;
            const seconds = document.querySelector('.seconds').innerHTML;

            const win = document.querySelector('.gem-puzzle .win');
            win.innerHTML = `<i class="material-icons close_btn">close</i><p>You solved the puzzle in ${minutes}:${seconds} and ${this.moves + 1} moves</p>
            <p>The word is <span class="highlight">${SECRET_WORD}</span>!</p>`;

            const closeBtn = document.querySelector('.close_btn');
            closeBtn.addEventListener('click', () => {
                win.classList.toggle('visible');
            });

            win.classList.toggle('visible');

            setTimeout(() => {
                picture.classList.add('dropped');
            }, 3000);
        }
    },

    moveSound() {
        const sound = new Audio(movesound);
        playAudio(sound);
    },

    handleClick(e) {
        for (let i = 0; i < this.arr.length; i += 1) {
            if (this.arr[i].indexOf(e.target.innerHTML) !== -1) {
                const j = this.arr[i].indexOf(e.target.innerHTML);
                // i j - the position of the clicked element
                swap.checkNextEl.call(this, i, j, e.target);
                break;
            }
        }
    },
};
