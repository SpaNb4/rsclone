import { getRandomIntInclusive } from '../js/components/utils';

const min = 1.4;
const max = 10.9;

test('random number to be greater than or equal minimum', () => {
    expect(getRandomIntInclusive(min, max)).toBeGreaterThanOrEqual(min);
});

test('random number to be less than or equal maximum', () => {
    expect(getRandomIntInclusive(min, max)).toBeLessThanOrEqual(max);
});
