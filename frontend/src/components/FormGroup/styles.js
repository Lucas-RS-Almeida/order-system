import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.danger.main};

  & + & {
    margin-top: 16px;
  }
`;
