import { ClientDAO } from "../dao/clientDAO";

export class ClientService {
  private clientDAO: ClientDAO;

  constructor() {
    this.clientDAO = new ClientDAO();
  }

  public readClient = async (id: string) => {
    return await this.clientDAO.readClient(id);
  };

  public addFavorite = async (body: any) => {
    return await this.clientDAO.addFavorite(body);
  }

  public removeFavorite = async (body: any) => {
    return await this.clientDAO.removeFavorite(body);
  }

  public readFavorites = async (id: string) => {
    return await this.clientDAO.readFavorites(id);
  }
}