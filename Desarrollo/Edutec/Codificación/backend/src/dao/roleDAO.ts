import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import Role, { IRole } from "../models/Role";
import ResponseData from '../helpers/ResponseData';

export class RoleDAO {
  constructor() {}

  public addRole = async (description: string) => {
    try {
      const role: IRole = new Role({ description });
      await role.save();
      return new ResponseBase(200, "Rol creado correctamente");
    } catch (err) {
      return new ErrorHandler(404, "Error al crear rol");
    }
  };

  public readRoles = async () => {
    try {
      const data = await Role.find();
      return new ResponseData(200, 'Roles obtenidos correctamente', data);
    } catch (err) {
      return new ErrorHandler(404, 'Error al obtener roles');
    }
  };
}
