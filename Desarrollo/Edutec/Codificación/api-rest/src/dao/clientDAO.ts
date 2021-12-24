import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import Client, { IClient } from "../models/Client";
import Course from "../models/Course";

export class ClientDAO {
  constructor() {}

  public readClient = async (id: string) => {
    try {
      const data = await Client.findById(id);
      return new ResponseData(200, "Cliente obtenido correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cliente");
    }
  }

  public addFavorite = async (body: any) => {
    const { courseUrl, clientId } = body;
    try {
      const client: (IClient & { _id: string; }) | null = await Client.findById(clientId);

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      await Client.updateOne({_id: clientId}, {
        $push: {
          favorites: courseUrl
        }
      });

      return new ResponseBase(200, "Curso agregado a favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al agregar curso a favoritos");
    }
  };

  public removeFavorite = async (body: any) => {
    const { courseUrl, clientId } = body;
    try {
      const client: (IClient & { _id: string; }) | null = await Client.findById(clientId);

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      await Client.updateOne({_id: clientId}, {
        $pull: {
          favorites: courseUrl
        }
      });

      return new ResponseBase(200, "Curso removido de favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al remover curso de favoritos");
    }
  };

  public readFavorites = async (id: string) => {
    try {
      const client = await Client.findById(id);

      if (!client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      const data = await Course.find({'url': {$in: client.favorites}})

      return new ResponseData(200, "Cursos favoritos obtenidos correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener cursos favoritos");
    }
  }

}