import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 16px 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary.main};

  .groupTop {
    display: flex;
    align-items: center;
    gap: 16px;

    label {
      width: 140px;
      height: 100px;
      position: relative;
      cursor: pointer;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }

    input[type=file] {
      display: none;
    }

    .overlay {
      width: 105px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.09);

      svg {
        font-size: 28px !important;
        color: #fff;
      }
    }
  }

  .groupMiddle {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;

    input {
      width: 30%;
    }

    select {
      width: 65%;
      height: 45px;
      outline: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      padding: 0 16px;
      font-size: 16px;
      background: ${({ theme }) => theme.colors.primary.light};
      color: #8A8A8A;
    }
  }

  .groupBottom {
    margin-top: 16px;
  }
`;
