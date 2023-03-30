import theme from '../theme';
import styled from 'styled-components';

export const Input = styled.input`
  background: ${theme.palette.background.base};
  padding: ${theme.spacing(2)};
  border: none;
  color: ${theme.palette.text.primary};
`;
