import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './app';

const render = () => ReactDOM.render(<App />, document.getElementById('root'));
render();

if (module.hot) {
  module.hot.accept('./app', render)
}
