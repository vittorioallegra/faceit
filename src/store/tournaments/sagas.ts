import { IRestApi, ITournament } from '../../interfaces';
import * as actions from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

function* fetchTournaments(api: IRestApi, action: ActionType<typeof actions.fetchTournaments>) {
  const { search } = action.payload;

  try {
    const tournaments: ITournament[] = yield call([api, api.getTournaments], search);

    yield put(actions.fetchTournamentsSucceeded(tournaments));
  } catch (e) {
    yield put(actions.fetchTournamentsFailed(e as Error));
  }
}

function* createTournament(api: IRestApi, action: ActionType<typeof actions.createTournament>) {
  const createTournament = action.payload;

  try {
    const tournament: ITournament = yield call([api, api.createTournament], createTournament);

    yield put(actions.createTournamentSucceeded(tournament));
  } catch (e) {
    yield put(actions.createTournamentFailed(e as Error));
  }
}

function* editTournament(api: IRestApi, action: ActionType<typeof actions.editTournament>) {
  const { tournament, name } = action.payload;

  try {
    yield call([api, api.editTournament], { ...tournament, name });
  } catch (e) {
    yield put(actions.editTournamentFailed(tournament));
  }
}

function* deleteTournament(api: IRestApi, action: ActionType<typeof actions.deleteTournament>) {
  const { tournament, index } = action.payload;

  try {
    yield call([api, api.deleteTournament], tournament);
  } catch (e) {
    yield put(actions.deleteTournamentFailed(tournament, index));
  }
}

export function* tournamentsSaga(api: IRestApi) {
  yield takeLatest(getType(actions.fetchTournaments), fetchTournaments, api);
  yield takeLatest(getType(actions.createTournament), createTournament, api);
  yield takeLatest(getType(actions.editTournament), editTournament, api);
  yield takeLatest(getType(actions.deleteTournament), deleteTournament, api);
}
