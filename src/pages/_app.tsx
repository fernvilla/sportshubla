import React, { Fragment } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import SiteHeader from '../components/layout/SiteHeader';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from './../theme';
import '../styles.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const { title, teams } = pageProps;
  const pageTitle = `Sports Nucleus ${title ? `| ${title}` : ''}`;

  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <SiteHeader teams={teams} />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>

      <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    </Fragment>
  );
};

export default App;
