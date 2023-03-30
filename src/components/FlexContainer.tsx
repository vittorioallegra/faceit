import theme from '../theme';
import styled from 'styled-components';

export const FlexContainer = styled.div`
  margin: 0 -${theme.spacing()};
  width: calc(100% + ${theme.spacing(2)});
  display: flex;
  flex-wrap: wrap;

  @media (min-width: ${theme.breakpoints.m}) {
    margin: 0 -${theme.spacing(3)};
    width: calc(100% + ${theme.spacing(6)});
  }
`;
