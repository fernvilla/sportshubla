import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
// import jwt_decode from 'jwt-decode';
// import store from 'store';
import SiteLayout from 'src/components/layout/SiteLayout';
import theme from './../theme';
// import { wrapper } from '../store';
// import setAuthToken from './../utils/auth';
import { toast } from 'react-toastify';
// import { setCurrentUser, logoutUser } from './../actions/authActions';
// import { store as reduxStore } from './../store';

import 'react-toastify/dist/ReactToastify.css';
import '../styles.scss';

toast.configure();

// const jwtToken = store.get('jwtToken');

// if (jwtToken) {
//   setAuthToken(jwtToken);

//   const decoded = jwt_decode(jwtToken);

//   reduxStore.dispatch(setCurrentUser(decoded));

//   const currentTime = Date.now() / 1000;

//   if (decoded.exp < currentTime) {
//     reduxStore.dispatch(logoutUser());
//     window.location.href = '/';
//   }
// }

const App = ({ Component, pageProps }: AppProps) => {
  const { title } = pageProps;
  const pageTitle = `Sports Nucleus ${title ? `| ${title}` : ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />

          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ColorModeProvider>
      </ThemeProvider>

      <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    </>
  );
};

// export default wrapper.withRedux(App);
export default App;
