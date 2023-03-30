import { GlobalStyle } from './GlobalStyle';
import { i18n, store } from './config';
import { Home } from './pages';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

export const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <GlobalStyle />
      <Home />
    </Provider>
  </I18nextProvider>
);
