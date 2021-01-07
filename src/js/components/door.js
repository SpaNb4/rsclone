import lockedDoorSound from './../../assets/audio/locked-door.mp3';

const ROTATE = 'rotate';
const knob = document.querySelector('#knob');
const audio = new Audio(lockedDoorSound);

const onKnobClick = () => {
    knob.classList.remove(ROTATE);
    void knob.offsetWidth;
    knob.classList.add(ROTATE);
    audio.play();
}

knob.addEventListener('click', onKnobClick);