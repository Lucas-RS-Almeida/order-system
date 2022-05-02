import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 16px 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary.main};
`;
