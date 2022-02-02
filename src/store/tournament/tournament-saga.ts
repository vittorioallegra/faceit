import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';
import { IRestApi, ITournament } from '../../interfaces';
import * as actions from './tournament-actions';

function* loadTournaments(api: IRestApi, action: ActionType<typeof actions.loadTournamentsRequested>) {
  const { search } = action.payload;

  try {
    const tournaments: ITournament[] = yield call([api, api.getTournaments], search);

    yield put(actions.loadTournamentsSucceeded(tournaments));
  } catch (e) {
    yield put(actions.loadTournamentsFailed(e));
  }
}

function* createTournament(api: IRestApi, action: ActionType<typeof actions.createTournamentRequested>) {
  const { tournament } = action.payload;

  try {
    yield call([api, api.createTournament], tournament);

    yield put(actions.createTournamentSucceeded());
  } catch (e) {
    yield put(actions.createTournamentFailed(e));
  }
}

function* editTournament(api: IRestApi, action: ActionType<typeof actions.editTournamentRequested>) {
  const { tournament } = action.payload;

  try {
    yield call([api, api.editTournament], tournament);

    yield put(actions.editTournamentSucceeded());
  } catch (e) {
    yield put(actions.editTournamentFailed(e));
  }
}

function* deleteTournament(api: IRestApi, action: ActionType<typeof actions.deleteTournamentRequested>) {
  const { tournament } = action.payload;

  try {
    yield call([api, api.deleteTournament], tournament);

    yield put(actions.editTournamentSucceeded());
  } catch (e) {
    yield put(actions.editTournamentFailed(e));
  }
}

export default function* tournamentSaga(api: IRestApi) {
  yield takeLatest(getType(actions.loadTournamentsRequested), loadTournaments, api);
  yield takeLatest(getType(actions.createTournamentRequested), createTournament, api);
  yield takeLatest(getType(actions.editTournamentRequested), editTournament, api);
  yield takeLatest(getType(actions.deleteTournamentRequested), deleteTournament, api);
}
