const knob = document.querySelector('#knob');

const onKnobClick = () => {
    knob.classList.toggle('rotate');
}

knob.addEventListener('click', onKnobClick);
