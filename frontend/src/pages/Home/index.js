import { useState, useEffect, useContext } from 'react';

import { toast } from 'react-toastify';

import { io } from 'socket.io-client';

import { Context } from '../../contexts/AuthContext';

import { Container, Header } from './styles';

import api from '../../services/api';

import Loader from '../../components/Loader';
import ModalOrder from '../../components/ModalOrder';

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [modal, setModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState({});
  const [tableUpdated, setTableUpdated] = useState([]);
  const [socket, setSocket] = useState(null);

  const { user } = useContext(Context);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await api.get('/orders');

        setOrders(response.data);
      } catch (error) {
        console.log(error?.response?.data?.error);
      } finally {
        setIsloading(false);
      }
    }

    loadOrders();
  }, [refresh]);

  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  }, []);

  useEffect(() => {
    socket?.emit('newUser', user.email);
  }, [socket, user]);

  useEffect(() => {
    socket?.on('getNotification', (data) => {
      setNotifications((prevState) => prevState + 1);
      setRefresh((prevState) => prevState === false ? true : false);
      toast.success(data.message);

      if (data.table) {
        setTableUpdated((prevState) => [
          ...prevState,
          data.table,
        ]);
      }
    });
  }, [socket]);

  function handleSelectOrder(order, table) {
    setOrderSelected(order);
    setModal(true);
    removeNotification(table);
  }

  async function handleConcludeOrder(id) {
    try {
      setIsloading(true);

      await api.put(`/orders/conclude/${id}`);

      toast.success('Pedido concluido com sucesso!');

      setRefresh((prevState) => !prevState);
      setModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setIsloading(false);
    }
  }

  function removeNotification(numberOfTable) {
    setTableUpdated((prevState) =>
      prevState.filter((item) => item !== numberOfTable)
    );

    setNotifications((prevState) => prevState > 0 ? prevState - 1 : 0);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {(modal && orderSelected) && (
        <ModalOrder
          order={orderSelected}
          setModal={setModal}
          onConcludeOrder={handleConcludeOrder}
        />
      )}

      <Header>
        <h1>Pedidos</h1>

        {notifications > 0 && (
          <div className="notifications">
            <span>{notifications}</span>
          </div>
        )}
      </Header>

      <ul>
        {orders.length === 0 && (
          <li>
            <span>Não chegou nenhum pedido ainda</span>
          </li>
        )}

        {orders.map((order) => (
          <li
            key={order.id}
            onClick={() => handleSelectOrder(order, order.table)}
          >
            <div className="bar" />
            <span>Mesa {order.table < 10 ? `0${order.table}`: order.table}</span>
            <div>
              {tableUpdated.length > 0 && tableUpdated.map((tableNumber) => (
                (tableNumber === order.table) && (
                  <span
                    key={`${tableNumber}-${Math.random()}`}
                    className='notification'
                  >
                    Novos items
                  </span>
                )
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
