import { all, getContext, call } from 'redux-saga/effects';
import { IRestApi } from '../interfaces';
import tournamentSaga from './tournament/tournament-saga';

export default function* rootSaga() {
  const restApi: IRestApi = yield getContext('restApi');
  const effects = [call(tournamentSaga, restApi)];
  yield all(effects);
}
