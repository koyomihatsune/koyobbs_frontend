import React from 'react';
import ReactDOM from 'react-dom';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
// import './index.css'
import App from './App';

ReactDOM.render(
  <FluentProvider theme={teamsLightTheme}>
    <App>
    </App>
  </FluentProvider>,
  document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
