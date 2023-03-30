import { IApplicationStore } from '../../interfaces';
import { ITournamentsState } from './types';

export const selectTournaments = (state: IApplicationStore): ITournamentsState => state.tournaments;
