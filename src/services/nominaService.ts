import { INominaCobrador } from "../types/INomina";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getNomina = async (week: string, year: number) => {
  try {
    const _week = parseInt(week.split('-W')[1], 10);
    const response = await api.post("nomina/verNomina", {
      week: _week,
      year,
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postNomina = async (
  nomina_id: number,
  anio: number,
  semana: string,
  data: INominaCobrador[]
) => {
  try {
    const _week = parseInt(semana.split('-W')[1], 10);
    const response = await api.post("nomina", { nomina_id, anio, semana: _week, data });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const deleteVale = async (id: number, nomina_id: number) => {
  try {
    const response = await api.post("nomina/deleteVale", { id, nomina_id });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getCobradores = async () => {
  try {
    const response = await api.get("nomina/cobradores");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postCobrador = async (cobrador_id: number, nomina_id: number) => {
  try {
    const response = await api.post("nomina/cobrador", {
      cobrador_id,
      nomina_id,
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
