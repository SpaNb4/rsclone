/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-cycle */
import { state, volumeRange, keyboardSwitch } from './state.ts';
import { gamearea } from './keyboard.ts';
// eslint-disable-next-line import/no-unresolved
import { getRoomState } from './room_state';
// eslint-disable-next-line import/no-unresolved
import { createWordList } from './wordlist.ts';

const loginButton = document.querySelector('#menu-login-button');
const logoutButton = document.querySelector('#menu-logout-button');
const statsButton = document.querySelector('#menu-stats-button');
const registerButton = document.querySelector('#menu-register-button');
const dropdowOpenButton = document.querySelectorAll('#wordlist-open-button');
const emailLoginHelperText = document.querySelector('#email_helper_login');
const emailRegisterHelperText = document.querySelector('#email_helper_register');
const loginForm = document.querySelector('#login_form');
const registerForm = document.querySelector('#register_form');
const selectLng = document.querySelector('.select-lang');
const backendURL = 'https://spanb4.herokuapp.com';
const INVALID = 'invalid';
const CORRECT = 'correct';
const HIDE = 'hide';
const USER = 'user';
const histogramButton = document.querySelector('#menu-histogram-button');

function onVolumeRangeChange(evt) {
    state.volume = Number(evt.target.value) / 100;
}

function switchKeyboard(value, modal) {
    state.keyboard = value;
    gamearea.switch();
    if (state.keyboard) modal.open();
}

function onLogoutClick() {
    fetch(`${backendURL}/logout`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.logout) {
                logoutButton.classList.add(HIDE);
                statsButton.classList.add(HIDE);
                loginButton.classList.remove(HIDE);
                registerButton.classList.remove(HIDE);
                localStorage.removeItem(USER);
                histogramButton.classList.add(HIDE);
                getRoomState().setUser(null);
            }
        });
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(`${backendURL}/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.login_email.value,
            password: this.login_password.value,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors) {
                emailLoginHelperText.innerHTML = 'Invalid username or password!';
                emailLoginHelperText.classList.add(INVALID);
                emailLoginHelperText.classList.remove(CORRECT);
                emailLoginHelperText.classList.remove(HIDE);
            } else if (res.success) {
                emailLoginHelperText.innerHTML = 'You logged in!';
                emailLoginHelperText.classList.add(CORRECT);
                emailLoginHelperText.classList.remove(INVALID);
                emailLoginHelperText.classList.remove(HIDE);
                logoutButton.classList.remove(HIDE);
                loginButton.classList.add(HIDE);
                registerButton.classList.add(HIDE);
                statsButton.classList.remove(HIDE);
                histogramButton.classList.remove(HIDE);

                localStorage.setItem(USER, this.login_email.value);
                getRoomState().setUser(this.login_email.value);
            }
        });
});

registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(`${backendURL}/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: this.register_email.value,
            password: this.register_password.value,
        }),
    }).then((res) => {
        if (res.ok) {
            emailRegisterHelperText.innerHTML = 'You have successfully registered!';
            emailRegisterHelperText.classList.add(CORRECT);
            emailRegisterHelperText.classList.remove(INVALID);
            emailRegisterHelperText.classList.remove(HIDE);
        } else {
            emailRegisterHelperText.innerHTML = 'Username already exists!';
            emailRegisterHelperText.classList.add(INVALID);
            emailRegisterHelperText.classList.remove(CORRECT);
            emailRegisterHelperText.classList.remove(HIDE);
        }
    });
});

selectLng.addEventListener('change', () => {
    if (selectLng.value === 'english') {
        location.href = '/?lng=en';
    } else if (selectLng.value === 'russian') {
        location.href = '/?lng=ru';
    } else if (selectLng.value === 'japanese') {
        location.href = '/?lng=ja';
    }
});

function headerInit() {
    M.Modal.init(document.querySelectorAll('.modal'), { startingTop: '10%' });
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    M.FormSelect.init(document.querySelectorAll('select'), { classes: 'main-header__select' });

    M.Dropdown.init(dropdowOpenButton, {
        onOpenStart: () => {
            createWordList();
        },
        onCloseEnd: () => {
            dropdowOpenButton[0].blur();
        },
        closeOnClick: false,
        coverTrigger: false,
    });

    const modalInstance = M.Modal.getInstance(document.querySelector('#modal-keyboard'));

    const sidenavInstance = M.Sidenav.init(document.querySelector('.sidenav'), {
        edge: 'right',
        onOpenEnd: () => (state.paused = true),
        onCloseEnd: () => (state.paused = false),
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'F11' && state.keyboard && !state.isMiniGameOpened) {
            evt.preventDefault();
            sidenavInstance.open();
        }

        if (evt.code === 'F2' && state.keyboard && !state.isMiniGameOpened) {
            evt.preventDefault();
            M.Dropdown.getInstance(dropdowOpenButton[0]).open();
        }

        if (evt.code === 'Escape') {
            sidenavInstance.close();
        }
    });

    if (localStorage.getItem(USER)) {
        loginButton.classList.add(HIDE);
        registerButton.classList.add(HIDE);
        logoutButton.classList.remove(HIDE);
        statsButton.classList.remove(HIDE);
        histogramButton.classList.remove(HIDE);
    } else {
        loginButton.classList.remove(HIDE);
        registerButton.classList.remove(HIDE);
        logoutButton.classList.add(HIDE);
        statsButton.classList.add(HIDE);
        histogramButton.classList.add(HIDE);
    }

    volumeRange.addEventListener('change', onVolumeRangeChange);
    logoutButton.addEventListener('click', onLogoutClick);
    keyboardSwitch.addEventListener('change', (evt) => switchKeyboard(evt.target.checked, modalInstance));
}

function loadRoomState() {
    const currentUser = localStorage.getItem(USER);
    if (currentUser !== null) {
        getRoomState().setUser(currentUser);
    }
}

export { backendURL, headerInit, loadRoomState };
