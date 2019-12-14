import React from "react";
import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { hotjar } from "react-hotjar";

import theme from "../components/theme";
import Layout from "../components/layout";
import { initGA, logPageView } from "../utils/analytics";

class MyApp extends App {
  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      if (
        process.env.HOTJAR_HJID &&
        process.env.HOTJAR_HJSV &&
        process.env.NODE_ENV === "production"
      ) {
        hotjar.initialize(
          parseInt(process.env.HOTJAR_HJID),
          parseInt(process.env.HOTJAR_HJSV)
        );
      }
      window.GA_INITIALIZED = true;
    }
    logPageView();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
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

export default MyApp;
