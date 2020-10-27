import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from './theme';
import { saveState } from './localStorage';
import { throttle } from 'lodash';

store.subscribe(
  throttle(() => {
    saveState({
      favorites: store.getState().favorites
    });
  }, 1000)
);

const component = (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  hydrate(component, rootElement);
} else {
  render(component, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
