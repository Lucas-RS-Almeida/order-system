import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid ${({ error, theme }) => (error ? theme.colors.danger.main : 'transparent') };
  outline: none;
  font-size: 16px;
  border-radius: 8px;
  padding: 0px 16px;
  background: ${({ theme }) => theme.colors.primary.light};
  color: #fff;
`;
