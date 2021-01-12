import { state } from './state';

const V_ON = 'volume_up';
const V_OFF = 'volume_off';

const volumeToggle = document.querySelector('#menu-volume-toggle');
const restartButton = document.querySelector('#menu-restart-button');

function onVolumeClick(evt) {
  state.sound = !state.sound;

  if (evt.currentTarget.dataset.sound === 'on') {
    evt.currentTarget.dataset.sound = 'off';
    evt.currentTarget.querySelector('i').textContent = V_OFF;
  } else {
    evt.currentTarget.dataset.sound = 'on';
    evt.currentTarget.querySelector('i').textContent = V_ON;

  }
}

function onRestartClick() {
  state.memory = true; // restart memory
  state.simon = true; // restart memory
}

function navInit() {
  M.Sidenav.init(document.querySelectorAll('.sidenav'), { edge: 'right' });
  M.Modal.init(document.querySelectorAll('.modal'), {});

  volumeToggle.addEventListener('click', onVolumeClick);
  restartButton.addEventListener('click', onRestartClick);
}

function headerInit() {
  navInit();
}

document.addEventListener('DOMContentLoaded', headerInit);