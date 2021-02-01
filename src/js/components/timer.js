const millisecondsCoefficient = 1000;

function nowMilliseconds() {
    const date = new Date();
    return date.getTime();
}

class GameTimer {
    constructor(gameName, roomState) {
        this.roomState = roomState;
        this.gameName = gameName;
        this.finishTime = null;
        this.gameOpened();
    }

    gameOpened() {
        this.startTime = nowMilliseconds();
        this.finishTime = null;
    }

    gameFinished() {
        this.finishTime = this.getTimeDiffSeconds();
        this.roomState.saveTime(this.gameName, this.finishTime);
    }

    getTimeSeconds() {
        if (this.finishTime === null) {
            return this.getTimeDiffSeconds();
        }
        return this.finishTime;
    }

    getTimeDiffSeconds() {
        return Math.round((nowMilliseconds() - this.startTime) / millisecondsCoefficient);
    }
}

// eslint-disable-next-line import/prefer-default-export
export { GameTimer };
