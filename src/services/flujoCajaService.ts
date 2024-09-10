import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getFlujoCaja = async (page:number) => {
  try {
    const response = await api.get(`flujoCaja?page=${page}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};