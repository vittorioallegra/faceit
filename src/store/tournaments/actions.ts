import { ICreateTournament, ITournament } from '../../interfaces';
import { createAction } from 'typesafe-actions';

export const fetchTournaments = createAction('tournaments.fetch-tournaments', (search?: string) => ({ search }))();
export const fetchTournamentsSucceeded = createAction(
  'tournaments.fetch-tournaments.succeeded',
  (tournaments: ITournament[]) => tournaments
)();
export const fetchTournamentsFailed = createAction('tournaments.fetch-tournaments.failed', (err: Error) => err)();

export const createTournament = createAction(
  'tournaments.create-tournament',
  (tournament: ICreateTournament) => tournament
)();
export const createTournamentSucceeded = createAction(
  'tournaments.create-tournament.succeeded',
  (tournament: ITournament) => tournament
)();
export const createTournamentFailed = createAction('tournaments.create-tournament.failed', (err: Error) => err)();

export const editTournament = createAction('tournaments.edit-tournament', (tournament: ITournament, name: string) => ({
  tournament,
  name,
}))();
export const editTournamentFailed = createAction(
  'tournaments.edit-tournament.failed',
  (tournament: ITournament) => tournament
)();

export const deleteTournament = createAction(
  'tournaments.delete-tournament',
  (tournament: ITournament, index: number) => ({ tournament, index })
)();
export const deleteTournamentFailed = createAction(
  'tournaments.delete-tournament.failed',
  (tournament: ITournament, index: number) => ({ tournament, index })
)();
