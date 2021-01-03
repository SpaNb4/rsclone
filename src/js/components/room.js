import lockedDoorSound from './../../assets/audio/locked-door.wav';

const knob = document.querySelector('#knob');
const audio = new Audio(lockedDoorSound);

const onKnobClick = () => {
    knob.classList.remove('rotate');
    void knob.offsetWidth;
    knob.classList.add('rotate');
    audio.play();
}

knob.addEventListener('click', onKnobClick);
