import { getWinCombination } from './utils';

export function rowPos(target, gem) {
    let rowPosition;

    const size = Math.sqrt(gem.size);
    if (target.style.order % size === 0) {
        rowPosition = Math.floor(target.style.order / size) - 1;
    } else {
        rowPosition = Math.floor(target.style.order / size);
    }
    return rowPosition;
}

export function colPos(target, gem) {
    let colPosition;

    const size = Math.sqrt(gem.size);
    if (target.style.order % size === 0) {
        colPosition = size;
    } else {
        colPosition = target.style.order % size;
    }
    return colPosition - 1;
}

export function swapCell(target, _i, _j) {
    const trg = target;

    const posEmptyEl = this.size - 1;

    const temp = trg.style.order;
    trg.style.order = this.cols[posEmptyEl].style.order;
    this.cols[posEmptyEl].style.order = temp;

    this.arr[rowPos(this.cols[posEmptyEl], this)][colPos(this.cols[posEmptyEl], this)] = '';

    this.arr[rowPos(target, this)][colPos(target, this)] = target.innerHTML;

    if (this.movesArr.length === 0) {
        this.movesArr.push([Math.sqrt(this.size) - 1, Math.sqrt(this.size) - 1]);
    }
    if (target.innerHTML !== '') {
        this.movesArr.push([_i, _j]);
    }
}

export function checkWin(isRandom) {
    // winning combination
    const winArr = getWinCombination();

    this.isPuzzleSolved = true;
    for (let i = 0; i < this.arr.length; i += 1) {
        for (let j = 0; j < this.arr.length; j += 1) {
            if (this.arr[i][j] !== winArr[i][j]) {
                this.isPuzzleSolved = false;
            }
        }
    }

    if (this.isPuzzleSolved === true && !isRandom) {
        this.addResToScore();
    }
}

function swap(obj, target, i, j, isRandom) {
    swapCell.call(obj, target, i, j);
    checkWin.call(obj, isRandom);
    if (!isRandom) {
        obj.incrementMoves();
        obj.moveSound();
    }
}

export function checkNextEl(i, j, target, isRandom) {
    if (i !== this.arr.length - 1 && this.arr[i + 1][j] === '') {
        swap(this, target, i, j, isRandom);
    } else if (this.arr[i][j + 1] === '') {
        swap(this, target, i, j, isRandom);
    } else if (this.arr[i][j - 1] === '') {
        swap(this, target, i, j, isRandom);
    } else if (i !== 0 && this.arr[i - 1][j] === '') {
        swap(this, target, i, j, isRandom);
    }
}
