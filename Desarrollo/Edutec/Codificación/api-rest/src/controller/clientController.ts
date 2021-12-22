import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();

  }
  
  public addFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.clientService.addFavorite(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };

  public removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
    const response = await this.clientService.removeFavorite(req.body);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}