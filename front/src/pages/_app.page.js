import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

import Router, { useRouter } from 'next/router';
import { ConnectedRouter } from 'connected-next-router';


import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider as StyledComponentProvider } from 'styled-components';
import { ThemeProvider as MaterialUiProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from 'components/layout';

import { wrapper } from 'root/store';
import { APP_LOADED, TOKEN_FETCHED  } from 'root/actions';
import APP_URLS from 'root/appUrls';



import theme from '../themes/light';


async function appLoaded(dispatch, router, setLoading) {
  let user = localStorage.getItem('user');

  if (user) {
    user = JSON.parse(user);
    dispatch({ type: TOKEN_FETCHED, user });
  } else if (!APP_URLS.isPublicRoute(router.pathname)) {
    router.push(APP_URLS.LANDING.path);
  }

  setLoading(false);
}


function FantiumApp(props) {
  const { Component, pageProps } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    appLoaded(dispatch, router, setLoading)
  }, []);

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Fantium</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
          as="font"
        />
      </Head>
      <ConnectedRouter>
        <StyledComponentProvider theme={theme}>
          <MaterialUiProvider theme={theme}>
            <StylesProvider injectFirst>
              <CssBaseline />
              { loading && 'loading' }
              { !loading
                && <Layout>
                  <Component {...pageProps} />
                </Layout>
              }
            </StylesProvider>
          </MaterialUiProvider>
        </StyledComponentProvider>

      </ConnectedRouter>
    </React.Fragment>
  );
}

FantiumApp.getInitialProps = async function initialProps({ Component, ctx }) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(FantiumApp);
