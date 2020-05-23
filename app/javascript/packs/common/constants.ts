export const API_ROOT = 'http://localhost:5000';
export const API_WS_ROOT = 'ws://localhost:5000/cable';

export const axios = require('axios').default;
export const AUTH_TOKEN = document.querySelector('meta[name=csrf-token]').getAttribute('content');

axios.defaults.headers.common['X-CSRF-Token'] = AUTH_TOKEN
axios.defaults.headers.common['Accept'] = 'application/json'

export const MAX_INPUT_LEN = 50;

export const CURRENT_USER = (window as any).gon.current_user