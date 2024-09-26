import { IPermiso } from "../types/IRolPermiso";
import { IUsuario } from "../types/IUsuario";
import { ManageErrors } from "../utils/ErrorUtils";
import { eliminarPassword } from "../utils/helper";
import api from "./api";

export const getUsuarios = async () => {
  try {
    const response = await api.get("usuarios");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postUsuarios = async (user: IUsuario) => {
  try {
    const response = await api.post("usuarios", user);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postGuardarPermisos = async (data: IPermiso[], idUser: number) => {
  try {
    const response = await api.post("roles/savePermission", { data, idUser });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const putUsuarios = async (user: IUsuario) => {
  try {
    if (user.password === "") {
      //Se quita el pastword en caso que venga vacio
      user = eliminarPassword(user);
    }
    const response = await api.put("usuarios", user);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const ListaVista = async (idRol: number, idUser: number) => {
  try {
    const response = await api.post("roles/views", { idRol, idUser });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
