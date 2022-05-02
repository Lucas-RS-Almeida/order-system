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

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const { onSignUp } = useContext(Context);

  const {
    errors,
    setError,
    removeError,
    getErrorByFieldName,
  } = useErrors();

  const isActive = (errors.length === 0) && (username && email && password);

  function handleChangeUsername(event) {
    setUsername(event.target.value);

    if (event.target.value && event.target.value.length < 4) {
      setError({ field: 'username', message: 'Insira um nome maior' });
    } else {
      removeError('username');
    }
  }

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

    if (event.target.value && event.target.value.length < 6) {
      setError({ field: 'password', message: 'Insira uma senha mais forte' });
    } else {
      removeError('password');
    }
  }

  function handleChangeCheckPassword(event) {
    setCheckPassword(event.target.value);

    if (event.target.value && event.target.value !== password) {
      setError({ field: 'checkPassword', message: 'As senhas não batem' });
    } else {
      removeError('checkPassword');
    }

  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!username || !email || !password) {
      return toast.warning('Todos os campos são obrigátorios');
    }

    await onSignUp({ username, email, password });
  }

  return (
    <Container>
      <img src={logo} alt="Order System" />

      <form onSubmit={handleLogin}>
        <FormGroup error={getErrorByFieldName('username')}>
          <Input
            placeholder="Nome de usuário *"
            onChange={handleChangeUsername}
            error={getErrorByFieldName('username')}
            value={username}
          />
        </FormGroup>
        <FormGroup error={getErrorByFieldName('email')}>
          <Input
            placeholder="E-mail *"
            onChange={handleChangeEmail}
            error={getErrorByFieldName('email')}
            value={email}
          />
        </FormGroup>
        <FormGroup error={getErrorByFieldName('password')}>
          <Input
            placeholder="Senha *"
            type="password"
            onChange={handleChangePassword}
            value={password}
            error={getErrorByFieldName('password')}
          />
        </FormGroup>
        <FormGroup error={getErrorByFieldName('checkPassword')}>
          <Input
            placeholder="Comfirme sua senha *"
            type="password"
            onChange={handleChangeCheckPassword}
            value={checkPassword}
            error={getErrorByFieldName('checkPassword')}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={!isActive}
        >
          Registrar
        </Button>
      </form>

      <div className="actionsLinks">
        <Link to="/">
          Já tem uma conta? Entrar
        </Link>
      </div>
    </Container>
  );
}
