import { AdminDAO } from "../dao/adminDAO";

export class AdminService {
  private adminDAO: AdminDAO;

  constructor() {
    this.adminDAO = new AdminDAO();
  }

  public getUserProfileId = async (id: any) => {
    return await this.adminDAO.getUserProfileId(id);
  };
}
