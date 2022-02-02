import { ITournament } from '..';

export interface IRestApi {
  getTournaments: (search?: string) => Promise<ITournament[]>;
}
