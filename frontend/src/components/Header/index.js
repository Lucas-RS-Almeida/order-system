import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';

import { Container } from './styles';

import { FaSignOutAlt } from 'react-icons/fa';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  const [itemNameSelected, setItemNameSeleted] = useState('Home');

  const { onSignOut } = useContext(Context);

  function handleToggleItemNameSelected(name) {
    setItemNameSeleted(name);
  }

  return (
    <Container>
      <img src={logo} alt="Order System" />

      <nav>
        <ul>
          <li
            onClick={() => handleToggleItemNameSelected('Home')}
            style={{color: itemNameSelected === 'Home' ? '#FF3F4B' : '#FFF'}}
          >
              <Link to="/">
                Home
              </Link>
          </li>
          <li
            onClick={() => handleToggleItemNameSelected('Categories')}
            style={{color: itemNameSelected === 'Categories' ? '#FF3F4B' : '#FFF'}}
          >
              <Link to="/categories">
                Categorias
              </Link>
          </li>
          <li
            onClick={() => handleToggleItemNameSelected('Products')}
            style={{color: itemNameSelected === 'Products' ? '#FF3F4B' : '#FFF'}}
          >
              <Link to="/products">
                Produtos
              </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onSignOut}
            >
              <FaSignOutAlt size={25} color="#FFF" />
            </button>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
