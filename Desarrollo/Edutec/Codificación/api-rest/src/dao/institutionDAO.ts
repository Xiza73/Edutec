import ErrorHandler from "../helpers/ErrorHandler";
import ResponseBase from "../helpers/ResponseBase";
import ResponseData from "../helpers/ResponseData";
import Institution, { IInstitution } from "../models/Institution";

export class InstitutionDAO {
  constructor() {}

  public addInstitution = async (body: any) => {
    const { name, description, url, social, email, logo } = body;
    try {
      const institution: IInstitution = new Institution({name, description, url, social, email, logo});
      await institution.save();
      return new ResponseBase(200, "Institución creada correctamente");
    } catch (error) {
      return new ErrorHandler(404, "Error al crear institución");
    }
  };

  public readInstitutions = async (name: string) => {
    try {
      let data;
      if (name) {
        data = await Institution.find({ name: {$regex: new RegExp(name, 'i')} });
      } else {
        data = await Institution.find();
      }
      return new ResponseData(200, "Instituciones obtenidas correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener instituciones");
    }
  };

  public readInstitution = async (id: string) => {
    try {
      const data = await Institution.findById(id);
      return new ResponseData(200, "Institución obtenida correctamente", data);
    } catch (error) {
      return new ErrorHandler(404, "Error al obtener institución");
    }
  };
}