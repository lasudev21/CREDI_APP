import { IRolePermiso } from "../types/IRolPermiso";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getPermisoRol = async (idRol: number) => {
  const response = await api.get(`roles/${idRol}`);
  try {
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const putPermisoRol = async (data: IRolePermiso[]) => {
  const response = await api.put(`roles`, { data });
  try {
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
