export interface ICatSound {
    [key: string]: HTMLAudioElement;
}

export interface IFakeOnbjects {
    [0]: HTMLElement;
    [1]: () => void;
}

export interface IStar {
    draw: () => void;
    update: () => void;
}

export interface Istate {
    volume: number;
    isMiniGameOpened: boolean;
    keyboard: boolean;
    paused: boolean;
    selector: string;
    locksOpen: boolean;
    coords: [];
    callback: (x: string | null) => void;
}

export interface IGameState {
    keys: Array<HTMLElement>;
    pianoSteps: Array<HTMLElement>;
    userSteps: Array<HTMLElement>;
    pressed: HTMLElement;
    count: number;
}