import { Router, Request, Response } from 'express'
import { AuthRouter } from './routes/authRouter'
import { ClientRouter } from './routes/clientRouter';
import { CourseRouter } from './routes/courseRouter';
import { InstitutionRouter } from './routes/institutionRouter';
import { PrivateRouter } from './routes/privateRouter'
import { RoleRouter } from './routes/rolesRouter';

export class Routes {
  private readonly _router: Router = Router();
  private readonly _authRoute: AuthRouter = new AuthRouter();
  private readonly _privateRoute: PrivateRouter = new PrivateRouter();
  private readonly _roleRoute: RoleRouter = new RoleRouter();
  private readonly _institutionRoute: InstitutionRouter = new InstitutionRouter();
  private readonly _courseRoute: CourseRouter = new CourseRouter();
  private readonly _clientRoute: ClientRouter = new ClientRouter();

  constructor () {
    this._configure()
  }

  get router (): Router {
    return this._router
  }

  private _configure (): void {
    /*this._router.get('/', (req: Request, res: Response) => { 
      res.json({ 
        msg: 'API works!' 
      }) 
    })*/
    this._router.use('/api', this._authRoute.router);
    this._router.use('/api', this._privateRoute.router);
    this._router.use('/api/role', this._roleRoute.router);
    this._router.use('/api/institution', this._institutionRoute.router);
    this._router.use('/api/course', this._courseRoute.router);
    this._router.use('/api/client', this._clientRoute.router);
  }
}
