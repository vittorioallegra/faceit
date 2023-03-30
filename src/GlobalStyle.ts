import theme from './theme';
import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle: any = createGlobalStyle`
  ${normalize};

  body {
    font-family: 'Play';
    background: ${theme.palette.background.body};
    color: ${theme.palette.text.primary};
    ${theme.typography.body};
  }

  #root {
    display: flex;
    justify-content: center;
  }
`;

export { GlobalStyle };
