import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2%;
  position: relative;

  ul {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
    list-style: none;

    li {
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 16px;
      position: relative;
      cursor: pointer;
      border-radius: 8px;
      background: ${({ theme }) => theme.colors.primary.light};

      .bar {
        width: 16px;
        height: 45px;
        border-radius: 8px 0 0 8px;
        position: absolute;
        top: 0;
        left: 0;
        background: ${({ theme }) => theme.colors.green.main};
      }

      span {
        margin-left: 32px;
        font-weight: bold;
        color: #fff;
      }

      .notification {
        font-weight: lighter;
        color: ${({ theme }) => theme.colors.danger.main};
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  h1 {
    color: #fff;
  }

  .notifications {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.danger.main};

    span {
      font-weight: bold;
      font-size: 14px;
      color: #fff;
    }
  }
`;
