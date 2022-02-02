import { IRestApi, ITournament } from '../interfaces';
import { ApiConstants } from '../utils';
import { Rest } from '../utils/Rest';

export class RestApi implements IRestApi {
  async getTournaments(search?: string): Promise<ITournament[]> {
    return Rest.getRequest(ApiConstants.getTournaments(search).toString());
  }
}
