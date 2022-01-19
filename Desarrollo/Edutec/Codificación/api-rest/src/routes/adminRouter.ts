import { Router } from "express";
import { AdminController } from "../controller/adminController";

export class AdminRouter {
  private readonly _router: Router;
  private readonly _controller: AdminController;

  constructor() {
    this._router = Router();
    this._controller = new AdminController()
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.get('/profile/id/', this._controller.getUserProfileId);
  }
}
