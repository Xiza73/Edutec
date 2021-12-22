import { InstitutionDAO } from "../dao/institutionDAO";

export class InstitutionService {
  private institutionDAO: InstitutionDAO;

  constructor() {
    this.institutionDAO = new InstitutionDAO();
  }

  public addInstitution = async (body: any) => {
    return await this.institutionDAO.addInstitution(body);
  };

  public readInstitutions = async () => {
    return await this.institutionDAO.readInstitutions();
  };

  public readInstitution = async (id: string) => {
    return await this.institutionDAO.readInstitution(id);
  };
}
