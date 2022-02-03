import React from 'react';
import ReactDOM from 'react-dom';
import { CombinedState } from 'redux';
import { RestApi } from './api';
import { configureStore } from './store/configureStore';
import { IApplicationStore } from './interfaces';
import App from './containers/App';
import { Localization } from './config';

const i18n = Localization.init('app');
const store = configureStore({} as CombinedState<IApplicationStore>, {
  restApi: new RestApi()
});

ReactDOM.render(
  <React.StrictMode>
    <App i18n={i18n} store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
