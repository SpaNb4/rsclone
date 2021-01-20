const millisecondsCoefficient = 1000;

function nowMilliseconds() {
    const date = new Date();
    return date.getTime();
}

class Timer {
    constructor(gameName) {
        this.gameName = gameName;
        this.finishTime = null;
        this.reset();
    }

    reset() {
        this.startTime = nowMilliseconds();
        this.finishTime = null;
    }

    getTimeSeconds() {
        if (this.finishTime === null) {
            return this.getTimeDiffSeconds();
        }
        return this.finishTime;
    }

    finish() {
        this.finishTime = this.getTimeDiffSeconds();
    }

    getTimeDiffSeconds() {
        return Math.round((nowMilliseconds() - this.startTime) / millisecondsCoefficient);
    }
}

export { Timer };
