// @ts-ignore
import { getRandomElement, playAudio } from './utils';
// @ts-ignore
import angryMeowSound from './../../assets/audio/meow-angry.mp3';
import sweetMeowSound from './../../assets/audio/meow-sweet.mp3';
import roarMeowSound from './../../assets/audio/meow-roar.mp3';
import beggingMeowSound from './../../assets/audio/meow-begging.mp3';
import laughSound from './../../assets/audio/laugh.mp3';
import brakeSound from './../../assets/audio/brake.mp3';
import lightSound from './../../assets/audio/light.mp3';
// @ts-ignore
import manekiImage from './../../assets/img/cat_broken.png';

const cat: HTMLElement = document.querySelector('#cat');
const catSays: HTMLElement = cat.querySelector('div');
const paper: HTMLElement = document.querySelector('#paper_three');
const lamp: HTMLElement = document.querySelector('#table-lamp');
const maneki: HTMLElement = document.querySelector('#maneki');

interface ICatSound {
  [key: string]: HTMLAudioElement;
}

interface IFakeOnbjects {
  [0]: HTMLElement;
  [1]: () => void;
}

const catSounds: ICatSound[] = [
  { 'meow-meow':  new Audio(angryMeowSound) },
  { 'mao': new Audio(sweetMeowSound) },
  { 'roar': new Audio(roarMeowSound) },
  { '* eat *': new Audio(beggingMeowSound) }
];

const laughAudio = new Audio(laughSound);
const lightAudio = new Audio(lightSound);
const brakeAudio = new Audio(brakeSound);

const openCatSays = (): void => {
  const meow: ICatSound = getRandomElement(catSounds);
  const audio: HTMLAudioElement = Object.values(meow)[0];
  cat.removeEventListener('click', onCatClick);
  cat.querySelector('div').style.display = 'block';
  audio.currentTime = 0;
  playAudio(audio);
  catSays.innerHTML = `<span>${String(...Object.keys(meow))}</span>`;
  audio.addEventListener('ended', () => {
    cat.querySelector('div').style.display = 'none';
    cat.addEventListener('click', onCatClick);
  })
}

const closeCatSays = (): void => {
  cat.querySelector('div').innerHTML = ``;
  document.removeEventListener('click', outCatClick);
}

const onCatClick = (): void => {
  openCatSays();
}

const outCatClick = (evt: MouseEvent): void => {
  if (evt.target !== cat) closeCatSays();
}

const onFakePaperClick = (): void => {
  const bottom: number = parseFloat(getComputedStyle(paper.parentElement).bottom);
  playAudio(laughAudio);
  paper.style.transform = `translateY(${bottom + paper.offsetWidth}px) matrix(1, 0, -0.3, 0.2, 0, 0)`;

  paper.removeEventListener('click', onFakePaperClick);
}

const onLampClick = (): void => {
  lightAudio.currentTime = 0;
  playAudio(lightAudio);

  setTimeout(() => lamp.classList.toggle('on'), 300);
}

const onManekiClick = (): void => {
  maneki.classList.add('dropped');
  setTimeout(() => {
    maneki.style.backgroundImage = `url(${manekiImage})`;
    playAudio(brakeAudio);
  }, 800);
}

const swingPicture = (id: HTMLElement): void => {
  const pic = document.querySelector(`#${id}`);
  pic.classList.remove('swung');
  playAudio(laughAudio);
  setTimeout(() => pic.classList.add('swung'), 0);
}

const fakeObjects: IFakeOnbjects[] = [
  [maneki, onManekiClick],
  [lamp, onLampClick],
  [paper, onFakePaperClick],
  [cat, onCatClick],
]

fakeObjects.forEach((elem) => {
    elem[0].addEventListener('click', elem[1])
});

export { fakeObjects, swingPicture };