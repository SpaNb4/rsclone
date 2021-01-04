import iconBank from './../../assets/icons/bank.svg';
import iconCards from './../../assets/icons/cards.svg';
import iconCigar from './../../assets/icons/cigar.svg';
import iconCoins from './../../assets/icons/coins.svg';
import iconGuns from './../../assets/icons/guns.svg';
import iconHat from './../../assets/icons/hat.svg';
import iconMoney from './../../assets/icons/money.svg';
import iconWhisky from './../../assets/icons/whisky.svg';
import matchSound from './../../assets/audio/match.wav';
import zombieSound from './../../assets/audio/zombie.wav';

const OPENED = 'opened';
const DISABLED = 'disabled';
const WON = 'won';
const audioMatch = new Audio(matchSound);
const audioZombie = new Audio(zombieSound);
const openCards = [];
let count = 0;

// utils:
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const createArray = (array) => {
  return shuffleArray(Array(2).fill(array).flat());
}
//

const PICS_ARR = [
  {
    src: iconBank,
    alt: 'bank'
  },
  {
    src: iconCards,
    alt: 'cards'
  },
  {
    src: iconCigar,
    alt: 'cigar'
  },
  {
    src: iconCoins,
    alt: 'coins'
  },
  {
    src: iconGuns,
    alt: 'guns'
  },
  {
    src: iconHat,
    alt: 'hat'
  },
  {
    src: iconMoney,
    alt: 'money'
  },
  {
    src: iconWhisky,
    alt: 'whisky'
  },
];

const memoryGrid = document.querySelector('#memory-game-grid');
const cardsPicsArray = createArray(PICS_ARR);

const createCard = (index) => {
  const card = document.createElement('div');
  card.dataset.index = index;
  card.dataset.name = cardsPicsArray[index].alt;
  card.className = 'memory-game__card flip-card';
  card.innerHTML = `
    <a href="#" class="flip-card__inner">
      <div class="flip-card__front"></div>
      <div class="flip-card__back">
        <img src="${cardsPicsArray[index].src}" alt="card-${cardsPicsArray[index].alt}" width="100" height="100">
      </div>
    </a>`;
  return card;
}

const createGrid = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cardsPicsArray.length; i += 1) {
    fragment.appendChild(createCard(i));
  }

  memoryGrid.appendChild(fragment);
}

//  remove open cards from array:
const removeOpencards = () => {
  while (openCards.length > 0) {
    openCards.pop();
  }
}

//
const addClasses = (elem, className) => {
  elem.classList.add(className);
}

const removeClasses = (elem, className) => {
  elem.classList.remove(className);
}
//

const onMemoryGridClick = (evt) => {
  const card = evt.target.closest('.flip-card');

  if (evt.target === memoryGrid || openCards[0] === card) return;

  if (openCards.length === 2) {
    openCards.forEach((elem) => removeClasses(elem, OPENED));
    removeOpencards();
  }

  addClasses(card, OPENED);
  openCards.push(card);

  if (openCards.length === 2 && openCards[0].dataset.name === openCards[1].dataset.name) {
    openCards.forEach((elem) => addClasses(card, DISABLED));
    count += 2;
    removeOpencards();
    audioMatch.play();

    // check if game won?
    if (count === cardsPicsArray.length) {
      audioZombie.play();
      addClasses(memoryGrid, WON);
    }
  }
}

const resetGame = () => {
  count += 0;
  removeOpencards();
  [... memoryGrid.children].forEach((elem) => {
    removeClasses(elem, DISABLED);
    removeClasses(elem, OPENED);
  })
}

memoryGrid.addEventListener('click', onMemoryGridClick);
window.onload = createGrid();

export { resetGame };