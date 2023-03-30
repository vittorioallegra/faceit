import { ICreateTournament, IRestApi, ITournament } from '../interfaces';
import { ApiConstants } from '../utils';
import { Rest } from '../utils/Rest';

export class RestApi implements IRestApi {
  async getTournaments(search?: string): Promise<ITournament[]> {
    return Rest.getRequest(ApiConstants.getTournaments(search).toString());
  }

  async createTournament(tournament: ICreateTournament): Promise<ITournament> {
    return Rest.postRequest(ApiConstants.getTournaments().toString(), tournament);
  }

  async editTournament(tournament: ITournament): Promise<void> {
    return Rest.patchRequest(ApiConstants.getTournament(tournament.id).toString(), tournament);
  }

  async deleteTournament(tournament: ITournament): Promise<void> {
    return Rest.deleteRequest(ApiConstants.getTournament(tournament.id).toString());
  }
}
