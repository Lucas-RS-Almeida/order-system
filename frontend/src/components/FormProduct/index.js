import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import { FaImage } from 'react-icons/fa';

import { Container } from './styles';

import Input from '../Input';
import FormGroup from '../FormGroup';
import Button from '../Button';

import api from '../../services/api';

export default function FormCategory({ handleSubmit }) {
  const [categories, setCategories] = useState([]);

  const [file, setFile] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description , setDescription] = useState('');
  const [categoryId , setCategoryId] = useState('');
  const [preview, setPreview] = useState({});

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    }

    loadCategories();
  }, []);

  async function handleRegisterProduct(event) {
    event.preventDefault();

    if (!file || !name || !price || !description || !categoryId) {
      return toast.warning("Todos os campos são obrigátorios");
    }

    const data = new FormData();

    data.append('file', file);
    data.append('name', name);
    data.append('price', price);
    data.append('description', description);
    data.append('category_id', categoryId);

    await handleSubmit(data);
  }

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <Container
      onSubmit={handleRegisterProduct}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="groupTop">
        <label
          htmlFor="file"
          style={
            Object.values(preview).length > 0
              ? {
                backgroundImage: `url(${preview})`
              } : {
                backgroundColor: '#1D1D2E',
              }
          }
        >
          <div className="overlay">
            <FaImage />
          </div>
        </label>
        <input type="file" id="file" onChange={handleChangeFile} />

        <FormGroup>
          <Input
            placeholder="Nome do produto"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FormGroup>
      </div>

      <div className="groupMiddle">
        <Input
          placeholder="Preço"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option>Selecione a categoria</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="groupBottom">
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <Button type="submit">
        <span>Adicionar</span>
      </Button>
    </Container>
  );
}

FormCategory.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
