import ErrorHandler from "../helpers/ErrorHandler";
import ResponseData from "../helpers/ResponseData";
import User, { IUser } from "../models/User";
import Admin, { IAdmin } from "../models/Admin";


export class AdminDAO {
  constructor() {}

  public getUserProfileId = async (id: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const admin: (IAdmin & { _id: any }) | null = await Admin.findOne({
        _id: user.person._id,
      });
      if (!admin)
        return new ErrorHandler(400, "Datos de administrador no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        username: user.username,
        email: admin.email
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

}
