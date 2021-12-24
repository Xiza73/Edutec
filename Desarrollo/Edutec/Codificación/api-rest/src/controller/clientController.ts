import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/clientService";

export class ClientController {
  private clientController: ClientService;

  constructor() {
    this.clientController = new ClientService();
  }

  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.query;
    const response = await this.clientController.getUserProfile(username);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public getUserProfileId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const response = await this.clientController.getUserProfileId(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.clientController.updateUserProfile(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
  
  public updateUserProfileId = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.clientController.updateUserProfileId(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}
