import { ITournamentStore } from './tournament/ITournamentStore';

export interface IApplicationStore {
  tournament: ITournamentStore;
}
