import { Router } from "express";
import { InstitutionController } from "../controller/institutionController";

export class InstitutionRouter {
  private readonly _router: Router = Router();
  private readonly _controller: InstitutionController = new InstitutionController();

  constructor() {
    this._configure();
  }

  get router(): Router {
    return this._router;
  }

  private _configure(): void {
    this._router.post('/', this._controller.addInstitution);
    this._router.get('/', this._controller.readInstitutions);
  }
}
