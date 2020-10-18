import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './app.css';

const App = () => (
  <div className="main-app">
    Hello React
  </div>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app-conatiner')
  )
});