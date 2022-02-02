import { ICreateTournament, ITournament } from '..';

export interface IRestApi {
  getTournaments: (search?: string) => Promise<ITournament[]>;
  createTournament: (tournament: ICreateTournament) => Promise<void>;
  editTournament: (tournament: ITournament) => Promise<void>;
  deleteTournament: (tournament: ITournament) => Promise<void>;
}
