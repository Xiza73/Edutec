import { Router } from "express";
import { ClientController } from "../controller/clientController";

export class ClientRouter {
  private readonly _router: Router = Router();
  private readonly _controller: ClientController = new ClientController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post('/favorites/add', this._controller.addFavorite);
    this._router.post('/favorites/remove', this._controller.removeFavorite);
  }
}
