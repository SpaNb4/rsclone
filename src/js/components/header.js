import { state } from './state';

const V_ON = 'volume_on';
const V_OFF = 'volume_off';

const volumeToggle = document.querySelector('#menu-volume-toggle');

const onVolumeClick = (evt) => {
  state.sound = !state.sound;

  if (evt.currentTarget.dataset.sound === 'true') {
    evt.currentTarget.dataset.sound = 'false';
    evt.currentTarget.querySelector('i').textContent = V_OFF;
  } else {
    evt.currentTarget.dataset.sound = 'true';
    evt.currentTarget.querySelector('i').textContent = V_ON;

  }
}

const navInit = () => {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), {edge: 'right'});

  volumeToggle.addEventListener('click', onVolumeClick);
}

const headerInit = () => {
  navInit();
}

document.addEventListener('DOMContentLoaded', headerInit);