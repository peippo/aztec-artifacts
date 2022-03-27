import React, { ReactNode } from "react";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import Vines from "./Vines";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Aztec Artifacts" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <GlobalStyle />
    {children}
    <Vines />
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
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}

  body {
    margin: 0;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("background.png");
  }
`;

export default Layout;
