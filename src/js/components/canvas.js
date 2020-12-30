import imageWall from './../../assets/img/wall.png';
import imageFloor from './../../assets/img/floor.png';
import imageDoor from './../../assets/img/door.png';

const MAX_WIDTH = 1200;
const HORISONT_RATIO = 4 / 5;

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const width = canvas.clientWidth;
const height = canvas.clientHeight;
const horizont = height * HORISONT_RATIO; // height * 4 / 5

canvas.width = width;
canvas.height = height;

const wall = new Image();
const floor = new Image();

wall.src = imageWall;
floor.src = imageFloor;


wall.onload = () => {
  ctx.drawImage(wall, 0, 0, width, horizont);
}

floor.onload = () => {
  ctx.drawImage(floor, 0, horizont, width, height - horizont); // height - horizont = height / 5
}

const door = new Image();
door.src = imageDoor;
door.ratio = door.naturalHeight / door.naturalWidth;
door.relwidth = width * door.naturalWidth / MAX_WIDTH;
door.relheight = door.relwidth * door.ratio;
door.minX = ( width - door.relwidth) / 2;
door.maxX = ( width + door.relwidth) / 2;
door.minY = horizont - door.relheight;
door.maxY = horizont;

door.onload = () => {
  ctx.drawImage(door, door.minX, door.minY, door.relwidth, door.relheight);
}

canvas.addEventListener('click', (evt) => {
  if (evt.clientX > door.minX && evt.clientX < door.maxX && evt.clientY > door.minY && evt.clientY < door.maxY) {
    console.log('locked');
  }
});

canvas.addEventListener('mousemove', (evt) => {
  if (evt.clientX > door.minX && evt.clientX < door.maxX && evt.clientY > door.minY && evt.clientY < door.maxY) {
    evt.target.style.cursor = 'pointer';
  }
})