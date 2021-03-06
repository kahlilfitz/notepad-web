import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import './index.css';
import reducer from './app/reducer'
import App from './app/App';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store = {store}>
	<App />
	</Provider>
	, document.getElementById('root'));
