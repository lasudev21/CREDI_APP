import { ICliente } from "../types/ICliente";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getClientes = async () => {
  try {
    const response = await api.get("clientes");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getReferencias = async (id: number) => {
  try {
    const response = await api.get(`clientes/referencias/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postCliente = async (data: ICliente) => {
  try {
    const response = await api.post("clientes", data);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};

export const putCliente = async (data: ICliente) => {
  try {
    const response = await api.put("clientes", data);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};

export const changeCliente = async (id: number) => {
  try {
    const response = await api.post(`clientes/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};


export const getHistorialCliente = async (id: number) => {
  try {
    const response = await api.get(`clientes/${id}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
    return null;
  }
};
