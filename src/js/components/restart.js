import { getRoomState } from './room_state';
import { playAgainButton } from './intro';

const restartGame = () => {
    const arrNameGames = ['memory', 'simon', 'tetris', 'tic_tac_toe', 'hangman', 'gem_puzzle', 'snake', 'guess_a_number'];
  
    arrNameGames.forEach((elem) => {
        getRoomState().deleteTime(elem);
    });
}

playAgainButton.addEventListener('click', restartGame);