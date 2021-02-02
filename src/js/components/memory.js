/* eslint-disable import/no-cycle */
/* eslint-disable object-curly-newline */
import iconBank from '../../assets/icons/bank.svg';
import iconCards from '../../assets/icons/cards.svg';
import iconCigar from '../../assets/icons/cigar.svg';
import iconCoins from '../../assets/icons/coins.svg';
import iconGuns from '../../assets/icons/guns.svg';
import iconHat from '../../assets/icons/hat.svg';
import iconMoney from '../../assets/icons/money.svg';
import iconWhisky from '../../assets/icons/whisky.svg';
import matchSound from '../../assets/audio/memory_match.mp3';
import zombieSound from '../../assets/audio/memory_zombie.mp3';

import { shuffleArray, doubleArray, playAudio, removeAllElements } from './utils';
import { GameTimer } from './timer';
import { createTimerView } from './timer_view';
import { getRoomState } from './room_state';
import { definitionCodeWord } from './game-over';
import { setHiddenWordVisibility } from './room';

const OPENED = 'opened';
const DISABLED = 'disabled';
const WON = 'won';

const gameName = 'memory';
const memoryGrid = document.querySelector('#memory-game-grid');
const timerContainer = document.querySelector(`#timer-${gameName}`);
const stateTimer = new GameTimer(gameName, getRoomState());
const secretWord = definitionCodeWord();
const audioMatch = new Audio(matchSound);
const audioZombie = new Audio(zombieSound);
const links = [];
const openCards = [];
let count = 0;

const PICS_ARR = [
    {
        src: iconBank,
        alt: 'bank',
    },
    {
        src: iconCards,
        alt: 'cards',
    },
    {
        src: iconCigar,
        alt: 'cigar',
    },
    {
        src: iconCoins,
        alt: 'coins',
    },
    {
        src: iconGuns,
        alt: 'guns',
    },
    {
        src: iconHat,
        alt: 'hat',
    },
    {
        src: iconMoney,
        alt: 'money',
    },
    {
        src: iconWhisky,
        alt: 'whisky',
    },
];

const cardsPicsArray = shuffleArray(doubleArray(PICS_ARR));

const createCard = (index) => {
    const card = document.createElement('div');
    card.dataset.name = cardsPicsArray[index].alt;
    card.className = 'memory-game__card flip-card';
    card.innerHTML = `
    <div class="flip-card__inner">
      <a href="#" class="flip-card__front" data-index="${index}"></a>
      <div class="flip-card__back">
        <img src="${cardsPicsArray[index].src}" alt="card-${cardsPicsArray[index].alt}">
      </div>
    </div>`;

    links.push(card.querySelector('a'));

    return card;
};

const createGrid = () => {
    memoryGrid.classList.remove(WON);
    memoryGrid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardsPicsArray.length; i += 1) {
        fragment.appendChild(createCard(i));
    }

    memoryGrid.appendChild(fragment);

    //  timer
    timerContainer.innerHTML = '';
    createTimerView(timerContainer, stateTimer);
    stateTimer.gameOpened();
    setHiddenWordVisibility(getRoomState().isGameFinished(gameName), secretWord, gameName);
};

const onMemoryGridClick = (evt) => {
    const card = evt.target.closest('.flip-card');

    if (evt.target === memoryGrid) return;

    if (openCards.length === 2) {
        openCards.forEach((elem) => elem.classList.remove(OPENED));
        removeAllElements(openCards);
    }

    if (openCards.includes(card)) {
        removeAllElements(openCards);
    }

    card.classList.add(OPENED);
    card.focus();
    openCards.push(card);

    if (openCards.length === 2 && openCards[0].dataset.name === openCards[1].dataset.name) {
        openCards.forEach((elem) => elem.classList.add(DISABLED));
        count += 1;
        removeAllElements(openCards);
        playAudio(audioMatch);

        // check if game won?
        if (count === PICS_ARR.length) {
            playAudio(audioZombie);
            memoryGrid.classList.add(WON);

            //  timer
            stateTimer.gameFinished();
            setHiddenWordVisibility(true, secretWord, gameName);
        }
    }
};

const resetGame = () => {
    shuffleArray(cardsPicsArray);
    count = 0;
    removeAllElements(links);
    removeAllElements(openCards);
    [...memoryGrid.children].forEach((elem) => {
        elem.classList.remove(DISABLED);
        elem.classList.remove(OPENED);
    });
};

const onMemoryKeyPress = (evt) => {
    let index = Number(document.activeElement.dataset.index);

    if ((evt.keyCode === 37 || evt.keyCode === 65) && index % 4) {
        //  left
        index -= 1;
        links[index].focus();
    }

    if ((evt.keyCode === 38 || evt.keyCode === 87) && index > cardsPicsArray.length / 4 - 1) {
        //  up
        index -= 4;
        links[index].focus();
    }

    if ((evt.keyCode === 39 || evt.keyCode === 68) && (index + 1) % 4) {
        //  right
        index += 1;
        links[index].focus();
    }

    if ((evt.keyCode === 40 || evt.keyCode === 83) && index < (cardsPicsArray.length * 3) / 4) {
        // down
        index += 4;
        links[index].focus();
    }
};

memoryGrid.addEventListener('click', onMemoryGridClick);
memoryGrid.addEventListener('keydown', onMemoryKeyPress);

const memoryGame = {
    reset: resetGame,
    create: createGrid,
    links,
};

// eslint-disable-next-line import/prefer-default-export
export { memoryGame, secretWord };
