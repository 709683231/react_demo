import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './api'
import memoryUtil from './utils/memoryutil';


const user = JSON.parse(localStorage.getItem('KEY_NAME') || '{}')
memoryUtil.user = user;
ReactDOM.render(<App/>,document.getElementById('root'))

