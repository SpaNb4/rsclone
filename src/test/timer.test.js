function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

test('check when n = 10 minutes 0 is not added ', () => {
    const n = 10;
    expect(addZero(n)).toBe('10');
});

test('check when n = 9 minutes 0 added', () => {
    const n = 9;
    expect(addZero(n)).toBe('09');
});

test('check when n = 11 minutes 0 is not added ', () => {
    const n = 11;
    expect(addZero(n)).toBe('11');
});

test('check when n = 0 minutes 0 added', () => {
    const n = 0;
    expect(addZero(n)).toBe('00');
});
