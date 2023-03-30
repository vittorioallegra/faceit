import theme from '../theme';
import styled from 'styled-components';

export const FlexItem = styled.div`
  width: 100%;
  padding: ${theme.spacing(2)} ${theme.spacing()};

  @media (min-width: ${theme.breakpoints.m}) {
    width: calc(${100 / 3}% - ${theme.spacing(6)});
    padding: ${theme.spacing(3)};
  }
`;
