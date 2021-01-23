class RoomState {
    constructor() {
        this.states = {};
        this.userEmail = null;
    }

    setUser(email) {
        this.states = {};
        this.userEmail = email;
        if (this.userEmail !== null) {
            this.states = JSON.parse(localStorage.getItem(
                this.buildStorageKey(this.userEmail),
            ));
            if (this.states === null) {
                this.states = {};
            }
        }
    }

    saveTime(name, time) {
        this.states[name] = time;
        if (this.userEmail !== null) {
            localStorage.setItem(this.buildStorageKey(this.userEmail), JSON.stringify(this.states));
        }
    }

    getAllGames() {
        return { ...this.states };
    }

    buildStorageKey(email) {
        return `states_${this.email}`;
    }
}

const roomState = new RoomState();

function getRoomState() {
    return roomState;
}

export { getRoomState };
