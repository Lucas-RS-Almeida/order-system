import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  min-height: calc(100vh - 108px);
  margin: 0 auto;
  padding: 0 2%;
  position: relative;

  header {
    color: #fff;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
    list-style: none;
    margin-top: 24px;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 6px;
      padding-right: 16px;
      background: ${({ theme }) => theme.colors.primary.light};

      .box-content {
        display: flex;
        align-items: center;

        img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .content {
          margin-left: 8px;

          span {
            display: block;
            color: #fff;
          }
        }
      }
    }
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
`;
