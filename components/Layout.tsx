import React, { ReactNode } from "react";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <GlobalStyle />
    {children}
  </>
);

const GlobalStyle = createGlobalStyle`
  :root {
    --color-dark-blue: #152c45;
    --color-cyan: #28e0b3;
    --color-yellow: #f2c405;
    --color-white: #fff9db;
  }

	html {
    font-family: 'Rubik', sans-serif;
		box-sizing: border-box;
    height: 100%;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

  body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("background.png");
  }
`;

export default Layout;
