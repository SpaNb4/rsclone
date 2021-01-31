// @ts-ignore
import { playAudio, getRandomInt } from './utils';
// @ts-ignore
import { GameTimer } from './timer';
// @ts-ignore
import { createTimerView } from './timer_view';
// @ts-ignore
import { getRoomState } from './room_state';
// @ts-ignore
import { definitionCodeWord } from './game-over'
// @ts-ignore
import { setHiddenWordVisibility } from './room';

import C from './../../assets/audio/notes/C.mp3';
import Db from './../../assets/audio/notes/Db.mp3';
import D from './../../assets/audio/notes/D.mp3';
import Eb from './../../assets/audio/notes/Eb.mp3';
import E from './../../assets/audio/notes/E.mp3';
import F from './../../assets/audio/notes/F.mp3';
import Gb from './../../assets/audio/notes/Gb.mp3';
import G from './../../assets/audio/notes/G.mp3';
import Ab from './../../assets/audio/notes/Ab.mp3';
import A from './../../assets/audio/notes/A.mp3';
import Bb from './../../assets/audio/notes/Bb.mp3';
import B from './../../assets/audio/notes/B.mp3';

const notes = [
    { src: C, name: 'C' },
    { src: Db, name: 'Db' },
    { src: D, name: 'D' },
    { src: Eb, name: 'Eb' },
    { src: E, name: 'E' },
    { src: F, name: 'F' },
    { src: Gb, name: 'Gb' },
    { src: G, name: 'G' },
    { src: Ab, name: 'Ab' },
    { src: A, name: 'A' },
    { src: Bb, name: 'Bb' },
    { src: B, name: 'B' },
];

const ROUND_NUMBER: number = 3;
const CLASS: string = 'simon-game__key';
const STAR_ELEMENT = '<i class="material-icons">star</i>';

const gameName = 'simon';
const piano: HTMLElement = document.querySelector('#simon-game-piano');
const buttonStart: HTMLElement = document.querySelector('#simon-game-start');
const score: HTMLElement = document.querySelector('#simon-game-score');
const message: HTMLElement = document.querySelector('#simon-game-message');
const timerContainer: HTMLElement = document.querySelector(`#timer-${gameName}`);
const stateTimer = new GameTimer(gameName, getRoomState());
const secretWord = definitionCodeWord();

interface IGameState {
    keys: Array<HTMLElement>;
    pianoSteps: Array<HTMLElement>;
    userSteps: Array<HTMLElement>;
    pressed: HTMLElement;
    count: number;
}

const game: IGameState = {
    keys: [],
    pianoSteps: [],
    userSteps: [],
    pressed: null,
    count: 0,
};

const audios: Array<HTMLAudioElement> = notes.map((note) => new Audio(note.src));

const createNoteElement = (index: number): HTMLElement => {
    const key: HTMLElement = document.createElement('a');
    key.setAttribute('href', '#');
    key.className = notes[index].name.length === 2 ? `${CLASS}--black` : `${CLASS}--white`;
    key.classList.add(CLASS);
    key.dataset.note = notes[index].name;
    key.dataset.index = String(index);
    game.keys.push(key);

    return key;
};

const createNotes = (): void => {
    game.keys = [];
    piano.innerHTML = '';
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < notes.length; i += 1) {
        fragment.appendChild(createNoteElement(i));
    }
    piano.appendChild(fragment);
};

const playNote = (key: HTMLElement): void => {
    const audio: HTMLAudioElement = audios[Number(key.dataset.index)];

    playAudio(audio);
    key.classList.add('active');

    audio.addEventListener('ended', () => {
        key.classList.remove('active');
    });
};

const createNextStep = (): void => {
    let key: HTMLElement = game.keys[getRandomInt(notes.length)];
    game.pianoSteps.push(key);

    setStepGoing();
    playNote(key);
};

