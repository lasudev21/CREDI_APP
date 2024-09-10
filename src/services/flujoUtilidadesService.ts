/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { ICreateFU } from "../types/IFlujoUtilidades";
import { IResponse } from "../types/IResponse";
import { ManageErrors } from "../utils/ErrorUtils";
import api from "./api";

export const getFlujoUtilidades = async (page: number) => {
  try {
    const response = await api.get(`flujoUtilidades?page=${page}`);
    return response.data;
  } catch (error) {
    await ManageErrors(error);
  }
};

export const postFlujoUtilidades = async (data: ICreateFU) => {
  try {
    const response: AxiosResponse<any> = await api.post(`flujoUtilidades`, data);

    const transformedResponse: IResponse = {
      status: response.status,
      statusText: response.statusText,
      request: response.request,
    };

    return transformedResponse;
  } catch (error) {
    await ManageErrors(error);
    return null
  }
};
