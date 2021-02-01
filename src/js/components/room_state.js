import { backendURL } from './header';

function buildStorageKey(email) {
    return `states_${email}`;
}

function storeStates(email, states) {
    localStorage.setItem(buildStorageKey(email), JSON.stringify(states));

    fetch(`${backendURL}/save`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            complitedGame: states,
        }),
    });
}

async function loadStates(email) {
    let states = JSON.parse(localStorage.getItem(buildStorageKey(email)));
    if (states === null) {
        states = await fetch(`${backendURL}/getsave`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                complitedGame: states,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.errors) {
                    return {};
                } else if (res.success.complitedGame) {
                    return res.success.complitedGame;
                } else {
                    return {};
                }
            });
        if (Object.keys(states).length !== 0) {
            storeStates(email, states);
            return states;
        }
    }
    return states;
}
class RoomState {
    constructor() {
        this.states = {};
        this.userEmail = null;
    }

    async setUser(email) {
        this.states = {};
        this.userEmail = email;
        if (this.userEmail !== null) {
            this.states = await loadStates(this.userEmail);
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
        if (this.states[gameName]) {
            return gameName in this.states;
        }
    }

    deleteTime(gameName) {
        this.states[gameName] = 0;
        if (this.userEmail !== null) {
            storeStates(this.userEmail, this.states);
        }
    }
}

const roomState = new RoomState();

function getRoomState() {
    return roomState;
}

export { getRoomState };
