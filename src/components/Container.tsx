import theme from '../theme';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  padding: 0 ${theme.spacing(2)};
  margin-top: ${theme.spacing(6)};

  @media (min-width: ${theme.breakpoints.m}) {
    padding: 0 ${theme.spacing(6)};
  }
`;
