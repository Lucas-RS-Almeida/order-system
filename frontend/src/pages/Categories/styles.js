import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: calc(100vh - 125px);
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
      padding: 0 16px;
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
        margin-left: 16px;
        font-weight: bold;
        color: #fff;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 16px;

        button {
          background: none;

          svg {
            font-size: 20px !important;
            color: #fff;
          }
        }
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
`;
