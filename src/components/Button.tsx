import theme from '../theme';
import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  border: 1px solid ${theme.palette.secondary.main};
  border-radius: ${theme.borderRadius};
  color: ${theme.palette.primary.main};
  padding: ${theme.spacing(2)};
  cursor: pointer;
  ${theme.typography.button};

  &:hover {
    border: 1px solid ${theme.palette.secondary.light};
    color: ${theme.palette.primary.light};
  }

  &:active {
    border: 1px solid ${theme.palette.secondary.dark};
    color: ${theme.palette.primary.dark};
  }
`;
