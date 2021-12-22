import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import Client, { IClient } from "../models/Client";
import Course, { ICourse } from "../models/Course";

export class ClientDAO {
  constructor() {}

  public addFavorite = async (body: any) => {
    const { courseId, clientId } = body;
    try {
      const course: (ICourse & { _id: string; }) | null = await Course.findById(courseId);

      if (course) {
        return new ErrorHandler(422, "El curso no está registrado");
      }

      const client: (IClient & { _id: string; }) | null = await Client.findById(clientId);

      if (client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      

      return new ResponseBase(200, "Curso agregado a favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al agregar curso a favoritos");
    }
  };

  public removeFavorite = async (body: any) => {
    const { courseId, clientId } = body;
    try {
      const course: (ICourse & { _id: string; }) | null = await Course.findById(courseId);

      if (course) {
        return new ErrorHandler(422, "El curso no está registrado");
      }

      const client: (IClient & { _id: string; }) | null = await Client.findById(clientId);

      if (client) {
        return new ErrorHandler(422, "El cliente no está registrado");
      }

      

      return new ResponseBase(200, "Curso removido de favoritos correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al remover curso de favoritos");
    }
  };

}