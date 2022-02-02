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
      return { ...state, isLoading: true, hasError: false };
    case getType(actions.loadTournamentsSucceeded):
      return { ...state, isLoading: false, hasError: false, tournaments: action.payload.tournaments };
    case getType(actions.loadTournamentsFailed):
      return { ...state, isLoading: false, hasError: true };
    default:
      return state;
  }
}
