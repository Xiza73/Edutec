import { NextFunction, Request, Response } from "express";
import { ClientService } from "../service/clientService";

export class ClientController {
  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();

  }

  public readClient = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.clientService.readClient(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
  
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

  public readFavorites = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const response = await this.clientService.readFavorites(id);

    if (response.statusCode === 200) return res.status(200).json(response);
    next(response);
    return;
  };
}