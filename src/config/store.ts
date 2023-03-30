import { RestApi } from '../api';
import { IApplicationStore } from '../interfaces';
import { tournamentsReducer, tournamentsSaga } from '../store';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { all, call } from 'redux-saga/effects';

const rootReducer = combineReducers<IApplicationStore>({
  tournaments: tournamentsReducer,
});

function* rootSaga() {
  const restApi = new RestApi();
  const effects = [call(tournamentsSaga, restApi)];
  yield all(effects);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga as Saga);

export { store };
