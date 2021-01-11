import { checkSymbol } from '../js/components/utils';

test('checkSymbol', () => {
    expect(checkSymbol('javascript'.split(''), 'v', ['_ ', '_ ', '_ ', '_ ', '_ ', '_ ', '_ ', '_ ', '_ ', '_ '])).toEqual(true);
});
