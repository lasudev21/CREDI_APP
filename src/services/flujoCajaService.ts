/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";
import { IResponse } from "../types/IResponse";
import { ICreateFC } from "../types/IFlujoCaja";

export const getFlujoCaja = async (page: number) => {
  try {
    const response = await api.get(`flujoCaja?page=${page}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postFlujoCaja = async (data: ICreateFC) => {
  try {
    const response: AxiosResponse<any> = await api.post(`flujoCaja`, data);

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
