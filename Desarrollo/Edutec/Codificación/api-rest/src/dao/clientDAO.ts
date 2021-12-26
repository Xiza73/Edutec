import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import User, { IUser } from "../models/User";
import Client, { IClient } from "../models/Client";
import { ObjectId } from "mongoose";

export class ClientDAO {
  constructor() {}

  public getUserProfile = async (username: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findOne({
        username,
      });
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const client: (IClient & { _id: any }) | null = await Client.findById(
        user.person._id
      );
      if (!client)
        return new ErrorHandler(400, "Datos de usuario no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        id: user._id,
        username: user.username,
        email: client.email,
        aboutMe: client.aboutMe,
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUserProfile = async (body: any) => {
    const { username, aboutMe, prevUsername } = body;
    try {
      if (!username || !aboutMe || !prevUsername)
        return new ErrorHandler(400, "Error al obtener los datos");
      const user: (IUser & { _id: any }) | null = await User.findOne({
        username: prevUsername,
      });
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      await User.findOneAndUpdate({ username: prevUsername }, { username });
      await Client.findOneAndUpdate({ _id: user.person._id }, { aboutMe });

      return new ResponseBase(200, "Datos actualizados correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al actualizar los datos");
    }
  };

  public getUserProfileId = async (id: string) => {
    try {
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      const client: (IClient & { _id: any }) | null = await Client.findOne({
        _id: user.person._id,
      });
      if (!client)
        return new ErrorHandler(400, "Datos de cliente no encontrados");

      return new ResponseData(200, "Datos de usuario obtenidos correctamente", {
        username: user.username,
        email: client.email,
        aboutMe: client.aboutMe,
      });
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener datos de usuario");
    }
  };

  public updateUserProfileId = async (body: any) => {
    const { username, aboutMe, id } = body;
    try {
      if (!username || !aboutMe || !id)
        return new ErrorHandler(400, "Error al obtener los datos");
      const user: (IUser & { _id: any }) | null = await User.findById(id);
      if (!user)
        return new ErrorHandler(400, "Datos de usuario no encontrados");
      await User.findOneAndUpdate({ _id: id }, { username });
      await Client.findOneAndUpdate({ _id: user.person._id }, { aboutMe });

      return new ResponseBase(200, "Datos actualizados correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al actualizar los datos");
    }
  };
}
