const volumeRange: HTMLInputElement = document.querySelector('#volume-range');
const keyboardSwitch: HTMLInputElement = document.querySelector('#keyboard-switch');

interface Istate {
    volume: number;
    isMiniGameOpened: boolean;
    keyboard: boolean;
    paused: boolean;
    selector: string;
    locksOpen: boolean;
    callback: (x: string | null) => void;
}

function getVolume(): number {
    if (volumeRange) {
        return Number(volumeRange.value) / 100;
    }
    return 0;
}

function getKeyboardValue(): boolean {
    if (keyboardSwitch) {
        return keyboardSwitch.checked;
    }
    return false;
}

const state: Istate = {
    volume: getVolume(),
    isMiniGameOpened: false,
    keyboard: getKeyboardValue(),
    paused: false,
    locksOpen: false,
    selector: '',
    callback: null,
};

export { state, volumeRange, keyboardSwitch };
