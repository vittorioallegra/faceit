import { createAction } from 'typesafe-actions';
import { ICreateTournament, ITournament } from '../../interfaces';

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

const CREATE_TOURNAMENT_REQUESTED = 'CREATE TOURNAMENT REQUESTED';
export const createTournamentRequested = createAction(CREATE_TOURNAMENT_REQUESTED, (tournament: ICreateTournament) => ({
  tournament
}))();

const CREATE_TOURNAMENT_SUCCEEDED = 'CREATE TOURNAMENT SUCCEEDED';
export const createTournamentSucceeded = createAction(CREATE_TOURNAMENT_SUCCEEDED)();

const CREATE_TOURNAMENT_FAILED = 'CREATE TOURNAMENT FAILED';
export const createTournamentFailed = createAction(CREATE_TOURNAMENT_FAILED, (err: any) => err)();

const EDIT_TOURNAMENT_REQUESTED = 'EDIT TOURNAMENT REQUESTED';
export const editTournamentRequested = createAction(EDIT_TOURNAMENT_REQUESTED, (tournament: ITournament) => ({
  tournament
}))();

const EDIT_TOURNAMENT_SUCCEEDED = 'EDIT TOURNAMENT SUCCEEDED';
export const editTournamentSucceeded = createAction(EDIT_TOURNAMENT_SUCCEEDED)();

const EDIT_TOURNAMENT_FAILED = 'EDIT TOURNAMENT FAILED';
export const editTournamentFailed = createAction(EDIT_TOURNAMENT_FAILED, (err: any) => err)();

const DELETE_TOURNAMENT_REQUESTED = 'DELETE TOURNAMENT REQUESTED';
export const deleteTournamentRequested = createAction(DELETE_TOURNAMENT_REQUESTED, (tournament: ITournament) => ({
  tournament
}))();

const DELETE_TOURNAMENT_SUCCEEDED = 'DELETE TOURNAMENT SUCCEEDED';
export const deleteTournamentSucceeded = createAction(DELETE_TOURNAMENT_SUCCEEDED)();

const DELETE_TOURNAMENT_FAILED = 'DELETE TOURNAMENT FAILED';
export const deleteTournamentFailed = createAction(DELETE_TOURNAMENT_FAILED, (err: any) => err)();
