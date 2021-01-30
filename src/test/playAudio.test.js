import { removeAllElements } from '../js/components/utils';

const original = Array.from(Array(100).keys());

test('array is empty', () => {
  removeAllElements(original);
  expect(original).toHaveLength(0);
});
