import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
// setup virtual dom
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
// polyfill to make createObjectURL work in JSDOM
// as JSDOM doesn't support it
// createObjectURL is required by plotly
const serializeURL = (url: any, excludeFragment?: any) => {
  let output = url.scheme + ':';
  if (url.host !== null) {
    output += '//';
    if (url.username !== '' || url.password !== '') {
      output += url.username;
      if (url.password !== '') {
        output += ':' + url.password;
      }
      output += '@';
    }
    output += serializeHost(url.host);
    if (url.port !== null) {
      output += ':' + url.port;
    }
  } else if (url.host === null && url.scheme === 'file') {
    output += '//';
  }
  if (url.cannotBeABaseURL) {
    output += url.path[0];
  } else {
    if (url.host === null && url.path.length > 1 && url.path[0] === '') {
      output += '/.';
    }
    for (const segment of url.path) {
      output += '/' + segment;
    }
  }
  if (url.query !== null) {
    output += '?' + url.query;
  }
  if (!excludeFragment && url.fragment !== null) {
    output += '#' + url.fragment;
  }
  return output;
};
const serializeHost = (host: any) => {
  if (typeof host === 'number') {
    return serializeIPv4(host);
  }
  return host;
};
const serializeIPv4 = (address: any) => {
  let output = '';
  let n = address;
  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = '.' + output;
    }
    n = Math.floor(n / 256);
  }
  return output;
};
window.URL.createObjectURL = (_blob) => {
  const url = `blob:${serializeURL(location.origin)}/rand`;
  return url;
};
window.URL.revokeObjectURL = (_blobUrl) => {
  return;
};
window.URL.createObjectURL = (t: any) => {
  return '';
};
function copyProps(src: any, target: any) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}
(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: 'node.js',
};
(global as any).requestAnimationFrame = (callback: any) => {
  return setTimeout(callback, 0);
};
(global as any).cancelAnimationFrame = (id: any) => {
  clearTimeout(id);
};
(global as any).navigator.platform = 'Mac';
copyProps(window, global);
// setup enzyme
configure({ adapter: new EnzymeAdapter() });
