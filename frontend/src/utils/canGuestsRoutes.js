import { Navigate } from 'react-router-dom';

export default function canGuestsRoutes({ isAuthenticated, children }) {
  return !isAuthenticated ? children : <Navigate to="/" replace />
}
