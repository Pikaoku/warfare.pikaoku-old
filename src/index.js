import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import reducer from "./store/reducer";
import {Provider} from "react-redux";


firebase.initializeApp({
    apiKey: "AIzaSyDYjGq1mw4uWBgw9euTp9ITp1pq1jZqvw4",
    authDomain: "pikaoku-tools.firebaseapp.com",
    databaseURL: "https://pikaoku-tools.firebaseio.com",
    projectId: "pikaoku-tools",
    storageBucket: "pikaoku-tools.appspot.com",
    messagingSenderId: "946348039508"
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(firebase))
    )
);

const Index = () => (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
