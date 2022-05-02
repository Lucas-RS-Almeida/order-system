import styled from 'styled-components';

export default styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 34px;
  font-weight: bold;
  position: absolute;
  right: 2%;
  bottom: 2%;
  background: ${({ theme }) => theme.colors.green.main};
  color: #fff;
`;
