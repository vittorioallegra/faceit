import styled from 'styled-components';
import theme from '../theme';

interface IProps {
  direction?: 'column' | 'row';
}

export const FlexContainer = styled.div<IProps>`
  margin: ${theme.spacing(6)} -${theme.spacing(3)};
  width: calc(100% + ${theme.spacing(6)});
  display: flex;
  flex-wrap: wrap;
`;
