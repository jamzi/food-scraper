import React from "react";
import App from "next/app";
import Head from "next/head";
import * as Sentry from "@sentry/browser";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { hotjar } from "react-hotjar";

import theme from "../components/theme";
import Layout from "../components/layout";
import { initGA, logPageView } from "../utils/analytics";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

export default class MyApp extends App {
  componentDidMount() {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
    if (process.env.HOTJAR_HJID && process.env.HOTJAR_HJSV) {
      hotjar.initialize(
        parseInt(process.env.HOTJAR_HJID),
        parseInt(process.env.HOTJAR_HJSV)
      );
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>LJ Food</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Layout>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
        <style jsx global>{`
          html {
            height: 100%;
          }
          body {
            height: 100%;
          }
          #__next {
            height: 100%;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
