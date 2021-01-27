import { mockRandomForEach } from 'jest-mock-random';
import { getRandomElement } from '../js/components/utils';

describe('Test with random usage', () => {
  mockRandomForEach([0.1, 0.2, 0.3, 0.6]);
  it('assigns random the values that we want to mock in order', () => {
    const actual = [Math.random(), Math.random(), Math.random(), Math.random()]; // [0.1, 0.2, 0.3, 0.6]
    const expected = getRandomElement(actual);
    expect(actual).toEqual(expect.arrayContaining([expected]));
  });
});
