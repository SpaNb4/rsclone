import { ICatSound } from './../interfaces';
// @ts-ignore
import { getRoomState } from './room_state';
// @ts-ignore
import { secretWord as memorySecretWord } from './memory';
import { secretWord as simonSecretWord } from './simon';
import { secretWord as hangmanSecretWord } from './hangman';
import { secretWord as guessSecretWord } from './guessanumber';
// @ts-ignore
import { secretWordTetris } from './tetrisGame';
// @ts-ignore
import { secretWordTicTacToe } from './tic-tac-toe';
// @ts-ignore
import { secretWord as gemSecretWord } from './gem_puzzle';
// @ts-ignore
import { secretWord as snakeSecretWord } from './snake';

const list: HTMLUListElement = document.querySelector('#dropdown');

const words: ICatSound[] = [
  { 'memory': memorySecretWord },
  { 'simon': simonSecretWord },
  { 'hangman': hangmanSecretWord },
  { 'gem_puzzle': gemSecretWord },
  { 'tetris': secretWordTetris },
  { 'tic_tac_toe': secretWordTicTacToe },
  { 'snake': snakeSecretWord },
  { 'guess_a_number': guessSecretWord },
];

export function createWordList() {
  list.innerHTML = '';

  words.forEach((word) => {
    if (getRoomState(...Object.keys(word)).isGameFinished(...Object.keys(word))) {
      const li = document.createElement('li');
      li.textContent = Object.values(word).toString();
      list.append(li);
    }
  });
}