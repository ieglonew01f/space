// tslint:disable-next-line: no-var-requires
export const axios = require('axios').default;
export const AUTH_TOKEN = document
  .querySelector('meta[name=csrf-token]')
  .getAttribute('content');

axios.defaults.headers.common['X-CSRF-Token'] = AUTH_TOKEN;
axios.defaults.headers.common['Accept'] = 'application/json';
