import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  max-width: 500px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 2%;

  img {
    max-width: 280px;
    margin-bottom: 24px;
  }

  form {
    width: 100%;
  }

  .actionsLinks {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    margin-top: 24px;

    a {
      color: #fff;
    }
  }
`;
