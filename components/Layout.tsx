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
	html {
    font-family: 'Rubik', sans-serif;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		box-sizing: inherit;
	}
`;

export default Layout;
