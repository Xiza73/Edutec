import { Router } from "express";
import { RoleController } from "../controller/roleController";

export class RoleRouter {
  private readonly _router: Router = Router();
  private readonly _controller: RoleController = new RoleController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post('/', this._controller.addRole);
    this._router.get('/', this._controller.readRoles);
  }
}
