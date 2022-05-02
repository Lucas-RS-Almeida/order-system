import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';

import AuthProvider from './contexts/AuthContext';

import Routes from './routes';

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="#101026"
        barStyle="light-content"
        translucent={false}
      />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
