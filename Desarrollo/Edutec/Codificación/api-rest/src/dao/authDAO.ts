import User, { IUser, encryptPassword } from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config/config";
import ErrorHandler from "../helpers/ErrorHandler";
import Client, { IClient } from "../models/Client";
import ResponseBase from "../helpers/ResponseBase";
import Role from "../models/Role";
import { IRole } from "../models/Role";
import ResponseData from "../helpers/ResponseData";
import Admin, { IAdmin } from "../models/Admin";

export class ResponseLogin {
  constructor(
    public statusCode: number,
    public message: string,
    public token: string
  ) {}
}

export class AuthDAO {
  constructor() {}

  private createToken = (user: IUser) => {
    return jwt.sign(
      {
        id: user._id,
        username: user.username,
        personId: user.person._id,
        role: user.role,
      },
      config.jwtSecret,
      {
        expiresIn: "1h", //un día: 86400
      }
    );
  };

  public signIn = async (request: any) => {
    try {
      const { username, email, password } = request;

      let user: (IUser & { _id: any }) | null = null;

      if (username && password) {
        user = await User.findOne({
          username,
        });
      } else if (email && password) {
        const client: (IClient & { _id: any }) | null = await Client.findOne(
          { email },
          { _id: 1 }
        ).exec();
        if (client)
          user = await User.findOne({
            person: client._id,
          });
      } else {
        return new ErrorHandler(400, "Faltan datos");
      }

      if (!user)
        return new ErrorHandler(422, "El usuario no se encuentra registrado");

      const match = await user.comparePassword(password);
      if (match) {
        return new ResponseLogin(
          200,
          "Bienvenido al sistema",
          this.createToken(user)
        );
      }

      return new ErrorHandler(422, "Correo y/o contraseña incorrectas");
    } catch (err) {
      return new ErrorHandler(400, "Error al iniciar sesión");
    }
  };

  public createUser = async (request: any) => {
    //register for admins
    const { username, roleId, password, name, email, description } = request;
    try {
      if (!username || !email || !password || !roleId || !name)
        return new ErrorHandler(400, "Faltan datos");

      const user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (user) {
        return new ErrorHandler(422, "El usuario ya está registrado");
      }

      const role: (IRole & { _id: any }) | null = await Role.findById(
        roleId
      ).exec();

      if (!role) return new ErrorHandler(400, "No se encontró el rol");

      let newAdmin: (IAdmin & { _id: any }) | null = await Admin.findOne(
        { email },
        { _id: 1 }
      ).exec();

      if (newAdmin) {
        let use: (IUser & { _id: any }) | null = await User.findOne({
          person: newAdmin._id,
        });
        if (use) return new ErrorHandler(422, "El usuario ya está registrado");
      } else {
        newAdmin = new Admin({ name, email, description });
        await newAdmin.save();
      }

      const newUser = new User({
        username,
        password,
        person: newAdmin._id,
        role: role._id,
        onPerson: "Admin",
      });
      await newUser.save();

      return new ResponseBase(200, "Usuario registrado correctamente");
    } catch (err) {
      return new ErrorHandler(400, "Error al registrar usuario");
    }
  };

  public signUp = async (request: any) => {
    //register for clients
    const { username, email, password } = request;
    try {
      if (!username || !email || !password)
        return new ErrorHandler(400, "Faltan datos");

      const user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (user) {
        return new ErrorHandler(422, "El usuario ya está registrado");
      }

      const role: (IRole & { _id: any }) | null = await Role.findOne(
        { description: "client" },
        { _id: 1 }
      ).exec();

      if (!role) return new ErrorHandler(400, "Problema al establecer rol");

      let newClient: (IClient & { _id: any }) | null = await Client.findOne(
        { email },
        { _id: 1 }
      ).exec();

      if (newClient) {
        let use: (IUser & { _id: any }) | null = await User.findOne({
          person: newClient._id,
        });
        if (use) return new ErrorHandler(422, "El usuario ya está registrado");
      } else {
        newClient = new Client({ email });
        await newClient.save();
      }

      const newUser = new User({
        username,
        password,
        person: newClient._id,
        role: role._id,
        onPerson: "Client",
      });
      await newUser.save();

      return new ResponseBase(200, "Usuario registrado correctamente");
    } catch (err) {
      return new ErrorHandler(400, "Error al registrar usuario");
    }
  };

  public async logout() {
    try {
      return new ResponseBase(200, "Adiós");
    } catch (err) {
      return new ErrorHandler(400, "Error al cerrar la sesión");
    }
  }

  public async sendRecoverEmail(body: any) {
    try {
      const { email } = body;
      const client: (IClient & { _id: any }) | null = await Client.findOne({
        email,
      });
      if (!client)
        return new ErrorHandler(
          404,
          "No existe un usuario registrado con ese correo"
        );
      const user: (IUser & { _id: any }) | null = await User.findOne({
        person: client._id,
      });
      if (!user)
        return new ErrorHandler(404, "Error al conseguir datos de usuario");
      return new ResponseData(200, "Usuario encontrado", {
        id: user._id,
      });
    } catch (error) {
      return new ErrorHandler(400, "Error al encontrar usuario");
    }
  }

  public isUser = async (body: any) => {
    try {
      const { id } = body;
      if (!id) return new ErrorHandler(400, "Identificador no válido");
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user) return new ErrorHandler(400, "Usuario no encontrado");
      return new ResponseBase(200, "Usuario encontrado");
    } catch (error) {
      return new ErrorHandler(400, "Error al encontrar usuario");
    }
  };

  public changePassword = async (body: any) => {
    try {
      let { id, password } = body;
      if (!password || !id) return new ErrorHandler(400, "Datos incompletos");
      password = await encryptPassword(password);
      await User.findByIdAndUpdate(id, { password });
      return new ResponseBase(200, "Contraseña actualizada correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al cambiar contraseña");
    }
  };
}
