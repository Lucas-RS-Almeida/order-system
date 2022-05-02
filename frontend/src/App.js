import { ThemeProvider } from 'styled-components';

import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './assets/styles/globa';
import defaultTheme from './assets/styles/theme/default';

import AuthProvider from './contexts/AuthContext';

import CustomRoutes from './routes';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme} >
      <ToastContainer autoClose={3000} />
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <CustomRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
