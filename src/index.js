import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import logger from 'redux-logger'
import reduxPromise from 'redux-promise-middleware';
import HomePageForm from "./HomePage/HomePageForm";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromise(),thunk,logger))
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));





registerServiceWorker();
