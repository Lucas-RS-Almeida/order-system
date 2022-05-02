import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2%;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.primary.light};
`;

export const Order = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 16px 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary.main};

  header {
    display: flex;
    align-items: center;
    gap: 16px;

    h2 {
      color: #fff;
    }

    button {
      background: none;
      cursor: pointer;
    }
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
    list-style: none;

    li {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
    }
  }

  .total {
    margin-top: 16px;

    strong {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.danger.main};
    }

    span {
      display: block;
      font-weight: bold;
      color: #fff;
    }
  }

  .box-button-conclude {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    button {
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      font-size: 16px;
      font-weight: bold;
      background: ${({ theme }) => theme.colors.green.main};
      color: #fff;
    }
  }
`;
