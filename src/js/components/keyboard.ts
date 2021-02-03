/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line max-classes-per-file
// @ts-ignore
import iconPointer from '../../assets/icons/lens.png';
// eslint-disable-next-line import/extensions
import { state } from './state';
// @ts-ignore
import { isOnElement } from './utils';
// @ts-ignore
import { getClickableCoords } from './room';

const DIFF = 2;
const content: HTMLElement = document.querySelector('#game-content');
const imagePointer: HTMLImageElement = new Image();
imagePointer.src = iconPointer;

class GameArea {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    key: string | boolean;
    container: number;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.key = false;
        this.container = document.querySelector('.wall__container').clientWidth;
    }

    draw() {
        this.canvas.setAttribute('id', 'game-content-canvas');
        this.canvas.className = 'content__canvas';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.height = window.innerHeight;
        content.prepend(this.canvas);

        document.addEventListener('keydown', (evt) => {
            if (!state.isMiniGameOpened && !state.paused && state.keyboard) {
                this.key = evt.code;

                if (evt.key === 'Enter' && pointer.onElement && !state.locksOpen) {
                    state.callback(state.selector);
                }
            }
        });

        document.addEventListener('keyup', () => {
            if (!state.isMiniGameOpened && !state.paused) this.key = false;
        });

        this.switch();
    }

    switch() {
        state.coords = getClickableCoords();
        if (state.keyboard) {
            this.canvas.classList.add('active');
            content.dataset.keyboard = 'off';
        } else {
            this.canvas.classList.remove('active');
            content.dataset.keyboard = 'on';
        }

        if (!state.isMiniGameOpened && state.keyboard) {
            animate();
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// eslint-disable-next-line import/prefer-default-export
export const gamearea = new GameArea();

class Pointer {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    onElement: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = 36;
        this.onElement = false;
    }

    draw() {
        gamearea.ctx.drawImage(imagePointer, this.x, this.y, this.size, this.size);
    }

    update() {
        this.dx = 0;
        this.dy = 0;

        switch (gamearea.key) {
            case 'KeyA':
                if (this.x > 0) {
                    this.dx = -DIFF;
                }
                break;
            case 'KeyD':
                if (this.x + this.size < gamearea.canvas.width) {
                    this.dx = DIFF;
                }
                break;
            case 'KeyW':
                if (this.y > 0) {
                    this.dy = -DIFF;
                }
                break;
            case 'KeyS':
                if (this.y + this.size < gamearea.canvas.height) {
                    this.dy = DIFF;
                }
                break;
            default:
                break;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.onElement = state.coords.some((elem: any) => isOnElement(elem, this));

        this.draw();
    }
}

const pointer = new Pointer(300, 300);

function animate() {
    requestAnimationFrame(animate);

    gamearea.clear();
    pointer.update();
}

window.addEventListener('resize', () => {
    gamearea.canvas.width = window.innerWidth;
    gamearea.canvas.height = window.innerHeight;
    gamearea.container = document.querySelector('.wall__container').clientWidth;
    state.coords = getClickableCoords();
});

imagePointer.addEventListener('load', () => {
    gamearea.draw();
});
