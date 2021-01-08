import C from './../../assets/audio/notes/C.mp3';
import Db from './../../assets/audio/notes/Db.mp3';
import D from './../../assets/audio/notes/D.mp3';
import Eb from './../../assets/audio/notes/Eb.mp3';
import E from './../../assets/audio/notes/E.mp3';
import F from './../../assets/audio/notes/F.mp3';
import Gb from './../../assets/audio/notes/Gb.mp3';
import G from './../../assets/audio/notes/G.mp3';
import Ab from './../../assets/audio/notes/Ab.mp3';
import A from './../../assets/audio/notes/A.mp3';
import Bb from './../../assets/audio/notes/Bb.mp3';
import B from './../../assets/audio/notes/B.mp3';

// @ts-ignore
import { getRandomInt } from './../../js/components/utils';

const CODE: string = '280';

const piano: HTMLElement = document.querySelector('#simon-game-piano');
const buttonStart: HTMLElement = document.querySelector('#simon-game-start');
const result: HTMLElement = document.querySelector('#simon-game-result');

const audios: Array<HTMLAudioElement> = [];
const gameSteps: Array<HTMLElement> = [];
const userSteps: Array<HTMLElement> = [];
const keys: Array<HTMLElement>  = [];

let count: number = 0;
let activeKey: HTMLElement | null = null;
let isStepFinished = true;

const notes = [
  { src: C, name: 'C' },
  { src: Db, name: 'Db' },
  { src: D, name: 'D' },
  { src: Eb, name: 'Eb' },
  { src: E, name: 'E' },
  { src: F, name: 'F' },
  { src: Gb, name: 'Gb' },
  { src: G, name: 'G' },
  { src: Ab, name: 'Ab' },
  { src: A, name: 'A' },
  { src: Bb, name: 'Bb' },
  { src: B, name: 'B' },
]

notes.map((note) => audios.push(new Audio(note.src)));

const createNoteElement = (index: number): HTMLElement => {
  const key: HTMLElement = document.createElement('a');
  key.setAttribute('href', '#');
  key.className = notes[index].name.length === 2 ? 'black' : 'white';
  key.classList.add('simon-game__key');
  key.dataset.note = notes[index].name;
  key.dataset.index = String(index);
  keys.push(key);

  return key;
}

const createNotes = (): void => {
  piano.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < notes.length; i += 1) {
    fragment.appendChild(createNoteElement(i));
  }

  piano.appendChild(fragment);
  piano.classList.add('disabled');
}

const playSound = (key: any): void => {
  const audio: HTMLAudioElement = audios[Number(key.dataset.index)];
  audio.currentTime = 0;
  audio.play();

  if (activeKey) activeKey.blur();
  key.classList.add('active');

  audio.addEventListener('ended', () => {
    key.classList.remove('active');
    if (activeKey && isStepFinished) activeKey.focus();
  });
}

const showNextStep = (): void => {
  let key: any = piano.children[getRandomInt(notes.length)];
  gameSteps.push(key);
  playSound(key);
}

const checkSteps = (): boolean => {
  return userSteps.length === gameSteps.length && userSteps.every((v, i) => v === gameSteps[i]);
}

const resetSteps = (array: Array<any>): void => {
  while (array.length > 0) array.pop();
}

const startGame = (): void => {
  resetGame();
  showNextStep();

  activeKey = keys[0]; // active is a firts key

  buttonStart.classList.add('disabled');
  piano.classList.remove('disabled');
}

const resetGame = (): void => {
  count = 0;
  activeKey = null;
  buttonStart.focus();
  resetSteps(gameSteps);
  resetSteps(userSteps);
  result.textContent = '';
  buttonStart.classList.remove('disabled');
}

const allElementsBlur = (): void => {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}

const onPianoClick = (evt: MouseEvent): void => {
  const target: any = evt.target;
  activeKey = target;
  playSound(target);
  userSteps.push(target);

  if (userSteps.length < gameSteps.length) return; // too many or too little steps

  if (checkSteps()) {
    result.textContent += CODE[count]; // from 0

    // WON GAME
    if (count + 1 >= CODE.length) {
      piano.classList.add('won');
      result.classList.add('disabled');
      allElementsBlur();
      return; // game end
    };

    piano.classList.add('disabled');

    //  play next steps
    let iterations: number = 0;
    const interval: NodeJS.Timeout = setInterval(() => {
      isStepFinished = false;
      allElementsBlur();

      iterations += 1;
      showNextStep();
      if (iterations > count) {
        piano.classList.remove('disabled');

        isStepFinished = true;

        setTimeout(() => activeKey.focus(), 1000);
        clearInterval(interval);
      }
    }, 1000);

    count += 1;
  } else {
    resetGame();
  }
}

const onPianoKeyPress = (evt: KeyboardEvent): void => {
  let index: number;

  if (document.activeElement instanceof HTMLElement) {
    index = Number(document.activeElement.dataset.index);
  }

  if((evt.key == 'ArrowLeft' || evt.key == 'a') && index > 0) {
    index -= 1;
    keys[index].focus();
  }

  if((evt.key === 'ArrowRight' || evt.key === 'd') && index < notes.length - 1) {
    index += 1;
    keys[index].focus();
  }
}

buttonStart.addEventListener('click', startGame);

buttonStart.addEventListener('keydown', (evt: KeyboardEvent): void => {
  evt.preventDefault();
  if (evt.key === 'Enter') startGame();
});

piano.addEventListener('click', onPianoClick);
piano.addEventListener('keydown', onPianoKeyPress);

const simonGame = {
  create: createNotes,
  reset: resetGame,
  button: buttonStart
}

export { simonGame };
