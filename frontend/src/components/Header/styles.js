import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2%;

  img {
    max-width: 280px;

    @media (max-width: 768px) {
      max-width: 200px;
    }
  }

  nav {
    ul {
      display: flex;
      align-items: center;
      gap: 16px;
      list-style: none;

      li {
        font-weight: bold;

        a {
          transition: all 0.3s ease-in;
          text-decoration: none;
          color: inherit;

          &:hover {
            color: ${({ theme }) => theme.colors.danger.main};
          }
        }

        button {
          background: none;

          svg {
            margin-top: 4px;
          }
        }
      }
    }
  }
`;
