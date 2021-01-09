const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const doubleArray = (array) => {
    return Array(2).fill(array).flat();
};

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

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export { shuffleArray, doubleArray, checkSymbol, getRandomInt };
