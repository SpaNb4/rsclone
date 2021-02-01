import { getRoomState } from './room_state';

export const restartGame = () => {
    const arrNameGames = ['memory', 'simon', 'tetris', 'tic_tac_toe', 'hangman', 'gem_puzzle', 'snake', 'guess_a_number'];
  
    arrNameGames.forEach((elem) => {
        getRoomState().deleteTime(elem);
    });
}