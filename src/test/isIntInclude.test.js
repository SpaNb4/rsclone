import { isIntInclude } from '../js/components/utils';

test('The integer is included', () => {
  const result = isIntInclude(50, 100, 0, 100);
  expect(result).toBeTruthy();
});

test('The integer is included', () => {
  const result = isIntInclude(50, 100, 1000, 100);
  expect(result).toBeFalsy();
});