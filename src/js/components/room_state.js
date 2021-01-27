function buildStorageKey(email) {
    return `states_${email}`;
}

function storeStates(email, states) {
    localStorage.setItem(buildStorageKey(email), JSON.stringify(states));
}

function loadStates(email) {
    const states = JSON.parse(localStorage.getItem(
        buildStorageKey(email),
    ));
    if (states === null) {
        return {};
    }
    return states;
}
class RoomState {
    constructor() {
        this.states = {};
        this.userEmail = null;
    }

    setUser(email) {
        this.states = {};
        this.userEmail = email;
        if (this.userEmail !== null) {
            this.states = loadStates(this.userEmail);
        }
    }

    saveTime(gameName, time) {
        this.states[gameName] = time;
        if (this.userEmail !== null) {
            storeStates(this.userEmail, this.states);
        }
    }

    getAllGames() {
        return { ...this.states };
    }

    isGameFinished(gameName) {
        return (gameName in this.states);
    }
}

const roomState = new RoomState();

function getRoomState() {
    return roomState;
}

export { getRoomState };
