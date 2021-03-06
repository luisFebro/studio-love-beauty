import React from 'react';
import ReactDOM from 'react-dom';
import App from './_main-app/App';
// State Management - Redux and Context
import { createStore, StoreProvider } from 'easy-peasy';
import { easyStore } from './redux/_easyStore';
import * as serviceWorker from './serviceWorker';
import { ProductProvider } from './data/contexts/mainContext';

const store = createStore(easyStore);

ReactDOM.render(
    <StoreProvider store={store}>
        <ProductProvider>
            <App />
        </ProductProvider>
    </StoreProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
