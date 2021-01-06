import { doubleArray } from '../js/components/utils';

test('doubleArray', () => {
  expect(doubleArray([1, 2])).toEqual([1, 2, 1, 2]);
});
