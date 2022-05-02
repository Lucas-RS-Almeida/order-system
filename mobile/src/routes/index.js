import { useContext } from 'react';

import { Context } from '../contexts/AuthContext';

import CanAuth from './canAuth';
import CanGuests from './canGuests';

export default function Routes() {
  const { isAuthenticated } = useContext(Context);

  return isAuthenticated ? <CanAuth /> : <CanGuests />
}
