
const keyboardSwitch = document.createElement('input');

function getKeyboardValue() {
  if (keyboardSwitch) {
    return keyboardSwitch.checked;
  }
}

test('input is checked', () => {
  keyboardSwitch.checked = true;
  expect(getKeyboardValue()).toBeTruthy();
});

test('input is not checked', () => {
  keyboardSwitch.checked = false;
  expect(getKeyboardValue()).toBeFalsy();
});
