import { shuffleArray } from '../js/components/utils';

describe('Static tests', function () {
  it('Shuffled array should have the same length as input array.', () => {
    const original = Array.from(Array(100).keys());
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
  });
  it('Shuffled array should have same elements as input array.', () => {
    const original = Array.from(Array(100).keys());
    const shuffled = shuffleArray(original);
    const shuffledSort = shuffled.sort((a, b) => Number(a) - Number(b));
    expect(shuffledSort).toEqual(original);
  });
});