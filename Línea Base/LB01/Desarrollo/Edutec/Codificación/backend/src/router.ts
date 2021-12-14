import { Router, Request, Response } from 'express'
import { AuthRouter } from './routes/authRouter'
import { PrivateRouter } from './routes/privateRouter'
import { RoleRouter } from './routes/rolesRouter';

export class Routes {
  private readonly _router: Router = Router()
  private readonly _authRoute: AuthRouter = new AuthRouter()
  private readonly _privateRoute: PrivateRouter = new PrivateRouter()
  private readonly _roleRoute: RoleRouter = new RoleRouter()

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
    this._router.use('/api', this._authRoute.router)
    this._router.use('/api', this._privateRoute.router)
    this._router.use('/api/role', this._roleRoute.router)
  }
}
