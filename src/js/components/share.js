import Sharer from 'sharer.js';

const classShare = 'share__button',
      textLink = 'Link to the game Quest Escape Room: ',
      urlLink = 'https://rsclone-test1.netlify.app/',
      urlDeploy = document.location.origin,
      vk = 'vk',
      facebook = 'facebook',
      twitter = 'twitter',
      whatsapp = 'whatsapp',
      telegram = 'telegram',
      email = 'email',
      imgVK = './assets/img/vk.png',
      imgFacebook  = './assets/img/facebook.png',
      imgTwitter = './assets/img/twitter.png',
      imgWhatsapp = './assets/img/whatsapp.png',
      imgTelegram = './assets/img/telegram.png',
      imgEmail = './assets/img/google-plus.png',
      addressEmail = 'some@email.com',
      themeLink = 'Hey! Check out that URL',
      arrLink = [vk, facebook, twitter, whatsapp, telegram, email],
      arrImgLink = [imgVK, imgFacebook, imgTwitter, imgWhatsapp, imgTelegram, imgEmail];

const linkMenu = () => {
    for (let i = 0; i < arrLink.length; i++) {
        if (i === arrLink.length - 1) {
            document.querySelector('.share__buttons').innerHTML += `<button class=${classShare} data-sharer=${arrLink[i]} data-title=${textLink} data-url=${urlLink} data-subject=${themeLink} data-to=${addressEmail}><img src=${arrImgLink[i]} alt=${arrLink[i]}></button>`
        } else {
            document.querySelector('.share__buttons').innerHTML += `<button class=${classShare} data-sharer=${arrLink[i]} data-title=${textLink} data-url=${urlLink}><img src=${arrImgLink[i]} alt=${arrLink[i]}></button>`
        }
    }
}

linkMenu();
window.Sharer.init();