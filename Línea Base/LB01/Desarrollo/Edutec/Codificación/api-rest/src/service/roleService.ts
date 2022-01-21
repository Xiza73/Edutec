import { RoleDAO } from '../dao/roleDAO';

export class RoleService {
  private roleDAO: RoleDAO;

  constructor() {
    this.roleDAO = new RoleDAO();
  }

  public addRole = async (description: string) => {
    return await this.roleDAO.addRole(description);
  };

  public readRoles = async () => {
    return await this.roleDAO.readRoles()
  };
}
