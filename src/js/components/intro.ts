// @ts-ignore
import { getRandomIntInclusive } from './utils';

const DISABLED: string = 'disabled';
const STAR_NUMBER: number = 120;
const VELOCITY: number = 0.15;
const PADDING: number = 10;

const canvas: HTMLCanvasElement = document.querySelector('#intro-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const rounds: Array<IStar> = [];

interface IStar {
  x: number;
  y: number;
  index: number;
  radius: number;
  color: string;
  draw: () => void;
  update: () => void;
}

class Star {
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

  rounds.forEach((round) => round.update());
}


function init(): void {
  for (let i = 0; i < STAR_NUMBER; i += 1) {
    rounds.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, i));
  }

  animate();
}

init();

document.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//

const startButton: HTMLElement = document.querySelector('#intro-start-button');
const continueButton: HTMLElement = document.querySelector('#intro-continue-button');
const content1: HTMLElement = document.querySelector('#intro-content-1');
const content2: HTMLElement = document.querySelector('#intro-content-2');

startButton.addEventListener('click', () => {
  content1.classList.add(DISABLED);
  content2.classList.remove(DISABLED);
});

continueButton.addEventListener('click', () => {
  content2.classList.add(DISABLED);
  content1.parentElement.classList.add(DISABLED);
});
