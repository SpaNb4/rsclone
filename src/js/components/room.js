const leftArrow = document.querySelector('#room-arrow-left');
const rightArrow = document.querySelector('#room-arrow-right');

const walls = [
    document.querySelector('#wall-1'),
    document.querySelector('#wall-2'),
    document.querySelector('#wall-3'),
    document.querySelector('#wall-4')
];

class Room {
    constructor() {
        this.activeWall = walls[0];
    }

    init() {
        leftArrow.addEventListener('click', () => {
            this.activeWall.classList.remove('active');
            let index = walls.indexOf(this.activeWall);
            this.activeWall = index > 0 ? walls[index - 1] : walls[walls.length - 1];
            this.activeWall.classList.add('active');
        });

        rightArrow.addEventListener('click', () => {
            this.activeWall.classList.remove('active');
            let index = walls.indexOf(this.activeWall);
            this.activeWall = index < walls.length - 1 ? walls[index + 1] : walls[0];
            this.activeWall.classList.add('active');
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Room().init();
});
