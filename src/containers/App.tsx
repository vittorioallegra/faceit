import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import GlobalStyle from '../GlobalStyle';
import { IApplicationStore } from '../interfaces';
import Home from './Home/Home';

interface IProps {
  store: Store<IApplicationStore>;
}

const App: React.FC<IProps> = props => (
  <Provider store={props.store}>
    <GlobalStyle />
    <Home />
  </Provider>
);

export default App;
