import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import SiteLayout from 'src/components/layout/SiteLayout';
import theme from './../theme';
import '../styles.scss';

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

export default App;
