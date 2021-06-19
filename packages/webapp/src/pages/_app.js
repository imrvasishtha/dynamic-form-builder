/* eslint-disable no-underscore-dangle */
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import LogRocket from 'logrocket';
import { ToastContainer } from 'react-toastify';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import getConfig from 'next/config';
import { PersistGate } from 'redux-persist/integration/react';
import Router from 'next/router';
import { appWithTranslation } from 'i18nConfig';
import initializeStore from '../store';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_overwrite.scss';
import '../styles/global.scss';

const { publicRuntimeConfig } = getConfig();

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  async componentDidMount() {
    const { store } = this.props;

    if (publicRuntimeConfig.logrocketEnabled === 'true') {
      // initialize logrocket and sanitize request
      LogRocket.init(publicRuntimeConfig.logrocketKey, {
        network: {
          requestSanitizer: request => {
            if (request.headers.Authorization) {
              request.headers.Authorization = '';
            }

            return request;
          },
        },
      });
    }
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto',
      });
    });
  }

  CustomCloseButton = ({ closeToast }) => (
    <span className="Toastify__close-button" clickHandler={closeToast} />
  );

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <div id="main">
        <Head>
          <link rel="icon" type="image/png" sizes="16x16" href="" />
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={store.__persistor}>
            <ToastContainer
              className="toast-custom-style"
              position="top-center"
              hideProgressBar
              autoClose={2000}
              closeButton={false}
            />
            <Component pageProps={pageProps} />
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default withRedux(initializeStore)(appWithTranslation(MyApp));
