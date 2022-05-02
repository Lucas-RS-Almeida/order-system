import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { FaTrash } from 'react-icons/fa';

import { Container } from './styles';

import api from '../../services/api';

import Loader from '../../components/Loader';
import ButtonAdd from '../../components/ButtonAdd';
import Modal from '../../components/Modal';
import FormProduct from '../../components/FormProduct';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [modalCreateIsVisible, setModalCreateIsVisible] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);

        const response = await api.get('/products');

        setProducts(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [refresh]);

  async function handleRegisterProduct(data) {
    const token = JSON.parse(localStorage.getItem('@ordersystem.token')) || '';

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    let json = null;

    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      json = await response.json();
    }

    if (response.ok) {
      setRefresh(!refresh);
      setModalCreateIsVisible(false);

      return toast.success('Produto criado com sucesso');
    }

    toast.error(json.error || `${response.status} - ${response.statusText}`);
  }

  async function handleDeleteOrder(item) {
    try {
      await api.delete(`/products/${item.id}`);

      toast.success(`Produto "${item.name}" deletado com sucesso!`);

      setRefresh(!refresh);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <header>
        <h1>Produtos</h1>
      </header>

      <ul>
        {products.length === 0 && (
          <li style={{ padding: '12px 24px', fontWeight: 'bold', color: '#FFF',}}>
            <span>Você não tem nenhum produto cadastrado.</span>
          </li>
        )}

        {products.map((product) => (
          <li key={product.id}>
            <div className="box-content">
              <img src={product.banner_url} alt={product.name} />

              <div className="content">
                <span>{product.name}</span>
                <span>R$ {Number(product.price).toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="actions">
              <button
                type="button"
                onClick={() => handleDeleteOrder(product)}
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
        <FormProduct
          handleSubmit={handleRegisterProduct}
        />
      </Modal>
    </Container>
  );
}
