import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { FiX } from 'react-icons/fi';

import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { Container, Order } from './styles';

import Loader from '../Loader';

import api from '../../services/api';

export default function ModalOrder({ order, setModal, onConcludeOrder }) {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await api.get(`/items/${order.id}`);

        setItems(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      } finally {
        setIsLoading(false);
      }
    }

    loadItems();
  }, [order]);

  const total = Object.values(items).length > 0 && items.reduce((acumulator, item) => {
    return acumulator += Number(item.product.price) * item.amount;
  }, 0);

  return ReactDOM.createPortal(
    <Container>
      <Loader isLoading={isLoading} />

      <Order>
        <header>
          <h2>Mesa {order.table < 10 ? `0${order.table}` : order.table}</h2>
          <button
            type="button"
            onClick={() => setModal(false)}
          >
            <FiX size={35} color="#FF3F4B" />
          </button>
        </header>

        {Object.values(items).length > 0 && (
          <>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <span>( {item.amount}x ) - {item.product.name}</span>
                  <span>R$ {Number(item.product.price).toFixed(2).replace('.', ',')}</span>
                </li>
              ))}
            </ul>

            <div className="total">
              <strong>Total</strong>
              <span>R$ {Number(total).toFixed(2).replace('.', ',')}</span>
            </div>
          </>
        )}

        <div className="box-button-conclude">
          <button
            type="button"
            onClick={() => onConcludeOrder(order.id)}
          >
            Concluir pedido
          </button>
        </div>
      </Order>
    </Container>,
    document.getElementById('modal-order-root')
  )
}

ModalOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    table: PropTypes.number.isRequired,
  }),
  setModal: PropTypes.func.isRequired,
  onConcludeOrder: PropTypes.func.isRequired,
}
