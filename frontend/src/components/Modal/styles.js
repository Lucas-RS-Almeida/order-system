import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.primary.light};
`;
