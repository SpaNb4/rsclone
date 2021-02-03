/* eslint-disable no-param-reassign */
import { state } from './state.ts';

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
    audio.volume = state.volume;
    audio.currentTime = 0;
    audio.play();
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isIntInclude(int, width, min, max) {
    return (int > min && int < max) || (int + width > min && int + width < max);
}

function isOnElement(elem, pointer) {
    if (isIntInclude(pointer.x, pointer.width, elem.minX, elem.maxX) && isIntInclude(pointer.y, pointer.height, elem.minY, elem.maxY)) {
        state.callback = elem.callback;
        if (/^lock/.test(elem.class)) {
            state.selector = `.${elem.class}`;
        } else if (elem.callback.name === 'swingPicture') {
            state.selector = `#${elem.id}`;
        }
        return true;
    }
    state.callback = null;
    return false;
}

function getCoordsArray(array) {
    return array.map((elem) => ({
        id: elem[0].id,
        class: elem[0].className,
        minX: elem[0].getBoundingClientRect().left,
        maxX: elem[0].getBoundingClientRect().left + elem[0].offsetWidth,
        minY: elem[0].getBoundingClientRect().top,
        maxY: elem[0].getBoundingClientRect().top + elem[0].offsetHeight,
        callback: elem[1],
    }));
}

function getRandomElement(array) {
    return array[getRandomInt(array.length)];
}

function addClickListeners(array) {
    array.forEach((elem) => {
        elem[0].addEventListener('click', elem[1]);
    });
}

function removeAllElements(array) {
    while (array.length > 0) {
        array.pop();
    }
}

export {
    shuffleArray,
    doubleArray,
    checkSymbol,
    getRandomInt,
    getWinCombination,
    getRandomIntInclusive,
    playAudio,
    isOnElement,
    getCoordsArray,
    getRandomElement,
    isIntInclude,
    addClickListeners,
    removeAllElements,
};
