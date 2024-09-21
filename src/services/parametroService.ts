import { ICreateParametro, IPutParametros } from "../types/IParametro";
import { IResponse } from "../types/IResponse";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getParametros = async () => {
  try {
    const response = await api.get("parametros");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postParametro = async (data: ICreateParametro) => {
  try {
    const response = await api.post("parametros", data);
    const transformedResponse: IResponse = {
      status: response.status,
      statusText: response.statusText,
      request: response.request,
    };

    return transformedResponse;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};

export const putParametros = async (data: IPutParametros) => {
  try {
    const response = await api.put("parametros", data);
    const transformedResponse: IResponse = {
      status: response.status,
      statusText: response.statusText,
      request: response.request,
    };

    return transformedResponse;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};

export const gatdatosRutas = async () => {
  try {
    const response = await api.get("parametros/datosRutas");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getCredito = async (id: number) => {
  try {
    const response = await api.get(`creditos/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
