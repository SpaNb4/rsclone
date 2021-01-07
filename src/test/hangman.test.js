import { checkSymbol } from '../js/components/utils';

test('checkSymbol', () => {
    expect(checkSymbol('javascript'.split(''),'v')).toEqual(true);
});
