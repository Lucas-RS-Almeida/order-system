import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';

import api from '../../services/api';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    errors,
    setError,
    removeError,
    getErrorByFieldName,
  } = useErrors();

  const isActive = (errors.length === 0) && email;

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  async function handleNextStep(event) {
    event.preventDefault();

    if (!email) {
      return toast.warning('E-mail é obrigátorio');
    }

    try {
      setIsLoading(true);

      await api.post('/users/forgot-password', { email });

      toast.success('Token enviado com sucesso, verifique seu e-mail');

      navigate(`/reset-password/${email}`);
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
        Insira seu e-mail para receber um token de recuperção de senha
      </span>

      <form onSubmit={handleNextStep}>
        <FormGroup error={getErrorByFieldName('email')}>
          <Input
            placeholder="E-mail"
            onChange={handleChangeEmail}
            error={getErrorByFieldName('email')}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={!isActive}
        >
          Próximo
        </Button>
      </form>

      <div className="actionsLinks">
        <Link to="/">
          Voltar
        </Link>
      </div>
    </Container>
  );
}
