import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import reducer from "./reducer"
import { Provider } from "react-redux"
import ReactGA from 'react-ga'
import firebase from './firebase'

ReactGA.initialize('UA-125374568-2');

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(firebase))
    )
);

const Index = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.register();
