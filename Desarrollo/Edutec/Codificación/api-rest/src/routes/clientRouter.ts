import { Router } from "express";
import { ClientController } from "../controller/clientController";

export class ClientRouter {
  private readonly _router: Router = Router() ;
  private readonly _controller: ClientController;

  constructor() {
    this._router = Router()
    this._controller = new ClientController()
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.get('/', this._controller.getUserProfile);
    this._router.get('/id/', this._controller.getUserProfileId);
    this._router.post('/', this._controller.updateUserProfile);
    this._router.post('/id/', this._controller.updateUserProfileId);
  }
}
