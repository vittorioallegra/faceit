import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { IRestApi, ITournament } from '../../interfaces';
import * as actions from './tournament-actions';

function* load(api: IRestApi, action: ActionType<typeof actions.loadTournamentsRequested>) {
  const { search } = action.payload;

  try {
    const tournaments: ITournament[] = yield call([api, api.getTournaments], search);

    yield put(actions.loadTournamentsSucceeded(tournaments));
  } catch (e) {
    yield put(actions.loadTournamentsFailed(e));
  }
}

export default function* tournamentSaga(api: IRestApi) {
  yield takeLatest(getType(actions.loadTournamentsRequested), load, api);
}
