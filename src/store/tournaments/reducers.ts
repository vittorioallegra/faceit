import { FetchStatus } from '../../enums';
import * as actions from './actions';
import { ITournamentsState } from './types';
import { ActionType, getType } from 'typesafe-actions';

const initialState: ITournamentsState = {
  tournaments: [],
  status: FetchStatus.IDLE,
};

export function tournamentsReducer(state: ITournamentsState = initialState, action: ActionType<typeof actions>) {
  switch (action.type) {
    case getType(actions.fetchTournaments):
      return { ...state, status: FetchStatus.LOADING };
    case getType(actions.editTournament): {
      const tournament = action.payload;
      return {
        ...state,
        tournaments: state.tournaments.map((it) => (it.id === tournament.id ? tournament : it)),
      };
    }
    case getType(actions.deleteTournament): {
      const tournament = action.payload;
      return {
        ...state,
        tournaments: state.tournaments.filter((it) => it.id !== tournament.id),
      };
    }
    case getType(actions.fetchTournamentsSucceeded):
      return { ...state, status: FetchStatus.SUCCEEDED, tournaments: action.payload };
    case getType(actions.createTournamentSucceeded): {
      const tournament = action.payload;
      return { ...state, status: FetchStatus.SUCCEEDED, tournaments: [tournament, ...state.tournaments] };
    }
    case getType(actions.editTournamentSucceeded):
    case getType(actions.deleteTournamentSucceeded):
      return { ...state, status: FetchStatus.SUCCEEDED };
    case getType(actions.fetchTournamentsFailed):
    case getType(actions.createTournamentFailed):
    case getType(actions.editTournamentFailed):
    case getType(actions.deleteTournamentFailed):
      return { ...state, status: FetchStatus.FAILED };
    default:
      return state;
  }
}
