import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset } from "styled-reset";
import { theme } from "themes";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  input, select, button, textarea {
    font-family: inherit;
  }
  
  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ol, ul {
    list-style: none;
  }

  h1, h2 {
    font-weight: bold;
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="images/favicon.svg" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
