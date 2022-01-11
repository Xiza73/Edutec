import { UserDAO } from "../dao/userDAO";

export class UserService {
  private userDAO: UserDAO;

  constructor() {
    this.userDAO = new UserDAO();
  }

  public getUsers = async () => {
    return await this.userDAO.getUsers();
  };
  
  public getUsersByRole = async (body: any) => {
    return await this.userDAO.getUsersByRole(body);
  };
  
  public getUser = async (body: any) => {
    return await this.userDAO.getUser(body);
  };
  
  public updateUser = async (body: any) => {
    return await this.userDAO.updateUser(body);
  };
  
  public deleteUser = async (body: any) => {
    return await this.userDAO.deleteUser(body);
  };
}
