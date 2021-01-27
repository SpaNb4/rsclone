// @ts-ignore
import { playAudio } from './utils';
import lockedDoorSound from './../../assets/audio/locked-door.mp3';

const ROTATED = 'rotated';
const knob: HTMLElement = document.querySelector('#knob');
const audio = new Audio(lockedDoorSound);

const onKnobClick = () => {
    knob.classList.remove(ROTATED);
    void knob.offsetWidth;
    knob.classList.add(ROTATED);
    playAudio(audio);
}

knob.addEventListener('click', onKnobClick);