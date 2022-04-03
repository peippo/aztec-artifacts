import { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { BREAKPOINT } from "@/constants";
import Vines from "components/Vines";
import Logo from "components/Logo";
import TurnIndicator from "components/TurnIndicator";

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

    <Header>
      <Logo />
      <TurnIndicator />
    </Header>

    {children}
    <Vines />
  </>
);

const Header = styled.header`
  position: relative;
`;

const GlobalStyle = createGlobalStyle`
  :root {
    --color-dark-blue: #152c45;
    --color-cyan: #28e0b3;
    --color-yellow: #f2c405;
    --color-white: #fff9db;
    --font-family: 'Rubik', sans-serif;
    --cursor-url: url("cursor.png");
    --tile-size: 80px;
  }

  @media (min-width: ${BREAKPOINT["medium"]}) {
    :root {
      --tile-size: 100px;
    }
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    :root {
      --tile-size: 120px;
    }
  }

	html {
    font-family: var(--font-family);
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
    cursor: var(--cursor-url), auto;
  }
`;

export default Layout;
