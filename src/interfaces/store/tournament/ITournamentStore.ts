import { ITournament } from '../..';

export interface ITournamentStore {
  tournaments: ITournament[];

  isLoading: boolean;
  hasError: boolean;
}
