import { Howl } from 'howler';
import { createConsumer } from "@rails/actioncable";

export const API_ROOT = 'http://localhost:5000';
export const API_WS_ROOT = 'ws://localhost:5000/cable';

export const axios = require('axios').default;
export const AUTH_TOKEN = document.querySelector('meta[name=csrf-token]').getAttribute('content');

axios.defaults.headers.common['X-CSRF-Token'] = AUTH_TOKEN
axios.defaults.headers.common['Accept'] = 'application/json'

export const MAX_INPUT_LEN = 150;
export const MAX_BIO_LENGTH = 250;

export const CURRENT_USER = (window as any).gon.current_user;

export const outGoingMessageSound = new Howl({
    src: ['/sounds/outgoing-message.ogg'],
    autoplay: false,
    loop: false,
    volume: 0.5
});

export const incomingMessageSound = new Howl({
    src: ['/sounds/new-message.ogg'],
    autoplay: false,
    loop: false,
    volume: 0.5
});

export const notificationSound = new Howl({
    src: ['/sounds/notification.mp3'],
    autoplay: false,
    loop: false,
    volume: 0.5
});

export const cable = createConsumer();