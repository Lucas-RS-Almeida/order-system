import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Container } from './styles';

import { Context } from '../../contexts/AuthContext';

import logo from '../../assets/images/logo.svg';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { onSignIn } = useContext(Context);

  const {
    errors,
    setError,
    removeError,
    getErrorByFieldName,
  } = useErrors();

  const isActive = (errors.length === 0) && (email && password);

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!email || !password) {
      return toast.warning('Todos os campos são obrigátorios');
    }

    await onSignIn({ email, password });
  }

  return (
    <Container>
      <img src={logo} alt="Order System" />

      <form onSubmit={handleLogin}>
        <FormGroup error={getErrorByFieldName('email')}>
          <Input
            placeholder="E-mail"
            onChange={handleChangeEmail}
            error={getErrorByFieldName('email')}
          />
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Senha"
            type="password"
            onChange={handleChangePassword}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={!isActive}
        >
          Entrar
        </Button>
      </form>

      <div className="actionsLinks">
        <Link to="/auth/sign-up">
          Não tem uma conta? Registre-se
        </Link>
        <Link to="/forgot-password">
          Esqueceu a senha?
        </Link>
      </div>
    </Container>
  );
}
