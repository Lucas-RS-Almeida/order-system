import { useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Context } from './contexts/AuthContext';

import CanAuthRoutes from './utils/canAuthRoutes';
import CanGuestsRoutes from './utils/canGuestsRoutes';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Categories from './pages/Categories';
import Products from './pages/Products';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Loader from './components/Loader';
import Header from './components/Header';

export default function CustomRoutes() {
  const { isAuthenticated, isLoading } = useContext(Context);

  return (
    <>
      <Loader isLoading={isLoading} />

      {isAuthenticated && (
        <Header />
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Home />
              : <SignIn />
          }
        />
        <Route
          path="/auth/sign-up"
          element={(
            <CanGuestsRoutes isAuthenticated={isAuthenticated}>
              <SignUp />
            </CanGuestsRoutes>
          )}
        />
        <Route
          path="/forgot-password"
          element={(
            <CanGuestsRoutes isAuthenticated={isAuthenticated}>
              <ForgotPassword />
            </CanGuestsRoutes>
          )}
        />
        <Route
          path="/reset-password/:email"
          element={(
            <CanGuestsRoutes isAuthenticated={isAuthenticated}>
              <ResetPassword />
            </CanGuestsRoutes>
          )}
        />
        <Route
          path="/categories"
          element={
            <CanAuthRoutes isAuthenticated={isAuthenticated}>
              <Categories />
            </CanAuthRoutes>
          }
        />
        <Route
          path="/products"
          element={
            <CanAuthRoutes isAuthenticated={isAuthenticated}>
              <Products />
            </CanAuthRoutes>
          }
        />
      </Routes>
    </>
  );
}
