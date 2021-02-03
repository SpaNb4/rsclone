import { getRoomState } from './room_state';

// eslint-disable-next-line import/prefer-default-export
export const restartGame = () => {
    const arrNameGames = ['memory', 'simon', 'tetris', 'tic_tac_toe', 'hangman', 'gem_puzzle', 'snake', 'guess_a_number'];

    arrNameGames.forEach((elem) => {
        getRoomState().deleteTime(elem);
    });
};
