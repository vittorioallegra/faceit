import { combineReducers } from 'redux';
import { IApplicationStore } from '../interfaces';
import tournamentReducer from './tournament/tournament-reducer';

const rootReducer = combineReducers<IApplicationStore>({
  tournament: tournamentReducer
});

export default rootReducer;
