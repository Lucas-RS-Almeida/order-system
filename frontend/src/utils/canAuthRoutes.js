import { Navigate } from 'react-router-dom';

export default function canAuthRoutes({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" replace />
}
