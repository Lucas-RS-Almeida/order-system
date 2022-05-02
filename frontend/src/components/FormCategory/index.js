import { useState } from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

import Input from '../Input';
import FormGroup from '../FormGroup';
import Button from '../Button';

export default function FormCategory({ handleSubmit, credential }) {
  const [name, setName] = useState(credential);

  async function handleRegisterCategory(event) {
    event.preventDefault();

    await handleSubmit(name);
  }

  return (
    <Container
      onSubmit={handleRegisterCategory}
      onClick={(event) => event.stopPropagation()}
    >
      <FormGroup>
        <Input
          placeholder="Nome da categoria"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </FormGroup>
      <Button type="submit">
        {credential ? 'Editar' : 'Adicionar'}
      </Button>
    </Container>
  );
}

FormCategory.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  credential: PropTypes.string,
}

FormCategory.defaultProps = {
  credential: '',
}
