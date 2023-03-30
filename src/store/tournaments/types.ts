import { FetchStatus } from '../../enums';
import { ITournament } from '../../interfaces';

export interface ITournamentsState {
  tournaments: ITournament[];
  status: FetchStatus;
}
