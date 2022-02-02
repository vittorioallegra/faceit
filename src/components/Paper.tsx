import styled from 'styled-components';
import theme from '../theme';

export const Paper = styled.div`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(3)};
  border-radius: ${theme.borderRadius};
  height: calc(100% - ${theme.spacing(6)});
`;
