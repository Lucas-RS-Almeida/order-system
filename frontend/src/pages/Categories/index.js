import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { FaEdit, FaTrash } from 'react-icons/fa';

import { Container, Header } from './styles';

import api from '../../services/api';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ButtonAdd from '../../components/ButtonAdd';
import FormCategory from '../../components/FormCategory';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [modalCreateIsVisible, setModalCreateIsVisible] = useState(false);
  const [modalEditIsVisible, setModalEditIsVisible] = useState(false);

  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);

        const response = await api.get('/categories');

        setCategories(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, [refresh]);

  async function handleRegisterCategory(name) {
    if (!name) {
      return toast.warning("Nome é obrigátorio");
    }

    try {
      await api.post('/categories', { name });

      toast.success('Categoria adicionada com sucesso');

      setRefresh(!refresh);
      setModalCreateIsVisible(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  function handleOpenModalEdit(category) {
    setCredentials(category);
    setModalEditIsVisible(true);
  }

  async function handleEditCategory(name) {
    try {
      await api.put(`/categories/${credentials.id}`, { name });

      toast.success(`Categoria "${credentials.name}" editada para "${name}".`);

      setRefresh(!refresh);
      setCredentials({});
      setModalEditIsVisible(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  async function handleDeleteCategory(category) {
    try {
      await api.delete(`/categories/${category.id}`);

      toast.success(`Categoria "${category.name}" deletada com sucesso!`);

      setRefresh(!refresh);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Header>
        <h1>Categorias</h1>
      </Header>

      <ul>
        {categories.length === 0 && (
          <li>
            <span>Você não tem nenhuma categoria cadastrada</span>
          </li>
        )}

        {categories.map((category) => (
          <li key={category.id}>
            <div className="bar" />
            <span>{category.name}</span>

            <div className="actions">
              <button
                type="button"
                onClick={() => handleOpenModalEdit(category)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategory(category)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ButtonAdd
        onClick={() => setModalCreateIsVisible(true)}
      >
        <span>+</span>
      </ButtonAdd>

      <Modal
        visible={modalCreateIsVisible}
        closeFunction={() => setModalCreateIsVisible(false)}
      >
        <FormCategory
          handleSubmit={handleRegisterCategory}
        />
      </Modal>

      <Modal
        visible={modalEditIsVisible}
        closeFunction={() => setModalEditIsVisible(false)}
      >
        <FormCategory
          handleSubmit={handleEditCategory}
          credential={credentials.name}
        />
      </Modal>
    </Container>
  );
}
