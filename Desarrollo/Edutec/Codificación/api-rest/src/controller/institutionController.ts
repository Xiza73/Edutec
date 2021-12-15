import { NextFunction, Request, Response } from "express";
import { InstitutionService } from "../service/institutionService";

export class InstitutionController {
  private institutionService: InstitutionService;

  constructor() {
    this.institutionService = new InstitutionService();
  }

  public addInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.institutionService.addInstitution(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public readInstitutions = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.institutionService.readInstitutions();

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

}
