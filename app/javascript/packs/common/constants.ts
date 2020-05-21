export const API_ROOT = 'http://localhost:5000';
export const API_WS_ROOT = 'ws://localhost:5000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const axios = require('axios').default;
export const MAX_INPUT_LEN = 50;
export const AUTH_TOKEN = document.querySelector('meta[name=csrf-token]').getAttribute('content');
