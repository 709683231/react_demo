import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './api'
import memoryUtil from './utils/memoryutil';
import {getMemory} from './utils/memoryTool';

const user = getMemory('KEY_NAME') || {};
// const user = JSON.parse(localStorage.getItem('KEY_NAME') || '{}')
console.log(user);
memoryUtil.user = user;
ReactDOM.render(<App/>,document.getElementById('root'))

