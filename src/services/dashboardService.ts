import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getDashBoardData = async () => {
  try {
    const response = await api.get("dashboard/newclientes");
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};
