import { state } from './state';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function doubleArray(array) {
    return Array(2).fill(array).flat();
}

function checkSymbol(keyword, userLetter, partGuessWord) {
    let isCorrectLetter;
    userLetter = userLetter.toUpperCase();
    keyword.forEach((item, index) => {
        if (item.toUpperCase() === userLetter) {
            isCorrectLetter = true;
            partGuessWord[index] = `${userLetter} `;
        }
    });
    return isCorrectLetter;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getWinCombination() {
    const winArr = [];
    const size = 16;
    const sqrtSize = Math.sqrt(size);
    let q = 0;
    for (let i = 0; i < sqrtSize; i += 1) {
        winArr[i] = [];
        for (let j = 0; j < sqrtSize; j += 1) {
            winArr[i][j] = (q + 1).toString();
            if (q === size - 1) {
                winArr[i][j] = '';
            }
            q += 1;
        }
    }
    return winArr;
}

function playAudio(audio) {
    if (!state.sound) audio.volume = 0;
    audio.play();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    shuffleArray, doubleArray, checkSymbol,
    getRandomInt, getWinCombination, getRandomIntInclusive,
    playAudio
};
