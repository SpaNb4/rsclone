const volumeRange = document.createElement('input');

function getVolume() {
  if (volumeRange) {
    return Number(volumeRange.value) / 100;
  }
}

test('get volume value', () => {
  volumeRange.value = '90';

  expect(getVolume()).toEqual(0.9);
});
