import { isOnElement } from '../js/components/utils';
import { state } from '../js/components/state';

const swingPicture = () => 2;
const shakePicture = () => 2;

const element1 = {
  minX: 0,
  maxX: 100,
  minY: 0,
  maxY: 100,
  id: 'id',
  class: 'lock1',
  callback: () => 2,
}

const element2 = {
  minX: 0,
  maxX: 100,
  minY: 0,
  maxY: 100,
  id: 'id',
  class: 'sock1',
  callback: swingPicture,
}

const element3 = {
  minX: 0,
  maxX: 100,
  minY: 0,
  maxY: 100,
  id: 'id',
  class: 'sock1',
  callback: shakePicture,
}

const pointer1 = {
  x: 50,
  width: 100,
  y: 50,
  height: 100
}

const pointer2 = {
  x: 50,
  width: 100,
  y: 5000,
  height: 100
}

test('is on element, has appropriate class and has inappropriate callback name', () => {
  state.selector = undefined;
  const fn = isOnElement(element1, pointer1);
  expect(state.selector).toEqual(`.${element1.class}`);
  expect(fn).toBeTruthy();
});

test('is on element, has inappropriate class and has appropriate callback name', () => {
  state.selector = undefined;
  const fn = isOnElement(element2, pointer1);
  expect(state.selector).toEqual(`#${element2.id}`);
  expect(fn).toBeTruthy();
});

test('is on element, has inappropriate class and inappropriate callback name', () => {
  state.selector = undefined;
  const fn = isOnElement(element3, pointer1);
  expect(state.selector).toBeUndefined();
  expect(fn).toBeTruthy();
});

test('is not on element', () => {
  isOnElement(element1, pointer2);
  expect(state.callback).toBeNull();
});

