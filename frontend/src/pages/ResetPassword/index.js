import { useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import useErrors from '../../hooks/useErrors';

import api from '../../services/api';

export default function SignIn() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [, setCheckPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { email } = useParams();

  const navigate = useNavigate();

  const {
    errors,
    setError,
    removeError,
    getErrorByFieldName,
  } = useErrors();

  const isActive = (errors.length === 0) && (token && password);

  function handleChangeToken(event) {
    setToken(event.target.value);
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

  async function handleResetPassword(event) {
    event.preventDefault();

    if (!token || !password) {
      return toast.warning('Todos os campos são obigátorios');
    }

    try {
      setIsLoading(true);

      await api.post('/users/reset-password', { email, token, password });

      toast.success('Senha alterada com sucesso');

      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <img src={logo} alt="Order System" />

      <span className='text'>
        Token enviado para o email: "{email}". Não esqueça de verificar a caixa de span.
      </span>

      <form onSubmit={handleResetPassword}>
        <FormGroup>
          <Input
            placeholder="Insira o token aqui *"
            onChange={handleChangeToken}
          />
        </FormGroup>
        <FormGroup error={getErrorByFieldName('password')}>
          <Input
            placeholder="Nova senha *"
            type="password"
            onChange={handleChangePassword}
            error={getErrorByFieldName('password')}
          />
        </FormGroup>
        <FormGroup error={getErrorByFieldName('checkPassword')}>
          <Input
            placeholder="Confirme a nova senha *"
            type="password"
            onChange={handleChangeCheckPassword}
            error={getErrorByFieldName('checkPassword')}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={!isActive}
        >
          Alterar senha
        </Button>
      </form>

      <div className="actionsLinks">
        <Link to="/forgot-password">
          Voltar
        </Link>
      </div>
    </Container>
  );
}
