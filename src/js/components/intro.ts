/* eslint-disable import/no-unresolved */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-use-before-define */
// @ts-ignore
import { getRandomIntInclusive } from './utils';
// @ts-ignore
import { restartGame } from './restart';
// eslint-disable-next-line import/extensions
import { state } from './state';
import { IStar } from './../interfaces';

const DISABLED: string = 'disabled';
const STAR_NUMBER: number = 120;
const VELOCITY: number = 0.15;
const PADDING: number = 10;
const startButton: HTMLElement = document.querySelector('#intro-start-button');
const continueButton: HTMLElement = document.querySelector('#intro-continue-button');
export const playAgainButton: HTMLElement = document.querySelector('#intro-play-again-button');
const content1: HTMLElement = document.querySelector('#intro-content-1');
const content2: HTMLElement = document.querySelector('#intro-content-2');
const content3: HTMLElement = document.querySelector('#intro-content-3');
const canvas: HTMLCanvasElement = document.querySelector('#intro-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars: Array<IStar> = [];

class Star implements IStar {
    x: number;
    y: number;
    index: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, index: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.index = index;
        this.color = `rgba(216, 201, 155, ${getRandomIntInclusive(3, 10) / 10})`;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.radius * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.y -= VELOCITY;

        if (this.y < -PADDING) {
            this.y = canvas.height + PADDING;
        }

        this.draw();
    }
}

function animate(): void {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((round) => round.update());
}

const skipIntroOne = () => {
    content1.classList.add(DISABLED);
    content2.classList.remove(DISABLED);

    continueButton.focus();
};

const skipIntroTwo = () => {
    content2.classList.add(DISABLED);
    content1.parentElement.classList.add(DISABLED);
};

const openFinalIntro = () => {
    content3.classList.remove('disabled');
    content3.parentElement.classList.remove('disabled');
    playAgainButton.focus();
};

const refreshCacheAndReload = () => {
    if (caches) {
        caches.keys().then(async (names) => {
            await Promise.all(names.map(name => caches.delete(name)))
        })
    }
    window.location.reload();
}

const playAgain = () => {
    refreshCacheAndReload();

    localStorage.setItem('maneki', '');
    localStorage.setItem('paper', '');
    document.removeEventListener('keydown', onOpenedDoorEnterPress);
    document.removeEventListener('keydown', onFinalIntroEnterpress);
    restartGame();
};

const onOpenedDoorEnterPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' && state.keyboard && state.locksOpen) {
        openFinalIntro();

        document.addEventListener('keydown', onFinalIntroEnterpress);
    }
};

const onFinalIntroEnterpress = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter' && state.keyboard && state.locksOpen) {
        playAgain();
    }
};

// eslint-disable-next-line import/prefer-default-export
const introInit = (): void => {
    startButton.focus();

    startButton.addEventListener('click', skipIntroOne);
    continueButton.addEventListener('click', skipIntroTwo);
    playAgainButton.addEventListener('click', playAgain);

    startButton.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') skipIntroOne();
    });

    continueButton.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter') skipIntroTwo();
    });

    document.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener('keydown', onOpenedDoorEnterPress);

    for (let i = 0; i < STAR_NUMBER; i += 1) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, i));
    }

    animate();
}

export { openFinalIntro, introInit };