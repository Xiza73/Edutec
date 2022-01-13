import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import User, { IUser } from "../models/User";
import Client, { IClient } from "../models/Client";

export class UserDAO {
  constructor() {}

  public getUsers = async () => {
    try {
      const data = await User.find()
        .populate({
          path: "person",
        })
        .populate("role");
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public getUsersByRole = async (body: any) => {
    try {
      const { role } = body;
      if (!role) return new ErrorHandler(400, "Error al leer la data");
      const data = await User.find({ role })
        .populate({
          path: "person",
        })
        .populate("role");
      if (!data || data.length === 0)
        return new ErrorHandler(400, "No existen registros");
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuarios");
    }
  };

  public getUser = async (body: any) => {
    try {
      const { id } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const data = await User.findById(id)
        .populate({
          path: "person",
        })
        .populate("role");
      if (!data) return new ErrorHandler(400, "No existe el usuario");
      return new ResponseData(200, "Usuarios obtenidos correctamente", data);
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUser = async (body: any) => {
    try {
      const { id, username, role, name, description } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      const user = await User.findByIdAndUpdate(id, {
        username,
        role,
      });
      await Client.findByIdAndUpdate(user?.person._id, {
        name,
        description,
      });
      return new ResponseBase(200, "Usuario actualizado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al actualizar datos de usuario");
    }
  };

  public deleteUser = async (body: any) => {
    try {
      const { id } = body;
      if (!id) return new ErrorHandler(400, "Error al leer la data");
      await User.findByIdAndUpdate(id, { status: 0 });
      return new ResponseBase(200, "Usuario eliminado correctamente");
    } catch (error) {
      console.log(error);
      return new ErrorHandler(404, "Error al elimnar usuario");
    }
  };
}
