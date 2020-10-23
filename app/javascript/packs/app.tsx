import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Calendar } from './calendar';

import './app.css';

const App = () => (
  <div className="main-app">
    <Calendar />
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app-conatiner'));
});
