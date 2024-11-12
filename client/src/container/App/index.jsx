import { Router, store, SocketProvider } from '..';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import theme from '../../theme';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <SocketProvider>
          <Router />
        </SocketProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
