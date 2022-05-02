import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 45px;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.danger.main};
  color: #fff;

  &:disabled {
    cursor: default;
    background: ${({ theme }) => theme.colors.gray[100]};
  }
`;
