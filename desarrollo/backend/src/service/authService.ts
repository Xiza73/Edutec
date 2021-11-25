import { AuthDAO } from "../dao/authDAO";

export class AuthService {
    private authDAO: AuthDAO;

  constructor() {
    this.authDAO = new AuthDAO();
  }

  public signIn = async (request: any) => {
    return await this.authDAO.signIn(request);
  };

  public signUp = async (request: any) => {
      return await this.authDAO.signUp(request)
  };
  public async logout() {
    return await this.authDAO.logout()
  }
}
