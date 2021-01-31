/* eslint-disable no-unused-vars */
import Sharer from 'sharer.js';

const classShare = 'share__button';
const textLink = 'Link to the game Quest Escape Room: ';
const urlLink = 'https://rsclone-test1.netlify.app/';
const urlDeploy = document.location.origin;
const vk = 'vk';
const facebook = 'facebook';
const twitter = 'twitter';
const whatsapp = 'whatsapp';
const telegram = 'telegram';
const email = 'email';
const imgVK = './assets/img/vk.png';
const imgFacebook = './assets/img/facebook.png';
const imgTwitter = './assets/img/twitter.png';
const imgWhatsapp = './assets/img/whatsapp.png';
const imgTelegram = './assets/img/telegram.png';
const imgEmail = './assets/img/google-plus.png';
const addressEmail = 'some@email.com';
const themeLink = 'Hey! Check out that URL';
const arrLink = [vk, facebook, twitter, whatsapp, telegram, email];
const arrImgLink = [imgVK, imgFacebook, imgTwitter, imgWhatsapp, imgTelegram, imgEmail];

const linkMenu = () => {
    for (let i = 0; i < arrLink.length; i++) {
        if (i === arrLink.length - 1) {
            document.querySelector('.share__buttons').innerHTML += `<button class=${classShare} 
            data-sharer=${arrLink[i]} 
            data-title=${textLink} 
            data-url=${urlLink} 
            data-subject=${themeLink} 
            data-to=${addressEmail}>
            <img src=${arrImgLink[i]} alt=${arrLink[i]}>
            </button>`;
        } else {
            document.querySelector('.share__buttons').innerHTML += `<button class=${classShare}
            data-sharer=${arrLink[i]}
            data-title=${textLink}
            data-url=${urlLink}>
            <img src=${arrImgLink[i]} alt=${arrLink[i]}>
            </button>`;
        }
    }
};

linkMenu();
window.Sharer.init();
