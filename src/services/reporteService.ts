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
