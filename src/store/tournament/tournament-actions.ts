import { createAction } from 'typesafe-actions';
import { ITournament } from '../../interfaces';

const LOAD_TOURNAMENTS_REQUESTED = 'LOAD TOURNAMENTS REQUESTED';
export const loadTournamentsRequested = createAction(LOAD_TOURNAMENTS_REQUESTED, (search?: string) => ({
  search
}))();

const LOAD_TOURNAMENTS_SUCCEEDED = 'LOAD TOURNAMENTS SUCCEEDED';
export const loadTournamentsSucceeded = createAction(LOAD_TOURNAMENTS_SUCCEEDED, (tournaments: ITournament[]) => ({
  tournaments
}))();

const LOAD_TOURNAMENTS_FAILED = 'LOAD TOURNAMENTS FAILED';
export const loadTournamentsFailed = createAction(LOAD_TOURNAMENTS_FAILED, (err: any) => err)();
