import styled from 'styled-components';
import theme from '../theme';

export const FlexContainer = styled.div`
  margin: ${theme.spacing(6)} -${theme.spacing(3)};
  width: calc(100% + ${theme.spacing(6)});
  display: flex;
  flex-wrap: wrap;
`;
