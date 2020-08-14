import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reduxStore from './store';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import customTheme from './theme';

const rootElement = document.getElementById('root');
const component = (
  <React.StrictMode>
    <Provider store={reduxStore}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

if (rootElement?.hasChildNodes()) {
  hydrate(component, rootElement);
} else {
  render(component, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
