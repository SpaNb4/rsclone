import { getRandomInt } from '../js/components/utils';

test('getRandomInt', () => {
  const min = 0;
  const max = 7;
  const randomNumber = getRandomInt(max);

  expect(randomNumber).toBeGreaterThanOrEqual(min);
  expect(randomNumber).toBeLessThanOrEqual(max);
});
