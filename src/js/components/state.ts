const volumeRange: HTMLInputElement = document.querySelector('#volume-range');
const keyboardSwitch: HTMLInputElement = document.querySelector('#keyboard-switch');

interface Istate {
  volume: number;
  memory: boolean;
  simon: boolean;
  isMiniGameOpened: boolean;
  keyboard: boolean;
  paused: boolean;
  callback: () => void;
}

const state: Istate = {
  volume: Number(volumeRange.value) / 100,
  memory: true,
  simon: true,
  isMiniGameOpened: false,
  keyboard: keyboardSwitch.checked,
  paused: false,
  callback: null
};

export { state, volumeRange, keyboardSwitch };
