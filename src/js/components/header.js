import { state } from './state';

const volumeRange = document.querySelector('#volume-range');
const restartButton = document.querySelector('#menu-restart-button');
const loginButton = document.querySelector('#menu-login-button');
const emailLoginHelperText = document.querySelector('#email_helper_login');
const emailRegisterHelperText = document.querySelector('#email_helper_register');
const loginForm = document.querySelector('#login_form');
const loginHeading = document.querySelector('#login_heading');
const logoutButton = document.querySelector('#logout');
const registerForm = document.querySelector('#register_form');
const backendURL = 'https://spanb4.herokuapp.com';
const INVALID = 'invalid';
const CORRECT = 'correct';
const HIDE = 'hide';
const USER ='user';

function onVolumeRangeChange(evt) {
    state.sound = evt.target.value / 100;
}

function onRestartClick() {
    state.memory = true; // restart memory
    state.simon = true; // restart memory
}

function onLoginClick() {
    emailLoginHelperText.classList.add(HIDE);
    if (localStorage.getItem(USER)) {
        loginHeading.innerHTML = `You already logged in ${localStorage.getItem(USER)}!`;
        loginForm.classList.add(HIDE);
        logoutButton.classList.remove(HIDE);
    } else {
        loginHeading.innerHTML = 'Login to your account';
        loginForm.classList.remove(HIDE);
        logoutButton.classList.add(HIDE);
    }
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

                localStorage.removeItem(USER);
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

                localStorage.setItem(USER, res.success);
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
            localStorage.setItem(USER, this.register_email.value);
        } else {
            emailRegisterHelperText.innerHTML = 'Username already exists!';
            emailRegisterHelperText.classList.add(INVALID);
            emailRegisterHelperText.classList.remove(CORRECT);
            emailRegisterHelperText.classList.remove(HIDE);
        }
    });
});

function navInit() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), { edge: 'right' });
    M.Modal.init(document.querySelectorAll('.modal'), { startingTop: '10%' });
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    M.FormSelect.init(document.querySelectorAll('select'), { classes: 'main-header__select' });

    volumeRange.addEventListener('change', onVolumeRangeChange);
    restartButton.addEventListener('click', onRestartClick);
    loginButton.addEventListener('click', onLoginClick);
    logoutButton.addEventListener('click', onLogoutClick);
}

function headerInit() {
    navInit();
}

document.addEventListener('DOMContentLoaded', headerInit);
