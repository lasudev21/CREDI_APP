import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getRutas = async () => {
  try {
    const response = await api.get("parametros/Rutas");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getPeriodos = async () => {
  try {
    const response = await api.get("parametros/periodos");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getCredito = async (id:number) => {
  try {
    const response = await api.get(`creditos/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};