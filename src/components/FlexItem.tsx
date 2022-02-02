import styled from 'styled-components';
import theme from '../theme';

export const FlexItem = styled.div`
  flex: 0 0 ${100 / 3}%;
  box-sizing: border-box;
  padding: 0 ${theme.spacing(3)} ${theme.spacing(6)};
`;