const showNextSteps = (): void => {
    let promise = new Promise(function (resolve) {
        let iterations: number = 0;

        const interval: NodeJS.Timeout = setInterval(() => {
            iterations += 1;
            createNextStep();
            if (iterations > game.count) {
                clearInterval(interval);
                game.count += 1;
                resolve(game.count);
            }
        }, 1000);
    });

    promise.then(() => {
        setTimeout(setStepFinished, 1000);
    });
};

const isStepsCorrect = (): boolean => {
    return game.userSteps.length === game.pianoSteps.length && game.userSteps.every((v, i) => v === game.pianoSteps[i]);
};

const resetSteps = (): void => {
    game.pianoSteps = [];
    game.userSteps = [];
};

const setInitState = () => {
    game.count = 0;
    message.innerHTML = '<p>Press The Clef</p>';
    score.innerHTML = '';
    buttonStart.classList.remove('disabled');
    buttonStart.focus();
    piano.classList.add('disabled');
    piano.classList.remove('won');

    //  timer
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimer);
    stateTimer.gameOpened();
    setHiddenWordVisibility(getRoomState().isGameFinished(gameName), secretWord, gameName);
};

const setStartedState = () => {
    message.textContent = '...';
    buttonStart.classList.add('disabled');
};

const setFinishedState = () => {
    message.innerHTML = '<p><span>Congrats!</p>';
    buttonStart.classList.add('disabled');
    piano.classList.add('disabled');
    piano.classList.add('won');

    //  timer
    stateTimer.gameFinished();
    setHiddenWordVisibility(true, secretWord, gameName);
};

const setStepGoing = () => {
    message.textContent = '...';
    piano.classList.add('disabled');
    allElementsBlur();
};

const setWrongSteps = () => {
    message.innerHTML = '<span>Error! Try again</span>';
};

const setStepFinished = () => {
    game.pressed.focus();
    message.innerHTML = '<p>Repeat after piano</p>';
    piano.classList.remove('disabled');
};

const createGame = (): void => {
    createNotes();
    setInitState();
};

const startGame = (): void => {
    game.pressed = game.keys[0];
    showNextSteps();
    setStartedState();
};

const resetGame = (): void => {
    resetSteps();
    setInitState();
    buttonStart.classList.remove('disabled');
};

const allElementsBlur = (): void => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
};

const onPianoClick = (evt: MouseEvent): void => {
    let target: HTMLElement;

    if (evt.target instanceof HTMLElement) {
        target = evt.target;
    }

    game.pressed = target;
    game.userSteps.push(target);
    playNote(target);

    if (game.userSteps.length === game.pianoSteps.length) {
        if (isStepsCorrect()) {
            score.innerHTML += STAR_ELEMENT;
            resetSteps();

            // if game over
            if (game.count >= ROUND_NUMBER) {
                setTimeout(setFinishedState, 1000);
            } else {
                showNextSteps();
            }
        } else {
            setWrongSteps();
            setTimeout(resetGame, 2000);
        }
    }
};

const onPianoKeyPress = (evt: KeyboardEvent): void => {
    let index: number;

    if (document.activeElement instanceof HTMLElement) {
        index = Number(document.activeElement.dataset.index);
    }

    if ((evt.code == 'ArrowLeft' || evt.code == 'KeyA') && index > 0) {
        index -= 1;
        game.keys[index].focus();
    }

    if ((evt.code === 'ArrowRight' || evt.code === 'KeyD') && index < notes.length - 1) {
        index += 1;
        game.keys[index].focus();
    }
};

buttonStart.addEventListener('click', startGame);
buttonStart.addEventListener('keydown', (evt: KeyboardEvent): void => {
    evt.preventDefault();
    if (evt.key === 'Enter') startGame();
});

piano.addEventListener('click', onPianoClick);
piano.addEventListener('keydown', onPianoKeyPress);

const simonGame = {
    create: createGame,
    reset: resetGame,
    button: buttonStart,
};

export { simonGame };
