import { ActionType, getType } from 'typesafe-actions';
import { ITournamentStore } from '../../interfaces';
import * as actions from './tournament-actions';

const initialState: ITournamentStore = {
  tournaments: [],
  isLoading: false,
  hasError: false
};

export default function tournamentReducer(state: ITournamentStore = initialState, action: ActionType<typeof actions>) {
  switch (action.type) {
    case getType(actions.loadTournamentsRequested):
    case getType(actions.createTournamentRequested):
    case getType(actions.editTournamentRequested):
    case getType(actions.deleteTournamentRequested):
      return { ...state, isLoading: true, hasError: false };
    case getType(actions.loadTournamentsSucceeded):
      return { ...state, isLoading: false, hasError: false, tournaments: action.payload.tournaments };
    case getType(actions.createTournamentSucceeded):
    case getType(actions.editTournamentSucceeded):
    case getType(actions.deleteTournamentSucceeded):
      return { ...state, isLoading: false, hasError: false };
    case getType(actions.loadTournamentsFailed):
    case getType(actions.createTournamentFailed):
    case getType(actions.editTournamentFailed):
    case getType(actions.deleteTournamentFailed):
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
}
