import { ISalidaCuentas } from "../types/IReporte";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const gatCoteos = async (firstDay: string, lastDay: string) => {
  try {
    const response = await api.get("reportes/coteos", {
      params: {
        fechaIni: firstDay,
        fechaFin: lastDay,
      },
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const getReporteCuentas = async (year: number) => {
  try {
    const response = await api.post("reportes/getReporteCuentas", {
      year,
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postReporteCuentas = async (data: ISalidaCuentas[]) => {
  try {
    const response = await api.post("reportes/postReporteCuentas", {
      data,
    });
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
