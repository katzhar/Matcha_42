import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import history from './history';

export let rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
        , document.getElementById('root'));
}

rerenderEntireTree();
store.subscribe(() => {
    rerenderEntireTree();
});